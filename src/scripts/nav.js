import comp from "./components";
import buildMessages from "./messages";
import buildNews from "./news";
import buildMissionControl from "./missionControl";
import buildTasks from "./tasks";
import buildEvents from "./events";
import activeUser from "./sessionStorage";
import landingPageFuncs from "./landing";
import API from "./apiData";
import buildFriends from "./friends";

const navBar = {
  loadNavBar() {
    // checks if someone is logged in
    if (sessionStorage.getItem("currentUser") === null) {
      new comp.ul(
        {},
        new comp.title("h1", {}, "Welcome To Mission Control")
      ).render("#navBar")
    } else {
      $("#navBar").html(null);
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
      ).render("#navBar");
      $("#subNav").hide();
      $("#loginPic").click(function () { $("#subNav").toggle() });
      $("#currentLogin").click(function () { $("#subNav").toggle() });
      navBar.eventListenerNav();


      $("#edit").click(function () {
        let currentUser = JSON.parse(sessionStorage.currentUser);
        $(".container--inner").html("");
        new comp.div({ id: "editForm" },
          new comp.image({ id: "editPagePic", src: `${activeUser.info().profilePic}`, alt: "Profile Pic", className: "messagePic" }),
          //
          new comp.label({ for: "profilePic", id: "radioLabel" }, "Select Profile Pic"),
          new comp.div({ name: "profilePic", id: "profilePicSection" },
            new comp.section({},
              new comp.input({ type: "radio", name: "picRadio", checked: "checked", value: `${currentUser.profilePic}`, className: "radio" }),
              new comp.image({ className: "selectPic", src: `${currentUser.profilePic}` })),
            new comp.section({},
              new comp.input({ type: "radio", name: "picRadio", value: "./images/option7edit.jpg", className: "radio" }),
              new comp.image({ className: "selectPic", src: "./images/option7edit.jpg" })),
            new comp.section({},
              new comp.input({ type: "radio", name: "picRadio", value: "./images/option8edit.jpg", className: "radio" }),
              new comp.image({ className: "selectPic", src: "./images/option8edit.jpg" })),
            new comp.section({},
              new comp.input({ type: "radio", name: "picRadio", value: "./images/option1edit.jpg", className: "radio" }),
              new comp.image({ className: "selectPic", src: "./images/option1edit.jpg" })),
            new comp.section({},
              new comp.input({ type: "radio", name: "picRadio", value: "./images/option2edit.jpg", className: "radio" }),
              new comp.image({ className: "selectPic", src: "./images/option2edit.jpg" })),
            new comp.section({},
              new comp.input({ type: "radio", name: "picRadio", value: "./images/option3edit.jpg", className: "radio" }),
              new comp.image({ className: "selectPic", src: "./images/option3edit.jpg" })),
            new comp.section({},
              new comp.input({ type: "radio", name: "picRadio", value: "./images/option4edit.jpg", className: "radio" }),
              new comp.image({ className: "selectPic", src: "./images/option4edit.jpg" })),
            new comp.section({},
              new comp.input({ type: "radio", name: "picRadio", value: "./images/option5edit.jpg", className: "radio" }),
              new comp.image({ className: "selectPic", src: "./images/option5edit.jpg" })),
            new comp.section({},
              new comp.input({ type: "radio", name: "picRadio", value: "./images/option6edit.jpg", className: "radio" }),
              new comp.image({ className: "selectPic", src: "./images/option6edit.jpg" })),
            new comp.section({},
              new comp.input({ type: "radio", name: "picRadio", value: "./images/option0edit.jpg", className: "radio" }),
              new comp.image({ className: "selectPic", src: "./images/option0edit.jpg" })),
            new comp.section({},
              new comp.input({ type: "radio", value: "addPhotoUrl", name: "picRadio", className: "registerPicRadio" }),
              new comp.image({ className: "selectPic", src: "./images/addPhoto.jpg" }))
          ),
          new comp.label({ for: "profilePicText", id: "picUrlContainer"}, "Add Web Address of Your Own Image",
            new comp.input({ name: "profilePicText", id: "profilePicText", placeholder: "Enter The URL Of Your Profile Pic" })),
          //
          new comp.label({}, "First Name",
            new comp.input({ name: "firstName", id: "firstName", placeholder: "First Name", value: `${currentUser.firstName}` })),
          new comp.label({}, "Last Name",
            new comp.input({ name: "lastName", id: "lastName", placeholder: "Last Name", value: `${currentUser.lastName}` })),
          new comp.label({}, "Email",
            new comp.title("p", { className: "alert", id: "emailValidAlert" }, "Please enter a valid email address."),
            new comp.title("p", { className: "alert", id: "emailTakenAlert" }, "This email is registered to another account."),
            new comp.input({ type: "email", id: "email", name: "email", placeholder: "email", value: `${currentUser.email}` })),
          new comp.label({}, "Username",
            new comp.title("p", { className: "alert", id: "usernameValidAlert" }, "@ is not allowed in usernames."),
            new comp.title("p", { className: "alert", id: "usernameTakenAlert" }, "This username is registered to another account."),
            new comp.input({ name: "username", id: "username", placeholder: "username", value: `${currentUser.username}` })),
          new comp.label({ for: "password" }, "Password",
            new comp.input({ name: "password", id: "password", placeholder: "Password", value: `${currentUser.password}` })),
          new comp.btn("Save Changes"),
          new comp.btn("Abort Changes")).render(".container--inner");

        $(".alert").toggle();
        $(".alert").hide();
        $("#picUrlContainer").toggle();
        $("#picUrlContainer").hide();

        $("#profilePicSection").click(function () {
          let tempValue = $("input[name='picRadio']:checked").val();
          console.log(tempValue);
          if (tempValue === "addPhotoUrl") {
            $("#picUrlContainer").show();
          } else {
            $("#picUrlContainer").hide()
          }
        });

        // set event listeners for navbar edit buttons
        document.querySelectorAll(".btn").forEach((button) => {
          button.addEventListener("click", () => {
            if (event.target.textContent === "Save Changes") {
              let picProfile = "";
              if ($("#profilePicText").val() === "") {
                picProfile = $("input[name='picRadio']:checked").val();
              } else {
                picProfile = $("#profilePicText").val();
              }
              $(".alert").hide()
              let tempUser = {
                id: currentUser.id,
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                email: document.getElementById("email").value,
                profilePic: picProfile
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
  },

  eventListenerHandler(event) {
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
        buildNews.friendsFinder();
      } else if (event.target.textContent === "Friends") {
        $("#subNav").hide();
        buildFriends.friendMap();
      }
  },

  eventListenerNav() {
    let tempHolder = document.querySelector("#navBar");
    tempHolder.addEventListener("click", navBar.eventListenerHandler);
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
      $("#emailValidAlert").toggle();
    }
    // sets username to previous value if blank
    if (tempUser.username === "") {
      tempUser.username = currentUser.username;
      document.getElementById("username").value = currentUser.username;
      // checks that no @ is present in username
    } else if (tempUser.username.indexOf("@") !== -1) {
      tempUser.username = currentUser.username;
      document.getElementById("username").value = currentUser.username;
      $("#usernameValidAlert").toggle();
    }
    // grab email based on what user input
    API.getOneFromCategory("users", `?email=${tempUser.email}`).then(emailResults => {
      return emailResults[0];
    })
      // checks email against database to ensure it is unique
      .then(emailResults => {
        if (emailResults !== undefined) {
          if (emailResults.id !== currentUser.id) {
            tempUser.email = currentUser.email;
            document.getElementById("email").value = currentUser.email;
            $("#emailTakenAlert").toggle();
            return tempUser;
          } else {
            return tempUser;
          }
        } else {
          return tempUser;
        }
      }).then(user => {
        // checks username against database to ensure it is unique
        API.getOneFromCategory("users", `?username=${tempUser.username}`).then(usernameResults => {
          if (usernameResults.length !== 0) {
            if (usernameResults[0].id !== user.id) {
              tempUser.username = currentUser.username;
              document.getElementById("username").value = currentUser.username;
              $("#usernameTakenAlert").toggle();
            }
          }
          return user;
        }).then(thisResult => {
          // checks to make sure all alerts are invisible
          let alertMess = $(".alert:visible");
          if (alertMess.length === 0) {
            sessionStorage.removeItem("currentUser");
            sessionStorage.setItem("currentUser", JSON.stringify(thisResult));
            API.updateItem("users", currentUser.id, thisResult).then(() => {
              $("#subNav").hide();
              $("#navBar").html("");
              navBar.loadNavBar();
              buildMissionControl.printPlanets();
            });
          }
        })
      })
  }
}


export default navBar