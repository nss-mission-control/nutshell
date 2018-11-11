(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

const elementSymbol = Symbol();

class DOMComponent {
  constructor(type, attributes, ...children) {
    this[elementSymbol] = document.createElement(type);
    /*
        If `attributes` is just a string, it's a simple element with no
        properties - just some text content
    */

    if (typeof attributes === "string") {
      this[elementSymbol].textContent = attributes;
      return this;
    } else if (typeof attributes === "object") {
      this[elementSymbol] = Object.assign(this[elementSymbol], attributes);
    }

    if (children.length) {
      children.forEach(child => {
        // One HTMLElement was passed in
        if (child.element instanceof window.Element) {
          this[elementSymbol].appendChild(child.element); // An array of elements was passed in
        } else if (Array.isArray(child.element)) {
          child.element.forEach(c => this[elementSymbol].appendChild(c)); // String value was passed in, set text content
        } else {
          this[elementSymbol].textContent = child;
        }
      });
    }

    return this;
  }

  get element() {
    return this[elementSymbol];
  }

  render(container) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this[elementSymbol]);
    document.querySelector(container).appendChild(fragment);
  }

}

module.exports = DOMComponent;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const URL = "http://localhost:8088/";
const API = {
  getAllCategory(category) {
    return fetch(`${URL}${category}`).then(entries => entries.json());
  },

  getOneFromCategory(category, id) {
    return fetch(`${URL}${category}?id=${id}`).then(inputs => inputs.json());
  },

  saveItem(category, item) {
    return fetch(`${URL}${category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }).then(jsonData => jsonData.json());
  },

  deleteItem(category, id) {
    return fetch(`${URL}${category}?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  updateItem(category, id, item) {
    return fetch(`${URL}${category}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
  }

};
var _default = API;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nssDomcomponent = _interopRequireDefault(require("../lib/node_modules/nss-domcomponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = Object.create(null, {
  user: {
    value: class User {
      constructor(tempInfo) {
        this.id = tempInfo.id;
        this.firstName = tempInfo.firstName;
        this.lastName = tempInfo.lastName;
        this.username = tempInfo.username;
        this.password = tempInfo.password;
        this.email = tempInfo.email;
        this.profilePic = tempInfo.profilePic;
      } //TODO: this is just a test function. we would have the ability to call for saving
      // messages,articles, events be referencing a function defined here


      test() {
        return `Welcome ${this.firstName}! Let's see what's going on.`;
      }

    }
  },
  div: {
    value: class div extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("div", attributes, ...children);
      }

    }
  },
  btn: {
    value: class btn extends _nssDomcomponent.default {
      constructor(...children) {
        super("button", {
          className: "btn",
          type: "button"
        }, ...children);
      }

    }
  },
  input: {
    value: class input extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("input", attributes, ...children);
      }

    }
  },
  section: {
    value: class section extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("section", attributes, ...children);
      }

    }
  },
  title: {
    //define any type of h#.. h1, h2, etc.
    value: class title extends _nssDomcomponent.default {
      constructor(h_type, attributes, ...children) {
        super(h_type, attributes, ...children);
      }

    }
  },
  anchor: {
    value: class anchor extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("a", attributes, ...children);
      }

    }
  },
  checkbox: {
    value: class checkbox extends _nssDomcomponent.default {
      constructor(...children) {
        super("input", {
          type: "checkbox",
          className: "cb"
        }, ...children);
      }

    }
  },
  image: {
    value: class image extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("img", attributes, ...children);
      }

    }
  },
  ul: {
    value: class ul extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("ul", attributes, ...children);
      }

    }
  },
  li: {
    value: class li extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("li", attributes, ...children);
      }

    }
  },
  form: {
    value: class form extends _nssDomcomponent.default {
      constructor(...children) {
        super("form", {}, ...children);
      }

    }
  },
  label: {
    value: class label extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("label", attributes, ...children);
      }

    }
  },
  textarea: {
    value: class textarea extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("textarea", attributes, ...children);
      }

    }
  },
  par: {
    value: class par extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("p", attributes, ...children);
      }

    }
  }
});

exports.default = _default;

},{"../lib/node_modules/nss-domcomponent":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _login = _interopRequireDefault(require("./login"));

var _register = _interopRequireDefault(require("./register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const landingPageFuncs = {
  loadLandingPage() {
    new _components.default.div({
      classList: "welcome"
    }, new _components.default.title("h1", {
      className: "title"
    }, "Welcome to Mission Control"), new _components.default.btn("Login"), new _components.default.btn("Register")).render(".container--inner");
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
      button.addEventListener("click", e => {
        if (e.target.textContent === "Login") {
          _login.default.loadLogIn();
        } else {
          _register.default.loadRegister();
        }
      });
    });
  }

};
var _default = landingPageFuncs;
exports.default = _default;

},{"./components":3,"./login":5,"./register":11}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _register = _interopRequireDefault(require("./register"));

var _apiData = _interopRequireDefault(require("./apiData"));

var _missionControl = _interopRequireDefault(require("./missionControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logInFuncs = {
  checkUser(username, password) {
    if (username === "" || password === "") {
      alert("You must enter both your username and password to log in.");
    } else {
      _apiData.default.getAllCategory(`users/?username=${username}`).then(data => {
        if (data.length === 0) {
          alert("There is no user with that username.");
          return;
        } else if (password === data[0].password) {
          let currentUser = new _components.default.user(data[0]);
          return currentUser;
        } else alert("You entered the wrong password. Try again.");
      }).then(currentUser => {
        console.log(currentUser);

        if (currentUser !== undefined) {
          console.log("Build Mission Login");
          sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

          _missionControl.default.printPlaceholder();
        }
      });
    }
  },

  loadLogIn() {
    document.querySelector(".container--inner").innerHTML = "";
    new _components.default.form(new _components.default.label({}, "Username"), new _components.default.input({
      name: "username",
      id: "username",
      placeholder: "username"
    }), new _components.default.label({
      for: "password"
    }, "Password"), new _components.default.input({
      name: "password",
      id: "password",
      placeholder: "Password"
    }), new _components.default.btn("Login Now"), new _components.default.btn("Not a user? Create new account.")).render(".container--inner");
    document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", e => {
        if (e.target.textContent === "Login Now") {
          this.checkUser(document.querySelector("#username").value, document.querySelector("#password").value);
        } else {
          _register.default.loadRegister();
        }
      });
    });
  }

};
var _default = logInFuncs;
exports.default = _default;

},{"./apiData":2,"./components":3,"./missionControl":8,"./register":11}],6:[function(require,module,exports){
"use strict";

var _landing = _interopRequireDefault(require("./landing"));

var _nav = _interopRequireDefault(require("./nav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nav.default.loadNavBar();

_landing.default.loadLandingPage();

},{"./landing":4,"./nav":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _apiData = _interopRequireDefault(require("./apiData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let currentUser = {};
const buildMessages = {
  printMessages(messageObj) {
    if (currentUser.id === messageObj.user.id) {
      new _components.default.section({
        className: "message",
        id: `${messageObj.id}`
      }, new _components.default.image({
        src: `${messageObj.user.profilePic}`,
        className: "messagePic",
        alt: "Profile Pic"
      }), new _components.default.title("h2", {
        className: "messageAuthor"
      }, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`), new _components.default.title("h1", {}, messageObj.messageContent), new _components.default.btn("Edit")).render(".container--inner");
    } else {
      new _components.default.section({
        className: "message",
        id: `${messageObj.id}`
      }, new _components.default.image({
        src: `${messageObj.user.profilePic}`,
        alt: "Profile Pic",
        className: "messagePic"
      }), new _components.default.title("h2", {
        className: "messageAuthor"
      }, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`), new _components.default.title("h1", {}, messageObj.messageContent)).render(".container--inner");
    }
  },

  messageMap() {
    currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(currentUser);
    document.querySelector(".container--inner").innerHTML = "";

    _apiData.default.getAllCategory("messages/?_expand=user").then(messageObj => {
      messageObj.forEach(message => {
        this.printMessages(message);
      });
      this.newMessage();
      this.submitMessage();
      this.editButtonClick();
    });
  },

  // builds new message entry field
  newMessage() {
    //wrapped this in a div instead of a section, to grab sections easier.
    new _components.default.div({
      className: "new--message",
      id: "newMessage"
    }, new _components.default.title("h1", {}, "New Message"), new _components.default.textarea({
      placeholder: "type your message here",
      wrap: "hard"
    }), new _components.default.btn("Submit")).render(".container--inner");
  },

  submitMessage() {
    $("#newMessage > button").click(function (e) {
      //if statment to prevent blank entries
      if ($("#newMessage > textarea").val() === "") {
        alert("Please enter your message");
      } else {
        e.preventDefault(); //creates object of current moment

        let dateAndTime = new Date(); //converts it into a string and then an array to grab specific values

        let dateArray = dateAndTime.toString().split(" "); //getMonth() method returns a number between 0-11. Added 1 to get current month

        let month = dateAndTime.getMonth() + 1; //builds object to pass into fetch

        let submitMessageObj = {
          messageContent: $("#newMessage > textarea").val(),
          timeStamp: dateArray[4],
          //TODO: make it non military time
          date: `${month}/${dateArray[2]}/${dateArray[3]}`,
          userId: currentUser.id // send to API

        };

        _apiData.default.saveItem("messages", submitMessageObj).then(() => buildMessages.messageMap());
      }
    });
  },

  editButtonClick() {
    // grabs the edit buttons
    $("section > button").click(function (e) {
      // stores the message in a varable
      let messageH1 = e.target.previousSibling; // store message's text in a varable

      let messageText = messageH1.innerHTML; // replaces Edit button with Save button

      $(e.target).replaceWith("<button class= 'btn' type ='button'>Save</button>"); // replaces message text with an input field

      $(messageH1).replaceWith(`<input type="text" id = "editField" value="${messageText}">`); // stores the new input field in a varable

      const newInputField = $("#editField"); // sets a click event on the new save button

      newInputField.next().click(function (e) {
        // stores input value in an object upon save click
        const editedMessageTextObj = {
          messageContent: newInputField.val() // save message id #

        };
        const editedMessageId = newInputField.parent().attr("id"); // Patch message in server and refresh the messages on the page

        _apiData.default.updateItem("messages", editedMessageId, editedMessageTextObj).then(() => buildMessages.messageMap());
      });
    });
  }

};
var _default = buildMessages;
exports.default = _default;

},{"./apiData":2,"./components":3}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildMissionControl = {
  printPlaceholder() {
    document.querySelector(".container--inner").innerHTML = null;
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(user);
    new _components.default.section({
      className: "message",
      id: `${user.id}`
    }, new _components.default.image({
      src: `${user.profilePic}`,
      alt: "Profile Pic",
      style: "display:inline-block; border-radius: 8px; margin: 4px",
      height: "125",
      width: "125"
    }), new _components.default.title("h2", {
      style: "display: inline-block; position: relative; bottom: 10px"
    }, `${user.firstName} - ${user.lastName} ${user.username}`)).render(".container--inner");
  }

};
var _default = buildMissionControl;
exports.default = _default;

},{"./components":3}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _login = _interopRequireDefault(require("./login"));

var _messages = _interopRequireDefault(require("./messages"));

var _news = _interopRequireDefault(require("./news"));

var _missionControl = _interopRequireDefault(require("./missionControl"));

var _tasks = _interopRequireDefault(require("./tasks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const navBar = {
  loadNavBar() {
    new _components.default.ul({}, new _components.default.li({}, "Home"), new _components.default.li({}, "Tasks"), new _components.default.li({}, "Events"), new _components.default.li({}, "Messages"), new _components.default.li({}, "News"), new _components.default.li({}, "Friends"), new _components.default.li({}, "Log Out")).render("#navBar");
    document.querySelector("#navBar").addEventListener("click", event => {
      if (event.target.textContent === "Home") {
        if (sessionStorage.getItem("currentUser") === null) {
          console.log("Not logged in.");

          _login.default.loadLogIn();
        } else {
          _missionControl.default.printPlaceholder();
        }
      } else if (event.target.textContent == "Tasks") {
        if (sessionStorage.getItem("currentUser") === null) {
          console.log("Not logged in.");

          _login.default.loadLogIn();
        } else {
          _tasks.default.buildContainers();
        }
      } else if (event.target.textContent == "Events") {
        if (sessionStorage.getItem("currentUser") === null) {
          console.log("Not logged in.");

          _login.default.loadLogIn();
        } else {
          console.log("Events function called.");
        }
      } else if (event.target.textContent == "Messages") {
        if (sessionStorage.getItem("currentUser") === null) {
          console.log("Not logged in.");

          _login.default.loadLogIn();
        } else {
          _messages.default.messageMap();
        }
      } else if (event.target.textContent == "News") {
        if (sessionStorage.getItem("currentUser") === null) {
          console.log("Not logged in.");

          _login.default.loadLogIn();
        } else {
          _news.default.newsMap();
        }
      } else if (event.target.textContent == "Friends") {
        if (sessionStorage.getItem("currentUser") === null) {
          console.log("Not logged in.");

          _login.default.loadLogIn();
        } else {
          console.log("Friends function calles.");
        }
      } else if (event.target.textContent == "Log Out") {
        console.log("Log Out function called.");
        sessionStorage.removeItem("currentUser");

        _login.default.loadLogIn();
      }
    });
  }

};
var _default = navBar;
exports.default = _default;

},{"./components":3,"./login":5,"./messages":7,"./missionControl":8,"./news":10,"./tasks":12}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _apiData = _interopRequireDefault(require("./apiData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildNews = {
  printNews(newsObj) {
    new _components.default.section({
      className: "news",
      id: `${newsObj.id}`
    }, new _components.default.anchor({
      href: `${newsObj.url}`,
      target: "_blank"
    }, new _components.default.image({
      src: `${newsObj.articleImage}`,
      alt: "Article Image",
      height: "120",
      width: "120"
    })), new _components.default.title("h2", {}, `${newsObj.articleName}`), new _components.default.title("h4", {}, `Saved by: ${newsObj.user.firstName} | Date Saved: ${newsObj.dateSaved}`), new _components.default.title("h1", {}, newsObj.about)).render(".container--inner");
  },

  newsMap() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(user);
    document.querySelector(".container--inner").innerHTML = "";

    _apiData.default.getAllCategory("articles/?_expand=user&_sort=dateSaved&_order=desc").then(newsObj => newsObj.forEach(news => {
      this.printNews(news);
    })).then(() => this.newNews());
  },

  newNews() {
    new _components.default.section({
      className: "new--news"
    }, new _components.default.title("h1", {}, "Save News Article"), new _components.default.form(new _components.default.label({
      for: "articleName"
    }, "Article Name"), new _components.default.input({
      name: "articleName",
      placeholder: "Article Name",
      id: "articleName"
    }), new _components.default.label({
      for: "articleUrl"
    }, "Article Link"), new _components.default.input({
      name: "articleUrl",
      placeholder: "Article Link",
      id: "articleLink"
    }), new _components.default.label({
      for: "articleImageUrl"
    }, "Article Image Link"), new _components.default.input({
      name: "articleImageUrl",
      placeholder: "Article Image Link",
      id: "articleImage"
    }), new _components.default.label({
      for: "articleDescription"
    }, "Article Description"), new _components.default.input({
      name: "articleDescription",
      placeholder: "Article Description",
      id: "articleDescription"
    }), new _components.default.btn("Save New Article"))).render(".container--inner");
    document.querySelector("button").addEventListener("click", () => {
      let story = {
        articleName: document.querySelector("#articleName").value,
        url: document.querySelector("#articleLink").value,
        articleImage: document.querySelector("#articleImage").value,
        about: document.querySelector("#articleDescription").value,

        /*
        NEED TO UPDATE USER ID TO SAVE SESSION ASSIGNED ID
        */
        userId: 2,
        dateSaved: new Date()
      };
      buildNews.addNews(story);
    });
  },

  addNews(story) {
    _apiData.default.saveItem("articles", story).then(() => this.newsMap());
  }

};
var _default = buildNews;
exports.default = _default;

},{"./apiData":2,"./components":3}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _login = _interopRequireDefault(require("./login"));

var _apiData = _interopRequireDefault(require("./apiData"));

var _missionControl = _interopRequireDefault(require("./missionControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerFuncs = {
  loadRegister() {
    document.querySelector(".container--inner").innerHTML = "";
    new _components.default.form(new _components.default.label({}, "First Name"), new _components.default.input({
      name: "firstName",
      id: "firstName",
      placeholder: "First Name"
    }), new _components.default.label({}, "Last Name"), new _components.default.input({
      name: "lastName",
      id: "lastName",
      placeholder: "Last Name"
    }), new _components.default.label({}, "Email"), new _components.default.input({
      type: "email",
      id: "email",
      name: "email",
      placeholder: "email"
    }), new _components.default.label({}, "Username"), new _components.default.input({
      name: "username",
      id: "username",
      placeholder: "username"
    }), new _components.default.label({
      for: "password"
    }, "Password"), new _components.default.input({
      name: "password",
      id: "password",
      placeholder: "Password"
    }), new _components.default.label({
      for: "confirmPassword"
    }, "Confirm Password"), new _components.default.input({
      name: "confirmPassword",
      id: "confirmPassword",
      placeholder: "Confirm Password"
    }), new _components.default.btn("Register Account"), new _components.default.btn("Already a user? Log in now")).render(".container--inner");
    document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", e => {
        if (e.target.textContent === "Register Account") {
          if (document.querySelector("#firstName").value === "" || document.querySelector("#lastName").value === "" || document.querySelector("#email").value === "" || document.querySelector("#username").value === "" || document.querySelector("#password").value === "" || document.querySelector("#confirmPassword").value === "") {
            //This is the check to ensure all fields are complete.
            alert("All fields must be complete to create an account.");
          } else if (document.querySelector("#email").value.indexOf("@") === -1) {
            //This is a check on the email field to make sure there is an @ present
            alert("Please enter a valid email address.");
          } else if (document.querySelector("#password").value === document.querySelector("#confirmPassword").value) {
            //This is the check to make sure passwords are the same.
            e.preventDefault();
            let tempUser = {
              firstName: document.querySelector("#firstName").value,
              lastName: document.querySelector("#lastName").value,
              email: document.querySelector("#email").value,
              username: document.querySelector("#username").value,
              password: document.querySelector("#password").value,
              //This is a placeholder to a stock "no image available" image that we can use later for actual user images
              profilePic: "https://hyha.xyz/wp-content/themes/fashion/images/no_image_available.jpg"
            };

            _apiData.default.getAllCategory(`users/?email=${tempUser.email}`).then(thisData => {
              if (thisData.length === 0) {
                this.checkRegister(tempUser);
              } else {
                alert("This email is already registered.");
              }
            });
          } else {
            alert("Your passwords did not match. Please try again.");
          }
        } else {
          _login.default.loadLogIn();
        }
      });
    });
  },

  checkRegister(user) {
    _apiData.default.getAllCategory(`users/?username=${user.username}`).then(data => {
      if (data.length === 0) {
        _apiData.default.saveItem("users", user).then(newUser => {
          let currentUser = new _components.default.user(newUser);
          console.log("Username checkRegister: ", currentUser); //TODO:the function below needs to be the call to load mission control page.
          // Right now it is just sending to a function to console.log user

          this.loadMission(currentUser);
        });
      } else if (data.length === 1) {
        alert(`Username, ${data[0].username}, is already being used. Please choose another.`);
      }
    });
  },

  //TODO: this function can go away when the function to load mission page is replaced in checkRegister function above
  loadMission(user) {
    console.log(user);
    sessionStorage.setItem("currentUser", JSON.stringify(user));

    _missionControl.default.printPlaceholder();
  }

};
var _default = registerFuncs;
exports.default = _default;

},{"./apiData":2,"./components":3,"./login":5,"./missionControl":8}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _apiData = _interopRequireDefault(require("./apiData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let currentUser = {};
const buildTasks = {
  //function run first in order to clear HTML, create parent containers, then add new task input and call fetch
  buildContainers() {
    currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(currentUser);
    document.querySelector(".container--inner").innerHTML = "";
    new _components.default.title("h1", {
      className: "title--incomplete"
    }, "Incomplete Tasks").render(".container--inner");
    new _components.default.div({
      id: "incomplete"
    }).render(".container--inner");
    new _components.default.title("h1", {
      className: "title--complete"
    }, "Complete Tasks").render(".container--inner");
    new _components.default.div({
      id: "complete"
    }).render(".container--inner");
    this.newTask();
    this.tasksFetch();
  },

  //used to create and append all tasks from database to DOM
  printTasks(tasksObj) {
    let outputContainer;

    if (tasksObj.complete) {
      outputContainer = "#complete";
    } else {
      outputContainer = "#incomplete";
    }

    new _components.default.section({
      className: "task",
      id: `${tasksObj.id}`
    }, new _components.default.checkbox(), new _components.default.par({
      className: "editable--task"
    }, tasksObj.task), new _components.default.par({
      className: "editable--date"
    }, tasksObj.dueDate)).render(outputContainer);
  },

  //fetch all tasks from database, call create/append and call add listeners
  tasksFetch() {
    _apiData.default.getAllCategory("tasks") //check if user is same as session storage
    .then(tasksObj => {
      tasksObj.forEach(task => {
        this.printTasks(task);
      });
      this.cbListener();
      this.parListener();
    });
  },

  //checkbox listener will move tasks between complete and incomplete containers
  //database "complete" property will be patched accordingly and DOM updated
  cbListener() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]"); //if the id of the grandparent container is #complete, then check the box

    checkboxes.forEach(checkbox => {
      if (checkbox.parentNode.parentNode.id === "complete") {
        checkbox.checked = true;
      }

      checkbox.addEventListener("change", e => {
        let patchProperty; //if false -> true

        if (e.target.checked) {
          patchProperty = {
            complete: true //patch "complete" property of database object using parentNode (section) ID to TRUE

          };

          _apiData.default.updateItem("tasks", `${e.target.parentNode.id}`, patchProperty).then(() => this.buildContainers());
        } else {
          //if checkbox is unchecked...
          patchProperty = {
            complete: false
          };

          _apiData.default.updateItem("tasks", `${e.target.parentNode.id}`, patchProperty).then(() => this.buildContainers());
        }
      });
    });
  },

  //function used to edit tasks in DOM and patch new info to database task description and date
  parListener() {
    //get all sections on page
    let sections = document.querySelectorAll("section"); ///add click listener to all sections

    sections.forEach(section => {
      section.addEventListener("click", e => {
        //get id of target section
        const id = e.target.parentNode.id; //if paragraph clicked is task description, get text content
        //create new <input> template (with  ID!) and replace <p> with <input>
        //add a keydown listener to the input after it is in DOM and
        //patch the task description to database when ENTER is pressed

        if (e.target.classList.contains("editable--task")) {
          const taskName = e.target.textContent;
          let tempTaskInput = `<input id="temp1" type="text" value="${taskName}">`;
          $(e.target).replaceWith(tempTaskInput);
          const tempInput = document.querySelector("#temp1");
          tempInput.addEventListener("keydown", e => {
            if (e.keyCode === 13) {
              const patchTask = {
                task: tempInput.value
              };

              _apiData.default.updateItem("tasks", id, patchTask).then(() => this.buildContainers());
            }
          }); //if paragraph clicked is task due date, get text content
          //create new <input> template (with  ID!) and replace <p> with <input>
          //add a change listener to the input after it is in DOM and
          //patch the task due date to database when new date is selected
        } else if (e.target.classList.contains("editable--date")) {
          const taskDate = e.target.textContent;
          let tempTaskDate = `<input id="temp2" type="date" value="${taskDate}">`;
          $(e.target).replaceWith(tempTaskDate);
          const tempDateInput = document.querySelector("#temp2");
          tempDateInput.addEventListener("change", e => {
            const patchDate = {
              dueDate: tempDateInput.value
            };

            _apiData.default.updateItem("tasks", id, patchDate).then(() => this.buildContainers());
          });
        }
      });
    });
  },

  //creates new task input field with append button inside first section of INCOMPLETE container
  newTask() {
    new _components.default.section({
      className: "new--task"
    }, new _components.default.btn("+"), new _components.default.input({
      id: "input--task",
      type: "text",
      placeholder: "type new task here"
    }), new _components.default.input({
      id: "input--date",
      type: "date"
    })).render("#incomplete");
    const button = document.querySelector("button");
    const input_task = document.querySelector("#input--task");
    const input_date = document.querySelector("#input--date"); //button click posts new task to database and resets new task input strings

    button.addEventListener("click", e => {
      if (input_task.value === "" || input_date.value === "") {
        return;
      } else {
        let taskItem = {
          task: input_task.value,
          complete: false,
          dueDate: input_date.value,

          /*
          NEED TO UPDATE USER ID TO SAVE SESSION ASSIGNED ID
          */
          userId: 3
        };

        _apiData.default.saveItem("tasks", taskItem).then(data => {
          this.printTasks(data);
          this.cbListener();
          this.parListener();
        });

        input_task.value = "";
        input_date.value = "";
      }
    });
  }

};
var _default = buildTasks;
exports.default = _default;

},{"./apiData":2,"./components":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvbGFuZGluZy5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9taXNzaW9uQ29udHJvbC5qcyIsIi4uL3NjcmlwdHMvbmF2LmpzIiwiLi4vc2NyaXB0cy9uZXdzLmpzIiwiLi4vc2NyaXB0cy9yZWdpc3Rlci5qcyIsIi4uL3NjcmlwdHMvdGFza3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLEtBQUssSUFBSTtBQUN0QjtBQUNBLFlBQUksS0FBSyxDQUFDLE9B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QURKO0FBRWIsVUFBQSxRQUFRLEVBQUUsS0FGRztBQUdiLFVBQUEsT0FBTyxFQUFFLFVBQVUsQ0FBQyxLQUhQOztBQUliOzs7QUFHQSxVQUFBLE1BQU0sRUFBRTtBQVBLLFNBQWY7O0FBU0EseUJBQUksUUFBSixDQUFhLE9BQWIsRUFBc0IsUUFBdEIsRUFBZ0MsSUFBaEMsQ0FBcUMsSUFBSSxJQUFJO0FBQzNDLGVBQUssVUFBTCxDQUFnQixJQUFoQjtBQUNBLGVBQUssVUFBTDtBQUNBLGVBQUssV0FBTDtBQUNELFNBSkQ7O0FBS0EsUUFBQSxVQUFVLENBQUMsS0FBWCxHQUFtQixFQUFuQjtBQUNBLFFBQUEsVUFBVSxDQUFDLEtBQVgsR0FBbUIsRUFBbkI7QUFDRDtBQUNGLEtBckJEO0FBc0JEOztBQXZKZ0IsQ0FBbkI7ZUEwSmUsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBlbGVtZW50U3ltYm9sID0gU3ltYm9sKClcblxuY2xhc3MgRE9NQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xuICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBJZiBgYXR0cmlidXRlc2AgaXMganVzdCBhIHN0cmluZywgaXQncyBhIHNpbXBsZSBlbGVtZW50IHdpdGggbm9cbiAgICAgICAgICAgIHByb3BlcnRpZXMgLSBqdXN0IHNvbWUgdGV4dCBjb250ZW50XG4gICAgICAgICovXG4gICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZXNcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0gPSBPYmplY3QuYXNzaWduKHRoaXNbZWxlbWVudFN5bWJvbF0sIGF0dHJpYnV0ZXMpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAvLyBPbmUgSFRNTEVsZW1lbnQgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5lbGVtZW50IGluc3RhbmNlb2Ygd2luZG93LkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS5hcHBlbmRDaGlsZChjaGlsZC5lbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuIGFycmF5IG9mIGVsZW1lbnRzIHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZWxlbWVudC5mb3JFYWNoKGMgPT4gdGhpc1tlbGVtZW50U3ltYm9sXS5hcHBlbmRDaGlsZChjKSlcblxuICAgICAgICAgICAgICAgICAgICAvLyBTdHJpbmcgdmFsdWUgd2FzIHBhc3NlZCBpbiwgc2V0IHRleHQgY29udGVudFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBjaGlsZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGdldCBlbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbZWxlbWVudFN5bWJvbF1cbiAgICB9XG5cbiAgICByZW5kZXIoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXNbZWxlbWVudFN5bWJvbF0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKS5hcHBlbmRDaGlsZChmcmFnbWVudClcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRE9NQ29tcG9uZW50XG4iLCJjb25zdCBVUkwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9cIlxuXG5jb25zdCBBUEkgPSB7XG4gIGdldEFsbENhdGVnb3J5KGNhdGVnb3J5KSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fWApXG4gICAgICAudGhlbihlbnRyaWVzID0+IGVudHJpZXMuanNvbigpKVxuICB9LFxuXG4gIGdldE9uZUZyb21DYXRlZ29yeShjYXRlZ29yeSwgaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9P2lkPSR7aWR9YClcbiAgICAgIC50aGVuKGlucHV0cyA9PiBpbnB1dHMuanNvbigpKVxuICB9LFxuXG4gIHNhdmVJdGVtKGNhdGVnb3J5LCBpdGVtKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICB9XG4gICAgKS50aGVuKGpzb25EYXRhID0+IGpzb25EYXRhLmpzb24oKSlcbiAgfSxcblxuICBkZWxldGVJdGVtKGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0/aWQ9JHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICB1cGRhdGVJdGVtKGNhdGVnb3J5LCBpZCwgaXRlbSl7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfVxuICAgIClcblxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgRE9NQ29tcG9uZW50IGZyb20gXCIuLi9saWIvbm9kZV9tb2R1bGVzL25zcy1kb21jb21wb25lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmNyZWF0ZShudWxsLCB7XHJcblxyXG4gIHVzZXI6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBVc2VyIHtcclxuICAgICAgY29uc3RydWN0b3IodGVtcEluZm8pIHtcclxuICAgICAgICB0aGlzLmlkID0gdGVtcEluZm8uaWQ7XHJcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB0ZW1wSW5mby5maXJzdE5hbWU7XHJcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9IHRlbXBJbmZvLmxhc3ROYW1lO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB0ZW1wSW5mby51c2VybmFtZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gdGVtcEluZm8ucGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5lbWFpbCA9IHRlbXBJbmZvLmVtYWlsO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZVBpYyA9IHRlbXBJbmZvLnByb2ZpbGVQaWM7XHJcbiAgICB9XHJcbiAgICAvL1RPRE86IHRoaXMgaXMganVzdCBhIHRlc3QgZnVuY3Rpb24uIHdlIHdvdWxkIGhhdmUgdGhlIGFiaWxpdHkgdG8gY2FsbCBmb3Igc2F2aW5nXHJcbiAgICAvLyBtZXNzYWdlcyxhcnRpY2xlcywgZXZlbnRzIGJlIHJlZmVyZW5jaW5nIGEgZnVuY3Rpb24gZGVmaW5lZCBoZXJlXHJcbiAgICAgIHRlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBXZWxjb21lICR7dGhpcy5maXJzdE5hbWV9ISBMZXQncyBzZWUgd2hhdCdzIGdvaW5nIG9uLmA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBkaXY6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBkaXYgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZGl2XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBidG46IHtcclxuICAgIHZhbHVlOiBjbGFzcyBidG4gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImJ0blwiLCB0eXBlOiBcImJ1dHRvblwiIH0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbnB1dDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGlucHV0IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZWN0aW9uOiB7XHJcbiAgICB2YWx1ZTogY2xhc3Mgc2VjdGlvbiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJzZWN0aW9uXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0aXRsZTogeyAvL2RlZmluZSBhbnkgdHlwZSBvZiBoIy4uIGgxLCBoMiwgZXRjLlxyXG4gICAgdmFsdWU6IGNsYXNzIHRpdGxlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGFuY2hvcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGFuY2hvciBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGVja2JveDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGNoZWNrYm94IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBjbGFzc05hbWU6IFwiY2JcIiB9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW1hZ2U6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBpbWFnZSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbWdcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgdWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwidWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxpOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGkgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGlcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHZhbHVlOiBjbGFzcyBmb3JtIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImZvcm1cIiwge30sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsYWJlbDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxhYmVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxhYmVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0ZXh0YXJlYToge1xyXG4gICAgdmFsdWU6IGNsYXNzIHRleHRhcmVhIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInRleHRhcmVhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBwYXI6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBwYXIgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwicFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSkiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxyXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXHJcblxyXG5jb25zdCBsYW5kaW5nUGFnZUZ1bmNzID0ge1xyXG4gIGxvYWRMYW5kaW5nUGFnZSgpIHtcclxuICAgIG5ldyBjb21wLmRpdihcclxuICAgICAgeyBjbGFzc0xpc3Q6IFwid2VsY29tZVwiIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIiB9LCBcIldlbGNvbWUgdG8gTWlzc2lvbiBDb250cm9sXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJMb2dpblwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiUmVnaXN0ZXJcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBsZXQgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIilcclxuXHJcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luXCIpIHtcclxuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGFuZGluZ1BhZ2VGdW5jcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IHJlZ2lzdGVyRnVuY3MgZnJvbSBcIi4vcmVnaXN0ZXJcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5jb25zdCBsb2dJbkZ1bmNzID0ge1xuICBjaGVja1VzZXIodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgaWYgKHVzZXJuYW1lID09PSBcIlwiIHx8IHBhc3N3b3JkID09PVwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiWW91IG11c3QgZW50ZXIgYm90aCB5b3VyIHVzZXJuYW1lIGFuZCBwYXNzd29yZCB0byBsb2cgaW4uXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlcm5hbWV9YCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYWxlcnQoXCJUaGVyZSBpcyBubyB1c2VyIHdpdGggdGhhdCB1c2VybmFtZS5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHBhc3N3b3JkID09PSBkYXRhWzBdLnBhc3N3b3JkKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlciAoZGF0YVswXSk7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRVc2VyO1xuICAgICAgICB9IGVsc2UgKCBhbGVydChcIllvdSBlbnRlcmVkIHRoZSB3cm9uZyBwYXNzd29yZC4gVHJ5IGFnYWluLlwiKSlcbiAgICAgIH0pLnRoZW4oY3VycmVudFVzZXIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VXNlcilcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkJ1aWxkIE1pc3Npb24gTG9naW5cIilcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFVzZXIpKTtcbiAgICAgICAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbG9hZExvZ0luKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInVzZXJuYW1lXCIsIGlkOiBcInVzZXJuYW1lXCIsIHBsYWNlaG9sZGVyOiBcInVzZXJuYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJwYXNzd29yZFwiIH0sIFwiUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwicGFzc3dvcmRcIiwgaWQ6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIiB9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luIE5vd1wiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIk5vdCBhIHVzZXI/IENyZWF0ZSBuZXcgYWNjb3VudC5cIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luIE5vd1wiKSB7XG4gICAgICAgICAgdGhpcy5jaGVja1VzZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbG9nSW5GdW5jcyIsImltcG9ydCBsYW5kaW5nUGFnZUZ1bmNzIGZyb20gXCIuL2xhbmRpbmdcIlxyXG5pbXBvcnQgbmF2QmFyIGZyb20gXCIuL25hdlwiXHJcblxyXG5uYXZCYXIubG9hZE5hdkJhcigpO1xyXG5sYW5kaW5nUGFnZUZ1bmNzLmxvYWRMYW5kaW5nUGFnZSgpO1xyXG5cclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcblxyXG5sZXQgY3VycmVudFVzZXIgPSB7fTtcclxuXHJcbmNvbnN0IGJ1aWxkTWVzc2FnZXMgPSB7XHJcbiAgcHJpbnRNZXNzYWdlcyhtZXNzYWdlT2JqKSB7XHJcbiAgICBpZiAoY3VycmVudFVzZXIuaWQgPT09IG1lc3NhZ2VPYmoudXNlci5pZCkge1xyXG4gICAgICBuZXcgY29tcC5zZWN0aW9uKHtcclxuICAgICAgICAgIGNsYXNzTmFtZTogXCJtZXNzYWdlXCIsXHJcbiAgICAgICAgICBpZDogYCR7bWVzc2FnZU9iai5pZH1gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHttZXNzYWdlT2JqLnVzZXIucHJvZmlsZVBpY31gLCBjbGFzc05hbWU6IFwibWVzc2FnZVBpY1wiLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIn0pLFxyXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge2NsYXNzTmFtZTogXCJtZXNzYWdlQXV0aG9yXCJ9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxyXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG1lc3NhZ2VPYmoubWVzc2FnZUNvbnRlbnQpLFxyXG4gICAgICAgIG5ldyBjb21wLmJ0bihcIkVkaXRcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXcgY29tcC5zZWN0aW9uKHtcclxuICAgICAgICAgIGNsYXNzTmFtZTogXCJtZXNzYWdlXCIsXHJcbiAgICAgICAgICBpZDogYCR7bWVzc2FnZU9iai5pZH1gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHttZXNzYWdlT2JqLnVzZXIucHJvZmlsZVBpY31gLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIiwgY2xhc3NOYW1lOiBcIm1lc3NhZ2VQaWNcIn0pLFxyXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge2NsYXNzTmFtZTpcIm1lc3NhZ2VBdXRob3JcIn0sIGAke21lc3NhZ2VPYmoudXNlci5maXJzdE5hbWV9IC0gJHttZXNzYWdlT2JqLmRhdGV9ICR7bWVzc2FnZU9iai50aW1lU3RhbXB9YCksXHJcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbWVzc2FnZU1hcCgpIHtcclxuICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikpO1xyXG4gICAgY29uc29sZS5sb2coY3VycmVudFVzZXIpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwibWVzc2FnZXMvP19leHBhbmQ9dXNlclwiKVxyXG4gICAgICAudGhlbihtZXNzYWdlT2JqID0+IHtcclxuXHJcbiAgICAgICAgbWVzc2FnZU9iai5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wcmludE1lc3NhZ2VzKG1lc3NhZ2UpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLm5ld01lc3NhZ2UoKTtcclxuICAgICAgICB0aGlzLnN1Ym1pdE1lc3NhZ2UoKTtcclxuICAgICAgICB0aGlzLmVkaXRCdXR0b25DbGljaygpO1xyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgLy8gYnVpbGRzIG5ldyBtZXNzYWdlIGVudHJ5IGZpZWxkXHJcbiAgbmV3TWVzc2FnZSgpIHtcclxuICAgIC8vd3JhcHBlZCB0aGlzIGluIGEgZGl2IGluc3RlYWQgb2YgYSBzZWN0aW9uLCB0byBncmFiIHNlY3Rpb25zIGVhc2llci5cclxuICAgIG5ldyBjb21wLmRpdih7XHJcbiAgICAgICAgY2xhc3NOYW1lOiBcIm5ldy0tbWVzc2FnZVwiLFxyXG4gICAgICAgIGlkOiBcIm5ld01lc3NhZ2VcIlxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBcIk5ldyBNZXNzYWdlXCIpLFxyXG4gICAgICBuZXcgY29tcC50ZXh0YXJlYSh7XHJcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwidHlwZSB5b3VyIG1lc3NhZ2UgaGVyZVwiLFxyXG4gICAgICAgIHdyYXA6IFwiaGFyZFwiXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJTdWJtaXRcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgfSxcclxuXHJcbiAgc3VibWl0TWVzc2FnZSgpIHtcclxuICAgICQoXCIjbmV3TWVzc2FnZSA+IGJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAvL2lmIHN0YXRtZW50IHRvIHByZXZlbnQgYmxhbmsgZW50cmllc1xyXG4gICAgICBpZiAoJChcIiNuZXdNZXNzYWdlID4gdGV4dGFyZWFcIikudmFsKCkgPT09IFwiXCIpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciB5b3VyIG1lc3NhZ2VcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAvL2NyZWF0ZXMgb2JqZWN0IG9mIGN1cnJlbnQgbW9tZW50XHJcbiAgICAgICAgbGV0IGRhdGVBbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAvL2NvbnZlcnRzIGl0IGludG8gYSBzdHJpbmcgYW5kIHRoZW4gYW4gYXJyYXkgdG8gZ3JhYiBzcGVjaWZpYyB2YWx1ZXNcclxuICAgICAgICBsZXQgZGF0ZUFycmF5ID0gZGF0ZUFuZFRpbWUudG9TdHJpbmcoKS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgLy9nZXRNb250aCgpIG1ldGhvZCByZXR1cm5zIGEgbnVtYmVyIGJldHdlZW4gMC0xMS4gQWRkZWQgMSB0byBnZXQgY3VycmVudCBtb250aFxyXG4gICAgICAgIGxldCBtb250aCA9IGRhdGVBbmRUaW1lLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIC8vYnVpbGRzIG9iamVjdCB0byBwYXNzIGludG8gZmV0Y2hcclxuICAgICAgICBsZXQgc3VibWl0TWVzc2FnZU9iaiA9IHtcclxuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiAkKFwiI25ld01lc3NhZ2UgPiB0ZXh0YXJlYVwiKS52YWwoKSxcclxuICAgICAgICAgIHRpbWVTdGFtcDogZGF0ZUFycmF5WzRdLCAvL1RPRE86IG1ha2UgaXQgbm9uIG1pbGl0YXJ5IHRpbWVcclxuICAgICAgICAgIGRhdGU6IGAke21vbnRofS8ke2RhdGVBcnJheVsyXX0vJHtkYXRlQXJyYXlbM119YCxcclxuICAgICAgICAgIHVzZXJJZDogY3VycmVudFVzZXIuaWRcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2VuZCB0byBBUElcclxuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJtZXNzYWdlc1wiLCBzdWJtaXRNZXNzYWdlT2JqKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgZWRpdEJ1dHRvbkNsaWNrKCkge1xyXG4gICAgLy8gZ3JhYnMgdGhlIGVkaXQgYnV0dG9uc1xyXG4gICAgJChcInNlY3Rpb24gPiBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgLy8gc3RvcmVzIHRoZSBtZXNzYWdlIGluIGEgdmFyYWJsZVxyXG4gICAgICBsZXQgbWVzc2FnZUgxID0gZS50YXJnZXQucHJldmlvdXNTaWJsaW5nXHJcbiAgICAgIC8vIHN0b3JlIG1lc3NhZ2UncyB0ZXh0IGluIGEgdmFyYWJsZVxyXG4gICAgICBsZXQgbWVzc2FnZVRleHQgPSBtZXNzYWdlSDEuaW5uZXJIVE1MO1xyXG4gICAgICAvLyByZXBsYWNlcyBFZGl0IGJ1dHRvbiB3aXRoIFNhdmUgYnV0dG9uXHJcbiAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKFwiPGJ1dHRvbiBjbGFzcz0gJ2J0bicgdHlwZSA9J2J1dHRvbic+U2F2ZTwvYnV0dG9uPlwiKVxyXG4gICAgICAvLyByZXBsYWNlcyBtZXNzYWdlIHRleHQgd2l0aCBhbiBpbnB1dCBmaWVsZFxyXG4gICAgICAkKG1lc3NhZ2VIMSkucmVwbGFjZVdpdGgoYDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkID0gXCJlZGl0RmllbGRcIiB2YWx1ZT1cIiR7bWVzc2FnZVRleHR9XCI+YClcclxuICAgICAgLy8gc3RvcmVzIHRoZSBuZXcgaW5wdXQgZmllbGQgaW4gYSB2YXJhYmxlXHJcbiAgICAgIGNvbnN0IG5ld0lucHV0RmllbGQgPSAkKFwiI2VkaXRGaWVsZFwiKTtcclxuICAgICAgLy8gc2V0cyBhIGNsaWNrIGV2ZW50IG9uIHRoZSBuZXcgc2F2ZSBidXR0b25cclxuICAgICAgbmV3SW5wdXRGaWVsZC5uZXh0KCkuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyBzdG9yZXMgaW5wdXQgdmFsdWUgaW4gYW4gb2JqZWN0IHVwb24gc2F2ZSBjbGlja1xyXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VUZXh0T2JqID0ge1xyXG4gICAgICAgICAgbWVzc2FnZUNvbnRlbnQ6IG5ld0lucHV0RmllbGQudmFsKCksXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNhdmUgbWVzc2FnZSBpZCAjXHJcbiAgICAgICAgY29uc3QgZWRpdGVkTWVzc2FnZUlkID0gbmV3SW5wdXRGaWVsZC5wYXJlbnQoKS5hdHRyKFwiaWRcIilcclxuICAgICAgICAvLyBQYXRjaCBtZXNzYWdlIGluIHNlcnZlciBhbmQgcmVmcmVzaCB0aGUgbWVzc2FnZXMgb24gdGhlIHBhZ2VcclxuICAgICAgICBBUEkudXBkYXRlSXRlbShcIm1lc3NhZ2VzXCIsIGVkaXRlZE1lc3NhZ2VJZCwgZWRpdGVkTWVzc2FnZVRleHRPYmopXHJcbiAgICAgICAgICAudGhlbigoKSA9PiBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZE1lc3NhZ2VzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5cblxuXG5jb25zdCBidWlsZE1pc3Npb25Db250cm9sID0ge1xuICBwcmludFBsYWNlaG9sZGVyICgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gbnVsbDtcbiAgICBjb25zdCB1c2VyID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikpO1xuICAgIGNvbnNvbGUubG9nKHVzZXIpO1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibWVzc2FnZVwiLCBpZDogYCR7dXNlci5pZH1gfSxcbiAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHt1c2VyLnByb2ZpbGVQaWN9YCwgYWx0OiBcIlByb2ZpbGUgUGljXCIsIHN0eWxlOlwiZGlzcGxheTppbmxpbmUtYmxvY2s7IGJvcmRlci1yYWRpdXM6IDhweDsgbWFyZ2luOiA0cHhcIiwgaGVpZ2h0OiBcIjEyNVwiLCB3aWR0aDogXCIxMjVcIn0pLFxuICAgIG5ldyBjb21wLnRpdGxlKCBcImgyXCIsIHtzdHlsZTpcImRpc3BsYXk6IGlubGluZS1ibG9jazsgcG9zaXRpb246IHJlbGF0aXZlOyBib3R0b206IDEwcHhcIn0sIGAke3VzZXIuZmlyc3ROYW1lfSAtICR7dXNlci5sYXN0TmFtZX0gJHt1c2VyLnVzZXJuYW1lfWApLFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE1pc3Npb25Db250cm9sOyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxuaW1wb3J0IGJ1aWxkTWVzc2FnZXMgZnJvbSBcIi4vbWVzc2FnZXNcIjtcbmltcG9ydCBidWlsZE5ld3MgZnJvbSBcIi4vbmV3c1wiO1xuaW1wb3J0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgZnJvbSBcIi4vbWlzc2lvbkNvbnRyb2xcIjtcbmltcG9ydCBidWlsZFRhc2tzIGZyb20gXCIuL3Rhc2tzXCJcblxuXG5jb25zdCBuYXZCYXIgPSB7XG4gIGxvYWROYXZCYXIoKSB7XG4gICAgbmV3IGNvbXAudWwoXG4gICAgICB7fSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkhvbWVcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJUYXNrc1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkV2ZW50c1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIk1lc3NhZ2VzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiTmV3c1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkZyaWVuZHNcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJMb2cgT3V0XCIpXG4gICAgKS5yZW5kZXIoXCIjbmF2QmFyXCIpXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdkJhclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkhvbWVcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVpbGRNaXNzaW9uQ29udHJvbC5wcmludFBsYWNlaG9sZGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiVGFza3NcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVpbGRUYXNrcy5idWlsZENvbnRhaW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJFdmVudHNcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIGZ1bmN0aW9uIGNhbGxlZC5cIilcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJNZXNzYWdlc1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTmV3c1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVpbGROZXdzLm5ld3NNYXAoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJGcmllbmRzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZyaWVuZHMgZnVuY3Rpb24gY2FsbGVzLlwiKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkxvZyBPdXRcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvZyBPdXQgZnVuY3Rpb24gY2FsbGVkLlwiKTtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5hdkJhciIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcblxuXG5jb25zdCBidWlsZE5ld3MgPSB7XG4gIHByaW50TmV3cyhuZXdzT2JqKSB7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXdzXCIsIGlkOiBgJHtuZXdzT2JqLmlkfWB9LFxuICAgIG5ldyBjb21wLmFuY2hvcih7aHJlZjogYCR7bmV3c09iai51cmx9YCwgdGFyZ2V0OiBcIl9ibGFua1wifSwgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke25ld3NPYmouYXJ0aWNsZUltYWdlfWAsIGFsdDogXCJBcnRpY2xlIEltYWdlXCIsIGhlaWdodDogXCIxMjBcIiwgd2lkdGg6IFwiMTIwXCJ9KSksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7fSwgYCR7bmV3c09iai5hcnRpY2xlTmFtZX1gKSxcbiAgICBuZXcgY29tcC50aXRsZShcImg0XCIsIHt9LCBgU2F2ZWQgYnk6ICR7bmV3c09iai51c2VyLmZpcnN0TmFtZX0gfCBEYXRlIFNhdmVkOiAke25ld3NPYmouZGF0ZVNhdmVkfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG5ld3NPYmouYWJvdXQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG4gIG5ld3NNYXAgKCkgIHtcbiAgICBjb25zdCB1c2VyID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikpO1xuICAgIGNvbnNvbGUubG9nKHVzZXIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwiYXJ0aWNsZXMvP19leHBhbmQ9dXNlciZfc29ydD1kYXRlU2F2ZWQmX29yZGVyPWRlc2NcIilcbiAgICAudGhlbihuZXdzT2JqID0+IG5ld3NPYmouZm9yRWFjaChuZXdzID0+IHtcbiAgICAgIHRoaXMucHJpbnROZXdzKG5ld3MpfSkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLm5ld05ld3MoKSlcblxuICB9LFxuXG4gIG5ld05ld3MgKCkge1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS1uZXdzXCJ9LFxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHt9LCBcIlNhdmUgTmV3cyBBcnRpY2xlXCIpLFxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVOYW1lXCJ9LCBcIkFydGljbGUgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVOYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTmFtZVwiLCBpZDogXCJhcnRpY2xlTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlVXJsXCJ9LCBcIkFydGljbGUgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBMaW5rXCIsIGlkOiBcImFydGljbGVMaW5rXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZUltYWdlVXJsXCJ9LCBcIkFydGljbGUgSW1hZ2UgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVJbWFnZVVybFwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIEltYWdlIExpbmtcIiwgaWQ6IFwiYXJ0aWNsZUltYWdlXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9LCBcIkFydGljbGUgRGVzY3JpcHRpb25cIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlRGVzY3JpcHRpb25cIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBEZXNjcmlwdGlvblwiLCBpZDogXCJhcnRpY2xlRGVzY3JpcHRpb25cIn0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiU2F2ZSBOZXcgQXJ0aWNsZVwiKVxuICAgICksXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgIGxldCBzdG9yeSA9IHtcbiAgICAgICAgYXJ0aWNsZU5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZU5hbWVcIikudmFsdWUsXG4gICAgICAgIHVybDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlTGlua1wiKS52YWx1ZSxcbiAgICAgICAgYXJ0aWNsZUltYWdlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVJbWFnZVwiKS52YWx1ZSxcbiAgICAgICAgYWJvdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZURlc2NyaXB0aW9uXCIpLnZhbHVlLFxuICAgICAgICAvKlxuICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxuICAgICAgICAqL1xuICAgICAgICB1c2VySWQ6IDIsXG4gICAgICAgIGRhdGVTYXZlZDogbmV3IERhdGUoKVxuICAgICAgfVxuICAgICAgYnVpbGROZXdzLmFkZE5ld3Moc3RvcnkpXG4gICAgfSlcbiAgfSxcblxuICBhZGROZXdzKHN0b3J5KXtcbiAgICBBUEkuc2F2ZUl0ZW0oXCJhcnRpY2xlc1wiLCBzdG9yeSkudGhlbigoKT0+IHRoaXMubmV3c01hcCgpKVxuICB9XG5cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGROZXdzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIjtcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiO1xuaW1wb3J0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgZnJvbSBcIi4vbWlzc2lvbkNvbnRyb2xcIjtcblxuY29uc3QgcmVnaXN0ZXJGdW5jcyA9IHtcblxuICBsb2FkUmVnaXN0ZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRmlyc3QgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJmaXJzdE5hbWVcIiwgaWQ6IFwiZmlyc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkZpcnN0IE5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkxhc3QgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJsYXN0TmFtZVwiLCBpZDogXCJsYXN0TmFtZVwiLCBwbGFjZWhvbGRlcjogXCJMYXN0IE5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkVtYWlsXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcImVtYWlsXCIsIGlkOiBcImVtYWlsXCIsIG5hbWU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiZW1haWxcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInVzZXJuYW1lXCIsIGlkOiBcInVzZXJuYW1lXCIsIHBsYWNlaG9sZGVyOiBcInVzZXJuYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJwYXNzd29yZFwiIH0sIFwiUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwicGFzc3dvcmRcIiwgaWQ6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcImNvbmZpcm1QYXNzd29yZFwiIH0sIFwiQ29uZmlybSBQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJjb25maXJtUGFzc3dvcmRcIiwgaWQ6IFwiY29uZmlybVBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIkNvbmZpcm0gUGFzc3dvcmRcIiB9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlJlZ2lzdGVyIEFjY291bnRcIiksXG4gICAgICBuZXcgY29tcC5idG4oXCJBbHJlYWR5IGEgdXNlcj8gTG9nIGluIG5vd1wiKVxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiUmVnaXN0ZXIgQWNjb3VudFwiKSB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlyc3ROYW1lXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdE5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJuYW1lXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUGFzc3dvcmRcIikudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY2hlY2sgdG8gZW5zdXJlIGFsbCBmaWVsZHMgYXJlIGNvbXBsZXRlLlxuICAgICAgICAgICAgYWxlcnQoXCJBbGwgZmllbGRzIG11c3QgYmUgY29tcGxldGUgdG8gY3JlYXRlIGFuIGFjY291bnQuXCIpXG4gICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlLmluZGV4T2YoXCJAXCIpID09PSAtMSkge1xuICAgICAgICAgICAgLy9UaGlzIGlzIGEgY2hlY2sgb24gdGhlIGVtYWlsIGZpZWxkIHRvIG1ha2Ugc3VyZSB0aGVyZSBpcyBhbiBAIHByZXNlbnRcbiAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIilcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUgPT09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVBhc3N3b3JkXCIpLnZhbHVlKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNoZWNrIHRvIG1ha2Ugc3VyZSBwYXNzd29yZHMgYXJlIHRoZSBzYW1lLlxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBsZXQgdGVtcFVzZXIgPSB7XG4gICAgICAgICAgICAgIGZpcnN0TmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIGxhc3ROYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhc3ROYW1lXCIpLnZhbHVlLFxuICAgICAgICAgICAgICBlbWFpbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgdXNlcm5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlLFxuICAgICAgICAgICAgICAvL1RoaXMgaXMgYSBwbGFjZWhvbGRlciB0byBhIHN0b2NrIFwibm8gaW1hZ2UgYXZhaWxhYmxlXCIgaW1hZ2UgdGhhdCB3ZSBjYW4gdXNlIGxhdGVyIGZvciBhY3R1YWwgdXNlciBpbWFnZXNcbiAgICAgICAgICAgICAgcHJvZmlsZVBpYzogXCJodHRwczovL2h5aGEueHl6L3dwLWNvbnRlbnQvdGhlbWVzL2Zhc2hpb24vaW1hZ2VzL25vX2ltYWdlX2F2YWlsYWJsZS5qcGdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQVBJLmdldEFsbENhdGVnb3J5KGB1c2Vycy8/ZW1haWw9JHt0ZW1wVXNlci5lbWFpbH1gKS50aGVuKHRoaXNEYXRhID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXNEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZWdpc3Rlcih0ZW1wVXNlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJUaGlzIGVtYWlsIGlzIGFscmVhZHkgcmVnaXN0ZXJlZC5cIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgeyBhbGVydChcIllvdXIgcGFzc3dvcmRzIGRpZCBub3QgbWF0Y2guIFBsZWFzZSB0cnkgYWdhaW4uXCIpIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBjaGVja1JlZ2lzdGVyKHVzZXIpIHtcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz91c2VybmFtZT0ke3VzZXIudXNlcm5hbWV9YCkudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJ1c2Vyc1wiLCB1c2VyKS50aGVuKG5ld1VzZXIgPT4ge1xuICAgICAgICAgIGxldCBjdXJyZW50VXNlciA9IG5ldyBjb21wLnVzZXIobmV3VXNlcik7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJVc2VybmFtZSBjaGVja1JlZ2lzdGVyOiBcIiwgY3VycmVudFVzZXIpXG4gICAgICAgICAgLy9UT0RPOnRoZSBmdW5jdGlvbiBiZWxvdyBuZWVkcyB0byBiZSB0aGUgY2FsbCB0byBsb2FkIG1pc3Npb24gY29udHJvbCBwYWdlLlxuICAgICAgICAgIC8vIFJpZ2h0IG5vdyBpdCBpcyBqdXN0IHNlbmRpbmcgdG8gYSBmdW5jdGlvbiB0byBjb25zb2xlLmxvZyB1c2VyXG4gICAgICAgICAgdGhpcy5sb2FkTWlzc2lvbihjdXJyZW50VXNlcik7XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFsZXJ0KGBVc2VybmFtZSwgJHtkYXRhWzBdLnVzZXJuYW1lfSwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLiBQbGVhc2UgY2hvb3NlIGFub3RoZXIuYClcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8vVE9ETzogdGhpcyBmdW5jdGlvbiBjYW4gZ28gYXdheSB3aGVuIHRoZSBmdW5jdGlvbiB0byBsb2FkIG1pc3Npb24gcGFnZSBpcyByZXBsYWNlZCBpbiBjaGVja1JlZ2lzdGVyIGZ1bmN0aW9uIGFib3ZlXG4gIGxvYWRNaXNzaW9uKHVzZXIpIHtcbiAgICBjb25zb2xlLmxvZyh1c2VyKVxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgYnVpbGRNaXNzaW9uQ29udHJvbC5wcmludFBsYWNlaG9sZGVyKCk7XG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXJGdW5jcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxyXG5cclxubGV0IGN1cnJlbnRVc2VyID0ge31cclxuXHJcbmNvbnN0IGJ1aWxkVGFza3MgPSB7XHJcblxyXG4gIC8vZnVuY3Rpb24gcnVuIGZpcnN0IGluIG9yZGVyIHRvIGNsZWFyIEhUTUwsIGNyZWF0ZSBwYXJlbnQgY29udGFpbmVycywgdGhlbiBhZGQgbmV3IHRhc2sgaW5wdXQgYW5kIGNhbGwgZmV0Y2hcclxuICBidWlsZENvbnRhaW5lcnMgKCkge1xyXG4gICAgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhjdXJyZW50VXNlcik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0taW5jb21wbGV0ZVwifSwgXCJJbmNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBuZXcgY29tcC5kaXYgKHtpZDogXCJpbmNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0tY29tcGxldGVcIn0sIFwiQ29tcGxldGUgVGFza3NcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIG5ldyBjb21wLmRpdiAoe2lkOiBcImNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgdGhpcy5uZXdUYXNrKClcclxuICAgIHRoaXMudGFza3NGZXRjaCgpXHJcbiAgfSxcclxuXHJcbiAgLy91c2VkIHRvIGNyZWF0ZSBhbmQgYXBwZW5kIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlIHRvIERPTVxyXG4gIHByaW50VGFza3MgKHRhc2tzT2JqKSB7XHJcbiAgICBsZXQgb3V0cHV0Q29udGFpbmVyO1xyXG4gICAgaWYgKHRhc2tzT2JqLmNvbXBsZXRlKSB7XHJcbiAgICAgIG91dHB1dENvbnRhaW5lciA9IFwiI2NvbXBsZXRlXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG91dHB1dENvbnRhaW5lciA9IFwiI2luY29tcGxldGVcIlxyXG4gICAgfVxyXG5cclxuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwidGFza1wiLCBpZDogYCR7dGFza3NPYmouaWR9YH0sXHJcbiAgICBuZXcgY29tcC5jaGVja2JveCgpLFxyXG4gICAgbmV3IGNvbXAucGFyKHtjbGFzc05hbWU6IFwiZWRpdGFibGUtLXRhc2tcIn0sIHRhc2tzT2JqLnRhc2spLFxyXG4gICAgbmV3IGNvbXAucGFyKHtjbGFzc05hbWU6IFwiZWRpdGFibGUtLWRhdGVcIn0sIHRhc2tzT2JqLmR1ZURhdGUpKS5yZW5kZXIob3V0cHV0Q29udGFpbmVyKVxyXG4gIH0sXHJcblxyXG4gIC8vZmV0Y2ggYWxsIHRhc2tzIGZyb20gZGF0YWJhc2UsIGNhbGwgY3JlYXRlL2FwcGVuZCBhbmQgY2FsbCBhZGQgbGlzdGVuZXJzXHJcbiAgdGFza3NGZXRjaCAoKSAge1xyXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwidGFza3NcIikgLy9jaGVjayBpZiB1c2VyIGlzIHNhbWUgYXMgc2Vzc2lvbiBzdG9yYWdlXHJcbiAgICAudGhlbih0YXNrc09iaiA9PiAge1xyXG4gICAgICB0YXNrc09iai5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICB0aGlzLnByaW50VGFza3ModGFzayl9KVxyXG4gICAgICB0aGlzLmNiTGlzdGVuZXIoKVxyXG4gICAgICB0aGlzLnBhckxpc3RlbmVyKClcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgLy9jaGVja2JveCBsaXN0ZW5lciB3aWxsIG1vdmUgdGFza3MgYmV0d2VlbiBjb21wbGV0ZSBhbmQgaW5jb21wbGV0ZSBjb250YWluZXJzXHJcbiAgLy9kYXRhYmFzZSBcImNvbXBsZXRlXCIgcHJvcGVydHkgd2lsbCBiZSBwYXRjaGVkIGFjY29yZGluZ2x5IGFuZCBET00gdXBkYXRlZFxyXG4gIGNiTGlzdGVuZXIgKCkge1xyXG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKVxyXG5cclxuICAgIC8vaWYgdGhlIGlkIG9mIHRoZSBncmFuZHBhcmVudCBjb250YWluZXIgaXMgI2NvbXBsZXRlLCB0aGVuIGNoZWNrIHRoZSBib3hcclxuICAgIGNoZWNrYm94ZXMuZm9yRWFjaCggKGNoZWNrYm94KSA9PiB7XHJcbiAgICAgIGlmIChjaGVja2JveC5wYXJlbnROb2RlLnBhcmVudE5vZGUuaWQgPT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlXHJcbiAgICAgIH1cclxuICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGxldCBwYXRjaFByb3BlcnR5O1xyXG4gICAgICAgIC8vaWYgZmFsc2UgLT4gdHJ1ZVxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XHJcbiAgICAgICAgICBwYXRjaFByb3BlcnR5ID0ge2NvbXBsZXRlOiB0cnVlfVxyXG4gICAgICAgICAgLy9wYXRjaCBcImNvbXBsZXRlXCIgcHJvcGVydHkgb2YgZGF0YWJhc2Ugb2JqZWN0IHVzaW5nIHBhcmVudE5vZGUgKHNlY3Rpb24pIElEIHRvIFRSVUVcclxuICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gLCBwYXRjaFByb3BlcnR5KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL2lmIGNoZWNrYm94IGlzIHVuY2hlY2tlZC4uLlxyXG4gICAgICAgICAgcGF0Y2hQcm9wZXJ0eSA9IHtjb21wbGV0ZTogZmFsc2V9XHJcbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9LFxyXG5cclxuICAvL2Z1bmN0aW9uIHVzZWQgdG8gZWRpdCB0YXNrcyBpbiBET00gYW5kIHBhdGNoIG5ldyBpbmZvIHRvIGRhdGFiYXNlIHRhc2sgZGVzY3JpcHRpb24gYW5kIGRhdGVcclxuICBwYXJMaXN0ZW5lciAoKSB7XHJcbiAgICAvL2dldCBhbGwgc2VjdGlvbnMgb24gcGFnZVxyXG4gICAgbGV0IHNlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlY3Rpb25cIilcclxuXHJcbiAgICAvLy9hZGQgY2xpY2sgbGlzdGVuZXIgdG8gYWxsIHNlY3Rpb25zXHJcbiAgICBzZWN0aW9ucy5mb3JFYWNoKHNlY3Rpb24gPT4ge1xyXG4gICAgICBzZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIC8vZ2V0IGlkIG9mIHRhcmdldCBzZWN0aW9uXHJcbiAgICAgICAgY29uc3QgaWQgPSBlLnRhcmdldC5wYXJlbnROb2RlLmlkXHJcblxyXG4gICAgICAgIC8vaWYgcGFyYWdyYXBoIGNsaWNrZWQgaXMgdGFzayBkZXNjcmlwdGlvbiwgZ2V0IHRleHQgY29udGVudFxyXG4gICAgICAgIC8vY3JlYXRlIG5ldyA8aW5wdXQ+IHRlbXBsYXRlICh3aXRoICBJRCEpIGFuZCByZXBsYWNlIDxwPiB3aXRoIDxpbnB1dD5cclxuICAgICAgICAvL2FkZCBhIGtleWRvd24gbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcclxuICAgICAgICAvL3BhdGNoIHRoZSB0YXNrIGRlc2NyaXB0aW9uIHRvIGRhdGFiYXNlIHdoZW4gRU5URVIgaXMgcHJlc3NlZFxyXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0YWJsZS0tdGFza1wiKSkge1xyXG4gICAgICAgICAgY29uc3QgdGFza05hbWUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxyXG4gICAgICAgICAgbGV0IHRlbXBUYXNrSW5wdXQgPSBgPGlucHV0IGlkPVwidGVtcDFcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHt0YXNrTmFtZX1cIj5gXHJcbiAgICAgICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aCh0ZW1wVGFza0lucHV0KVxyXG4gICAgICAgICAgY29uc3QgdGVtcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMVwiKTtcclxuICAgICAgICAgICAgdGVtcElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoVGFzayA9IHt0YXNrOiB0ZW1wSW5wdXQudmFsdWV9XHJcbiAgICAgICAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGlkLCBwYXRjaFRhc2spXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vaWYgcGFyYWdyYXBoIGNsaWNrZWQgaXMgdGFzayBkdWUgZGF0ZSwgZ2V0IHRleHQgY29udGVudFxyXG4gICAgICAgIC8vY3JlYXRlIG5ldyA8aW5wdXQ+IHRlbXBsYXRlICh3aXRoICBJRCEpIGFuZCByZXBsYWNlIDxwPiB3aXRoIDxpbnB1dD5cclxuICAgICAgICAvL2FkZCBhIGNoYW5nZSBsaXN0ZW5lciB0byB0aGUgaW5wdXQgYWZ0ZXIgaXQgaXMgaW4gRE9NIGFuZFxyXG4gICAgICAgIC8vcGF0Y2ggdGhlIHRhc2sgZHVlIGRhdGUgdG8gZGF0YWJhc2Ugd2hlbiBuZXcgZGF0ZSBpcyBzZWxlY3RlZFxyXG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGFibGUtLWRhdGVcIikpIHtcclxuICAgICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZS50YXJnZXQudGV4dENvbnRlbnRcclxuICAgICAgICAgIGxldCB0ZW1wVGFza0RhdGUgPSBgPGlucHV0IGlkPVwidGVtcDJcIiB0eXBlPVwiZGF0ZVwiIHZhbHVlPVwiJHt0YXNrRGF0ZX1cIj5gXHJcbiAgICAgICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aCh0ZW1wVGFza0RhdGUpXHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBEYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXAyXCIpO1xyXG4gICAgICAgICAgICB0ZW1wRGF0ZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoRGF0ZSA9IHtkdWVEYXRlOiB0ZW1wRGF0ZUlucHV0LnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBpZCwgcGF0Y2hEYXRlKVxyXG4gICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gIH0sXHJcblxyXG4gIC8vY3JlYXRlcyBuZXcgdGFzayBpbnB1dCBmaWVsZCB3aXRoIGFwcGVuZCBidXR0b24gaW5zaWRlIGZpcnN0IHNlY3Rpb24gb2YgSU5DT01QTEVURSBjb250YWluZXJcclxuICBuZXdUYXNrICgpIHtcclxuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS10YXNrXCJ9LFxyXG4gICAgbmV3IGNvbXAuYnRuIChcIitcIiksXHJcbiAgICBuZXcgY29tcC5pbnB1dCh7aWQ6IFwiaW5wdXQtLXRhc2tcIiwgdHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiBcInR5cGUgbmV3IHRhc2sgaGVyZVwifSksXHJcbiAgICBuZXcgY29tcC5pbnB1dCh7aWQ6IFwiaW5wdXQtLWRhdGVcIiwgdHlwZTogXCJkYXRlXCJ9KSkucmVuZGVyKFwiI2luY29tcGxldGVcIilcclxuXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpXHJcbiAgICBjb25zdCBpbnB1dF90YXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC0tdGFza1wiKVxyXG4gICAgY29uc3QgaW5wdXRfZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtLWRhdGVcIilcclxuXHJcbiAgICAvL2J1dHRvbiBjbGljayBwb3N0cyBuZXcgdGFzayB0byBkYXRhYmFzZSBhbmQgcmVzZXRzIG5ldyB0YXNrIGlucHV0IHN0cmluZ3NcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgaWYgKGlucHV0X3Rhc2sudmFsdWUgPT09IFwiXCIgfHwgaW5wdXRfZGF0ZS52YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCB0YXNrSXRlbSA9IHtcclxuICAgICAgICAgIHRhc2s6IGlucHV0X3Rhc2sudmFsdWUsXHJcbiAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgICBkdWVEYXRlOiBpbnB1dF9kYXRlLnZhbHVlLFxyXG4gICAgICAgICAgLypcclxuICAgICAgICAgIE5FRUQgVE8gVVBEQVRFIFVTRVIgSUQgVE8gU0FWRSBTRVNTSU9OIEFTU0lHTkVEIElEXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgICAgdXNlcklkOiAzLFxyXG4gICAgICAgIH1cclxuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJ0YXNrc1wiLCB0YXNrSXRlbSkudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgIHRoaXMucHJpbnRUYXNrcyhkYXRhKVxyXG4gICAgICAgICAgdGhpcy5jYkxpc3RlbmVyKClcclxuICAgICAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaW5wdXRfdGFzay52YWx1ZSA9IFwiXCJcclxuICAgICAgICBpbnB1dF9kYXRlLnZhbHVlID0gXCJcIlxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRUYXNrcyJdfQ==
