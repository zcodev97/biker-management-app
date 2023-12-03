import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Biker_System_URL } from "../../global";
import Loading from "../../components/Loading";

function AddBikerPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [bikerRequestId, setBikerRequestId] = useState();
  const [bikerCreatedAt, setBikerCreatedAt] = useState();
  const [bikerFullname, setBikerFullname] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  useEffect(() => {}, []);

  async function addBiker() {
    var token = localStorage.getItem("token");

    if (
      (bikerRequestId === null) |
      (bikerRequestId === undefined) |
      (bikerRequestId === 0)
    ) {
      alert("Biker Request ID Empty ?!");
      return;
    }
    if (
      (phoneNumber === null) |
      (phoneNumber === undefined) |
      (phoneNumber === 0)
    ) {
      alert("Biker Phone Number Empty ?!");
      return;
    }
    if (
      (bikerFullname === null) |
      (bikerFullname === undefined) |
      (bikerFullname === "")
    ) {
      alert("Biker Full Name Empty ?!");
      return;
    }

    fetch(Biker_System_URL + "biker/add_biker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        biker_request_id: bikerRequestId,
        biker_created_at: new Date(),
        biker_fullname: bikerFullname,
        phone_number: phoneNumber,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Biker added 😁");
        navigate("/bikers");
      })
      .catch((error) => {
        console.log(error);
        alert("Error In Adding new ticket 😕");
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
          navigate("/bikers", { replace: true });
        }}
      >
        <b>Back</b>
      </div>
      <div className="container p-2 mt-2   border-2 border-bottom border-primary text-dark rounded">
        <h3 className="text-center">
          <b> Add Biker</b>
        </h3>
      </div>
      <div className="row">
        <div className="col-xl-4"></div>
        <div className="col-xl-4">
          <div className="container text-start text-dark mt-2 p-3 border border-4 rounded bg-light">
            <div className="container border-bottom border-light border-3   m-2 p-2">
              <b className="text-dark">Biker Request ID</b>
              <input
                type="number"
                className="form-control"
                id="uname"
                placeholder="....."
                name="uname"
                required=""
                onChange={(e) => {
                  setBikerRequestId(e.target.value);
                }}
              />
            </div>

            <div className="container border-bottom border-light border-3   m-2 p-2">
              <b className="text-dark">Biker Full Name</b>
              <input
                type="text"
                className="form-control"
                id="uname"
                placeholder="....."
                name="uname"
                required=""
                onChange={(e) => {
                  setBikerFullname(e.target.value);
                }}
              />
            </div>
            <div className="container border-bottom border-light border-3   m-2 p-2">
              <b className="text-dark">Biker Phone Number</b>
              <input
                type="number"
                className="form-control"
                id="uname"
                placeholder="....."
                name="uname"
                required=""
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>

            {/* Submit Ticket Button */}
            <div className="container mt-2 text-center">
              <button type="button" className="btn btn-dark" onClick={addBiker}>
                Submit Ticket
              </button>
            </div>
          </div>
        </div>

        <div className="col-xl-4"></div>
      </div>
    </>
  );
}

export default AddBikerPage;
