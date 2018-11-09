import comp from "./components"

const landingPageFuncs = {
  loadLandingPage() {
    let div2 = new comp.div(
      { classList: "welcome" },
      new comp.title("h1", { className: "title" }, "Welcome to Mission Control"),
      new comp.btn({className: "btn"}, "Login"),
      new comp.btn({className: "btn"}, "Register"))
    div2.render(".container--inner")
    let buttons = document.querySelectorAll("button")

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.textContent === "Login") {
          console.log("login");
        } else {
          console.log("register");
        }
      })
    })

  }
}

export default landingPageFuncs