import comp from "./components";
import buildMissionControl from "./missionControl";
import logInFuncs from "./login";
import API from "./apiData";
import navBar from "./nav";

const registerFuncs = {

  loadRegister() {
    document.querySelector(".Log_In").innerHTML = "";
    document.querySelector(".Log_In").setAttribute("id", "registerLogin")
    new comp.title("p", { className: "alertRegister", id: "firstNameRegister" }, "You must enter your first name to register.").render(".Log_In");
    new comp.label({}, "First Name",
      new comp.input({ name: "firstName", id: "firstName", placeholder: "First Name" })).render(".Log_In");
    new comp.title("p", { className: "alertRegister", id: "lastNameRegister" }, "You must enter your last name to register.").render(".Log_In");
    new comp.label({}, "Last Name",
      new comp.input({ name: "lastName", id: "lastName", placeholder: "Last Name" })).render(".Log_In");
    new comp.title("p", { className: "alertRegister", id: "emailBlankRegister" }, "You must enter your email to register.").render(".Log_In");
    new comp.title("p", { className: "alertRegister", id: "notValidEmailRegister" }, "You must enter a valid email to register.").render(".Log_In");
    new comp.title("p", { className: "alertRegister", id: "emailExistsRegister" }, "There is already an account registered to this email.").render(".Log_In");
    new comp.label({}, "Email",
      new comp.input({ type: "email", id: "email", name: "email", placeholder: "email" })).render(".Log_In")
    new comp.title("p", { className: "alertRegister", id: "usernameBlankRegister" }, "You must enter a username to register.").render(".Log_In");
    new comp.title("p", { className: "alertRegister", id: "notValidUsernameRegister" }, "@ symbol is not allowed in your username.").render(".Log_In");
    new comp.title("p", { className: "alertRegister", id: "usernameExistsRegister" }, "There is already an account registered to this username.").render(".Log_In");
    new comp.label({}, "Username",
      new comp.input({ name: "username", id: "username", placeholder: "username" })).render(".Log_In")
    new comp.title("p", { className: "alertRegister", id: "passwordBlankRegister" }, "You must enter and confirm your password.").render(".Log_In");
    new comp.label({ for: "password" }, "Password",
      new comp.input({ type: "password", name: "password", id: "password", placeholder: "Password" })).render(".Log_In")
    new comp.title("p", { className: "alertRegister", id: "badConfirmPasswordRegister" }, "The passwords entered do not match.").render(".Log_In");
    new comp.label({ for: "confirmPassword" }, "Confirm Password",
      new comp.input({ type: "password", name: "confirmPassword", id: "confirmPassword", placeholder: "Confirm Password" })).render(".Log_In");
    new comp.label({ for: "profilePic", id: "registerRadioLabel" }, "Select Profile Pic").render(".Log_In");
    new comp.div({ name: "profilePic", id: "registerProfilePicSection" },
      new comp.section({},
        new comp.input({ type: "radio", name: "picRadio", checked: "checked", value: "./images/option7edit.jpg", className: "registerPicRadio" }),
        new comp.image({ className: "selectPic", src: "./images/option7edit.jpg" })),
      new comp.section({},
        new comp.input({ type: "radio", name: "picRadio", value: "./images/option8edit.jpg", className: "registerPicRadio" }),
        new comp.image({ className: "selectPic", src: "./images/option8edit.jpg" })),
      new comp.section({},
        new comp.input({ type: "radio", name: "picRadio", value: "./images/option1edit.jpg", className: "registerPicRadio" }),
        new comp.image({ className: "selectPic", src: "./images/option1edit.jpg" })),
      new comp.section({},
        new comp.input({ type: "radio", name: "picRadio", value: "./images/option2edit.jpg", className: "registerPicRadio" }),
        new comp.image({ className: "selectPic", src: "./images/option2edit.jpg" })),
      new comp.section({},
        new comp.input({ type: "radio", name: "picRadio", value: "./images/option3edit.jpg", className: "registerPicRadio" }),
        new comp.image({ className: "selectPic", src: "./images/option3edit.jpg" })),
      new comp.section({},
        new comp.input({ type: "radio", name: "picRadio", value: "./images/option4edit.jpg", className: "registerPicRadio" }),
        new comp.image({ className: "selectPic", src: "./images/option4edit.jpg" })),
      new comp.section({},
        new comp.input({ type: "radio", name: "picRadio", value: "./images/option5edit.jpg", className: "registerPicRadio" }),
        new comp.image({ className: "selectPic", src: "./images/option5edit.jpg" })),
      new comp.section({},
        new comp.input({ type: "radio", name: "picRadio", value: "./images/option6edit.jpg", className: "registerPicRadio" }),
        new comp.image({ className: "selectPic", src: "./images/option6edit.jpg" })),
      new comp.section({},
        new comp.input({ type: "radio", name: "picRadio", value: "./images/option0edit.jpg", className: "registerPicRadio" }),
        new comp.image({ className: "selectPic", src: "./images/option0edit.jpg" })),
      new comp.section({},
        new comp.input({ type: "radio", value: "addPhotoUrl", name: "picRadio",  className: "registerPicRadio" }),
        new comp.image({ className: "selectPic", src: "./images/addPhoto.jpg" }))
    ).render(".Log_In");
    new comp.label({ for: "profilePicText", id: "picUrlContainer" }, "Or Add The Web Address of Your Own",
      new comp.input({ name: "profilePicText", id: "profilePicText", placeholder: "Enter The URL Of Your Profile Pic" })).render(".Log_In")
    new comp.btn("Register Account").render(".Log_In")


    $(".alertRegister").toggle();
    $(".alertRegister").hide();
    $("#picUrlContainer").toggle();
    $("#picUrlContainer").hide();

    $("#registerProfilePicSection").click(function () {
      let tempValue = $("input[name='picRadio']:checked").val();
      console.log(tempValue);
      if(tempValue === "addPhotoUrl"){
        $("#picUrlContainer").show();
      } else {
        $("#picUrlContainer").hide()
      }
    });

    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        $("#picUrlContainer").hide();
        $(".alertRegister").hide();
        if (e.target.textContent === "Register Account") {
          registerFuncs.checkUserFields();
        }
        else {
          document.querySelector(".Log_In").removeAttribute("id", "registerLogin");
          logInFuncs.loadLogIn();
        }
      })
    })
  },

  checkUserFields() {
    let picProfile = "";
    if ($("#profilePicText").val() === "") {
      picProfile = $("input[name='picRadio']:checked").val();
    } else {
      picProfile = $("#profilePicText").val();
    }
    if (document.querySelector("#firstName").value === "") {
      $("#firstNameRegister").toggle();
      return;
    }
    if (document.querySelector("#lastName").value === "") {
      $("#lastNameRegister").toggle();
      return;
    }
    if (document.querySelector("#email").value === "") {
      $("#emailBlankRegister").toggle();
      return;
    }
    if (document.querySelector("#username").value === "") {
      $("#usernameBlankRegister").toggle();
      return;
    }
    if (document.querySelector("#password").value === "" || document.querySelector("#confirmPassword").value === "") {
      $("#passwordBlankRegister").toggle();
      return;
    } else if (document.querySelector("#password").value !== document.querySelector("#confirmPassword").value) {
      $("#badConfirmPasswordRegister").toggle();
      return;
    }
    if (document.querySelector("#email").value.indexOf("@") === -1) {
      $("#notValidEmailRegister").toggle();
      return;
    }
    if (document.querySelector("#username").value.indexOf("@") !== -1) {
      $("#notValidUsernameRegister").toggle();
      return;
    }
    let tempUser = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      email: document.querySelector("#email").value,
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
      profilePic: picProfile
    }
    this.checkUserData(tempUser);
  },

  checkUserData(tempUser) {
    API.getAllCategory(`users/?email=${tempUser.email}`).then(thisData => {
      if (thisData.length === 0) {
        this.checkRegister(tempUser);
      } else {
        $("#emailExistsRegister").toggle();
      }
    })
  },

  checkRegister(user) {
    API.getAllCategory(`users/?username=${user.username}`).then(data => {
      if (data.length === 0) {
        API.saveItem("users", user).then(newUser => {
          let currentUser = new comp.user(newUser);
          sessionStorage.setItem("currentUser", JSON.stringify(newUser));
          console.log("Username checkRegister: ", currentUser)
          navBar.loadNavBar();
          buildMissionControl.printPlanets();
        })
      } else if (data.length === 1) {
        $("#usernameExistsRegister").toggle();
      }
    })
  },

  //TODO: this function can go away when the function to load mission page is replaced in checkRegister function above


}
export default registerFuncs