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
          element.addEventListener("click", (event)=>{
            document.querySelectorAll(".logInNav").forEach((element)=>{
            element.removeAttribute("id", "activeDir")})
            if(event.target.textContent === "Log In"){
              document.querySelector(".Log_In").removeAttribute("id", "registerLogin");
              logInFuncs.loadLogIn()
            } else if(event.target.textContent === "Register"){
              document.querySelector(".welcome").removeAttribute("id");
              registerFuncs.loadRegister()
            }
          })
        })

}
}

export default landingPageFuncs