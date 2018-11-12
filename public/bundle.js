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
    let outputContainer; // need to test if date is in the future or the past

    outputContainer = "#upcoming";
    const task = new _components.default.section({
      className: "event",
      id: `${eventObj.id}`
    }, new _components.default.title("h3", `${eventObj.name}`), new _components.default.par(`${eventObj.date} ${eventObj.time}`), new _components.default.par(`${eventObj.location}`), new _components.default.btn("Edit")).render(outputContainer);
  },

  eventFetch() {
    _apiData.default.getAllCategory(`events/?userId=${_sessionStorage.default.info().id}`) //check if user is same as session storage
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

          _missionControl.default.printPlanets();
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

},{"./apiData":2,"./components":3,"./missionControl":9,"./register":12}],7:[function(require,module,exports){
"use strict";

var _landing = _interopRequireDefault(require("./landing"));

var _nav = _interopRequireDefault(require("./nav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nav.default.loadNavBar(); // landingPageFuncs.loadLandingPage();

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
      className: "container--sub2"
    }, "Tasks")).render(".container--inner");
    new _components.default.section({
      className: "container--sub visible-3"
    }, new _components.default.span({
      className: "container--sub2"
    }, "Messages")).render(".container--inner");
    new _components.default.section({
      className: "container--sub visible-5"
    }, new _components.default.div({
      className: "ring"
    }), new _components.default.span({
      className: "container--sub2"
    }, "Friends")).render(".container--inner");
    new _components.default.section({
      className: "container--sub visible-7"
    }, new _components.default.span({
      className: "container--sub2"
    }, "Events")).render(".container--inner");
    new _components.default.section({
      className: "container--sub visible-9"
    }, new _components.default.span({
      className: "container--sub2"
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
    }).render(".container--inner");
  }
  /* DO NOT DELETE COMMENTED HTML CONTENT SO ADVANCED STYLING IS EASIER LATER */

  /* DELETE BEFORE END OF PROJECT */
  // <section class="container--sub visible-1"><div class="ring"></div><div class="ring-2"></div><span class="container--sub2">Tasks</span></section>
  // <section class="container--sub visible-3"><span class="container--sub2">Messages</span></section>
  // <section class="container--sub visible-5"><div class="ring"></div><span class="container--sub2">Friends</span></section>
  // <section class="container--sub visible-7"><span class="container--sub2">Events</span></section>
  // <section class="container--sub visible-9"><span class="container--sub2">News</span></section>
  // <section class="container--sub ghost-2"><span class="container--sub2"></span></section>
  // <section class="container--sub ghost-4"><span class="container--sub2"></span></section>
  // <section class="container--sub ghost-6"><span class="container--sub2"></span></section>
  // <section class="container--sub ghost-8"><span class="container--sub2"></span></section>


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
          _missionControl.default.printPlanets();
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

},{"./components":3,"./events":4,"./login":6,"./messages":8,"./missionControl":9,"./news":11,"./tasks":14}],11:[function(require,module,exports){
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

},{"./apiData":2,"./components":3,"./sessionStorage":13}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzLmpzIiwiLi4vc2NyaXB0cy9sYW5kaW5nLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMuanMiLCIuLi9zY3JpcHRzL21pc3Npb25Db250cm9sLmpzIiwiLi4vc2NyaXB0cy9uYXYuanMiLCIuLi9zY3JpcHRzL25ld3MuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL3NjcmlwdHMvdGFza3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEs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QUEsSUFBSSxFQUFFO0FBQTFCLEtBQWYsQ0FIQSxFQUdtRCxNQUhuRCxDQUcwRCxhQUgxRDtBQUtBLFVBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQSxVQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUFuQjtBQUNBLFVBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLENBQW5CLENBUlMsQ0FVVDs7QUFDQSxJQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFrQyxDQUFELElBQU87QUFDdEMsVUFBSSxVQUFVLENBQUMsS0FBWCxLQUFxQixFQUFyQixJQUEyQixVQUFVLENBQUMsS0FBWCxLQUFxQixFQUFwRCxFQUF3RDtBQUN0RDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUksUUFBUSxHQUFHO0FBQ2IsVUFBQSxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBREo7QUFFYixVQUFBLFFBQVEsRUFBRSxLQUZHO0FBR2IsVUFBQSxPQUFPLEVBQUUsVUFBVSxDQUFDLEtBSFA7O0FBSWI7OztBQUdBLFVBQUEsTUFBTSxFQUFFLHdCQUFXLElBQVgsR0FBa0I7QUFQYixTQUFmOztBQVNBLHlCQUFJLFFBQUosQ0FBYSxPQUFiLEVBQXNCLFFBQXRCLEVBQWdDLElBQWhDLENBQXFDLElBQUksSUFBSTtBQUMzQyxlQUFLLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDQSxlQUFLLFVBQUw7QUFDQSxlQUFLLFdBQUw7QUFDRCxTQUpEOztBQUtBLFFBQUEsVUFBVSxDQUFDLEtBQVgsR0FBbUIsRUFBbkI7QUFDQSxRQUFBLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLEVBQW5CO0FBQ0Q7QUFDRixLQXJCRDtBQXNCRDs7QUF0SmdCLENBQW5CO2VBeUplLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWxlbWVudFN5bWJvbCA9IFN5bWJvbCgpXG5cbmNsYXNzIERPTUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgSWYgYGF0dHJpYnV0ZXNgIGlzIGp1c3QgYSBzdHJpbmcsIGl0J3MgYSBzaW1wbGUgZWxlbWVudCB3aXRoIG5vXG4gICAgICAgICAgICBwcm9wZXJ0aWVzIC0ganVzdCBzb21lIHRleHQgY29udGVudFxuICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gT2JqZWN0LmFzc2lnbih0aGlzW2VsZW1lbnRTeW1ib2xdLCBhdHRyaWJ1dGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25lIEhUTUxFbGVtZW50IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoY2hpbGQuZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBbiBhcnJheSBvZiBlbGVtZW50cyB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVsZW1lbnQuZm9yRWFjaChjID0+IHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoYykpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nIHZhbHVlIHdhcyBwYXNzZWQgaW4sIHNldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2VsZW1lbnRTeW1ib2xdXG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzW2VsZW1lbnRTeW1ib2xdKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERPTUNvbXBvbmVudFxuIiwiY29uc3QgVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODgvXCJcblxuY29uc3QgQVBJID0ge1xuICBnZXRBbGxDYXRlZ29yeShjYXRlZ29yeSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gKVxuICAgICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBnZXRPbmVGcm9tQ2F0ZWdvcnkoY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fS8ke2lkfWApXG4gICAgICAudGhlbihpbnB1dHMgPT4gaW5wdXRzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSXRlbShjYXRlZ29yeSwgaXRlbSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfVxuICAgICkudGhlbihqc29uRGF0YSA9PiBqc29uRGF0YS5qc29uKCkpXG4gIH0sXG5cbiAgZGVsZXRlSXRlbShjYXRlZ29yeSwgaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9P2lkPSR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgdXBkYXRlSXRlbShjYXRlZ29yeSwgaWQsIGl0ZW0pe1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0vJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgIH1cbiAgICApXG5cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiaW1wb3J0IERPTUNvbXBvbmVudCBmcm9tIFwiLi4vbGliL25vZGVfbW9kdWxlcy9uc3MtZG9tY29tcG9uZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5jcmVhdGUobnVsbCwge1xyXG5cclxuICB1c2VyOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgVXNlciB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKHRlbXBJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IHRlbXBJbmZvLmlkO1xyXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGVtcEluZm8uZmlyc3ROYW1lO1xyXG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSB0ZW1wSW5mby5sYXN0TmFtZTtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdGVtcEluZm8udXNlcm5hbWU7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHRlbXBJbmZvLnBhc3N3b3JkO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSB0ZW1wSW5mby5lbWFpbDtcclxuICAgICAgICB0aGlzLnByb2ZpbGVQaWMgPSB0ZW1wSW5mby5wcm9maWxlUGljO1xyXG4gICAgfVxyXG4gICAgLy9UT0RPOiB0aGlzIGlzIGp1c3QgYSB0ZXN0IGZ1bmN0aW9uLiB3ZSB3b3VsZCBoYXZlIHRoZSBhYmlsaXR5IHRvIGNhbGwgZm9yIHNhdmluZ1xyXG4gICAgLy8gbWVzc2FnZXMsYXJ0aWNsZXMsIGV2ZW50cyBiZSByZWZlcmVuY2luZyBhIGZ1bmN0aW9uIGRlZmluZWQgaGVyZVxyXG4gICAgICB0ZXN0KCkge1xyXG4gICAgICAgIHJldHVybiBgV2VsY29tZSAke3RoaXMuZmlyc3ROYW1lfSEgTGV0J3Mgc2VlIHdoYXQncyBnb2luZyBvbi5gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZGl2OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgZGl2IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImRpdlwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnRuOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYnRuIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJidG5cIiwgdHlwZTogXCJidXR0b25cIiB9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW5wdXQ6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBpbnB1dCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbnB1dFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VjdGlvbjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHNlY3Rpb24gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwic2VjdGlvblwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGl0bGU6IHsgLy9kZWZpbmUgYW55IHR5cGUgb2YgaCMuLiBoMSwgaDIsIGV0Yy5cclxuICAgIHZhbHVlOiBjbGFzcyB0aXRsZSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBhbmNob3I6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBhbmNob3IgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2hlY2tib3g6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBjaGVja2JveCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgY2xhc3NOYW1lOiBcImNiXCIgfSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGltYWdlOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW1hZ2UgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW1nXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsaToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxpIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxpXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgZm9ybSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJmb3JtXCIsIHt9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGFiZWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsYWJlbCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsYWJlbFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGV4dGFyZWE6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB0ZXh0YXJlYSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ0ZXh0YXJlYVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFyOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgcGFyIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInBcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNwYW46IHtcclxuICAgIHZhbHVlOiBjbGFzcyBzcGFuIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInNwYW5cIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcbmltcG9ydCBhY3RpdmVVc2VyIGZyb20gXCIuL3Nlc3Npb25TdG9yYWdlXCJcclxuXHJcblxyXG5jb25zdCBidWlsZEV2ZW50cyA9IHtcclxuXHJcbiAgYnVpbGRDb250YWluZXJzKCkge1xyXG4gICAgLy8gYnVpbGRzIHRoZSB0d28gY29udGFpbmVycyB0byBob2xkIGV2ZXJ5dGhpbmdcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAvLyBidXR0b24gZm9yIG5ldyBldmVudFxyXG4gICAgY29uc3QgbmV3QnRuID0gbmV3IGNvbXAuZGl2KHsgaWQ6IFwibmV3RXZlbnRCdG5cIn0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDNcIiwgXCJOZXcgRXZlbnQhXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCIrXCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG5cclxuICAgIC8vIGNvbnRhaW5lcnNcclxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge1xyXG4gICAgICBjbGFzc05hbWU6IFwidGl0bGUtLXVwY29taW5nXCJcclxuICAgIH0sIFwiVXBjb21pbmcgRXZlbnRcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIG5ldyBjb21wLmRpdih7XHJcbiAgICAgIGlkOiBcInVwY29taW5nXCJcclxuICAgIH0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHtcclxuICAgICAgY2xhc3NOYW1lOiBcInRpdGxlLS1wYXN0XCJcclxuICAgIH0sIFwiUGFzdCBFdmVudFwiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbmV3IGNvbXAuZGl2KHtcclxuICAgICAgaWQ6IFwicGFzdFwiXHJcbiAgICB9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgLy8gdGhpcy5uZXdUYXNrKClcclxuICAgIHRoaXMubmV3RXZlbnRCdXR0b24oKTtcclxuICAgIHRoaXMuZXZlbnRGZXRjaCgpXHJcbiAgICB9LFxyXG5cclxuICBwcmludEV2ZW50cyhldmVudE9iaikge1xyXG4gICAgLy8gdGFrZXMgdGhlIG9iamVjdHMgZnJvbSB0aGUgYXBpIGFuZCBwcmludHMgdGhlbSB0byB0aGUgZG9tXHJcbiAgICBsZXQgb3V0cHV0Q29udGFpbmVyO1xyXG5cclxuICAgIC8vIG5lZWQgdG8gdGVzdCBpZiBkYXRlIGlzIGluIHRoZSBmdXR1cmUgb3IgdGhlIHBhc3RcclxuXHJcbiAgICBvdXRwdXRDb250YWluZXIgPSBcIiN1cGNvbWluZ1wiXHJcbiAgICBjb25zdCB0YXNrID0gbmV3IGNvbXAuc2VjdGlvbih7XHJcbiAgICAgICAgY2xhc3NOYW1lOiBcImV2ZW50XCIsXHJcbiAgICAgICAgaWQ6IGAke2V2ZW50T2JqLmlkfWBcclxuICAgICAgfSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoM1wiLCBgJHtldmVudE9iai5uYW1lfWApLFxyXG4gICAgICBuZXcgY29tcC5wYXIoYCR7ZXZlbnRPYmouZGF0ZX0gJHtldmVudE9iai50aW1lfWApLFxyXG4gICAgICBuZXcgY29tcC5wYXIoYCR7ZXZlbnRPYmoubG9jYXRpb259YCksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkVkaXRcIikpLnJlbmRlcihvdXRwdXRDb250YWluZXIpXHJcbiAgfSxcclxuXHJcbiAgZXZlbnRGZXRjaCgpIHtcclxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgZXZlbnRzLz91c2VySWQ9JHthY3RpdmVVc2VyLmluZm8oKS5pZH1gKSAvL2NoZWNrIGlmIHVzZXIgaXMgc2FtZSBhcyBzZXNzaW9uIHN0b3JhZ2VcclxuICAgICAgLnRoZW4oZXZlbnRPYmogPT4ge1xyXG4gICAgICAgIGV2ZW50T2JqLmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wcmludEV2ZW50cyhldmVudClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGJ1aWxkRXZlbnRzLmVkaXRCdG5MaXN0ZW4oKVxyXG4gICAgICB9KVxyXG4gIH0sXHJcblxyXG4gIG5ld0V2ZW50QnV0dG9uKCkge1xyXG4gICAgLy8gd2hlbiBjbGlja2VkIGl0IGNsZWFycyB0aGUgZG9tIGFuZCBjYWxscyB0aGUgZnVuY3Rpb24gdG8gYnVpbGQgdGhlIGZvcm1cclxuICAgICQoXCIjbmV3RXZlbnRCdG5cIikuY2xpY2soXHJcbiAgICAgIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJChcIi5jb250YWluZXItLWlubmVyXCIpLnRleHQoXCJcIilcclxuICAgICAgICBidWlsZEV2ZW50cy5uZXdFdmVudFBvcFVwKCk7XHJcbiAgICAgIH1cclxuICAgIClcclxuICB9LFxyXG5cclxuICBuZXdFdmVudFBvcFVwKCkge1xyXG4gICAgLy8gQnVpbGRzIG5ldyBldmVudCBlbnRyeSBmb3JtXHJcbiAgICBsZXQgZGl2MiA9IG5ldyBjb21wLmRpdih7XHJcbiAgICAgICAgY2xhc3NMaXN0OiBcIm5ld0V2ZW50Rm9ybVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIn0sIFwiQWRkIEEgTmV3IEV2ZW50XCIpLFxyXG4gICAgICBuZXcgY29tcC5sYWJlbChcIkV2ZW50IE5hbWVcIiksXHJcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJ0ZXh0XCJ9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJEYXRlXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7dHlwZTogXCJkYXRlXCJ9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJUaW1lXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7dHlwZTogXCJ0aW1lXCJ9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJMb2NhdGlvblwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcInRleHRcIn0pLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJTYXZlXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJCYWNrXCIpKVxyXG4gICAgZGl2Mi5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgYnVpbGRFdmVudHMubmV3RXZlbnRQb3BVcEJ0bkNsaWNrcygpO1xyXG4gIH0sXHJcblxyXG4gIG5ld0V2ZW50UG9wVXBCdG5DbGlja3MoKSB7XHJcbiAgICAvLyBncmFicyB0aGUgdHdvIGJ1dHRvbnMgb24gdGhlIHBhZ2UgYW5kIGFkZHMgYSBjbGljayBsaXN0ZW5lciBiYXNlZCBvbiBpbmRleFxyXG4gICAgY29uc3QgcG9wVXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKTtcclxuICAgIHBvcFVwQnRuc1swXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAvLyBTYXZlIEJ1dHRvblxyXG4gICAgICBjb25zdCBpbnB1dEFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xyXG4gICAgICAvLyBidWlsZHMgb2JqZWN0IHRvIHNlbmQgdG8gYXBpXHJcbiAgICAgIGNvbnN0IG5ld0V2ZW50T2JqID0ge1xyXG4gICAgICAgIG5hbWU6IGlucHV0QXJyYXlbMF0udmFsdWUsXHJcbiAgICAgICAgZGF0ZTogaW5wdXRBcnJheVsxXS52YWx1ZSxcclxuICAgICAgICB0aW1lOiBpbnB1dEFycmF5WzJdLnZhbHVlLFxyXG4gICAgICAgIGxvY2F0aW9uOiBpbnB1dEFycmF5WzNdLnZhbHVlLFxyXG4gICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWRcclxuICAgICAgfVxyXG4gICAgICAvLyBzYXZlcyBuZXcgZXZlbnQgdG8gQVBJXHJcbiAgICAgIEFQSS5zYXZlSXRlbShcImV2ZW50c1wiLCBuZXdFdmVudE9iaikudGhlbigoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgIH0pIH0pXHJcblxyXG4gICAgLy8gQmFjayBCdXR0b24gUmV0dXJucyB0byBFdmVudCBQYWdlXHJcbiAgICBwb3BVcEJ0bnNbMV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgYnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKCk7XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZWRpdEJ0bkxpc3RlbiAoKSB7XHJcbiAgICAvLyBsaXN0ZW5zIGZvciBhbGwgdGhlIGVkaXQgYnV0dG9ucyBvbiB0aGUgcGFnZVxyXG4gICAgY29uc3QgYWxsVGhlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWN0aW9uID4gYnV0dG9uXCIpO1xyXG4gICAgYWxsVGhlQnV0dG9ucy5mb3JFYWNoKGN1cnJlbnRCdG4gPT4ge1xyXG4gICAgICBjdXJyZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gdGFrZXMgdGhlIGlkIG9mIHRoZSBldmVudCB0aGF0IHdhcyBjbGlja3MsIGZldGNoZXMgZnJvbSB0aGUgYXBpIHdpdGggdGhhdCBpZCBhbmQgcGFzc2VzIG9uIHRvIHRoZSBFZGl0IEVsZW1lbnQgZm9ybVxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRCdG5JZCA9IGN1cnJlbnRCdG4ucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBBUEkuZ2V0T25lRnJvbUNhdGVnb3J5KFwiZXZlbnRzXCIsIGN1cnJlbnRCdG5JZClcclxuICAgICAgICAgIC50aGVuKHNpbmdsZUV2ZW50ID0+IHtcclxuICAgICAgICAgICAgJChcIi5jb250YWluZXItLWlubmVyXCIpLnRleHQoXCJcIilcclxuICAgICAgICAgICAgYnVpbGRFdmVudHMuZXZlbnRFZGl0Rm9ybShzaW5nbGVFdmVudCwgY3VycmVudEJ0bklkKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSxcclxuICBldmVudEVkaXRGb3JtKHNpbmdsZUV2ZW50T2JqKSB7XHJcbiAgICAvLyBidWlsZHMgRWRpdCBmb3JtXHJcbiAgICAvLyB0YWtlcyB0aGUgcmV0dXJuIGZyb20gdGhlIGZldGNoXHJcbiAgICBsZXQgZGl2MiA9IG5ldyBjb21wLmRpdih7XHJcbiAgICAgIGNsYXNzTGlzdDogXCJuZXdFdmVudEZvcm1cIlxyXG4gICAgfSxcclxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIn0sIFwiRWRpdCBZb3VyIEV2ZW50XCIpLFxyXG4gICAgbmV3IGNvbXAubGFiZWwoXCJFdmVudCBOYW1lXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGAke3NpbmdsZUV2ZW50T2JqLm5hbWV9YH0pLFxyXG4gICAgbmV3IGNvbXAubGFiZWwoXCJEYXRlXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogYCR7c2luZ2xlRXZlbnRPYmouZGF0ZX1gfSksXHJcbiAgICBuZXcgY29tcC5sYWJlbChcIlRpbWVcIiksXHJcbiAgICBuZXcgY29tcC5pbnB1dCh7dHlwZTogXCJ0aW1lXCIsIHZhbHVlOiBgJHtzaW5nbGVFdmVudE9iai50aW1lfWB9KSxcclxuICAgIG5ldyBjb21wLmxhYmVsKFwiTG9jYXRpb25cIiksXHJcbiAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogYCR7c2luZ2xlRXZlbnRPYmoubG9jYXRpb259YH0pLFxyXG4gICAgbmV3IGNvbXAuYnRuKFwiU2F2ZVwiKSxcclxuICAgIG5ldyBjb21wLmJ0bihcIkJhY2tcIikpXHJcbiAgZGl2Mi5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gIGJ1aWxkRXZlbnRzLmVkaXRFdmVudFBvcFVwQnRuQ2xpY2tzKHNpbmdsZUV2ZW50T2JqLmlkKTtcclxuICB9LFxyXG4gIGVkaXRFdmVudFBvcFVwQnRuQ2xpY2tzKGlkKSB7XHJcbiAgICAvLyBncmFicyB0aGUgdHdvIGJ1dHRvbnMgb24gdGhlIHBhZ2UgYW5kIGFkZHMgYSBjbGljayBsaXN0ZW5lciBiYXNlZCBvbiBpbmRleFxyXG4gICAgLy8gdGFrZXMgdGhlIGV2ZW50IGlkIHNvIGl0IGNhbiBiZSBwYXNzZWQgb24gd2l0aCB0aGUgUEFUQ0hcclxuICAgIGNvbnN0IHBvcFVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIik7XHJcbiAgICBwb3BVcEJ0bnNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgLy8gU2F2ZSBCdXR0b25cclxuICAgICAgY29uc3QgaW5wdXRBcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcclxuICAgICAgLy8gYnVpbGRzIG9iamVjdCB0byBzZW5kIHRvIGFwaVxyXG4gICAgICBjb25zdCBlZGl0RXZlbnRPYmogPSB7XHJcbiAgICAgICAgbmFtZTogaW5wdXRBcnJheVswXS52YWx1ZSxcclxuICAgICAgICBkYXRlOiBpbnB1dEFycmF5WzFdLnZhbHVlLFxyXG4gICAgICAgIHRpbWU6IGlucHV0QXJyYXlbMl0udmFsdWUsXHJcbiAgICAgICAgbG9jYXRpb246IGlucHV0QXJyYXlbM10udmFsdWUsXHJcbiAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZFxyXG4gICAgICB9XHJcbiAgICAgIC8vIHNhdmVzIG5ldyBldmVudCB0byBBUElcclxuICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJldmVudHNcIiwgaWQsIGVkaXRFdmVudE9iaikudGhlbigoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgIH0pIH0pXHJcblxyXG4gICAgLy8gQmFjayBCdXR0b24gUmV0dXJucyB0byBFdmVudCBQYWdlXHJcbiAgICBwb3BVcEJ0bnNbMV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgYnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKCk7XHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEV2ZW50cyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiXHJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcclxuXHJcbmNvbnN0IGxhbmRpbmdQYWdlRnVuY3MgPSB7XHJcbiAgbG9hZExhbmRpbmdQYWdlKCkge1xyXG4gICAgbmV3IGNvbXAuZGl2KFxyXG4gICAgICB7IGNsYXNzTGlzdDogXCJ3ZWxjb21lXCIgfSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJ0aXRsZVwiIH0sIFwiV2VsY29tZSB0byBNaXNzaW9uIENvbnRyb2xcIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlclwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGxldCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKVxyXG5cclxuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9naW5cIikge1xyXG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYW5kaW5nUGFnZUZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIjtcbmltcG9ydCBidWlsZE1pc3Npb25Db250cm9sIGZyb20gXCIuL21pc3Npb25Db250cm9sXCI7XG5cbmNvbnN0IGxvZ0luRnVuY3MgPSB7XG4gIGNoZWNrVXNlcih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBpZiAodXNlcm5hbWUgPT09IFwiXCIgfHwgcGFzc3dvcmQgPT09XCJcIikge1xuICAgICAgYWxlcnQoXCJZb3UgbXVzdCBlbnRlciBib3RoIHlvdXIgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHRvIGxvZyBpbi5cIilcbiAgICB9IGVsc2Uge1xuICAgICAgQVBJLmdldEFsbENhdGVnb3J5KGB1c2Vycy8/dXNlcm5hbWU9JHt1c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIG5vIHVzZXIgd2l0aCB0aGF0IHVzZXJuYW1lLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAocGFzc3dvcmQgPT09IGRhdGFbMF0ucGFzc3dvcmQpIHtcbiAgICAgICAgICBsZXQgY3VycmVudFVzZXIgPSBuZXcgY29tcC51c2VyIChkYXRhWzBdKTtcbiAgICAgICAgICByZXR1cm4gY3VycmVudFVzZXI7XG4gICAgICAgIH0gZWxzZSAoIGFsZXJ0KFwiWW91IGVudGVyZWQgdGhlIHdyb25nIHBhc3N3b3JkLiBUcnkgYWdhaW4uXCIpKVxuICAgICAgfSkudGhlbihjdXJyZW50VXNlciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRVc2VyKVxuICAgICAgICBpZiAoY3VycmVudFVzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnVpbGQgTWlzc2lvbiBMb2dpblwiKVxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VXNlcikpO1xuICAgICAgICAgIGJ1aWxkTWlzc2lvbkNvbnRyb2wucHJpbnRQbGFuZXRzKCk7XG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGxvYWRMb2dJbigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJVc2VybmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJ1c2VybmFtZVwiLCBpZDogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwicGFzc3dvcmRcIiB9LCBcIlBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInBhc3N3b3JkXCIsIGlkOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCIgfSksXG4gICAgICBuZXcgY29tcC5idG4oXCJMb2dpbiBOb3dcIiksXG4gICAgICBuZXcgY29tcC5idG4oXCJOb3QgYSB1c2VyPyBDcmVhdGUgbmV3IGFjY291bnQuXCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJMb2dpbiBOb3dcIikge1xuICAgICAgICAgIHRoaXMuY2hlY2tVc2VyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGxvZ0luRnVuY3MiLCJpbXBvcnQgbGFuZGluZ1BhZ2VGdW5jcyBmcm9tIFwiLi9sYW5kaW5nXCJcclxuaW1wb3J0IG5hdkJhciBmcm9tIFwiLi9uYXZcIlxyXG5cclxubmF2QmFyLmxvYWROYXZCYXIoKTtcclxuLy8gbGFuZGluZ1BhZ2VGdW5jcy5sb2FkTGFuZGluZ1BhZ2UoKTtcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkTWVzc2FnZXMgPSB7XG4gIHByaW50TWVzc2FnZXMobWVzc2FnZU9iaikge1xuICAgIGlmIChhY3RpdmVVc2VyLmluZm8oKS5pZCA9PT0gbWVzc2FnZU9iai51c2VyLmlkKSB7XG4gICAgICBuZXcgY29tcC5zZWN0aW9uKHtcbiAgICAgICAgICBjbGFzc05hbWU6IFwibWVzc2FnZVwiLFxuICAgICAgICAgIGlkOiBgJHttZXNzYWdlT2JqLmlkfWBcbiAgICAgICAgfSxcbiAgICAgICAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bWVzc2FnZU9iai51c2VyLnByb2ZpbGVQaWN9YCwgY2xhc3NOYW1lOiBcIm1lc3NhZ2VQaWNcIiwgYWx0OiBcIlByb2ZpbGUgUGljXCJ9KSxcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7Y2xhc3NOYW1lOiBcIm1lc3NhZ2VBdXRob3JcIn0sIGAke21lc3NhZ2VPYmoudXNlci5maXJzdE5hbWV9IC0gJHttZXNzYWdlT2JqLmRhdGV9ICR7bWVzc2FnZU9iai50aW1lU3RhbXB9YCksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG1lc3NhZ2VPYmoubWVzc2FnZUNvbnRlbnQpLFxuICAgICAgICBuZXcgY29tcC5idG4oXCJFZGl0XCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgY29tcC5zZWN0aW9uKHtcbiAgICAgICAgICBjbGFzc05hbWU6IFwibWVzc2FnZVwiLFxuICAgICAgICAgIGlkOiBgJHttZXNzYWdlT2JqLmlkfWBcbiAgICAgICAgfSxcbiAgICAgICAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bWVzc2FnZU9iai51c2VyLnByb2ZpbGVQaWN9YCwgYWx0OiBcIlByb2ZpbGUgUGljXCIsIGNsYXNzTmFtZTogXCJtZXNzYWdlUGljXCJ9KSxcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7Y2xhc3NOYW1lOlwibWVzc2FnZUF1dGhvclwifSwgYCR7bWVzc2FnZU9iai51c2VyLmZpcnN0TmFtZX0gLSAke21lc3NhZ2VPYmouZGF0ZX0gJHttZXNzYWdlT2JqLnRpbWVTdGFtcH1gKSxcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgfVxuICB9LFxuXG4gIG1lc3NhZ2VNYXAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJtZXNzYWdlcy8/X2V4cGFuZD11c2VyXCIpXG4gICAgICAudGhlbihtZXNzYWdlT2JqID0+IHtcblxuICAgICAgICBtZXNzYWdlT2JqLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAgICAgdGhpcy5wcmludE1lc3NhZ2VzKG1lc3NhZ2UpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubmV3TWVzc2FnZSgpO1xuICAgICAgICB0aGlzLnN1Ym1pdE1lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5lZGl0QnV0dG9uQ2xpY2soKTtcbiAgICAgIH0pXG4gIH0sXG4gIC8vIGJ1aWxkcyBuZXcgbWVzc2FnZSBlbnRyeSBmaWVsZFxuICBuZXdNZXNzYWdlKCkge1xuICAgIC8vd3JhcHBlZCB0aGlzIGluIGEgZGl2IGluc3RlYWQgb2YgYSBzZWN0aW9uLCB0byBncmFiIHNlY3Rpb25zIGVhc2llci5cbiAgICBuZXcgY29tcC5kaXYoe1xuICAgICAgICBjbGFzc05hbWU6IFwibmV3LS1tZXNzYWdlXCIsXG4gICAgICAgIGlkOiBcIm5ld01lc3NhZ2VcIlxuICAgICAgfSxcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIFwiTmV3IE1lc3NhZ2VcIiksXG4gICAgICBuZXcgY29tcC50ZXh0YXJlYSh7XG4gICAgICAgIHBsYWNlaG9sZGVyOiBcInR5cGUgeW91ciBtZXNzYWdlIGhlcmVcIixcbiAgICAgICAgd3JhcDogXCJoYXJkXCJcbiAgICAgIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiU3VibWl0XCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG5cbiAgc3VibWl0TWVzc2FnZSgpIHtcbiAgICAkKFwiI25ld01lc3NhZ2UgPiBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIC8vaWYgc3RhdG1lbnQgdG8gcHJldmVudCBibGFuayBlbnRyaWVzXG4gICAgICBpZiAoJChcIiNuZXdNZXNzYWdlID4gdGV4dGFyZWFcIikudmFsKCkgPT09IFwiXCIpIHtcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgeW91ciBtZXNzYWdlXCIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgLy9jcmVhdGVzIG9iamVjdCBvZiBjdXJyZW50IG1vbWVudFxuICAgICAgICBsZXQgZGF0ZUFuZFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAvL2NvbnZlcnRzIGl0IGludG8gYSBzdHJpbmcgYW5kIHRoZW4gYW4gYXJyYXkgdG8gZ3JhYiBzcGVjaWZpYyB2YWx1ZXNcbiAgICAgICAgbGV0IGRhdGVBcnJheSA9IGRhdGVBbmRUaW1lLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpO1xuICAgICAgICAvL2dldE1vbnRoKCkgbWV0aG9kIHJldHVybnMgYSBudW1iZXIgYmV0d2VlbiAwLTExLiBBZGRlZCAxIHRvIGdldCBjdXJyZW50IG1vbnRoXG4gICAgICAgIGxldCBtb250aCA9IGRhdGVBbmRUaW1lLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAvL2J1aWxkcyBvYmplY3QgdG8gcGFzcyBpbnRvIGZldGNoXG4gICAgICAgIGxldCBzdWJtaXRNZXNzYWdlT2JqID0ge1xuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiAkKFwiI25ld01lc3NhZ2UgPiB0ZXh0YXJlYVwiKS52YWwoKSxcbiAgICAgICAgICB0aW1lU3RhbXA6IGRhdGVBcnJheVs0XSwgLy9UT0RPOiBtYWtlIGl0IG5vbiBtaWxpdGFyeSB0aW1lXG4gICAgICAgICAgZGF0ZTogYCR7bW9udGh9LyR7ZGF0ZUFycmF5WzJdfS8ke2RhdGVBcnJheVszXX1gLFxuICAgICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWRcblxuICAgICAgICB9XG4gICAgICAgIC8vIHNlbmQgdG8gQVBJXG4gICAgICAgIEFQSS5zYXZlSXRlbShcIm1lc3NhZ2VzXCIsIHN1Ym1pdE1lc3NhZ2VPYmopXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBlZGl0QnV0dG9uQ2xpY2soKSB7XG4gICAgLy8gZ3JhYnMgdGhlIGVkaXQgYnV0dG9uc1xuICAgICQoXCJzZWN0aW9uID4gYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyBzdG9yZXMgdGhlIG1lc3NhZ2UgaW4gYSB2YXJhYmxlXG4gICAgICBsZXQgbWVzc2FnZUgxID0gZS50YXJnZXQucHJldmlvdXNTaWJsaW5nXG4gICAgICAvLyBzdG9yZSBtZXNzYWdlJ3MgdGV4dCBpbiBhIHZhcmFibGVcbiAgICAgIGxldCBtZXNzYWdlVGV4dCA9IG1lc3NhZ2VIMS5pbm5lckhUTUw7XG4gICAgICAvLyByZXBsYWNlcyBFZGl0IGJ1dHRvbiB3aXRoIFNhdmUgYnV0dG9uXG4gICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aChcIjxidXR0b24gY2xhc3M9ICdidG4nIHR5cGUgPSdidXR0b24nPlNhdmU8L2J1dHRvbj5cIilcbiAgICAgIC8vIHJlcGxhY2VzIG1lc3NhZ2UgdGV4dCB3aXRoIGFuIGlucHV0IGZpZWxkXG4gICAgICAkKG1lc3NhZ2VIMSkucmVwbGFjZVdpdGgoYDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkID0gXCJlZGl0RmllbGRcIiB2YWx1ZT1cIiR7bWVzc2FnZVRleHR9XCI+YClcbiAgICAgIC8vIHN0b3JlcyB0aGUgbmV3IGlucHV0IGZpZWxkIGluIGEgdmFyYWJsZVxuICAgICAgY29uc3QgbmV3SW5wdXRGaWVsZCA9ICQoXCIjZWRpdEZpZWxkXCIpO1xuICAgICAgLy8gc2V0cyBhIGNsaWNrIGV2ZW50IG9uIHRoZSBuZXcgc2F2ZSBidXR0b25cbiAgICAgIG5ld0lucHV0RmllbGQubmV4dCgpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIHN0b3JlcyBpbnB1dCB2YWx1ZSBpbiBhbiBvYmplY3QgdXBvbiBzYXZlIGNsaWNrXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VUZXh0T2JqID0ge1xuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiBuZXdJbnB1dEZpZWxkLnZhbCgpLFxuICAgICAgICB9XG4gICAgICAgIC8vIHNhdmUgbWVzc2FnZSBpZCAjXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VJZCA9IG5ld0lucHV0RmllbGQucGFyZW50KCkuYXR0cihcImlkXCIpXG4gICAgICAgIC8vIFBhdGNoIG1lc3NhZ2UgaW4gc2VydmVyIGFuZCByZWZyZXNoIHRoZSBtZXNzYWdlcyBvbiB0aGUgcGFnZVxuICAgICAgICBBUEkudXBkYXRlSXRlbShcIm1lc3NhZ2VzXCIsIGVkaXRlZE1lc3NhZ2VJZCwgZWRpdGVkTWVzc2FnZVRleHRPYmopXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRNZXNzYWdlcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cblxuY29uc3QgYnVpbGRNaXNzaW9uQ29udHJvbCA9IHtcbiAgcHJpbnRQbGFjZWhvbGRlciAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IG51bGw7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJtZXNzYWdlXCIsIGlkOiBgJHthY3RpdmVVc2VyLmluZm8oKS5pZH1gfSxcbiAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHthY3RpdmVVc2VyLmluZm8oKS5wcm9maWxlUGljfWAsIGFsdDogXCJQcm9maWxlIFBpY1wiLCBzdHlsZTpcImRpc3BsYXk6aW5saW5lLWJsb2NrOyBib3JkZXItcmFkaXVzOiA4cHg7IG1hcmdpbjogNHB4XCIsIGhlaWdodDogXCIxMjVcIiwgd2lkdGg6IFwiMTI1XCJ9KSxcbiAgICBuZXcgY29tcC50aXRsZSggXCJoMlwiLCB7c3R5bGU6XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgYm90dG9tOiAxMHB4XCJ9LCBgJHthY3RpdmVVc2VyLmluZm8oKS5maXJzdE5hbWV9IC0gJHthY3RpdmVVc2VyLmluZm8oKS5sYXN0TmFtZX0gJHthY3RpdmVVc2VyLmluZm8oKS51c2VybmFtZX1gKSxcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgcHJpbnRQbGFuZXRzICgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gbnVsbDtcbiAgICAvLyBtYWtlIHBsYW5ldHMgLSBlYWNoIHNlY3Rpb24gaXMgYSBwbGFuZXRcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViIHZpc2libGUtMVwifSxcbiAgICBuZXcgY29tcC5kaXYoe2NsYXNzTmFtZTogXCJyaW5nXCJ9KSxcbiAgICBuZXcgY29tcC5kaXYoe2NsYXNzTmFtZTogXCJyaW5nLTJcIn0pLFxuICAgIG5ldyBjb21wLnNwYW4oe2NsYXNzTmFtZTogXCJjb250YWluZXItLXN1YjJcIn0sIFwiVGFza3NcIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViIHZpc2libGUtM1wifSxcbiAgICBuZXcgY29tcC5zcGFuKHtjbGFzc05hbWU6IFwiY29udGFpbmVyLS1zdWIyXCJ9LCBcIk1lc3NhZ2VzXCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJjb250YWluZXItLXN1YiB2aXNpYmxlLTVcIn0sXG4gICAgbmV3IGNvbXAuZGl2KHtjbGFzc05hbWU6IFwicmluZ1wifSksXG4gICAgbmV3IGNvbXAuc3Bhbih7Y2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViMlwifSwgXCJGcmllbmRzXCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJjb250YWluZXItLXN1YiB2aXNpYmxlLTdcIn0sXG4gICAgbmV3IGNvbXAuc3Bhbih7Y2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViMlwifSwgXCJFdmVudHNcIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViIHZpc2libGUtOVwifSxcbiAgICBuZXcgY29tcC5zcGFuKHtjbGFzc05hbWU6IFwiY29udGFpbmVyLS1zdWIyXCJ9LCBcIk5ld3NcIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViIGdob3N0LTJcIn0sXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJjb250YWluZXItLXN1YiBnaG9zdC00XCJ9LFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwiY29udGFpbmVyLS1zdWIgZ2hvc3QtNlwifSxcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcImNvbnRhaW5lci0tc3ViIGdob3N0LThcIn0sXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9XG5cblxuICAvKiBETyBOT1QgREVMRVRFIENPTU1FTlRFRCBIVE1MIENPTlRFTlQgU08gQURWQU5DRUQgU1RZTElORyBJUyBFQVNJRVIgTEFURVIgKi9cbiAgLyogREVMRVRFIEJFRk9SRSBFTkQgT0YgUFJPSkVDVCAqL1xuXG4gIC8vIDxzZWN0aW9uIGNsYXNzPVwiY29udGFpbmVyLS1zdWIgdmlzaWJsZS0xXCI+PGRpdiBjbGFzcz1cInJpbmdcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmluZy0yXCI+PC9kaXY+PHNwYW4gY2xhc3M9XCJjb250YWluZXItLXN1YjJcIj5UYXNrczwvc3Bhbj48L3NlY3Rpb24+XG4gIC8vIDxzZWN0aW9uIGNsYXNzPVwiY29udGFpbmVyLS1zdWIgdmlzaWJsZS0zXCI+PHNwYW4gY2xhc3M9XCJjb250YWluZXItLXN1YjJcIj5NZXNzYWdlczwvc3Bhbj48L3NlY3Rpb24+XG4gIC8vIDxzZWN0aW9uIGNsYXNzPVwiY29udGFpbmVyLS1zdWIgdmlzaWJsZS01XCI+PGRpdiBjbGFzcz1cInJpbmdcIj48L2Rpdj48c3BhbiBjbGFzcz1cImNvbnRhaW5lci0tc3ViMlwiPkZyaWVuZHM8L3NwYW4+PC9zZWN0aW9uPlxuICAvLyA8c2VjdGlvbiBjbGFzcz1cImNvbnRhaW5lci0tc3ViIHZpc2libGUtN1wiPjxzcGFuIGNsYXNzPVwiY29udGFpbmVyLS1zdWIyXCI+RXZlbnRzPC9zcGFuPjwvc2VjdGlvbj5cbiAgLy8gPHNlY3Rpb24gY2xhc3M9XCJjb250YWluZXItLXN1YiB2aXNpYmxlLTlcIj48c3BhbiBjbGFzcz1cImNvbnRhaW5lci0tc3ViMlwiPk5ld3M8L3NwYW4+PC9zZWN0aW9uPlxuICAvLyA8c2VjdGlvbiBjbGFzcz1cImNvbnRhaW5lci0tc3ViIGdob3N0LTJcIj48c3BhbiBjbGFzcz1cImNvbnRhaW5lci0tc3ViMlwiPjwvc3Bhbj48L3NlY3Rpb24+XG4gIC8vIDxzZWN0aW9uIGNsYXNzPVwiY29udGFpbmVyLS1zdWIgZ2hvc3QtNFwiPjxzcGFuIGNsYXNzPVwiY29udGFpbmVyLS1zdWIyXCI+PC9zcGFuPjwvc2VjdGlvbj5cbiAgLy8gPHNlY3Rpb24gY2xhc3M9XCJjb250YWluZXItLXN1YiBnaG9zdC02XCI+PHNwYW4gY2xhc3M9XCJjb250YWluZXItLXN1YjJcIj48L3NwYW4+PC9zZWN0aW9uPlxuICAvLyA8c2VjdGlvbiBjbGFzcz1cImNvbnRhaW5lci0tc3ViIGdob3N0LThcIj48c3BhbiBjbGFzcz1cImNvbnRhaW5lci0tc3ViMlwiPjwvc3Bhbj48L3NlY3Rpb24+XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRNaXNzaW9uQ29udHJvbDsiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBsb2dJbkZ1bmNzIGZyb20gXCIuL2xvZ2luXCJcbmltcG9ydCBidWlsZE1lc3NhZ2VzIGZyb20gXCIuL21lc3NhZ2VzXCI7XG5pbXBvcnQgYnVpbGROZXdzIGZyb20gXCIuL25ld3NcIjtcbmltcG9ydCBidWlsZE1pc3Npb25Db250cm9sIGZyb20gXCIuL21pc3Npb25Db250cm9sXCI7XG5pbXBvcnQgYnVpbGRUYXNrcyBmcm9tIFwiLi90YXNrc1wiXG5pbXBvcnQgYnVpbGRFdmVudHMgZnJvbSBcIi4vZXZlbnRzXCJcblxuXG5jb25zdCBuYXZCYXIgPSB7XG4gIGxvYWROYXZCYXIoKSB7XG4gICAgbmV3IGNvbXAudWwoXG4gICAgICB7fSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkhvbWVcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJUYXNrc1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkV2ZW50c1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIk1lc3NhZ2VzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiTmV3c1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkZyaWVuZHNcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJMb2cgT3V0XCIpXG4gICAgKS5yZW5kZXIoXCIjbmF2QmFyXCIpXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdkJhclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkhvbWVcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVpbGRNaXNzaW9uQ29udHJvbC5wcmludFBsYW5ldHMoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJUYXNrc1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZFRhc2tzLmJ1aWxkQ29udGFpbmVycygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkV2ZW50c1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIk1lc3NhZ2VzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJOZXdzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBidWlsZE5ld3MubmV3c01hcCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkZyaWVuZHNcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRnJpZW5kcyBmdW5jdGlvbiBjYWxsZXMuXCIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTG9nIE91dFwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9nIE91dCBmdW5jdGlvbiBjYWxsZWQuXCIpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmF2QmFyIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHt9LCBgJHtuZXdzT2JqLmFydGljbGVOYW1lfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDRcIiwge30sIGBTYXZlZCBieTogJHtuZXdzT2JqLnVzZXIuZmlyc3ROYW1lfSB8IERhdGUgU2F2ZWQ6ICR7bmV3c09iai5kYXRlU2F2ZWR9YCksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbmV3c09iai5hYm91dCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgbmV3c01hcCAoKSAge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwiYXJ0aWNsZXMvP19leHBhbmQ9dXNlciZ1c2VyaWQ9X3NvcnQ9ZGF0ZVNhdmVkJl9vcmRlcj1kZXNjXCIpXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICB0aGlzLnByaW50TmV3cyhuZXdzKX0pKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5uZXdOZXdzKCkpXG5cbiAgfSxcblxuICBuZXdOZXdzICgpIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tbmV3c1wifSxcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7fSwgXCJTYXZlIE5ld3MgQXJ0aWNsZVwiKSxcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlTmFtZVwifSwgXCJBcnRpY2xlIE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIE5hbWVcIiwgaWQ6IFwiYXJ0aWNsZU5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZVVybFwifSwgXCJBcnRpY2xlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTGlua1wiLCBpZDogXCJhcnRpY2xlTGlua1wifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVJbWFnZVVybFwifSwgXCJBcnRpY2xlIEltYWdlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlSW1hZ2VVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIsIGlkOiBcImFydGljbGVJbWFnZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVEZXNjcmlwdGlvblwifSwgXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgRGVzY3JpcHRpb25cIiwgaWQ6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlNhdmUgTmV3IEFydGljbGVcIilcbiAgICApLFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICBsZXQgc3RvcnkgPSB7XG4gICAgICAgIGFydGljbGVOYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVOYW1lXCIpLnZhbHVlLFxuICAgICAgICB1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUxpbmtcIikudmFsdWUsXG4gICAgICAgIGFydGljbGVJbWFnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlSW1hZ2VcIikudmFsdWUsXG4gICAgICAgIGFib3V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVEZXNjcmlwdGlvblwiKS52YWx1ZSxcbiAgICAgICAgLypcbiAgICAgICAgTkVFRCBUTyBVUERBVEUgVVNFUiBJRCBUTyBTQVZFIFNFU1NJT04gQVNTSUdORUQgSURcbiAgICAgICAgKi9cbiAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8uaWQoKSxcbiAgICAgICAgZGF0ZVNhdmVkOiBuZXcgRGF0ZSgpXG4gICAgICB9XG4gICAgICBidWlsZE5ld3MuYWRkTmV3cyhzdG9yeSlcbiAgICB9KVxuICB9LFxuXG4gIGFkZE5ld3Moc3Rvcnkpe1xuICAgIEFQSS5zYXZlSXRlbShcImFydGljbGVzXCIsIHN0b3J5KS50aGVuKCgpPT4gdGhpcy5uZXdzTWFwKCkpXG4gIH1cblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE5ld3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5jb25zdCByZWdpc3RlckZ1bmNzID0ge1xuXG4gIGxvYWRSZWdpc3RlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJGaXJzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImZpcnN0TmFtZVwiLCBpZDogXCJmaXJzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiRmlyc3QgTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiTGFzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImxhc3ROYW1lXCIsIGlkOiBcImxhc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkxhc3QgTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRW1haWxcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwiZW1haWxcIiwgaWQ6IFwiZW1haWxcIiwgbmFtZTogXCJlbWFpbFwiLCBwbGFjZWhvbGRlcjogXCJlbWFpbFwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwidXNlcm5hbWVcIiwgaWQ6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcInBhc3N3b3JkXCIgfSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJwYXNzd29yZFwiLCBpZDogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwiY29uZmlybVBhc3N3b3JkXCIgfSwgXCJDb25maXJtIFBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImNvbmZpcm1QYXNzd29yZFwiLCBpZDogXCJjb25maXJtUGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiUmVnaXN0ZXIgQWNjb3VudFwiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkFscmVhZHkgYSB1c2VyPyBMb2cgaW4gbm93XCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJSZWdpc3RlciBBY2NvdW50XCIpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdE5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0TmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1QYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBjaGVjayB0byBlbnN1cmUgYWxsIGZpZWxkcyBhcmUgY29tcGxldGUuXG4gICAgICAgICAgICBhbGVydChcIkFsbCBmaWVsZHMgbXVzdCBiZSBjb21wbGV0ZSB0byBjcmVhdGUgYW4gYWNjb3VudC5cIilcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUuaW5kZXhPZihcIkBcIikgPT09IC0xKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgYSBjaGVjayBvbiB0aGUgZW1haWwgZmllbGQgdG8gbWFrZSBzdXJlIHRoZXJlIGlzIGFuIEAgcHJlc2VudFxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUGFzc3dvcmRcIikudmFsdWUpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY2hlY2sgdG8gbWFrZSBzdXJlIHBhc3N3b3JkcyBhcmUgdGhlIHNhbWUuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGxldCB0ZW1wVXNlciA9IHtcbiAgICAgICAgICAgICAgZmlyc3ROYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpcnN0TmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgbGFzdE5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIGVtYWlsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlLFxuICAgICAgICAgICAgICB1c2VybmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUsXG4gICAgICAgICAgICAgIC8vVGhpcyBpcyBhIHBsYWNlaG9sZGVyIHRvIGEgc3RvY2sgXCJubyBpbWFnZSBhdmFpbGFibGVcIiBpbWFnZSB0aGF0IHdlIGNhbiB1c2UgbGF0ZXIgZm9yIGFjdHVhbCB1c2VyIGltYWdlc1xuICAgICAgICAgICAgICBwcm9maWxlUGljOiBcImh0dHBzOi8vaHloYS54eXovd3AtY29udGVudC90aGVtZXMvZmFzaGlvbi9pbWFnZXMvbm9faW1hZ2VfYXZhaWxhYmxlLmpwZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz9lbWFpbD0ke3RlbXBVc2VyLmVtYWlsfWApLnRoZW4odGhpc0RhdGEgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpc0RhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1JlZ2lzdGVyKHRlbXBVc2VyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlRoaXMgZW1haWwgaXMgYWxyZWFkeSByZWdpc3RlcmVkLlwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7IGFsZXJ0KFwiWW91ciBwYXNzd29yZHMgZGlkIG5vdCBtYXRjaC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIikgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIGNoZWNrUmVnaXN0ZXIodXNlcikge1xuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlci51c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIEFQSS5zYXZlSXRlbShcInVzZXJzXCIsIHVzZXIpLnRoZW4obmV3VXNlciA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlcihuZXdVc2VyKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXJuYW1lIGNoZWNrUmVnaXN0ZXI6IFwiLCBjdXJyZW50VXNlcilcbiAgICAgICAgICAvL1RPRE86dGhlIGZ1bmN0aW9uIGJlbG93IG5lZWRzIHRvIGJlIHRoZSBjYWxsIHRvIGxvYWQgbWlzc2lvbiBjb250cm9sIHBhZ2UuXG4gICAgICAgICAgLy8gUmlnaHQgbm93IGl0IGlzIGp1c3Qgc2VuZGluZyB0byBhIGZ1bmN0aW9uIHRvIGNvbnNvbGUubG9nIHVzZXJcbiAgICAgICAgICB0aGlzLmxvYWRNaXNzaW9uKGN1cnJlbnRVc2VyKTtcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYWxlcnQoYFVzZXJuYW1lLCAke2RhdGFbMF0udXNlcm5hbWV9LCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuIFBsZWFzZSBjaG9vc2UgYW5vdGhlci5gKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLy9UT0RPOiB0aGlzIGZ1bmN0aW9uIGNhbiBnbyBhd2F5IHdoZW4gdGhlIGZ1bmN0aW9uIHRvIGxvYWQgbWlzc2lvbiBwYWdlIGlzIHJlcGxhY2VkIGluIGNoZWNrUmVnaXN0ZXIgZnVuY3Rpb24gYWJvdmVcbiAgbG9hZE1pc3Npb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckZ1bmNzIiwiLy8gc2NyaXB0cyByZWxhdGVkIHRvIHNlc3Npb25TdG9yYWdlXHJcblxyXG5jb25zdCBhY3RpdmVVc2VyID0ge1xyXG4gIGluZm8gKCkge1xyXG4gICAgbGV0IGxvZ2dlZEluVXNlciA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuY3VycmVudFVzZXIpO1xyXG4gICAgICByZXR1cm4gbG9nZ2VkSW5Vc2VyO1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZlVXNlcjtcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkVGFza3MgPSB7XG5cbiAgLy9mdW5jdGlvbiBydW4gZmlyc3QgaW4gb3JkZXIgdG8gY2xlYXIgSFRNTCwgY3JlYXRlIHBhcmVudCBjb250YWluZXJzLCB0aGVuIGFkZCBuZXcgdGFzayBpbnB1dCBhbmQgY2FsbCBmZXRjaFxuICBidWlsZENvbnRhaW5lcnMgKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0taW5jb21wbGV0ZVwifSwgXCJJbmNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgbmV3IGNvbXAuZGl2ICh7aWQ6IFwiaW5jb21wbGV0ZVwifSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7Y2xhc3NOYW1lOiBcInRpdGxlLS1jb21wbGV0ZVwifSwgXCJDb21wbGV0ZSBUYXNrc1wiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIG5ldyBjb21wLmRpdiAoe2lkOiBcImNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIHRoaXMubmV3VGFzaygpXG4gICAgdGhpcy50YXNrc0ZldGNoKClcbiAgfSxcblxuICAvL3VzZWQgdG8gY3JlYXRlIGFuZCBhcHBlbmQgYWxsIHRhc2tzIGZyb20gZGF0YWJhc2UgdG8gRE9NXG4gIHByaW50VGFza3MgKHRhc2tzT2JqKSB7XG4gICAgbGV0IG91dHB1dENvbnRhaW5lcjtcblxuICAgIGlmICh0YXNrc09iai5jb21wbGV0ZSkge1xuICAgICAgb3V0cHV0Q29udGFpbmVyID0gXCIjY29tcGxldGVcIlxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNpbmNvbXBsZXRlXCJcbiAgICB9XG5cbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcInRhc2tcIiwgaWQ6IGAke3Rhc2tzT2JqLmlkfWB9LFxuICAgIG5ldyBjb21wLmNoZWNrYm94KCksXG4gICAgbmV3IGNvbXAucGFyKHtjbGFzc05hbWU6IFwiZWRpdGFibGUtLXRhc2tcIn0sIHRhc2tzT2JqLnRhc2spLFxuICAgIG5ldyBjb21wLnBhcih7Y2xhc3NOYW1lOiBcImVkaXRhYmxlLS1kYXRlXCJ9LCB0YXNrc09iai5kdWVEYXRlKSkucmVuZGVyKG91dHB1dENvbnRhaW5lcilcbiAgfSxcblxuICAvL2ZldGNoIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlLCBjYWxsIGNyZWF0ZS9hcHBlbmQgYW5kIGNhbGwgYWRkIGxpc3RlbmVyc1xuICB0YXNrc0ZldGNoICgpICB7XG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwidGFza3NcIikgLy9jaGVjayBpZiB1c2VyIGlzIHNhbWUgYXMgc2Vzc2lvbiBzdG9yYWdlXG4gICAgLnRoZW4odGFza3NPYmogPT4gIHtcbiAgICAgIHRhc2tzT2JqLmZvckVhY2godGFzayA9PiB7XG4gICAgICB0aGlzLnByaW50VGFza3ModGFzayl9KVxuICAgICAgdGhpcy5jYkxpc3RlbmVyKClcbiAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxuICAgIH0pXG4gIH0sXG5cbiAgLy9jaGVja2JveCBsaXN0ZW5lciB3aWxsIG1vdmUgdGFza3MgYmV0d2VlbiBjb21wbGV0ZSBhbmQgaW5jb21wbGV0ZSBjb250YWluZXJzXG4gIC8vZGF0YWJhc2UgXCJjb21wbGV0ZVwiIHByb3BlcnR5IHdpbGwgYmUgcGF0Y2hlZCBhY2NvcmRpbmdseSBhbmQgRE9NIHVwZGF0ZWRcbiAgY2JMaXN0ZW5lciAoKSB7XG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKVxuXG4gICAgLy9pZiB0aGUgaWQgb2YgdGhlIGdyYW5kcGFyZW50IGNvbnRhaW5lciBpcyAjY29tcGxldGUsIHRoZW4gY2hlY2sgdGhlIGJveFxuICAgIGNoZWNrYm94ZXMuZm9yRWFjaCggKGNoZWNrYm94KSA9PiB7XG4gICAgICBpZiAoY2hlY2tib3gucGFyZW50Tm9kZS5wYXJlbnROb2RlLmlkID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgbGV0IHBhdGNoUHJvcGVydHk7XG4gICAgICAgIC8vaWYgZmFsc2UgLT4gdHJ1ZVxuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIHBhdGNoUHJvcGVydHkgPSB7Y29tcGxldGU6IHRydWV9XG4gICAgICAgICAgLy9wYXRjaCBcImNvbXBsZXRlXCIgcHJvcGVydHkgb2YgZGF0YWJhc2Ugb2JqZWN0IHVzaW5nIHBhcmVudE5vZGUgKHNlY3Rpb24pIElEIHRvIFRSVUVcbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy9pZiBjaGVja2JveCBpcyB1bmNoZWNrZWQuLi5cbiAgICAgICAgICBwYXRjaFByb3BlcnR5ID0ge2NvbXBsZXRlOiBmYWxzZX1cbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9LFxuXG4gIC8vZnVuY3Rpb24gdXNlZCB0byBlZGl0IHRhc2tzIGluIERPTSBhbmQgcGF0Y2ggbmV3IGluZm8gdG8gZGF0YWJhc2UgdGFzayBkZXNjcmlwdGlvbiBhbmQgZGF0ZVxuICBwYXJMaXN0ZW5lciAoKSB7XG4gICAgLy9nZXQgYWxsIHNlY3Rpb25zIG9uIHBhZ2VcbiAgICBsZXQgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VjdGlvblwiKVxuXG4gICAgLy8vYWRkIGNsaWNrIGxpc3RlbmVyIHRvIGFsbCBzZWN0aW9uc1xuICAgIHNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XG4gICAgICBzZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAvL2dldCBpZCBvZiB0YXJnZXQgc2VjdGlvblxuICAgICAgICBjb25zdCBpZCA9IGUudGFyZ2V0LnBhcmVudE5vZGUuaWRcblxuICAgICAgICAvL2lmIHBhcmFncmFwaCBjbGlja2VkIGlzIHRhc2sgZGVzY3JpcHRpb24sIGdldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgLy9jcmVhdGUgbmV3IDxpbnB1dD4gdGVtcGxhdGUgKHdpdGggIElEISkgYW5kIHJlcGxhY2UgPHA+IHdpdGggPGlucHV0PlxuICAgICAgICAvL2FkZCBhIGtleWRvd24gbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkZXNjcmlwdGlvbiB0byBkYXRhYmFzZSB3aGVuIEVOVEVSIGlzIHByZXNzZWRcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRhYmxlLS10YXNrXCIpKSB7XG4gICAgICAgICAgY29uc3QgdGFza05hbWUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxuICAgICAgICAgIGxldCB0ZW1wVGFza0lucHV0ID0gYDxpbnB1dCBpZD1cInRlbXAxXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGFza05hbWV9XCI+YFxuICAgICAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKHRlbXBUYXNrSW5wdXQpXG4gICAgICAgICAgY29uc3QgdGVtcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMVwiKTtcbiAgICAgICAgICAgIHRlbXBJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoVGFzayA9IHt0YXNrOiB0ZW1wSW5wdXQudmFsdWV9XG4gICAgICAgICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBpZCwgcGF0Y2hUYXNrKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgLy9pZiBwYXJhZ3JhcGggY2xpY2tlZCBpcyB0YXNrIGR1ZSBkYXRlLCBnZXQgdGV4dCBjb250ZW50XG4gICAgICAgIC8vY3JlYXRlIG5ldyA8aW5wdXQ+IHRlbXBsYXRlICh3aXRoICBJRCEpIGFuZCByZXBsYWNlIDxwPiB3aXRoIDxpbnB1dD5cbiAgICAgICAgLy9hZGQgYSBjaGFuZ2UgbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkdWUgZGF0ZSB0byBkYXRhYmFzZSB3aGVuIG5ldyBkYXRlIGlzIHNlbGVjdGVkXG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGFibGUtLWRhdGVcIikpIHtcbiAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgbGV0IHRlbXBUYXNrRGF0ZSA9IGA8aW5wdXQgaWQ9XCJ0ZW1wMlwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke3Rhc2tEYXRlfVwiPmBcbiAgICAgICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aCh0ZW1wVGFza0RhdGUpXG4gICAgICAgICAgICBjb25zdCB0ZW1wRGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMlwiKTtcbiAgICAgICAgICAgIHRlbXBEYXRlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoRGF0ZSA9IHtkdWVEYXRlOiB0ZW1wRGF0ZUlucHV0LnZhbHVlfVxuICAgICAgICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgaWQsIHBhdGNoRGF0ZSlcbiAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgfSxcblxuICAvL2NyZWF0ZXMgbmV3IHRhc2sgaW5wdXQgZmllbGQgd2l0aCBhcHBlbmQgYnV0dG9uIGluc2lkZSBmaXJzdCBzZWN0aW9uIG9mIElOQ09NUExFVEUgY29udGFpbmVyXG4gIG5ld1Rhc2sgKCkge1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS10YXNrXCJ9LFxuICAgIG5ldyBjb21wLmJ0biAoXCIrXCIpLFxuICAgIG5ldyBjb21wLmlucHV0KHtpZDogXCJpbnB1dC0tdGFza1wiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwidHlwZSBuZXcgdGFzayBoZXJlXCJ9KSxcbiAgICBuZXcgY29tcC5pbnB1dCh7aWQ6IFwiaW5wdXQtLWRhdGVcIiwgdHlwZTogXCJkYXRlXCJ9KSkucmVuZGVyKFwiI2luY29tcGxldGVcIilcblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIilcbiAgICBjb25zdCBpbnB1dF90YXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC0tdGFza1wiKVxuICAgIGNvbnN0IGlucHV0X2RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LS1kYXRlXCIpXG5cbiAgICAvL2J1dHRvbiBjbGljayBwb3N0cyBuZXcgdGFzayB0byBkYXRhYmFzZSBhbmQgcmVzZXRzIG5ldyB0YXNrIGlucHV0IHN0cmluZ3NcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoaW5wdXRfdGFzay52YWx1ZSA9PT0gXCJcIiB8fCBpbnB1dF9kYXRlLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRhc2tJdGVtID0ge1xuICAgICAgICAgIHRhc2s6IGlucHV0X3Rhc2sudmFsdWUsXG4gICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgIGR1ZURhdGU6IGlucHV0X2RhdGUudmFsdWUsXG4gICAgICAgICAgLypcbiAgICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxuICAgICAgICAgICovXG4gICAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZCxcbiAgICAgICAgfVxuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJ0YXNrc1wiLCB0YXNrSXRlbSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLnByaW50VGFza3MoZGF0YSlcbiAgICAgICAgICB0aGlzLmNiTGlzdGVuZXIoKVxuICAgICAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxuICAgICAgICB9KVxuICAgICAgICBpbnB1dF90YXNrLnZhbHVlID0gXCJcIlxuICAgICAgICBpbnB1dF9kYXRlLnZhbHVlID0gXCJcIlxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRUYXNrcyJdfQ==
