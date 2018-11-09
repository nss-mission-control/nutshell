import comp from "./components"

const logInFuncs = {
  loadLogIn(){
    document.querySelector(".container--inner").innerHTML = ""
    let logIn = new comp.form(
      new comp.label({}, "Username"),
      new comp.input({name: "username", placeholder: "username"}),
      new comp.label({for: "password"}, "Password"),
      new comp.input({name: "password", placeholder: "Password"}),
      new comp.btn("Login Now"),
      new comp.btn("Not a user? Create new account.")
    ).render(".container--inner")

    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.textContent === "Login Now") {
          e.preventDefault()
          console.log("login now");
        } else {
          e.preventDefault()
          console.log("register user");
        }
      })
    })

  }
}
export default logInFuncs