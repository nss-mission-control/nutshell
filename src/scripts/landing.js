import comp from "./components"
import logInFuncs from "./login"
import registerFuncs from "./register"

const landingPageFuncs = {
  loadLandingPage() {
    let div2 = new comp.div(
      { classList: "welcome" },
      new comp.title("h1", { className: "title" }, "Welcome to Mission Control"),
      new comp.btn("Login"),
      new comp.btn("Register"))
    div2.render(".container--inner")
    let buttons = document.querySelectorAll("button")

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.textContent === "Login") {
          logInFuncs.loadLogIn()
        } else {
          registerFuncs.loadRegister()
        }
      })
    })

  }
}

export default landingPageFuncs