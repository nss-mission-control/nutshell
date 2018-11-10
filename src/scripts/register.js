import comp from "./components"
import logInFuncs from "./login";
import API from "./apiData";

const registerFuncs = {

  loadRegister() {
    document.querySelector(".container--inner").innerHTML = ""
    new comp.form(
      new comp.label({}, "First Name"),
      new comp.input({ name: "firstName", id: "firstName", placeholder: "First Name" }),
      new comp.label({}, "Last Name"),
      new comp.input({ name: "lastName", id: "lastName", placeholder: "Last Name" }),
      new comp.label({}, "Email"),
      new comp.input({ type: "email", id: "email", name: "email", placeholder: "email" }),
      new comp.label({}, "Username"),
      new comp.input({ name: "username", id: "username", placeholder: "username" }),
      new comp.label({ for: "password" }, "Password"),
      new comp.input({ name: "password", id: "password", placeholder: "Password" }),
      new comp.label({ for: "confirmPassword" }, "Confirm Password"),
      new comp.input({ name: "confirmPassword", id: "confirmPassword", placeholder: "Confirm Password" }),
      new comp.btn("Register Account"),
      new comp.btn("Already a user? Log in now")
    ).render(".container--inner")
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.textContent === "Register Account") {
          if (document.querySelector("#firstName").value === "" || document.querySelector("#lastName").value === "" || document.querySelector("#email").value === "" || document.querySelector("#username").value === "" || document.querySelector("#password").value === "" || document.querySelector("#confirmPassword").value === "") {
            //This is the check to ensure all fields are complete.
            alert("All fields must be complete to create an account.")
          } else if (document.querySelector("#email").value.indexOf("@") === -1) {
            //This is a check on the email field to make sure there is an @ present
            alert("Please enter a valid email address.")
          } else if (document.querySelector("#password").value === document.querySelector("#confirmPassword").value) {
            //This is the check to make sure passwords are the same.
            e.preventDefault()
            let tempUser = {
              firstName: document.querySelector("#firstName").value,
              lastName: document.querySelector("#lastName").value,
              email: document.querySelector("#email").value,
              username: document.querySelector("#username").value,
              password: document.querySelector("#password").value,
              //This is a placeholder to a stock "no image available" image that we can use later for actual user images
              profilePic: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiF4fb4-cneAhUEc98KHTuRBWAQjRx6BAgBEAU&url=https%3A%2F%2Fwingslax.com%2Fteam%2Ffront-office%2Fattachment%2Fno-image-available%2F&psig=AOvVaw1iTVpvjLmigkzni5ssYj57&ust=1541943668925656"
            }
            API.getAllCategory(`users/?email=${tempUser.email}`).then(thisData => {
              if (thisData.length === 0) {
                this.checkRegister(tempUser);
              } else {
                alert("This email is already registered.")
              }
            })
          } else { alert("Your passwords did not match. Please try again.") }
        } else {
          logInFuncs.loadLogIn()
        }
      })
    })
  },

  checkRegister(user) {
    API.getAllCategory(`users/?username=${user.username}`).then(data => {
      if (data.length === 0) {
        API.saveItem("users", user).then(newUser => {
          let currentUser = new comp.user(newUser);
          sessionStorage.setItem("currentUser", currentUser)
          //TODO:the function below needs to be the call to load mission control page.
          // Right now it is just sending to a function to console.log user
          this.loadMission(currentUser);
        })
      } else if (data.length === 1) {
        alert(`Username, ${data[0].username}, is already being used. Please choose another.`)
      }
    })
  },

  //TODO: this function can go away when the function to load mission page is replaced in checkRegister function above
  loadMission(user) {
    console.log("Load Mission: ", user)
  }

}
export default registerFuncs