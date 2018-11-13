import comp from "./components"
import registerFuncs from "./register"
import API from "./apiData";
import buildMissionControl from "./missionControl";
import navBar from "./nav";

const logInFuncs = {
  checkUser(username, password) {
    if (username === "" || password ==="") {
      alert("You must enter both your username and password to log in.")
    } else {
      API.getAllCategory(`users/?username=${username}`).then(data => {
        if (data.length === 0) {
          alert("There is no user with that username.");
          return;
        } else if (password === data[0].password) {
          let currentUser = new comp.user (data[0]);
          currentUser.id = data[0].id;
          return currentUser;
        } else ( alert("You entered the wrong password. Try again."))
      }).then(currentUser => {
        if (currentUser !== undefined) {
          sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
          document.querySelector("#navBar").innerHTML = "";
          navBar.loadNavBar();
          buildMissionControl.printPlanets();
        }

      })
    }
  },
  loadLogIn() {
    document.querySelector(".LogIn").innerHTML = "";
      new comp.label({}, "Username", new comp.input({ name: "username", id: "username", placeholder: "username" })).render(".LogIn")
      new comp.label({ for: "password" }, "Password", new comp.input({ type: "password",name: "password", id: "password", placeholder: "Password" })).render(".LogIn")
      new comp.btn("Login Now").render(".LogIn")
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.textContent === "Login Now") {
          this.checkUser(document.querySelector("#username").value, document.querySelector("#password").value)
        } else {
          registerFuncs.loadRegister()
        }
      })
    })
  }
}
export default logInFuncs