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
    // checks if someone is logged in
    if (sessionStorage.getItem("currentUser") === null) {
      new comp.ul(
        {},
        new comp.title("h1", {}, "Welcome To Mission Control")
      ).render("#navBar")
    } else {
      // there is a user logged in so display the navbar
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
      $("#currentLogin").click(function () { $("#subNav").toggle() });
      $("#edit").click(function () {
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

        // set event listeners for navbar edit buttons
        document.querySelectorAll("button").forEach((button) => {
          button.addEventListener("click", () => {
            if (event.target.textContent === "Edit Profile") {
              let tempUser = {
                id: currentUser.id,
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                email: document.getElementById("email").value,
                profilePic: document.getElementById("profilePic").value
              }
              // if first name is blank, populates with recent data on user
              if (tempUser.firstName === "") {
                tempUser.firstName = currentUser.firstName;
              }
              // if last name is blank, populates with recent data
              if (tempUser.lastName === "") {
                tempUser.lastName = currentUser.lastName;
              }
              // if password is blank, populates with recent data
              if (tempUser.password === "") {
                tempUser.password = currentUser.password;
              }
              // if profile pic is blank, populates with recent image
              if (tempUser.profilePic === "") {
                tempUser.profilePic = currentUser.profilePic;
              }
              // calls function to check email and username uniqueness
              navBar.checkEmail(tempUser, currentUser)
            } else {
              $("#subNav").hide();//sets status of edit and log out buttons to hide
              buildMissionControl.printPlanets(); //prints main mission control page
            }
          })
        })
      });
      // log out function
      $("#logOut").click(function () {
        $("#navBar").html("");
        $(".container--inner").html("");
        sessionStorage.removeItem("currentUser");
        navBar.loadNavBar();
        landingPageFuncs.loadLandingPage();
      });
    }

    // sets navigation values for all other navbar links
    document.querySelector("#navBar").addEventListener("click", (event) => {
      if (event.target.textContent === "Home") {
        $("#subNav").hide();
        buildMissionControl.printPlanets();
      } else if (event.target.textContent === "Tasks") {
        $("#subNav").hide();
        buildTasks.buildContainers();
      } else if (event.target.textContent === "Events") {
        $("#subNav").hide();
        buildEvents.buildContainers()
      } else if (event.target.textContent === "Messages") {
        $("#subNav").hide();
        buildMessages.messageMap();
      } else if (event.target.textContent === "News") {
        $("#subNav").hide();
        buildNews.newsMap();
      } else if (event.target.textContent === "Friends") {
        $("#subNav").hide();
        // need to add function call here for friends
        console.log("Friends function calles.")
      }
    })
  },

  checkEmail(tempUser, currentUser) {
    // sets email to previous if deleted
    if (tempUser.email === "") {
      tempUser.email = currentUser.email;
      document.getElementById("email").value = currentUser.email;
      // checks if an @ is in email to validate
    } else if (tempUser.email.indexOf("@") === -1) {
      tempUser.email = currentUser.email;
      document.getElementById("email").value = currentUser.email;
      alert("Please enter a valid email address.");
    }
    // sets username to previous value if blank
    if (tempUser.username === "") {
      tempUser.username = currentUser.username;
      document.getElementById("username").value = currentUser.username;
      // checks that no @ is present in username
    } else if (tempUser.username.indexOf("@") !== -1) {
      tempUser.username = currentUser.username;
      document.getElementById("username").value = currentUser.username;
      alert("@ is not an allowed character in usernames.")
    }
    // grab email based on what user input
    API.getOneFromCategory("users", `?email=${tempUser.email}`).then(emailResults => {
      return emailResults[0];
    })
      .then(emailResults => {
        if (emailResults !== undefined) {
          if (emailResults.id !== currentUser.id) {
            alert("This email is in use by another account.")
            tempUser.email = currentUser.email;
            document.getElementById("email").value = currentUser.email;
            return tempUser;
          } else {
            return tempUser;
          }
        } else {
          return tempUser;
        }
      }).then(user => {
        API.getOneFromCategory("users", `?username=${tempUser.username}`).then(usernameResults => {
          if (usernameResults.length !== 0) {
            if (usernameResults[0].id !== user.id) {
              tempUser.username = currentUser.username;
              alert("This username is in use by another account.")
            }
          }
          return user;
        }).then(thisResult => {
          sessionStorage.removeItem("currentUser");
          sessionStorage.setItem("currentUser", JSON.stringify(thisResult));
          API.updateItem("users", currentUser.id, thisResult).then(() => {
            $("#subNav").hide();
            $("#navBar").html("");
            navBar.loadNavBar();
            buildMissionControl.printPlanets();
          });
        })
      })

  }
}


export default navBar