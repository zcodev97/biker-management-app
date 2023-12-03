import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import { Biker_System_URL } from "../../global";
import NoDataView from "../../components/noData";
import { FormatDateTime } from "../../global";

function BikersPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [bikers, setBikers] = useState([]);
  const [fields, setFields] = useState([]);

  // const fields = [
  //   {
  //     dataField: "created_by",
  //     text: "Created By",
  //     sort: true,
  //     filter: textFilter(),
  //   },
  //   {
  //     dataField: "updated_by",
  //     text: "Updated By",
  //     sort: true,
  //     filter: textFilter(),
  //   },
  //   {
  //     dataField: "created_at",
  //     text: "Created At",
  //     sort: true,
  //     filter: textFilter(),
  //   },
  //   {
  //     dataField: "updated_at",
  //     text: "Updated At",
  //     sort: true,
  //     filter: textFilter(),
  //   },
  //   {
  //     dataField: "is_active",
  //     text: "Is Active",
  //     sort: true,
  //     filter: textFilter(),
  //   },
  //   {
  //     dataField: "is_deleted",
  //     text: "Is Deleted",
  //     sort: true,
  //     filter: textFilter(),
  //   },
  //   {
  //     dataField: "biker_request_id",
  //     text: "Biker Request Id",
  //     sort: true,
  //     filter: textFilter(),
  //   },
  //   {
  //     dataField: "biker_created_at",
  //     text: "Biker Created At",
  //     sort: true,
  //     filter: textFilter(),
  //   },
  //   {
  //     dataField: "biker_fullname",
  //     text: "Biker Full Name",
  //     sort: true,
  //     filter: textFilter(),
  //   },
  //   {
  //     dataField: "phone_number",
  //     text: "Phone Number",
  //     sort: true,
  //     filter: textFilter(),
  //   },
  // ];

  async function GetAllBikers() {
    setLoading(true);
    var token = localStorage.getItem("token");

    fetch(Biker_System_URL + "biker/get_bikers?page=1&page_size=50", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.detail) {
          alert(response.detail);
          setLoading(false);
          navigate("/login", { replace: true });
          return;
        }

        let cols = Object.keys(response.results[0])
          .filter((i) => {
            return i !== "id";
          })
          .map((i, d) => {
            // console.log(response.results[0][i]);
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

        setFields(cols);
        // console.log(response.results);
        Object.values(response.results).map((x) => {
          x.created_at = FormatDateTime(new Date(x.created_at));
          x.updated_at = FormatDateTime(new Date(x.updated_at));
          x.biker_created_at = FormatDateTime(new Date(x.biker_created_at));
          x.created_by = x.created_by.username;
          x.updated_by = x.updated_by.username;
        });
        setBikers(response.results);
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
    GetAllBikers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (bikers.length === 0) {
    return <NoDataView />;
  }

  return (
    <>
      <NavBar />
      <div className="container p-2 mt-2   border-2 border-bottom border-primary text-dark rounded">
        <h3 className="text-center">
          <b> Bikers</b>
        </h3>
      </div>
      <div className="container text-end">
        <div
          className="btn btn-success p-2 m-2"
          onClick={() => {
            navigate("/add_biker");
          }}
        >
          <b>Add Biker</b>
        </div>
      </div>

      <div className="container-fluid bg-light rounded p-1 text-center">
        {fields.length === 0 && bikers.length === 0 ? (
          "loading"
        ) : (
          <BootstrapTable
            hover={true}
            bordered={true}
            keyField="id"
            columns={fields}
            data={bikers}
            pagination={pagination}
            filter={filterFactory()}
            rowEvents={rowEvents}
            wrapperClasses="table-responsive"
          />
        )}
      </div>
    </>
  );
}

export { BikersPage };
