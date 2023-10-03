import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";
import Compensations from "./pages/Compensations";
import CompensationReasons from "./pages/Compensations_Reasons";
import Penalties from "./pages/Penalites";
import PenaltyReasonsPage from "./pages/Penalities_Reasons";
import { BikersPage } from "./pages/Bikers";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage copy";
import { Biker_System_URL } from "./global";
import Footer from "./components/footer";
import CompensationReasonsPage from "./pages/Compensations_Reasons";
import BikerDetailsPage from "./pages/BikerDetails";

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

    fetch(Biker_System_URL + "api/auth/user-info", {
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
        alert(error);
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
          <Route path="/compensations" element={<Compensations />} />
          <Route
            path="/compensations_reasons"
            element={<CompensationReasonsPage />}
          />
          <Route path="/penalties" element={<Penalties />} />
          <Route path="/penalty_reasons" element={<PenaltyReasonsPage />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
