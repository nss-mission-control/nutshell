import comp from "./components"
import logInFuncs from "./login"
import buildMessages from "./messages";
import buildNews from "./news";
import buildMissionControl from "./missionControl";
import buildTasks from "./tasks";
import buildEvents from "./events";
import activeUser from "./sessionStorage";
import landingPageFuncs from "./landing";


const navBar = {
  loadNavBar() {
    if (sessionStorage.getItem("currentUser") === null) {
      new comp.ul(
        {},
        new comp.li({}, "Log In")
      ).render("#navBar")
    } else {
      new comp.ul(
        {},
        new comp.li({}, "Home"),
        new comp.li({}, "Tasks"),
        new comp.li({}, "Events"),
        new comp.li({}, "Messages"),
        new comp.li({}, "News"),
        new comp.li({}, "Friends"),
        new comp.li({ id: "logIn" }, new comp.image({ id: "loginPic", src: `${activeUser.info().profilePic}`, alt: "Profile Pic", className: "messagePic" }),
          new comp.section({ id: "subNav" }, new comp.title("h3", { className: "subNavItem", id: "edit" }, "Edit Profile"),
            new comp.title("h3", { className: "subNavItem", id: "logOut" }, "Log Out"))
        )
      ).render("#navBar")
      $("#subNav").hide();
      $("#loginPic").click(function () { $("#subNav").toggle() });
      $("#logOut").click(function () {
        $("#navBar").html("");
        $(".container--inner").html("");
        sessionStorage.removeItem("currentUser");
        navBar.loadNavBar();
        landingPageFuncs.loadLandingPage();
      });



    }


    document.querySelector("#navBar").addEventListener("click", (event) => {
      if (event.target.textContent === "Home") {
          buildMissionControl.printPlaceholder();
      } else if (event.target.textContent === "Tasks") {
          buildTasks.buildContainers();
      } else if (event.target.textContent === "Events") {
          buildEvents.buildContainers()
      } else if (event.target.textContent === "Messages") {
          buildMessages.messageMap();
      } else if (event.target.textContent === "News") {
          buildNews.newsMap();
      } else if (event.target.textContent === "Friends") {
          console.log("Friends function calles.")
      }
    })
  },

}


export default navBar