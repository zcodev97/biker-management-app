import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Compensations from "./pages/compensations/Compensations";
import CompensationReasons from "./pages/compensations/Compensations_Reasons";
import Penalties from "./pages/penalities/Penalites";
import PenaltyReasonsPage from "./pages/penalities/Penalities_Reasons";
import { BikersPage } from "./pages/bikers/Bikers";
import BikerDetailsPage from "./pages/bikers/BikerDetails";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage copy";
import { Biker_System_URL } from "./global";
import Footer from "./components/footer";
import CompensationReasonsPage from "./pages/compensations/Compensations_Reasons";
import AddBikerPage from "./pages/bikers/AddBiker";
import CompensationDetailsPage from "./pages/compensations/CompensationDetails";
import CompensationReasonDetailsPage from "./pages/compensations/CompensationReasonDetails";
import AddCompensationPage from "./pages/compensations/AddCompensation";
import AddCompensationReasonPage from "./pages/compensations/AddCompensationReason";
import PenaltyDetailsPage from "./pages/penalities/PenaltyDetails";
import AddPenalyPage from "./pages/penalities/AddPenalty";
import PenaltyReasonDetailsPage from "./pages/penalities/PenaltyReasonDetails";
import AddPenaltyReasonPage from "./pages/penalities/AddPenaltyReason";

function App() {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  async function checkIfUserLoggedIn() {
    setLoading(true);

    var token = localStorage.getItem("token");

    if (token === null || token === "") {
      setLoggedIn(false);
      setLoading(false);
      return;
    }

    fetch(Biker_System_URL + "auth/user-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        // alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    checkIfUserLoggedIn();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              loading ? <Loading /> : loggedIn ? <BikersPage /> : <Login />
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/bikers" element={<BikersPage />} />
          <Route path="/biker_details" element={<BikerDetailsPage />} />
          <Route path="/add_biker" element={<AddBikerPage />} />
          <Route path="/compensations" element={<Compensations />} />
          <Route
            path="/compensation_details"
            element={<CompensationDetailsPage />}
          />
          <Route
            path="/compensations_reasons"
            element={<CompensationReasonsPage />}
          />
          <Route path="/add_compensation" element={<AddCompensationPage />} />
          <Route
            path="/add_compensation_reason"
            element={<AddCompensationReasonPage />}
          />
          <Route
            path="/compensation_reason_details"
            element={<CompensationReasonDetailsPage />}
          />
          <Route path="/penalties" element={<Penalties />} />
          <Route path="/penalty_reasons" element={<PenaltyReasonsPage />} />
          <Route path="/penalty_details" element={<PenaltyDetailsPage />} />
          <Route
            path="/penalty_reason_details"
            element={<PenaltyReasonDetailsPage />}
          />
          <Route path="/add_penalty" element={<AddPenalyPage />} />
          <Route
            path="/add_penalty_reason"
            element={<AddPenaltyReasonPage />}
          />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>

      {/* <Footer /> */}
    </>
  );
}

export default App;
