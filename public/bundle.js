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

var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildMessages = {
  printMessages(messageObj) {
    if (_sessionStorage.default.info().id === messageObj.user.id) {
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
          userId: _sessionStorage.default.info().id // send to API

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

},{"./apiData":2,"./components":3,"./sessionStorage":12}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildMissionControl = {
  printPlaceholder() {
    document.querySelector(".container--inner").innerHTML = null;
    new _components.default.section({
      className: "message",
      id: `${_sessionStorage.default.info().id}`
    }, new _components.default.image({
      src: `${_sessionStorage.default.info().profilePic}`,
      alt: "Profile Pic",
      style: "display:inline-block; border-radius: 8px; margin: 4px",
      height: "125",
      width: "125"
    }), new _components.default.title("h2", {
      style: "display: inline-block; position: relative; bottom: 10px"
    }, `${_sessionStorage.default.info().firstName} - ${_sessionStorage.default.info().lastName} ${_sessionStorage.default.info().username}`)).render(".container--inner");
  }

};
var _default = buildMissionControl;
exports.default = _default;

},{"./components":3,"./sessionStorage":12}],9:[function(require,module,exports){
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

},{"./components":3,"./login":5,"./messages":7,"./missionControl":8,"./news":10,"./tasks":13}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _apiData = _interopRequireDefault(require("./apiData"));

var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));

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
    document.querySelector(".container--inner").innerHTML = "";

    _apiData.default.getAllCategory("articles/?_expand=user&userid=_sort=dateSaved&_order=desc").then(newsObj => newsObj.forEach(news => {
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
        userId: _sessionStorage.default.info.id(),
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

},{"./apiData":2,"./components":3,"./sessionStorage":12}],11:[function(require,module,exports){
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
// scripts related to sessionStorage
const activeUser = {
  info() {
    let loggedInUser = JSON.parse(sessionStorage.currentUser);
    return loggedInUser;
  }

};
var _default = activeUser;
exports.default = _default;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _apiData = _interopRequireDefault(require("./apiData"));

var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildTasks = {
  //function run first in order to clear HTML, create parent containers, then add new task input and call fetch
  buildContainers() {
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
          userId: _sessionStorage.default.info().id
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

},{"./apiData":2,"./components":3,"./sessionStorage":12}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvbGFuZGluZy5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9taXNzaW9uQ29udHJvbC5qcyIsIi4uL3NjcmlwdHMvbmF2LmpzIiwiLi4vc2NyaXB0cy9uZXdzLmpzIiwiLi4vc2NyaXB0cy9yZWdpc3Rlci5qcyIsIi4uL3NjcmlwdHMvc2Vzc2lvblN0b3JhZ2UuanMiLCIuLi9zY3JpcHRzL3Rhc2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsTUFBTSxhQUFhLEdBQUcsTUFBTSxFQUE1Qjs7QUFFQSxNQUFNLFlBQU4sQ0FBbUI7QUFDZixFQUFBLFdBQVcsQ0FBQyxJQUFELEVBQU8sVUFBUCxFQUFtQixHQUFHLFFBQXRCLEVBQWdDO0FBQ3ZDLFNBQUssYUFBTCxJQUFzQixRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUF0QjtBQUVBOzs7OztBQUlBLFFBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ2hDLFdBQUssYUFBTCxFQUFvQixXQUFwQixHQUFrQyxVQUFsQztBQUNBLGFBQU8sSUFBUDtBQUNILEtBSEQsTUFHTyxJQUFJLE9BQU8sVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUN2QyxXQUFLLGFBQUwsSUFBc0IsTUFBTSxDQUFDLE1BQVAsQ0FBYyxLQUFLLGFBQUwsQ0FBZCxFQUFtQyxVQUFuQyxDQUF0QjtBQUNIOztBQUVELFFBQUksUUFBUSxDQUFDLE1BQWIsRUFBcUI7QUFDakIsTUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixLQUFLLElB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Q0EsZUFBSyxVQUFMO0FBQ0EsZUFBSyxXQUFMO0FBQ0QsU0FKRDs7QUFLQSxRQUFBLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLEVBQW5CO0FBQ0EsUUFBQSxVQUFVLENBQUMsS0FBWCxHQUFtQixFQUFuQjtBQUNEO0FBQ0YsS0FyQkQ7QUFzQkQ7O0FBdEpnQixDQUFuQjtlQXlKZSxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGVsZW1lbnRTeW1ib2wgPSBTeW1ib2woKVxuXG5jbGFzcyBET01Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIElmIGBhdHRyaWJ1dGVzYCBpcyBqdXN0IGEgc3RyaW5nLCBpdCdzIGEgc2ltcGxlIGVsZW1lbnQgd2l0aCBub1xuICAgICAgICAgICAgcHJvcGVydGllcyAtIGp1c3Qgc29tZSB0ZXh0IGNvbnRlbnRcbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gYXR0cmlidXRlc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IE9iamVjdC5hc3NpZ24odGhpc1tlbGVtZW50U3ltYm9sXSwgYXR0cmlidXRlcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9uZSBIVE1MRWxlbWVudCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmVsZW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGNoaWxkLmVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQW4gYXJyYXkgb2YgZWxlbWVudHMgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaGlsZC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5lbGVtZW50LmZvckVhY2goYyA9PiB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGMpKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZyB2YWx1ZSB3YXMgcGFzc2VkIGluLCBzZXQgdGV4dCBjb250ZW50XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS50ZXh0Q29udGVudCA9IGNoaWxkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZ2V0IGVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tlbGVtZW50U3ltYm9sXVxuICAgIH1cblxuICAgIHJlbmRlcihjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpc1tlbGVtZW50U3ltYm9sXSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpLmFwcGVuZENoaWxkKGZyYWdtZW50KVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBET01Db21wb25lbnRcbiIsImNvbnN0IFVSTCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L1wiXG5cbmNvbnN0IEFQSSA9IHtcbiAgZ2V0QWxsQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YClcbiAgICAgIC50aGVuKGVudHJpZXMgPT4gZW50cmllcy5qc29uKCkpXG4gIH0sXG5cbiAgZ2V0T25lRnJvbUNhdGVnb3J5KGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0/aWQ9JHtpZH1gKVxuICAgICAgLnRoZW4oaW5wdXRzID0+IGlucHV0cy5qc29uKCkpXG4gIH0sXG5cbiAgc2F2ZUl0ZW0oY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgIH1cbiAgICApLnRoZW4oanNvbkRhdGEgPT4ganNvbkRhdGEuanNvbigpKVxuICB9LFxuXG4gIGRlbGV0ZUl0ZW0oY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIHVwZGF0ZUl0ZW0oY2F0ZWdvcnksIGlkLCBpdGVtKXtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9LyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICB9XG4gICAgKVxuXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBET01Db21wb25lbnQgZnJvbSBcIi4uL2xpYi9ub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKG51bGwsIHtcclxuXHJcbiAgdXNlcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIFVzZXIge1xyXG4gICAgICBjb25zdHJ1Y3Rvcih0ZW1wSW5mbykge1xyXG4gICAgICAgIHRoaXMuaWQgPSB0ZW1wSW5mby5pZDtcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IHRlbXBJbmZvLmZpcnN0TmFtZTtcclxuICAgICAgICB0aGlzLmxhc3ROYW1lID0gdGVtcEluZm8ubGFzdE5hbWU7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRlbXBJbmZvLnVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSB0ZW1wSW5mby5wYXNzd29yZDtcclxuICAgICAgICB0aGlzLmVtYWlsID0gdGVtcEluZm8uZW1haWw7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlUGljID0gdGVtcEluZm8ucHJvZmlsZVBpYztcclxuICAgIH1cclxuICAgIC8vVE9ETzogdGhpcyBpcyBqdXN0IGEgdGVzdCBmdW5jdGlvbi4gd2Ugd291bGQgaGF2ZSB0aGUgYWJpbGl0eSB0byBjYWxsIGZvciBzYXZpbmdcclxuICAgIC8vIG1lc3NhZ2VzLGFydGljbGVzLCBldmVudHMgYmUgcmVmZXJlbmNpbmcgYSBmdW5jdGlvbiBkZWZpbmVkIGhlcmVcclxuICAgICAgdGVzdCgpIHtcclxuICAgICAgICByZXR1cm4gYFdlbGNvbWUgJHt0aGlzLmZpcnN0TmFtZX0hIExldCdzIHNlZSB3aGF0J3MgZ29pbmcgb24uYDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGRpdjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGRpdiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkaXZcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGJ0bjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGJ0biBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwiYnRuXCIsIHR5cGU6IFwiYnV0dG9uXCIgfSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGlucHV0OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW5wdXQgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNlY3Rpb246IHtcclxuICAgIHZhbHVlOiBjbGFzcyBzZWN0aW9uIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInNlY3Rpb25cIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHRpdGxlOiB7IC8vZGVmaW5lIGFueSB0eXBlIG9mIGgjLi4gaDEsIGgyLCBldGMuXHJcbiAgICB2YWx1ZTogY2xhc3MgdGl0bGUgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYW5jaG9yOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYW5jaG9yIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImFcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNoZWNrYm94OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgY2hlY2tib3ggZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNsYXNzTmFtZTogXCJjYlwiIH0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbWFnZToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGltYWdlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImltZ1wiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB1bCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ1bFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGk6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsaSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsaVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGZvcm0gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZm9ybVwiLCB7fSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxhYmVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGFiZWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGFiZWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHRleHRhcmVhOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgdGV4dGFyZWEgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwidGV4dGFyZWFcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHBhcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHBhciBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJwXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KSIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiXHJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcclxuXHJcbmNvbnN0IGxhbmRpbmdQYWdlRnVuY3MgPSB7XHJcbiAgbG9hZExhbmRpbmdQYWdlKCkge1xyXG4gICAgbmV3IGNvbXAuZGl2KFxyXG4gICAgICB7IGNsYXNzTGlzdDogXCJ3ZWxjb21lXCIgfSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJ0aXRsZVwiIH0sIFwiV2VsY29tZSB0byBNaXNzaW9uIENvbnRyb2xcIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlclwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGxldCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKVxyXG5cclxuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9naW5cIikge1xyXG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYW5kaW5nUGFnZUZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIjtcbmltcG9ydCBidWlsZE1pc3Npb25Db250cm9sIGZyb20gXCIuL21pc3Npb25Db250cm9sXCI7XG5cbmNvbnN0IGxvZ0luRnVuY3MgPSB7XG4gIGNoZWNrVXNlcih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBpZiAodXNlcm5hbWUgPT09IFwiXCIgfHwgcGFzc3dvcmQgPT09XCJcIikge1xuICAgICAgYWxlcnQoXCJZb3UgbXVzdCBlbnRlciBib3RoIHlvdXIgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHRvIGxvZyBpbi5cIilcbiAgICB9IGVsc2Uge1xuICAgICAgQVBJLmdldEFsbENhdGVnb3J5KGB1c2Vycy8/dXNlcm5hbWU9JHt1c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIG5vIHVzZXIgd2l0aCB0aGF0IHVzZXJuYW1lLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAocGFzc3dvcmQgPT09IGRhdGFbMF0ucGFzc3dvcmQpIHtcbiAgICAgICAgICBsZXQgY3VycmVudFVzZXIgPSBuZXcgY29tcC51c2VyIChkYXRhWzBdKTtcbiAgICAgICAgICByZXR1cm4gY3VycmVudFVzZXI7XG4gICAgICAgIH0gZWxzZSAoIGFsZXJ0KFwiWW91IGVudGVyZWQgdGhlIHdyb25nIHBhc3N3b3JkLiBUcnkgYWdhaW4uXCIpKVxuICAgICAgfSkudGhlbihjdXJyZW50VXNlciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRVc2VyKVxuICAgICAgICBpZiAoY3VycmVudFVzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnVpbGQgTWlzc2lvbiBMb2dpblwiKVxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VXNlcikpO1xuICAgICAgICAgIGJ1aWxkTWlzc2lvbkNvbnRyb2wucHJpbnRQbGFjZWhvbGRlcigpO1xuICAgICAgICB9XG5cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBsb2FkTG9nSW4oKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwidXNlcm5hbWVcIiwgaWQ6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcInBhc3N3b3JkXCIgfSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJwYXNzd29yZFwiLCBpZDogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiTG9naW4gTm93XCIpLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiTm90IGEgdXNlcj8gQ3JlYXRlIG5ldyBhY2NvdW50LlwiKVxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9naW4gTm93XCIpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrVXNlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJuYW1lXCIpLnZhbHVlLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlZ2lzdGVyRnVuY3MubG9hZFJlZ2lzdGVyKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBsb2dJbkZ1bmNzIiwiaW1wb3J0IGxhbmRpbmdQYWdlRnVuY3MgZnJvbSBcIi4vbGFuZGluZ1wiXG5pbXBvcnQgbmF2QmFyIGZyb20gXCIuL25hdlwiXG5cbm5hdkJhci5sb2FkTmF2QmFyKCk7XG5sYW5kaW5nUGFnZUZ1bmNzLmxvYWRMYW5kaW5nUGFnZSgpOyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcbmltcG9ydCBhY3RpdmVVc2VyIGZyb20gXCIuL3Nlc3Npb25TdG9yYWdlXCJcblxuXG5jb25zdCBidWlsZE1lc3NhZ2VzID0ge1xuICBwcmludE1lc3NhZ2VzKG1lc3NhZ2VPYmopIHtcbiAgICBpZiAoYWN0aXZlVXNlci5pbmZvKCkuaWQgPT09IG1lc3NhZ2VPYmoudXNlci5pZCkge1xuICAgICAgbmV3IGNvbXAuc2VjdGlvbih7XG4gICAgICAgICAgY2xhc3NOYW1lOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICBpZDogYCR7bWVzc2FnZU9iai5pZH1gXG4gICAgICAgIH0sXG4gICAgICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke21lc3NhZ2VPYmoudXNlci5wcm9maWxlUGljfWAsIGNsYXNzTmFtZTogXCJtZXNzYWdlUGljXCIsIGFsdDogXCJQcm9maWxlIFBpY1wifSksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge2NsYXNzTmFtZTogXCJtZXNzYWdlQXV0aG9yXCJ9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBtZXNzYWdlT2JqLm1lc3NhZ2VDb250ZW50KSxcbiAgICAgICAgbmV3IGNvbXAuYnRuKFwiRWRpdFwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IGNvbXAuc2VjdGlvbih7XG4gICAgICAgICAgY2xhc3NOYW1lOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICBpZDogYCR7bWVzc2FnZU9iai5pZH1gXG4gICAgICAgIH0sXG4gICAgICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke21lc3NhZ2VPYmoudXNlci5wcm9maWxlUGljfWAsIGFsdDogXCJQcm9maWxlIFBpY1wiLCBjbGFzc05hbWU6IFwibWVzc2FnZVBpY1wifSksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge2NsYXNzTmFtZTpcIm1lc3NhZ2VBdXRob3JcIn0sIGAke21lc3NhZ2VPYmoudXNlci5maXJzdE5hbWV9IC0gJHttZXNzYWdlT2JqLmRhdGV9ICR7bWVzc2FnZU9iai50aW1lU3RhbXB9YCksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG1lc3NhZ2VPYmoubWVzc2FnZUNvbnRlbnQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIH1cbiAgfSxcblxuICBtZXNzYWdlTWFwKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwibWVzc2FnZXMvP19leHBhbmQ9dXNlclwiKVxuICAgICAgLnRoZW4obWVzc2FnZU9iaiA9PiB7XG5cbiAgICAgICAgbWVzc2FnZU9iai5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgIHRoaXMucHJpbnRNZXNzYWdlcyhtZXNzYWdlKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm5ld01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5zdWJtaXRNZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuZWRpdEJ1dHRvbkNsaWNrKCk7XG4gICAgICB9KVxuICB9LFxuICAvLyBidWlsZHMgbmV3IG1lc3NhZ2UgZW50cnkgZmllbGRcbiAgbmV3TWVzc2FnZSgpIHtcbiAgICAvL3dyYXBwZWQgdGhpcyBpbiBhIGRpdiBpbnN0ZWFkIG9mIGEgc2VjdGlvbiwgdG8gZ3JhYiBzZWN0aW9ucyBlYXNpZXIuXG4gICAgbmV3IGNvbXAuZGl2KHtcbiAgICAgICAgY2xhc3NOYW1lOiBcIm5ldy0tbWVzc2FnZVwiLFxuICAgICAgICBpZDogXCJuZXdNZXNzYWdlXCJcbiAgICAgIH0sXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBcIk5ldyBNZXNzYWdlXCIpLFxuICAgICAgbmV3IGNvbXAudGV4dGFyZWEoe1xuICAgICAgICBwbGFjZWhvbGRlcjogXCJ0eXBlIHlvdXIgbWVzc2FnZSBoZXJlXCIsXG4gICAgICAgIHdyYXA6IFwiaGFyZFwiXG4gICAgICB9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlN1Ym1pdFwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgfSxcblxuXG4gIHN1Ym1pdE1lc3NhZ2UoKSB7XG4gICAgJChcIiNuZXdNZXNzYWdlID4gYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAvL2lmIHN0YXRtZW50IHRvIHByZXZlbnQgYmxhbmsgZW50cmllc1xuICAgICAgaWYgKCQoXCIjbmV3TWVzc2FnZSA+IHRleHRhcmVhXCIpLnZhbCgpID09PSBcIlwiKSB7XG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIHlvdXIgbWVzc2FnZVwiKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIC8vY3JlYXRlcyBvYmplY3Qgb2YgY3VycmVudCBtb21lbnRcbiAgICAgICAgbGV0IGRhdGVBbmRUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy9jb252ZXJ0cyBpdCBpbnRvIGEgc3RyaW5nIGFuZCB0aGVuIGFuIGFycmF5IHRvIGdyYWIgc3BlY2lmaWMgdmFsdWVzXG4gICAgICAgIGxldCBkYXRlQXJyYXkgPSBkYXRlQW5kVGltZS50b1N0cmluZygpLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgLy9nZXRNb250aCgpIG1ldGhvZCByZXR1cm5zIGEgbnVtYmVyIGJldHdlZW4gMC0xMS4gQWRkZWQgMSB0byBnZXQgY3VycmVudCBtb250aFxuICAgICAgICBsZXQgbW9udGggPSBkYXRlQW5kVGltZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgLy9idWlsZHMgb2JqZWN0IHRvIHBhc3MgaW50byBmZXRjaFxuICAgICAgICBsZXQgc3VibWl0TWVzc2FnZU9iaiA9IHtcbiAgICAgICAgICBtZXNzYWdlQ29udGVudDogJChcIiNuZXdNZXNzYWdlID4gdGV4dGFyZWFcIikudmFsKCksXG4gICAgICAgICAgdGltZVN0YW1wOiBkYXRlQXJyYXlbNF0sIC8vVE9ETzogbWFrZSBpdCBub24gbWlsaXRhcnkgdGltZVxuICAgICAgICAgIGRhdGU6IGAke21vbnRofS8ke2RhdGVBcnJheVsyXX0vJHtkYXRlQXJyYXlbM119YCxcbiAgICAgICAgICB1c2VySWQ6IGFjdGl2ZVVzZXIuaW5mbygpLmlkXG5cbiAgICAgICAgfVxuICAgICAgICAvLyBzZW5kIHRvIEFQSVxuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJtZXNzYWdlc1wiLCBzdWJtaXRNZXNzYWdlT2JqKVxuICAgICAgICAgIC50aGVuKCgpID0+IGJ1aWxkTWVzc2FnZXMubWVzc2FnZU1hcCgpKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgZWRpdEJ1dHRvbkNsaWNrKCkge1xuICAgIC8vIGdyYWJzIHRoZSBlZGl0IGJ1dHRvbnNcbiAgICAkKFwic2VjdGlvbiA+IGJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gc3RvcmVzIHRoZSBtZXNzYWdlIGluIGEgdmFyYWJsZVxuICAgICAgbGV0IG1lc3NhZ2VIMSA9IGUudGFyZ2V0LnByZXZpb3VzU2libGluZ1xuICAgICAgLy8gc3RvcmUgbWVzc2FnZSdzIHRleHQgaW4gYSB2YXJhYmxlXG4gICAgICBsZXQgbWVzc2FnZVRleHQgPSBtZXNzYWdlSDEuaW5uZXJIVE1MO1xuICAgICAgLy8gcmVwbGFjZXMgRWRpdCBidXR0b24gd2l0aCBTYXZlIGJ1dHRvblxuICAgICAgJChlLnRhcmdldCkucmVwbGFjZVdpdGgoXCI8YnV0dG9uIGNsYXNzPSAnYnRuJyB0eXBlID0nYnV0dG9uJz5TYXZlPC9idXR0b24+XCIpXG4gICAgICAvLyByZXBsYWNlcyBtZXNzYWdlIHRleHQgd2l0aCBhbiBpbnB1dCBmaWVsZFxuICAgICAgJChtZXNzYWdlSDEpLnJlcGxhY2VXaXRoKGA8aW5wdXQgdHlwZT1cInRleHRcIiBpZCA9IFwiZWRpdEZpZWxkXCIgdmFsdWU9XCIke21lc3NhZ2VUZXh0fVwiPmApXG4gICAgICAvLyBzdG9yZXMgdGhlIG5ldyBpbnB1dCBmaWVsZCBpbiBhIHZhcmFibGVcbiAgICAgIGNvbnN0IG5ld0lucHV0RmllbGQgPSAkKFwiI2VkaXRGaWVsZFwiKTtcbiAgICAgIC8vIHNldHMgYSBjbGljayBldmVudCBvbiB0aGUgbmV3IHNhdmUgYnV0dG9uXG4gICAgICBuZXdJbnB1dEZpZWxkLm5leHQoKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyBzdG9yZXMgaW5wdXQgdmFsdWUgaW4gYW4gb2JqZWN0IHVwb24gc2F2ZSBjbGlja1xuICAgICAgICBjb25zdCBlZGl0ZWRNZXNzYWdlVGV4dE9iaiA9IHtcbiAgICAgICAgICBtZXNzYWdlQ29udGVudDogbmV3SW5wdXRGaWVsZC52YWwoKSxcbiAgICAgICAgfVxuICAgICAgICAvLyBzYXZlIG1lc3NhZ2UgaWQgI1xuICAgICAgICBjb25zdCBlZGl0ZWRNZXNzYWdlSWQgPSBuZXdJbnB1dEZpZWxkLnBhcmVudCgpLmF0dHIoXCJpZFwiKVxuICAgICAgICAvLyBQYXRjaCBtZXNzYWdlIGluIHNlcnZlciBhbmQgcmVmcmVzaCB0aGUgbWVzc2FnZXMgb24gdGhlIHBhZ2VcbiAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJtZXNzYWdlc1wiLCBlZGl0ZWRNZXNzYWdlSWQsIGVkaXRlZE1lc3NhZ2VUZXh0T2JqKVxuICAgICAgICAgIC50aGVuKCgpID0+IGJ1aWxkTWVzc2FnZXMubWVzc2FnZU1hcCgpKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTWVzc2FnZXMiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBhY3RpdmVVc2VyIGZyb20gXCIuL3Nlc3Npb25TdG9yYWdlXCJcblxuXG5cbmNvbnN0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgPSB7XG4gIHByaW50UGxhY2Vob2xkZXIgKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBudWxsO1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibWVzc2FnZVwiLCBpZDogYCR7YWN0aXZlVXNlci5pbmZvKCkuaWR9YH0sXG4gICAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7YWN0aXZlVXNlci5pbmZvKCkucHJvZmlsZVBpY31gLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIiwgc3R5bGU6XCJkaXNwbGF5OmlubGluZS1ibG9jazsgYm9yZGVyLXJhZGl1czogOHB4OyBtYXJnaW46IDRweFwiLCBoZWlnaHQ6IFwiMTI1XCIsIHdpZHRoOiBcIjEyNVwifSksXG4gICAgbmV3IGNvbXAudGl0bGUoIFwiaDJcIiwge3N0eWxlOlwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IGJvdHRvbTogMTBweFwifSwgYCR7YWN0aXZlVXNlci5pbmZvKCkuZmlyc3ROYW1lfSAtICR7YWN0aXZlVXNlci5pbmZvKCkubGFzdE5hbWV9ICR7YWN0aXZlVXNlci5pbmZvKCkudXNlcm5hbWV9YCksXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTWlzc2lvbkNvbnRyb2w7IiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiXG5pbXBvcnQgYnVpbGRNZXNzYWdlcyBmcm9tIFwiLi9tZXNzYWdlc1wiO1xuaW1wb3J0IGJ1aWxkTmV3cyBmcm9tIFwiLi9uZXdzXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuaW1wb3J0IGJ1aWxkVGFza3MgZnJvbSBcIi4vdGFza3NcIlxuXG5cbmNvbnN0IG5hdkJhciA9IHtcbiAgbG9hZE5hdkJhcigpIHtcbiAgICBuZXcgY29tcC51bChcbiAgICAgIHt9LFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiSG9tZVwiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIlRhc2tzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiRXZlbnRzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiTWVzc2FnZXNcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJOZXdzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiRnJpZW5kc1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkxvZyBPdXRcIilcbiAgICApLnJlbmRlcihcIiNuYXZCYXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2QmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiSG9tZVwiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJUYXNrc1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZFRhc2tzLmJ1aWxkQ29udGFpbmVycygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkV2ZW50c1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudHMgZnVuY3Rpb24gY2FsbGVkLlwiKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIk1lc3NhZ2VzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJOZXdzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBidWlsZE5ld3MubmV3c01hcCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkZyaWVuZHNcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRnJpZW5kcyBmdW5jdGlvbiBjYWxsZXMuXCIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTG9nIE91dFwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9nIE91dCBmdW5jdGlvbiBjYWxsZWQuXCIpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmF2QmFyIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHt9LCBgJHtuZXdzT2JqLmFydGljbGVOYW1lfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDRcIiwge30sIGBTYXZlZCBieTogJHtuZXdzT2JqLnVzZXIuZmlyc3ROYW1lfSB8IERhdGUgU2F2ZWQ6ICR7bmV3c09iai5kYXRlU2F2ZWR9YCksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbmV3c09iai5hYm91dCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgbmV3c01hcCAoKSAge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwiYXJ0aWNsZXMvP19leHBhbmQ9dXNlciZ1c2VyaWQ9X3NvcnQ9ZGF0ZVNhdmVkJl9vcmRlcj1kZXNjXCIpXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICB0aGlzLnByaW50TmV3cyhuZXdzKX0pKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5uZXdOZXdzKCkpXG5cbiAgfSxcblxuICBuZXdOZXdzICgpIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tbmV3c1wifSxcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7fSwgXCJTYXZlIE5ld3MgQXJ0aWNsZVwiKSxcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlTmFtZVwifSwgXCJBcnRpY2xlIE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIE5hbWVcIiwgaWQ6IFwiYXJ0aWNsZU5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZVVybFwifSwgXCJBcnRpY2xlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTGlua1wiLCBpZDogXCJhcnRpY2xlTGlua1wifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVJbWFnZVVybFwifSwgXCJBcnRpY2xlIEltYWdlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlSW1hZ2VVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIsIGlkOiBcImFydGljbGVJbWFnZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVEZXNjcmlwdGlvblwifSwgXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgRGVzY3JpcHRpb25cIiwgaWQ6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlNhdmUgTmV3IEFydGljbGVcIilcbiAgICApLFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICBsZXQgc3RvcnkgPSB7XG4gICAgICAgIGFydGljbGVOYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVOYW1lXCIpLnZhbHVlLFxuICAgICAgICB1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUxpbmtcIikudmFsdWUsXG4gICAgICAgIGFydGljbGVJbWFnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlSW1hZ2VcIikudmFsdWUsXG4gICAgICAgIGFib3V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVEZXNjcmlwdGlvblwiKS52YWx1ZSxcbiAgICAgICAgLypcbiAgICAgICAgTkVFRCBUTyBVUERBVEUgVVNFUiBJRCBUTyBTQVZFIFNFU1NJT04gQVNTSUdORUQgSURcbiAgICAgICAgKi9cbiAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8uaWQoKSxcbiAgICAgICAgZGF0ZVNhdmVkOiBuZXcgRGF0ZSgpXG4gICAgICB9XG4gICAgICBidWlsZE5ld3MuYWRkTmV3cyhzdG9yeSlcbiAgICB9KVxuICB9LFxuXG4gIGFkZE5ld3Moc3Rvcnkpe1xuICAgIEFQSS5zYXZlSXRlbShcImFydGljbGVzXCIsIHN0b3J5KS50aGVuKCgpPT4gdGhpcy5uZXdzTWFwKCkpXG4gIH1cblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE5ld3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5jb25zdCByZWdpc3RlckZ1bmNzID0ge1xuXG4gIGxvYWRSZWdpc3RlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJGaXJzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImZpcnN0TmFtZVwiLCBpZDogXCJmaXJzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiRmlyc3QgTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiTGFzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImxhc3ROYW1lXCIsIGlkOiBcImxhc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkxhc3QgTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRW1haWxcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwiZW1haWxcIiwgaWQ6IFwiZW1haWxcIiwgbmFtZTogXCJlbWFpbFwiLCBwbGFjZWhvbGRlcjogXCJlbWFpbFwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwidXNlcm5hbWVcIiwgaWQ6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcInBhc3N3b3JkXCIgfSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJwYXNzd29yZFwiLCBpZDogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwiY29uZmlybVBhc3N3b3JkXCIgfSwgXCJDb25maXJtIFBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImNvbmZpcm1QYXNzd29yZFwiLCBpZDogXCJjb25maXJtUGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiUmVnaXN0ZXIgQWNjb3VudFwiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkFscmVhZHkgYSB1c2VyPyBMb2cgaW4gbm93XCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJSZWdpc3RlciBBY2NvdW50XCIpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdE5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0TmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1QYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBjaGVjayB0byBlbnN1cmUgYWxsIGZpZWxkcyBhcmUgY29tcGxldGUuXG4gICAgICAgICAgICBhbGVydChcIkFsbCBmaWVsZHMgbXVzdCBiZSBjb21wbGV0ZSB0byBjcmVhdGUgYW4gYWNjb3VudC5cIilcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUuaW5kZXhPZihcIkBcIikgPT09IC0xKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgYSBjaGVjayBvbiB0aGUgZW1haWwgZmllbGQgdG8gbWFrZSBzdXJlIHRoZXJlIGlzIGFuIEAgcHJlc2VudFxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUGFzc3dvcmRcIikudmFsdWUpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY2hlY2sgdG8gbWFrZSBzdXJlIHBhc3N3b3JkcyBhcmUgdGhlIHNhbWUuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGxldCB0ZW1wVXNlciA9IHtcbiAgICAgICAgICAgICAgZmlyc3ROYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpcnN0TmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgbGFzdE5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIGVtYWlsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlLFxuICAgICAgICAgICAgICB1c2VybmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUsXG4gICAgICAgICAgICAgIC8vVGhpcyBpcyBhIHBsYWNlaG9sZGVyIHRvIGEgc3RvY2sgXCJubyBpbWFnZSBhdmFpbGFibGVcIiBpbWFnZSB0aGF0IHdlIGNhbiB1c2UgbGF0ZXIgZm9yIGFjdHVhbCB1c2VyIGltYWdlc1xuICAgICAgICAgICAgICBwcm9maWxlUGljOiBcImh0dHBzOi8vaHloYS54eXovd3AtY29udGVudC90aGVtZXMvZmFzaGlvbi9pbWFnZXMvbm9faW1hZ2VfYXZhaWxhYmxlLmpwZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz9lbWFpbD0ke3RlbXBVc2VyLmVtYWlsfWApLnRoZW4odGhpc0RhdGEgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpc0RhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1JlZ2lzdGVyKHRlbXBVc2VyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlRoaXMgZW1haWwgaXMgYWxyZWFkeSByZWdpc3RlcmVkLlwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7IGFsZXJ0KFwiWW91ciBwYXNzd29yZHMgZGlkIG5vdCBtYXRjaC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIikgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIGNoZWNrUmVnaXN0ZXIodXNlcikge1xuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlci51c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIEFQSS5zYXZlSXRlbShcInVzZXJzXCIsIHVzZXIpLnRoZW4obmV3VXNlciA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlcihuZXdVc2VyKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXJuYW1lIGNoZWNrUmVnaXN0ZXI6IFwiLCBjdXJyZW50VXNlcilcbiAgICAgICAgICAvL1RPRE86dGhlIGZ1bmN0aW9uIGJlbG93IG5lZWRzIHRvIGJlIHRoZSBjYWxsIHRvIGxvYWQgbWlzc2lvbiBjb250cm9sIHBhZ2UuXG4gICAgICAgICAgLy8gUmlnaHQgbm93IGl0IGlzIGp1c3Qgc2VuZGluZyB0byBhIGZ1bmN0aW9uIHRvIGNvbnNvbGUubG9nIHVzZXJcbiAgICAgICAgICB0aGlzLmxvYWRNaXNzaW9uKGN1cnJlbnRVc2VyKTtcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYWxlcnQoYFVzZXJuYW1lLCAke2RhdGFbMF0udXNlcm5hbWV9LCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuIFBsZWFzZSBjaG9vc2UgYW5vdGhlci5gKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLy9UT0RPOiB0aGlzIGZ1bmN0aW9uIGNhbiBnbyBhd2F5IHdoZW4gdGhlIGZ1bmN0aW9uIHRvIGxvYWQgbWlzc2lvbiBwYWdlIGlzIHJlcGxhY2VkIGluIGNoZWNrUmVnaXN0ZXIgZnVuY3Rpb24gYWJvdmVcbiAgbG9hZE1pc3Npb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckZ1bmNzIiwiLy8gc2NyaXB0cyByZWxhdGVkIHRvIHNlc3Npb25TdG9yYWdlXHJcblxyXG5jb25zdCBhY3RpdmVVc2VyID0ge1xyXG4gIGluZm8gKCkge1xyXG4gICAgbGV0IGxvZ2dlZEluVXNlciA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuY3VycmVudFVzZXIpO1xyXG4gICAgICByZXR1cm4gbG9nZ2VkSW5Vc2VyO1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZlVXNlcjsiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXG5pbXBvcnQgYWN0aXZlVXNlciBmcm9tIFwiLi9zZXNzaW9uU3RvcmFnZVwiXG5cblxuY29uc3QgYnVpbGRUYXNrcyA9IHtcblxuICAvL2Z1bmN0aW9uIHJ1biBmaXJzdCBpbiBvcmRlciB0byBjbGVhciBIVE1MLCBjcmVhdGUgcGFyZW50IGNvbnRhaW5lcnMsIHRoZW4gYWRkIG5ldyB0YXNrIGlucHV0IGFuZCBjYWxsIGZldGNoXG4gIGJ1aWxkQ29udGFpbmVycyAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7Y2xhc3NOYW1lOiBcInRpdGxlLS1pbmNvbXBsZXRlXCJ9LCBcIkluY29tcGxldGUgVGFza3NcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBuZXcgY29tcC5kaXYgKHtpZDogXCJpbmNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHtjbGFzc05hbWU6IFwidGl0bGUtLWNvbXBsZXRlXCJ9LCBcIkNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgbmV3IGNvbXAuZGl2ICh7aWQ6IFwiY29tcGxldGVcIn0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgdGhpcy5uZXdUYXNrKClcbiAgICB0aGlzLnRhc2tzRmV0Y2goKVxuICB9LFxuXG4gIC8vdXNlZCB0byBjcmVhdGUgYW5kIGFwcGVuZCBhbGwgdGFza3MgZnJvbSBkYXRhYmFzZSB0byBET01cbiAgcHJpbnRUYXNrcyAodGFza3NPYmopIHtcbiAgICBsZXQgb3V0cHV0Q29udGFpbmVyO1xuXG4gICAgaWYgKHRhc2tzT2JqLmNvbXBsZXRlKSB7XG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNjb21wbGV0ZVwiXG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dENvbnRhaW5lciA9IFwiI2luY29tcGxldGVcIlxuICAgIH1cblxuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwidGFza1wiLCBpZDogYCR7dGFza3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuY2hlY2tib3goKSxcbiAgICBuZXcgY29tcC5wYXIoe2NsYXNzTmFtZTogXCJlZGl0YWJsZS0tdGFza1wifSwgdGFza3NPYmoudGFzayksXG4gICAgbmV3IGNvbXAucGFyKHtjbGFzc05hbWU6IFwiZWRpdGFibGUtLWRhdGVcIn0sIHRhc2tzT2JqLmR1ZURhdGUpKS5yZW5kZXIob3V0cHV0Q29udGFpbmVyKVxuICB9LFxuXG4gIC8vZmV0Y2ggYWxsIHRhc2tzIGZyb20gZGF0YWJhc2UsIGNhbGwgY3JlYXRlL2FwcGVuZCBhbmQgY2FsbCBhZGQgbGlzdGVuZXJzXG4gIHRhc2tzRmV0Y2ggKCkgIHtcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJ0YXNrc1wiKSAvL2NoZWNrIGlmIHVzZXIgaXMgc2FtZSBhcyBzZXNzaW9uIHN0b3JhZ2VcbiAgICAudGhlbih0YXNrc09iaiA9PiAge1xuICAgICAgdGFza3NPYmouZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgIHRoaXMucHJpbnRUYXNrcyh0YXNrKX0pXG4gICAgICB0aGlzLmNiTGlzdGVuZXIoKVxuICAgICAgdGhpcy5wYXJMaXN0ZW5lcigpXG4gICAgfSlcbiAgfSxcblxuICAvL2NoZWNrYm94IGxpc3RlbmVyIHdpbGwgbW92ZSB0YXNrcyBiZXR3ZWVuIGNvbXBsZXRlIGFuZCBpbmNvbXBsZXRlIGNvbnRhaW5lcnNcbiAgLy9kYXRhYmFzZSBcImNvbXBsZXRlXCIgcHJvcGVydHkgd2lsbCBiZSBwYXRjaGVkIGFjY29yZGluZ2x5IGFuZCBET00gdXBkYXRlZFxuICBjYkxpc3RlbmVyICgpIHtcbiAgICBjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpXG5cbiAgICAvL2lmIHRoZSBpZCBvZiB0aGUgZ3JhbmRwYXJlbnQgY29udGFpbmVyIGlzICNjb21wbGV0ZSwgdGhlbiBjaGVjayB0aGUgYm94XG4gICAgY2hlY2tib3hlcy5mb3JFYWNoKCAoY2hlY2tib3gpID0+IHtcbiAgICAgIGlmIChjaGVja2JveC5wYXJlbnROb2RlLnBhcmVudE5vZGUuaWQgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICBsZXQgcGF0Y2hQcm9wZXJ0eTtcbiAgICAgICAgLy9pZiBmYWxzZSAtPiB0cnVlXG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgcGF0Y2hQcm9wZXJ0eSA9IHtjb21wbGV0ZTogdHJ1ZX1cbiAgICAgICAgICAvL3BhdGNoIFwiY29tcGxldGVcIiBwcm9wZXJ0eSBvZiBkYXRhYmFzZSBvYmplY3QgdXNpbmcgcGFyZW50Tm9kZSAoc2VjdGlvbikgSUQgdG8gVFJVRVxuICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gLCBwYXRjaFByb3BlcnR5KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvL2lmIGNoZWNrYm94IGlzIHVuY2hlY2tlZC4uLlxuICAgICAgICAgIHBhdGNoUHJvcGVydHkgPSB7Y29tcGxldGU6IGZhbHNlfVxuICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gLCBwYXRjaFByb3BlcnR5KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH0sXG5cbiAgLy9mdW5jdGlvbiB1c2VkIHRvIGVkaXQgdGFza3MgaW4gRE9NIGFuZCBwYXRjaCBuZXcgaW5mbyB0byBkYXRhYmFzZSB0YXNrIGRlc2NyaXB0aW9uIGFuZCBkYXRlXG4gIHBhckxpc3RlbmVyICgpIHtcbiAgICAvL2dldCBhbGwgc2VjdGlvbnMgb24gcGFnZVxuICAgIGxldCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWN0aW9uXCIpXG5cbiAgICAvLy9hZGQgY2xpY2sgbGlzdGVuZXIgdG8gYWxsIHNlY3Rpb25zXG4gICAgc2VjdGlvbnMuZm9yRWFjaChzZWN0aW9uID0+IHtcbiAgICAgIHNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIC8vZ2V0IGlkIG9mIHRhcmdldCBzZWN0aW9uXG4gICAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQucGFyZW50Tm9kZS5pZFxuXG4gICAgICAgIC8vaWYgcGFyYWdyYXBoIGNsaWNrZWQgaXMgdGFzayBkZXNjcmlwdGlvbiwgZ2V0IHRleHQgY29udGVudFxuICAgICAgICAvL2NyZWF0ZSBuZXcgPGlucHV0PiB0ZW1wbGF0ZSAod2l0aCAgSUQhKSBhbmQgcmVwbGFjZSA8cD4gd2l0aCA8aW5wdXQ+XG4gICAgICAgIC8vYWRkIGEga2V5ZG93biBsaXN0ZW5lciB0byB0aGUgaW5wdXQgYWZ0ZXIgaXQgaXMgaW4gRE9NIGFuZFxuICAgICAgICAvL3BhdGNoIHRoZSB0YXNrIGRlc2NyaXB0aW9uIHRvIGRhdGFiYXNlIHdoZW4gRU5URVIgaXMgcHJlc3NlZFxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGFibGUtLXRhc2tcIikpIHtcbiAgICAgICAgICBjb25zdCB0YXNrTmFtZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgbGV0IHRlbXBUYXNrSW5wdXQgPSBgPGlucHV0IGlkPVwidGVtcDFcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHt0YXNrTmFtZX1cIj5gXG4gICAgICAgICAgJChlLnRhcmdldCkucmVwbGFjZVdpdGgodGVtcFRhc2tJbnB1dClcbiAgICAgICAgICBjb25zdCB0ZW1wSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXAxXCIpO1xuICAgICAgICAgICAgdGVtcElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2hUYXNrID0ge3Rhc2s6IHRlbXBJbnB1dC52YWx1ZX1cbiAgICAgICAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGlkLCBwYXRjaFRhc2spXG4gICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAvL2lmIHBhcmFncmFwaCBjbGlja2VkIGlzIHRhc2sgZHVlIGRhdGUsIGdldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgLy9jcmVhdGUgbmV3IDxpbnB1dD4gdGVtcGxhdGUgKHdpdGggIElEISkgYW5kIHJlcGxhY2UgPHA+IHdpdGggPGlucHV0PlxuICAgICAgICAvL2FkZCBhIGNoYW5nZSBsaXN0ZW5lciB0byB0aGUgaW5wdXQgYWZ0ZXIgaXQgaXMgaW4gRE9NIGFuZFxuICAgICAgICAvL3BhdGNoIHRoZSB0YXNrIGR1ZSBkYXRlIHRvIGRhdGFiYXNlIHdoZW4gbmV3IGRhdGUgaXMgc2VsZWN0ZWRcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0YWJsZS0tZGF0ZVwiKSkge1xuICAgICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZS50YXJnZXQudGV4dENvbnRlbnRcbiAgICAgICAgICBsZXQgdGVtcFRhc2tEYXRlID0gYDxpbnB1dCBpZD1cInRlbXAyXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7dGFza0RhdGV9XCI+YFxuICAgICAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKHRlbXBUYXNrRGF0ZSlcbiAgICAgICAgICAgIGNvbnN0IHRlbXBEYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXAyXCIpO1xuICAgICAgICAgICAgdGVtcERhdGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2hEYXRlID0ge2R1ZURhdGU6IHRlbXBEYXRlSW5wdXQudmFsdWV9XG4gICAgICAgICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBpZCwgcGF0Y2hEYXRlKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9LFxuXG4gIC8vY3JlYXRlcyBuZXcgdGFzayBpbnB1dCBmaWVsZCB3aXRoIGFwcGVuZCBidXR0b24gaW5zaWRlIGZpcnN0IHNlY3Rpb24gb2YgSU5DT01QTEVURSBjb250YWluZXJcbiAgbmV3VGFzayAoKSB7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXctLXRhc2tcIn0sXG4gICAgbmV3IGNvbXAuYnRuIChcIitcIiksXG4gICAgbmV3IGNvbXAuaW5wdXQoe2lkOiBcImlucHV0LS10YXNrXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJ0eXBlIG5ldyB0YXNrIGhlcmVcIn0pLFxuICAgIG5ldyBjb21wLmlucHV0KHtpZDogXCJpbnB1dC0tZGF0ZVwiLCB0eXBlOiBcImRhdGVcIn0pKS5yZW5kZXIoXCIjaW5jb21wbGV0ZVwiKVxuXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKVxuICAgIGNvbnN0IGlucHV0X3Rhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LS10YXNrXCIpXG4gICAgY29uc3QgaW5wdXRfZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtLWRhdGVcIilcblxuICAgIC8vYnV0dG9uIGNsaWNrIHBvc3RzIG5ldyB0YXNrIHRvIGRhdGFiYXNlIGFuZCByZXNldHMgbmV3IHRhc2sgaW5wdXQgc3RyaW5nc1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChpbnB1dF90YXNrLnZhbHVlID09PSBcIlwiIHx8IGlucHV0X2RhdGUudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGFza0l0ZW0gPSB7XG4gICAgICAgICAgdGFzazogaW5wdXRfdGFzay52YWx1ZSxcbiAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgZHVlRGF0ZTogaW5wdXRfZGF0ZS52YWx1ZSxcbiAgICAgICAgICAvKlxuICAgICAgICAgIE5FRUQgVE8gVVBEQVRFIFVTRVIgSUQgVE8gU0FWRSBTRVNTSU9OIEFTU0lHTkVEIElEXG4gICAgICAgICAgKi9cbiAgICAgICAgICB1c2VySWQ6IGFjdGl2ZVVzZXIuaW5mbygpLmlkLFxuICAgICAgICB9XG4gICAgICAgIEFQSS5zYXZlSXRlbShcInRhc2tzXCIsIHRhc2tJdGVtKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMucHJpbnRUYXNrcyhkYXRhKVxuICAgICAgICAgIHRoaXMuY2JMaXN0ZW5lcigpXG4gICAgICAgICAgdGhpcy5wYXJMaXN0ZW5lcigpXG4gICAgICAgIH0pXG4gICAgICAgIGlucHV0X3Rhc2sudmFsdWUgPSBcIlwiXG4gICAgICAgIGlucHV0X2RhdGUudmFsdWUgPSBcIlwiXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBidWlsZFRhc2tzIl19
