import comp from "./components"
import logInFuncs from "./login";
import API from "./apiData";

const registerFuncs = {
  loadRegister(){
    document.querySelector(".container--inner").innerHTML = ""
    new comp.form(
      new comp.label({}, "First Name"),
      new comp.input({name: "firstName", id: "firstName", placeholder: "First Name"}),
      new comp.label({}, "Last Name"),
      new comp.input({name: "lastName", id: "lastName", placeholder: "Last Name"}),
      new comp.label({}, "Email"),
      new comp.input({type: "email", id: "email", name: "email", placeholder: "email"}),
      new comp.label({}, "Username"),
      new comp.input({name: "username", id: "username", placeholder: "username"}),
      new comp.label({for: "password"}, "Password"),
      new comp.input({name: "password", id: "password", placeholder: "Password"}),
      new comp.label({for: "confirmPassword"}, "Confirm Password"),
      new comp.input({name: "confirmPassword", placeholder: "Confirm Password"}),
      new comp.btn("Register Account"),
      new comp.btn("Already a user? Log in now")
    ).render(".container--inner")
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.textContent === "Register Account") {
          e.preventDefault()
          let tempUser = {
            username: document.querySelector("#username").value,
            password: document.querySelector("#password").value
          }
          this.checkRegister(tempUser);
          console.log("registering new account");
        } else {
          logInFuncs.loadLogIn()
        }
      })
    })
  },
  checkRegister(user) {
    if (user.username === "" || user.username ==="") {
      alert("You must enter both a username and a password to create an account.")
    } else {
      console.log(user)
    }
  }
}
export default registerFuncs