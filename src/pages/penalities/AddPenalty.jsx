import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Biker_System_URL, FormatDateTime } from "../../global";
import Loading from "../../components/Loading";

function AddPenalyPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [penaltyAmount, setPenaltyAmount] = useState();

  const [bikersDropDownMenu, setBikersDropDownMenu] = useState([]);
  const [reasonsDropDownMenu, setReasonsDropDownMenu] = useState([]);

  const [selectedBiker, setSelectedBiker] = useState();
  const [selectedReason, setSelectedReason] = useState();

  async function loadBikersAndReasons() {
    setLoading(true);
    var token = localStorage.getItem("token");

    fetch(Biker_System_URL + "biker/get_bikers?page=1&page_size=199", {
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
          navigate("/login", { replace: true });
          return;
        }

        Object.values(response.results).map((x) => {
          x.created_at = FormatDateTime(new Date(x.created_at));
          x.updated_at = FormatDateTime(new Date(x.updated_at));
          x.biker_created_at = FormatDateTime(new Date(x.biker_created_at));
          x.created_by = x.created_by.username;
          x.updated_by = x.updated_by.username;
        });

        let dropdownBikers = [];
        response.results.forEach((biker) => {
          dropdownBikers.push({
            label: biker.biker_fullname,
            value: biker.biker_request_id,
          });
        });

        setBikersDropDownMenu(dropdownBikers);
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      })
      .finally(() => {
        fetch(
          Biker_System_URL +
            "penalty/get_penalty_reasons/?page=1&page_size=199",
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
              navigate("/login", { replace: true });
              return;
            }

            Object.values(response.results).map((x) => {
              x.created_at = FormatDateTime(new Date(x.created_at));
              x.updated_at = FormatDateTime(new Date(x.updated_at));
              x.biker_created_at = FormatDateTime(new Date(x.biker_created_at));
              x.created_by = x.created_by.username;
              x.updated_by = x.updated_by.username;
            });
            console.log(response.results);
            let dropDownReasons = [];
            response.results.forEach((reason) => {
              dropDownReasons.push({
                label: reason.reason,
                value: reason.id,
              });
            });

            setReasonsDropDownMenu(dropDownReasons);
          })
          .catch((e) => {
            console.log(e);
            alert(e);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }

  useEffect(() => {
    loadBikersAndReasons();
  }, []);

  async function addPenalty() {
    var token = localStorage.getItem("token");

    if (
      (selectedBiker === null) |
      (selectedBiker === undefined) |
      (selectedBiker === "")
    ) {
      alert("Select Biker ?!");
      return;
    }
    if (
      (selectedReason === null) |
      (selectedReason === undefined) |
      (selectedReason === "")
    ) {
      alert("Select Reason ?!");
      return;
    }
    if (
      (penaltyAmount === null) |
      (penaltyAmount === undefined) |
      (penaltyAmount === 0)
    ) {
      alert("Amount Can't be 0 ?!");
      return;
    }

    fetch(Biker_System_URL + "penalty/add_penalty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        reason_id: selectedReason,
        amount: penaltyAmount,
        biker_request_id: selectedBiker,
        date_added: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Penalty added 😁");
        navigate("/penalties");
      })
      .catch((error) => {
        console.log(error);
        alert("Error In Adding Penalty, see console log  😕");
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
          navigate("/penalties", { replace: true });
        }}
      >
        <b>Back</b>
      </div>
      <div className="container p-2 mt-2   border-2 border-bottom border-primary text-dark rounded">
        <h3 className="text-center">
          <b> Penalty</b>
        </h3>
      </div>
      <div className="row">
        <div className="col-xl-4"></div>
        <div className="col-xl-4">
          <div className="container text-start text-dark mt-2 p-3 border border-4 rounded bg-light">
            <div className="container border-bottom border-light border-3   m-2 p-2">
              {/* select biker   */}
              <div className="container border-bottom border-light border-3  p-2">
                <b className="text-dark">Select Biker</b>
                <Select
                  options={bikersDropDownMenu}
                  onChange={(opt) => setSelectedBiker(opt.value)}
                  // isMultivalue
                />
              </div>

              {/* select Reason   */}
              <div className="container border-bottom border-light border-3  p-2">
                <b className="text-dark">Select Reason</b>
                <Select
                  options={reasonsDropDownMenu}
                  onChange={(opt) => setSelectedReason(opt.value)}
                  // isMulti
                />
              </div>

              <b className="text-dark">Amount</b>
              <input
                type="number"
                className="form-control"
                id="uname"
                placeholder="....."
                name="uname"
                required=""
                onChange={(e) => {
                  setPenaltyAmount(e.target.value);
                }}
              />
            </div>

            {/* Submit Ticket Button */}
            <div className="container mt-2 text-center">
              <button
                type="button"
                className="btn btn-dark"
                onClick={addPenalty}
              >
                Add Penalty
              </button>
            </div>
          </div>
        </div>

        <div className="col-xl-4"></div>
      </div>
    </>
  );
}

export default AddPenalyPage;
