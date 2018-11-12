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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzLmpzIiwiLi4vc2NyaXB0cy9sYW5kaW5nLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMuanMiLCIuLi9zY3JpcHRzL21pc3Npb25Db250cm9sLmpzIiwiLi4vc2NyaXB0cy9uYXYuanMiLCIuLi9zY3JpcHRzL25ld3MuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL3NjcmlwdHMvdGFza3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEs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S0FyQkQ7QUFzQkQ7O0FBdEpnQixDQUFuQjtlQXlKZSxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGVsZW1lbnRTeW1ib2wgPSBTeW1ib2woKVxuXG5jbGFzcyBET01Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIElmIGBhdHRyaWJ1dGVzYCBpcyBqdXN0IGEgc3RyaW5nLCBpdCdzIGEgc2ltcGxlIGVsZW1lbnQgd2l0aCBub1xuICAgICAgICAgICAgcHJvcGVydGllcyAtIGp1c3Qgc29tZSB0ZXh0IGNvbnRlbnRcbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gYXR0cmlidXRlc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IE9iamVjdC5hc3NpZ24odGhpc1tlbGVtZW50U3ltYm9sXSwgYXR0cmlidXRlcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9uZSBIVE1MRWxlbWVudCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmVsZW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGNoaWxkLmVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQW4gYXJyYXkgb2YgZWxlbWVudHMgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaGlsZC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5lbGVtZW50LmZvckVhY2goYyA9PiB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGMpKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZyB2YWx1ZSB3YXMgcGFzc2VkIGluLCBzZXQgdGV4dCBjb250ZW50XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS50ZXh0Q29udGVudCA9IGNoaWxkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZ2V0IGVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tlbGVtZW50U3ltYm9sXVxuICAgIH1cblxuICAgIHJlbmRlcihjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpc1tlbGVtZW50U3ltYm9sXSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpLmFwcGVuZENoaWxkKGZyYWdtZW50KVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBET01Db21wb25lbnRcbiIsImNvbnN0IFVSTCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L1wiXG5cbmNvbnN0IEFQSSA9IHtcbiAgZ2V0QWxsQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YClcbiAgICAgIC50aGVuKGVudHJpZXMgPT4gZW50cmllcy5qc29uKCkpXG4gIH0sXG5cbiAgZ2V0T25lRnJvbUNhdGVnb3J5KGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0vJHtpZH1gKVxuICAgICAgLnRoZW4oaW5wdXRzID0+IGlucHV0cy5qc29uKCkpXG4gIH0sXG5cbiAgc2F2ZUl0ZW0oY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgIH1cbiAgICApLnRoZW4oanNvbkRhdGEgPT4ganNvbkRhdGEuanNvbigpKVxuICB9LFxuXG4gIGRlbGV0ZUl0ZW0oY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIHVwZGF0ZUl0ZW0oY2F0ZWdvcnksIGlkLCBpdGVtKXtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9LyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICB9XG4gICAgKVxuXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBET01Db21wb25lbnQgZnJvbSBcIi4uL2xpYi9ub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKG51bGwsIHtcclxuXHJcbiAgdXNlcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIFVzZXIge1xyXG4gICAgICBjb25zdHJ1Y3Rvcih0ZW1wSW5mbykge1xyXG4gICAgICAgIHRoaXMuaWQgPSB0ZW1wSW5mby5pZDtcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IHRlbXBJbmZvLmZpcnN0TmFtZTtcclxuICAgICAgICB0aGlzLmxhc3ROYW1lID0gdGVtcEluZm8ubGFzdE5hbWU7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRlbXBJbmZvLnVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSB0ZW1wSW5mby5wYXNzd29yZDtcclxuICAgICAgICB0aGlzLmVtYWlsID0gdGVtcEluZm8uZW1haWw7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlUGljID0gdGVtcEluZm8ucHJvZmlsZVBpYztcclxuICAgIH1cclxuICAgIC8vVE9ETzogdGhpcyBpcyBqdXN0IGEgdGVzdCBmdW5jdGlvbi4gd2Ugd291bGQgaGF2ZSB0aGUgYWJpbGl0eSB0byBjYWxsIGZvciBzYXZpbmdcclxuICAgIC8vIG1lc3NhZ2VzLGFydGljbGVzLCBldmVudHMgYmUgcmVmZXJlbmNpbmcgYSBmdW5jdGlvbiBkZWZpbmVkIGhlcmVcclxuICAgICAgdGVzdCgpIHtcclxuICAgICAgICByZXR1cm4gYFdlbGNvbWUgJHt0aGlzLmZpcnN0TmFtZX0hIExldCdzIHNlZSB3aGF0J3MgZ29pbmcgb24uYDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGRpdjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGRpdiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkaXZcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGJ0bjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGJ0biBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwiYnRuXCIsIHR5cGU6IFwiYnV0dG9uXCIgfSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGlucHV0OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW5wdXQgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNlY3Rpb246IHtcclxuICAgIHZhbHVlOiBjbGFzcyBzZWN0aW9uIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInNlY3Rpb25cIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHRpdGxlOiB7IC8vZGVmaW5lIGFueSB0eXBlIG9mIGgjLi4gaDEsIGgyLCBldGMuXHJcbiAgICB2YWx1ZTogY2xhc3MgdGl0bGUgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYW5jaG9yOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYW5jaG9yIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImFcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNoZWNrYm94OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgY2hlY2tib3ggZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNsYXNzTmFtZTogXCJjYlwiIH0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbWFnZToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGltYWdlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImltZ1wiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB1bCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ1bFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGk6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsaSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsaVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGZvcm0gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZm9ybVwiLCB7fSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxhYmVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGFiZWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGFiZWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHRleHRhcmVhOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgdGV4dGFyZWEgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwidGV4dGFyZWFcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHBhcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHBhciBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJwXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KSIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxyXG5pbXBvcnQgYWN0aXZlVXNlciBmcm9tIFwiLi9zZXNzaW9uU3RvcmFnZVwiXHJcblxyXG5cclxuY29uc3QgYnVpbGRFdmVudHMgPSB7XHJcblxyXG4gIGJ1aWxkQ29udGFpbmVycygpIHtcclxuICAgIC8vIGJ1aWxkcyB0aGUgdHdvIGNvbnRhaW5lcnMgdG8gaG9sZCBldmVyeXRoaW5nXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgLy8gYnV0dG9uIGZvciBuZXcgZXZlbnRcclxuICAgIGNvbnN0IG5ld0J0biA9IG5ldyBjb21wLmRpdih7IGlkOiBcIm5ld0V2ZW50QnRuXCJ9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgzXCIsIFwiTmV3IEV2ZW50IVwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiK1wiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuXHJcbiAgICAvLyBjb250YWluZXJzXHJcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHtcclxuICAgICAgY2xhc3NOYW1lOiBcInRpdGxlLS11cGNvbWluZ1wiXHJcbiAgICB9LCBcIlVwY29taW5nIEV2ZW50XCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBuZXcgY29tcC5kaXYoe1xyXG4gICAgICBpZDogXCJ1cGNvbWluZ1wiXHJcbiAgICB9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7XHJcbiAgICAgIGNsYXNzTmFtZTogXCJ0aXRsZS0tcGFzdFwiXHJcbiAgICB9LCBcIlBhc3QgRXZlbnRcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIG5ldyBjb21wLmRpdih7XHJcbiAgICAgIGlkOiBcInBhc3RcIlxyXG4gICAgfSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIC8vIHRoaXMubmV3VGFzaygpXHJcbiAgICB0aGlzLm5ld0V2ZW50QnV0dG9uKCk7XHJcbiAgICB0aGlzLmV2ZW50RmV0Y2goKVxyXG4gICAgfSxcclxuXHJcbiAgcHJpbnRFdmVudHMoZXZlbnRPYmopIHtcclxuICAgIC8vIHRha2VzIHRoZSBvYmplY3RzIGZyb20gdGhlIGFwaSBhbmQgcHJpbnRzIHRoZW0gdG8gdGhlIGRvbVxyXG4gICAgbGV0IG91dHB1dENvbnRhaW5lcjtcclxuXHJcbiAgICAvLyBuZWVkIHRvIHRlc3QgaWYgZGF0ZSBpcyBpbiB0aGUgZnV0dXJlIG9yIHRoZSBwYXN0XHJcblxyXG4gICAgb3V0cHV0Q29udGFpbmVyID0gXCIjdXBjb21pbmdcIlxyXG4gICAgY29uc3QgdGFzayA9IG5ldyBjb21wLnNlY3Rpb24oe1xyXG4gICAgICAgIGNsYXNzTmFtZTogXCJldmVudFwiLFxyXG4gICAgICAgIGlkOiBgJHtldmVudE9iai5pZH1gXHJcbiAgICAgIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDNcIiwgYCR7ZXZlbnRPYmoubmFtZX1gKSxcclxuICAgICAgbmV3IGNvbXAucGFyKGAke2V2ZW50T2JqLmRhdGV9ICR7ZXZlbnRPYmoudGltZX1gKSxcclxuICAgICAgbmV3IGNvbXAucGFyKGAke2V2ZW50T2JqLmxvY2F0aW9ufWApLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJFZGl0XCIpKS5yZW5kZXIob3V0cHV0Q29udGFpbmVyKVxyXG4gIH0sXHJcblxyXG4gIGV2ZW50RmV0Y2goKSB7XHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYGV2ZW50cy8/dXNlcklkPSR7YWN0aXZlVXNlci5pbmZvKCkuaWR9Jl9zb3J0PWRhdGUsdGltZSZfb3JkZXI9YXNjYCkgLy9jaGVjayBpZiB1c2VyIGlzIHNhbWUgYXMgc2Vzc2lvbiBzdG9yYWdlXHJcbiAgICAgIC50aGVuKGV2ZW50T2JqID0+IHtcclxuICAgICAgICBldmVudE9iai5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMucHJpbnRFdmVudHMoZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBidWlsZEV2ZW50cy5lZGl0QnRuTGlzdGVuKClcclxuICAgICAgfSlcclxuICB9LFxyXG5cclxuICBuZXdFdmVudEJ1dHRvbigpIHtcclxuICAgIC8vIHdoZW4gY2xpY2tlZCBpdCBjbGVhcnMgdGhlIGRvbSBhbmQgY2FsbHMgdGhlIGZ1bmN0aW9uIHRvIGJ1aWxkIHRoZSBmb3JtXHJcbiAgICAkKFwiI25ld0V2ZW50QnRuXCIpLmNsaWNrKFxyXG4gICAgICBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQoXCIuY29udGFpbmVyLS1pbm5lclwiKS50ZXh0KFwiXCIpXHJcbiAgICAgICAgYnVpbGRFdmVudHMubmV3RXZlbnRQb3BVcCgpO1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgbmV3RXZlbnRQb3BVcCgpIHtcclxuICAgIC8vIEJ1aWxkcyBuZXcgZXZlbnQgZW50cnkgZm9ybVxyXG4gICAgbGV0IGRpdjIgPSBuZXcgY29tcC5kaXYoe1xyXG4gICAgICAgIGNsYXNzTGlzdDogXCJuZXdFdmVudEZvcm1cIlxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCJ9LCBcIkFkZCBBIE5ldyBFdmVudFwiKSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJFdmVudCBOYW1lXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwidGV4dFwifSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiRGF0ZVwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwiZGF0ZVwifSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiVGltZVwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwidGltZVwifSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiTG9jYXRpb25cIiksXHJcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJ0ZXh0XCJ9KSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiU2F2ZVwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiQmFja1wiKSlcclxuICAgIGRpdjIucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGJ1aWxkRXZlbnRzLm5ld0V2ZW50UG9wVXBCdG5DbGlja3MoKTtcclxuICB9LFxyXG5cclxuICBuZXdFdmVudFBvcFVwQnRuQ2xpY2tzKCkge1xyXG4gICAgLy8gZ3JhYnMgdGhlIHR3byBidXR0b25zIG9uIHRoZSBwYWdlIGFuZCBhZGRzIGEgY2xpY2sgbGlzdGVuZXIgYmFzZWQgb24gaW5kZXhcclxuICAgIGNvbnN0IHBvcFVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIik7XHJcbiAgICBwb3BVcEJ0bnNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgLy8gU2F2ZSBCdXR0b25cclxuICAgICAgY29uc3QgaW5wdXRBcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcclxuICAgICAgLy8gYnVpbGRzIG9iamVjdCB0byBzZW5kIHRvIGFwaVxyXG4gICAgICBjb25zdCBuZXdFdmVudE9iaiA9IHtcclxuICAgICAgICBuYW1lOiBpbnB1dEFycmF5WzBdLnZhbHVlLFxyXG4gICAgICAgIGRhdGU6IGlucHV0QXJyYXlbMV0udmFsdWUsXHJcbiAgICAgICAgdGltZTogaW5wdXRBcnJheVsyXS52YWx1ZSxcclxuICAgICAgICBsb2NhdGlvbjogaW5wdXRBcnJheVszXS52YWx1ZSxcclxuICAgICAgICB1c2VySWQ6IGFjdGl2ZVVzZXIuaW5mbygpLmlkXHJcbiAgICAgIH1cclxuICAgICAgLy8gc2F2ZXMgbmV3IGV2ZW50IHRvIEFQSVxyXG4gICAgICBBUEkuc2F2ZUl0ZW0oXCJldmVudHNcIiwgbmV3RXZlbnRPYmopLnRoZW4oKCkgPT4ge1xyXG4gICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTtcclxuICAgICB9KSB9KVxyXG5cclxuICAgIC8vIEJhY2sgQnV0dG9uIFJldHVybnMgdG8gRXZlbnQgUGFnZVxyXG4gICAgcG9wVXBCdG5zWzFdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgfSlcclxuICB9LFxyXG4gIGVkaXRCdG5MaXN0ZW4gKCkge1xyXG4gICAgLy8gbGlzdGVucyBmb3IgYWxsIHRoZSBlZGl0IGJ1dHRvbnMgb24gdGhlIHBhZ2VcclxuICAgIGNvbnN0IGFsbFRoZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VjdGlvbiA+IGJ1dHRvblwiKTtcclxuICAgIGFsbFRoZUJ1dHRvbnMuZm9yRWFjaChjdXJyZW50QnRuID0+IHtcclxuICAgICAgY3VycmVudEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vIHRha2VzIHRoZSBpZCBvZiB0aGUgZXZlbnQgdGhhdCB3YXMgY2xpY2tzLCBmZXRjaGVzIGZyb20gdGhlIGFwaSB3aXRoIHRoYXQgaWQgYW5kIHBhc3NlcyBvbiB0byB0aGUgRWRpdCBFbGVtZW50IGZvcm1cclxuICAgICAgICBjb25zdCBjdXJyZW50QnRuSWQgPSBjdXJyZW50QnRuLnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgQVBJLmdldE9uZUZyb21DYXRlZ29yeShcImV2ZW50c1wiLCBjdXJyZW50QnRuSWQpXHJcbiAgICAgICAgICAudGhlbihzaW5nbGVFdmVudCA9PiB7XHJcbiAgICAgICAgICAgICQoXCIuY29udGFpbmVyLS1pbm5lclwiKS50ZXh0KFwiXCIpXHJcbiAgICAgICAgICAgIGJ1aWxkRXZlbnRzLmV2ZW50RWRpdEZvcm0oc2luZ2xlRXZlbnQsIGN1cnJlbnRCdG5JZClcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZXZlbnRFZGl0Rm9ybShzaW5nbGVFdmVudE9iaikge1xyXG4gICAgLy8gYnVpbGRzIEVkaXQgZm9ybVxyXG4gICAgLy8gdGFrZXMgdGhlIHJldHVybiBmcm9tIHRoZSBmZXRjaFxyXG4gICAgbGV0IGRpdjIgPSBuZXcgY29tcC5kaXYoe1xyXG4gICAgICBjbGFzc0xpc3Q6IFwibmV3RXZlbnRGb3JtXCJcclxuICAgIH0sXHJcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCJ9LCBcIkVkaXQgWW91ciBFdmVudFwiKSxcclxuICAgIG5ldyBjb21wLmxhYmVsKFwiRXZlbnQgTmFtZVwiKSxcclxuICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBgJHtzaW5nbGVFdmVudE9iai5uYW1lfWB9KSxcclxuICAgIG5ldyBjb21wLmxhYmVsKFwiRGF0ZVwiKSxcclxuICAgIG5ldyBjb21wLmlucHV0KHt0eXBlOiBcImRhdGVcIiwgdmFsdWU6IGAke3NpbmdsZUV2ZW50T2JqLmRhdGV9YH0pLFxyXG4gICAgbmV3IGNvbXAubGFiZWwoXCJUaW1lXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwidGltZVwiLCB2YWx1ZTogYCR7c2luZ2xlRXZlbnRPYmoudGltZX1gfSksXHJcbiAgICBuZXcgY29tcC5sYWJlbChcIkxvY2F0aW9uXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGAke3NpbmdsZUV2ZW50T2JqLmxvY2F0aW9ufWB9KSxcclxuICAgIG5ldyBjb21wLmJ0bihcIlNhdmVcIiksXHJcbiAgICBuZXcgY29tcC5idG4oXCJCYWNrXCIpKVxyXG4gIGRpdjIucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICBidWlsZEV2ZW50cy5lZGl0RXZlbnRQb3BVcEJ0bkNsaWNrcyhzaW5nbGVFdmVudE9iai5pZCk7XHJcbiAgfSxcclxuICBlZGl0RXZlbnRQb3BVcEJ0bkNsaWNrcyhpZCkge1xyXG4gICAgLy8gZ3JhYnMgdGhlIHR3byBidXR0b25zIG9uIHRoZSBwYWdlIGFuZCBhZGRzIGEgY2xpY2sgbGlzdGVuZXIgYmFzZWQgb24gaW5kZXhcclxuICAgIC8vIHRha2VzIHRoZSBldmVudCBpZCBzbyBpdCBjYW4gYmUgcGFzc2VkIG9uIHdpdGggdGhlIFBBVENIXHJcbiAgICBjb25zdCBwb3BVcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpO1xyXG4gICAgcG9wVXBCdG5zWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIC8vIFNhdmUgQnV0dG9uXHJcbiAgICAgIGNvbnN0IGlucHV0QXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XHJcbiAgICAgIC8vIGJ1aWxkcyBvYmplY3QgdG8gc2VuZCB0byBhcGlcclxuICAgICAgY29uc3QgZWRpdEV2ZW50T2JqID0ge1xyXG4gICAgICAgIG5hbWU6IGlucHV0QXJyYXlbMF0udmFsdWUsXHJcbiAgICAgICAgZGF0ZTogaW5wdXRBcnJheVsxXS52YWx1ZSxcclxuICAgICAgICB0aW1lOiBpbnB1dEFycmF5WzJdLnZhbHVlLFxyXG4gICAgICAgIGxvY2F0aW9uOiBpbnB1dEFycmF5WzNdLnZhbHVlLFxyXG4gICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWRcclxuICAgICAgfVxyXG4gICAgICAvLyBzYXZlcyBuZXcgZXZlbnQgdG8gQVBJXHJcbiAgICAgIEFQSS51cGRhdGVJdGVtKFwiZXZlbnRzXCIsIGlkLCBlZGl0RXZlbnRPYmopLnRoZW4oKCkgPT4ge1xyXG4gICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTtcclxuICAgICB9KSB9KVxyXG5cclxuICAgIC8vIEJhY2sgQnV0dG9uIFJldHVybnMgdG8gRXZlbnQgUGFnZVxyXG4gICAgcG9wVXBCdG5zWzFdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgfSlcclxuICB9LFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRFdmVudHMiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxyXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXHJcblxyXG5jb25zdCBsYW5kaW5nUGFnZUZ1bmNzID0ge1xyXG4gIGxvYWRMYW5kaW5nUGFnZSgpIHtcclxuICAgIG5ldyBjb21wLmRpdihcclxuICAgICAgeyBjbGFzc0xpc3Q6IFwid2VsY29tZVwiIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIiB9LCBcIldlbGNvbWUgdG8gTWlzc2lvbiBDb250cm9sXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJMb2dpblwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiUmVnaXN0ZXJcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBsZXQgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIilcclxuXHJcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luXCIpIHtcclxuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGFuZGluZ1BhZ2VGdW5jcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IHJlZ2lzdGVyRnVuY3MgZnJvbSBcIi4vcmVnaXN0ZXJcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5jb25zdCBsb2dJbkZ1bmNzID0ge1xuICBjaGVja1VzZXIodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgaWYgKHVzZXJuYW1lID09PSBcIlwiIHx8IHBhc3N3b3JkID09PVwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiWW91IG11c3QgZW50ZXIgYm90aCB5b3VyIHVzZXJuYW1lIGFuZCBwYXNzd29yZCB0byBsb2cgaW4uXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlcm5hbWV9YCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYWxlcnQoXCJUaGVyZSBpcyBubyB1c2VyIHdpdGggdGhhdCB1c2VybmFtZS5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHBhc3N3b3JkID09PSBkYXRhWzBdLnBhc3N3b3JkKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlciAoZGF0YVswXSk7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRVc2VyO1xuICAgICAgICB9IGVsc2UgKCBhbGVydChcIllvdSBlbnRlcmVkIHRoZSB3cm9uZyBwYXNzd29yZC4gVHJ5IGFnYWluLlwiKSlcbiAgICAgIH0pLnRoZW4oY3VycmVudFVzZXIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VXNlcilcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkJ1aWxkIE1pc3Npb24gTG9naW5cIilcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFVzZXIpKTtcbiAgICAgICAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbG9hZExvZ0luKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInVzZXJuYW1lXCIsIGlkOiBcInVzZXJuYW1lXCIsIHBsYWNlaG9sZGVyOiBcInVzZXJuYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJwYXNzd29yZFwiIH0sIFwiUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwicGFzc3dvcmRcIiwgaWQ6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIiB9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luIE5vd1wiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIk5vdCBhIHVzZXI/IENyZWF0ZSBuZXcgYWNjb3VudC5cIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luIE5vd1wiKSB7XG4gICAgICAgICAgdGhpcy5jaGVja1VzZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbG9nSW5GdW5jcyIsImltcG9ydCBsYW5kaW5nUGFnZUZ1bmNzIGZyb20gXCIuL2xhbmRpbmdcIlxyXG5pbXBvcnQgbmF2QmFyIGZyb20gXCIuL25hdlwiXHJcblxyXG5uYXZCYXIubG9hZE5hdkJhcigpO1xyXG5sYW5kaW5nUGFnZUZ1bmNzLmxvYWRMYW5kaW5nUGFnZSgpO1xyXG4iLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXG5pbXBvcnQgYWN0aXZlVXNlciBmcm9tIFwiLi9zZXNzaW9uU3RvcmFnZVwiXG5cblxuY29uc3QgYnVpbGRNZXNzYWdlcyA9IHtcbiAgcHJpbnRNZXNzYWdlcyhtZXNzYWdlT2JqKSB7XG4gICAgaWYgKGFjdGl2ZVVzZXIuaW5mbygpLmlkID09PSBtZXNzYWdlT2JqLnVzZXIuaWQpIHtcbiAgICAgIG5ldyBjb21wLnNlY3Rpb24oe1xuICAgICAgICAgIGNsYXNzTmFtZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgaWQ6IGAke21lc3NhZ2VPYmouaWR9YFxuICAgICAgICB9LFxuICAgICAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHttZXNzYWdlT2JqLnVzZXIucHJvZmlsZVBpY31gLCBjbGFzc05hbWU6IFwibWVzc2FnZVBpY1wiLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIn0pLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHtjbGFzc05hbWU6IFwibWVzc2FnZUF1dGhvclwifSwgYCR7bWVzc2FnZU9iai51c2VyLmZpcnN0TmFtZX0gLSAke21lc3NhZ2VPYmouZGF0ZX0gJHttZXNzYWdlT2JqLnRpbWVTdGFtcH1gKSxcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCksXG4gICAgICAgIG5ldyBjb21wLmJ0bihcIkVkaXRcIikpLnJlbmRlcihcIi5vbGQtLW1lc3NhZ2VzXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBjb21wLnNlY3Rpb24oe1xuICAgICAgICAgIGNsYXNzTmFtZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgaWQ6IGAke21lc3NhZ2VPYmouaWR9YFxuICAgICAgICB9LFxuICAgICAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHttZXNzYWdlT2JqLnVzZXIucHJvZmlsZVBpY31gLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIiwgY2xhc3NOYW1lOiBcIm1lc3NhZ2VQaWNcIn0pLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHtjbGFzc05hbWU6XCJtZXNzYWdlQXV0aG9yXCJ9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBtZXNzYWdlT2JqLm1lc3NhZ2VDb250ZW50KSkucmVuZGVyKFwiLm9sZC0tbWVzc2FnZXNcIilcbiAgICB9XG4gIH0sXG5cbiAgbWVzc2FnZU1hcCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHtpZDogXCJtZXNzYWdlTmFtZVwifSwgXCJNZXNzYWdlc1wiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKTtcbiAgICBuZXcgY29tcC5kaXYoe2NsYXNzTmFtZTogXCJvbGQtLW1lc3NhZ2VzXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKTtcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJtZXNzYWdlcy8/X2V4cGFuZD11c2VyXCIpXG4gICAgICAudGhlbihtZXNzYWdlT2JqID0+IHtcblxuICAgICAgICBtZXNzYWdlT2JqLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAgICAgdGhpcy5wcmludE1lc3NhZ2VzKG1lc3NhZ2UpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubmV3TWVzc2FnZSgpO1xuICAgICAgICB0aGlzLnN1Ym1pdE1lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5lZGl0QnV0dG9uQ2xpY2soKTtcbiAgICAgIH0pLnRoZW4oKCkgPT4gdGhpcy5zY3JvbGxXaW5kb3dCdXR0b20oKSk7XG4gIH0sXG5cbiAgLy8gc2V0cyBzY3JvbGwgd2luZG93IHRvIGJvdHRvbSBvZiBvbGQtLW1lc3NhZ2VzIGNvbnRhaW5lclxuICBzY3JvbGxXaW5kb3dCdXR0b20oKSB7XG4gICAgbGV0IG1lc3NhZ2VXaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9sZC0tbWVzc2FnZXNcIik7XG4gICAgbWVzc2FnZVdpbmRvdy5zY3JvbGxUb3AgPSBtZXNzYWdlV2luZG93LnNjcm9sbEhlaWdodDtcbiAgfSxcblxuXG4gIC8vIGJ1aWxkcyBuZXcgbWVzc2FnZSBlbnRyeSBmaWVsZFxuICBuZXdNZXNzYWdlKCkge1xuICAgIC8vd3JhcHBlZCB0aGlzIGluIGEgZGl2IGluc3RlYWQgb2YgYSBzZWN0aW9uLCB0byBncmFiIHNlY3Rpb25zIGVhc2llci5cbiAgICBuZXcgY29tcC5kaXYoe1xuICAgICAgICBjbGFzc05hbWU6IFwibmV3LS1tZXNzYWdlXCIsXG4gICAgICAgIGlkOiBcIm5ld01lc3NhZ2VcIlxuICAgICAgfSxcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIFwiTmV3IE1lc3NhZ2VcIiksXG4gICAgICBuZXcgY29tcC50ZXh0YXJlYSh7XG4gICAgICAgIHBsYWNlaG9sZGVyOiBcInR5cGUgeW91ciBtZXNzYWdlIGhlcmVcIixcbiAgICAgICAgd3JhcDogXCJoYXJkXCJcbiAgICAgIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiU3VibWl0XCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG5cbiAgc3VibWl0TWVzc2FnZSgpIHtcbiAgICAkKFwiI25ld01lc3NhZ2UgPiBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIC8vaWYgc3RhdG1lbnQgdG8gcHJldmVudCBibGFuayBlbnRyaWVzXG4gICAgICBpZiAoJChcIiNuZXdNZXNzYWdlID4gdGV4dGFyZWFcIikudmFsKCkgPT09IFwiXCIpIHtcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgeW91ciBtZXNzYWdlXCIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgLy9jcmVhdGVzIG9iamVjdCBvZiBjdXJyZW50IG1vbWVudFxuICAgICAgICBsZXQgZGF0ZUFuZFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAvL2NvbnZlcnRzIGl0IGludG8gYSBzdHJpbmcgYW5kIHRoZW4gYW4gYXJyYXkgdG8gZ3JhYiBzcGVjaWZpYyB2YWx1ZXNcbiAgICAgICAgbGV0IGRhdGVBcnJheSA9IGRhdGVBbmRUaW1lLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpO1xuICAgICAgICAvL2dldE1vbnRoKCkgbWV0aG9kIHJldHVybnMgYSBudW1iZXIgYmV0d2VlbiAwLTExLiBBZGRlZCAxIHRvIGdldCBjdXJyZW50IG1vbnRoXG4gICAgICAgIGxldCBtb250aCA9IGRhdGVBbmRUaW1lLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAvL2J1aWxkcyBvYmplY3QgdG8gcGFzcyBpbnRvIGZldGNoXG4gICAgICAgIGxldCBzdWJtaXRNZXNzYWdlT2JqID0ge1xuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiAkKFwiI25ld01lc3NhZ2UgPiB0ZXh0YXJlYVwiKS52YWwoKSxcbiAgICAgICAgICB0aW1lU3RhbXA6IGRhdGVBcnJheVs0XSwgLy9UT0RPOiBtYWtlIGl0IG5vbiBtaWxpdGFyeSB0aW1lXG4gICAgICAgICAgZGF0ZTogYCR7bW9udGh9LyR7ZGF0ZUFycmF5WzJdfS8ke2RhdGVBcnJheVszXX1gLFxuICAgICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWRcblxuICAgICAgICB9XG4gICAgICAgIC8vIHNlbmQgdG8gQVBJXG4gICAgICAgIEFQSS5zYXZlSXRlbShcIm1lc3NhZ2VzXCIsIHN1Ym1pdE1lc3NhZ2VPYmopXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBlZGl0QnV0dG9uQ2xpY2soKSB7XG4gICAgLy8gZ3JhYnMgdGhlIGVkaXQgYnV0dG9uc1xuICAgICQoXCJzZWN0aW9uID4gYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyBzdG9yZXMgdGhlIG1lc3NhZ2UgaW4gYSB2YXJhYmxlXG4gICAgICBsZXQgbWVzc2FnZUgxID0gZS50YXJnZXQucHJldmlvdXNTaWJsaW5nXG4gICAgICAvLyBzdG9yZSBtZXNzYWdlJ3MgdGV4dCBpbiBhIHZhcmFibGVcbiAgICAgIGxldCBtZXNzYWdlVGV4dCA9IG1lc3NhZ2VIMS5pbm5lckhUTUw7XG4gICAgICAvLyByZXBsYWNlcyBFZGl0IGJ1dHRvbiB3aXRoIFNhdmUgYnV0dG9uXG4gICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aChcIjxidXR0b24gY2xhc3M9ICdidG4nIHR5cGUgPSdidXR0b24nPlNhdmU8L2J1dHRvbj5cIilcbiAgICAgIC8vIHJlcGxhY2VzIG1lc3NhZ2UgdGV4dCB3aXRoIGFuIGlucHV0IGZpZWxkXG4gICAgICAkKG1lc3NhZ2VIMSkucmVwbGFjZVdpdGgoYDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkID0gXCJlZGl0RmllbGRcIiB2YWx1ZT1cIiR7bWVzc2FnZVRleHR9XCI+YClcbiAgICAgIC8vIHN0b3JlcyB0aGUgbmV3IGlucHV0IGZpZWxkIGluIGEgdmFyYWJsZVxuICAgICAgY29uc3QgbmV3SW5wdXRGaWVsZCA9ICQoXCIjZWRpdEZpZWxkXCIpO1xuICAgICAgLy8gc2V0cyBhIGNsaWNrIGV2ZW50IG9uIHRoZSBuZXcgc2F2ZSBidXR0b25cbiAgICAgIG5ld0lucHV0RmllbGQubmV4dCgpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIHN0b3JlcyBpbnB1dCB2YWx1ZSBpbiBhbiBvYmplY3QgdXBvbiBzYXZlIGNsaWNrXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VUZXh0T2JqID0ge1xuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiBuZXdJbnB1dEZpZWxkLnZhbCgpLFxuICAgICAgICB9XG4gICAgICAgIC8vIHNhdmUgbWVzc2FnZSBpZCAjXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VJZCA9IG5ld0lucHV0RmllbGQucGFyZW50KCkuYXR0cihcImlkXCIpXG4gICAgICAgIC8vIFBhdGNoIG1lc3NhZ2UgaW4gc2VydmVyIGFuZCByZWZyZXNoIHRoZSBtZXNzYWdlcyBvbiB0aGUgcGFnZVxuICAgICAgICBBUEkudXBkYXRlSXRlbShcIm1lc3NhZ2VzXCIsIGVkaXRlZE1lc3NhZ2VJZCwgZWRpdGVkTWVzc2FnZVRleHRPYmopXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRNZXNzYWdlcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cblxuY29uc3QgYnVpbGRNaXNzaW9uQ29udHJvbCA9IHtcbiAgcHJpbnRQbGFjZWhvbGRlciAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IG51bGw7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJtZXNzYWdlXCIsIGlkOiBgJHthY3RpdmVVc2VyLmluZm8oKS5pZH1gfSxcbiAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHthY3RpdmVVc2VyLmluZm8oKS5wcm9maWxlUGljfWAsIGFsdDogXCJQcm9maWxlIFBpY1wiLCBzdHlsZTpcImRpc3BsYXk6aW5saW5lLWJsb2NrOyBib3JkZXItcmFkaXVzOiA4cHg7IG1hcmdpbjogNHB4XCIsIGhlaWdodDogXCIxMjVcIiwgd2lkdGg6IFwiMTI1XCJ9KSxcbiAgICBuZXcgY29tcC50aXRsZSggXCJoMlwiLCB7c3R5bGU6XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgYm90dG9tOiAxMHB4XCJ9LCBgJHthY3RpdmVVc2VyLmluZm8oKS5maXJzdE5hbWV9IC0gJHthY3RpdmVVc2VyLmluZm8oKS5sYXN0TmFtZX0gJHthY3RpdmVVc2VyLmluZm8oKS51c2VybmFtZX1gKSxcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRNaXNzaW9uQ29udHJvbDsiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBsb2dJbkZ1bmNzIGZyb20gXCIuL2xvZ2luXCJcbmltcG9ydCBidWlsZE1lc3NhZ2VzIGZyb20gXCIuL21lc3NhZ2VzXCI7XG5pbXBvcnQgYnVpbGROZXdzIGZyb20gXCIuL25ld3NcIjtcbmltcG9ydCBidWlsZE1pc3Npb25Db250cm9sIGZyb20gXCIuL21pc3Npb25Db250cm9sXCI7XG5pbXBvcnQgYnVpbGRUYXNrcyBmcm9tIFwiLi90YXNrc1wiXG5pbXBvcnQgYnVpbGRFdmVudHMgZnJvbSBcIi4vZXZlbnRzXCJcblxuXG5jb25zdCBuYXZCYXIgPSB7XG4gIGxvYWROYXZCYXIoKSB7XG4gICAgbmV3IGNvbXAudWwoXG4gICAgICB7fSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkhvbWVcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJUYXNrc1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkV2ZW50c1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIk1lc3NhZ2VzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiTmV3c1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkZyaWVuZHNcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJMb2cgT3V0XCIpXG4gICAgKS5yZW5kZXIoXCIjbmF2QmFyXCIpXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdkJhclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkhvbWVcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVpbGRNaXNzaW9uQ29udHJvbC5wcmludFBsYWNlaG9sZGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiVGFza3NcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVpbGRUYXNrcy5idWlsZENvbnRhaW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJFdmVudHNcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJNZXNzYWdlc1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTmV3c1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVpbGROZXdzLm5ld3NNYXAoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJGcmllbmRzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZyaWVuZHMgZnVuY3Rpb24gY2FsbGVzLlwiKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkxvZyBPdXRcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvZyBPdXQgZnVuY3Rpb24gY2FsbGVkLlwiKTtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5hdkJhciIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcbmltcG9ydCBhY3RpdmVVc2VyIGZyb20gXCIuL3Nlc3Npb25TdG9yYWdlXCJcblxuXG5jb25zdCBidWlsZE5ld3MgPSB7XG4gIHByaW50TmV3cyhuZXdzT2JqKSB7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXdzXCIsIGlkOiBgJHtuZXdzT2JqLmlkfWB9LFxuICAgIG5ldyBjb21wLmFuY2hvcih7aHJlZjogYCR7bmV3c09iai51cmx9YCwgdGFyZ2V0OiBcIl9ibGFua1wifSwgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke25ld3NPYmouYXJ0aWNsZUltYWdlfWAsIGFsdDogXCJBcnRpY2xlIEltYWdlXCIsIGhlaWdodDogXCIxMjBcIiwgd2lkdGg6IFwiMTIwXCJ9KSksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7fSwgYCR7bmV3c09iai5hcnRpY2xlTmFtZX1gKSxcbiAgICBuZXcgY29tcC50aXRsZShcImg0XCIsIHt9LCBgU2F2ZWQgYnk6ICR7bmV3c09iai51c2VyLmZpcnN0TmFtZX0gfCBEYXRlIFNhdmVkOiAke25ld3NPYmouZGF0ZVNhdmVkfWApLFxuICAgIG5ldyBjb21wLnBhcih7fSwgbmV3c09iai5hYm91dCksXG4gICAgbmV3IGNvbXAuYnRuKFwiRGVsZXRlIEFydGljbGVcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgbmV3c01hcCAoKSAge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KGBhcnRpY2xlcy8/dXNlcklkPSR7YWN0aXZlVXNlci5pbmZvKCkuaWR9Jl9leHBhbmQ9dXNlciZfc29ydD1kYXRlU2F2ZWQmX29yZGVyPWRlc2NgKVxuICAgIC50aGVuKG5ld3NPYmogPT4gbmV3c09iai5mb3JFYWNoKG5ld3MgPT4ge1xuICAgICAgdGhpcy5wcmludE5ld3MobmV3cyl9KSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMubmV3TmV3cygpKVxuICAgICAgLnRoZW4oKCk9PiB0aGlzLmV2ZW50TGlzdGVuZXIoKSlcblxuICB9LFxuXG4gIG5ld05ld3MgKCkge1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS1uZXdzXCJ9LFxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHt9LCBcIlNhdmUgTmV3cyBBcnRpY2xlXCIpLFxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVOYW1lXCJ9LCBcIkFydGljbGUgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVOYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTmFtZVwiLCBpZDogXCJhcnRpY2xlTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlVXJsXCJ9LCBcIkFydGljbGUgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBMaW5rXCIsIGlkOiBcImFydGljbGVMaW5rXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZUltYWdlVXJsXCJ9LCBcIkFydGljbGUgSW1hZ2UgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVJbWFnZVVybFwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIEltYWdlIExpbmtcIiwgaWQ6IFwiYXJ0aWNsZUltYWdlXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9LCBcIkFydGljbGUgRGVzY3JpcHRpb25cIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlRGVzY3JpcHRpb25cIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBEZXNjcmlwdGlvblwiLCBpZDogXCJhcnRpY2xlRGVzY3JpcHRpb25cIn0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiU2F2ZSBOZXcgQXJ0aWNsZVwiKVxuICAgICksXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG4gIGV2ZW50TGlzdGVuZXIoKXtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbik9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKT0+e1xuICAgICAgICBpZihlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJTYXZlIE5ldyBBcnRpY2xlXCIpe1xuICAgICAgICAgIGxldCBzdG9yeSA9IHtcbiAgICAgICAgICAgIGFydGljbGVOYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVOYW1lXCIpLnZhbHVlLFxuICAgICAgICAgICAgdXJsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVMaW5rXCIpLnZhbHVlLFxuICAgICAgICAgICAgYXJ0aWNsZUltYWdlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVJbWFnZVwiKS52YWx1ZSxcbiAgICAgICAgICAgIGFib3V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVEZXNjcmlwdGlvblwiKS52YWx1ZSxcbiAgICAgICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWQsXG4gICAgICAgICAgICBkYXRlU2F2ZWQ6IG5ldyBEYXRlKClcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVpbGROZXdzLmFkZE5ld3Moc3RvcnkpXG4gICAgICAgIH0gZWxzZSBpZihlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJEZWxldGUgQXJ0aWNsZVwiKXtcbiAgICAgICAgICBsZXQgYXJ0aWNsZUlkID0gZS50YXJnZXQucGFyZW50Tm9kZS5pZFxuICAgICAgICAgIEFQSS5kZWxldGVJdGVtKFwiYXJ0aWNsZXNcIiwgYXJ0aWNsZUlkKS50aGVuKCgpPT4gYnVpbGROZXdzLm5ld3NNYXAoKSlcbiAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9LFxuXG5cbiAgYWRkTmV3cyhzdG9yeSl7XG4gICAgQVBJLnNhdmVJdGVtKFwiYXJ0aWNsZXNcIiwgc3RvcnkpLnRoZW4oKCk9PiB0aGlzLm5ld3NNYXAoKSlcbiAgfVxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGROZXdzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIjtcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiO1xuaW1wb3J0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgZnJvbSBcIi4vbWlzc2lvbkNvbnRyb2xcIjtcblxuY29uc3QgcmVnaXN0ZXJGdW5jcyA9IHtcblxuICBsb2FkUmVnaXN0ZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRmlyc3QgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJmaXJzdE5hbWVcIiwgaWQ6IFwiZmlyc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkZpcnN0IE5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkxhc3QgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJsYXN0TmFtZVwiLCBpZDogXCJsYXN0TmFtZVwiLCBwbGFjZWhvbGRlcjogXCJMYXN0IE5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkVtYWlsXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcImVtYWlsXCIsIGlkOiBcImVtYWlsXCIsIG5hbWU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiZW1haWxcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInVzZXJuYW1lXCIsIGlkOiBcInVzZXJuYW1lXCIsIHBsYWNlaG9sZGVyOiBcInVzZXJuYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJwYXNzd29yZFwiIH0sIFwiUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwicGFzc3dvcmRcIiwgaWQ6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcImNvbmZpcm1QYXNzd29yZFwiIH0sIFwiQ29uZmlybSBQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJjb25maXJtUGFzc3dvcmRcIiwgaWQ6IFwiY29uZmlybVBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIkNvbmZpcm0gUGFzc3dvcmRcIiB9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlJlZ2lzdGVyIEFjY291bnRcIiksXG4gICAgICBuZXcgY29tcC5idG4oXCJBbHJlYWR5IGEgdXNlcj8gTG9nIGluIG5vd1wiKVxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiUmVnaXN0ZXIgQWNjb3VudFwiKSB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlyc3ROYW1lXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdE5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJuYW1lXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUGFzc3dvcmRcIikudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY2hlY2sgdG8gZW5zdXJlIGFsbCBmaWVsZHMgYXJlIGNvbXBsZXRlLlxuICAgICAgICAgICAgYWxlcnQoXCJBbGwgZmllbGRzIG11c3QgYmUgY29tcGxldGUgdG8gY3JlYXRlIGFuIGFjY291bnQuXCIpXG4gICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlLmluZGV4T2YoXCJAXCIpID09PSAtMSkge1xuICAgICAgICAgICAgLy9UaGlzIGlzIGEgY2hlY2sgb24gdGhlIGVtYWlsIGZpZWxkIHRvIG1ha2Ugc3VyZSB0aGVyZSBpcyBhbiBAIHByZXNlbnRcbiAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIilcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUgPT09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVBhc3N3b3JkXCIpLnZhbHVlKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNoZWNrIHRvIG1ha2Ugc3VyZSBwYXNzd29yZHMgYXJlIHRoZSBzYW1lLlxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBsZXQgdGVtcFVzZXIgPSB7XG4gICAgICAgICAgICAgIGZpcnN0TmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIGxhc3ROYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhc3ROYW1lXCIpLnZhbHVlLFxuICAgICAgICAgICAgICBlbWFpbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgdXNlcm5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlLFxuICAgICAgICAgICAgICAvL1RoaXMgaXMgYSBwbGFjZWhvbGRlciB0byBhIHN0b2NrIFwibm8gaW1hZ2UgYXZhaWxhYmxlXCIgaW1hZ2UgdGhhdCB3ZSBjYW4gdXNlIGxhdGVyIGZvciBhY3R1YWwgdXNlciBpbWFnZXNcbiAgICAgICAgICAgICAgcHJvZmlsZVBpYzogXCJodHRwczovL2h5aGEueHl6L3dwLWNvbnRlbnQvdGhlbWVzL2Zhc2hpb24vaW1hZ2VzL25vX2ltYWdlX2F2YWlsYWJsZS5qcGdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQVBJLmdldEFsbENhdGVnb3J5KGB1c2Vycy8/ZW1haWw9JHt0ZW1wVXNlci5lbWFpbH1gKS50aGVuKHRoaXNEYXRhID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXNEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZWdpc3Rlcih0ZW1wVXNlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJUaGlzIGVtYWlsIGlzIGFscmVhZHkgcmVnaXN0ZXJlZC5cIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgeyBhbGVydChcIllvdXIgcGFzc3dvcmRzIGRpZCBub3QgbWF0Y2guIFBsZWFzZSB0cnkgYWdhaW4uXCIpIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBjaGVja1JlZ2lzdGVyKHVzZXIpIHtcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz91c2VybmFtZT0ke3VzZXIudXNlcm5hbWV9YCkudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJ1c2Vyc1wiLCB1c2VyKS50aGVuKG5ld1VzZXIgPT4ge1xuICAgICAgICAgIGxldCBjdXJyZW50VXNlciA9IG5ldyBjb21wLnVzZXIobmV3VXNlcik7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJVc2VybmFtZSBjaGVja1JlZ2lzdGVyOiBcIiwgY3VycmVudFVzZXIpXG4gICAgICAgICAgLy9UT0RPOnRoZSBmdW5jdGlvbiBiZWxvdyBuZWVkcyB0byBiZSB0aGUgY2FsbCB0byBsb2FkIG1pc3Npb24gY29udHJvbCBwYWdlLlxuICAgICAgICAgIC8vIFJpZ2h0IG5vdyBpdCBpcyBqdXN0IHNlbmRpbmcgdG8gYSBmdW5jdGlvbiB0byBjb25zb2xlLmxvZyB1c2VyXG4gICAgICAgICAgdGhpcy5sb2FkTWlzc2lvbihjdXJyZW50VXNlcik7XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFsZXJ0KGBVc2VybmFtZSwgJHtkYXRhWzBdLnVzZXJuYW1lfSwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLiBQbGVhc2UgY2hvb3NlIGFub3RoZXIuYClcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8vVE9ETzogdGhpcyBmdW5jdGlvbiBjYW4gZ28gYXdheSB3aGVuIHRoZSBmdW5jdGlvbiB0byBsb2FkIG1pc3Npb24gcGFnZSBpcyByZXBsYWNlZCBpbiBjaGVja1JlZ2lzdGVyIGZ1bmN0aW9uIGFib3ZlXG4gIGxvYWRNaXNzaW9uKHVzZXIpIHtcbiAgICBjb25zb2xlLmxvZyh1c2VyKVxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeSh1c2VyKSk7XG4gICAgYnVpbGRNaXNzaW9uQ29udHJvbC5wcmludFBsYWNlaG9sZGVyKCk7XG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXJGdW5jcyIsIi8vIHNjcmlwdHMgcmVsYXRlZCB0byBzZXNzaW9uU3RvcmFnZVxyXG5cclxuY29uc3QgYWN0aXZlVXNlciA9IHtcclxuICBpbmZvICgpIHtcclxuICAgIGxldCBsb2dnZWRJblVzZXIgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmN1cnJlbnRVc2VyKTtcclxuICAgICAgcmV0dXJuIGxvZ2dlZEluVXNlcjtcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjdGl2ZVVzZXI7XHJcbiIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcbmltcG9ydCBhY3RpdmVVc2VyIGZyb20gXCIuL3Nlc3Npb25TdG9yYWdlXCJcblxuXG5jb25zdCBidWlsZFRhc2tzID0ge1xuXG4gIC8vZnVuY3Rpb24gcnVuIGZpcnN0IGluIG9yZGVyIHRvIGNsZWFyIEhUTUwsIGNyZWF0ZSBwYXJlbnQgY29udGFpbmVycywgdGhlbiBhZGQgbmV3IHRhc2sgaW5wdXQgYW5kIGNhbGwgZmV0Y2hcbiAgYnVpbGRDb250YWluZXJzICgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHtjbGFzc05hbWU6IFwidGl0bGUtLWluY29tcGxldGVcIn0sIFwiSW5jb21wbGV0ZSBUYXNrc1wiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIG5ldyBjb21wLmRpdiAoe2lkOiBcImluY29tcGxldGVcIn0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0tY29tcGxldGVcIn0sIFwiQ29tcGxldGUgVGFza3NcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBuZXcgY29tcC5kaXYgKHtpZDogXCJjb21wbGV0ZVwifSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICB0aGlzLm5ld1Rhc2soKVxuICAgIHRoaXMudGFza3NGZXRjaCgpXG4gIH0sXG5cbiAgLy91c2VkIHRvIGNyZWF0ZSBhbmQgYXBwZW5kIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlIHRvIERPTVxuICBwcmludFRhc2tzICh0YXNrc09iaikge1xuICAgIGxldCBvdXRwdXRDb250YWluZXI7XG5cbiAgICBpZiAodGFza3NPYmouY29tcGxldGUpIHtcbiAgICAgIG91dHB1dENvbnRhaW5lciA9IFwiI2NvbXBsZXRlXCJcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0Q29udGFpbmVyID0gXCIjaW5jb21wbGV0ZVwiXG4gICAgfVxuXG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJ0YXNrXCIsIGlkOiBgJHt0YXNrc09iai5pZH1gfSxcbiAgICBuZXcgY29tcC5jaGVja2JveCgpLFxuICAgIG5ldyBjb21wLnBhcih7Y2xhc3NOYW1lOiBcImVkaXRhYmxlLS10YXNrXCJ9LCB0YXNrc09iai50YXNrKSxcbiAgICBuZXcgY29tcC5wYXIoe2NsYXNzTmFtZTogXCJlZGl0YWJsZS0tZGF0ZVwifSwgdGFza3NPYmouZHVlRGF0ZSkpLnJlbmRlcihvdXRwdXRDb250YWluZXIpXG4gIH0sXG5cbiAgLy9mZXRjaCBhbGwgdGFza3MgZnJvbSBkYXRhYmFzZSwgY2FsbCBjcmVhdGUvYXBwZW5kIGFuZCBjYWxsIGFkZCBsaXN0ZW5lcnNcbiAgdGFza3NGZXRjaCAoKSAge1xuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdGFza3MvP3VzZXJJZD0ke2FjdGl2ZVVzZXIuaW5mbygpLmlkfSZfc29ydD1kdWVEYXRlJl9vcmRlcj1hc2NgKSAvL2NoZWNrIGlmIHVzZXIgaXMgc2FtZSBhcyBzZXNzaW9uIHN0b3JhZ2VcbiAgICAudGhlbih0YXNrc09iaiA9PiAge1xuICAgICAgdGFza3NPYmouZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgIHRoaXMucHJpbnRUYXNrcyh0YXNrKX0pXG4gICAgICB0aGlzLmNiTGlzdGVuZXIoKVxuICAgICAgdGhpcy5wYXJMaXN0ZW5lcigpXG4gICAgfSlcbiAgfSxcblxuICAvL2NoZWNrYm94IGxpc3RlbmVyIHdpbGwgbW92ZSB0YXNrcyBiZXR3ZWVuIGNvbXBsZXRlIGFuZCBpbmNvbXBsZXRlIGNvbnRhaW5lcnNcbiAgLy9kYXRhYmFzZSBcImNvbXBsZXRlXCIgcHJvcGVydHkgd2lsbCBiZSBwYXRjaGVkIGFjY29yZGluZ2x5IGFuZCBET00gdXBkYXRlZFxuICBjYkxpc3RlbmVyICgpIHtcbiAgICBjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpXG5cbiAgICAvL2lmIHRoZSBpZCBvZiB0aGUgZ3JhbmRwYXJlbnQgY29udGFpbmVyIGlzICNjb21wbGV0ZSwgdGhlbiBjaGVjayB0aGUgYm94XG4gICAgY2hlY2tib3hlcy5mb3JFYWNoKCAoY2hlY2tib3gpID0+IHtcbiAgICAgIGlmIChjaGVja2JveC5wYXJlbnROb2RlLnBhcmVudE5vZGUuaWQgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICBsZXQgcGF0Y2hQcm9wZXJ0eTtcbiAgICAgICAgLy9pZiBmYWxzZSAtPiB0cnVlXG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgcGF0Y2hQcm9wZXJ0eSA9IHtjb21wbGV0ZTogdHJ1ZX1cbiAgICAgICAgICAvL3BhdGNoIFwiY29tcGxldGVcIiBwcm9wZXJ0eSBvZiBkYXRhYmFzZSBvYmplY3QgdXNpbmcgcGFyZW50Tm9kZSAoc2VjdGlvbikgSUQgdG8gVFJVRVxuICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gLCBwYXRjaFByb3BlcnR5KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvL2lmIGNoZWNrYm94IGlzIHVuY2hlY2tlZC4uLlxuICAgICAgICAgIHBhdGNoUHJvcGVydHkgPSB7Y29tcGxldGU6IGZhbHNlfVxuICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gLCBwYXRjaFByb3BlcnR5KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH0sXG5cbiAgLy9mdW5jdGlvbiB1c2VkIHRvIGVkaXQgdGFza3MgaW4gRE9NIGFuZCBwYXRjaCBuZXcgaW5mbyB0byBkYXRhYmFzZSB0YXNrIGRlc2NyaXB0aW9uIGFuZCBkYXRlXG4gIHBhckxpc3RlbmVyICgpIHtcbiAgICAvL2dldCBhbGwgc2VjdGlvbnMgb24gcGFnZVxuICAgIGxldCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWN0aW9uXCIpXG5cbiAgICAvLy9hZGQgY2xpY2sgbGlzdGVuZXIgdG8gYWxsIHNlY3Rpb25zXG4gICAgc2VjdGlvbnMuZm9yRWFjaChzZWN0aW9uID0+IHtcbiAgICAgIHNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIC8vZ2V0IGlkIG9mIHRhcmdldCBzZWN0aW9uXG4gICAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQucGFyZW50Tm9kZS5pZFxuXG4gICAgICAgIC8vaWYgcGFyYWdyYXBoIGNsaWNrZWQgaXMgdGFzayBkZXNjcmlwdGlvbiwgZ2V0IHRleHQgY29udGVudFxuICAgICAgICAvL2NyZWF0ZSBuZXcgPGlucHV0PiB0ZW1wbGF0ZSAod2l0aCAgSUQhKSBhbmQgcmVwbGFjZSA8cD4gd2l0aCA8aW5wdXQ+XG4gICAgICAgIC8vYWRkIGEga2V5ZG93biBsaXN0ZW5lciB0byB0aGUgaW5wdXQgYWZ0ZXIgaXQgaXMgaW4gRE9NIGFuZFxuICAgICAgICAvL3BhdGNoIHRoZSB0YXNrIGRlc2NyaXB0aW9uIHRvIGRhdGFiYXNlIHdoZW4gRU5URVIgaXMgcHJlc3NlZFxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGFibGUtLXRhc2tcIikpIHtcbiAgICAgICAgICBjb25zdCB0YXNrTmFtZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgbGV0IHRlbXBUYXNrSW5wdXQgPSBgPGlucHV0IGlkPVwidGVtcDFcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHt0YXNrTmFtZX1cIj5gXG4gICAgICAgICAgJChlLnRhcmdldCkucmVwbGFjZVdpdGgodGVtcFRhc2tJbnB1dClcbiAgICAgICAgICBjb25zdCB0ZW1wSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXAxXCIpO1xuICAgICAgICAgICAgdGVtcElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2hUYXNrID0ge3Rhc2s6IHRlbXBJbnB1dC52YWx1ZX1cbiAgICAgICAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGlkLCBwYXRjaFRhc2spXG4gICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAvL2lmIHBhcmFncmFwaCBjbGlja2VkIGlzIHRhc2sgZHVlIGRhdGUsIGdldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgLy9jcmVhdGUgbmV3IDxpbnB1dD4gdGVtcGxhdGUgKHdpdGggIElEISkgYW5kIHJlcGxhY2UgPHA+IHdpdGggPGlucHV0PlxuICAgICAgICAvL2FkZCBhIGNoYW5nZSBsaXN0ZW5lciB0byB0aGUgaW5wdXQgYWZ0ZXIgaXQgaXMgaW4gRE9NIGFuZFxuICAgICAgICAvL3BhdGNoIHRoZSB0YXNrIGR1ZSBkYXRlIHRvIGRhdGFiYXNlIHdoZW4gbmV3IGRhdGUgaXMgc2VsZWN0ZWRcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0YWJsZS0tZGF0ZVwiKSkge1xuICAgICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZS50YXJnZXQudGV4dENvbnRlbnRcbiAgICAgICAgICBsZXQgdGVtcFRhc2tEYXRlID0gYDxpbnB1dCBpZD1cInRlbXAyXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7dGFza0RhdGV9XCI+YFxuICAgICAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKHRlbXBUYXNrRGF0ZSlcbiAgICAgICAgICAgIGNvbnN0IHRlbXBEYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXAyXCIpO1xuICAgICAgICAgICAgdGVtcERhdGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2hEYXRlID0ge2R1ZURhdGU6IHRlbXBEYXRlSW5wdXQudmFsdWV9XG4gICAgICAgICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBpZCwgcGF0Y2hEYXRlKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9LFxuXG4gIC8vY3JlYXRlcyBuZXcgdGFzayBpbnB1dCBmaWVsZCB3aXRoIGFwcGVuZCBidXR0b24gaW5zaWRlIGZpcnN0IHNlY3Rpb24gb2YgSU5DT01QTEVURSBjb250YWluZXJcbiAgbmV3VGFzayAoKSB7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXctLXRhc2tcIn0sXG4gICAgbmV3IGNvbXAuYnRuIChcIitcIiksXG4gICAgbmV3IGNvbXAuaW5wdXQoe2lkOiBcImlucHV0LS10YXNrXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJ0eXBlIG5ldyB0YXNrIGhlcmVcIn0pLFxuICAgIG5ldyBjb21wLmlucHV0KHtpZDogXCJpbnB1dC0tZGF0ZVwiLCB0eXBlOiBcImRhdGVcIn0pKS5yZW5kZXIoXCIjaW5jb21wbGV0ZVwiKVxuXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKVxuICAgIGNvbnN0IGlucHV0X3Rhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LS10YXNrXCIpXG4gICAgY29uc3QgaW5wdXRfZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtLWRhdGVcIilcblxuICAgIC8vYnV0dG9uIGNsaWNrIHBvc3RzIG5ldyB0YXNrIHRvIGRhdGFiYXNlIGFuZCByZXNldHMgbmV3IHRhc2sgaW5wdXQgc3RyaW5nc1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChpbnB1dF90YXNrLnZhbHVlID09PSBcIlwiIHx8IGlucHV0X2RhdGUudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGFza0l0ZW0gPSB7XG4gICAgICAgICAgdGFzazogaW5wdXRfdGFzay52YWx1ZSxcbiAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgZHVlRGF0ZTogaW5wdXRfZGF0ZS52YWx1ZSxcbiAgICAgICAgICAvKlxuICAgICAgICAgIE5FRUQgVE8gVVBEQVRFIFVTRVIgSUQgVE8gU0FWRSBTRVNTSU9OIEFTU0lHTkVEIElEXG4gICAgICAgICAgKi9cbiAgICAgICAgICB1c2VySWQ6IGFjdGl2ZVVzZXIuaW5mbygpLmlkLFxuICAgICAgICB9XG4gICAgICAgIEFQSS5zYXZlSXRlbShcInRhc2tzXCIsIHRhc2tJdGVtKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMucHJpbnRUYXNrcyhkYXRhKVxuICAgICAgICAgIHRoaXMuY2JMaXN0ZW5lcigpXG4gICAgICAgICAgdGhpcy5wYXJMaXN0ZW5lcigpXG4gICAgICAgIH0pXG4gICAgICAgIGlucHV0X3Rhc2sudmFsdWUgPSBcIlwiXG4gICAgICAgIGlucHV0X2RhdGUudmFsdWUgPSBcIlwiXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBidWlsZFRhc2tzIl19
