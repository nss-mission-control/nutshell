// Author(s): Kelly Morin, Jase Hackman, Brendan McCray, Brad Davis
// Purpose: Used to create navigation links on initial form

import comp from "./components"
import logInFuncs from "./login"
import registerFuncs from "./register"

const landingPageFuncs = {

  // creates inital div with login and register text elements
  loadLandingPage() {
    new comp.div({ classList: "welcome" },
      new comp.div({className: "WelcomeNav"},
        new comp.title("h2", {className: "logInNav"}, "Log In"),
        new comp.title("h2", {className: "logInNav"}, "Register")),
      new comp.div({className: "Log_In"})).render(".container--inner")

      // sets event listeners to text elements
      logInFuncs.loadLogIn()
        document.querySelectorAll(".logInNav").forEach((element)=>{
          element.addEventListener("click", (e)=>{
            if(e.target.textContent === "Log In"){
              logInFuncs.loadLogIn()
            } else if(e.target.textContent === "Register"){
              document.querySelector(".welcome").removeAttribute("id");
              registerFuncs.loadRegister()
            }
          })
        })

}
}

export default landingPageFuncs