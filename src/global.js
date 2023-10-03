const Biker_System_URL = "http://127.0.0.1:8000/api/";

async function Logout() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");

    return true;
  } catch (e) {
    alert(e);
    return e;
  } finally {
  }
}

//format date
function FormatDateTime(date) {
  // Extract date components
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hours = date.getHours();
  let minutes = ("0" + date.getMinutes()).slice(-2);

  // Determine AM or PM suffix based on the hour
  let suffix = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour time
  hours = hours % 12 || 12;
  hours = ("0" + hours).slice(-2); // pad with zero

  return `${year}-${month}-${day} ${hours}:${minutes} ${suffix}`;
}

async function CheckToken() {
  var token = localStorage.getItem("token");

  await fetch(Biker_System_URL + "api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        alert(response);
      }
      return response;
    })
    .catch((error) => {
      alert(error);
      return null;
    })
    .finally(() => {
      console.log("complete login api");
    });
}

export { Biker_System_URL, CheckToken, Logout, FormatDateTime };
