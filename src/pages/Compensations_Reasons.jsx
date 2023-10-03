import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import { Biker_System_URL } from "../global";
import NoDataView from "../components/noData";
import { FormatDateTime } from "../global";

function CompensationReasonsPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);

  async function Request() {
    setLoading(true);
    var token = localStorage.getItem("token");

    fetch(
      Biker_System_URL +
        "compensation/get_compensation_reasons/?page=1&page_size=50",
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
        console.log(response);
        if (response.detail) {
          alert(response.detail);
          setLoading(false);
          navigate("/bikers");
          return;
        }

        let cols = Object.keys(response.results[0])
          .filter((i) => i !== "created_by" && i !== "updated_by" && i !== "id")
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

        Object.values(response.results).map((x) => {
          x.created_at = FormatDateTime(new Date(x.created_at));
          x.updated_at = FormatDateTime(new Date(x.updated_at));
        });
        setData(response.results);
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // const rowEvents = {
  //   onClick: (e, row, rowIndex) => {
  //     navigate("/user_details", {
  //       state: {
  //         id: row.id,
  //         email: row.email,
  //         username: row.username,
  //         firstName: row.first_name,
  //         lastName: row.last_name,
  //         phoneNumber: row.phone_number,
  //         role: row.role,
  //       },
  //     });
  //   },
  // };

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
    Request();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <NoDataView />;
  }

  return (
    <>
      <NavBar />
      <div className="container p-2 mt-2   border-2 border-bottom border-primary text-dark rounded">
        <h3 className="text-center">
          <b> Compensations Reasons</b>
        </h3>
      </div>

      <div className="container-fluid bg-light rounded p-1 text-center">
        {fields.length === 0 && data.length === 0 ? (
          "loading"
        ) : (
          <BootstrapTable
            hover={true}
            bordered={true}
            keyField="id"
            columns={fields}
            data={data}
            pagination={pagination}
            filter={filterFactory()}
            // rowEvents={rowEvents}
            wrapperClasses="table-responsive"
          />
        )}
      </div>
    </>
  );
}

export default CompensationReasonsPage;
