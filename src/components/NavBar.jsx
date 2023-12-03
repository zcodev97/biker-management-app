import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { Biker_System_URL, Logout } from "../global";

// db password Qymbg5QhNbAzRn!

function NavBar() {
  const navigate = useNavigate();

  let navLinkClassName = "nav-link text-dark rounded border p-2";

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  async function checkUserPermissions() {
    setLoading(true);

    try {
      var token = localStorage.getItem("token");

      await fetch(Biker_System_URL + "api/auth/user-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkUserPermissions();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark rounded p-2">
        <div className="container-fluid">
          {/* Navbar Brand */}
          <Link
            className="navbar-brand text-primary border border-2 border-dark rounded p-2"
            to="/home"
          >
            <h3>
              <b>BM System</b>
            </h3>
          </Link>

          {/* Navbar Toggler Button */}
          <button
            className="navbar-toggler bg-dark"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Navbar Content */}
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            {/* Main Navbar Content */}
            <ul className="navbar-nav">
              {/* ... Your menu items ... */}
              <li className="nav-item rounded m-1">
                <Link className={navLinkClassName} to="/home">
                  <b>Home</b>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/bikers">
                  <b>Bikers</b>
                </Link>
              </li>

              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/compensations">
                  <b>Compensations</b>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/compensations_reasons">
                  <b>Compensation Reasons</b>
                </Link>
              </li>
              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/penalties">
                  <b>Penalties</b>
                </Link>
              </li>

              <li className="nav-item rounded border-4 m-1">
                <Link className={navLinkClassName} to="/penalty_reasons">
                  <b>Penalty Reasons</b>
                </Link>
              </li>
            </ul>

            {/* User/Logout Buttons */}
            <ul className="navbar-nav">
              <li
                className="nav-item btn m-1 p-2 border border-1 rounded"
                onClick={() => {
                  navigate("/user_details", {
                    state: {
                      id: localStorage.getItem("id"),
                      email: localStorage.getItem("email"),
                      username: localStorage.getItem("username"),
                      firstName: localStorage.getItem("firstName"),
                      lastName: localStorage.getItem("lastName"),
                      phoneNumber: localStorage.getItem("phoneNumber"),
                      role: localStorage.getItem("role"),
                    },
                  });
                }}
              >
                👤<b> {localStorage.getItem("username")}</b>
              </li>
              <li className="nav-item rounded m-1">
                <Link
                  className="nav-link text-light bg-danger rounded p-2 border border-3 border-danger"
                  to="/login"
                  onClick={() => {
                    let res = Logout();
                    if (res) {
                      navigate("/login", { replace: true });
                    } else {
                      alert(res);
                    }
                  }}
                >
                  <b>Logout</b>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default NavBar;
