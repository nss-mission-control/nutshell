import comp from "./components"
import logInFuncs from "./login"
import buildMessages from "./messages";
import buildNews from "./news";


const navBar = {
  loadNavBar() {
    new comp.ul(
      {},
      new comp.li({}, "Home"),
      new comp.li({}, "Tasks"),
      new comp.li({}, "Events"),
      new comp.li({}, "Messages"),
      new comp.li({}, "News"),
      new comp.li({}, "Friends"),
      new comp.li({}, "Log Out")
    ).render("#navBar")

    document.querySelector("#navBar").addEventListener("click", (event) => {
      if (event.target.textContent === "Home") {
        logInFuncs.loadLogIn()
      } else if (event.target.textContent == "Tasks") {
        console.log("Task function called.")
      } else if (event.target.textContent == "Events") {
        console.log("Events function called.")
      } else if (event.target.textContent == "Messages") {
        buildMessages.messageMap();
      } else if (event.target.textContent == "News") {
        buildNews.newsMap();
      } else if (event.target.textContent == "Friends") {
        console.log("Friends function calles.")
      } else if (event.target.textContent == "Log Out") {
        console.log("Log Out function called.")
      }
    })
  }

}

export default navBar