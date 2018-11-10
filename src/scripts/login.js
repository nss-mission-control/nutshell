import comp from "./components"
import registerFuncs from "./register"
import API from "./apiData";

const logInFuncs = {
  checkUser(username, password) {
    if (username === "" || password ==="") {
      alert("You must enter both your username and password to log in.")
    } else {
      API.getAllCategory(`users/?username=${username}`).then(data => {
        if (password === data[0].password) {
          let currentUser = new comp.user (data[0]);
          return currentUser;
        } else ( alert("You entered the wrong password. Try again."))
      }).then(currentUser => {
        if (currentUser !== undefined) {
        console.log(currentUser.test());
        console.log(currentUser);
        //this will be the function to send to the mission control page
        }
      })
    }
  },
  loadLogIn() {
    document.querySelector(".container--inner").innerHTML = ""
    new comp.form(
      new comp.label({}, "Username"),
      new comp.input({ name: "username", id: "username", placeholder: "username" }),
      new comp.label({ for: "password" }, "Password"),
      new comp.input({ name: "password", id: "password", placeholder: "Password" }),
      new comp.btn("Login Now"),
      new comp.btn("Not a user? Create new account.")
    ).render(".container--inner")
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