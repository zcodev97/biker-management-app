import { useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Biker_System_URL } from "../global";
import NoDataView from "../components/noData";
import { FormatDateTime } from "../global";

function BikerDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const [compensationsFields, setCompensationsFields] = useState([]);
  const [compensations, setCompensations] = useState([]);

  const [penalitiesFields, setPenalitiesFields] = useState([]);
  const [penalities, setPenalities] = useState([]);

  var customclassName =
    "container text-center text-dark border border-2 rounded pt-2 pb-2 mt-2 mb-2";

  async function GetAllBikerPenalities() {
    setLoading(true);
    var token = localStorage.getItem("token");

    fetch(
      Biker_System_URL +
        "penalty/get_penalties/" +
        location.state.biker_request_id +
        "?page=1&page_size=50",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then(async (response) => {
        if (response.detail) {
          alert(response.detail);
          setLoading(false);
          navigate("/login", { replace: true });
          return;
        }
        console.log(response.results);
        if (response.results.length !== 0) {
          let cols = Object.keys(response.results[0])
            .filter((i) => {
              return (
                // i !== "created_by" &&
                // i !== "updated_by" &&
                // i !== "reason" &&
                // i !== "biker" &&
                i !== "id"
              );
            })
            .map((i, d) => {
              if (Array.isArray(response.results[0])) {
                return null; // exclude array values
              }

              return {
                dataField: i,
                text: i,
                sort: true,
                filter: textFilter(),
                showTitle: false,
                fixed: true,
              };
            })
            .filter((col) => col !== null);

          setPenalitiesFields(cols);
          Object.values(response.results).map((x) => {
            x.created_at = FormatDateTime(new Date(x.created_at));
            x.updated_at = FormatDateTime(new Date(x.updated_at));
            x.date_added = FormatDateTime(new Date(x.date_added));
            x.created_by = x.created_by.username;
            x.updated_by = x.updated_by.username;
            x.reason = x.reason.reason;
            x.biker = x.biker.biker_request_id;
          });
          setPenalities(response.results);
        } else {
          //   alert("No Penalities Founded for this biker ");
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function GetAllBikerCompensations() {
    setLoading(true);
    var token = localStorage.getItem("token");

    fetch(
      Biker_System_URL +
        "compensation/get_compensations/" +
        location.state.biker_request_id +
        "?page=1&page_size=50",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then(async (response) => {
        if (response.detail) {
          alert(response.detail);
          setLoading(false);
          navigate("/login", { replace: true });
          return;
        }

        console.log(response.results);

        if (response.results.length !== 0) {
          let cols = Object.keys(response.results[0])
            .filter((i) => {
              return (
                // i !== "created_by" &&
                // i !== "updated_by" &&
                // i !== "reason" &&
                // i !== "biker" &&
                i !== "id"
              );
            })
            .map((i, d) => {
              if (i == "created_by") {
                // created_by = created_by.username
              }

              if (Array.isArray(response.results[0])) {
                return null; // exclude array values
              }

              return {
                dataField: i,
                text: i,
                sort: true,
                filter: textFilter(),
                showTitle: false,
                fixed: true,
              };
            })
            .filter((col) => col !== null);

          setCompensationsFields(cols);

          Object.values(response.results).map((x) => {
            x.created_at = FormatDateTime(new Date(x.created_at));
            x.updated_at = FormatDateTime(new Date(x.updated_at));
            x.date_added = FormatDateTime(new Date(x.date_added));
            x.created_by = x.created_by.username;
            x.updated_by = x.updated_by.username;
            x.reason = x.reason.reason;
            x.biker = x.biker.biker_request_id;
          });
          setCompensations(response.results);
        } else {
          //   alert("No Compenstations Founded for this biker ");
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate("/biker_details", {
        state: {
          id: row.id,
          biker_created_at: row.biker_created_at,
          biker_fullname: row.biker_fullname,
          biker_request_id: row.biker_request_id,
          created_at: row.created_at,
          created_by: row.created_by,
          is_active: row.is_active,
          is_deleted: row.is_deleted,
          updated_at: row.updated_at,
          phone_number: row.phone_number,
          updated_by: row.updated_by,
        },
      });
    },
  };

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 15,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });

  useEffect(() => {
    GetAllBikerCompensations();
    GetAllBikerPenalities();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className="btn btn-light p-3 m-2"
        onClick={() => {
          navigate("/bikers", { replace: true });
        }}
      >
        <b>Back</b>
      </div>
      <div className={customclassName}>
        <b> ID : </b> {location.state.id}
      </div>
      <div className={customclassName}>
        <b> Biker Created At: </b> {location.state.biker_created_at}
      </div>
      <div className={customclassName}>
        <b>Created At: </b> {location.state.created_at}
      </div>
      <div className={customclassName}>
        <b>Updated At: </b> {location.state.updated_at}
      </div>
      <div className={customclassName}>
        <b>Updated By: </b> {location.state.updated_by.username}
      </div>
      <div className={customclassName}>
        <b>Biker Full Name: </b> <span> {location.state.biker_fullname}</span>
      </div>
      <div className={customclassName}>
        <b>Created By: </b> {location.state.created_by.username}
      </div>
      <div className={customclassName}>
        <b>Biker Request Id: </b> {location.state.biker_request_id}
      </div>
      <div className={customclassName}>
        <b>Phone Number: </b> {location.state.phone_number}
      </div>
      <div className="container bg-light rounded p-1 text-center">
        {penalitiesFields.length === 0 && penalities.length === 0 ? (
          "loading"
        ) : (
          <>
            <div className="container p-4">
              <h3> Biker Penalities </h3>
            </div>
            <BootstrapTable
              hover={true}
              bordered={true}
              keyField="id"
              columns={penalitiesFields}
              data={penalities}
              pagination={pagination}
              filter={filterFactory()}
              //   rowEvents={rowEvents}
              wrapperClasses="table-responsive"
            />
          </>
        )}
      </div>
      <div className="container" style={{ height: "20px" }}></div>
      <div className="container bg-light rounded p-1 text-center">
        <div className="container p-4">
          <h3> Biker Compensations </h3>
        </div>
        {compensationsFields.length === 0 && compensations.length === 0 ? (
          "no data"
        ) : (
          <>
            <BootstrapTable
              hover={true}
              bordered={true}
              keyField="id"
              columns={compensationsFields}
              data={compensations}
              pagination={pagination}
              filter={filterFactory()}
              //   rowEvents={rowEvents}
              wrapperClasses="table-responsive"
            />
          </>
        )}
      </div>
    </>
  );
}

export default BikerDetailsPage;
