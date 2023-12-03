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

function CompensationReasonDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  var customclassName =
    "container text-center text-dark border border-2 rounded pt-2 pb-2 mt-2 mb-2";

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
              navigate("/compensations_reasons", { replace: true });
            }}
          >
            <b>Back</b>
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
    </>
  );
}

export default CompensationReasonDetailsPage;
