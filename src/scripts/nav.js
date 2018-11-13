import comp from "./components"
import logInFuncs from "./login"
import buildMessages from "./messages";
import buildNews from "./news";
import buildMissionControl from "./missionControl";
import buildTasks from "./tasks";
import buildEvents from "./events";
import activeUser from "./sessionStorage";
import landingPageFuncs from "./landing";
import API from "./apiData";

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
          new comp.title("h4", { id: "currentLogin" }, `${activeUser.info().username}`),
          new comp.section({ id: "subNav" }, new comp.title("h3", { className: "subNavItem", id: "edit" }, "Edit Profile"),
            new comp.title("h3", { className: "subNavItem", id: "logOut" }, "Log Out"))
        )
      ).render("#navBar")
      $("#subNav").hide();
      $("#loginPic").click(function () { $("#subNav").toggle() });
      $("#edit").click(function() {
        let currentUser = JSON.parse(sessionStorage.currentUser);
        $(".container--inner").html("");
        new comp.div({ id: "editForm" }, new comp.label({}, "First Name", new comp.input({ name: "firstName", id: "firstName", placeholder: "First Name", value: `${currentUser.firstName}` })),
          new comp.label({}, "Last Name", new comp.input({ name: "lastName", id: "lastName", placeholder: "Last Name", value: `${currentUser.lastName}` })),
          new comp.label({}, "Email", new comp.input({ type: "email", id: "email", name: "email", placeholder: "email", value: `${currentUser.email}` })),
          new comp.label({}, "Username", new comp.input({ name: "username", id: "username", placeholder: "username", value: `${currentUser.username}` })),
          new comp.label({ for: "password" }, "Password", new comp.input({ name: "password", id: "password", placeholder: "Password", value: `${currentUser.password}` })),
          new comp.label({ for: "profilePic" }, "Profile Picture", new comp.input({ name: "profilePic", id: "profilePic", placeholder: "Profile Picture URL", value: `${currentUser.profilePic}` })),
          new comp.btn("Edit Profile"),
          new comp.btn("Abort Changes")).render(".container--inner");
          document.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", () => {
              if (event.target.textContent === "Edit Profile") {
                let tempUser = {
                  firstName: document.getElementById("firstName").value,
                  lastName: document.getElementById("lastName").value,
                  username: document.getElementById("username").value,
                  password: document.getElementById("password").value,
                  email: document.getElementById("email").value,
                  profilePic: document.getElementById("profilePic").value
                }
                API.updateItem("users", currentUser.id, tempUser).then(() => {
                  $("#subNav").hide();
                  buildMissionControl.printPlanets();
                });
              } else {
                buildMissionControl.printPlanets()
              }
            })
          })
        });
      $("#logOut").click(function () {
        $("#navBar").html("");
        $(".container--inner").html("");
        sessionStorage.removeItem("currentUser");
        navBar.loadNavBar();
        landingPageFuncs.loadLandingPage();
      });
    }


    document.querySelector("#navBar").addEventListener("click", (event) => {
      if (event.target.textContent === "Log In") {
        logInFuncs.loadLogIn();
      }
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