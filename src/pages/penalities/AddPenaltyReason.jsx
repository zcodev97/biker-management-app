import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Biker_System_URL, FormatDateTime } from "../../global";
import Loading from "../../components/Loading";

function AddPenaltyReasonPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState();

  useEffect(() => {}, []);

  async function addPenalyReason() {
    var token = localStorage.getItem("token");

    if ((reason === null) | (reason === undefined) | (reason === "")) {
      alert("Select Biker ?!");
      return;
    }

    fetch(
      Biker_System_URL +
        "penalty/add_penalty_reason?penalty_reason_data=" +
        reason,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        alert("Penalty Reason added 😁");
        navigate("/penalty_reasons");
      })
      .catch((error) => {
        console.log(error);
        alert("Error In Adding Penalty Reason, see console log 😕");
      });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className="btn btn-dark border border-2 p-3 m-2"
        onClick={() => {
          navigate("/compensations_reasons", { replace: true });
        }}
      >
        <b>Back</b>
      </div>
      <div className="container p-2 mt-2   border-2 border-bottom border-primary text-dark rounded">
        <h3 className="text-center">
          <b> Penalty Reason</b>
        </h3>
      </div>
      <div className="row">
        <div className="col-xl-4"></div>
        <div className="col-xl-4">
          <div className="container text-start text-dark mt-2 p-3 border border-4 rounded bg-light">
            <div className="container border-bottom border-light border-3   m-2 p-2">
              <b className="text-dark">Reason</b>
              <input
                type="text"
                className="form-control"
                id="uname"
                placeholder="....."
                name="uname"
                required=""
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </div>

            {/* Submit Ticket Button */}
            <div className="container mt-2 text-center">
              <button
                type="button"
                className="btn btn-dark"
                onClick={addPenalyReason}
              >
                Add Penalty Reason
              </button>
            </div>
          </div>
        </div>

        <div className="col-xl-4"></div>
      </div>
    </>
  );
}

export default AddPenaltyReasonPage;
