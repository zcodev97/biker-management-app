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

function PenaltiesPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);

  async function Request() {
    setLoading(true);
    var token = localStorage.getItem("token");

    fetch(Biker_System_URL + "penalty/get_penalties/?page=1&page_size=199", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
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
          x.date_added = FormatDateTime(new Date(x.date_added));
          x.created_by = x.created_by.username;
          x.updated_by = x.updated_by.username;
          x.biker = x.biker.biker_request_id;
          x.reason = x.reason.reason;
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

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate("/penalty_details", {
        state: {
          id: row.id,
          created_at: row.created_at,
          updated_at: row.updated_at,
          created_by: row.created_by,
          updated_by: row.updated_by,
          is_active: row.is_active,
          is_deleted: row.is_deleted,
          biker: row.biker,
          reason: row.reason,
          amount: row.amount,
          date_added: row.date_added,
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
          <b> Penalties</b>
        </h3>
      </div>
      <div className="container text-end">
        <div
          className="btn btn-light border border-2 p-2 m-2"
          onClick={() => {
            navigate("/add_penalty");
          }}
        >
          <b>➕</b>
        </div>
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
            rowEvents={rowEvents}
            wrapperClasses="table-responsive"
          />
        )}
      </div>
    </>
  );
}

export default PenaltiesPage;

// WITH NumberedReadings AS
// ( SELECT "Info", "Time", "Received", ROW_NUMBER() OVER(PARTITION BY DATE_TRUNC('hour', "Time"),
// 															 FLOOR(EXTRACT(minute FROM "Time") / 30) ORDER BY "Time" ASC)
//  as rn FROM "Readings" WHERE "UnitId" = {Id} AND "Time" BETWEEN $1 AND $2 ) SELECT "Time", "Received", "Info"
// FROM NumberedReadings WHERE rn = 1 ORDER BY "Time" ASC LIMIT {limit} OFFSET {offset}
