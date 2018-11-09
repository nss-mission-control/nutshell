import comp from "./components"
import logInFuncs from "./login";

const registerFuncs = {
  loadRegister(){
    document.querySelector(".container--inner").innerHTML = ""
    let register = new comp.form(
      new comp.label({}, "First Name"),
      new comp.input({name: "firstName", placeholder: "First Name"}),
      new comp.label({}, "Last Name"),
      new comp.input({name: "lastName", placeholder: "Last Name"}),
      new comp.label({}, "Email"),
      new comp.input({ type: "email", name: "email", placeholder: "email"}),
      new comp.label({}, "Username"),
      new comp.input({name: "username", placeholder: "username"}),
      new comp.label({for: "password"}, "Password"),
      new comp.input({name: "password", placeholder: "Password"}),
      new comp.label({for: "confirmPassword"}, "Confirm Password"),
      new comp.input({name: "confirmPassword", placeholder: "Confirm Password"}),
      new comp.btn("Register Account"),
      new comp.btn("Already a user? Log in now")
    ).render(".container--inner")

    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.textContent === "Register Account") {
          e.preventDefault()
          console.log("registering new account");
        } else {
          logInFuncs.loadLogIn()
        }
      })
    })

  }
}
export default registerFuncs