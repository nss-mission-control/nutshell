import comp from "./components"
import logInFuncs from "./login"
import registerFuncs from "./register"

const landingPageFuncs = {
  loadLandingPage() {
    new comp.div({ classList: "welcome" },
      new comp.div({className: "WelcomeNav"},
        new comp.title("h2", {className: "logInNav"}, "Log In"),
        new comp.title("h2", {className: "logInNav"}, "Register")),
      new comp.div({className: "Log_In"})).render(".container--inner")

      logInFuncs.loadLogIn()
        document.querySelectorAll(".logInNav").forEach((element)=>{
          element.addEventListener("click", (e)=>{
            if(e.target.textContent === "Log In"){
              logInFuncs.loadLogIn()
            } else if(e.target.textContent === "Register"){
              registerFuncs.loadRegister()
            }
          })
        })

}
}

export default landingPageFuncs