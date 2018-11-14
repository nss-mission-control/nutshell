import comp from "./components"
import registerFuncs from "./register"
import API from "./apiData";
import buildMissionControl from "./missionControl";
import navBar from "./nav";

const logInFuncs = {

  checkUser(username, password) {
    if (username === "" && password === "") {
      $("#noInfoLogin").toggle();
      return;
    } else if (username === "") {
      $("#noUsernameLogin").toggle();
      return;
    } else if (password === "") {
      $("#noPasswordLogin").toggle();
      return;
    }
    API.getAllCategory(`users/?username=${username}`).then(data => {
      if (data.length === 0) {
        $("#nameNotFoundLogin").toggle();
        return;
      } else if (password === data[0].password) {
        let currentUser = new comp.user(data[0]);
        currentUser.id = data[0].id;
        return currentUser;
      } else ($("#badPasswordLogin").toggle())
    }).then(currentUser => {
      if (currentUser !== undefined) {
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        document.querySelector("#navBar").innerHTML = "";
        navBar.loadNavBar();
        buildMissionControl.printPlanets();
      }

    })
  },

  loadLogIn() {
    document.querySelector(".Log_In").innerHTML = "";
    document.querySelector(".welcome").setAttribute("id", "login")
    new comp.title("p", { className: "alert", id: "noInfoLogin" }, "You must enter your username and password to log in.").render(".Log_In");
    new comp.title("p", { className: "alert", id: "noUsernameLogin" }, "You must enter your username to log in.").render(".Log_In");
    new comp.title("p", { className: "alert", id: "nameNotFoundLogin" }, "There is not an account with that username.").render(".Log_In");
    new comp.label({}, "Username",
      new comp.input({ name: "username", id: "username", placeholder: "Enter Username Here" })).render(".Log_In")
    new comp.title("p", { className: "alert", id: "noPasswordLogin" }, "You must enter your password to log in.").render(".Log_In");
    new comp.title("p", { className: "alert", id: "badPasswordLogin" }, "The password you entered is incorrect.").render(".Log_In");
    new comp.label({ for: "password" }, "Password",
      new comp.input({name: "password", id: "password", placeholder: "Enter Password Here" })).render(".Log_In")
    new comp.btn("Login Now").render(".Log_In")
    $(".alert").toggle();
    $(".alert").hide();
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.textContent === "Login Now") {
          $(".alert").hide();
          this.checkUser(document.querySelector("#username").value, document.querySelector("#password").value)
        } else {
          registerFuncs.loadRegister()
        }
      })
    })
  }
}
export default logInFuncs