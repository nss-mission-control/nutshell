import comp from "./components"
import logInFuncs from "./login"
import registerFuncs from "./register"

const landingPageFuncs = {
  loadLandingPage() {
    new comp.div(
      { classList: "welcome" },
      new comp.title("h1", { className: "title" }),
      new comp.div({className: "WelcomeNav"},
        new comp.title("h2", {className: "logInNav"}, "Log In"),
        new comp.title("h2", {className: "logInNav"}, "Register")),
      new comp.div({className: "LogIn"})).render(".container--inner")

      logInFuncs.loadLogIn()
        document.querySelectorAll(".logInNav").forEach((element)=>{
          element.addEventListener("click", (e)=>{
            if(e.target.textContent === "Log In"){
              console.log("you have selected the log in form")
              logInFuncs.loadLogIn()
            } else if(e.target.textContent === "Register"){
              console.log("you have selected the register form")
              registerFuncs.loadRegister()
            }
          })
        })

}
}

export default landingPageFuncs