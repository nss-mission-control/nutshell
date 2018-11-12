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
    return fetch(`${URL}${category}/${id}`).then(inputs => inputs.json());
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
    return fetch(`${URL}${category}/${id}`, {
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

var _apiData = _interopRequireDefault(require("./apiData"));

var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildEvents = {
  buildContainers() {
    // builds the two containers to hold everything
    document.querySelector(".container--inner").innerHTML = ""; // button for new event

    const newBtn = new _components.default.div({
      id: "newEventBtn"
    }, new _components.default.title("h3", "New Event!"), new _components.default.btn("+")).render(".container--inner"); // containers

    new _components.default.title("h1", {
      className: "title--upcoming"
    }, "Upcoming Event").render(".container--inner");
    new _components.default.div({
      id: "upcoming"
    }).render(".container--inner");
    new _components.default.title("h1", {
      className: "title--past"
    }, "Past Event").render(".container--inner");
    new _components.default.div({
      id: "past"
    }).render(".container--inner"); // this.newTask()

    this.newEventButton();
    this.eventFetch();
  },

  printEvents(eventObj) {
    // takes the objects from the api and prints them to the dom
    let outputContainer; // need to test if date is in the future or the past

    outputContainer = "#upcoming";
    const task = new _components.default.section({
      className: "event",
      id: `${eventObj.id}`
    }, new _components.default.title("h3", `${eventObj.name}`), new _components.default.par(`${eventObj.date} ${eventObj.time}`), new _components.default.par(`${eventObj.location}`), new _components.default.btn("Edit")).render(outputContainer);
  },

  eventFetch() {
    _apiData.default.getAllCategory(`events/?userId=${_sessionStorage.default.info().id}&_sort=date,time&_order=asc`) //check if user is same as session storage
    .then(eventObj => {
      eventObj.forEach(event => {
        this.printEvents(event);
      });
      buildEvents.editBtnListen();
    });
  },

  newEventButton() {
    // when clicked it clears the dom and calls the function to build the form
    $("#newEventBtn").click(function (e) {
      $(".container--inner").text("");
      buildEvents.newEventPopUp();
    });
  },

  newEventPopUp() {
    // Builds new event entry form
    let div2 = new _components.default.div({
      classList: "newEventForm"
    }, new _components.default.title("h1", {
      className: "title"
    }, "Add A New Event"), new _components.default.label("Event Name"), new _components.default.input({
      type: "text"
    }), new _components.default.label("Date"), new _components.default.input({
      type: "date"
    }), new _components.default.label("Time"), new _components.default.input({
      type: "time"
    }), new _components.default.label("Location"), new _components.default.input({
      type: "text"
    }), new _components.default.btn("Save"), new _components.default.btn("Back"));
    div2.render(".container--inner");
    buildEvents.newEventPopUpBtnClicks();
  },

  newEventPopUpBtnClicks() {
    // grabs the two buttons on the page and adds a click listener based on index
    const popUpBtns = document.querySelectorAll("button");
    popUpBtns[0].addEventListener("click", () => {
      // Save Button
      const inputArray = document.querySelectorAll("input"); // builds object to send to api

      const newEventObj = {
        name: inputArray[0].value,
        date: inputArray[1].value,
        time: inputArray[2].value,
        location: inputArray[3].value,
        userId: _sessionStorage.default.info().id // saves new event to API

      };

      _apiData.default.saveItem("events", newEventObj).then(() => {
        buildEvents.buildContainers();
      });
    }); // Back Button Returns to Event Page

    popUpBtns[1].addEventListener("click", () => {
      buildEvents.buildContainers();
    });
  },

  editBtnListen() {
    // listens for all the edit buttons on the page
    const allTheButtons = document.querySelectorAll("section > button");
    allTheButtons.forEach(currentBtn => {
      currentBtn.addEventListener("click", () => {
        // takes the id of the event that was clicks, fetches from the api with that id and passes on to the Edit Element form
        const currentBtnId = currentBtn.parentElement.id;

        _apiData.default.getOneFromCategory("events", currentBtnId).then(singleEvent => {
          $(".container--inner").text("");
          buildEvents.eventEditForm(singleEvent, currentBtnId);
        });
      });
    });
  },

  eventEditForm(singleEventObj) {
    // builds Edit form
    // takes the return from the fetch
    let div2 = new _components.default.div({
      classList: "newEventForm"
    }, new _components.default.title("h1", {
      className: "title"
    }, "Edit Your Event"), new _components.default.label("Event Name"), new _components.default.input({
      type: "text",
      value: `${singleEventObj.name}`
    }), new _components.default.label("Date"), new _components.default.input({
      type: "date",
      value: `${singleEventObj.date}`
    }), new _components.default.label("Time"), new _components.default.input({
      type: "time",
      value: `${singleEventObj.time}`
    }), new _components.default.label("Location"), new _components.default.input({
      type: "text",
      value: `${singleEventObj.location}`
    }), new _components.default.btn("Save"), new _components.default.btn("Back"));
    div2.render(".container--inner");
    buildEvents.editEventPopUpBtnClicks(singleEventObj.id);
  },

  editEventPopUpBtnClicks(id) {
    // grabs the two buttons on the page and adds a click listener based on index
    // takes the event id so it can be passed on with the PATCH
    const popUpBtns = document.querySelectorAll("button");
    popUpBtns[0].addEventListener("click", () => {
      // Save Button
      const inputArray = document.querySelectorAll("input"); // builds object to send to api

      const editEventObj = {
        name: inputArray[0].value,
        date: inputArray[1].value,
        time: inputArray[2].value,
        location: inputArray[3].value,
        userId: _sessionStorage.default.info().id // saves new event to API

      };

      _apiData.default.updateItem("events", id, editEventObj).then(() => {
        buildEvents.buildContainers();
      });
    }); // Back Button Returns to Event Page

    popUpBtns[1].addEventListener("click", () => {
      buildEvents.buildContainers();
    });
  }

};
var _default = buildEvents;
exports.default = _default;

},{"./apiData":2,"./components":3,"./sessionStorage":13}],5:[function(require,module,exports){
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
    }, "Welcome to Mission Control"), new _components.default.div({
      className: "WelcomeNav"
    }, new _components.default.title("h2", {
      className: "logInNav"
    }, "Log In"), new _components.default.title("h2", {
      className: "logInNav"
    }, "Register")), new _components.default.div({
      className: "LogIn"
    })).render(".container--inner");

    _login.default.loadLogIn();

    document.querySelectorAll(".logInNav").forEach(element => {
      element.addEventListener("click", e => {
        if (e.target.textContent === "Log In") {
          console.log("you have selected the log in form");

          _login.default.loadLogIn();
        } else if (e.target.textContent === "Register") {
          console.log("you have selected the register form");

          _register.default.loadRegister();
        }
      });
    });
  }

};
var _default = landingPageFuncs;
exports.default = _default;

},{"./components":3,"./login":6,"./register":12}],6:[function(require,module,exports){
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
    document.querySelector(".LogIn").innerHTML = "";
    new _components.default.label({}, "Username", new _components.default.input({
      name: "username",
      id: "username",
      placeholder: "username"
    })).render(".LogIn");
    new _components.default.label({
      for: "password"
    }, "Password", new _components.default.input({
      name: "password",
      id: "password",
      placeholder: "Password"
    })).render(".LogIn");
    new _components.default.btn("Login Now").render(".LogIn");
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

},{"./apiData":2,"./components":3,"./missionControl":9,"./register":12}],7:[function(require,module,exports){
"use strict";

var _landing = _interopRequireDefault(require("./landing"));

var _nav = _interopRequireDefault(require("./nav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nav.default.loadNavBar();

_landing.default.loadLandingPage();

},{"./landing":5,"./nav":10}],8:[function(require,module,exports){
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
      }, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`), new _components.default.title("h1", {}, messageObj.messageContent), new _components.default.btn("Edit")).render(".old--messages");
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
      }, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`), new _components.default.title("h1", {}, messageObj.messageContent)).render(".old--messages");
    }
  },

  messageMap() {
    document.querySelector(".container--inner").innerHTML = "";
    new _components.default.title("h1", {
      id: "messageName"
    }, "Messages").render(".container--inner");
    new _components.default.div({
      className: "old--messages"
    }).render(".container--inner");

    _apiData.default.getAllCategory("messages/?_expand=user").then(messageObj => {
      messageObj.forEach(message => {
        this.printMessages(message);
      });
      this.newMessage();
      this.submitMessage();
      this.editButtonClick();
    }).then(() => this.scrollWindowButtom());
  },

  // sets scroll window to bottom of old--messages container
  scrollWindowButtom() {
    let messageWindow = document.querySelector(".old--messages");
    messageWindow.scrollTop = messageWindow.scrollHeight;
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

},{"./apiData":2,"./components":3,"./sessionStorage":13}],9:[function(require,module,exports){
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

},{"./components":3,"./sessionStorage":13}],10:[function(require,module,exports){
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

var _events = _interopRequireDefault(require("./events"));

var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const navBar = {
  loadNavBar() {
    if (sessionStorage.getItem("currentUser") === null) {
      new _components.default.ul({}, new _components.default.li({}, "Home"), new _components.default.li({}, "Tasks"), new _components.default.li({}, "Events"), new _components.default.li({}, "Messages"), new _components.default.li({}, "News"), new _components.default.li({}, "Friends"), new _components.default.li({}, "Log Out")).render("#navBar");
    } else {
      new _components.default.ul({}, new _components.default.li({}, "Home"), new _components.default.li({}, "Tasks"), new _components.default.li({}, "Events"), new _components.default.li({}, "Messages"), new _components.default.li({}, "News"), new _components.default.li({}, "Friends"), new _components.default.image({
        src: `${_sessionStorage.default.info().profilePic}`,
        alt: "Profile Pic",
        className: "messagePic"
      })).render("#navBar");
    }

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
          _events.default.buildContainers();
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

},{"./components":3,"./events":4,"./login":6,"./messages":8,"./missionControl":9,"./news":11,"./sessionStorage":13,"./tasks":14}],11:[function(require,module,exports){
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
    })), new _components.default.title("h2", {}, `${newsObj.articleName}`), new _components.default.title("h4", {}, `Saved by: ${newsObj.user.firstName} | Date Saved: ${newsObj.dateSaved}`), new _components.default.par({}, newsObj.about), new _components.default.btn("Delete Article")).render(".container--inner");
  },

  newsMap() {
    document.querySelector(".container--inner").innerHTML = "";

    _apiData.default.getAllCategory(`articles/?userId=${_sessionStorage.default.info().id}&_expand=user&_sort=dateSaved&_order=desc`).then(newsObj => newsObj.forEach(news => {
      this.printNews(news);
    })).then(() => this.newNews()).then(() => this.eventListener());
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
  },

  eventListener() {
    document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", e => {
        if (e.target.textContent === "Save New Article") {
          let story = {
            articleName: document.querySelector("#articleName").value,
            url: document.querySelector("#articleLink").value,
            articleImage: document.querySelector("#articleImage").value,
            about: document.querySelector("#articleDescription").value,
            userId: _sessionStorage.default.info().id,
            dateSaved: new Date()
          };
          buildNews.addNews(story);
        } else if (e.target.textContent === "Delete Article") {
          let articleId = e.target.parentNode.id;

          _apiData.default.deleteItem("articles", articleId).then(() => buildNews.newsMap());
        }
      });
    });
  },

  addNews(story) {
    _apiData.default.saveItem("articles", story).then(() => this.newsMap());
  }

};
var _default = buildNews;
exports.default = _default;

},{"./apiData":2,"./components":3,"./sessionStorage":13}],12:[function(require,module,exports){
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
    document.querySelector(".LogIn").innerHTML = "";
    new _components.default.label({}, "First Name", new _components.default.input({
      name: "firstName",
      id: "firstName",
      placeholder: "First Name"
    })).render(".LogIn");
    new _components.default.label({}, "Last Name", new _components.default.input({
      name: "lastName",
      id: "lastName",
      placeholder: "Last Name"
    })).render(".LogIn");
    new _components.default.label({}, "Email", new _components.default.input({
      type: "email",
      id: "email",
      name: "email",
      placeholder: "email"
    })).render(".LogIn");
    new _components.default.label({}, "Username", new _components.default.input({
      name: "username",
      id: "username",
      placeholder: "username"
    })).render(".LogIn");
    new _components.default.label({
      for: "password"
    }, "Password", new _components.default.input({
      name: "password",
      id: "password",
      placeholder: "Password"
    })).render(".LogIn");
    new _components.default.label({
      for: "confirmPassword"
    }, "Confirm Password", new _components.default.input({
      name: "confirmPassword",
      id: "confirmPassword",
      placeholder: "Confirm Password"
    })).render(".LogIn");
    new _components.default.btn("Register Account").render(".LogIn");
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

},{"./apiData":2,"./components":3,"./login":6,"./missionControl":9}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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
    _apiData.default.getAllCategory(`tasks/?userId=${_sessionStorage.default.info().id}&_sort=dueDate&_order=asc`) //check if user is same as session storage
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

},{"./apiData":2,"./components":3,"./sessionStorage":13}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzLmpzIiwiLi4vc2NyaXB0cy9sYW5kaW5nLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMuanMiLCIuLi9zY3JpcHRzL21pc3Npb25Db250cm9sLmpzIiwiLi4vc2NyaXB0cy9uYXYuanMiLCIuLi9zY3JpcHRzL25ld3MuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL3NjcmlwdHMvdGFza3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEs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LFFBQUEsVUFBVSxDQUFDLEtBQVgsR0FBbUIsRUFBbkI7QUFDRDtBQUNGLEtBckJEO0FBc0JEOztBQXRKZ0IsQ0FBbkI7ZUF5SmUsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBlbGVtZW50U3ltYm9sID0gU3ltYm9sKClcblxuY2xhc3MgRE9NQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xuICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBJZiBgYXR0cmlidXRlc2AgaXMganVzdCBhIHN0cmluZywgaXQncyBhIHNpbXBsZSBlbGVtZW50IHdpdGggbm9cbiAgICAgICAgICAgIHByb3BlcnRpZXMgLSBqdXN0IHNvbWUgdGV4dCBjb250ZW50XG4gICAgICAgICovXG4gICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZXNcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0gPSBPYmplY3QuYXNzaWduKHRoaXNbZWxlbWVudFN5bWJvbF0sIGF0dHJpYnV0ZXMpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAvLyBPbmUgSFRNTEVsZW1lbnQgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5lbGVtZW50IGluc3RhbmNlb2Ygd2luZG93LkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS5hcHBlbmRDaGlsZChjaGlsZC5lbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuIGFycmF5IG9mIGVsZW1lbnRzIHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZWxlbWVudC5mb3JFYWNoKGMgPT4gdGhpc1tlbGVtZW50U3ltYm9sXS5hcHBlbmRDaGlsZChjKSlcblxuICAgICAgICAgICAgICAgICAgICAvLyBTdHJpbmcgdmFsdWUgd2FzIHBhc3NlZCBpbiwgc2V0IHRleHQgY29udGVudFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBjaGlsZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGdldCBlbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbZWxlbWVudFN5bWJvbF1cbiAgICB9XG5cbiAgICByZW5kZXIoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXNbZWxlbWVudFN5bWJvbF0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKS5hcHBlbmRDaGlsZChmcmFnbWVudClcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRE9NQ29tcG9uZW50XG4iLCJjb25zdCBVUkwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9cIlxuXG5jb25zdCBBUEkgPSB7XG4gIGdldEFsbENhdGVnb3J5KGNhdGVnb3J5KSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fWApXG4gICAgICAudGhlbihlbnRyaWVzID0+IGVudHJpZXMuanNvbigpKVxuICB9LFxuXG4gIGdldE9uZUZyb21DYXRlZ29yeShjYXRlZ29yeSwgaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9LyR7aWR9YClcbiAgICAgIC50aGVuKGlucHV0cyA9PiBpbnB1dHMuanNvbigpKVxuICB9LFxuXG4gIHNhdmVJdGVtKGNhdGVnb3J5LCBpdGVtKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICB9XG4gICAgKS50aGVuKGpzb25EYXRhID0+IGpzb25EYXRhLmpzb24oKSlcbiAgfSxcblxuICBkZWxldGVJdGVtKGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0vJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICB1cGRhdGVJdGVtKGNhdGVnb3J5LCBpZCwgaXRlbSl7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfVxuICAgIClcblxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgRE9NQ29tcG9uZW50IGZyb20gXCIuLi9saWIvbm9kZV9tb2R1bGVzL25zcy1kb21jb21wb25lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmNyZWF0ZShudWxsLCB7XHJcblxyXG4gIHVzZXI6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBVc2VyIHtcclxuICAgICAgY29uc3RydWN0b3IodGVtcEluZm8pIHtcclxuICAgICAgICB0aGlzLmlkID0gdGVtcEluZm8uaWQ7XHJcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB0ZW1wSW5mby5maXJzdE5hbWU7XHJcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9IHRlbXBJbmZvLmxhc3ROYW1lO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB0ZW1wSW5mby51c2VybmFtZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gdGVtcEluZm8ucGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5lbWFpbCA9IHRlbXBJbmZvLmVtYWlsO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZVBpYyA9IHRlbXBJbmZvLnByb2ZpbGVQaWM7XHJcbiAgICB9XHJcbiAgICAvL1RPRE86IHRoaXMgaXMganVzdCBhIHRlc3QgZnVuY3Rpb24uIHdlIHdvdWxkIGhhdmUgdGhlIGFiaWxpdHkgdG8gY2FsbCBmb3Igc2F2aW5nXHJcbiAgICAvLyBtZXNzYWdlcyxhcnRpY2xlcywgZXZlbnRzIGJlIHJlZmVyZW5jaW5nIGEgZnVuY3Rpb24gZGVmaW5lZCBoZXJlXHJcbiAgICAgIHRlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBXZWxjb21lICR7dGhpcy5maXJzdE5hbWV9ISBMZXQncyBzZWUgd2hhdCdzIGdvaW5nIG9uLmA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBkaXY6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBkaXYgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZGl2XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBidG46IHtcclxuICAgIHZhbHVlOiBjbGFzcyBidG4gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImJ0blwiLCB0eXBlOiBcImJ1dHRvblwiIH0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbnB1dDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGlucHV0IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZWN0aW9uOiB7XHJcbiAgICB2YWx1ZTogY2xhc3Mgc2VjdGlvbiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJzZWN0aW9uXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0aXRsZTogeyAvL2RlZmluZSBhbnkgdHlwZSBvZiBoIy4uIGgxLCBoMiwgZXRjLlxyXG4gICAgdmFsdWU6IGNsYXNzIHRpdGxlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGFuY2hvcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGFuY2hvciBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGVja2JveDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGNoZWNrYm94IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBjbGFzc05hbWU6IFwiY2JcIiB9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW1hZ2U6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBpbWFnZSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbWdcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgdWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwidWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxpOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGkgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGlcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHZhbHVlOiBjbGFzcyBmb3JtIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImZvcm1cIiwge30sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsYWJlbDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxhYmVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxhYmVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0ZXh0YXJlYToge1xyXG4gICAgdmFsdWU6IGNsYXNzIHRleHRhcmVhIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInRleHRhcmVhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBwYXI6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBwYXIgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwicFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSkiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcclxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxyXG5cclxuXHJcbmNvbnN0IGJ1aWxkRXZlbnRzID0ge1xyXG5cclxuICBidWlsZENvbnRhaW5lcnMoKSB7XHJcbiAgICAvLyBidWlsZHMgdGhlIHR3byBjb250YWluZXJzIHRvIGhvbGQgZXZlcnl0aGluZ1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIC8vIGJ1dHRvbiBmb3IgbmV3IGV2ZW50XHJcbiAgICBjb25zdCBuZXdCdG4gPSBuZXcgY29tcC5kaXYoeyBpZDogXCJuZXdFdmVudEJ0blwifSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoM1wiLCBcIk5ldyBFdmVudCFcIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIitcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcblxyXG4gICAgLy8gY29udGFpbmVyc1xyXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7XHJcbiAgICAgIGNsYXNzTmFtZTogXCJ0aXRsZS0tdXBjb21pbmdcIlxyXG4gICAgfSwgXCJVcGNvbWluZyBFdmVudFwiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbmV3IGNvbXAuZGl2KHtcclxuICAgICAgaWQ6IFwidXBjb21pbmdcIlxyXG4gICAgfSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge1xyXG4gICAgICBjbGFzc05hbWU6IFwidGl0bGUtLXBhc3RcIlxyXG4gICAgfSwgXCJQYXN0IEV2ZW50XCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBuZXcgY29tcC5kaXYoe1xyXG4gICAgICBpZDogXCJwYXN0XCJcclxuICAgIH0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICAvLyB0aGlzLm5ld1Rhc2soKVxyXG4gICAgdGhpcy5uZXdFdmVudEJ1dHRvbigpO1xyXG4gICAgdGhpcy5ldmVudEZldGNoKClcclxuICAgIH0sXHJcblxyXG4gIHByaW50RXZlbnRzKGV2ZW50T2JqKSB7XHJcbiAgICAvLyB0YWtlcyB0aGUgb2JqZWN0cyBmcm9tIHRoZSBhcGkgYW5kIHByaW50cyB0aGVtIHRvIHRoZSBkb21cclxuICAgIGxldCBvdXRwdXRDb250YWluZXI7XHJcblxyXG4gICAgLy8gbmVlZCB0byB0ZXN0IGlmIGRhdGUgaXMgaW4gdGhlIGZ1dHVyZSBvciB0aGUgcGFzdFxyXG5cclxuICAgIG91dHB1dENvbnRhaW5lciA9IFwiI3VwY29taW5nXCJcclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgY29tcC5zZWN0aW9uKHtcclxuICAgICAgICBjbGFzc05hbWU6IFwiZXZlbnRcIixcclxuICAgICAgICBpZDogYCR7ZXZlbnRPYmouaWR9YFxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgzXCIsIGAke2V2ZW50T2JqLm5hbWV9YCksXHJcbiAgICAgIG5ldyBjb21wLnBhcihgJHtldmVudE9iai5kYXRlfSAke2V2ZW50T2JqLnRpbWV9YCksXHJcbiAgICAgIG5ldyBjb21wLnBhcihgJHtldmVudE9iai5sb2NhdGlvbn1gKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiRWRpdFwiKSkucmVuZGVyKG91dHB1dENvbnRhaW5lcilcclxuICB9LFxyXG5cclxuICBldmVudEZldGNoKCkge1xyXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KGBldmVudHMvP3VzZXJJZD0ke2FjdGl2ZVVzZXIuaW5mbygpLmlkfSZfc29ydD1kYXRlLHRpbWUmX29yZGVyPWFzY2ApIC8vY2hlY2sgaWYgdXNlciBpcyBzYW1lIGFzIHNlc3Npb24gc3RvcmFnZVxyXG4gICAgICAudGhlbihldmVudE9iaiA9PiB7XHJcbiAgICAgICAgZXZlbnRPYmouZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByaW50RXZlbnRzKGV2ZW50KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgYnVpbGRFdmVudHMuZWRpdEJ0bkxpc3RlbigpXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgbmV3RXZlbnRCdXR0b24oKSB7XHJcbiAgICAvLyB3aGVuIGNsaWNrZWQgaXQgY2xlYXJzIHRoZSBkb20gYW5kIGNhbGxzIHRoZSBmdW5jdGlvbiB0byBidWlsZCB0aGUgZm9ybVxyXG4gICAgJChcIiNuZXdFdmVudEJ0blwiKS5jbGljayhcclxuICAgICAgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkKFwiLmNvbnRhaW5lci0taW5uZXJcIikudGV4dChcIlwiKVxyXG4gICAgICAgIGJ1aWxkRXZlbnRzLm5ld0V2ZW50UG9wVXAoKTtcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH0sXHJcblxyXG4gIG5ld0V2ZW50UG9wVXAoKSB7XHJcbiAgICAvLyBCdWlsZHMgbmV3IGV2ZW50IGVudHJ5IGZvcm1cclxuICAgIGxldCBkaXYyID0gbmV3IGNvbXAuZGl2KHtcclxuICAgICAgICBjbGFzc0xpc3Q6IFwibmV3RXZlbnRGb3JtXCJcclxuICAgICAgfSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJ0aXRsZVwifSwgXCJBZGQgQSBOZXcgRXZlbnRcIiksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiRXZlbnQgTmFtZVwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcInRleHRcIn0pLFxyXG4gICAgICBuZXcgY29tcC5sYWJlbChcIkRhdGVcIiksXHJcbiAgICAgIG5ldyBjb21wLmlucHV0KHt0eXBlOiBcImRhdGVcIn0pLFxyXG4gICAgICBuZXcgY29tcC5sYWJlbChcIlRpbWVcIiksXHJcbiAgICAgIG5ldyBjb21wLmlucHV0KHt0eXBlOiBcInRpbWVcIn0pLFxyXG4gICAgICBuZXcgY29tcC5sYWJlbChcIkxvY2F0aW9uXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwidGV4dFwifSksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIlNhdmVcIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkJhY2tcIikpXHJcbiAgICBkaXYyLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBidWlsZEV2ZW50cy5uZXdFdmVudFBvcFVwQnRuQ2xpY2tzKCk7XHJcbiAgfSxcclxuXHJcbiAgbmV3RXZlbnRQb3BVcEJ0bkNsaWNrcygpIHtcclxuICAgIC8vIGdyYWJzIHRoZSB0d28gYnV0dG9ucyBvbiB0aGUgcGFnZSBhbmQgYWRkcyBhIGNsaWNrIGxpc3RlbmVyIGJhc2VkIG9uIGluZGV4XHJcbiAgICBjb25zdCBwb3BVcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpO1xyXG4gICAgcG9wVXBCdG5zWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIC8vIFNhdmUgQnV0dG9uXHJcbiAgICAgIGNvbnN0IGlucHV0QXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XHJcbiAgICAgIC8vIGJ1aWxkcyBvYmplY3QgdG8gc2VuZCB0byBhcGlcclxuICAgICAgY29uc3QgbmV3RXZlbnRPYmogPSB7XHJcbiAgICAgICAgbmFtZTogaW5wdXRBcnJheVswXS52YWx1ZSxcclxuICAgICAgICBkYXRlOiBpbnB1dEFycmF5WzFdLnZhbHVlLFxyXG4gICAgICAgIHRpbWU6IGlucHV0QXJyYXlbMl0udmFsdWUsXHJcbiAgICAgICAgbG9jYXRpb246IGlucHV0QXJyYXlbM10udmFsdWUsXHJcbiAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZFxyXG4gICAgICB9XHJcbiAgICAgIC8vIHNhdmVzIG5ldyBldmVudCB0byBBUElcclxuICAgICAgQVBJLnNhdmVJdGVtKFwiZXZlbnRzXCIsIG5ld0V2ZW50T2JqKS50aGVuKCgpID0+IHtcclxuICAgICAgYnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKCk7XHJcbiAgICAgfSkgfSlcclxuXHJcbiAgICAvLyBCYWNrIEJ1dHRvbiBSZXR1cm5zIHRvIEV2ZW50IFBhZ2VcclxuICAgIHBvcFVwQnRuc1sxXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTtcclxuICAgIH0pXHJcbiAgfSxcclxuICBlZGl0QnRuTGlzdGVuICgpIHtcclxuICAgIC8vIGxpc3RlbnMgZm9yIGFsbCB0aGUgZWRpdCBidXR0b25zIG9uIHRoZSBwYWdlXHJcbiAgICBjb25zdCBhbGxUaGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlY3Rpb24gPiBidXR0b25cIik7XHJcbiAgICBhbGxUaGVCdXR0b25zLmZvckVhY2goY3VycmVudEJ0biA9PiB7XHJcbiAgICAgIGN1cnJlbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAvLyB0YWtlcyB0aGUgaWQgb2YgdGhlIGV2ZW50IHRoYXQgd2FzIGNsaWNrcywgZmV0Y2hlcyBmcm9tIHRoZSBhcGkgd2l0aCB0aGF0IGlkIGFuZCBwYXNzZXMgb24gdG8gdGhlIEVkaXQgRWxlbWVudCBmb3JtXHJcbiAgICAgICAgY29uc3QgY3VycmVudEJ0bklkID0gY3VycmVudEJ0bi5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIEFQSS5nZXRPbmVGcm9tQ2F0ZWdvcnkoXCJldmVudHNcIiwgY3VycmVudEJ0bklkKVxyXG4gICAgICAgICAgLnRoZW4oc2luZ2xlRXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAkKFwiLmNvbnRhaW5lci0taW5uZXJcIikudGV4dChcIlwiKVxyXG4gICAgICAgICAgICBidWlsZEV2ZW50cy5ldmVudEVkaXRGb3JtKHNpbmdsZUV2ZW50LCBjdXJyZW50QnRuSWQpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGV2ZW50RWRpdEZvcm0oc2luZ2xlRXZlbnRPYmopIHtcclxuICAgIC8vIGJ1aWxkcyBFZGl0IGZvcm1cclxuICAgIC8vIHRha2VzIHRoZSByZXR1cm4gZnJvbSB0aGUgZmV0Y2hcclxuICAgIGxldCBkaXYyID0gbmV3IGNvbXAuZGl2KHtcclxuICAgICAgY2xhc3NMaXN0OiBcIm5ld0V2ZW50Rm9ybVwiXHJcbiAgICB9LFxyXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJ0aXRsZVwifSwgXCJFZGl0IFlvdXIgRXZlbnRcIiksXHJcbiAgICBuZXcgY29tcC5sYWJlbChcIkV2ZW50IE5hbWVcIiksXHJcbiAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogYCR7c2luZ2xlRXZlbnRPYmoubmFtZX1gfSksXHJcbiAgICBuZXcgY29tcC5sYWJlbChcIkRhdGVcIiksXHJcbiAgICBuZXcgY29tcC5pbnB1dCh7dHlwZTogXCJkYXRlXCIsIHZhbHVlOiBgJHtzaW5nbGVFdmVudE9iai5kYXRlfWB9KSxcclxuICAgIG5ldyBjb21wLmxhYmVsKFwiVGltZVwiKSxcclxuICAgIG5ldyBjb21wLmlucHV0KHt0eXBlOiBcInRpbWVcIiwgdmFsdWU6IGAke3NpbmdsZUV2ZW50T2JqLnRpbWV9YH0pLFxyXG4gICAgbmV3IGNvbXAubGFiZWwoXCJMb2NhdGlvblwiKSxcclxuICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBgJHtzaW5nbGVFdmVudE9iai5sb2NhdGlvbn1gfSksXHJcbiAgICBuZXcgY29tcC5idG4oXCJTYXZlXCIpLFxyXG4gICAgbmV3IGNvbXAuYnRuKFwiQmFja1wiKSlcclxuICBkaXYyLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgYnVpbGRFdmVudHMuZWRpdEV2ZW50UG9wVXBCdG5DbGlja3Moc2luZ2xlRXZlbnRPYmouaWQpO1xyXG4gIH0sXHJcbiAgZWRpdEV2ZW50UG9wVXBCdG5DbGlja3MoaWQpIHtcclxuICAgIC8vIGdyYWJzIHRoZSB0d28gYnV0dG9ucyBvbiB0aGUgcGFnZSBhbmQgYWRkcyBhIGNsaWNrIGxpc3RlbmVyIGJhc2VkIG9uIGluZGV4XHJcbiAgICAvLyB0YWtlcyB0aGUgZXZlbnQgaWQgc28gaXQgY2FuIGJlIHBhc3NlZCBvbiB3aXRoIHRoZSBQQVRDSFxyXG4gICAgY29uc3QgcG9wVXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKTtcclxuICAgIHBvcFVwQnRuc1swXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAvLyBTYXZlIEJ1dHRvblxyXG4gICAgICBjb25zdCBpbnB1dEFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xyXG4gICAgICAvLyBidWlsZHMgb2JqZWN0IHRvIHNlbmQgdG8gYXBpXHJcbiAgICAgIGNvbnN0IGVkaXRFdmVudE9iaiA9IHtcclxuICAgICAgICBuYW1lOiBpbnB1dEFycmF5WzBdLnZhbHVlLFxyXG4gICAgICAgIGRhdGU6IGlucHV0QXJyYXlbMV0udmFsdWUsXHJcbiAgICAgICAgdGltZTogaW5wdXRBcnJheVsyXS52YWx1ZSxcclxuICAgICAgICBsb2NhdGlvbjogaW5wdXRBcnJheVszXS52YWx1ZSxcclxuICAgICAgICB1c2VySWQ6IGFjdGl2ZVVzZXIuaW5mbygpLmlkXHJcbiAgICAgIH1cclxuICAgICAgLy8gc2F2ZXMgbmV3IGV2ZW50IHRvIEFQSVxyXG4gICAgICBBUEkudXBkYXRlSXRlbShcImV2ZW50c1wiLCBpZCwgZWRpdEV2ZW50T2JqKS50aGVuKCgpID0+IHtcclxuICAgICAgYnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKCk7XHJcbiAgICAgfSkgfSlcclxuXHJcbiAgICAvLyBCYWNrIEJ1dHRvbiBSZXR1cm5zIHRvIEV2ZW50IFBhZ2VcclxuICAgIHBvcFVwQnRuc1sxXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTtcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkRXZlbnRzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBsb2dJbkZ1bmNzIGZyb20gXCIuL2xvZ2luXCJcclxuaW1wb3J0IHJlZ2lzdGVyRnVuY3MgZnJvbSBcIi4vcmVnaXN0ZXJcIlxyXG5cclxuY29uc3QgbGFuZGluZ1BhZ2VGdW5jcyA9IHtcclxuICBsb2FkTGFuZGluZ1BhZ2UoKSB7XHJcbiAgICBuZXcgY29tcC5kaXYoXHJcbiAgICAgIHsgY2xhc3NMaXN0OiBcIndlbGNvbWVcIiB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCIgfSwgXCJXZWxjb21lIHRvIE1pc3Npb24gQ29udHJvbFwiKSxcclxuICAgICAgbmV3IGNvbXAuZGl2KHtjbGFzc05hbWU6IFwiV2VsY29tZU5hdlwifSxcclxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHtjbGFzc05hbWU6IFwibG9nSW5OYXZcIn0sIFwiTG9nIEluXCIpLFxyXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge2NsYXNzTmFtZTogXCJsb2dJbk5hdlwifSwgXCJSZWdpc3RlclwiKSksXHJcbiAgICAgIG5ldyBjb21wLmRpdih7Y2xhc3NOYW1lOiBcIkxvZ0luXCJ9KSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuXHJcbiAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxvZ0luTmF2XCIpLmZvckVhY2goKGVsZW1lbnQpPT57XHJcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSk9PntcclxuICAgICAgICAgICAgaWYoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9nIEluXCIpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGhhdmUgc2VsZWN0ZWQgdGhlIGxvZyBpbiBmb3JtXCIpXHJcbiAgICAgICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiUmVnaXN0ZXJcIil7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgaGF2ZSBzZWxlY3RlZCB0aGUgcmVnaXN0ZXIgZm9ybVwiKVxyXG4gICAgICAgICAgICAgIHJlZ2lzdGVyRnVuY3MubG9hZFJlZ2lzdGVyKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYW5kaW5nUGFnZUZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIjtcbmltcG9ydCBidWlsZE1pc3Npb25Db250cm9sIGZyb20gXCIuL21pc3Npb25Db250cm9sXCI7XG5cbmNvbnN0IGxvZ0luRnVuY3MgPSB7XG4gIGNoZWNrVXNlcih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBpZiAodXNlcm5hbWUgPT09IFwiXCIgfHwgcGFzc3dvcmQgPT09XCJcIikge1xuICAgICAgYWxlcnQoXCJZb3UgbXVzdCBlbnRlciBib3RoIHlvdXIgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHRvIGxvZyBpbi5cIilcbiAgICB9IGVsc2Uge1xuICAgICAgQVBJLmdldEFsbENhdGVnb3J5KGB1c2Vycy8/dXNlcm5hbWU9JHt1c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIG5vIHVzZXIgd2l0aCB0aGF0IHVzZXJuYW1lLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAocGFzc3dvcmQgPT09IGRhdGFbMF0ucGFzc3dvcmQpIHtcbiAgICAgICAgICBsZXQgY3VycmVudFVzZXIgPSBuZXcgY29tcC51c2VyIChkYXRhWzBdKTtcbiAgICAgICAgICByZXR1cm4gY3VycmVudFVzZXI7XG4gICAgICAgIH0gZWxzZSAoIGFsZXJ0KFwiWW91IGVudGVyZWQgdGhlIHdyb25nIHBhc3N3b3JkLiBUcnkgYWdhaW4uXCIpKVxuICAgICAgfSkudGhlbihjdXJyZW50VXNlciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRVc2VyKVxuICAgICAgICBpZiAoY3VycmVudFVzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnVpbGQgTWlzc2lvbiBMb2dpblwiKVxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VXNlcikpO1xuICAgICAgICAgIGJ1aWxkTWlzc2lvbkNvbnRyb2wucHJpbnRQbGFjZWhvbGRlcigpO1xuICAgICAgICB9XG5cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBsb2FkTG9nSW4oKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5Mb2dJblwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJVc2VybmFtZVwiLCBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwidXNlcm5hbWVcIiwgaWQ6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIiB9KSkucmVuZGVyKFwiLkxvZ0luXCIpXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJwYXNzd29yZFwiIH0sIFwiUGFzc3dvcmRcIiwgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInBhc3N3b3JkXCIsIGlkOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCIgfSkpLnJlbmRlcihcIi5Mb2dJblwiKVxuICAgICAgbmV3IGNvbXAuYnRuKFwiTG9naW4gTm93XCIpLnJlbmRlcihcIi5Mb2dJblwiKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJMb2dpbiBOb3dcIikge1xuICAgICAgICAgIHRoaXMuY2hlY2tVc2VyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGxvZ0luRnVuY3MiLCJpbXBvcnQgbGFuZGluZ1BhZ2VGdW5jcyBmcm9tIFwiLi9sYW5kaW5nXCJcclxuaW1wb3J0IG5hdkJhciBmcm9tIFwiLi9uYXZcIlxyXG5cclxubmF2QmFyLmxvYWROYXZCYXIoKTtcclxubGFuZGluZ1BhZ2VGdW5jcy5sb2FkTGFuZGluZ1BhZ2UoKTtcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkTWVzc2FnZXMgPSB7XG4gIHByaW50TWVzc2FnZXMobWVzc2FnZU9iaikge1xuICAgIGlmIChhY3RpdmVVc2VyLmluZm8oKS5pZCA9PT0gbWVzc2FnZU9iai51c2VyLmlkKSB7XG4gICAgICBuZXcgY29tcC5zZWN0aW9uKHtcbiAgICAgICAgICBjbGFzc05hbWU6IFwibWVzc2FnZVwiLFxuICAgICAgICAgIGlkOiBgJHttZXNzYWdlT2JqLmlkfWBcbiAgICAgICAgfSxcbiAgICAgICAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bWVzc2FnZU9iai51c2VyLnByb2ZpbGVQaWN9YCwgY2xhc3NOYW1lOiBcIm1lc3NhZ2VQaWNcIiwgYWx0OiBcIlByb2ZpbGUgUGljXCJ9KSxcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7Y2xhc3NOYW1lOiBcIm1lc3NhZ2VBdXRob3JcIn0sIGAke21lc3NhZ2VPYmoudXNlci5maXJzdE5hbWV9IC0gJHttZXNzYWdlT2JqLmRhdGV9ICR7bWVzc2FnZU9iai50aW1lU3RhbXB9YCksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG1lc3NhZ2VPYmoubWVzc2FnZUNvbnRlbnQpLFxuICAgICAgICBuZXcgY29tcC5idG4oXCJFZGl0XCIpKS5yZW5kZXIoXCIub2xkLS1tZXNzYWdlc1wiKVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgY29tcC5zZWN0aW9uKHtcbiAgICAgICAgICBjbGFzc05hbWU6IFwibWVzc2FnZVwiLFxuICAgICAgICAgIGlkOiBgJHttZXNzYWdlT2JqLmlkfWBcbiAgICAgICAgfSxcbiAgICAgICAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bWVzc2FnZU9iai51c2VyLnByb2ZpbGVQaWN9YCwgYWx0OiBcIlByb2ZpbGUgUGljXCIsIGNsYXNzTmFtZTogXCJtZXNzYWdlUGljXCJ9KSxcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7Y2xhc3NOYW1lOlwibWVzc2FnZUF1dGhvclwifSwgYCR7bWVzc2FnZU9iai51c2VyLmZpcnN0TmFtZX0gLSAke21lc3NhZ2VPYmouZGF0ZX0gJHttZXNzYWdlT2JqLnRpbWVTdGFtcH1gKSxcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCkpLnJlbmRlcihcIi5vbGQtLW1lc3NhZ2VzXCIpXG4gICAgfVxuICB9LFxuXG4gIG1lc3NhZ2VNYXAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7aWQ6IFwibWVzc2FnZU5hbWVcIn0sIFwiTWVzc2FnZXNcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIik7XG4gICAgbmV3IGNvbXAuZGl2KHtjbGFzc05hbWU6IFwib2xkLS1tZXNzYWdlc1wifSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIik7XG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwibWVzc2FnZXMvP19leHBhbmQ9dXNlclwiKVxuICAgICAgLnRoZW4obWVzc2FnZU9iaiA9PiB7XG5cbiAgICAgICAgbWVzc2FnZU9iai5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgIHRoaXMucHJpbnRNZXNzYWdlcyhtZXNzYWdlKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm5ld01lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5zdWJtaXRNZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuZWRpdEJ1dHRvbkNsaWNrKCk7XG4gICAgICB9KS50aGVuKCgpID0+IHRoaXMuc2Nyb2xsV2luZG93QnV0dG9tKCkpO1xuICB9LFxuXG4gIC8vIHNldHMgc2Nyb2xsIHdpbmRvdyB0byBib3R0b20gb2Ygb2xkLS1tZXNzYWdlcyBjb250YWluZXJcbiAgc2Nyb2xsV2luZG93QnV0dG9tKCkge1xuICAgIGxldCBtZXNzYWdlV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vbGQtLW1lc3NhZ2VzXCIpO1xuICAgIG1lc3NhZ2VXaW5kb3cuc2Nyb2xsVG9wID0gbWVzc2FnZVdpbmRvdy5zY3JvbGxIZWlnaHQ7XG4gIH0sXG5cblxuICAvLyBidWlsZHMgbmV3IG1lc3NhZ2UgZW50cnkgZmllbGRcbiAgbmV3TWVzc2FnZSgpIHtcbiAgICAvL3dyYXBwZWQgdGhpcyBpbiBhIGRpdiBpbnN0ZWFkIG9mIGEgc2VjdGlvbiwgdG8gZ3JhYiBzZWN0aW9ucyBlYXNpZXIuXG4gICAgbmV3IGNvbXAuZGl2KHtcbiAgICAgICAgY2xhc3NOYW1lOiBcIm5ldy0tbWVzc2FnZVwiLFxuICAgICAgICBpZDogXCJuZXdNZXNzYWdlXCJcbiAgICAgIH0sXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBcIk5ldyBNZXNzYWdlXCIpLFxuICAgICAgbmV3IGNvbXAudGV4dGFyZWEoe1xuICAgICAgICBwbGFjZWhvbGRlcjogXCJ0eXBlIHlvdXIgbWVzc2FnZSBoZXJlXCIsXG4gICAgICAgIHdyYXA6IFwiaGFyZFwiXG4gICAgICB9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlN1Ym1pdFwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgfSxcblxuXG4gIHN1Ym1pdE1lc3NhZ2UoKSB7XG4gICAgJChcIiNuZXdNZXNzYWdlID4gYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAvL2lmIHN0YXRtZW50IHRvIHByZXZlbnQgYmxhbmsgZW50cmllc1xuICAgICAgaWYgKCQoXCIjbmV3TWVzc2FnZSA+IHRleHRhcmVhXCIpLnZhbCgpID09PSBcIlwiKSB7XG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIHlvdXIgbWVzc2FnZVwiKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIC8vY3JlYXRlcyBvYmplY3Qgb2YgY3VycmVudCBtb21lbnRcbiAgICAgICAgbGV0IGRhdGVBbmRUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy9jb252ZXJ0cyBpdCBpbnRvIGEgc3RyaW5nIGFuZCB0aGVuIGFuIGFycmF5IHRvIGdyYWIgc3BlY2lmaWMgdmFsdWVzXG4gICAgICAgIGxldCBkYXRlQXJyYXkgPSBkYXRlQW5kVGltZS50b1N0cmluZygpLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgLy9nZXRNb250aCgpIG1ldGhvZCByZXR1cm5zIGEgbnVtYmVyIGJldHdlZW4gMC0xMS4gQWRkZWQgMSB0byBnZXQgY3VycmVudCBtb250aFxuICAgICAgICBsZXQgbW9udGggPSBkYXRlQW5kVGltZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgLy9idWlsZHMgb2JqZWN0IHRvIHBhc3MgaW50byBmZXRjaFxuICAgICAgICBsZXQgc3VibWl0TWVzc2FnZU9iaiA9IHtcbiAgICAgICAgICBtZXNzYWdlQ29udGVudDogJChcIiNuZXdNZXNzYWdlID4gdGV4dGFyZWFcIikudmFsKCksXG4gICAgICAgICAgdGltZVN0YW1wOiBkYXRlQXJyYXlbNF0sIC8vVE9ETzogbWFrZSBpdCBub24gbWlsaXRhcnkgdGltZVxuICAgICAgICAgIGRhdGU6IGAke21vbnRofS8ke2RhdGVBcnJheVsyXX0vJHtkYXRlQXJyYXlbM119YCxcbiAgICAgICAgICB1c2VySWQ6IGFjdGl2ZVVzZXIuaW5mbygpLmlkXG5cbiAgICAgICAgfVxuICAgICAgICAvLyBzZW5kIHRvIEFQSVxuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJtZXNzYWdlc1wiLCBzdWJtaXRNZXNzYWdlT2JqKVxuICAgICAgICAgIC50aGVuKCgpID0+IGJ1aWxkTWVzc2FnZXMubWVzc2FnZU1hcCgpKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgZWRpdEJ1dHRvbkNsaWNrKCkge1xuICAgIC8vIGdyYWJzIHRoZSBlZGl0IGJ1dHRvbnNcbiAgICAkKFwic2VjdGlvbiA+IGJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gc3RvcmVzIHRoZSBtZXNzYWdlIGluIGEgdmFyYWJsZVxuICAgICAgbGV0IG1lc3NhZ2VIMSA9IGUudGFyZ2V0LnByZXZpb3VzU2libGluZ1xuICAgICAgLy8gc3RvcmUgbWVzc2FnZSdzIHRleHQgaW4gYSB2YXJhYmxlXG4gICAgICBsZXQgbWVzc2FnZVRleHQgPSBtZXNzYWdlSDEuaW5uZXJIVE1MO1xuICAgICAgLy8gcmVwbGFjZXMgRWRpdCBidXR0b24gd2l0aCBTYXZlIGJ1dHRvblxuICAgICAgJChlLnRhcmdldCkucmVwbGFjZVdpdGgoXCI8YnV0dG9uIGNsYXNzPSAnYnRuJyB0eXBlID0nYnV0dG9uJz5TYXZlPC9idXR0b24+XCIpXG4gICAgICAvLyByZXBsYWNlcyBtZXNzYWdlIHRleHQgd2l0aCBhbiBpbnB1dCBmaWVsZFxuICAgICAgJChtZXNzYWdlSDEpLnJlcGxhY2VXaXRoKGA8aW5wdXQgdHlwZT1cInRleHRcIiBpZCA9IFwiZWRpdEZpZWxkXCIgdmFsdWU9XCIke21lc3NhZ2VUZXh0fVwiPmApXG4gICAgICAvLyBzdG9yZXMgdGhlIG5ldyBpbnB1dCBmaWVsZCBpbiBhIHZhcmFibGVcbiAgICAgIGNvbnN0IG5ld0lucHV0RmllbGQgPSAkKFwiI2VkaXRGaWVsZFwiKTtcbiAgICAgIC8vIHNldHMgYSBjbGljayBldmVudCBvbiB0aGUgbmV3IHNhdmUgYnV0dG9uXG4gICAgICBuZXdJbnB1dEZpZWxkLm5leHQoKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyBzdG9yZXMgaW5wdXQgdmFsdWUgaW4gYW4gb2JqZWN0IHVwb24gc2F2ZSBjbGlja1xuICAgICAgICBjb25zdCBlZGl0ZWRNZXNzYWdlVGV4dE9iaiA9IHtcbiAgICAgICAgICBtZXNzYWdlQ29udGVudDogbmV3SW5wdXRGaWVsZC52YWwoKSxcbiAgICAgICAgfVxuICAgICAgICAvLyBzYXZlIG1lc3NhZ2UgaWQgI1xuICAgICAgICBjb25zdCBlZGl0ZWRNZXNzYWdlSWQgPSBuZXdJbnB1dEZpZWxkLnBhcmVudCgpLmF0dHIoXCJpZFwiKVxuICAgICAgICAvLyBQYXRjaCBtZXNzYWdlIGluIHNlcnZlciBhbmQgcmVmcmVzaCB0aGUgbWVzc2FnZXMgb24gdGhlIHBhZ2VcbiAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJtZXNzYWdlc1wiLCBlZGl0ZWRNZXNzYWdlSWQsIGVkaXRlZE1lc3NhZ2VUZXh0T2JqKVxuICAgICAgICAgIC50aGVuKCgpID0+IGJ1aWxkTWVzc2FnZXMubWVzc2FnZU1hcCgpKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTWVzc2FnZXMiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBhY3RpdmVVc2VyIGZyb20gXCIuL3Nlc3Npb25TdG9yYWdlXCJcblxuXG5cbmNvbnN0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgPSB7XG4gIHByaW50UGxhY2Vob2xkZXIgKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBudWxsO1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibWVzc2FnZVwiLCBpZDogYCR7YWN0aXZlVXNlci5pbmZvKCkuaWR9YH0sXG4gICAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7YWN0aXZlVXNlci5pbmZvKCkucHJvZmlsZVBpY31gLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIiwgc3R5bGU6XCJkaXNwbGF5OmlubGluZS1ibG9jazsgYm9yZGVyLXJhZGl1czogOHB4OyBtYXJnaW46IDRweFwiLCBoZWlnaHQ6IFwiMTI1XCIsIHdpZHRoOiBcIjEyNVwifSksXG4gICAgbmV3IGNvbXAudGl0bGUoIFwiaDJcIiwge3N0eWxlOlwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IGJvdHRvbTogMTBweFwifSwgYCR7YWN0aXZlVXNlci5pbmZvKCkuZmlyc3ROYW1lfSAtICR7YWN0aXZlVXNlci5pbmZvKCkubGFzdE5hbWV9ICR7YWN0aXZlVXNlci5pbmZvKCkudXNlcm5hbWV9YCksXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTWlzc2lvbkNvbnRyb2w7IiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiXG5pbXBvcnQgYnVpbGRNZXNzYWdlcyBmcm9tIFwiLi9tZXNzYWdlc1wiO1xuaW1wb3J0IGJ1aWxkTmV3cyBmcm9tIFwiLi9uZXdzXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuaW1wb3J0IGJ1aWxkVGFza3MgZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCBidWlsZEV2ZW50cyBmcm9tIFwiLi9ldmVudHNcIjtcbmltcG9ydCBhY3RpdmVVc2VyIGZyb20gXCIuL3Nlc3Npb25TdG9yYWdlXCI7XG5cblxuY29uc3QgbmF2QmFyID0ge1xuICBsb2FkTmF2QmFyKCkge1xuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgbmV3IGNvbXAudWwoXG4gICAgICAgIHt9LFxuICAgICAgICBuZXcgY29tcC5saSh7fSwgXCJIb21lXCIpLFxuICAgICAgICBuZXcgY29tcC5saSh7fSwgXCJUYXNrc1wiKSxcbiAgICAgICAgbmV3IGNvbXAubGkoe30sIFwiRXZlbnRzXCIpLFxuICAgICAgICBuZXcgY29tcC5saSh7fSwgXCJNZXNzYWdlc1wiKSxcbiAgICAgICAgbmV3IGNvbXAubGkoe30sIFwiTmV3c1wiKSxcbiAgICAgICAgbmV3IGNvbXAubGkoe30sIFwiRnJpZW5kc1wiKSxcbiAgICAgICAgbmV3IGNvbXAubGkoe30sIFwiTG9nIE91dFwiKVxuICAgICAgKS5yZW5kZXIoXCIjbmF2QmFyXCIpXG4gICAgfSBlbHNlIHtcbiAgICBuZXcgY29tcC51bChcbiAgICAgIHt9LFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiSG9tZVwiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIlRhc2tzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiRXZlbnRzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiTWVzc2FnZXNcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJOZXdzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiRnJpZW5kc1wiKSxcbiAgICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke2FjdGl2ZVVzZXIuaW5mbygpLnByb2ZpbGVQaWN9YCwgYWx0OiBcIlByb2ZpbGUgUGljXCIsIGNsYXNzTmFtZTogXCJtZXNzYWdlUGljXCJ9KVxuICAgICkucmVuZGVyKFwiI25hdkJhclwiKVxuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2QmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiSG9tZVwiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJUYXNrc1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZFRhc2tzLmJ1aWxkQ29udGFpbmVycygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkV2ZW50c1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIk1lc3NhZ2VzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJOZXdzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBidWlsZE5ld3MubmV3c01hcCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkZyaWVuZHNcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRnJpZW5kcyBmdW5jdGlvbiBjYWxsZXMuXCIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTG9nIE91dFwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9nIE91dCBmdW5jdGlvbiBjYWxsZWQuXCIpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmF2QmFyIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHt9LCBgJHtuZXdzT2JqLmFydGljbGVOYW1lfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDRcIiwge30sIGBTYXZlZCBieTogJHtuZXdzT2JqLnVzZXIuZmlyc3ROYW1lfSB8IERhdGUgU2F2ZWQ6ICR7bmV3c09iai5kYXRlU2F2ZWR9YCksXG4gICAgbmV3IGNvbXAucGFyKHt9LCBuZXdzT2JqLmFib3V0KSxcbiAgICBuZXcgY29tcC5idG4oXCJEZWxldGUgQXJ0aWNsZVwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgfSxcblxuICBuZXdzTWFwICgpICB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYGFydGljbGVzLz91c2VySWQ9JHthY3RpdmVVc2VyLmluZm8oKS5pZH0mX2V4cGFuZD11c2VyJl9zb3J0PWRhdGVTYXZlZCZfb3JkZXI9ZGVzY2ApXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICB0aGlzLnByaW50TmV3cyhuZXdzKX0pKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5uZXdOZXdzKCkpXG4gICAgICAudGhlbigoKT0+IHRoaXMuZXZlbnRMaXN0ZW5lcigpKVxuXG4gIH0sXG5cbiAgbmV3TmV3cyAoKSB7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXctLW5ld3NcIn0sXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge30sIFwiU2F2ZSBOZXdzIEFydGljbGVcIiksXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZU5hbWVcIn0sIFwiQXJ0aWNsZSBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZU5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBOYW1lXCIsIGlkOiBcImFydGljbGVOYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVVcmxcIn0sIFwiQXJ0aWNsZSBMaW5rXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZVVybFwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIExpbmtcIiwgaWQ6IFwiYXJ0aWNsZUxpbmtcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlSW1hZ2VVcmxcIn0sIFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZUltYWdlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgSW1hZ2UgTGlua1wiLCBpZDogXCJhcnRpY2xlSW1hZ2VcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlRGVzY3JpcHRpb25cIn0sIFwiQXJ0aWNsZSBEZXNjcmlwdGlvblwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVEZXNjcmlwdGlvblwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIsIGlkOiBcImFydGljbGVEZXNjcmlwdGlvblwifSksXG4gICAgICBuZXcgY29tcC5idG4oXCJTYXZlIE5ldyBBcnRpY2xlXCIpXG4gICAgKSxcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgZXZlbnRMaXN0ZW5lcigpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKT0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpPT57XG4gICAgICAgIGlmKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIlNhdmUgTmV3IEFydGljbGVcIil7XG4gICAgICAgICAgbGV0IHN0b3J5ID0ge1xuICAgICAgICAgICAgYXJ0aWNsZU5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZU5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICB1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUxpbmtcIikudmFsdWUsXG4gICAgICAgICAgICBhcnRpY2xlSW1hZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUltYWdlXCIpLnZhbHVlLFxuICAgICAgICAgICAgYWJvdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZURlc2NyaXB0aW9uXCIpLnZhbHVlLFxuICAgICAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZCxcbiAgICAgICAgICAgIGRhdGVTYXZlZDogbmV3IERhdGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBidWlsZE5ld3MuYWRkTmV3cyhzdG9yeSlcbiAgICAgICAgfSBlbHNlIGlmKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkRlbGV0ZSBBcnRpY2xlXCIpe1xuICAgICAgICAgIGxldCBhcnRpY2xlSWQgPSBlLnRhcmdldC5wYXJlbnROb2RlLmlkXG4gICAgICAgICAgQVBJLmRlbGV0ZUl0ZW0oXCJhcnRpY2xlc1wiLCBhcnRpY2xlSWQpLnRoZW4oKCk9PiBidWlsZE5ld3MubmV3c01hcCgpKVxuICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG5cblxuICBhZGROZXdzKHN0b3J5KXtcbiAgICBBUEkuc2F2ZUl0ZW0oXCJhcnRpY2xlc1wiLCBzdG9yeSkudGhlbigoKT0+IHRoaXMubmV3c01hcCgpKVxuICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE5ld3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5jb25zdCByZWdpc3RlckZ1bmNzID0ge1xuXG4gIGxvYWRSZWdpc3RlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLkxvZ0luXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkZpcnN0IE5hbWVcIiwgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImZpcnN0TmFtZVwiLCBpZDogXCJmaXJzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiRmlyc3QgTmFtZVwiIH0pKSAgIC5yZW5kZXIoXCIuTG9nSW5cIilcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkxhc3QgTmFtZVwiLCBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwibGFzdE5hbWVcIiwgaWQ6IFwibGFzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiTGFzdCBOYW1lXCIgfSkpLnJlbmRlcihcIi5Mb2dJblwiKVxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRW1haWxcIiwgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcImVtYWlsXCIsIGlkOiBcImVtYWlsXCIsIG5hbWU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiZW1haWxcIiB9KSkucmVuZGVyKFwiLkxvZ0luXCIpXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJVc2VybmFtZVwiLCBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwidXNlcm5hbWVcIiwgaWQ6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIiB9KSkucmVuZGVyKFwiLkxvZ0luXCIpXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJwYXNzd29yZFwiIH0sIFwiUGFzc3dvcmRcIiwgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInBhc3N3b3JkXCIsIGlkOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCIgfSkpLnJlbmRlcihcIi5Mb2dJblwiKVxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwiY29uZmlybVBhc3N3b3JkXCIgfSwgXCJDb25maXJtIFBhc3N3b3JkXCIsICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImNvbmZpcm1QYXNzd29yZFwiLCBpZDogXCJjb25maXJtUGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBQYXNzd29yZFwiIH0pKS5yZW5kZXIoXCIuTG9nSW5cIilcbiAgICAgIG5ldyBjb21wLmJ0bihcIlJlZ2lzdGVyIEFjY291bnRcIikucmVuZGVyKFwiLkxvZ0luXCIpXG5cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJSZWdpc3RlciBBY2NvdW50XCIpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdE5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0TmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1QYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBjaGVjayB0byBlbnN1cmUgYWxsIGZpZWxkcyBhcmUgY29tcGxldGUuXG4gICAgICAgICAgICBhbGVydChcIkFsbCBmaWVsZHMgbXVzdCBiZSBjb21wbGV0ZSB0byBjcmVhdGUgYW4gYWNjb3VudC5cIilcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUuaW5kZXhPZihcIkBcIikgPT09IC0xKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgYSBjaGVjayBvbiB0aGUgZW1haWwgZmllbGQgdG8gbWFrZSBzdXJlIHRoZXJlIGlzIGFuIEAgcHJlc2VudFxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUGFzc3dvcmRcIikudmFsdWUpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY2hlY2sgdG8gbWFrZSBzdXJlIHBhc3N3b3JkcyBhcmUgdGhlIHNhbWUuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGxldCB0ZW1wVXNlciA9IHtcbiAgICAgICAgICAgICAgZmlyc3ROYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpcnN0TmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgbGFzdE5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIGVtYWlsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlLFxuICAgICAgICAgICAgICB1c2VybmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUsXG4gICAgICAgICAgICAgIC8vVGhpcyBpcyBhIHBsYWNlaG9sZGVyIHRvIGEgc3RvY2sgXCJubyBpbWFnZSBhdmFpbGFibGVcIiBpbWFnZSB0aGF0IHdlIGNhbiB1c2UgbGF0ZXIgZm9yIGFjdHVhbCB1c2VyIGltYWdlc1xuICAgICAgICAgICAgICBwcm9maWxlUGljOiBcImh0dHBzOi8vaHloYS54eXovd3AtY29udGVudC90aGVtZXMvZmFzaGlvbi9pbWFnZXMvbm9faW1hZ2VfYXZhaWxhYmxlLmpwZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz9lbWFpbD0ke3RlbXBVc2VyLmVtYWlsfWApLnRoZW4odGhpc0RhdGEgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpc0RhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1JlZ2lzdGVyKHRlbXBVc2VyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlRoaXMgZW1haWwgaXMgYWxyZWFkeSByZWdpc3RlcmVkLlwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7IGFsZXJ0KFwiWW91ciBwYXNzd29yZHMgZGlkIG5vdCBtYXRjaC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIikgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIGNoZWNrUmVnaXN0ZXIodXNlcikge1xuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlci51c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIEFQSS5zYXZlSXRlbShcInVzZXJzXCIsIHVzZXIpLnRoZW4obmV3VXNlciA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlcihuZXdVc2VyKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXJuYW1lIGNoZWNrUmVnaXN0ZXI6IFwiLCBjdXJyZW50VXNlcilcbiAgICAgICAgICAvL1RPRE86dGhlIGZ1bmN0aW9uIGJlbG93IG5lZWRzIHRvIGJlIHRoZSBjYWxsIHRvIGxvYWQgbWlzc2lvbiBjb250cm9sIHBhZ2UuXG4gICAgICAgICAgLy8gUmlnaHQgbm93IGl0IGlzIGp1c3Qgc2VuZGluZyB0byBhIGZ1bmN0aW9uIHRvIGNvbnNvbGUubG9nIHVzZXJcbiAgICAgICAgICB0aGlzLmxvYWRNaXNzaW9uKGN1cnJlbnRVc2VyKTtcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYWxlcnQoYFVzZXJuYW1lLCAke2RhdGFbMF0udXNlcm5hbWV9LCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuIFBsZWFzZSBjaG9vc2UgYW5vdGhlci5gKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLy9UT0RPOiB0aGlzIGZ1bmN0aW9uIGNhbiBnbyBhd2F5IHdoZW4gdGhlIGZ1bmN0aW9uIHRvIGxvYWQgbWlzc2lvbiBwYWdlIGlzIHJlcGxhY2VkIGluIGNoZWNrUmVnaXN0ZXIgZnVuY3Rpb24gYWJvdmVcbiAgbG9hZE1pc3Npb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckZ1bmNzIiwiLy8gc2NyaXB0cyByZWxhdGVkIHRvIHNlc3Npb25TdG9yYWdlXHJcblxyXG5jb25zdCBhY3RpdmVVc2VyID0ge1xyXG4gIGluZm8gKCkge1xyXG4gICAgbGV0IGxvZ2dlZEluVXNlciA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuY3VycmVudFVzZXIpO1xyXG4gICAgICByZXR1cm4gbG9nZ2VkSW5Vc2VyO1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZlVXNlcjtcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkVGFza3MgPSB7XG5cbiAgLy9mdW5jdGlvbiBydW4gZmlyc3QgaW4gb3JkZXIgdG8gY2xlYXIgSFRNTCwgY3JlYXRlIHBhcmVudCBjb250YWluZXJzLCB0aGVuIGFkZCBuZXcgdGFzayBpbnB1dCBhbmQgY2FsbCBmZXRjaFxuICBidWlsZENvbnRhaW5lcnMgKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0taW5jb21wbGV0ZVwifSwgXCJJbmNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgbmV3IGNvbXAuZGl2ICh7aWQ6IFwiaW5jb21wbGV0ZVwifSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7Y2xhc3NOYW1lOiBcInRpdGxlLS1jb21wbGV0ZVwifSwgXCJDb21wbGV0ZSBUYXNrc1wiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIG5ldyBjb21wLmRpdiAoe2lkOiBcImNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIHRoaXMubmV3VGFzaygpXG4gICAgdGhpcy50YXNrc0ZldGNoKClcbiAgfSxcblxuICAvL3VzZWQgdG8gY3JlYXRlIGFuZCBhcHBlbmQgYWxsIHRhc2tzIGZyb20gZGF0YWJhc2UgdG8gRE9NXG4gIHByaW50VGFza3MgKHRhc2tzT2JqKSB7XG4gICAgbGV0IG91dHB1dENvbnRhaW5lcjtcblxuICAgIGlmICh0YXNrc09iai5jb21wbGV0ZSkge1xuICAgICAgb3V0cHV0Q29udGFpbmVyID0gXCIjY29tcGxldGVcIlxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNpbmNvbXBsZXRlXCJcbiAgICB9XG5cbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcInRhc2tcIiwgaWQ6IGAke3Rhc2tzT2JqLmlkfWB9LFxuICAgIG5ldyBjb21wLmNoZWNrYm94KCksXG4gICAgbmV3IGNvbXAucGFyKHtjbGFzc05hbWU6IFwiZWRpdGFibGUtLXRhc2tcIn0sIHRhc2tzT2JqLnRhc2spLFxuICAgIG5ldyBjb21wLnBhcih7Y2xhc3NOYW1lOiBcImVkaXRhYmxlLS1kYXRlXCJ9LCB0YXNrc09iai5kdWVEYXRlKSkucmVuZGVyKG91dHB1dENvbnRhaW5lcilcbiAgfSxcblxuICAvL2ZldGNoIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlLCBjYWxsIGNyZWF0ZS9hcHBlbmQgYW5kIGNhbGwgYWRkIGxpc3RlbmVyc1xuICB0YXNrc0ZldGNoICgpICB7XG4gICAgQVBJLmdldEFsbENhdGVnb3J5KGB0YXNrcy8/dXNlcklkPSR7YWN0aXZlVXNlci5pbmZvKCkuaWR9Jl9zb3J0PWR1ZURhdGUmX29yZGVyPWFzY2ApIC8vY2hlY2sgaWYgdXNlciBpcyBzYW1lIGFzIHNlc3Npb24gc3RvcmFnZVxuICAgIC50aGVuKHRhc2tzT2JqID0+ICB7XG4gICAgICB0YXNrc09iai5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgdGhpcy5wcmludFRhc2tzKHRhc2spfSlcbiAgICAgIHRoaXMuY2JMaXN0ZW5lcigpXG4gICAgICB0aGlzLnBhckxpc3RlbmVyKClcbiAgICB9KVxuICB9LFxuXG4gIC8vY2hlY2tib3ggbGlzdGVuZXIgd2lsbCBtb3ZlIHRhc2tzIGJldHdlZW4gY29tcGxldGUgYW5kIGluY29tcGxldGUgY29udGFpbmVyc1xuICAvL2RhdGFiYXNlIFwiY29tcGxldGVcIiBwcm9wZXJ0eSB3aWxsIGJlIHBhdGNoZWQgYWNjb3JkaW5nbHkgYW5kIERPTSB1cGRhdGVkXG4gIGNiTGlzdGVuZXIgKCkge1xuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIilcblxuICAgIC8vaWYgdGhlIGlkIG9mIHRoZSBncmFuZHBhcmVudCBjb250YWluZXIgaXMgI2NvbXBsZXRlLCB0aGVuIGNoZWNrIHRoZSBib3hcbiAgICBjaGVja2JveGVzLmZvckVhY2goIChjaGVja2JveCkgPT4ge1xuICAgICAgaWYgKGNoZWNrYm94LnBhcmVudE5vZGUucGFyZW50Tm9kZS5pZCA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICAgIGxldCBwYXRjaFByb3BlcnR5O1xuICAgICAgICAvL2lmIGZhbHNlIC0+IHRydWVcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICBwYXRjaFByb3BlcnR5ID0ge2NvbXBsZXRlOiB0cnVlfVxuICAgICAgICAgIC8vcGF0Y2ggXCJjb21wbGV0ZVwiIHByb3BlcnR5IG9mIGRhdGFiYXNlIG9iamVjdCB1c2luZyBwYXJlbnROb2RlIChzZWN0aW9uKSBJRCB0byBUUlVFXG4gICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWAsIHBhdGNoUHJvcGVydHkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vaWYgY2hlY2tib3ggaXMgdW5jaGVja2VkLi4uXG4gICAgICAgICAgcGF0Y2hQcm9wZXJ0eSA9IHtjb21wbGV0ZTogZmFsc2V9XG4gICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWAsIHBhdGNoUHJvcGVydHkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgfSxcblxuICAvL2Z1bmN0aW9uIHVzZWQgdG8gZWRpdCB0YXNrcyBpbiBET00gYW5kIHBhdGNoIG5ldyBpbmZvIHRvIGRhdGFiYXNlIHRhc2sgZGVzY3JpcHRpb24gYW5kIGRhdGVcbiAgcGFyTGlzdGVuZXIgKCkge1xuICAgIC8vZ2V0IGFsbCBzZWN0aW9ucyBvbiBwYWdlXG4gICAgbGV0IHNlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlY3Rpb25cIilcblxuICAgIC8vL2FkZCBjbGljayBsaXN0ZW5lciB0byBhbGwgc2VjdGlvbnNcbiAgICBzZWN0aW9ucy5mb3JFYWNoKHNlY3Rpb24gPT4ge1xuICAgICAgc2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgLy9nZXQgaWQgb2YgdGFyZ2V0IHNlY3Rpb25cbiAgICAgICAgY29uc3QgaWQgPSBlLnRhcmdldC5wYXJlbnROb2RlLmlkXG5cbiAgICAgICAgLy9pZiBwYXJhZ3JhcGggY2xpY2tlZCBpcyB0YXNrIGRlc2NyaXB0aW9uLCBnZXQgdGV4dCBjb250ZW50XG4gICAgICAgIC8vY3JlYXRlIG5ldyA8aW5wdXQ+IHRlbXBsYXRlICh3aXRoICBJRCEpIGFuZCByZXBsYWNlIDxwPiB3aXRoIDxpbnB1dD5cbiAgICAgICAgLy9hZGQgYSBrZXlkb3duIGxpc3RlbmVyIHRvIHRoZSBpbnB1dCBhZnRlciBpdCBpcyBpbiBET00gYW5kXG4gICAgICAgIC8vcGF0Y2ggdGhlIHRhc2sgZGVzY3JpcHRpb24gdG8gZGF0YWJhc2Ugd2hlbiBFTlRFUiBpcyBwcmVzc2VkXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0YWJsZS0tdGFza1wiKSkge1xuICAgICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZS50YXJnZXQudGV4dENvbnRlbnRcbiAgICAgICAgICBsZXQgdGVtcFRhc2tJbnB1dCA9IGA8aW5wdXQgaWQ9XCJ0ZW1wMVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke3Rhc2tOYW1lfVwiPmBcbiAgICAgICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aCh0ZW1wVGFza0lucHV0KVxuICAgICAgICAgIGNvbnN0IHRlbXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcDFcIik7XG4gICAgICAgICAgICB0ZW1wSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaFRhc2sgPSB7dGFzazogdGVtcElucHV0LnZhbHVlfVxuICAgICAgICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgaWQsIHBhdGNoVGFzaylcbiAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIC8vaWYgcGFyYWdyYXBoIGNsaWNrZWQgaXMgdGFzayBkdWUgZGF0ZSwgZ2V0IHRleHQgY29udGVudFxuICAgICAgICAvL2NyZWF0ZSBuZXcgPGlucHV0PiB0ZW1wbGF0ZSAod2l0aCAgSUQhKSBhbmQgcmVwbGFjZSA8cD4gd2l0aCA8aW5wdXQ+XG4gICAgICAgIC8vYWRkIGEgY2hhbmdlIGxpc3RlbmVyIHRvIHRoZSBpbnB1dCBhZnRlciBpdCBpcyBpbiBET00gYW5kXG4gICAgICAgIC8vcGF0Y2ggdGhlIHRhc2sgZHVlIGRhdGUgdG8gZGF0YWJhc2Ugd2hlbiBuZXcgZGF0ZSBpcyBzZWxlY3RlZFxuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRhYmxlLS1kYXRlXCIpKSB7XG4gICAgICAgICAgY29uc3QgdGFza0RhdGUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxuICAgICAgICAgIGxldCB0ZW1wVGFza0RhdGUgPSBgPGlucHV0IGlkPVwidGVtcDJcIiB0eXBlPVwiZGF0ZVwiIHZhbHVlPVwiJHt0YXNrRGF0ZX1cIj5gXG4gICAgICAgICAgJChlLnRhcmdldCkucmVwbGFjZVdpdGgodGVtcFRhc2tEYXRlKVxuICAgICAgICAgICAgY29uc3QgdGVtcERhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcDJcIik7XG4gICAgICAgICAgICB0ZW1wRGF0ZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaERhdGUgPSB7ZHVlRGF0ZTogdGVtcERhdGVJbnB1dC52YWx1ZX1cbiAgICAgICAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGlkLCBwYXRjaERhdGUpXG4gICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH0sXG5cbiAgLy9jcmVhdGVzIG5ldyB0YXNrIGlucHV0IGZpZWxkIHdpdGggYXBwZW5kIGJ1dHRvbiBpbnNpZGUgZmlyc3Qgc2VjdGlvbiBvZiBJTkNPTVBMRVRFIGNvbnRhaW5lclxuICBuZXdUYXNrICgpIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tdGFza1wifSxcbiAgICBuZXcgY29tcC5idG4gKFwiK1wiKSxcbiAgICBuZXcgY29tcC5pbnB1dCh7aWQ6IFwiaW5wdXQtLXRhc2tcIiwgdHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiBcInR5cGUgbmV3IHRhc2sgaGVyZVwifSksXG4gICAgbmV3IGNvbXAuaW5wdXQoe2lkOiBcImlucHV0LS1kYXRlXCIsIHR5cGU6IFwiZGF0ZVwifSkpLnJlbmRlcihcIiNpbmNvbXBsZXRlXCIpXG5cbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpXG4gICAgY29uc3QgaW5wdXRfdGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtLXRhc2tcIilcbiAgICBjb25zdCBpbnB1dF9kYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC0tZGF0ZVwiKVxuXG4gICAgLy9idXR0b24gY2xpY2sgcG9zdHMgbmV3IHRhc2sgdG8gZGF0YWJhc2UgYW5kIHJlc2V0cyBuZXcgdGFzayBpbnB1dCBzdHJpbmdzXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKGlucHV0X3Rhc2sudmFsdWUgPT09IFwiXCIgfHwgaW5wdXRfZGF0ZS52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0YXNrSXRlbSA9IHtcbiAgICAgICAgICB0YXNrOiBpbnB1dF90YXNrLnZhbHVlLFxuICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICBkdWVEYXRlOiBpbnB1dF9kYXRlLnZhbHVlLFxuICAgICAgICAgIC8qXG4gICAgICAgICAgTkVFRCBUTyBVUERBVEUgVVNFUiBJRCBUTyBTQVZFIFNFU1NJT04gQVNTSUdORUQgSURcbiAgICAgICAgICAqL1xuICAgICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWQsXG4gICAgICAgIH1cbiAgICAgICAgQVBJLnNhdmVJdGVtKFwidGFza3NcIiwgdGFza0l0ZW0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy5wcmludFRhc2tzKGRhdGEpXG4gICAgICAgICAgdGhpcy5jYkxpc3RlbmVyKClcbiAgICAgICAgICB0aGlzLnBhckxpc3RlbmVyKClcbiAgICAgICAgfSlcbiAgICAgICAgaW5wdXRfdGFzay52YWx1ZSA9IFwiXCJcbiAgICAgICAgaW5wdXRfZGF0ZS52YWx1ZSA9IFwiXCJcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkVGFza3MiXX0=
