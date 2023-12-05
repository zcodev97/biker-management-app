import { useState, React, useEffect } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { Biker_System_URL } from "../global";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function checkUserInfo() {
    setLoading(true);
    await fetch(Biker_System_URL + "auth/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("firstName", data.user.first_name);
        localStorage.setItem("lastName", data.user.last_name);
        localStorage.setItem("lastName", data.user.is_active);
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("phoneNumber", data.user.department);
        localStorage.setItem("userPer", JSON.stringify(data.user.groups));
        localStorage.setItem("token_exp", data.token_exp_date);
        navigate("/bikers", { replace: true });
      })
      .catch((error) => {
        // alert(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  if (loading) return <Loading />;

  return (
    <>
      <form>
        <div className="container-fluid bg-light text-dark p-2 mb-5 text-center rounded"></div>
        <div className="container w-50 text-center p-4  bg-dark text-light rounded mb-1">
          <h1>
            <b>Biker Management System </b>
          </h1>
        </div>
        <div className="container p-1 w-50 border-bottom border-dark border-3 rounded text-center text-dark">
          <h1 className="text-center pt-5">
            <b> Login </b>
          </h1>

          <div className="row d-flex justify-content-center align-items-center p-4 m-1">
            <div className="col-md-6 m-1">
              <div className="container">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Username..."
                  name="email"
                  onChange={handleUsername}
                />
              </div>
            </div>
            <div className="col-md-6 m-1">
              <div className="container">
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Password..."
                  name="pswd"
                  onChange={handlePassword}
                />
              </div>
            </div>
          </div>

          <button
            className="btn btn-success border boder-light border-2 "
            onClick={async () => {
              await checkUserInfo();
            }}
            onKeyDown={async () => {
              await checkUserInfo();
            }}
          >
            <b> Sign In</b>
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
