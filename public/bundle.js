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
  },
  span: {
    value: class span extends _nssDomcomponent.default {
      constructor(attributes, ...children) {
        super("span", attributes, ...children);
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
    let outputContainer; // TODO:need to test if date is in the future or the past

    outputContainer = "#upcoming";
    const task = new _components.default.section({
      className: "event",
      id: `${eventObj.id}`
    }, new _components.default.div({}, new _components.default.title("h3", `${eventObj.name}`), new _components.default.par(`${eventObj.date} ${eventObj.time}`), new _components.default.par(`${eventObj.location}`)), new _components.default.btn("Edit")).render(outputContainer);
  },

  nextEvent() {
    console.log(document.getElementById("upcoming").firstChild);
    document.getElementById("upcoming").firstChild.classList.add("nextEvent");
  },

  eventFetch() {
    _apiData.default.getAllCategory(`events/?userId=${_sessionStorage.default.info().id}&_sort=date,time&_order=asc`) //check if user is same as session storage
    .then(eventObj => {
      eventObj.forEach(event => {
        this.printEvents(event);
      });
      buildEvents.nextEvent();
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

var _nav = _interopRequireDefault(require("./nav"));

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
          document.querySelector("#navBar").innerHTML = "";

          _nav.default.loadNavBar();

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

},{"./apiData":2,"./components":3,"./missionControl":9,"./nav":10,"./register":12}],7:[function(require,module,exports){
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

var _messages = _interopRequireDefault(require("./messages"));

var _news = _interopRequireDefault(require("./news"));

var _tasks = _interopRequireDefault(require("./tasks"));

var _events = _interopRequireDefault(require("./events"));

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
  },

  printPlanets() {
    document.querySelector(".container--inner").innerHTML = null; // make planets - each section is a planet

    new _components.default.section({
      className: "container--sub visible-1"
    }, new _components.default.div({
      className: "ring"
    }), new _components.default.div({
      className: "ring-2"
    }), new _components.default.span({
      className: "container--sub2",
      id: "planet-tasks"
    }, "Tasks")).render(".container--inner");
    new _components.default.section({
      className: "container--sub visible-3"
    }, new _components.default.div({
      className: "ufo"
    }), new _components.default.span({
      className: "container--sub2",
      id: "planet-messages"
    }, "Messages")).render(".container--inner");
    new _components.default.section({
      className: "container--sub visible-5"
    }, new _components.default.div({
      className: "ring"
    }), new _components.default.span({
      className: "container--sub2",
      id: "planet-friends"
    }, "Friends")).render(".container--inner");
    new _components.default.section({
      className: "container--sub visible-7"
    }, new _components.default.div({
      className: "ring"
    }), new _components.default.div({
      className: "ring-2"
    }), new _components.default.div({
      className: "ring-3"
    }), new _components.default.span({
      className: "container--sub2",
      id: "planet-events"
    }, "Events")).render(".container--inner");
    new _components.default.section({
      className: "container--sub visible-9"
    }, new _components.default.span({
      className: "container--sub2",
      id: "planet-news"
    }, "News")).render(".container--inner");
    new _components.default.section({
      className: "container--sub ghost-2"
    }).render(".container--inner");
    new _components.default.section({
      className: "container--sub ghost-4"
    }).render(".container--inner");
    new _components.default.section({
      className: "container--sub ghost-6"
    }).render(".container--inner");
    new _components.default.section({
      className: "container--sub ghost-8"
    }).render(".container--inner"); // assign click listeners

    this.clickPlanets();
  },

  // the small circle of each planet (which are spans) have an id associated with them. A click listener is assigned to each one
  clickPlanets() {
    document.getElementById("planet-tasks").addEventListener("click", () => {
      _tasks.default.buildContainers();
    });
    document.getElementById("planet-messages").addEventListener("click", () => {
      _messages.default.messageMap();
    });
    document.getElementById("planet-friends").addEventListener("click", () => {
      console.log("Friends function called.");
    });
    document.getElementById("planet-events").addEventListener("click", () => {
      _events.default.buildContainers();
    });
    document.getElementById("planet-news").addEventListener("click", () => {
      _news.default.newsMap();
    });
  }

};
var _default = buildMissionControl;
exports.default = _default;

},{"./components":3,"./events":4,"./messages":8,"./news":11,"./sessionStorage":13,"./tasks":14}],10:[function(require,module,exports){
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

var _landing = _interopRequireDefault(require("./landing"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const navBar = {
  loadNavBar() {
    if (sessionStorage.getItem("currentUser") === null) {
      new _components.default.ul({}, new _components.default.li({}, "Log In")).render("#navBar");
    } else {
      new _components.default.ul({}, new _components.default.li({}, "Home"), new _components.default.li({}, "Tasks"), new _components.default.li({}, "Events"), new _components.default.li({}, "Messages"), new _components.default.li({}, "News"), new _components.default.li({}, "Friends"), new _components.default.li({
        id: "logIn"
      }, new _components.default.image({
        id: "loginPic",
        src: `${_sessionStorage.default.info().profilePic}`,
        alt: "Profile Pic",
        className: "messagePic"
      }), new _components.default.section({
        id: "subNav"
      }, new _components.default.title("h3", {
        className: "subNavItem",
        id: "edit"
      }, "Edit Profile"), new _components.default.title("h3", {
        className: "subNavItem",
        id: "logOut"
      }, "Log Out")))).render("#navBar");
      $("#subNav").hide();
      $("#loginPic").click(function () {
        $("#subNav").toggle();
      });
      $("#logOut").click(function () {
        $("#navBar").html("");
        $(".container--inner").html("");
        sessionStorage.removeItem("currentUser");
        navBar.loadNavBar();

        _landing.default.loadLandingPage();
      });
    }

    document.querySelector("#navBar").addEventListener("click", event => {
      if (event.target.textContent === "Log In") {
        _login.default.loadLogIn();
      }

      if (event.target.textContent === "Home") {
        _missionControl.default.printPlaceholder();
      } else if (event.target.textContent === "Tasks") {
        _tasks.default.buildContainers();
      } else if (event.target.textContent === "Events") {
        _events.default.buildContainers();
      } else if (event.target.textContent === "Messages") {
        _messages.default.messageMap();
      } else if (event.target.textContent === "News") {
        _news.default.newsMap();
      } else if (event.target.textContent === "Friends") {
        console.log("Friends function calles.");
      }
    });
  }

};
var _default = navBar;
exports.default = _default;

},{"./components":3,"./events":4,"./landing":5,"./login":6,"./messages":8,"./missionControl":9,"./news":11,"./sessionStorage":13,"./tasks":14}],11:[function(require,module,exports){
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

var _nav = _interopRequireDefault(require("./nav"));

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
    document.querySelector("#navBar").innerHTML = "";

    _nav.default.loadNavBar();

    _missionControl.default.printPlaceholder();
  }

};
var _default = registerFuncs;
exports.default = _default;

},{"./apiData":2,"./components":3,"./login":6,"./missionControl":9,"./nav":10}],13:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzLmpzIiwiLi4vc2NyaXB0cy9sYW5kaW5nLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMuanMiLCIuLi9zY3JpcHRzL21pc3Npb25Db250cm9sLmpzIiwiLi4vc2NyaXB0cy9uYXYuanMiLCIuLi9zY3JpcHRzL25ld3MuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL3NjcmlwdHMvdGFza3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLEtBQUssSUFBSTtBQUN0QjtBQUNBLFlBQUksS0FBSyxDQUFDLE9BQU4sWUFBeUIsTUFBTSxDQUFDLE9BQXBDLEVBQTZDO0FBQ3pDLGVBQUssYUFBTCxFQUFvQixXQUFwQixDQUFnQyxLQUFLLENBQUMsT0FBdEMsRUFEeUMsQ0FHekM7QUFDSCxTQUpELE1BSU8sSUFBSSxLQUFLLENBQUMsT0FBTixDQUFjLEtBQUssQ0FBQyxPQUFwQixDQUFKLEVBQWtDO0FBQ3JDLFVBQUEsS0FBSyxDQUFDLE9BQU4sQ0FBYyxPQUFkLENBQXNCLENBQUMsSUFBSSxLQUFLLGFBQUwsRUFBb0IsV0FBcEIsQ0FBZ0MsQ0FBaEMsQ0FBM0IsRUFEcUMsQ0FHckM7QUFDSCxTQUpNLE1BSUE7QUFDSCxlQUFLLGFBQUwsRUFBb0IsV0FBcEIsR0FBa0MsS0FBbEM7QUFDSDtBQUNKLE9BYkQ7QUFjSDs7QUFFRCxXQUFPLElBQVA7QUFDSDs7QUFFRCxNQUFJLE9BQUosR0FBZTtBQUNYLFdBQU8sS0FBSyxhQUFMLENBQVA7QUFDSDs7QUFFRCxFQUFBLE1BQU0sQ0FBQyxTQUFELEVBQVk7QUFDZCxVQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsc0JBQVQsRUFBakI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLEtBQUssYUFBTCxDQUFyQjtBQUNBLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0MsV0FBbEMsQ0FBOEMsUUFBOUM7QUFDSDs7QUEzQ2M7O0FBOENuQixNQUFNLENBQUMsT0FBUCxHQUFpQixZQUFqQjs7Ozs7Ozs7O0FDbERBLE1BQU0sR0FBRyxHQUFHLHdCQUFaO0FBRUEsTUFBTSxHQUFHLEdBQUc7QUFDVixFQUFBLGNBQWMsQ0FBQyxRQUFELEVBQVc7QUFDdkIsV0FBTyxLQUFLLENBQUUsR0FBRSxHQUFJLEdBQUUsUUFBUyxFQUFuQixDQUFMLENBQ0osSUFESSxDQUNDLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBUixFQURaLENBQVA7QUFFRCxHQUpTOztBQU1WLEVBQUEsa0JBQWtCLENBQUMsUUFBRCxFQUFXLEVBQVgsRUFBZTtBQUMvQixXQUFPLEtBQUssQ0FBRSxHQUFFLEdBQUksR0FBRSxRQUFTLElBQUcsRUFBRyxFQUF6QixDQUFMLENBQ0osSUFESSxDQUNDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBUCxFQURYLENBQVA7QUFFRCxHQVRTOztBQVdWLEVBQUEsUUFBUSxDQUFDLFFBQUQsRUFBVyxJQUFYLEVBQWlCO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLEdBQUUsR0FBSSxHQUFFLFFBQVMsRUFBbkIsRUFBc0I7QUFDaEMsTUFBQSxNQUFNLEVBQUUsTUFEd0I7QUFFaEMsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVCxPQUZ1QjtBQUtoQyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLElBQWY7QUFMMEIsS0FBdEIsQ0FBTCxDQU9MLElBUEssQ0FPQSxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFQWixDQUFQO0FBUUQsR0FwQlM7O0FBc0JWLEVBQUEsVUFBVSxDQUFDLFFBQUQsRUFBVyxFQUFYLEVBQWU7QUFDdkIsV0FBTyxLQUFLLENBQUUsR0FBRSxHQUFJLEdBQUUsUUFBUyxJQUFHLEVBQUcsRUFBekIsRUFBNEI7QUFDdEMsTUFBQSxNQUFNLEVBQUUsUUFEOEI7QUFFdEMsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVDtBQUY2QixLQUE1QixDQUFaO0FBTUQsR0E3QlM7O0FBK0JWLEVBQUEsVUFBVSxDQUFDLFFBQUQsRUFBVyxFQUFYLEVBQWUsSUFBZixFQUFvQjtBQUM1QixXQUFPLEtBQUssQ0FBRSxHQUFFLEdBQUksR0FBRSxRQUFTLElBQUcsRUFBRyxFQUF6QixFQUE0QjtBQUN0QyxNQUFBLE1BQU0sRUFBRSxPQUQ4QjtBQUV0QyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRjZCO0FBS3RDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZjtBQUxnQyxLQUE1QixDQUFaO0FBU0Q7O0FBekNTLENBQVo7ZUE0Q2UsRzs7Ozs7Ozs7Ozs7QUM5Q2Y7Ozs7ZUFFZSxNQUFNLENBQUMsTUFBUCxDQUFjLElBQWQsRUFBb0I7QUFFakMsRUFBQSxJQUFJLEVBQUU7QUFDSixJQUFBLEtBQUssRUFBRSxNQUFNLElBQU4sQ0FBVztBQUNoQixNQUFBLFdBQVcsQ0FBQyxRQUFELEVBQVc7QUFDcEIsYUFBSyxFQUFMLEdBQVUsUUFBUSxDQUFDLEVBQW5CO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLFFBQVEsQ0FBQyxTQUExQjtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFRLENBQUMsUUFBekI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBUSxDQUFDLFFBQXpCO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLFFBQVEsQ0FBQyxRQUF6QjtBQUNBLGFBQUssS0FBTCxHQUFhLFFBQVEsQ0FBQyxLQUF0QjtBQUNBLGFBQUssVUFBTCxHQUFrQixRQUFRLENBQUMsVUFBM0I7QUFDSCxPQVRpQixDQVVsQjtBQUNBOzs7QUFDRSxNQUFBLElBQUksR0FBRztBQUNMLGVBQVEsV0FBVSxLQUFLLFNBQVUsOEJBQWpDO0FBQ0Q7O0FBZGU7QUFEZCxHQUYyQjtBQXFCakMsRUFBQSxHQUFHLEVBQUU7QUFDSCxJQUFBLEtBQUssRUFBRSxNQUFNLEdBQU4sU0FBa0Isd0JBQWxCLENBQStCO0FBQ3BDLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sS0FBTixFQUFhLFVBQWIsRUFBeUIsR0FBRyxRQUE1QjtBQUNEOztBQUhtQztBQURuQyxHQXJCNEI7QUE0QmpDLEVBQUEsR0FBRyxFQUFFO0FBQ0gsSUFBQSxLQUFLLEVBQUUsTUFBTSxHQUFOLFNBQWtCLHdCQUFsQixDQUErQjtBQUNwQyxNQUFBLFdBQVcsQ0FBQyxHQUFHLFFBQUosRUFBYztBQUN2QixjQUFNLFFBQU4sRUFBZ0I7QUFBRSxVQUFBLFNBQVMsRUFBRSxLQUFiO0FBQW9CLFVBQUEsSUFBSSxFQUFFO0FBQTFCLFNBQWhCLEVBQXNELEdBQUcsUUFBekQ7QUFDRDs7QUFIbUM7QUFEbkMsR0E1QjRCO0FBbUNqQyxFQUFBLEtBQUssRUFBRTtBQUNMLElBQUEsS0FBSyxFQUFFLE1BQU0sS0FBTixTQUFvQix3QkFBcEIsQ0FBaUM7QUFDdEMsTUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhLEdBQUcsUUFBaEIsRUFBMEI7QUFDbkMsY0FBTSxPQUFOLEVBQWUsVUFBZixFQUEyQixHQUFHLFFBQTlCO0FBQ0Q7O0FBSHFDO0FBRG5DLEdBbkMwQjtBQTBDakMsRUFBQSxPQUFPLEVBQUU7QUFDUCxJQUFBLEtBQUssRUFBRSxNQUFNLE9BQU4sU0FBc0Isd0JBQXRCLENBQW1DO0FBQ3hDLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sU0FBTixFQUFpQixVQUFqQixFQUE2QixHQUFHLFFBQWhDO0FBQ0Q7O0FBSHVDO0FBRG5DLEdBMUN3QjtBQWlEakMsRUFBQSxLQUFLLEVBQUU7QUFBRTtBQUNQLElBQUEsS0FBSyxFQUFFLE1BQU0sS0FBTixTQUFvQix3QkFBcEIsQ0FBaUM7QUFDdEMsTUFBQSxXQUFXLENBQUMsTUFBRCxFQUFTLFVBQVQsRUFBcUIsR0FBRyxRQUF4QixFQUFrQztBQUMzQyxjQUFNLE1BQU4sRUFBYyxVQUFkLEVBQTBCLEdBQUcsUUFBN0I7QUFDRDs7QUFIcUM7QUFEbkMsR0FqRDBCO0FBd0RqQyxFQUFBLE1BQU0sRUFBRTtBQUNOLElBQUEsS0FBSyxFQUFFLE1BQU0sTUFBTixTQUFxQix3QkFBckIsQ0FBa0M7QUFDdkMsTUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhLEdBQUcsUUFBaEIsRUFBMEI7QUFDbkMsY0FBTSxHQUFOLEVBQVcsVUFBWCxFQUF1QixHQUFHLFFBQTFCO0FBQ0Q7O0FBSHNDO0FBRG5DLEdBeER5QjtBQStEakMsRUFBQSxRQUFRLEVBQUU7QUFDUixJQUFBLEtBQUssRUFBRSxNQUFNLFFBQU4sU0FBdUIsd0JBQXZCLENBQW9DO0FBQ3pDLE1BQUEsV0FBVyxDQUFDLEdBQUcsUUFBSixFQUFjO0FBQ3ZCLGNBQU0sT0FBTixFQUFlO0FBQUUsVUFBQSxJQUFJLEVBQUUsVUFBUjtBQUFvQixVQUFBLFNBQVMsRUFBRTtBQUEvQixTQUFmLEVBQXNELEdBQUcsUUFBekQ7QUFDRDs7QUFId0M7QUFEbkMsR0EvRHVCO0FBc0VqQyxFQUFBLEtBQUssRUFBRTtBQUNMLElBQUEsS0FBSyxFQUFFLE1BQU0sS0FBTixTQUFvQix3QkFBcEIsQ0FBaUM7QUFDdEMsTUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhLEdBQUcsUUFBaEIsRUFBMEI7QUFDbkMsY0FBTSxLQUFOLEVBQWEsVUFBYixFQUF5QixHQUFHLFFBQTVCO0FBQ0Q7O0FBSHFDO0FBRG5DLEdBdEUwQjtBQTZFakMsRUFBQSxFQUFFLEVBQUU7QUFDRixJQUFBLEtBQUssRUFBRSxNQUFNLEVBQU4sU0FBaUIsd0JBQWpCLENBQThCO0FBQ25DLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sSUFBTixFQUFZLFVBQVosRUFBd0IsR0FBRyxRQUEzQjtBQUNEOztBQUhrQztBQURuQyxHQTdFNkI7QUFvRmpDLEVBQUEsRUFBRSxFQUFFO0FBQ0YsSUFBQSxLQUFLLEVBQUUsTUFBTSxFQUFOLFNBQWlCLHdCQUFqQixDQUE4QjtBQUNuQyxNQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWEsR0FBRyxRQUFoQixFQUEwQjtBQUNuQyxjQUFNLElBQU4sRUFBWSxVQUFaLEVBQXdCLEdBQUcsUUFBM0I7QUFDRDs7QUFIa0M7QUFEbkMsR0FwRjZCO0FBMkZqQyxFQUFBLElBQUksRUFBRTtBQUNKLElBQUEsS0FBSyxFQUFFLE1BQU0sSUFBTixTQUFtQix3QkFBbkIsQ0FBZ0M7QUFDckMsTUFBQSxXQUFXLENBQUMsR0FBRyxRQUFKLEVBQWM7QUFDdkIsY0FBTSxNQUFOLEVBQWMsRUFBZCxFQUFrQixHQUFHLFFBQXJCO0FBQ0Q7O0FBSG9DO0FBRG5DLEdBM0YyQjtBQWtHakMsRUFBQSxLQUFLLEVBQUU7QUFDTCxJQUFBLEtBQUssRUFBRSxNQUFNLEtBQU4sU0FBb0Isd0JBQXBCLENBQWlDO0FBQ3RDLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sT0FBTixFQUFlLFVBQWYsRUFBMkIsR0FBRyxRQUE5QjtBQUNEOztBQUhxQztBQURuQyxHQWxHMEI7QUF5R2pDLEVBQUEsUUFBUSxFQUFFO0FBQ1IsSUFBQSxLQUFLLEVBQUUsTUFBTSxRQUFOLFNBQXVCLHdCQUF2QixDQUFvQztBQUN6QyxNQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWEsR0FBRyxRQUFoQixFQUEwQjtBQUNuQyxjQUFNLFVBQU4sRUFBa0IsVUFBbEIsRUFBOEIsR0FBRyxRQUFqQztBQUNEOztBQUh3QztBQURuQyxHQXpHdUI7QUFnSGpDLEVBQUEsR0FBRyxFQUFFO0FBQ0gsSUFBQSxLQUFLLEVBQUUsTUFBTSxHQUFOLFNBQWtCLHdCQUFsQixDQUErQjtBQUNwQyxNQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWEsR0FBRyxRQUFoQixFQUEwQjtBQUNuQyxjQUFNLEdBQU4sRUFBVyxVQUFYLEVBQXVCLEdBQUcsUUFBMUI7QUFDRDs7QUFIbUM7QUFEbkMsR0FoSDRCO0FBdUhqQyxFQUFBLElBQUksRUFBRTtBQUNKLElBQUEsS0FBSyxFQUFFLE1BQU0sSUFBTixTQUFtQix3QkFBbkIsQ0FBZ0M7QUFDckMsTUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhLEdBQUcsUUFBaEIsRUFBMEI7QUFDbkMsY0FBTSxNQUFOLEVBQWMsVUFBZCxFQUEwQixHQUFHLFFBQTdCO0FBQ0Q7O0FBSG9DO0FBRG5DO0FBdkgyQixDQUFwQixDOzs7Ozs7Ozs7Ozs7QUNGZjs7QUFDQTs7QUFDQTs7OztBQUdBLE1BQU0sV0FBVyxHQUFHO0FBRWxCLEVBQUEsZUFBZSxHQUFHO0FBQ2hCO0FBQ0EsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsR0FBd0QsRUFBeEQsQ0FGZ0IsQ0FHaEI7O0FBQ0EsVUFBTSxNQUFNLEdBQUcsSUFBSSxvQkFBSyxHQUFULENBQWE7QUFBRSxNQUFBLEVBQUUsRUFBRTtBQUFOLEtBQWIsRUFDYixJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLFlBQXJCLENBRGEsRUFFYixJQUFJLG9CQUFLLEdBQVQsQ0FBYSxHQUFiLENBRmEsRUFFTSxNQUZOLENBRWEsbUJBRmIsQ0FBZixDQUpnQixDQVFoQjs7QUFDQSxRQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCO0FBQ25CLE1BQUEsU0FBUyxFQUFFO0FBRFEsS0FBckIsRUFFRyxnQkFGSCxFQUVxQixNQUZyQixDQUU0QixtQkFGNUI7QUFHQSxRQUFJLG9CQUFLLEdBQVQsQ0FBYTtBQUNYLE1BQUEsRUFBRSxFQUFFO0FBRE8sS0FBYixFQUVHLE1BRkgsQ0FFVSxtQkFGVjtBQUdBLFFBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUI7QUFDbkIsTUFBQSxTQUFTLEVBQUU7QUFEUSxLQUFyQixFQUVHLFlBRkgsRUFFaUIsTUFGakIsQ0FFd0IsbUJBRnhCO0FBR0EsUUFBSSxvQkFBSyxHQUFULENBQWE7QUFDWCxNQUFBLEVBQUUsRUFBRTtBQURPLEtBQWIsRUFFRyxNQUZILENBRVUsbUJBRlYsRUFsQmdCLENBcUJoQjs7QUFDQSxTQUFLLGNBQUw7QUFDQSxTQUFLLFVBQUw7QUFDQyxHQTFCZTs7QUE0QmxCLEVBQUEsV0FBVyxDQUFDLFFBQUQsRUFBVztBQUNwQjtBQUNBLFFBQUksZUFBSixDQUZvQixDQUlwQjs7QUFFQSxJQUFBLGVBQWUsR0FBRyxXQUFsQjtBQUNBLFVBQU0sSUFBSSxHQUFHLElBQUksb0JBQUssT0FBVCxDQUFpQjtBQUMxQixNQUFBLFNBQVMsRUFBRSxPQURlO0FBRTFCLE1BQUEsRUFBRSxFQUFHLEdBQUUsUUFBUSxDQUFDLEVBQUc7QUFGTyxLQUFqQixFQUlYLElBQUksb0JBQUssR0FBVCxDQUFlLEVBQWYsRUFDQSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXNCLEdBQUUsUUFBUSxDQUFDLElBQUssRUFBdEMsQ0FEQSxFQUVBLElBQUksb0JBQUssR0FBVCxDQUFjLEdBQUUsUUFBUSxDQUFDLElBQUssSUFBRyxRQUFRLENBQUMsSUFBSyxFQUEvQyxDQUZBLEVBR0EsSUFBSSxvQkFBSyxHQUFULENBQWMsR0FBRSxRQUFRLENBQUMsUUFBUyxFQUFsQyxDQUhBLENBSlcsRUFRWCxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxNQUFiLENBUlcsRUFRVyxNQVJYLENBUWtCLGVBUmxCLENBQWI7QUFTRCxHQTVDaUI7O0FBOENsQixFQUFBLFNBQVMsR0FBRztBQUNWLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxRQUFRLENBQUMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxVQUFoRDtBQUNBLElBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0MsVUFBcEMsQ0FBK0MsU0FBL0MsQ0FBeUQsR0FBekQsQ0FBNkQsV0FBN0Q7QUFDRCxHQWpEaUI7O0FBbURsQixFQUFBLFVBQVUsR0FBRztBQUNYLHFCQUFJLGNBQUosQ0FBb0Isa0JBQWlCLHdCQUFXLElBQVgsR0FBa0IsRUFBRyw2QkFBMUQsRUFBd0Y7QUFBeEYsS0FDRyxJQURILENBQ1EsUUFBUSxJQUFJO0FBQ2hCLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3hCLGFBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNELE9BRkQ7QUFHQSxNQUFBLFdBQVcsQ0FBQyxTQUFaO0FBQ0EsTUFBQSxXQUFXLENBQUMsYUFBWjtBQUNELEtBUEg7QUFRRCxHQTVEaUI7O0FBOERsQixFQUFBLGNBQWMsR0FBRztBQUNmO0FBQ0EsSUFBQSxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCLEtBQWxCLENBQ0UsVUFBVSxDQUFWLEVBQWE7QUFDWCxNQUFBLENBQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCLElBQXZCLENBQTRCLEVBQTVCO0FBQ0EsTUFBQSxXQUFXLENBQUMsYUFBWjtBQUNELEtBSkg7QUFNRCxHQXRFaUI7O0FBd0VsQixFQUFBLGFBQWEsR0FBRztBQUNkO0FBQ0EsUUFBSSxJQUFJLEdBQUcsSUFBSSxvQkFBSyxHQUFULENBQWE7QUFDcEIsTUFBQSxTQUFTLEVBQUU7QUFEUyxLQUFiLEVBR1QsSUFBSSxvQkFBSyxLQUFULENBQWUsSUFBZixFQUFxQjtBQUFFLE1BQUEsU0FBUyxFQUFFO0FBQWIsS0FBckIsRUFBNEMsaUJBQTVDLENBSFMsRUFJVCxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxZQUFmLENBSlMsRUFLVCxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFO0FBQVIsS0FBZixDQUxTLEVBTVQsSUFBSSxvQkFBSyxLQUFULENBQWUsTUFBZixDQU5TLEVBT1QsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLElBQUksRUFBRTtBQUFQLEtBQWYsQ0FQUyxFQVFULElBQUksb0JBQUssS0FBVCxDQUFlLE1BQWYsQ0FSUyxFQVNULElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxJQUFJLEVBQUU7QUFBUCxLQUFmLENBVFMsRUFVVCxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxVQUFmLENBVlMsRUFXVCxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFO0FBQVIsS0FBZixDQVhTLEVBWVQsSUFBSSxvQkFBSyxHQUFULENBQWEsTUFBYixDQVpTLEVBYVQsSUFBSSxvQkFBSyxHQUFULENBQWEsTUFBYixDQWJTLENBQVg7QUFjQSxJQUFBLElBQUksQ0FBQyxNQUFMLENBQVksbUJBQVo7QUFDQSxJQUFBLFdBQVcsQ0FBQyxzQkFBWjtBQUNELEdBMUZpQjs7QUE0RmxCLEVBQUEsc0JBQXNCLEdBQUc7QUFDdkI7QUFDQSxVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsUUFBMUIsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxNQUFNO0FBQzNDO0FBQ0EsWUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLENBQW5CLENBRjJDLENBRzNDOztBQUNBLFlBQU0sV0FBVyxHQUFHO0FBQ2xCLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQURGO0FBRWxCLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUZGO0FBR2xCLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUhGO0FBSWxCLFFBQUEsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUpOO0FBS2xCLFFBQUEsTUFBTSxFQUFFLHdCQUFXLElBQVgsR0FBa0IsRUFMUixDQU9wQjs7QUFQb0IsT0FBcEI7O0FBUUEsdUJBQUksUUFBSixDQUFhLFFBQWIsRUFBdUIsV0FBdkIsRUFBb0MsSUFBcEMsQ0FBeUMsTUFBTTtBQUMvQyxRQUFBLFdBQVcsQ0FBQyxlQUFaO0FBQ0EsT0FGQTtBQUVHLEtBZEwsRUFIdUIsQ0FtQnZCOztBQUNBLElBQUEsU0FBUyxDQUFDLENBQUQsQ0FBVCxDQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLE1BQU07QUFDM0MsTUFBQSxXQUFXLENBQUMsZUFBWjtBQUNELEtBRkQ7QUFHRCxHQW5IaUI7O0FBb0hsQixFQUFBLGFBQWEsR0FBSTtBQUNmO0FBQ0EsVUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixDQUF0QjtBQUNBLElBQUEsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsVUFBVSxJQUFJO0FBQ2xDLE1BQUEsVUFBVSxDQUFDLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLE1BQU07QUFDekM7QUFDQSxjQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsYUFBWCxDQUF5QixFQUE5Qzs7QUFDQSx5QkFBSSxrQkFBSixDQUF1QixRQUF2QixFQUFpQyxZQUFqQyxFQUNHLElBREgsQ0FDUSxXQUFXLElBQUk7QUFDbkIsVUFBQSxDQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QixJQUF2QixDQUE0QixFQUE1QjtBQUNBLFVBQUEsV0FBVyxDQUFDLGFBQVosQ0FBMEIsV0FBMUIsRUFBdUMsWUFBdkM7QUFDRCxTQUpIO0FBS0QsT0FSRDtBQVNELEtBVkQ7QUFXRCxHQWxJaUI7O0FBbUlsQixFQUFBLGFBQWEsQ0FBQyxjQUFELEVBQWlCO0FBQzVCO0FBQ0E7QUFDQSxRQUFJLElBQUksR0FBRyxJQUFJLG9CQUFLLEdBQVQsQ0FBYTtBQUN0QixNQUFBLFNBQVMsRUFBRTtBQURXLEtBQWIsRUFHWCxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCO0FBQUUsTUFBQSxTQUFTLEVBQUU7QUFBYixLQUFyQixFQUE0QyxpQkFBNUMsQ0FIVyxFQUlYLElBQUksb0JBQUssS0FBVCxDQUFlLFlBQWYsQ0FKVyxFQUtYLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxJQUFJLEVBQUUsTUFBUjtBQUFnQixNQUFBLEtBQUssRUFBRyxHQUFFLGNBQWMsQ0FBQyxJQUFLO0FBQTlDLEtBQWYsQ0FMVyxFQU1YLElBQUksb0JBQUssS0FBVCxDQUFlLE1BQWYsQ0FOVyxFQU9YLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxJQUFJLEVBQUUsTUFBUDtBQUFlLE1BQUEsS0FBSyxFQUFHLEdBQUUsY0FBYyxDQUFDLElBQUs7QUFBN0MsS0FBZixDQVBXLEVBUVgsSUFBSSxvQkFBSyxLQUFULENBQWUsTUFBZixDQVJXLEVBU1gsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLElBQUksRUFBRSxNQUFQO0FBQWUsTUFBQSxLQUFLLEVBQUcsR0FBRSxjQUFjLENBQUMsSUFBSztBQUE3QyxLQUFmLENBVFcsRUFVWCxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxVQUFmLENBVlcsRUFXWCxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLE1BQVI7QUFBZ0IsTUFBQSxLQUFLLEVBQUcsR0FBRSxjQUFjLENBQUMsUUFBUztBQUFsRCxLQUFmLENBWFcsRUFZWCxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxNQUFiLENBWlcsRUFhWCxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxNQUFiLENBYlcsQ0FBWDtBQWNGLElBQUEsSUFBSSxDQUFDLE1BQUwsQ0FBWSxtQkFBWjtBQUNBLElBQUEsV0FBVyxDQUFDLHVCQUFaLENBQW9DLGNBQWMsQ0FBQyxFQUFuRDtBQUNDLEdBdEppQjs7QUF1SmxCLEVBQUEsdUJBQXVCLENBQUMsRUFBRCxFQUFLO0FBQzFCO0FBQ0E7QUFDQSxVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsUUFBMUIsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxNQUFNO0FBQzNDO0FBQ0EsWUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLENBQW5CLENBRjJDLENBRzNDOztBQUNBLFlBQU0sWUFBWSxHQUFHO0FBQ25CLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUREO0FBRW5CLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUZEO0FBR25CLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUhEO0FBSW5CLFFBQUEsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUpMO0FBS25CLFFBQUEsTUFBTSxFQUFFLHdCQUFXLElBQVgsR0FBa0IsRUFMUCxDQU9yQjs7QUFQcUIsT0FBckI7O0FBUUEsdUJBQUksVUFBSixDQUFlLFFBQWYsRUFBeUIsRUFBekIsRUFBNkIsWUFBN0IsRUFBMkMsSUFBM0MsQ0FBZ0QsTUFBTTtBQUN0RCxRQUFBLFdBQVcsQ0FBQyxlQUFaO0FBQ0EsT0FGQTtBQUVHLEtBZEwsRUFKMEIsQ0FvQjFCOztBQUNBLElBQUEsU0FBUyxDQUFDLENBQUQsQ0FBVCxDQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLE1BQU07QUFDM0MsTUFBQSxXQUFXLENBQUMsZUFBWjtBQUNELEtBRkQ7QUFHRDs7QUEvS2lCLENBQXBCO2VBbUxlLFc7Ozs7Ozs7Ozs7O0FDeExmOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxnQkFBZ0IsR0FBRztBQUN2QixFQUFBLGVBQWUsR0FBRztBQUNoQixRQUFJLG9CQUFLLEdBQVQsQ0FDRTtBQUFFLE1BQUEsU0FBUyxFQUFFO0FBQWIsS0FERixFQUVFLElBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUI7QUFBRSxNQUFBLFNBQVMsRUFBRTtBQUFiLEtBQXJCLEVBQTZDLDRCQUE3QyxDQUZGLEVBR0UsSUFBSSxvQkFBSyxHQUFULENBQWE7QUFBQyxNQUFBLFNBQVMsRUFBRTtBQUFaLEtBQWIsRUFDRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCO0FBQUMsTUFBQSxTQUFTLEVBQUU7QUFBWixLQUFyQixFQUE4QyxRQUE5QyxDQURGLEVBRUUsSUFBSSxvQkFBSyxLQUFULENBQWUsSUFBZixFQUFxQjtBQUFDLE1BQUEsU0FBUyxFQUFFO0FBQVosS0FBckIsRUFBOEMsVUFBOUMsQ0FGRixDQUhGLEVBTUUsSUFBSSxvQkFBSyxHQUFULENBQWE7QUFBQyxNQUFBLFNBQVMsRUFBRTtBQUFaLEtBQWIsQ0FORixFQU1zQyxNQU50QyxDQU02QyxtQkFON0M7O0FBUUUsbUJBQVcsU0FBWDs7QUFDRSxJQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixXQUExQixFQUF1QyxPQUF2QyxDQUFnRCxPQUFELElBQVc7QUFDeEQsTUFBQSxPQUFPLENBQUMsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBbUMsQ0FBRCxJQUFLO0FBQ3JDLFlBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxXQUFULEtBQXlCLFFBQTVCLEVBQXFDO0FBQ25DLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQ0FBWjs7QUFDQSx5QkFBVyxTQUFYO0FBQ0QsU0FIRCxNQUdPLElBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxXQUFULEtBQXlCLFVBQTVCLEVBQXVDO0FBQzVDLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxxQ0FBWjs7QUFDQSw0QkFBYyxZQUFkO0FBQ0Q7QUFDRixPQVJEO0FBU0QsS0FWRDtBQVlQOztBQXZCd0IsQ0FBekI7ZUEwQmUsZ0I7Ozs7Ozs7Ozs7O0FDOUJmOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxVQUFVLEdBQUc7QUFDakIsRUFBQSxTQUFTLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUI7QUFDNUIsUUFBSSxRQUFRLEtBQUssRUFBYixJQUFtQixRQUFRLEtBQUksRUFBbkMsRUFBdUM7QUFDckMsTUFBQSxLQUFLLENBQUMsMkRBQUQsQ0FBTDtBQUNELEtBRkQsTUFFTztBQUNMLHVCQUFJLGNBQUosQ0FBb0IsbUJBQWtCLFFBQVMsRUFBL0MsRUFBa0QsSUFBbEQsQ0FBdUQsSUFBSSxJQUFJO0FBQzdELFlBQUksSUFBSSxDQUFDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsVUFBQSxLQUFLLENBQUMsc0NBQUQsQ0FBTDtBQUNBO0FBQ0QsU0FIRCxNQUdPLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxRQUF6QixFQUFtQztBQUN4QyxjQUFJLFdBQVcsR0FBRyxJQUFJLG9CQUFLLElBQVQsQ0FBZSxJQUFJLENBQUMsQ0FBRCxDQUFuQixDQUFsQjtBQUNBLGlCQUFPLFdBQVA7QUFDRCxTQUhNLE1BR0UsS0FBSyxDQUFDLDRDQUFELENBQVA7QUFDUixPQVJELEVBUUcsSUFSSCxDQVFRLFdBQVcsSUFBSTtBQUNyQixRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWjs7QUFDQSxZQUFJLFdBQVcsS0FBSyxTQUFwQixFQUErQjtBQUM3QixVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkscUJBQVo7QUFDQSxVQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGFBQXZCLEVBQXNDLElBQUksQ0FBQyxTQUFMLENBQWUsV0FBZixDQUF0QztBQUNBLFVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0MsU0FBbEMsR0FBOEMsRUFBOUM7O0FBQ0EsdUJBQU8sVUFBUDs7QUFDQSxrQ0FBb0IsZ0JBQXBCO0FBQ0Q7QUFFRixPQWxCRDtBQW1CRDtBQUNGLEdBekJnQjs7QUEwQmpCLEVBQUEsU0FBUyxHQUFHO0FBQ1YsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxTQUFqQyxHQUE2QyxFQUE3QztBQUNFLFFBQUksb0JBQUssS0FBVCxDQUFlLEVBQWYsRUFBbUIsVUFBbkIsRUFBK0IsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLElBQUksRUFBRSxVQUFSO0FBQW9CLE1BQUEsRUFBRSxFQUFFLFVBQXhCO0FBQW9DLE1BQUEsV0FBVyxFQUFFO0FBQWpELEtBQWYsQ0FBL0IsRUFBOEcsTUFBOUcsQ0FBcUgsUUFBckg7QUFDQSxRQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsR0FBRyxFQUFFO0FBQVAsS0FBZixFQUFvQyxVQUFwQyxFQUFnRCxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0IsTUFBQSxFQUFFLEVBQUUsVUFBeEI7QUFBb0MsTUFBQSxXQUFXLEVBQUU7QUFBakQsS0FBZixDQUFoRCxFQUErSCxNQUEvSCxDQUFzSSxRQUF0STtBQUNBLFFBQUksb0JBQUssR0FBVCxDQUFhLFdBQWIsRUFBMEIsTUFBMUIsQ0FBaUMsUUFBakM7QUFDRixJQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixRQUExQixFQUFvQyxPQUFwQyxDQUE2QyxNQUFELElBQVk7QUFDdEQsTUFBQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0MsQ0FBRCxJQUFPO0FBQ3RDLFlBQUksQ0FBQyxDQUFDLE1BQUYsQ0FBUyxXQUFULEtBQXlCLFdBQTdCLEVBQTBDO0FBQ3hDLGVBQUssU0FBTCxDQUFlLFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLEtBQW5ELEVBQTBELFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLEtBQTlGO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsNEJBQWMsWUFBZDtBQUNEO0FBQ0YsT0FORDtBQU9ELEtBUkQ7QUFTRDs7QUF4Q2dCLENBQW5CO2VBMENlLFU7Ozs7OztBQ2hEZjs7QUFDQTs7OztBQUVBLGFBQU8sVUFBUDs7QUFDQSxpQkFBaUIsZUFBakI7Ozs7Ozs7Ozs7QUNKQTs7QUFDQTs7QUFDQTs7OztBQUdBLE1BQU0sYUFBYSxHQUFHO0FBQ3BCLEVBQUEsYUFBYSxDQUFDLFVBQUQsRUFBYTtBQUN4QixRQUFJLHdCQUFXLElBQVgsR0FBa0IsRUFBbEIsS0FBeUIsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsRUFBN0MsRUFBaUQ7QUFDL0MsVUFBSSxvQkFBSyxPQUFULENBQWlCO0FBQ2IsUUFBQSxTQUFTLEVBQUUsU0FERTtBQUViLFFBQUEsRUFBRSxFQUFHLEdBQUUsVUFBVSxDQUFDLEVBQUc7QUFGUixPQUFqQixFQUlFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsUUFBQSxHQUFHLEVBQUcsR0FBRSxVQUFVLENBQUMsSUFBWCxDQUFnQixVQUFXLEVBQXBDO0FBQXVDLFFBQUEsU0FBUyxFQUFFLFlBQWxEO0FBQWdFLFFBQUEsR0FBRyxFQUFFO0FBQXJFLE9BQWYsQ0FKRixFQUtFLElBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUI7QUFBQyxRQUFBLFNBQVMsRUFBRTtBQUFaLE9BQXJCLEVBQW9ELEdBQUUsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsU0FBVSxNQUFLLFVBQVUsQ0FBQyxJQUFLLElBQUcsVUFBVSxDQUFDLFNBQVUsRUFBN0gsQ0FMRixFQU1FLElBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUIsRUFBckIsRUFBeUIsVUFBVSxDQUFDLGNBQXBDLENBTkYsRUFPRSxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxNQUFiLENBUEYsRUFPd0IsTUFQeEIsQ0FPK0IsZ0JBUC9CO0FBUUQsS0FURCxNQVNPO0FBQ0wsVUFBSSxvQkFBSyxPQUFULENBQWlCO0FBQ2IsUUFBQSxTQUFTLEVBQUUsU0FERTtBQUViLFFBQUEsRUFBRSxFQUFHLEdBQUUsVUFBVSxDQUFDLEVBQUc7QUFGUixPQUFqQixFQUlFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsUUFBQSxHQUFHLEVBQUcsR0FBRSxVQUFVLENBQUMsSUFBWCxDQUFnQixVQUFXLEVBQXBDO0FBQXVDLFFBQUEsR0FBRyxFQUFFLGFBQTVDO0FBQTJELFFBQUEsU0FBUyxFQUFFO0FBQXRFLE9BQWYsQ0FKRixFQUtFLElBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUI7QUFBQyxRQUFBLFNBQVMsRUFBQztBQUFYLE9BQXJCLEVBQW1ELEdBQUUsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsU0FBVSxNQUFLLFVBQVUsQ0FBQyxJQUFLLElBQUcsVUFBVSxDQUFDLFNBQVUsRUFBNUgsQ0FMRixFQU1FLElBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUIsRUFBckIsRUFBeUIsVUFBVSxDQUFDLGNBQXBDLENBTkYsRUFNdUQsTUFOdkQsQ0FNOEQsZ0JBTjlEO0FBT0Q7QUFDRixHQXBCbUI7O0FBc0JwQixFQUFBLFVBQVUsR0FBRztBQUNYLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFNBQTVDLEdBQXdELEVBQXhEO0FBQ0EsUUFBSSxvQkFBSyxLQUFULENBQWUsSUFBZixFQUFxQjtBQUFDLE1BQUEsRUFBRSxFQUFFO0FBQUwsS0FBckIsRUFBMEMsVUFBMUMsRUFBc0QsTUFBdEQsQ0FBNkQsbUJBQTdEO0FBQ0EsUUFBSSxvQkFBSyxHQUFULENBQWE7QUFBQyxNQUFBLFNBQVMsRUFBRTtBQUFaLEtBQWIsRUFBMkMsTUFBM0MsQ0FBa0QsbUJBQWxEOztBQUNBLHFCQUFJLGNBQUosQ0FBbUIsd0JBQW5CLEVBQ0csSUFESCxDQUNRLFVBQVUsSUFBSTtBQUVsQixNQUFBLFVBQVUsQ0FBQyxPQUFYLENBQW1CLE9BQU8sSUFBSTtBQUM1QixhQUFLLGFBQUwsQ0FBbUIsT0FBbkI7QUFDRCxPQUZEO0FBR0EsV0FBSyxVQUFMO0FBQ0EsV0FBSyxhQUFMO0FBQ0EsV0FBSyxlQUFMO0FBQ0QsS0FUSCxFQVNLLElBVEwsQ0FTVSxNQUFNLEtBQUssa0JBQUwsRUFUaEI7QUFVRCxHQXBDbUI7O0FBc0NwQjtBQUNBLEVBQUEsa0JBQWtCLEdBQUc7QUFDbkIsUUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXBCO0FBQ0EsSUFBQSxhQUFhLENBQUMsU0FBZCxHQUEwQixhQUFhLENBQUMsWUFBeEM7QUFDRCxHQTFDbUI7O0FBNkNwQjtBQUNBLEVBQUEsVUFBVSxHQUFHO0FBQ1g7QUFDQSxRQUFJLG9CQUFLLEdBQVQsQ0FBYTtBQUNULE1BQUEsU0FBUyxFQUFFLGNBREY7QUFFVCxNQUFBLEVBQUUsRUFBRTtBQUZLLEtBQWIsRUFJRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLEVBQXJCLEVBQXlCLGFBQXpCLENBSkYsRUFLRSxJQUFJLG9CQUFLLFFBQVQsQ0FBa0I7QUFDaEIsTUFBQSxXQUFXLEVBQUUsd0JBREc7QUFFaEIsTUFBQSxJQUFJLEVBQUU7QUFGVSxLQUFsQixDQUxGLEVBU0UsSUFBSSxvQkFBSyxHQUFULENBQWEsUUFBYixDQVRGLEVBUzBCLE1BVDFCLENBU2lDLG1CQVRqQztBQVVELEdBMURtQjs7QUE2RHBCLEVBQUEsYUFBYSxHQUFHO0FBQ2QsSUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQixLQUExQixDQUFnQyxVQUFVLENBQVYsRUFBYTtBQUMzQztBQUNBLFVBQUksQ0FBQyxDQUFDLHdCQUFELENBQUQsQ0FBNEIsR0FBNUIsT0FBc0MsRUFBMUMsRUFBOEM7QUFDNUMsUUFBQSxLQUFLLENBQUMsMkJBQUQsQ0FBTDtBQUNELE9BRkQsTUFFTztBQUNMLFFBQUEsQ0FBQyxDQUFDLGNBQUYsR0FESyxDQUVMOztBQUNBLFlBQUksV0FBVyxHQUFHLElBQUksSUFBSixFQUFsQixDQUhLLENBSUw7O0FBQ0EsWUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVosR0FBdUIsS0FBdkIsQ0FBNkIsR0FBN0IsQ0FBaEIsQ0FMSyxDQU1MOztBQUNBLFlBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFaLEtBQXlCLENBQXJDLENBUEssQ0FRTDs7QUFDQSxZQUFJLGdCQUFnQixHQUFHO0FBQ3JCLFVBQUEsY0FBYyxFQUFFLENBQUMsQ0FBQyx3QkFBRCxDQUFELENBQTRCLEdBQTVCLEVBREs7QUFFckIsVUFBQSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUQsQ0FGQztBQUVJO0FBQ3pCLFVBQUEsSUFBSSxFQUFHLEdBQUUsS0FBTSxJQUFHLFNBQVMsQ0FBQyxDQUFELENBQUksSUFBRyxTQUFTLENBQUMsQ0FBRCxDQUFJLEVBSDFCO0FBSXJCLFVBQUEsTUFBTSxFQUFFLHdCQUFXLElBQVgsR0FBa0IsRUFKTCxDQU92Qjs7QUFQdUIsU0FBdkI7O0FBUUEseUJBQUksUUFBSixDQUFhLFVBQWIsRUFBeUIsZ0JBQXpCLEVBQ0csSUFESCxDQUNRLE1BQU0sYUFBYSxDQUFDLFVBQWQsRUFEZDtBQUVEO0FBQ0YsS0F4QkQ7QUF5QkQsR0F2Rm1COztBQXlGcEIsRUFBQSxlQUFlLEdBQUc7QUFDaEI7QUFDQSxJQUFBLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCLEtBQXRCLENBQTRCLFVBQVUsQ0FBVixFQUFhO0FBQ3ZDO0FBQ0EsVUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxlQUF6QixDQUZ1QyxDQUd2Qzs7QUFDQSxVQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsU0FBNUIsQ0FKdUMsQ0FLdkM7O0FBQ0EsTUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUgsQ0FBRCxDQUFZLFdBQVosQ0FBd0IsbURBQXhCLEVBTnVDLENBT3ZDOztBQUNBLE1BQUEsQ0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhLFdBQWIsQ0FBMEIsOENBQTZDLFdBQVksSUFBbkYsRUFSdUMsQ0FTdkM7O0FBQ0EsWUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLFlBQUQsQ0FBdkIsQ0FWdUMsQ0FXdkM7O0FBQ0EsTUFBQSxhQUFhLENBQUMsSUFBZCxHQUFxQixLQUFyQixDQUEyQixVQUFVLENBQVYsRUFBYTtBQUN0QztBQUNBLGNBQU0sb0JBQW9CLEdBQUc7QUFDM0IsVUFBQSxjQUFjLEVBQUUsYUFBYSxDQUFDLEdBQWQsRUFEVyxDQUc3Qjs7QUFINkIsU0FBN0I7QUFJQSxjQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsTUFBZCxHQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUF4QixDQU5zQyxDQU90Qzs7QUFDQSx5QkFBSSxVQUFKLENBQWUsVUFBZixFQUEyQixlQUEzQixFQUE0QyxvQkFBNUMsRUFDRyxJQURILENBQ1EsTUFBTSxhQUFhLENBQUMsVUFBZCxFQURkO0FBRUQsT0FWRDtBQVdELEtBdkJEO0FBd0JEOztBQW5IbUIsQ0FBdEI7ZUFzSGUsYTs7Ozs7Ozs7Ozs7QUMzSGY7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFHQSxNQUFNLG1CQUFtQixHQUFHO0FBQzFCLEVBQUEsZ0JBQWdCLEdBQUc7QUFDakIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsR0FBd0QsSUFBeEQ7QUFDQSxRQUFJLG9CQUFLLE9BQVQsQ0FBaUI7QUFBRSxNQUFBLFNBQVMsRUFBRSxTQUFiO0FBQXdCLE1BQUEsRUFBRSxFQUFHLEdBQUUsd0JBQVcsSUFBWCxHQUFrQixFQUFHO0FBQXBELEtBQWpCLEVBQ0UsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLEdBQUcsRUFBRyxHQUFFLHdCQUFXLElBQVgsR0FBa0IsVUFBVyxFQUF2QztBQUEwQyxNQUFBLEdBQUcsRUFBRSxhQUEvQztBQUE4RCxNQUFBLEtBQUssRUFBRSx1REFBckU7QUFBOEgsTUFBQSxNQUFNLEVBQUUsS0FBdEk7QUFBNkksTUFBQSxLQUFLLEVBQUU7QUFBcEosS0FBZixDQURGLEVBRUUsSUFBSSxvQkFBSyxLQUFULENBQWUsSUFBZixFQUFxQjtBQUFFLE1BQUEsS0FBSyxFQUFFO0FBQVQsS0FBckIsRUFBNEYsR0FBRSx3QkFBVyxJQUFYLEdBQWtCLFNBQVUsTUFBSyx3QkFBVyxJQUFYLEdBQWtCLFFBQVMsSUFBRyx3QkFBVyxJQUFYLEdBQWtCLFFBQVMsRUFBeEwsQ0FGRixFQUdFLE1BSEYsQ0FHUyxtQkFIVDtBQUlELEdBUHlCOztBQVMxQixFQUFBLFlBQVksR0FBRztBQUNiLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFNBQTVDLEdBQXdELElBQXhELENBRGEsQ0FFYjs7QUFDQSxRQUFJLG9CQUFLLE9BQVQsQ0FBaUI7QUFBRSxNQUFBLFNBQVMsRUFBRTtBQUFiLEtBQWpCLEVBQ0UsSUFBSSxvQkFBSyxHQUFULENBQWE7QUFBRSxNQUFBLFNBQVMsRUFBRTtBQUFiLEtBQWIsQ0FERixFQUVFLElBQUksb0JBQUssR0FBVCxDQUFhO0FBQUUsTUFBQSxTQUFTLEVBQUU7QUFBYixLQUFiLENBRkYsRUFHRSxJQUFJLG9CQUFLLElBQVQsQ0FBYztBQUFFLE1BQUEsU0FBUyxFQUFFLGlCQUFiO0FBQWdDLE1BQUEsRUFBRSxFQUFFO0FBQXBDLEtBQWQsRUFBb0UsT0FBcEUsQ0FIRixFQUlFLE1BSkYsQ0FJUyxtQkFKVDtBQU1BLFFBQUksb0JBQUssT0FBVCxDQUFpQjtBQUFFLE1BQUEsU0FBUyxFQUFFO0FBQWIsS0FBakIsRUFDRSxJQUFJLG9CQUFLLEdBQVQsQ0FBYTtBQUFFLE1BQUEsU0FBUyxFQUFFO0FBQWIsS0FBYixDQURGLEVBRUUsSUFBSSxvQkFBSyxJQUFULENBQWM7QUFBRSxNQUFBLFNBQVMsRUFBRSxpQkFBYjtBQUFnQyxNQUFBLEVBQUUsRUFBRTtBQUFwQyxLQUFkLEVBQXVFLFVBQXZFLENBRkYsRUFHRSxNQUhGLENBR1MsbUJBSFQ7QUFLQSxRQUFJLG9CQUFLLE9BQVQsQ0FBaUI7QUFBRSxNQUFBLFNBQVMsRUFBRTtBQUFiLEtBQWpCLEVBQ0UsSUFBSSxvQkFBSyxHQUFULENBQWE7QUFBRSxNQUFBLFNBQVMsRUFBRTtBQUFiLEtBQWIsQ0FERixFQUVFLElBQUksb0JBQUssSUFBVCxDQUFjO0FBQUUsTUFBQSxTQUFTLEVBQUUsaUJBQWI7QUFBZ0MsTUFBQSxFQUFFLEVBQUU7QUFBcEMsS0FBZCxFQUFzRSxTQUF0RSxDQUZGLEVBR0UsTUFIRixDQUdTLG1CQUhUO0FBS0EsUUFBSSxvQkFBSyxPQUFULENBQWlCO0FBQUUsTUFBQSxTQUFTLEVBQUU7QUFBYixLQUFqQixFQUNFLElBQUksb0JBQUssR0FBVCxDQUFhO0FBQUUsTUFBQSxTQUFTLEVBQUU7QUFBYixLQUFiLENBREYsRUFFRSxJQUFJLG9CQUFLLEdBQVQsQ0FBYTtBQUFFLE1BQUEsU0FBUyxFQUFFO0FBQWIsS0FBYixDQUZGLEVBR0UsSUFBSSxvQkFBSyxHQUFULENBQWE7QUFBRSxNQUFBLFNBQVMsRUFBRTtBQUFiLEtBQWIsQ0FIRixFQUlFLElBQUksb0JBQUssSUFBVCxDQUFjO0FBQUUsTUFBQSxTQUFTLEVBQUUsaUJBQWI7QUFBZ0MsTUFBQSxFQUFFLEVBQUU7QUFBcEMsS0FBZCxFQUFxRSxRQUFyRSxDQUpGLEVBS0UsTUFMRixDQUtTLG1CQUxUO0FBT0EsUUFBSSxvQkFBSyxPQUFULENBQWlCO0FBQUUsTUFBQSxTQUFTLEVBQUU7QUFBYixLQUFqQixFQUNFLElBQUksb0JBQUssSUFBVCxDQUFjO0FBQUUsTUFBQSxTQUFTLEVBQUUsaUJBQWI7QUFBZ0MsTUFBQSxFQUFFLEVBQUU7QUFBcEMsS0FBZCxFQUFtRSxNQUFuRSxDQURGLEVBRUUsTUFGRixDQUVTLG1CQUZUO0FBSUEsUUFBSSxvQkFBSyxPQUFULENBQWlCO0FBQUUsTUFBQSxTQUFTLEVBQUU7QUFBYixLQUFqQixFQUNFLE1BREYsQ0FDUyxtQkFEVDtBQUdBLFFBQUksb0JBQUssT0FBVCxDQUFpQjtBQUFFLE1BQUEsU0FBUyxFQUFFO0FBQWIsS0FBakIsRUFDRSxNQURGLENBQ1MsbUJBRFQ7QUFHQSxRQUFJLG9CQUFLLE9BQVQsQ0FBaUI7QUFBRSxNQUFBLFNBQVMsRUFBRTtBQUFiLEtBQWpCLEVBQ0UsTUFERixDQUNTLG1CQURUO0FBR0EsUUFBSSxvQkFBSyxPQUFULENBQWlCO0FBQUUsTUFBQSxTQUFTLEVBQUU7QUFBYixLQUFqQixFQUNFLE1BREYsQ0FDUyxtQkFEVCxFQXZDYSxDQTBDYjs7QUFDQSxTQUFLLFlBQUw7QUFDRCxHQXJEeUI7O0FBdUQxQjtBQUNBLEVBQUEsWUFBWSxHQUFHO0FBQ2IsSUFBQSxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4QixFQUF3QyxnQkFBeEMsQ0FBeUQsT0FBekQsRUFBa0UsTUFBTTtBQUFDLHFCQUFXLGVBQVg7QUFBNkIsS0FBdEc7QUFDQSxJQUFBLFFBQVEsQ0FBQyxjQUFULENBQXdCLGlCQUF4QixFQUEyQyxnQkFBM0MsQ0FBNEQsT0FBNUQsRUFBcUUsTUFBTTtBQUFDLHdCQUFjLFVBQWQ7QUFBMkIsS0FBdkc7QUFDQSxJQUFBLFFBQVEsQ0FBQyxjQUFULENBQXdCLGdCQUF4QixFQUEwQyxnQkFBMUMsQ0FBMkQsT0FBM0QsRUFBb0UsTUFBTTtBQUFDLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSwwQkFBWjtBQUF3QyxLQUFuSDtBQUNBLElBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZUFBeEIsRUFBeUMsZ0JBQXpDLENBQTBELE9BQTFELEVBQW1FLE1BQU07QUFBQyxzQkFBWSxlQUFaO0FBQThCLEtBQXhHO0FBQ0EsSUFBQSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4QixFQUF1QyxnQkFBdkMsQ0FBd0QsT0FBeEQsRUFBaUUsTUFBTTtBQUFDLG9CQUFVLE9BQVY7QUFBb0IsS0FBNUY7QUFDRDs7QUE5RHlCLENBQTVCO2VBaUVlLG1COzs7Ozs7Ozs7OztBQ3pFZjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUdBLE1BQU0sTUFBTSxHQUFHO0FBQ2IsRUFBQSxVQUFVLEdBQUc7QUFDWCxRQUFJLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGFBQXZCLE1BQTBDLElBQTlDLEVBQW9EO0FBQ2xELFVBQUksb0JBQUssRUFBVCxDQUNFLEVBREYsRUFFRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLFFBQWhCLENBRkYsRUFHRSxNQUhGLENBR1MsU0FIVDtBQUlELEtBTEQsTUFLTztBQUNMLFVBQUksb0JBQUssRUFBVCxDQUNFLEVBREYsRUFFRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLE1BQWhCLENBRkYsRUFHRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLE9BQWhCLENBSEYsRUFJRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLFFBQWhCLENBSkYsRUFLRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLFVBQWhCLENBTEYsRUFNRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLE1BQWhCLENBTkYsRUFPRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLFNBQWhCLENBUEYsRUFRRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWTtBQUFFLFFBQUEsRUFBRSxFQUFFO0FBQU4sT0FBWixFQUE2QixJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLFFBQUEsRUFBRSxFQUFFLFVBQU47QUFBa0IsUUFBQSxHQUFHLEVBQUcsR0FBRSx3QkFBVyxJQUFYLEdBQWtCLFVBQVcsRUFBdkQ7QUFBMEQsUUFBQSxHQUFHLEVBQUUsYUFBL0Q7QUFBOEUsUUFBQSxTQUFTLEVBQUU7QUFBekYsT0FBZixDQUE3QixFQUNFLElBQUksb0JBQUssT0FBVCxDQUFpQjtBQUFFLFFBQUEsRUFBRSxFQUFFO0FBQU4sT0FBakIsRUFBbUMsSUFBSSxvQkFBSyxLQUFULENBQWUsSUFBZixFQUFxQjtBQUFFLFFBQUEsU0FBUyxFQUFFLFlBQWI7QUFBMkIsUUFBQSxFQUFFLEVBQUU7QUFBL0IsT0FBckIsRUFBOEQsY0FBOUQsQ0FBbkMsRUFDRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCO0FBQUUsUUFBQSxTQUFTLEVBQUUsWUFBYjtBQUEyQixRQUFBLEVBQUUsRUFBRTtBQUEvQixPQUFyQixFQUFnRSxTQUFoRSxDQURGLENBREYsQ0FSRixFQVlFLE1BWkYsQ0FZUyxTQVpUO0FBYUEsTUFBQSxDQUFDLENBQUMsU0FBRCxDQUFELENBQWEsSUFBYjtBQUNBLE1BQUEsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlLEtBQWYsQ0FBcUIsWUFBWTtBQUFFLFFBQUEsQ0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhLE1BQWI7QUFBdUIsT0FBMUQ7QUFDQSxNQUFBLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYSxLQUFiLENBQW1CLFlBQVk7QUFDN0IsUUFBQSxDQUFDLENBQUMsU0FBRCxDQUFELENBQWEsSUFBYixDQUFrQixFQUFsQjtBQUNBLFFBQUEsQ0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUIsSUFBdkIsQ0FBNEIsRUFBNUI7QUFDQSxRQUFBLGNBQWMsQ0FBQyxVQUFmLENBQTBCLGFBQTFCO0FBQ0EsUUFBQSxNQUFNLENBQUMsVUFBUDs7QUFDQSx5QkFBaUIsZUFBakI7QUFDRCxPQU5EO0FBVUQ7O0FBR0QsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxnQkFBbEMsQ0FBbUQsT0FBbkQsRUFBNkQsS0FBRCxJQUFXO0FBQ3JFLFVBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxXQUFiLEtBQTZCLFFBQWpDLEVBQTJDO0FBQ3pDLHVCQUFXLFNBQVg7QUFDRDs7QUFDRCxVQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsV0FBYixLQUE2QixNQUFqQyxFQUF5QztBQUNyQyxnQ0FBb0IsZ0JBQXBCO0FBQ0gsT0FGRCxNQUVPLElBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxXQUFiLEtBQTZCLE9BQWpDLEVBQTBDO0FBQzdDLHVCQUFXLGVBQVg7QUFDSCxPQUZNLE1BRUEsSUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFdBQWIsS0FBNkIsUUFBakMsRUFBMkM7QUFDOUMsd0JBQVksZUFBWjtBQUNILE9BRk0sTUFFQSxJQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsV0FBYixLQUE2QixVQUFqQyxFQUE2QztBQUNoRCwwQkFBYyxVQUFkO0FBQ0gsT0FGTSxNQUVBLElBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxXQUFiLEtBQTZCLE1BQWpDLEVBQXlDO0FBQzVDLHNCQUFVLE9BQVY7QUFDSCxPQUZNLE1BRUEsSUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFdBQWIsS0FBNkIsU0FBakMsRUFBNEM7QUFDL0MsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDBCQUFaO0FBQ0g7QUFDRixLQWpCRDtBQWtCRDs7QUF0RFksQ0FBZjtlQTJEZSxNOzs7Ozs7Ozs7OztBQ3RFZjs7QUFDQTs7QUFDQTs7OztBQUdBLE1BQU0sU0FBUyxHQUFHO0FBQ2hCLEVBQUEsU0FBUyxDQUFDLE9BQUQsRUFBVTtBQUNqQixRQUFJLG9CQUFLLE9BQVQsQ0FBa0I7QUFBQyxNQUFBLFNBQVMsRUFBRSxNQUFaO0FBQW9CLE1BQUEsRUFBRSxFQUFHLEdBQUUsT0FBTyxDQUFDLEVBQUc7QUFBdEMsS0FBbEIsRUFDQSxJQUFJLG9CQUFLLE1BQVQsQ0FBZ0I7QUFBQyxNQUFBLElBQUksRUFBRyxHQUFFLE9BQU8sQ0FBQyxHQUFJLEVBQXRCO0FBQXlCLE1BQUEsTUFBTSxFQUFFO0FBQWpDLEtBQWhCLEVBQTZELElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxHQUFHLEVBQUcsR0FBRSxPQUFPLENBQUMsWUFBYSxFQUE5QjtBQUFpQyxNQUFBLEdBQUcsRUFBRSxlQUF0QztBQUF1RCxNQUFBLE1BQU0sRUFBRSxLQUEvRDtBQUFzRSxNQUFBLEtBQUssRUFBRTtBQUE3RSxLQUFmLENBQTdELENBREEsRUFFQSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLEVBQXJCLEVBQTBCLEdBQUUsT0FBTyxDQUFDLFdBQVksRUFBaEQsQ0FGQSxFQUdBLElBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUIsRUFBckIsRUFBMEIsYUFBWSxPQUFPLENBQUMsSUFBUixDQUFhLFNBQVUsa0JBQWlCLE9BQU8sQ0FBQyxTQUFVLEVBQWhHLENBSEEsRUFJQSxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxFQUFiLEVBQWlCLE9BQU8sQ0FBQyxLQUF6QixDQUpBLEVBS0EsSUFBSSxvQkFBSyxHQUFULENBQWEsZ0JBQWIsQ0FMQSxFQUtnQyxNQUxoQyxDQUt1QyxtQkFMdkM7QUFNRCxHQVJlOztBQVVoQixFQUFBLE9BQU8sR0FBSztBQUNWLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFNBQTVDLEdBQXdELEVBQXhEOztBQUNBLHFCQUFJLGNBQUosQ0FBb0Isb0JBQW1CLHdCQUFXLElBQVgsR0FBa0IsRUFBRywyQ0FBNUQsRUFDQyxJQURELENBQ00sT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFSLENBQWdCLElBQUksSUFBSTtBQUN2QyxXQUFLLFNBQUwsQ0FBZSxJQUFmO0FBQXFCLEtBRE4sQ0FEakIsRUFHRyxJQUhILENBR1EsTUFBTSxLQUFLLE9BQUwsRUFIZCxFQUlHLElBSkgsQ0FJUSxNQUFLLEtBQUssYUFBTCxFQUpiO0FBTUQsR0FsQmU7O0FBb0JoQixFQUFBLE9BQU8sR0FBSTtBQUNULFFBQUksb0JBQUssT0FBVCxDQUFrQjtBQUFDLE1BQUEsU0FBUyxFQUFFO0FBQVosS0FBbEIsRUFDQSxJQUFJLG9CQUFLLEtBQVQsQ0FBZ0IsSUFBaEIsRUFBc0IsRUFBdEIsRUFBMEIsbUJBQTFCLENBREEsRUFFQSxJQUFJLG9CQUFLLElBQVQsQ0FDRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLE1BQUEsR0FBRyxFQUFFO0FBQU4sS0FBZixFQUFxQyxjQUFyQyxDQURGLEVBRUUsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLElBQUksRUFBRSxhQUFQO0FBQXNCLE1BQUEsV0FBVyxFQUFFLGNBQW5DO0FBQW1ELE1BQUEsRUFBRSxFQUFFO0FBQXZELEtBQWYsQ0FGRixFQUdFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxHQUFHLEVBQUU7QUFBTixLQUFmLEVBQW9DLGNBQXBDLENBSEYsRUFJRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLE1BQUEsSUFBSSxFQUFFLFlBQVA7QUFBcUIsTUFBQSxXQUFXLEVBQUUsY0FBbEM7QUFBa0QsTUFBQSxFQUFFLEVBQUU7QUFBdEQsS0FBZixDQUpGLEVBS0UsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLEdBQUcsRUFBRTtBQUFOLEtBQWYsRUFBeUMsb0JBQXpDLENBTEYsRUFNRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLE1BQUEsSUFBSSxFQUFFLGlCQUFQO0FBQTBCLE1BQUEsV0FBVyxFQUFFLG9CQUF2QztBQUE2RCxNQUFBLEVBQUUsRUFBRTtBQUFqRSxLQUFmLENBTkYsRUFPRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLE1BQUEsR0FBRyxFQUFFO0FBQU4sS0FBZixFQUE0QyxxQkFBNUMsQ0FQRixFQVFFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxJQUFJLEVBQUUsb0JBQVA7QUFBNkIsTUFBQSxXQUFXLEVBQUUscUJBQTFDO0FBQWlFLE1BQUEsRUFBRSxFQUFFO0FBQXJFLEtBQWYsQ0FSRixFQVNFLElBQUksb0JBQUssR0FBVCxDQUFhLGtCQUFiLENBVEYsQ0FGQSxFQWFFLE1BYkYsQ0FhUyxtQkFiVDtBQWNELEdBbkNlOztBQXFDaEIsRUFBQSxhQUFhLEdBQUU7QUFDYixJQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixRQUExQixFQUFvQyxPQUFwQyxDQUE2QyxNQUFELElBQVc7QUFDckQsTUFBQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0MsQ0FBRCxJQUFLO0FBQ3BDLFlBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxXQUFULEtBQXlCLGtCQUE1QixFQUErQztBQUM3QyxjQUFJLEtBQUssR0FBRztBQUNWLFlBQUEsV0FBVyxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLEVBQXVDLEtBRDFDO0FBRVYsWUFBQSxHQUFHLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsS0FGbEM7QUFHVixZQUFBLFlBQVksRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxLQUg1QztBQUlWLFlBQUEsS0FBSyxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLHFCQUF2QixFQUE4QyxLQUozQztBQUtWLFlBQUEsTUFBTSxFQUFFLHdCQUFXLElBQVgsR0FBa0IsRUFMaEI7QUFNVixZQUFBLFNBQVMsRUFBRSxJQUFJLElBQUo7QUFORCxXQUFaO0FBUUEsVUFBQSxTQUFTLENBQUMsT0FBVixDQUFrQixLQUFsQjtBQUNELFNBVkQsTUFVTyxJQUFHLENBQUMsQ0FBQyxNQUFGLENBQVMsV0FBVCxLQUF5QixnQkFBNUIsRUFBNkM7QUFDbEQsY0FBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxVQUFULENBQW9CLEVBQXBDOztBQUNBLDJCQUFJLFVBQUosQ0FBZSxVQUFmLEVBQTJCLFNBQTNCLEVBQXNDLElBQXRDLENBQTJDLE1BQUssU0FBUyxDQUFDLE9BQVYsRUFBaEQ7QUFDRDtBQUNBLE9BZkg7QUFnQkMsS0FqQkg7QUFrQkMsR0F4RGE7O0FBMkRoQixFQUFBLE9BQU8sQ0FBQyxLQUFELEVBQU87QUFDWixxQkFBSSxRQUFKLENBQWEsVUFBYixFQUF5QixLQUF6QixFQUFnQyxJQUFoQyxDQUFxQyxNQUFLLEtBQUssT0FBTCxFQUExQztBQUNEOztBQTdEZSxDQUFsQjtlQWtFZSxTOzs7Ozs7Ozs7OztBQ3ZFZjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0sYUFBYSxHQUFHO0FBRXBCLEVBQUEsWUFBWSxHQUFHO0FBQ2IsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxTQUFqQyxHQUE2QyxFQUE3QztBQUNFLFFBQUksb0JBQUssS0FBVCxDQUFlLEVBQWYsRUFBbUIsWUFBbkIsRUFBaUMsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLElBQUksRUFBRSxXQUFSO0FBQXFCLE1BQUEsRUFBRSxFQUFFLFdBQXpCO0FBQXNDLE1BQUEsV0FBVyxFQUFFO0FBQW5ELEtBQWYsQ0FBakMsRUFBdUgsTUFBdkgsQ0FBOEgsUUFBOUg7QUFDQSxRQUFJLG9CQUFLLEtBQVQsQ0FBZSxFQUFmLEVBQW1CLFdBQW5CLEVBQWdDLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxJQUFJLEVBQUUsVUFBUjtBQUFvQixNQUFBLEVBQUUsRUFBRSxVQUF4QjtBQUFvQyxNQUFBLFdBQVcsRUFBRTtBQUFqRCxLQUFmLENBQWhDLEVBQWdILE1BQWhILENBQXVILFFBQXZIO0FBQ0EsUUFBSSxvQkFBSyxLQUFULENBQWUsRUFBZixFQUFtQixPQUFuQixFQUE0QixJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLE9BQVI7QUFBaUIsTUFBQSxFQUFFLEVBQUUsT0FBckI7QUFBOEIsTUFBQSxJQUFJLEVBQUUsT0FBcEM7QUFBNkMsTUFBQSxXQUFXLEVBQUU7QUFBMUQsS0FBZixDQUE1QixFQUFpSCxNQUFqSCxDQUF3SCxRQUF4SDtBQUNBLFFBQUksb0JBQUssS0FBVCxDQUFlLEVBQWYsRUFBbUIsVUFBbkIsRUFBK0IsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLElBQUksRUFBRSxVQUFSO0FBQW9CLE1BQUEsRUFBRSxFQUFFLFVBQXhCO0FBQW9DLE1BQUEsV0FBVyxFQUFFO0FBQWpELEtBQWYsQ0FBL0IsRUFBOEcsTUFBOUcsQ0FBcUgsUUFBckg7QUFDQSxRQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsR0FBRyxFQUFFO0FBQVAsS0FBZixFQUFvQyxVQUFwQyxFQUFnRCxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0IsTUFBQSxFQUFFLEVBQUUsVUFBeEI7QUFBb0MsTUFBQSxXQUFXLEVBQUU7QUFBakQsS0FBZixDQUFoRCxFQUErSCxNQUEvSCxDQUFzSSxRQUF0STtBQUNBLFFBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxHQUFHLEVBQUU7QUFBUCxLQUFmLEVBQTJDLGtCQUEzQyxFQUFpRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLGlCQUFSO0FBQTJCLE1BQUEsRUFBRSxFQUFFLGlCQUEvQjtBQUFrRCxNQUFBLFdBQVcsRUFBRTtBQUEvRCxLQUFmLENBQWpFLEVBQXNLLE1BQXRLLENBQTZLLFFBQTdLO0FBQ0EsUUFBSSxvQkFBSyxHQUFULENBQWEsa0JBQWIsRUFBaUMsTUFBakMsQ0FBd0MsUUFBeEM7QUFHRixJQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixRQUExQixFQUFvQyxPQUFwQyxDQUE2QyxNQUFELElBQVk7QUFDdEQsTUFBQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0MsQ0FBRCxJQUFPO0FBQ3RDLFlBQUksQ0FBQyxDQUFDLE1BQUYsQ0FBUyxXQUFULEtBQXlCLGtCQUE3QixFQUFpRDtBQUMvQyxjQUFJLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLEVBQXFDLEtBQXJDLEtBQStDLEVBQS9DLElBQXFELFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLEtBQXBDLEtBQThDLEVBQW5HLElBQXlHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLEVBQWlDLEtBQWpDLEtBQTJDLEVBQXBKLElBQTBKLFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLEtBQXBDLEtBQThDLEVBQXhNLElBQThNLFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLEtBQXBDLEtBQThDLEVBQTVQLElBQWtRLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxLQUEzQyxLQUFxRCxFQUEzVCxFQUErVDtBQUM3VDtBQUNBLFlBQUEsS0FBSyxDQUFDLG1EQUFELENBQUw7QUFDRCxXQUhELE1BR08sSUFBSSxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxLQUFqQyxDQUF1QyxPQUF2QyxDQUErQyxHQUEvQyxNQUF3RCxDQUFDLENBQTdELEVBQWdFO0FBQ3JFO0FBQ0EsWUFBQSxLQUFLLENBQUMscUNBQUQsQ0FBTDtBQUNELFdBSE0sTUFHQSxJQUFJLFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLEtBQXBDLEtBQThDLFFBQVEsQ0FBQyxhQUFULENBQXVCLGtCQUF2QixFQUEyQyxLQUE3RixFQUFvRztBQUN6RztBQUNBLFlBQUEsQ0FBQyxDQUFDLGNBQUY7QUFDQSxnQkFBSSxRQUFRLEdBQUc7QUFDYixjQUFBLFNBQVMsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQURuQztBQUViLGNBQUEsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLEtBRmpDO0FBR2IsY0FBQSxLQUFLLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsS0FIM0I7QUFJYixjQUFBLFFBQVEsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUpqQztBQUtiLGNBQUEsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLEtBTGpDO0FBTWI7QUFDQSxjQUFBLFVBQVUsRUFBRTtBQVBDLGFBQWY7O0FBU0EsNkJBQUksY0FBSixDQUFvQixnQkFBZSxRQUFRLENBQUMsS0FBTSxFQUFsRCxFQUFxRCxJQUFyRCxDQUEwRCxRQUFRLElBQUk7QUFDcEUsa0JBQUksUUFBUSxDQUFDLE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDekIscUJBQUssYUFBTCxDQUFtQixRQUFuQjtBQUNELGVBRkQsTUFFTztBQUNMLGdCQUFBLEtBQUssQ0FBQyxtQ0FBRCxDQUFMO0FBQ0Q7QUFDRixhQU5EO0FBT0QsV0FuQk0sTUFtQkE7QUFBRSxZQUFBLEtBQUssQ0FBQyxpREFBRCxDQUFMO0FBQTBEO0FBQ3BFLFNBM0JELE1BMkJPO0FBQ0wseUJBQVcsU0FBWDtBQUNEO0FBQ0YsT0EvQkQ7QUFnQ0QsS0FqQ0Q7QUFrQ0QsR0EvQ21COztBQWlEcEIsRUFBQSxhQUFhLENBQUMsSUFBRCxFQUFPO0FBQ2xCLHFCQUFJLGNBQUosQ0FBb0IsbUJBQWtCLElBQUksQ0FBQyxRQUFTLEVBQXBELEVBQXVELElBQXZELENBQTRELElBQUksSUFBSTtBQUNsRSxVQUFJLElBQUksQ0FBQyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLHlCQUFJLFFBQUosQ0FBYSxPQUFiLEVBQXNCLElBQXRCLEVBQTRCLElBQTVCLENBQWlDLE9BQU8sSUFBSTtBQUMxQyxjQUFJLFdBQVcsR0FBRyxJQUFJLG9CQUFLLElBQVQsQ0FBYyxPQUFkLENBQWxCO0FBQ0EsVUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDBCQUFaLEVBQXdDLFdBQXhDLEVBRjBDLENBRzFDO0FBQ0E7O0FBQ0EsZUFBSyxXQUFMLENBQWlCLFdBQWpCO0FBQ0QsU0FORDtBQU9ELE9BUkQsTUFRTyxJQUFJLElBQUksQ0FBQyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQzVCLFFBQUEsS0FBSyxDQUFFLGFBQVksSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRLFFBQVMsaURBQS9CLENBQUw7QUFDRDtBQUNGLEtBWkQ7QUFhRCxHQS9EbUI7O0FBaUVwQjtBQUNBLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTztBQUNoQixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWjtBQUNBLElBQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsYUFBdkIsRUFBc0MsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLENBQXRDO0FBQ0EsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxTQUFsQyxHQUE4QyxFQUE5Qzs7QUFDQSxpQkFBTyxVQUFQOztBQUNBLDRCQUFvQixnQkFBcEI7QUFDRDs7QUF4RW1CLENBQXRCO2VBMkVlLGE7Ozs7Ozs7Ozs7QUNqRmY7QUFFQSxNQUFNLFVBQVUsR0FBRztBQUNqQixFQUFBLElBQUksR0FBSTtBQUNOLFFBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsY0FBYyxDQUFDLFdBQTFCLENBQW5CO0FBQ0UsV0FBTyxZQUFQO0FBQ0g7O0FBSmdCLENBQW5CO2VBVWUsVTs7Ozs7Ozs7Ozs7QUNaZjs7QUFDQTs7QUFDQTs7OztBQUdBLE1BQU0sVUFBVSxHQUFHO0FBRWpCO0FBQ0EsRUFBQSxlQUFlLEdBQUk7QUFDakIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsR0FBd0QsRUFBeEQ7QUFDQSxRQUFJLG9CQUFLLEtBQVQsQ0FBZ0IsSUFBaEIsRUFBc0I7QUFBQyxNQUFBLFNBQVMsRUFBRTtBQUFaLEtBQXRCLEVBQXdELGtCQUF4RCxFQUE0RSxNQUE1RSxDQUFtRixtQkFBbkY7QUFDQSxRQUFJLG9CQUFLLEdBQVQsQ0FBYztBQUFDLE1BQUEsRUFBRSxFQUFFO0FBQUwsS0FBZCxFQUFrQyxNQUFsQyxDQUF5QyxtQkFBekM7QUFDQSxRQUFJLG9CQUFLLEtBQVQsQ0FBZ0IsSUFBaEIsRUFBc0I7QUFBQyxNQUFBLFNBQVMsRUFBRTtBQUFaLEtBQXRCLEVBQXNELGdCQUF0RCxFQUF3RSxNQUF4RSxDQUErRSxtQkFBL0U7QUFDQSxRQUFJLG9CQUFLLEdBQVQsQ0FBYztBQUFDLE1BQUEsRUFBRSxFQUFFO0FBQUwsS0FBZCxFQUFnQyxNQUFoQyxDQUF1QyxtQkFBdkM7QUFDQSxTQUFLLE9BQUw7QUFDQSxTQUFLLFVBQUw7QUFDRCxHQVhnQjs7QUFhakI7QUFDQSxFQUFBLFVBQVUsQ0FBRSxRQUFGLEVBQVk7QUFDcEIsUUFBSSxlQUFKOztBQUVBLFFBQUksUUFBUSxDQUFDLFFBQWIsRUFBdUI7QUFDckIsTUFBQSxlQUFlLEdBQUcsV0FBbEI7QUFDRCxLQUZELE1BRU87QUFDTCxNQUFBLGVBQWUsR0FBRyxhQUFsQjtBQUNEOztBQUVELFFBQUksb0JBQUssT0FBVCxDQUFrQjtBQUFDLE1BQUEsU0FBUyxFQUFFLE1BQVo7QUFBb0IsTUFBQSxFQUFFLEVBQUcsR0FBRSxRQUFRLENBQUMsRUFBRztBQUF2QyxLQUFsQixFQUNBLElBQUksb0JBQUssUUFBVCxFQURBLEVBRUEsSUFBSSxvQkFBSyxHQUFULENBQWE7QUFBQyxNQUFBLFNBQVMsRUFBRTtBQUFaLEtBQWIsRUFBNEMsUUFBUSxDQUFDLElBQXJELENBRkEsRUFHQSxJQUFJLG9CQUFLLEdBQVQsQ0FBYTtBQUFDLE1BQUEsU0FBUyxFQUFFO0FBQVosS0FBYixFQUE0QyxRQUFRLENBQUMsT0FBckQsQ0FIQSxFQUcrRCxNQUgvRCxDQUdzRSxlQUh0RTtBQUlELEdBM0JnQjs7QUE2QmpCO0FBQ0EsRUFBQSxVQUFVLEdBQUs7QUFDYixxQkFBSSxjQUFKLENBQW9CLGlCQUFnQix3QkFBVyxJQUFYLEdBQWtCLEVBQUcsMkJBQXpELEVBQXFGO0FBQXJGLEtBQ0MsSUFERCxDQUNNLFFBQVEsSUFBSztBQUNqQixNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLElBQUksSUFBSTtBQUN6QixhQUFLLFVBQUwsQ0FBZ0IsSUFBaEI7QUFBc0IsT0FEdEI7QUFFQSxXQUFLLFVBQUw7QUFDQSxXQUFLLFdBQUw7QUFDRCxLQU5EO0FBT0QsR0F0Q2dCOztBQXdDakI7QUFDQTtBQUNBLEVBQUEsVUFBVSxHQUFJO0FBQ1osVUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLHNCQUExQixDQUFuQixDQURZLENBR1o7O0FBQ0EsSUFBQSxVQUFVLENBQUMsT0FBWCxDQUFxQixRQUFELElBQWM7QUFDaEMsVUFBSSxRQUFRLENBQUMsVUFBVCxDQUFvQixVQUFwQixDQUErQixFQUEvQixLQUFzQyxVQUExQyxFQUFzRDtBQUNwRCxRQUFBLFFBQVEsQ0FBQyxPQUFULEdBQW1CLElBQW5CO0FBQ0Q7O0FBQ0QsTUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBcUMsQ0FBRCxJQUFPO0FBQ3pDLFlBQUksYUFBSixDQUR5QyxDQUV6Qzs7QUFDQSxZQUFJLENBQUMsQ0FBQyxNQUFGLENBQVMsT0FBYixFQUFzQjtBQUNwQixVQUFBLGFBQWEsR0FBRztBQUFDLFlBQUEsUUFBUSxFQUFFLElBQVgsQ0FDaEI7O0FBRGdCLFdBQWhCOztBQUVBLDJCQUFJLFVBQUosQ0FBZSxPQUFmLEVBQXlCLEdBQUUsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxVQUFULENBQW9CLEVBQUcsRUFBbEQsRUFBcUQsYUFBckQsRUFDRyxJQURILENBQ1EsTUFBTSxLQUFLLGVBQUwsRUFEZDtBQUVELFNBTEQsTUFLTztBQUNMO0FBQ0EsVUFBQSxhQUFhLEdBQUc7QUFBQyxZQUFBLFFBQVEsRUFBRTtBQUFYLFdBQWhCOztBQUNBLDJCQUFJLFVBQUosQ0FBZSxPQUFmLEVBQXlCLEdBQUUsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxVQUFULENBQW9CLEVBQUcsRUFBbEQsRUFBcUQsYUFBckQsRUFDRyxJQURILENBQ1EsTUFBTSxLQUFLLGVBQUwsRUFEZDtBQUVEO0FBQ0YsT0FkRDtBQWVELEtBbkJEO0FBcUJELEdBbkVnQjs7QUFxRWpCO0FBQ0EsRUFBQSxXQUFXLEdBQUk7QUFDYjtBQUNBLFFBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixTQUExQixDQUFmLENBRmEsQ0FJYjs7QUFDQSxJQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLE9BQU8sSUFBSTtBQUMxQixNQUFBLE9BQU8sQ0FBQyxnQkFBUixDQUF5QixPQUF6QixFQUFtQyxDQUFELElBQU87QUFDdkM7QUFDQSxjQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBRixDQUFTLFVBQVQsQ0FBb0IsRUFBL0IsQ0FGdUMsQ0FJdkM7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsWUFBSSxDQUFDLENBQUMsTUFBRixDQUFTLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsZ0JBQTVCLENBQUosRUFBbUQ7QUFDakQsZ0JBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFGLENBQVMsV0FBMUI7QUFDQSxjQUFJLGFBQWEsR0FBSSx3Q0FBdUMsUUFBUyxJQUFyRTtBQUNBLFVBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFILENBQUQsQ0FBWSxXQUFaLENBQXdCLGFBQXhCO0FBQ0EsZ0JBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQWxCO0FBQ0UsVUFBQSxTQUFTLENBQUMsZ0JBQVYsQ0FBMkIsU0FBM0IsRUFBdUMsQ0FBRCxJQUFPO0FBQzNDLGdCQUFJLENBQUMsQ0FBQyxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEIsb0JBQU0sU0FBUyxHQUFHO0FBQUMsZ0JBQUEsSUFBSSxFQUFFLFNBQVMsQ0FBQztBQUFqQixlQUFsQjs7QUFDQSwrQkFBSSxVQUFKLENBQWUsT0FBZixFQUF3QixFQUF4QixFQUE0QixTQUE1QixFQUNHLElBREgsQ0FDUSxNQUFNLEtBQUssZUFBTCxFQURkO0FBRUQ7QUFDRixXQU5ELEVBTCtDLENBWW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0MsU0FoQkQsTUFnQk8sSUFBSSxDQUFDLENBQUMsTUFBRixDQUFTLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsZ0JBQTVCLENBQUosRUFBbUQ7QUFDeEQsZ0JBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFGLENBQVMsV0FBMUI7QUFDQSxjQUFJLFlBQVksR0FBSSx3Q0FBdUMsUUFBUyxJQUFwRTtBQUNBLFVBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFILENBQUQsQ0FBWSxXQUFaLENBQXdCLFlBQXhCO0FBQ0UsZ0JBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQXRCO0FBQ0EsVUFBQSxhQUFhLENBQUMsZ0JBQWQsQ0FBK0IsUUFBL0IsRUFBMEMsQ0FBRCxJQUFPO0FBQzVDLGtCQUFNLFNBQVMsR0FBRztBQUFDLGNBQUEsT0FBTyxFQUFFLGFBQWEsQ0FBQztBQUF4QixhQUFsQjs7QUFDQSw2QkFBSSxVQUFKLENBQWUsT0FBZixFQUF3QixFQUF4QixFQUE0QixTQUE1QixFQUNHLElBREgsQ0FDUSxNQUFNLEtBQUssZUFBTCxFQURkO0FBRUgsV0FKRDtBQUtIO0FBQ0YsT0FuQ0Q7QUFvQ0QsS0FyQ0Q7QUF1Q0QsR0FsSGdCOztBQW9IakI7QUFDQSxFQUFBLE9BQU8sR0FBSTtBQUNULFFBQUksb0JBQUssT0FBVCxDQUFrQjtBQUFDLE1BQUEsU0FBUyxFQUFFO0FBQVosS0FBbEIsRUFDQSxJQUFJLG9CQUFLLEdBQVQsQ0FBYyxHQUFkLENBREEsRUFFQSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLE1BQUEsRUFBRSxFQUFFLGFBQUw7QUFBb0IsTUFBQSxJQUFJLEVBQUUsTUFBMUI7QUFBa0MsTUFBQSxXQUFXLEVBQUU7QUFBL0MsS0FBZixDQUZBLEVBR0EsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLEVBQUUsRUFBRSxhQUFMO0FBQW9CLE1BQUEsSUFBSSxFQUFFO0FBQTFCLEtBQWYsQ0FIQSxFQUdtRCxNQUhuRCxDQUcwRCxhQUgxRDtBQUtBLFVBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQSxVQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUFuQjtBQUNBLFVBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLENBQW5CLENBUlMsQ0FVVDs7QUFDQSxJQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFrQyxDQUFELElBQU87QUFDdEMsVUFBSSxVQUFVLENBQUMsS0FBWCxLQUFxQixFQUFyQixJQUEyQixVQUFVLENBQUMsS0FBWCxLQUFxQixFQUFwRCxFQUF3RDtBQUN0RDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUksUUFBUSxHQUFHO0FBQ2IsVUFBQSxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBREo7QUFFYixVQUFBLFFBQVEsRUFBRSxLQUZHO0FBR2IsVUFBQSxPQUFPLEVBQUUsVUFBVSxDQUFDLEtBSFA7O0FBSWI7OztBQUdBLFVBQUEsTUFBTSxFQUFFLHdCQUFXLElBQVgsR0FBa0I7QUFQYixTQUFmOztBQVNBLHlCQUFJLFFBQUosQ0FBYSxPQUFiLEVBQXNCLFFBQXRCLEVBQWdDLElBQWhDLENBQXFDLElBQUksSUFBSTtBQUMzQyxlQUFLLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDQSxlQUFLLFVBQUw7QUFDQSxlQUFLLFdBQUw7QUFDRCxTQUpEOztBQUtBLFFBQUEsVUFBVSxDQUFDLEtBQVgsR0FBbUIsRUFBbkI7QUFDQSxRQUFBLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLEVBQW5CO0FBQ0Q7QUFDRixLQXJCRDtBQXNCRDs7QUF0SmdCLENBQW5CO2VBeUplLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWxlbWVudFN5bWJvbCA9IFN5bWJvbCgpXG5cbmNsYXNzIERPTUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgSWYgYGF0dHJpYnV0ZXNgIGlzIGp1c3QgYSBzdHJpbmcsIGl0J3MgYSBzaW1wbGUgZWxlbWVudCB3aXRoIG5vXG4gICAgICAgICAgICBwcm9wZXJ0aWVzIC0ganVzdCBzb21lIHRleHQgY29udGVudFxuICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gT2JqZWN0LmFzc2lnbih0aGlzW2VsZW1lbnRTeW1ib2xdLCBhdHRyaWJ1dGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25lIEhUTUxFbGVtZW50IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoY2hpbGQuZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBbiBhcnJheSBvZiBlbGVtZW50cyB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVsZW1lbnQuZm9yRWFjaChjID0+IHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoYykpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nIHZhbHVlIHdhcyBwYXNzZWQgaW4sIHNldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2VsZW1lbnRTeW1ib2xdXG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzW2VsZW1lbnRTeW1ib2xdKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERPTUNvbXBvbmVudFxuIiwiY29uc3QgVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODgvXCJcblxuY29uc3QgQVBJID0ge1xuICBnZXRBbGxDYXRlZ29yeShjYXRlZ29yeSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gKVxuICAgICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBnZXRPbmVGcm9tQ2F0ZWdvcnkoY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fS8ke2lkfWApXG4gICAgICAudGhlbihpbnB1dHMgPT4gaW5wdXRzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSXRlbShjYXRlZ29yeSwgaXRlbSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfVxuICAgICkudGhlbihqc29uRGF0YSA9PiBqc29uRGF0YS5qc29uKCkpXG4gIH0sXG5cbiAgZGVsZXRlSXRlbShjYXRlZ29yeSwgaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9LyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgdXBkYXRlSXRlbShjYXRlZ29yeSwgaWQsIGl0ZW0pe1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0vJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgIH1cbiAgICApXG5cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiaW1wb3J0IERPTUNvbXBvbmVudCBmcm9tIFwiLi4vbGliL25vZGVfbW9kdWxlcy9uc3MtZG9tY29tcG9uZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5jcmVhdGUobnVsbCwge1xyXG5cclxuICB1c2VyOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgVXNlciB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKHRlbXBJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IHRlbXBJbmZvLmlkO1xyXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGVtcEluZm8uZmlyc3ROYW1lO1xyXG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSB0ZW1wSW5mby5sYXN0TmFtZTtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdGVtcEluZm8udXNlcm5hbWU7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHRlbXBJbmZvLnBhc3N3b3JkO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSB0ZW1wSW5mby5lbWFpbDtcclxuICAgICAgICB0aGlzLnByb2ZpbGVQaWMgPSB0ZW1wSW5mby5wcm9maWxlUGljO1xyXG4gICAgfVxyXG4gICAgLy9UT0RPOiB0aGlzIGlzIGp1c3QgYSB0ZXN0IGZ1bmN0aW9uLiB3ZSB3b3VsZCBoYXZlIHRoZSBhYmlsaXR5IHRvIGNhbGwgZm9yIHNhdmluZ1xyXG4gICAgLy8gbWVzc2FnZXMsYXJ0aWNsZXMsIGV2ZW50cyBiZSByZWZlcmVuY2luZyBhIGZ1bmN0aW9uIGRlZmluZWQgaGVyZVxyXG4gICAgICB0ZXN0KCkge1xyXG4gICAgICAgIHJldHVybiBgV2VsY29tZSAke3RoaXMuZmlyc3ROYW1lfSEgTGV0J3Mgc2VlIHdoYXQncyBnb2luZyBvbi5gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZGl2OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgZGl2IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImRpdlwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnRuOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYnRuIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJidG5cIiwgdHlwZTogXCJidXR0b25cIiB9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW5wdXQ6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBpbnB1dCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbnB1dFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VjdGlvbjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHNlY3Rpb24gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwic2VjdGlvblwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGl0bGU6IHsgLy9kZWZpbmUgYW55IHR5cGUgb2YgaCMuLiBoMSwgaDIsIGV0Yy5cclxuICAgIHZhbHVlOiBjbGFzcyB0aXRsZSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBhbmNob3I6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBhbmNob3IgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2hlY2tib3g6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBjaGVja2JveCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgY2xhc3NOYW1lOiBcImNiXCIgfSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGltYWdlOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW1hZ2UgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW1nXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsaToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxpIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxpXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgZm9ybSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJmb3JtXCIsIHt9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGFiZWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsYWJlbCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsYWJlbFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGV4dGFyZWE6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB0ZXh0YXJlYSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ0ZXh0YXJlYVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFyOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgcGFyIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInBcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNwYW46IHtcclxuICAgIHZhbHVlOiBjbGFzcyBzcGFuIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInNwYW5cIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcbmltcG9ydCBhY3RpdmVVc2VyIGZyb20gXCIuL3Nlc3Npb25TdG9yYWdlXCJcclxuXHJcblxyXG5jb25zdCBidWlsZEV2ZW50cyA9IHtcclxuXHJcbiAgYnVpbGRDb250YWluZXJzKCkge1xyXG4gICAgLy8gYnVpbGRzIHRoZSB0d28gY29udGFpbmVycyB0byBob2xkIGV2ZXJ5dGhpbmdcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAvLyBidXR0b24gZm9yIG5ldyBldmVudFxyXG4gICAgY29uc3QgbmV3QnRuID0gbmV3IGNvbXAuZGl2KHsgaWQ6IFwibmV3RXZlbnRCdG5cIn0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDNcIiwgXCJOZXcgRXZlbnQhXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCIrXCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG5cclxuICAgIC8vIGNvbnRhaW5lcnNcclxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge1xyXG4gICAgICBjbGFzc05hbWU6IFwidGl0bGUtLXVwY29taW5nXCJcclxuICAgIH0sIFwiVXBjb21pbmcgRXZlbnRcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIG5ldyBjb21wLmRpdih7XHJcbiAgICAgIGlkOiBcInVwY29taW5nXCJcclxuICAgIH0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHtcclxuICAgICAgY2xhc3NOYW1lOiBcInRpdGxlLS1wYXN0XCJcclxuICAgIH0sIFwiUGFzdCBFdmVudFwiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbmV3IGNvbXAuZGl2KHtcclxuICAgICAgaWQ6IFwicGFzdFwiXHJcbiAgICB9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgLy8gdGhpcy5uZXdUYXNrKClcclxuICAgIHRoaXMubmV3RXZlbnRCdXR0b24oKTtcclxuICAgIHRoaXMuZXZlbnRGZXRjaCgpXHJcbiAgICB9LFxyXG5cclxuICBwcmludEV2ZW50cyhldmVudE9iaikge1xyXG4gICAgLy8gdGFrZXMgdGhlIG9iamVjdHMgZnJvbSB0aGUgYXBpIGFuZCBwcmludHMgdGhlbSB0byB0aGUgZG9tXHJcbiAgICBsZXQgb3V0cHV0Q29udGFpbmVyO1xyXG5cclxuICAgIC8vIFRPRE86bmVlZCB0byB0ZXN0IGlmIGRhdGUgaXMgaW4gdGhlIGZ1dHVyZSBvciB0aGUgcGFzdFxyXG5cclxuICAgIG91dHB1dENvbnRhaW5lciA9IFwiI3VwY29taW5nXCJcclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgY29tcC5zZWN0aW9uKHtcclxuICAgICAgICBjbGFzc05hbWU6IFwiZXZlbnRcIixcclxuICAgICAgICBpZDogYCR7ZXZlbnRPYmouaWR9YFxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC5kaXYgKCB7fSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoM1wiLCBgJHtldmVudE9iai5uYW1lfWApLFxyXG4gICAgICBuZXcgY29tcC5wYXIoYCR7ZXZlbnRPYmouZGF0ZX0gJHtldmVudE9iai50aW1lfWApLFxyXG4gICAgICBuZXcgY29tcC5wYXIoYCR7ZXZlbnRPYmoubG9jYXRpb259YCkpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJFZGl0XCIpKS5yZW5kZXIob3V0cHV0Q29udGFpbmVyKVxyXG4gIH0sXHJcblxyXG4gIG5leHRFdmVudCgpIHtcclxuICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBjb21pbmdcIikuZmlyc3RDaGlsZClcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBjb21pbmdcIikuZmlyc3RDaGlsZC5jbGFzc0xpc3QuYWRkKFwibmV4dEV2ZW50XCIpO1xyXG4gIH0sXHJcblxyXG4gIGV2ZW50RmV0Y2goKSB7XHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYGV2ZW50cy8/dXNlcklkPSR7YWN0aXZlVXNlci5pbmZvKCkuaWR9Jl9zb3J0PWRhdGUsdGltZSZfb3JkZXI9YXNjYCkgLy9jaGVjayBpZiB1c2VyIGlzIHNhbWUgYXMgc2Vzc2lvbiBzdG9yYWdlXHJcbiAgICAgIC50aGVuKGV2ZW50T2JqID0+IHtcclxuICAgICAgICBldmVudE9iai5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMucHJpbnRFdmVudHMoZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBidWlsZEV2ZW50cy5uZXh0RXZlbnQoKTtcclxuICAgICAgICBidWlsZEV2ZW50cy5lZGl0QnRuTGlzdGVuKClcclxuICAgICAgfSlcclxuICB9LFxyXG5cclxuICBuZXdFdmVudEJ1dHRvbigpIHtcclxuICAgIC8vIHdoZW4gY2xpY2tlZCBpdCBjbGVhcnMgdGhlIGRvbSBhbmQgY2FsbHMgdGhlIGZ1bmN0aW9uIHRvIGJ1aWxkIHRoZSBmb3JtXHJcbiAgICAkKFwiI25ld0V2ZW50QnRuXCIpLmNsaWNrKFxyXG4gICAgICBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQoXCIuY29udGFpbmVyLS1pbm5lclwiKS50ZXh0KFwiXCIpXHJcbiAgICAgICAgYnVpbGRFdmVudHMubmV3RXZlbnRQb3BVcCgpO1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgbmV3RXZlbnRQb3BVcCgpIHtcclxuICAgIC8vIEJ1aWxkcyBuZXcgZXZlbnQgZW50cnkgZm9ybVxyXG4gICAgbGV0IGRpdjIgPSBuZXcgY29tcC5kaXYoe1xyXG4gICAgICAgIGNsYXNzTGlzdDogXCJuZXdFdmVudEZvcm1cIlxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCJ9LCBcIkFkZCBBIE5ldyBFdmVudFwiKSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJFdmVudCBOYW1lXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwidGV4dFwifSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiRGF0ZVwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwiZGF0ZVwifSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiVGltZVwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwidGltZVwifSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiTG9jYXRpb25cIiksXHJcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJ0ZXh0XCJ9KSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiU2F2ZVwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiQmFja1wiKSlcclxuICAgIGRpdjIucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGJ1aWxkRXZlbnRzLm5ld0V2ZW50UG9wVXBCdG5DbGlja3MoKTtcclxuICB9LFxyXG5cclxuICBuZXdFdmVudFBvcFVwQnRuQ2xpY2tzKCkge1xyXG4gICAgLy8gZ3JhYnMgdGhlIHR3byBidXR0b25zIG9uIHRoZSBwYWdlIGFuZCBhZGRzIGEgY2xpY2sgbGlzdGVuZXIgYmFzZWQgb24gaW5kZXhcclxuICAgIGNvbnN0IHBvcFVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIik7XHJcbiAgICBwb3BVcEJ0bnNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgLy8gU2F2ZSBCdXR0b25cclxuICAgICAgY29uc3QgaW5wdXRBcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcclxuICAgICAgLy8gYnVpbGRzIG9iamVjdCB0byBzZW5kIHRvIGFwaVxyXG4gICAgICBjb25zdCBuZXdFdmVudE9iaiA9IHtcclxuICAgICAgICBuYW1lOiBpbnB1dEFycmF5WzBdLnZhbHVlLFxyXG4gICAgICAgIGRhdGU6IGlucHV0QXJyYXlbMV0udmFsdWUsXHJcbiAgICAgICAgdGltZTogaW5wdXRBcnJheVsyXS52YWx1ZSxcclxuICAgICAgICBsb2NhdGlvbjogaW5wdXRBcnJheVszXS52YWx1ZSxcclxuICAgICAgICB1c2VySWQ6IGFjdGl2ZVVzZXIuaW5mbygpLmlkXHJcbiAgICAgIH1cclxuICAgICAgLy8gc2F2ZXMgbmV3IGV2ZW50IHRvIEFQSVxyXG4gICAgICBBUEkuc2F2ZUl0ZW0oXCJldmVudHNcIiwgbmV3RXZlbnRPYmopLnRoZW4oKCkgPT4ge1xyXG4gICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTtcclxuICAgICB9KSB9KVxyXG5cclxuICAgIC8vIEJhY2sgQnV0dG9uIFJldHVybnMgdG8gRXZlbnQgUGFnZVxyXG4gICAgcG9wVXBCdG5zWzFdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgfSlcclxuICB9LFxyXG4gIGVkaXRCdG5MaXN0ZW4gKCkge1xyXG4gICAgLy8gbGlzdGVucyBmb3IgYWxsIHRoZSBlZGl0IGJ1dHRvbnMgb24gdGhlIHBhZ2VcclxuICAgIGNvbnN0IGFsbFRoZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VjdGlvbiA+IGJ1dHRvblwiKTtcclxuICAgIGFsbFRoZUJ1dHRvbnMuZm9yRWFjaChjdXJyZW50QnRuID0+IHtcclxuICAgICAgY3VycmVudEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vIHRha2VzIHRoZSBpZCBvZiB0aGUgZXZlbnQgdGhhdCB3YXMgY2xpY2tzLCBmZXRjaGVzIGZyb20gdGhlIGFwaSB3aXRoIHRoYXQgaWQgYW5kIHBhc3NlcyBvbiB0byB0aGUgRWRpdCBFbGVtZW50IGZvcm1cclxuICAgICAgICBjb25zdCBjdXJyZW50QnRuSWQgPSBjdXJyZW50QnRuLnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgQVBJLmdldE9uZUZyb21DYXRlZ29yeShcImV2ZW50c1wiLCBjdXJyZW50QnRuSWQpXHJcbiAgICAgICAgICAudGhlbihzaW5nbGVFdmVudCA9PiB7XHJcbiAgICAgICAgICAgICQoXCIuY29udGFpbmVyLS1pbm5lclwiKS50ZXh0KFwiXCIpXHJcbiAgICAgICAgICAgIGJ1aWxkRXZlbnRzLmV2ZW50RWRpdEZvcm0oc2luZ2xlRXZlbnQsIGN1cnJlbnRCdG5JZClcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZXZlbnRFZGl0Rm9ybShzaW5nbGVFdmVudE9iaikge1xyXG4gICAgLy8gYnVpbGRzIEVkaXQgZm9ybVxyXG4gICAgLy8gdGFrZXMgdGhlIHJldHVybiBmcm9tIHRoZSBmZXRjaFxyXG4gICAgbGV0IGRpdjIgPSBuZXcgY29tcC5kaXYoe1xyXG4gICAgICBjbGFzc0xpc3Q6IFwibmV3RXZlbnRGb3JtXCJcclxuICAgIH0sXHJcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCJ9LCBcIkVkaXQgWW91ciBFdmVudFwiKSxcclxuICAgIG5ldyBjb21wLmxhYmVsKFwiRXZlbnQgTmFtZVwiKSxcclxuICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBgJHtzaW5nbGVFdmVudE9iai5uYW1lfWB9KSxcclxuICAgIG5ldyBjb21wLmxhYmVsKFwiRGF0ZVwiKSxcclxuICAgIG5ldyBjb21wLmlucHV0KHt0eXBlOiBcImRhdGVcIiwgdmFsdWU6IGAke3NpbmdsZUV2ZW50T2JqLmRhdGV9YH0pLFxyXG4gICAgbmV3IGNvbXAubGFiZWwoXCJUaW1lXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwidGltZVwiLCB2YWx1ZTogYCR7c2luZ2xlRXZlbnRPYmoudGltZX1gfSksXHJcbiAgICBuZXcgY29tcC5sYWJlbChcIkxvY2F0aW9uXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGAke3NpbmdsZUV2ZW50T2JqLmxvY2F0aW9ufWB9KSxcclxuICAgIG5ldyBjb21wLmJ0bihcIlNhdmVcIiksXHJcbiAgICBuZXcgY29tcC5idG4oXCJCYWNrXCIpKVxyXG4gIGRpdjIucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICBidWlsZEV2ZW50cy5lZGl0RXZlbnRQb3BVcEJ0bkNsaWNrcyhzaW5nbGVFdmVudE9iai5pZCk7XHJcbiAgfSxcclxuICBlZGl0RXZlbnRQb3BVcEJ0bkNsaWNrcyhpZCkge1xyXG4gICAgLy8gZ3JhYnMgdGhlIHR3byBidXR0b25zIG9uIHRoZSBwYWdlIGFuZCBhZGRzIGEgY2xpY2sgbGlzdGVuZXIgYmFzZWQgb24gaW5kZXhcclxuICAgIC8vIHRha2VzIHRoZSBldmVudCBpZCBzbyBpdCBjYW4gYmUgcGFzc2VkIG9uIHdpdGggdGhlIFBBVENIXHJcbiAgICBjb25zdCBwb3BVcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpO1xyXG4gICAgcG9wVXBCdG5zWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIC8vIFNhdmUgQnV0dG9uXHJcbiAgICAgIGNvbnN0IGlucHV0QXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XHJcbiAgICAgIC8vIGJ1aWxkcyBvYmplY3QgdG8gc2VuZCB0byBhcGlcclxuICAgICAgY29uc3QgZWRpdEV2ZW50T2JqID0ge1xyXG4gICAgICAgIG5hbWU6IGlucHV0QXJyYXlbMF0udmFsdWUsXHJcbiAgICAgICAgZGF0ZTogaW5wdXRBcnJheVsxXS52YWx1ZSxcclxuICAgICAgICB0aW1lOiBpbnB1dEFycmF5WzJdLnZhbHVlLFxyXG4gICAgICAgIGxvY2F0aW9uOiBpbnB1dEFycmF5WzNdLnZhbHVlLFxyXG4gICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWRcclxuICAgICAgfVxyXG4gICAgICAvLyBzYXZlcyBuZXcgZXZlbnQgdG8gQVBJXHJcbiAgICAgIEFQSS51cGRhdGVJdGVtKFwiZXZlbnRzXCIsIGlkLCBlZGl0RXZlbnRPYmopLnRoZW4oKCkgPT4ge1xyXG4gICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTtcclxuICAgICB9KSB9KVxyXG5cclxuICAgIC8vIEJhY2sgQnV0dG9uIFJldHVybnMgdG8gRXZlbnQgUGFnZVxyXG4gICAgcG9wVXBCdG5zWzFdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgfSlcclxuICB9LFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRFdmVudHMiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxyXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXHJcblxyXG5jb25zdCBsYW5kaW5nUGFnZUZ1bmNzID0ge1xyXG4gIGxvYWRMYW5kaW5nUGFnZSgpIHtcclxuICAgIG5ldyBjb21wLmRpdihcclxuICAgICAgeyBjbGFzc0xpc3Q6IFwid2VsY29tZVwiIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIiB9LCBcIldlbGNvbWUgdG8gTWlzc2lvbiBDb250cm9sXCIpLFxyXG4gICAgICBuZXcgY29tcC5kaXYoe2NsYXNzTmFtZTogXCJXZWxjb21lTmF2XCJ9LFxyXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge2NsYXNzTmFtZTogXCJsb2dJbk5hdlwifSwgXCJMb2cgSW5cIiksXHJcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7Y2xhc3NOYW1lOiBcImxvZ0luTmF2XCJ9LCBcIlJlZ2lzdGVyXCIpKSxcclxuICAgICAgbmV3IGNvbXAuZGl2KHtjbGFzc05hbWU6IFwiTG9nSW5cIn0pKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG5cclxuICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubG9nSW5OYXZcIikuZm9yRWFjaCgoZWxlbWVudCk9PntcclxuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKT0+e1xyXG4gICAgICAgICAgICBpZihlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJMb2cgSW5cIil7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgaGF2ZSBzZWxlY3RlZCB0aGUgbG9nIGluIGZvcm1cIilcclxuICAgICAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJSZWdpc3RlclwiKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBoYXZlIHNlbGVjdGVkIHRoZSByZWdpc3RlciBmb3JtXCIpXHJcbiAgICAgICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG59XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhbmRpbmdQYWdlRnVuY3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiO1xuaW1wb3J0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgZnJvbSBcIi4vbWlzc2lvbkNvbnRyb2xcIjtcbmltcG9ydCBuYXZCYXIgZnJvbSBcIi4vbmF2XCI7XG5cbmNvbnN0IGxvZ0luRnVuY3MgPSB7XG4gIGNoZWNrVXNlcih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBpZiAodXNlcm5hbWUgPT09IFwiXCIgfHwgcGFzc3dvcmQgPT09XCJcIikge1xuICAgICAgYWxlcnQoXCJZb3UgbXVzdCBlbnRlciBib3RoIHlvdXIgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHRvIGxvZyBpbi5cIilcbiAgICB9IGVsc2Uge1xuICAgICAgQVBJLmdldEFsbENhdGVnb3J5KGB1c2Vycy8/dXNlcm5hbWU9JHt1c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIG5vIHVzZXIgd2l0aCB0aGF0IHVzZXJuYW1lLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAocGFzc3dvcmQgPT09IGRhdGFbMF0ucGFzc3dvcmQpIHtcbiAgICAgICAgICBsZXQgY3VycmVudFVzZXIgPSBuZXcgY29tcC51c2VyIChkYXRhWzBdKTtcbiAgICAgICAgICByZXR1cm4gY3VycmVudFVzZXI7XG4gICAgICAgIH0gZWxzZSAoIGFsZXJ0KFwiWW91IGVudGVyZWQgdGhlIHdyb25nIHBhc3N3b3JkLiBUcnkgYWdhaW4uXCIpKVxuICAgICAgfSkudGhlbihjdXJyZW50VXNlciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRVc2VyKVxuICAgICAgICBpZiAoY3VycmVudFVzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnVpbGQgTWlzc2lvbiBMb2dpblwiKVxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VXNlcikpO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2QmFyXCIpLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgbmF2QmFyLmxvYWROYXZCYXIoKTtcbiAgICAgICAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbG9hZExvZ0luKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuTG9nSW5cIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIsIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJ1c2VybmFtZVwiLCBpZDogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwiIH0pKS5yZW5kZXIoXCIuTG9nSW5cIilcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcInBhc3N3b3JkXCIgfSwgXCJQYXNzd29yZFwiLCBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwicGFzc3dvcmRcIiwgaWQ6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIiB9KSkucmVuZGVyKFwiLkxvZ0luXCIpXG4gICAgICBuZXcgY29tcC5idG4oXCJMb2dpbiBOb3dcIikucmVuZGVyKFwiLkxvZ0luXCIpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luIE5vd1wiKSB7XG4gICAgICAgICAgdGhpcy5jaGVja1VzZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbG9nSW5GdW5jcyIsImltcG9ydCBsYW5kaW5nUGFnZUZ1bmNzIGZyb20gXCIuL2xhbmRpbmdcIlxyXG5pbXBvcnQgbmF2QmFyIGZyb20gXCIuL25hdlwiXHJcblxyXG5uYXZCYXIubG9hZE5hdkJhcigpO1xyXG5sYW5kaW5nUGFnZUZ1bmNzLmxvYWRMYW5kaW5nUGFnZSgpO1xyXG4iLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXG5pbXBvcnQgYWN0aXZlVXNlciBmcm9tIFwiLi9zZXNzaW9uU3RvcmFnZVwiXG5cblxuY29uc3QgYnVpbGRNZXNzYWdlcyA9IHtcbiAgcHJpbnRNZXNzYWdlcyhtZXNzYWdlT2JqKSB7XG4gICAgaWYgKGFjdGl2ZVVzZXIuaW5mbygpLmlkID09PSBtZXNzYWdlT2JqLnVzZXIuaWQpIHtcbiAgICAgIG5ldyBjb21wLnNlY3Rpb24oe1xuICAgICAgICAgIGNsYXNzTmFtZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgaWQ6IGAke21lc3NhZ2VPYmouaWR9YFxuICAgICAgICB9LFxuICAgICAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHttZXNzYWdlT2JqLnVzZXIucHJvZmlsZVBpY31gLCBjbGFzc05hbWU6IFwibWVzc2FnZVBpY1wiLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIn0pLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHtjbGFzc05hbWU6IFwibWVzc2FnZUF1dGhvclwifSwgYCR7bWVzc2FnZU9iai51c2VyLmZpcnN0TmFtZX0gLSAke21lc3NhZ2VPYmouZGF0ZX0gJHttZXNzYWdlT2JqLnRpbWVTdGFtcH1gKSxcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCksXG4gICAgICAgIG5ldyBjb21wLmJ0bihcIkVkaXRcIikpLnJlbmRlcihcIi5vbGQtLW1lc3NhZ2VzXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBjb21wLnNlY3Rpb24oe1xuICAgICAgICAgIGNsYXNzTmFtZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgaWQ6IGAke21lc3NhZ2VPYmouaWR9YFxuICAgICAgICB9LFxuICAgICAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHttZXNzYWdlT2JqLnVzZXIucHJvZmlsZVBpY31gLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIiwgY2xhc3NOYW1lOiBcIm1lc3NhZ2VQaWNcIn0pLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHtjbGFzc05hbWU6XCJtZXNzYWdlQXV0aG9yXCJ9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBtZXNzYWdlT2JqLm1lc3NhZ2VDb250ZW50KSkucmVuZGVyKFwiLm9sZC0tbWVzc2FnZXNcIilcbiAgICB9XG4gIH0sXG5cbiAgbWVzc2FnZU1hcCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHtpZDogXCJtZXNzYWdlTmFtZVwifSwgXCJNZXNzYWdlc1wiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKTtcbiAgICBuZXcgY29tcC5kaXYoe2NsYXNzTmFtZTogXCJvbGQtLW1lc3NhZ2VzXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKTtcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJtZXNzYWdlcy8/X2V4cGFuZD11c2VyXCIpXG4gICAgICAudGhlbihtZXNzYWdlT2JqID0+IHtcblxuICAgICAgICBtZXNzYWdlT2JqLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAgICAgdGhpcy5wcmludE1lc3NhZ2VzKG1lc3NhZ2UpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubmV3TWVzc2FnZSgpO1xuICAgICAgICB0aGlzLnN1Ym1pdE1lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5lZGl0QnV0dG9uQ2xpY2soKTtcbiAgICAgIH0pLnRoZW4oKCkgPT4gdGhpcy5zY3JvbGxXaW5kb3dCdXR0b20oKSk7XG4gIH0sXG5cbiAgLy8gc2V0cyBzY3JvbGwgd2luZG93IHRvIGJvdHRvbSBvZiBvbGQtLW1lc3NhZ2VzIGNvbnRhaW5lclxuICBzY3JvbGxXaW5kb3dCdXR0b20oKSB7XG4gICAgbGV0IG1lc3NhZ2VXaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9sZC0tbWVzc2FnZXNcIik7XG4gICAgbWVzc2FnZVdpbmRvdy5zY3JvbGxUb3AgPSBtZXNzYWdlV2luZG93LnNjcm9sbEhlaWdodDtcbiAgfSxcblxuXG4gIC8vIGJ1aWxkcyBuZXcgbWVzc2FnZSBlbnRyeSBmaWVsZFxuICBuZXdNZXNzYWdlKCkge1xuICAgIC8vd3JhcHBlZCB0aGlzIGluIGEgZGl2IGluc3RlYWQgb2YgYSBzZWN0aW9uLCB0byBncmFiIHNlY3Rpb25zIGVhc2llci5cbiAgICBuZXcgY29tcC5kaXYoe1xuICAgICAgICBjbGFzc05hbWU6IFwibmV3LS1tZXNzYWdlXCIsXG4gICAgICAgIGlkOiBcIm5ld01lc3NhZ2VcIlxuICAgICAgfSxcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIFwiTmV3IE1lc3NhZ2VcIiksXG4gICAgICBuZXcgY29tcC50ZXh0YXJlYSh7XG4gICAgICAgIHBsYWNlaG9sZGVyOiBcInR5cGUgeW91ciBtZXNzYWdlIGhlcmVcIixcbiAgICAgICAgd3JhcDogXCJoYXJkXCJcbiAgICAgIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiU3VibWl0XCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG5cbiAgc3VibWl0TWVzc2FnZSgpIHtcbiAgICAkKFwiI25ld01lc3NhZ2UgPiBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIC8vaWYgc3RhdG1lbnQgdG8gcHJldmVudCBibGFuayBlbnRyaWVzXG4gICAgICBpZiAoJChcIiNuZXdNZXNzYWdlID4gdGV4dGFyZWFcIikudmFsKCkgPT09IFwiXCIpIHtcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgeW91ciBtZXNzYWdlXCIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgLy9jcmVhdGVzIG9iamVjdCBvZiBjdXJyZW50IG1vbWVudFxuICAgICAgICBsZXQgZGF0ZUFuZFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAvL2NvbnZlcnRzIGl0IGludG8gYSBzdHJpbmcgYW5kIHRoZW4gYW4gYXJyYXkgdG8gZ3JhYiBzcGVjaWZpYyB2YWx1ZXNcbiAgICAgICAgbGV0IGRhdGVBcnJheSA9IGRhdGVBbmRUaW1lLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpO1xuICAgICAgICAvL2dldE1vbnRoKCkgbWV0aG9kIHJldHVybnMgYSBudW1iZXIgYmV0d2VlbiAwLTExLiBBZGRlZCAxIHRvIGdldCBjdXJyZW50IG1vbnRoXG4gICAgICAgIGxldCBtb250aCA9IGRhdGVBbmRUaW1lLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAvL2J1aWxkcyBvYmplY3QgdG8gcGFzcyBpbnRvIGZldGNoXG4gICAgICAgIGxldCBzdWJtaXRNZXNzYWdlT2JqID0ge1xuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiAkKFwiI25ld01lc3NhZ2UgPiB0ZXh0YXJlYVwiKS52YWwoKSxcbiAgICAgICAgICB0aW1lU3RhbXA6IGRhdGVBcnJheVs0XSwgLy9UT0RPOiBtYWtlIGl0IG5vbiBtaWxpdGFyeSB0aW1lXG4gICAgICAgICAgZGF0ZTogYCR7bW9udGh9LyR7ZGF0ZUFycmF5WzJdfS8ke2RhdGVBcnJheVszXX1gLFxuICAgICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWRcblxuICAgICAgICB9XG4gICAgICAgIC8vIHNlbmQgdG8gQVBJXG4gICAgICAgIEFQSS5zYXZlSXRlbShcIm1lc3NhZ2VzXCIsIHN1Ym1pdE1lc3NhZ2VPYmopXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBlZGl0QnV0dG9uQ2xpY2soKSB7XG4gICAgLy8gZ3JhYnMgdGhlIGVkaXQgYnV0dG9uc1xuICAgICQoXCJzZWN0aW9uID4gYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyBzdG9yZXMgdGhlIG1lc3NhZ2UgaW4gYSB2YXJhYmxlXG4gICAgICBsZXQgbWVzc2FnZUgxID0gZS50YXJnZXQucHJldmlvdXNTaWJsaW5nXG4gICAgICAvLyBzdG9yZSBtZXNzYWdlJ3MgdGV4dCBpbiBhIHZhcmFibGVcbiAgICAgIGxldCBtZXNzYWdlVGV4dCA9IG1lc3NhZ2VIMS5pbm5lckhUTUw7XG4gICAgICAvLyByZXBsYWNlcyBFZGl0IGJ1dHRvbiB3aXRoIFNhdmUgYnV0dG9uXG4gICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aChcIjxidXR0b24gY2xhc3M9ICdidG4nIHR5cGUgPSdidXR0b24nPlNhdmU8L2J1dHRvbj5cIilcbiAgICAgIC8vIHJlcGxhY2VzIG1lc3NhZ2UgdGV4dCB3aXRoIGFuIGlucHV0IGZpZWxkXG4gICAgICAkKG1lc3NhZ2VIMSkucmVwbGFjZVdpdGgoYDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkID0gXCJlZGl0RmllbGRcIiB2YWx1ZT1cIiR7bWVzc2FnZVRleHR9XCI+YClcbiAgICAgIC8vIHN0b3JlcyB0aGUgbmV3IGlucHV0IGZpZWxkIGluIGEgdmFyYWJsZVxuICAgICAgY29uc3QgbmV3SW5wdXRGaWVsZCA9ICQoXCIjZWRpdEZpZWxkXCIpO1xuICAgICAgLy8gc2V0cyBhIGNsaWNrIGV2ZW50IG9uIHRoZSBuZXcgc2F2ZSBidXR0b25cbiAgICAgIG5ld0lucHV0RmllbGQubmV4dCgpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIHN0b3JlcyBpbnB1dCB2YWx1ZSBpbiBhbiBvYmplY3QgdXBvbiBzYXZlIGNsaWNrXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VUZXh0T2JqID0ge1xuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiBuZXdJbnB1dEZpZWxkLnZhbCgpLFxuICAgICAgICB9XG4gICAgICAgIC8vIHNhdmUgbWVzc2FnZSBpZCAjXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VJZCA9IG5ld0lucHV0RmllbGQucGFyZW50KCkuYXR0cihcImlkXCIpXG4gICAgICAgIC8vIFBhdGNoIG1lc3NhZ2UgaW4gc2VydmVyIGFuZCByZWZyZXNoIHRoZSBtZXNzYWdlcyBvbiB0aGUgcGFnZVxuICAgICAgICBBUEkudXBkYXRlSXRlbShcIm1lc3NhZ2VzXCIsIGVkaXRlZE1lc3NhZ2VJZCwgZWRpdGVkTWVzc2FnZVRleHRPYmopXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRNZXNzYWdlcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuaW1wb3J0IGJ1aWxkTWVzc2FnZXMgZnJvbSBcIi4vbWVzc2FnZXNcIjtcbmltcG9ydCBidWlsZE5ld3MgZnJvbSBcIi4vbmV3c1wiO1xuaW1wb3J0IGJ1aWxkVGFza3MgZnJvbSBcIi4vdGFza3NcIlxuaW1wb3J0IGJ1aWxkRXZlbnRzIGZyb20gXCIuL2V2ZW50c1wiXG5cblxuY29uc3QgYnVpbGRNaXNzaW9uQ29udHJvbCA9IHtcbiAgcHJpbnRQbGFjZWhvbGRlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gbnVsbDtcbiAgICBuZXcgY29tcC5zZWN0aW9uKHsgY2xhc3NOYW1lOiBcIm1lc3NhZ2VcIiwgaWQ6IGAke2FjdGl2ZVVzZXIuaW5mbygpLmlkfWAgfSxcbiAgICAgIG5ldyBjb21wLmltYWdlKHsgc3JjOiBgJHthY3RpdmVVc2VyLmluZm8oKS5wcm9maWxlUGljfWAsIGFsdDogXCJQcm9maWxlIFBpY1wiLCBzdHlsZTogXCJkaXNwbGF5OmlubGluZS1ibG9jazsgYm9yZGVyLXJhZGl1czogOHB4OyBtYXJnaW46IDRweFwiLCBoZWlnaHQ6IFwiMTI1XCIsIHdpZHRoOiBcIjEyNVwiIH0pLFxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7IHN0eWxlOiBcImRpc3BsYXk6IGlubGluZS1ibG9jazsgcG9zaXRpb246IHJlbGF0aXZlOyBib3R0b206IDEwcHhcIiB9LCBgJHthY3RpdmVVc2VyLmluZm8oKS5maXJzdE5hbWV9IC0gJHthY3RpdmVVc2VyLmluZm8oKS5sYXN0TmFtZX0gJHthY3RpdmVVc2VyLmluZm8oKS51c2VybmFtZX1gKSxcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgcHJpbnRQbGFuZXRzKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBudWxsO1xuICAgIC8vIG1ha2UgcGxhbmV0cyAtIGVhY2ggc2VjdGlvbiBpcyBhIHBsYW5ldFxuICAgIG5ldyBjb21wLnNlY3Rpb24oeyBjbGFzc05hbWU6IFwiY29udGFpbmVyLS1zdWIgdmlzaWJsZS0xXCIgfSxcbiAgICAgIG5ldyBjb21wLmRpdih7IGNsYXNzTmFtZTogXCJyaW5nXCIgfSksXG4gICAgICBuZXcgY29tcC5kaXYoeyBjbGFzc05hbWU6IFwicmluZy0yXCIgfSksXG4gICAgICBuZXcgY29tcC5zcGFuKHsgY2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViMlwiLCBpZDogXCJwbGFuZXQtdGFza3NcIiB9LCBcIlRhc2tzXCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgbmV3IGNvbXAuc2VjdGlvbih7IGNsYXNzTmFtZTogXCJjb250YWluZXItLXN1YiB2aXNpYmxlLTNcIiB9LFxuICAgICAgbmV3IGNvbXAuZGl2KHsgY2xhc3NOYW1lOiBcInVmb1wiIH0pLFxuICAgICAgbmV3IGNvbXAuc3Bhbih7IGNsYXNzTmFtZTogXCJjb250YWluZXItLXN1YjJcIiwgaWQ6IFwicGxhbmV0LW1lc3NhZ2VzXCIgfSwgXCJNZXNzYWdlc1wiKVxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIG5ldyBjb21wLnNlY3Rpb24oeyBjbGFzc05hbWU6IFwiY29udGFpbmVyLS1zdWIgdmlzaWJsZS01XCIgfSxcbiAgICAgIG5ldyBjb21wLmRpdih7IGNsYXNzTmFtZTogXCJyaW5nXCIgfSksXG4gICAgICBuZXcgY29tcC5zcGFuKHsgY2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViMlwiLCBpZDogXCJwbGFuZXQtZnJpZW5kc1wiIH0sIFwiRnJpZW5kc1wiKVxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIG5ldyBjb21wLnNlY3Rpb24oeyBjbGFzc05hbWU6IFwiY29udGFpbmVyLS1zdWIgdmlzaWJsZS03XCIgfSxcbiAgICAgIG5ldyBjb21wLmRpdih7IGNsYXNzTmFtZTogXCJyaW5nXCIgfSksXG4gICAgICBuZXcgY29tcC5kaXYoeyBjbGFzc05hbWU6IFwicmluZy0yXCIgfSksXG4gICAgICBuZXcgY29tcC5kaXYoeyBjbGFzc05hbWU6IFwicmluZy0zXCIgfSksXG4gICAgICBuZXcgY29tcC5zcGFuKHsgY2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViMlwiLCBpZDogXCJwbGFuZXQtZXZlbnRzXCIgfSwgXCJFdmVudHNcIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cbiAgICBuZXcgY29tcC5zZWN0aW9uKHsgY2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViIHZpc2libGUtOVwiIH0sXG4gICAgICBuZXcgY29tcC5zcGFuKHsgY2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViMlwiLCBpZDogXCJwbGFuZXQtbmV3c1wiIH0sIFwiTmV3c1wiKVxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIG5ldyBjb21wLnNlY3Rpb24oeyBjbGFzc05hbWU6IFwiY29udGFpbmVyLS1zdWIgZ2hvc3QtMlwiIH0sXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgbmV3IGNvbXAuc2VjdGlvbih7IGNsYXNzTmFtZTogXCJjb250YWluZXItLXN1YiBnaG9zdC00XCIgfSxcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cbiAgICBuZXcgY29tcC5zZWN0aW9uKHsgY2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViIGdob3N0LTZcIiB9LFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIG5ldyBjb21wLnNlY3Rpb24oeyBjbGFzc05hbWU6IFwiY29udGFpbmVyLS1zdWIgZ2hvc3QtOFwiIH0sXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgLy8gYXNzaWduIGNsaWNrIGxpc3RlbmVyc1xuICAgIHRoaXMuY2xpY2tQbGFuZXRzKCk7XG4gIH0sXG5cbiAgLy8gdGhlIHNtYWxsIGNpcmNsZSBvZiBlYWNoIHBsYW5ldCAod2hpY2ggYXJlIHNwYW5zKSBoYXZlIGFuIGlkIGFzc29jaWF0ZWQgd2l0aCB0aGVtLiBBIGNsaWNrIGxpc3RlbmVyIGlzIGFzc2lnbmVkIHRvIGVhY2ggb25lXG4gIGNsaWNrUGxhbmV0cygpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYW5ldC10YXNrc1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge2J1aWxkVGFza3MuYnVpbGRDb250YWluZXJzKCl9KVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhbmV0LW1lc3NhZ2VzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7YnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCl9KVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhbmV0LWZyaWVuZHNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtjb25zb2xlLmxvZyhcIkZyaWVuZHMgZnVuY3Rpb24gY2FsbGVkLlwiKX0pXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFuZXQtZXZlbnRzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7YnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKCl9KVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhbmV0LW5ld3NcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtidWlsZE5ld3MubmV3c01hcCgpfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE1pc3Npb25Db250cm9sOyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxuaW1wb3J0IGJ1aWxkTWVzc2FnZXMgZnJvbSBcIi4vbWVzc2FnZXNcIjtcbmltcG9ydCBidWlsZE5ld3MgZnJvbSBcIi4vbmV3c1wiO1xuaW1wb3J0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgZnJvbSBcIi4vbWlzc2lvbkNvbnRyb2xcIjtcbmltcG9ydCBidWlsZFRhc2tzIGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgYnVpbGRFdmVudHMgZnJvbSBcIi4vZXZlbnRzXCI7XG5pbXBvcnQgYWN0aXZlVXNlciBmcm9tIFwiLi9zZXNzaW9uU3RvcmFnZVwiO1xuaW1wb3J0IGxhbmRpbmdQYWdlRnVuY3MgZnJvbSBcIi4vbGFuZGluZ1wiO1xuXG5cbmNvbnN0IG5hdkJhciA9IHtcbiAgbG9hZE5hdkJhcigpIHtcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKSB7XG4gICAgICBuZXcgY29tcC51bChcbiAgICAgICAge30sXG4gICAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkxvZyBJblwiKVxuICAgICAgKS5yZW5kZXIoXCIjbmF2QmFyXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBjb21wLnVsKFxuICAgICAgICB7fSxcbiAgICAgICAgbmV3IGNvbXAubGkoe30sIFwiSG9tZVwiKSxcbiAgICAgICAgbmV3IGNvbXAubGkoe30sIFwiVGFza3NcIiksXG4gICAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkV2ZW50c1wiKSxcbiAgICAgICAgbmV3IGNvbXAubGkoe30sIFwiTWVzc2FnZXNcIiksXG4gICAgICAgIG5ldyBjb21wLmxpKHt9LCBcIk5ld3NcIiksXG4gICAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkZyaWVuZHNcIiksXG4gICAgICAgIG5ldyBjb21wLmxpKHsgaWQ6IFwibG9nSW5cIiB9LCBuZXcgY29tcC5pbWFnZSh7IGlkOiBcImxvZ2luUGljXCIsIHNyYzogYCR7YWN0aXZlVXNlci5pbmZvKCkucHJvZmlsZVBpY31gLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIiwgY2xhc3NOYW1lOiBcIm1lc3NhZ2VQaWNcIiB9KSxcbiAgICAgICAgICBuZXcgY29tcC5zZWN0aW9uKHsgaWQ6IFwic3ViTmF2XCIgfSwgbmV3IGNvbXAudGl0bGUoXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJzdWJOYXZJdGVtXCIsIGlkOiBcImVkaXRcIiB9LCBcIkVkaXQgUHJvZmlsZVwiKSxcbiAgICAgICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDNcIiwgeyBjbGFzc05hbWU6IFwic3ViTmF2SXRlbVwiLCBpZDogXCJsb2dPdXRcIiB9LCBcIkxvZyBPdXRcIikpXG4gICAgICAgIClcbiAgICAgICkucmVuZGVyKFwiI25hdkJhclwiKVxuICAgICAgJChcIiNzdWJOYXZcIikuaGlkZSgpO1xuICAgICAgJChcIiNsb2dpblBpY1wiKS5jbGljayhmdW5jdGlvbiAoKSB7ICQoXCIjc3ViTmF2XCIpLnRvZ2dsZSgpIH0pO1xuICAgICAgJChcIiNsb2dPdXRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiI25hdkJhclwiKS5odG1sKFwiXCIpO1xuICAgICAgICAkKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaHRtbChcIlwiKTtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgICAgICBuYXZCYXIubG9hZE5hdkJhcigpO1xuICAgICAgICBsYW5kaW5nUGFnZUZ1bmNzLmxvYWRMYW5kaW5nUGFnZSgpO1xuICAgICAgfSk7XG5cblxuXG4gICAgfVxuXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdkJhclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZyBJblwiKSB7XG4gICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkhvbWVcIikge1xuICAgICAgICAgIGJ1aWxkTWlzc2lvbkNvbnRyb2wucHJpbnRQbGFjZWhvbGRlcigpO1xuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiVGFza3NcIikge1xuICAgICAgICAgIGJ1aWxkVGFza3MuYnVpbGRDb250YWluZXJzKCk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJFdmVudHNcIikge1xuICAgICAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJNZXNzYWdlc1wiKSB7XG4gICAgICAgICAgYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJOZXdzXCIpIHtcbiAgICAgICAgICBidWlsZE5ld3MubmV3c01hcCgpO1xuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiRnJpZW5kc1wiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJGcmllbmRzIGZ1bmN0aW9uIGNhbGxlcy5cIilcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgbmF2QmFyIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHt9LCBgJHtuZXdzT2JqLmFydGljbGVOYW1lfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDRcIiwge30sIGBTYXZlZCBieTogJHtuZXdzT2JqLnVzZXIuZmlyc3ROYW1lfSB8IERhdGUgU2F2ZWQ6ICR7bmV3c09iai5kYXRlU2F2ZWR9YCksXG4gICAgbmV3IGNvbXAucGFyKHt9LCBuZXdzT2JqLmFib3V0KSxcbiAgICBuZXcgY29tcC5idG4oXCJEZWxldGUgQXJ0aWNsZVwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgfSxcblxuICBuZXdzTWFwICgpICB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYGFydGljbGVzLz91c2VySWQ9JHthY3RpdmVVc2VyLmluZm8oKS5pZH0mX2V4cGFuZD11c2VyJl9zb3J0PWRhdGVTYXZlZCZfb3JkZXI9ZGVzY2ApXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICB0aGlzLnByaW50TmV3cyhuZXdzKX0pKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5uZXdOZXdzKCkpXG4gICAgICAudGhlbigoKT0+IHRoaXMuZXZlbnRMaXN0ZW5lcigpKVxuXG4gIH0sXG5cbiAgbmV3TmV3cyAoKSB7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXctLW5ld3NcIn0sXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge30sIFwiU2F2ZSBOZXdzIEFydGljbGVcIiksXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZU5hbWVcIn0sIFwiQXJ0aWNsZSBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZU5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBOYW1lXCIsIGlkOiBcImFydGljbGVOYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVVcmxcIn0sIFwiQXJ0aWNsZSBMaW5rXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZVVybFwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIExpbmtcIiwgaWQ6IFwiYXJ0aWNsZUxpbmtcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlSW1hZ2VVcmxcIn0sIFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZUltYWdlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgSW1hZ2UgTGlua1wiLCBpZDogXCJhcnRpY2xlSW1hZ2VcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlRGVzY3JpcHRpb25cIn0sIFwiQXJ0aWNsZSBEZXNjcmlwdGlvblwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVEZXNjcmlwdGlvblwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIsIGlkOiBcImFydGljbGVEZXNjcmlwdGlvblwifSksXG4gICAgICBuZXcgY29tcC5idG4oXCJTYXZlIE5ldyBBcnRpY2xlXCIpXG4gICAgKSxcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgZXZlbnRMaXN0ZW5lcigpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKT0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpPT57XG4gICAgICAgIGlmKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIlNhdmUgTmV3IEFydGljbGVcIil7XG4gICAgICAgICAgbGV0IHN0b3J5ID0ge1xuICAgICAgICAgICAgYXJ0aWNsZU5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZU5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICB1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUxpbmtcIikudmFsdWUsXG4gICAgICAgICAgICBhcnRpY2xlSW1hZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUltYWdlXCIpLnZhbHVlLFxuICAgICAgICAgICAgYWJvdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZURlc2NyaXB0aW9uXCIpLnZhbHVlLFxuICAgICAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZCxcbiAgICAgICAgICAgIGRhdGVTYXZlZDogbmV3IERhdGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBidWlsZE5ld3MuYWRkTmV3cyhzdG9yeSlcbiAgICAgICAgfSBlbHNlIGlmKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkRlbGV0ZSBBcnRpY2xlXCIpe1xuICAgICAgICAgIGxldCBhcnRpY2xlSWQgPSBlLnRhcmdldC5wYXJlbnROb2RlLmlkXG4gICAgICAgICAgQVBJLmRlbGV0ZUl0ZW0oXCJhcnRpY2xlc1wiLCBhcnRpY2xlSWQpLnRoZW4oKCk9PiBidWlsZE5ld3MubmV3c01hcCgpKVxuICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG5cblxuICBhZGROZXdzKHN0b3J5KXtcbiAgICBBUEkuc2F2ZUl0ZW0oXCJhcnRpY2xlc1wiLCBzdG9yeSkudGhlbigoKT0+IHRoaXMubmV3c01hcCgpKVxuICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE5ld3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuaW1wb3J0IG5hdkJhciBmcm9tIFwiLi9uYXZcIjtcblxuY29uc3QgcmVnaXN0ZXJGdW5jcyA9IHtcblxuICBsb2FkUmVnaXN0ZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5Mb2dJblwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJGaXJzdCBOYW1lXCIsIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJmaXJzdE5hbWVcIiwgaWQ6IFwiZmlyc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkZpcnN0IE5hbWVcIiB9KSkgICAucmVuZGVyKFwiLkxvZ0luXCIpXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJMYXN0IE5hbWVcIiwgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImxhc3ROYW1lXCIsIGlkOiBcImxhc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkxhc3QgTmFtZVwiIH0pKS5yZW5kZXIoXCIuTG9nSW5cIilcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkVtYWlsXCIsIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJlbWFpbFwiLCBpZDogXCJlbWFpbFwiLCBuYW1lOiBcImVtYWlsXCIsIHBsYWNlaG9sZGVyOiBcImVtYWlsXCIgfSkpLnJlbmRlcihcIi5Mb2dJblwiKVxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiwgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInVzZXJuYW1lXCIsIGlkOiBcInVzZXJuYW1lXCIsIHBsYWNlaG9sZGVyOiBcInVzZXJuYW1lXCIgfSkpLnJlbmRlcihcIi5Mb2dJblwiKVxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwicGFzc3dvcmRcIiB9LCBcIlBhc3N3b3JkXCIsIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJwYXNzd29yZFwiLCBpZDogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJQYXNzd29yZFwiIH0pKS5yZW5kZXIoXCIuTG9nSW5cIilcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcImNvbmZpcm1QYXNzd29yZFwiIH0sIFwiQ29uZmlybSBQYXNzd29yZFwiLCAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJjb25maXJtUGFzc3dvcmRcIiwgaWQ6IFwiY29uZmlybVBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIkNvbmZpcm0gUGFzc3dvcmRcIiB9KSkucmVuZGVyKFwiLkxvZ0luXCIpXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlciBBY2NvdW50XCIpLnJlbmRlcihcIi5Mb2dJblwiKVxuXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiUmVnaXN0ZXIgQWNjb3VudFwiKSB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlyc3ROYW1lXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdE5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJuYW1lXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUGFzc3dvcmRcIikudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY2hlY2sgdG8gZW5zdXJlIGFsbCBmaWVsZHMgYXJlIGNvbXBsZXRlLlxuICAgICAgICAgICAgYWxlcnQoXCJBbGwgZmllbGRzIG11c3QgYmUgY29tcGxldGUgdG8gY3JlYXRlIGFuIGFjY291bnQuXCIpXG4gICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlLmluZGV4T2YoXCJAXCIpID09PSAtMSkge1xuICAgICAgICAgICAgLy9UaGlzIGlzIGEgY2hlY2sgb24gdGhlIGVtYWlsIGZpZWxkIHRvIG1ha2Ugc3VyZSB0aGVyZSBpcyBhbiBAIHByZXNlbnRcbiAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIilcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUgPT09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVBhc3N3b3JkXCIpLnZhbHVlKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNoZWNrIHRvIG1ha2Ugc3VyZSBwYXNzd29yZHMgYXJlIHRoZSBzYW1lLlxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBsZXQgdGVtcFVzZXIgPSB7XG4gICAgICAgICAgICAgIGZpcnN0TmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIGxhc3ROYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhc3ROYW1lXCIpLnZhbHVlLFxuICAgICAgICAgICAgICBlbWFpbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgdXNlcm5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlLFxuICAgICAgICAgICAgICAvL1RoaXMgaXMgYSBwbGFjZWhvbGRlciB0byBhIHN0b2NrIFwibm8gaW1hZ2UgYXZhaWxhYmxlXCIgaW1hZ2UgdGhhdCB3ZSBjYW4gdXNlIGxhdGVyIGZvciBhY3R1YWwgdXNlciBpbWFnZXNcbiAgICAgICAgICAgICAgcHJvZmlsZVBpYzogXCJodHRwczovL2h5aGEueHl6L3dwLWNvbnRlbnQvdGhlbWVzL2Zhc2hpb24vaW1hZ2VzL25vX2ltYWdlX2F2YWlsYWJsZS5qcGdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQVBJLmdldEFsbENhdGVnb3J5KGB1c2Vycy8/ZW1haWw9JHt0ZW1wVXNlci5lbWFpbH1gKS50aGVuKHRoaXNEYXRhID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXNEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZWdpc3Rlcih0ZW1wVXNlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJUaGlzIGVtYWlsIGlzIGFscmVhZHkgcmVnaXN0ZXJlZC5cIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgeyBhbGVydChcIllvdXIgcGFzc3dvcmRzIGRpZCBub3QgbWF0Y2guIFBsZWFzZSB0cnkgYWdhaW4uXCIpIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBjaGVja1JlZ2lzdGVyKHVzZXIpIHtcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz91c2VybmFtZT0ke3VzZXIudXNlcm5hbWV9YCkudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJ1c2Vyc1wiLCB1c2VyKS50aGVuKG5ld1VzZXIgPT4ge1xuICAgICAgICAgIGxldCBjdXJyZW50VXNlciA9IG5ldyBjb21wLnVzZXIobmV3VXNlcik7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJVc2VybmFtZSBjaGVja1JlZ2lzdGVyOiBcIiwgY3VycmVudFVzZXIpXG4gICAgICAgICAgLy9UT0RPOnRoZSBmdW5jdGlvbiBiZWxvdyBuZWVkcyB0byBiZSB0aGUgY2FsbCB0byBsb2FkIG1pc3Npb24gY29udHJvbCBwYWdlLlxuICAgICAgICAgIC8vIFJpZ2h0IG5vdyBpdCBpcyBqdXN0IHNlbmRpbmcgdG8gYSBmdW5jdGlvbiB0byBjb25zb2xlLmxvZyB1c2VyXG4gICAgICAgICAgdGhpcy5sb2FkTWlzc2lvbihjdXJyZW50VXNlcik7XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFsZXJ0KGBVc2VybmFtZSwgJHtkYXRhWzBdLnVzZXJuYW1lfSwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLiBQbGVhc2UgY2hvb3NlIGFub3RoZXIuYClcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8vVE9ETzogdGhpcyBmdW5jdGlvbiBjYW4gZ28gYXdheSB3aGVuIHRoZSBmdW5jdGlvbiB0byBsb2FkIG1pc3Npb24gcGFnZSBpcyByZXBsYWNlZCBpbiBjaGVja1JlZ2lzdGVyIGZ1bmN0aW9uIGFib3ZlXG4gIGxvYWRNaXNzaW9uKHVzZXIpIHtcbiAgICBjb25zb2xlLmxvZyh1c2VyKVxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYXZCYXJcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBuYXZCYXIubG9hZE5hdkJhcigpO1xuICAgIGJ1aWxkTWlzc2lvbkNvbnRyb2wucHJpbnRQbGFjZWhvbGRlcigpO1xuICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyRnVuY3MiLCIvLyBzY3JpcHRzIHJlbGF0ZWQgdG8gc2Vzc2lvblN0b3JhZ2VcclxuXHJcbmNvbnN0IGFjdGl2ZVVzZXIgPSB7XHJcbiAgaW5mbyAoKSB7XHJcbiAgICBsZXQgbG9nZ2VkSW5Vc2VyID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5jdXJyZW50VXNlcik7XHJcbiAgICAgIHJldHVybiBsb2dnZWRJblVzZXI7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY3RpdmVVc2VyO1xyXG4iLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXG5pbXBvcnQgYWN0aXZlVXNlciBmcm9tIFwiLi9zZXNzaW9uU3RvcmFnZVwiXG5cblxuY29uc3QgYnVpbGRUYXNrcyA9IHtcblxuICAvL2Z1bmN0aW9uIHJ1biBmaXJzdCBpbiBvcmRlciB0byBjbGVhciBIVE1MLCBjcmVhdGUgcGFyZW50IGNvbnRhaW5lcnMsIHRoZW4gYWRkIG5ldyB0YXNrIGlucHV0IGFuZCBjYWxsIGZldGNoXG4gIGJ1aWxkQ29udGFpbmVycyAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7Y2xhc3NOYW1lOiBcInRpdGxlLS1pbmNvbXBsZXRlXCJ9LCBcIkluY29tcGxldGUgVGFza3NcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBuZXcgY29tcC5kaXYgKHtpZDogXCJpbmNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHtjbGFzc05hbWU6IFwidGl0bGUtLWNvbXBsZXRlXCJ9LCBcIkNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgbmV3IGNvbXAuZGl2ICh7aWQ6IFwiY29tcGxldGVcIn0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgdGhpcy5uZXdUYXNrKClcbiAgICB0aGlzLnRhc2tzRmV0Y2goKVxuICB9LFxuXG4gIC8vdXNlZCB0byBjcmVhdGUgYW5kIGFwcGVuZCBhbGwgdGFza3MgZnJvbSBkYXRhYmFzZSB0byBET01cbiAgcHJpbnRUYXNrcyAodGFza3NPYmopIHtcbiAgICBsZXQgb3V0cHV0Q29udGFpbmVyO1xuXG4gICAgaWYgKHRhc2tzT2JqLmNvbXBsZXRlKSB7XG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNjb21wbGV0ZVwiXG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dENvbnRhaW5lciA9IFwiI2luY29tcGxldGVcIlxuICAgIH1cblxuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwidGFza1wiLCBpZDogYCR7dGFza3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuY2hlY2tib3goKSxcbiAgICBuZXcgY29tcC5wYXIoe2NsYXNzTmFtZTogXCJlZGl0YWJsZS0tdGFza1wifSwgdGFza3NPYmoudGFzayksXG4gICAgbmV3IGNvbXAucGFyKHtjbGFzc05hbWU6IFwiZWRpdGFibGUtLWRhdGVcIn0sIHRhc2tzT2JqLmR1ZURhdGUpKS5yZW5kZXIob3V0cHV0Q29udGFpbmVyKVxuICB9LFxuXG4gIC8vZmV0Y2ggYWxsIHRhc2tzIGZyb20gZGF0YWJhc2UsIGNhbGwgY3JlYXRlL2FwcGVuZCBhbmQgY2FsbCBhZGQgbGlzdGVuZXJzXG4gIHRhc2tzRmV0Y2ggKCkgIHtcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHRhc2tzLz91c2VySWQ9JHthY3RpdmVVc2VyLmluZm8oKS5pZH0mX3NvcnQ9ZHVlRGF0ZSZfb3JkZXI9YXNjYCkgLy9jaGVjayBpZiB1c2VyIGlzIHNhbWUgYXMgc2Vzc2lvbiBzdG9yYWdlXG4gICAgLnRoZW4odGFza3NPYmogPT4gIHtcbiAgICAgIHRhc2tzT2JqLmZvckVhY2godGFzayA9PiB7XG4gICAgICB0aGlzLnByaW50VGFza3ModGFzayl9KVxuICAgICAgdGhpcy5jYkxpc3RlbmVyKClcbiAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxuICAgIH0pXG4gIH0sXG5cbiAgLy9jaGVja2JveCBsaXN0ZW5lciB3aWxsIG1vdmUgdGFza3MgYmV0d2VlbiBjb21wbGV0ZSBhbmQgaW5jb21wbGV0ZSBjb250YWluZXJzXG4gIC8vZGF0YWJhc2UgXCJjb21wbGV0ZVwiIHByb3BlcnR5IHdpbGwgYmUgcGF0Y2hlZCBhY2NvcmRpbmdseSBhbmQgRE9NIHVwZGF0ZWRcbiAgY2JMaXN0ZW5lciAoKSB7XG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKVxuXG4gICAgLy9pZiB0aGUgaWQgb2YgdGhlIGdyYW5kcGFyZW50IGNvbnRhaW5lciBpcyAjY29tcGxldGUsIHRoZW4gY2hlY2sgdGhlIGJveFxuICAgIGNoZWNrYm94ZXMuZm9yRWFjaCggKGNoZWNrYm94KSA9PiB7XG4gICAgICBpZiAoY2hlY2tib3gucGFyZW50Tm9kZS5wYXJlbnROb2RlLmlkID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgbGV0IHBhdGNoUHJvcGVydHk7XG4gICAgICAgIC8vaWYgZmFsc2UgLT4gdHJ1ZVxuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIHBhdGNoUHJvcGVydHkgPSB7Y29tcGxldGU6IHRydWV9XG4gICAgICAgICAgLy9wYXRjaCBcImNvbXBsZXRlXCIgcHJvcGVydHkgb2YgZGF0YWJhc2Ugb2JqZWN0IHVzaW5nIHBhcmVudE5vZGUgKHNlY3Rpb24pIElEIHRvIFRSVUVcbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy9pZiBjaGVja2JveCBpcyB1bmNoZWNrZWQuLi5cbiAgICAgICAgICBwYXRjaFByb3BlcnR5ID0ge2NvbXBsZXRlOiBmYWxzZX1cbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9LFxuXG4gIC8vZnVuY3Rpb24gdXNlZCB0byBlZGl0IHRhc2tzIGluIERPTSBhbmQgcGF0Y2ggbmV3IGluZm8gdG8gZGF0YWJhc2UgdGFzayBkZXNjcmlwdGlvbiBhbmQgZGF0ZVxuICBwYXJMaXN0ZW5lciAoKSB7XG4gICAgLy9nZXQgYWxsIHNlY3Rpb25zIG9uIHBhZ2VcbiAgICBsZXQgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VjdGlvblwiKVxuXG4gICAgLy8vYWRkIGNsaWNrIGxpc3RlbmVyIHRvIGFsbCBzZWN0aW9uc1xuICAgIHNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XG4gICAgICBzZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAvL2dldCBpZCBvZiB0YXJnZXQgc2VjdGlvblxuICAgICAgICBjb25zdCBpZCA9IGUudGFyZ2V0LnBhcmVudE5vZGUuaWRcblxuICAgICAgICAvL2lmIHBhcmFncmFwaCBjbGlja2VkIGlzIHRhc2sgZGVzY3JpcHRpb24sIGdldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgLy9jcmVhdGUgbmV3IDxpbnB1dD4gdGVtcGxhdGUgKHdpdGggIElEISkgYW5kIHJlcGxhY2UgPHA+IHdpdGggPGlucHV0PlxuICAgICAgICAvL2FkZCBhIGtleWRvd24gbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkZXNjcmlwdGlvbiB0byBkYXRhYmFzZSB3aGVuIEVOVEVSIGlzIHByZXNzZWRcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRhYmxlLS10YXNrXCIpKSB7XG4gICAgICAgICAgY29uc3QgdGFza05hbWUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxuICAgICAgICAgIGxldCB0ZW1wVGFza0lucHV0ID0gYDxpbnB1dCBpZD1cInRlbXAxXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGFza05hbWV9XCI+YFxuICAgICAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKHRlbXBUYXNrSW5wdXQpXG4gICAgICAgICAgY29uc3QgdGVtcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMVwiKTtcbiAgICAgICAgICAgIHRlbXBJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoVGFzayA9IHt0YXNrOiB0ZW1wSW5wdXQudmFsdWV9XG4gICAgICAgICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBpZCwgcGF0Y2hUYXNrKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgLy9pZiBwYXJhZ3JhcGggY2xpY2tlZCBpcyB0YXNrIGR1ZSBkYXRlLCBnZXQgdGV4dCBjb250ZW50XG4gICAgICAgIC8vY3JlYXRlIG5ldyA8aW5wdXQ+IHRlbXBsYXRlICh3aXRoICBJRCEpIGFuZCByZXBsYWNlIDxwPiB3aXRoIDxpbnB1dD5cbiAgICAgICAgLy9hZGQgYSBjaGFuZ2UgbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkdWUgZGF0ZSB0byBkYXRhYmFzZSB3aGVuIG5ldyBkYXRlIGlzIHNlbGVjdGVkXG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGFibGUtLWRhdGVcIikpIHtcbiAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgbGV0IHRlbXBUYXNrRGF0ZSA9IGA8aW5wdXQgaWQ9XCJ0ZW1wMlwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke3Rhc2tEYXRlfVwiPmBcbiAgICAgICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aCh0ZW1wVGFza0RhdGUpXG4gICAgICAgICAgICBjb25zdCB0ZW1wRGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMlwiKTtcbiAgICAgICAgICAgIHRlbXBEYXRlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoRGF0ZSA9IHtkdWVEYXRlOiB0ZW1wRGF0ZUlucHV0LnZhbHVlfVxuICAgICAgICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgaWQsIHBhdGNoRGF0ZSlcbiAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgfSxcblxuICAvL2NyZWF0ZXMgbmV3IHRhc2sgaW5wdXQgZmllbGQgd2l0aCBhcHBlbmQgYnV0dG9uIGluc2lkZSBmaXJzdCBzZWN0aW9uIG9mIElOQ09NUExFVEUgY29udGFpbmVyXG4gIG5ld1Rhc2sgKCkge1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS10YXNrXCJ9LFxuICAgIG5ldyBjb21wLmJ0biAoXCIrXCIpLFxuICAgIG5ldyBjb21wLmlucHV0KHtpZDogXCJpbnB1dC0tdGFza1wiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwidHlwZSBuZXcgdGFzayBoZXJlXCJ9KSxcbiAgICBuZXcgY29tcC5pbnB1dCh7aWQ6IFwiaW5wdXQtLWRhdGVcIiwgdHlwZTogXCJkYXRlXCJ9KSkucmVuZGVyKFwiI2luY29tcGxldGVcIilcblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIilcbiAgICBjb25zdCBpbnB1dF90YXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC0tdGFza1wiKVxuICAgIGNvbnN0IGlucHV0X2RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LS1kYXRlXCIpXG5cbiAgICAvL2J1dHRvbiBjbGljayBwb3N0cyBuZXcgdGFzayB0byBkYXRhYmFzZSBhbmQgcmVzZXRzIG5ldyB0YXNrIGlucHV0IHN0cmluZ3NcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoaW5wdXRfdGFzay52YWx1ZSA9PT0gXCJcIiB8fCBpbnB1dF9kYXRlLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRhc2tJdGVtID0ge1xuICAgICAgICAgIHRhc2s6IGlucHV0X3Rhc2sudmFsdWUsXG4gICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgIGR1ZURhdGU6IGlucHV0X2RhdGUudmFsdWUsXG4gICAgICAgICAgLypcbiAgICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxuICAgICAgICAgICovXG4gICAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZCxcbiAgICAgICAgfVxuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJ0YXNrc1wiLCB0YXNrSXRlbSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLnByaW50VGFza3MoZGF0YSlcbiAgICAgICAgICB0aGlzLmNiTGlzdGVuZXIoKVxuICAgICAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxuICAgICAgICB9KVxuICAgICAgICBpbnB1dF90YXNrLnZhbHVlID0gXCJcIlxuICAgICAgICBpbnB1dF9kYXRlLnZhbHVlID0gXCJcIlxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRUYXNrcyJdfQ==
