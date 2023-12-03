import { useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { Biker_System_URL } from "../../global";
import NoDataView from "../../components/noData";
import { FormatDateTime } from "../../global";

function CompensationDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  var customclassName =
    "container text-center text-dark border border-2 rounded pt-2 pb-2 mt-2 mb-2";

  async function DeleteCompensation() {
    if (window.confirm("Do you want to proceed?")) {
      setLoading(true);
      var token = localStorage.getItem("token");

      fetch(
        Biker_System_URL + "compensation/" + location.state.id + "/delete/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) =>
          response.length !== 0 ? response.json() : response
        )
        .then((response) => {
          if (response.detail) {
            alert(response.detail);
            setLoading(false);
            navigate("/compensations", { replace: true });
          }
          navigate("/compensations", { replace: true });
        })
        .catch((e) => {
          console.log(e);
          //   alert(e);
        })
        .finally(() => {
          setLoading(false);
        });
      alert("You clicked OK. Performing the action...");
    } else {
      alert("You clicked Cancel. No action will be performed.");
    }
  }

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

  useEffect(() => {}, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div
            className="btn btn-dark p-3 m-2"
            onClick={() => {
              navigate("/compensations", { replace: true });
            }}
          >
            <b>Back</b>
          </div>
          <div className="btn btn-danger p-3 m-2" onClick={DeleteCompensation}>
            <b>Delete</b>
          </div>
        </div>
      </div>
      <div className={customclassName}>
        <b> ID : </b> {location.state.id}
      </div>
      <div className={customclassName}>
        <b> Created At: </b> {location.state.created_at}
      </div>
      <div className={customclassName}>
        <b> Created By: </b> {location.state.created_by}
      </div>
      <div className={customclassName}>
        <b>Updated At: </b> {location.state.updated_at}
      </div>
      <div className={customclassName}>
        <b>Updated By: </b> {location.state.updated_by}
      </div>

      <div className={customclassName}>
        <b>Biker Request Id: </b> {location.state.biker}
      </div>
      <div className={customclassName}>
        <b>Reason: </b> {location.state.reason}
      </div>
      <div className={customclassName}>
        <b>Amount: </b> {location.state.amount}
      </div>
      <div className={customclassName}>
        <b>Date Added: </b> {location.state.date_added}
      </div>
    </>
  );
}

export default CompensationDetailsPage;
