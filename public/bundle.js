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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzLmpzIiwiLi4vc2NyaXB0cy9sYW5kaW5nLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMuanMiLCIuLi9zY3JpcHRzL21pc3Npb25Db250cm9sLmpzIiwiLi4vc2NyaXB0cy9uYXYuanMiLCIuLi9zY3JpcHRzL25ld3MuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL3NjcmlwdHMvdGFza3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEs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RCxhQUgxRDtBQUtBLFVBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQSxVQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUFuQjtBQUNBLFVBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLENBQW5CLENBUlMsQ0FVVDs7QUFDQSxJQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFrQyxDQUFELElBQU87QUFDdEMsVUFBSSxVQUFVLENBQUMsS0FBWCxLQUFxQixFQUFyQixJQUEyQixVQUFVLENBQUMsS0FBWCxLQUFxQixFQUFwRCxFQUF3RDtBQUN0RDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUksUUFBUSxHQUFHO0FBQ2IsVUFBQSxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBREo7QUFFYixVQUFBLFFBQVEsRUFBRSxLQUZHO0FBR2IsVUFBQSxPQUFPLEVBQUUsVUFBVSxDQUFDLEtBSFA7O0FBSWI7OztBQUdBLFVBQUEsTUFBTSxFQUFFLHdCQUFXLElBQVgsR0FBa0I7QUFQYixTQUFmOztBQVNBLHlCQUFJLFFBQUosQ0FBYSxPQUFiLEVBQXNCLFFBQXRCLEVBQWdDLElBQWhDLENBQXFDLElBQUksSUFBSTtBQUMzQyxlQUFLLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDQSxlQUFLLFVBQUw7QUFDQSxlQUFLLFdBQUw7QUFDRCxTQUpEOztBQUtBLFFBQUEsVUFBVSxDQUFDLEtBQVgsR0FBbUIsRUFBbkI7QUFDQSxRQUFBLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLEVBQW5CO0FBQ0Q7QUFDRixLQXJCRDtBQXNCRDs7QUF0SmdCLENBQW5CO2VBeUplLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWxlbWVudFN5bWJvbCA9IFN5bWJvbCgpXG5cbmNsYXNzIERPTUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgSWYgYGF0dHJpYnV0ZXNgIGlzIGp1c3QgYSBzdHJpbmcsIGl0J3MgYSBzaW1wbGUgZWxlbWVudCB3aXRoIG5vXG4gICAgICAgICAgICBwcm9wZXJ0aWVzIC0ganVzdCBzb21lIHRleHQgY29udGVudFxuICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gT2JqZWN0LmFzc2lnbih0aGlzW2VsZW1lbnRTeW1ib2xdLCBhdHRyaWJ1dGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25lIEhUTUxFbGVtZW50IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoY2hpbGQuZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBbiBhcnJheSBvZiBlbGVtZW50cyB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVsZW1lbnQuZm9yRWFjaChjID0+IHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoYykpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nIHZhbHVlIHdhcyBwYXNzZWQgaW4sIHNldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2VsZW1lbnRTeW1ib2xdXG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzW2VsZW1lbnRTeW1ib2xdKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERPTUNvbXBvbmVudFxuIiwiY29uc3QgVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODgvXCJcblxuY29uc3QgQVBJID0ge1xuICBnZXRBbGxDYXRlZ29yeShjYXRlZ29yeSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gKVxuICAgICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBnZXRPbmVGcm9tQ2F0ZWdvcnkoY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fS8ke2lkfWApXG4gICAgICAudGhlbihpbnB1dHMgPT4gaW5wdXRzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSXRlbShjYXRlZ29yeSwgaXRlbSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfVxuICAgICkudGhlbihqc29uRGF0YSA9PiBqc29uRGF0YS5qc29uKCkpXG4gIH0sXG5cbiAgZGVsZXRlSXRlbShjYXRlZ29yeSwgaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9LyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgdXBkYXRlSXRlbShjYXRlZ29yeSwgaWQsIGl0ZW0pe1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0vJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgIH1cbiAgICApXG5cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiaW1wb3J0IERPTUNvbXBvbmVudCBmcm9tIFwiLi4vbGliL25vZGVfbW9kdWxlcy9uc3MtZG9tY29tcG9uZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5jcmVhdGUobnVsbCwge1xyXG5cclxuICB1c2VyOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgVXNlciB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKHRlbXBJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IHRlbXBJbmZvLmlkO1xyXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGVtcEluZm8uZmlyc3ROYW1lO1xyXG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSB0ZW1wSW5mby5sYXN0TmFtZTtcclxuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdGVtcEluZm8udXNlcm5hbWU7XHJcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IHRlbXBJbmZvLnBhc3N3b3JkO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSB0ZW1wSW5mby5lbWFpbDtcclxuICAgICAgICB0aGlzLnByb2ZpbGVQaWMgPSB0ZW1wSW5mby5wcm9maWxlUGljO1xyXG4gICAgfVxyXG4gICAgLy9UT0RPOiB0aGlzIGlzIGp1c3QgYSB0ZXN0IGZ1bmN0aW9uLiB3ZSB3b3VsZCBoYXZlIHRoZSBhYmlsaXR5IHRvIGNhbGwgZm9yIHNhdmluZ1xyXG4gICAgLy8gbWVzc2FnZXMsYXJ0aWNsZXMsIGV2ZW50cyBiZSByZWZlcmVuY2luZyBhIGZ1bmN0aW9uIGRlZmluZWQgaGVyZVxyXG4gICAgICB0ZXN0KCkge1xyXG4gICAgICAgIHJldHVybiBgV2VsY29tZSAke3RoaXMuZmlyc3ROYW1lfSEgTGV0J3Mgc2VlIHdoYXQncyBnb2luZyBvbi5gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZGl2OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgZGl2IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImRpdlwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnRuOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYnRuIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJidG5cIiwgdHlwZTogXCJidXR0b25cIiB9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW5wdXQ6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBpbnB1dCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbnB1dFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VjdGlvbjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHNlY3Rpb24gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwic2VjdGlvblwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGl0bGU6IHsgLy9kZWZpbmUgYW55IHR5cGUgb2YgaCMuLiBoMSwgaDIsIGV0Yy5cclxuICAgIHZhbHVlOiBjbGFzcyB0aXRsZSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBhbmNob3I6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBhbmNob3IgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2hlY2tib3g6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBjaGVja2JveCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgY2xhc3NOYW1lOiBcImNiXCIgfSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGltYWdlOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW1hZ2UgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW1nXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsaToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxpIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxpXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgZm9ybSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJmb3JtXCIsIHt9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGFiZWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsYWJlbCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsYWJlbFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGV4dGFyZWE6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB0ZXh0YXJlYSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ0ZXh0YXJlYVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFyOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgcGFyIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInBcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcbmltcG9ydCBhY3RpdmVVc2VyIGZyb20gXCIuL3Nlc3Npb25TdG9yYWdlXCJcclxuXHJcblxyXG5jb25zdCBidWlsZEV2ZW50cyA9IHtcclxuXHJcbiAgYnVpbGRDb250YWluZXJzKCkge1xyXG4gICAgLy8gYnVpbGRzIHRoZSB0d28gY29udGFpbmVycyB0byBob2xkIGV2ZXJ5dGhpbmdcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAvLyBidXR0b24gZm9yIG5ldyBldmVudFxyXG4gICAgY29uc3QgbmV3QnRuID0gbmV3IGNvbXAuZGl2KHsgaWQ6IFwibmV3RXZlbnRCdG5cIn0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDNcIiwgXCJOZXcgRXZlbnQhXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCIrXCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG5cclxuICAgIC8vIGNvbnRhaW5lcnNcclxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge1xyXG4gICAgICBjbGFzc05hbWU6IFwidGl0bGUtLXVwY29taW5nXCJcclxuICAgIH0sIFwiVXBjb21pbmcgRXZlbnRcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIG5ldyBjb21wLmRpdih7XHJcbiAgICAgIGlkOiBcInVwY29taW5nXCJcclxuICAgIH0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHtcclxuICAgICAgY2xhc3NOYW1lOiBcInRpdGxlLS1wYXN0XCJcclxuICAgIH0sIFwiUGFzdCBFdmVudFwiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbmV3IGNvbXAuZGl2KHtcclxuICAgICAgaWQ6IFwicGFzdFwiXHJcbiAgICB9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgLy8gdGhpcy5uZXdUYXNrKClcclxuICAgIHRoaXMubmV3RXZlbnRCdXR0b24oKTtcclxuICAgIHRoaXMuZXZlbnRGZXRjaCgpXHJcbiAgICB9LFxyXG5cclxuICBwcmludEV2ZW50cyhldmVudE9iaikge1xyXG4gICAgLy8gdGFrZXMgdGhlIG9iamVjdHMgZnJvbSB0aGUgYXBpIGFuZCBwcmludHMgdGhlbSB0byB0aGUgZG9tXHJcbiAgICBsZXQgb3V0cHV0Q29udGFpbmVyO1xyXG5cclxuICAgIC8vIG5lZWQgdG8gdGVzdCBpZiBkYXRlIGlzIGluIHRoZSBmdXR1cmUgb3IgdGhlIHBhc3RcclxuXHJcbiAgICBvdXRwdXRDb250YWluZXIgPSBcIiN1cGNvbWluZ1wiXHJcbiAgICBjb25zdCB0YXNrID0gbmV3IGNvbXAuc2VjdGlvbih7XHJcbiAgICAgICAgY2xhc3NOYW1lOiBcImV2ZW50XCIsXHJcbiAgICAgICAgaWQ6IGAke2V2ZW50T2JqLmlkfWBcclxuICAgICAgfSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoM1wiLCBgJHtldmVudE9iai5uYW1lfWApLFxyXG4gICAgICBuZXcgY29tcC5wYXIoYCR7ZXZlbnRPYmouZGF0ZX0gJHtldmVudE9iai50aW1lfWApLFxyXG4gICAgICBuZXcgY29tcC5wYXIoYCR7ZXZlbnRPYmoubG9jYXRpb259YCksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkVkaXRcIikpLnJlbmRlcihvdXRwdXRDb250YWluZXIpXHJcbiAgfSxcclxuXHJcbiAgZXZlbnRGZXRjaCgpIHtcclxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgZXZlbnRzLz91c2VySWQ9JHthY3RpdmVVc2VyLmluZm8oKS5pZH0mX3NvcnQ9ZGF0ZSx0aW1lJl9vcmRlcj1hc2NgKSAvL2NoZWNrIGlmIHVzZXIgaXMgc2FtZSBhcyBzZXNzaW9uIHN0b3JhZ2VcclxuICAgICAgLnRoZW4oZXZlbnRPYmogPT4ge1xyXG4gICAgICAgIGV2ZW50T2JqLmZvckVhY2goZXZlbnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wcmludEV2ZW50cyhldmVudClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGJ1aWxkRXZlbnRzLmVkaXRCdG5MaXN0ZW4oKVxyXG4gICAgICB9KVxyXG4gIH0sXHJcblxyXG4gIG5ld0V2ZW50QnV0dG9uKCkge1xyXG4gICAgLy8gd2hlbiBjbGlja2VkIGl0IGNsZWFycyB0aGUgZG9tIGFuZCBjYWxscyB0aGUgZnVuY3Rpb24gdG8gYnVpbGQgdGhlIGZvcm1cclxuICAgICQoXCIjbmV3RXZlbnRCdG5cIikuY2xpY2soXHJcbiAgICAgIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJChcIi5jb250YWluZXItLWlubmVyXCIpLnRleHQoXCJcIilcclxuICAgICAgICBidWlsZEV2ZW50cy5uZXdFdmVudFBvcFVwKCk7XHJcbiAgICAgIH1cclxuICAgIClcclxuICB9LFxyXG5cclxuICBuZXdFdmVudFBvcFVwKCkge1xyXG4gICAgLy8gQnVpbGRzIG5ldyBldmVudCBlbnRyeSBmb3JtXHJcbiAgICBsZXQgZGl2MiA9IG5ldyBjb21wLmRpdih7XHJcbiAgICAgICAgY2xhc3NMaXN0OiBcIm5ld0V2ZW50Rm9ybVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIn0sIFwiQWRkIEEgTmV3IEV2ZW50XCIpLFxyXG4gICAgICBuZXcgY29tcC5sYWJlbChcIkV2ZW50IE5hbWVcIiksXHJcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJ0ZXh0XCJ9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJEYXRlXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7dHlwZTogXCJkYXRlXCJ9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJUaW1lXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7dHlwZTogXCJ0aW1lXCJ9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJMb2NhdGlvblwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcInRleHRcIn0pLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJTYXZlXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJCYWNrXCIpKVxyXG4gICAgZGl2Mi5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgYnVpbGRFdmVudHMubmV3RXZlbnRQb3BVcEJ0bkNsaWNrcygpO1xyXG4gIH0sXHJcblxyXG4gIG5ld0V2ZW50UG9wVXBCdG5DbGlja3MoKSB7XHJcbiAgICAvLyBncmFicyB0aGUgdHdvIGJ1dHRvbnMgb24gdGhlIHBhZ2UgYW5kIGFkZHMgYSBjbGljayBsaXN0ZW5lciBiYXNlZCBvbiBpbmRleFxyXG4gICAgY29uc3QgcG9wVXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKTtcclxuICAgIHBvcFVwQnRuc1swXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAvLyBTYXZlIEJ1dHRvblxyXG4gICAgICBjb25zdCBpbnB1dEFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xyXG4gICAgICAvLyBidWlsZHMgb2JqZWN0IHRvIHNlbmQgdG8gYXBpXHJcbiAgICAgIGNvbnN0IG5ld0V2ZW50T2JqID0ge1xyXG4gICAgICAgIG5hbWU6IGlucHV0QXJyYXlbMF0udmFsdWUsXHJcbiAgICAgICAgZGF0ZTogaW5wdXRBcnJheVsxXS52YWx1ZSxcclxuICAgICAgICB0aW1lOiBpbnB1dEFycmF5WzJdLnZhbHVlLFxyXG4gICAgICAgIGxvY2F0aW9uOiBpbnB1dEFycmF5WzNdLnZhbHVlLFxyXG4gICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWRcclxuICAgICAgfVxyXG4gICAgICAvLyBzYXZlcyBuZXcgZXZlbnQgdG8gQVBJXHJcbiAgICAgIEFQSS5zYXZlSXRlbShcImV2ZW50c1wiLCBuZXdFdmVudE9iaikudGhlbigoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgIH0pIH0pXHJcblxyXG4gICAgLy8gQmFjayBCdXR0b24gUmV0dXJucyB0byBFdmVudCBQYWdlXHJcbiAgICBwb3BVcEJ0bnNbMV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgYnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKCk7XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZWRpdEJ0bkxpc3RlbiAoKSB7XHJcbiAgICAvLyBsaXN0ZW5zIGZvciBhbGwgdGhlIGVkaXQgYnV0dG9ucyBvbiB0aGUgcGFnZVxyXG4gICAgY29uc3QgYWxsVGhlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWN0aW9uID4gYnV0dG9uXCIpO1xyXG4gICAgYWxsVGhlQnV0dG9ucy5mb3JFYWNoKGN1cnJlbnRCdG4gPT4ge1xyXG4gICAgICBjdXJyZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gdGFrZXMgdGhlIGlkIG9mIHRoZSBldmVudCB0aGF0IHdhcyBjbGlja3MsIGZldGNoZXMgZnJvbSB0aGUgYXBpIHdpdGggdGhhdCBpZCBhbmQgcGFzc2VzIG9uIHRvIHRoZSBFZGl0IEVsZW1lbnQgZm9ybVxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRCdG5JZCA9IGN1cnJlbnRCdG4ucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBBUEkuZ2V0T25lRnJvbUNhdGVnb3J5KFwiZXZlbnRzXCIsIGN1cnJlbnRCdG5JZClcclxuICAgICAgICAgIC50aGVuKHNpbmdsZUV2ZW50ID0+IHtcclxuICAgICAgICAgICAgJChcIi5jb250YWluZXItLWlubmVyXCIpLnRleHQoXCJcIilcclxuICAgICAgICAgICAgYnVpbGRFdmVudHMuZXZlbnRFZGl0Rm9ybShzaW5nbGVFdmVudCwgY3VycmVudEJ0bklkKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSxcclxuICBldmVudEVkaXRGb3JtKHNpbmdsZUV2ZW50T2JqKSB7XHJcbiAgICAvLyBidWlsZHMgRWRpdCBmb3JtXHJcbiAgICAvLyB0YWtlcyB0aGUgcmV0dXJuIGZyb20gdGhlIGZldGNoXHJcbiAgICBsZXQgZGl2MiA9IG5ldyBjb21wLmRpdih7XHJcbiAgICAgIGNsYXNzTGlzdDogXCJuZXdFdmVudEZvcm1cIlxyXG4gICAgfSxcclxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIn0sIFwiRWRpdCBZb3VyIEV2ZW50XCIpLFxyXG4gICAgbmV3IGNvbXAubGFiZWwoXCJFdmVudCBOYW1lXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGAke3NpbmdsZUV2ZW50T2JqLm5hbWV9YH0pLFxyXG4gICAgbmV3IGNvbXAubGFiZWwoXCJEYXRlXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogYCR7c2luZ2xlRXZlbnRPYmouZGF0ZX1gfSksXHJcbiAgICBuZXcgY29tcC5sYWJlbChcIlRpbWVcIiksXHJcbiAgICBuZXcgY29tcC5pbnB1dCh7dHlwZTogXCJ0aW1lXCIsIHZhbHVlOiBgJHtzaW5nbGVFdmVudE9iai50aW1lfWB9KSxcclxuICAgIG5ldyBjb21wLmxhYmVsKFwiTG9jYXRpb25cIiksXHJcbiAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogYCR7c2luZ2xlRXZlbnRPYmoubG9jYXRpb259YH0pLFxyXG4gICAgbmV3IGNvbXAuYnRuKFwiU2F2ZVwiKSxcclxuICAgIG5ldyBjb21wLmJ0bihcIkJhY2tcIikpXHJcbiAgZGl2Mi5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gIGJ1aWxkRXZlbnRzLmVkaXRFdmVudFBvcFVwQnRuQ2xpY2tzKHNpbmdsZUV2ZW50T2JqLmlkKTtcclxuICB9LFxyXG4gIGVkaXRFdmVudFBvcFVwQnRuQ2xpY2tzKGlkKSB7XHJcbiAgICAvLyBncmFicyB0aGUgdHdvIGJ1dHRvbnMgb24gdGhlIHBhZ2UgYW5kIGFkZHMgYSBjbGljayBsaXN0ZW5lciBiYXNlZCBvbiBpbmRleFxyXG4gICAgLy8gdGFrZXMgdGhlIGV2ZW50IGlkIHNvIGl0IGNhbiBiZSBwYXNzZWQgb24gd2l0aCB0aGUgUEFUQ0hcclxuICAgIGNvbnN0IHBvcFVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIik7XHJcbiAgICBwb3BVcEJ0bnNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgLy8gU2F2ZSBCdXR0b25cclxuICAgICAgY29uc3QgaW5wdXRBcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcclxuICAgICAgLy8gYnVpbGRzIG9iamVjdCB0byBzZW5kIHRvIGFwaVxyXG4gICAgICBjb25zdCBlZGl0RXZlbnRPYmogPSB7XHJcbiAgICAgICAgbmFtZTogaW5wdXRBcnJheVswXS52YWx1ZSxcclxuICAgICAgICBkYXRlOiBpbnB1dEFycmF5WzFdLnZhbHVlLFxyXG4gICAgICAgIHRpbWU6IGlucHV0QXJyYXlbMl0udmFsdWUsXHJcbiAgICAgICAgbG9jYXRpb246IGlucHV0QXJyYXlbM10udmFsdWUsXHJcbiAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZFxyXG4gICAgICB9XHJcbiAgICAgIC8vIHNhdmVzIG5ldyBldmVudCB0byBBUElcclxuICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJldmVudHNcIiwgaWQsIGVkaXRFdmVudE9iaikudGhlbigoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgIH0pIH0pXHJcblxyXG4gICAgLy8gQmFjayBCdXR0b24gUmV0dXJucyB0byBFdmVudCBQYWdlXHJcbiAgICBwb3BVcEJ0bnNbMV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgYnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKCk7XHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEV2ZW50cyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiXHJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcclxuXHJcbmNvbnN0IGxhbmRpbmdQYWdlRnVuY3MgPSB7XHJcbiAgbG9hZExhbmRpbmdQYWdlKCkge1xyXG4gICAgbmV3IGNvbXAuZGl2KFxyXG4gICAgICB7IGNsYXNzTGlzdDogXCJ3ZWxjb21lXCIgfSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJ0aXRsZVwiIH0sIFwiV2VsY29tZSB0byBNaXNzaW9uIENvbnRyb2xcIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlclwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGxldCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKVxyXG5cclxuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9naW5cIikge1xyXG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYW5kaW5nUGFnZUZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIjtcbmltcG9ydCBidWlsZE1pc3Npb25Db250cm9sIGZyb20gXCIuL21pc3Npb25Db250cm9sXCI7XG5cbmNvbnN0IGxvZ0luRnVuY3MgPSB7XG4gIGNoZWNrVXNlcih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBpZiAodXNlcm5hbWUgPT09IFwiXCIgfHwgcGFzc3dvcmQgPT09XCJcIikge1xuICAgICAgYWxlcnQoXCJZb3UgbXVzdCBlbnRlciBib3RoIHlvdXIgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHRvIGxvZyBpbi5cIilcbiAgICB9IGVsc2Uge1xuICAgICAgQVBJLmdldEFsbENhdGVnb3J5KGB1c2Vycy8/dXNlcm5hbWU9JHt1c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBhbGVydChcIlRoZXJlIGlzIG5vIHVzZXIgd2l0aCB0aGF0IHVzZXJuYW1lLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAocGFzc3dvcmQgPT09IGRhdGFbMF0ucGFzc3dvcmQpIHtcbiAgICAgICAgICBsZXQgY3VycmVudFVzZXIgPSBuZXcgY29tcC51c2VyIChkYXRhWzBdKTtcbiAgICAgICAgICByZXR1cm4gY3VycmVudFVzZXI7XG4gICAgICAgIH0gZWxzZSAoIGFsZXJ0KFwiWW91IGVudGVyZWQgdGhlIHdyb25nIHBhc3N3b3JkLiBUcnkgYWdhaW4uXCIpKVxuICAgICAgfSkudGhlbihjdXJyZW50VXNlciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRVc2VyKVxuICAgICAgICBpZiAoY3VycmVudFVzZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnVpbGQgTWlzc2lvbiBMb2dpblwiKVxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VXNlcikpO1xuICAgICAgICAgIGJ1aWxkTWlzc2lvbkNvbnRyb2wucHJpbnRQbGFjZWhvbGRlcigpO1xuICAgICAgICB9XG5cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBsb2FkTG9nSW4oKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwidXNlcm5hbWVcIiwgaWQ6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcInBhc3N3b3JkXCIgfSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJwYXNzd29yZFwiLCBpZDogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiTG9naW4gTm93XCIpLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiTm90IGEgdXNlcj8gQ3JlYXRlIG5ldyBhY2NvdW50LlwiKVxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9naW4gTm93XCIpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrVXNlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJuYW1lXCIpLnZhbHVlLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlZ2lzdGVyRnVuY3MubG9hZFJlZ2lzdGVyKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBsb2dJbkZ1bmNzIiwiaW1wb3J0IGxhbmRpbmdQYWdlRnVuY3MgZnJvbSBcIi4vbGFuZGluZ1wiXHJcbmltcG9ydCBuYXZCYXIgZnJvbSBcIi4vbmF2XCJcclxuXHJcbm5hdkJhci5sb2FkTmF2QmFyKCk7XHJcbmxhbmRpbmdQYWdlRnVuY3MubG9hZExhbmRpbmdQYWdlKCk7XHJcbiIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcbmltcG9ydCBhY3RpdmVVc2VyIGZyb20gXCIuL3Nlc3Npb25TdG9yYWdlXCJcblxuXG5jb25zdCBidWlsZE1lc3NhZ2VzID0ge1xuICBwcmludE1lc3NhZ2VzKG1lc3NhZ2VPYmopIHtcbiAgICBpZiAoYWN0aXZlVXNlci5pbmZvKCkuaWQgPT09IG1lc3NhZ2VPYmoudXNlci5pZCkge1xuICAgICAgbmV3IGNvbXAuc2VjdGlvbih7XG4gICAgICAgICAgY2xhc3NOYW1lOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICBpZDogYCR7bWVzc2FnZU9iai5pZH1gXG4gICAgICAgIH0sXG4gICAgICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke21lc3NhZ2VPYmoudXNlci5wcm9maWxlUGljfWAsIGNsYXNzTmFtZTogXCJtZXNzYWdlUGljXCIsIGFsdDogXCJQcm9maWxlIFBpY1wifSksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge2NsYXNzTmFtZTogXCJtZXNzYWdlQXV0aG9yXCJ9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBtZXNzYWdlT2JqLm1lc3NhZ2VDb250ZW50KSxcbiAgICAgICAgbmV3IGNvbXAuYnRuKFwiRWRpdFwiKSkucmVuZGVyKFwiLm9sZC0tbWVzc2FnZXNcIilcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IGNvbXAuc2VjdGlvbih7XG4gICAgICAgICAgY2xhc3NOYW1lOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICBpZDogYCR7bWVzc2FnZU9iai5pZH1gXG4gICAgICAgIH0sXG4gICAgICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke21lc3NhZ2VPYmoudXNlci5wcm9maWxlUGljfWAsIGFsdDogXCJQcm9maWxlIFBpY1wiLCBjbGFzc05hbWU6IFwibWVzc2FnZVBpY1wifSksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge2NsYXNzTmFtZTpcIm1lc3NhZ2VBdXRob3JcIn0sIGAke21lc3NhZ2VPYmoudXNlci5maXJzdE5hbWV9IC0gJHttZXNzYWdlT2JqLmRhdGV9ICR7bWVzc2FnZU9iai50aW1lU3RhbXB9YCksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG1lc3NhZ2VPYmoubWVzc2FnZUNvbnRlbnQpKS5yZW5kZXIoXCIub2xkLS1tZXNzYWdlc1wiKVxuICAgIH1cbiAgfSxcblxuICBtZXNzYWdlTWFwKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge2lkOiBcIm1lc3NhZ2VOYW1lXCJ9LCBcIk1lc3NhZ2VzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpO1xuICAgIG5ldyBjb21wLmRpdih7Y2xhc3NOYW1lOiBcIm9sZC0tbWVzc2FnZXNcIn0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpO1xuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcIm1lc3NhZ2VzLz9fZXhwYW5kPXVzZXJcIilcbiAgICAgIC50aGVuKG1lc3NhZ2VPYmogPT4ge1xuXG4gICAgICAgIG1lc3NhZ2VPYmouZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgICB0aGlzLnByaW50TWVzc2FnZXMobWVzc2FnZSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5uZXdNZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuc3VibWl0TWVzc2FnZSgpO1xuICAgICAgICB0aGlzLmVkaXRCdXR0b25DbGljaygpO1xuICAgICAgfSlcbiAgfSxcbiAgLy8gYnVpbGRzIG5ldyBtZXNzYWdlIGVudHJ5IGZpZWxkXG4gIG5ld01lc3NhZ2UoKSB7XG4gICAgLy93cmFwcGVkIHRoaXMgaW4gYSBkaXYgaW5zdGVhZCBvZiBhIHNlY3Rpb24sIHRvIGdyYWIgc2VjdGlvbnMgZWFzaWVyLlxuICAgIG5ldyBjb21wLmRpdih7XG4gICAgICAgIGNsYXNzTmFtZTogXCJuZXctLW1lc3NhZ2VcIixcbiAgICAgICAgaWQ6IFwibmV3TWVzc2FnZVwiXG4gICAgICB9LFxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgXCJOZXcgTWVzc2FnZVwiKSxcbiAgICAgIG5ldyBjb21wLnRleHRhcmVhKHtcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwidHlwZSB5b3VyIG1lc3NhZ2UgaGVyZVwiLFxuICAgICAgICB3cmFwOiBcImhhcmRcIlxuICAgICAgfSksXG4gICAgICBuZXcgY29tcC5idG4oXCJTdWJtaXRcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cblxuICBzdWJtaXRNZXNzYWdlKCkge1xuICAgICQoXCIjbmV3TWVzc2FnZSA+IGJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgLy9pZiBzdGF0bWVudCB0byBwcmV2ZW50IGJsYW5rIGVudHJpZXNcbiAgICAgIGlmICgkKFwiI25ld01lc3NhZ2UgPiB0ZXh0YXJlYVwiKS52YWwoKSA9PT0gXCJcIikge1xuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciB5b3VyIG1lc3NhZ2VcIilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAvL2NyZWF0ZXMgb2JqZWN0IG9mIGN1cnJlbnQgbW9tZW50XG4gICAgICAgIGxldCBkYXRlQW5kVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vY29udmVydHMgaXQgaW50byBhIHN0cmluZyBhbmQgdGhlbiBhbiBhcnJheSB0byBncmFiIHNwZWNpZmljIHZhbHVlc1xuICAgICAgICBsZXQgZGF0ZUFycmF5ID0gZGF0ZUFuZFRpbWUudG9TdHJpbmcoKS5zcGxpdChcIiBcIik7XG4gICAgICAgIC8vZ2V0TW9udGgoKSBtZXRob2QgcmV0dXJucyBhIG51bWJlciBiZXR3ZWVuIDAtMTEuIEFkZGVkIDEgdG8gZ2V0IGN1cnJlbnQgbW9udGhcbiAgICAgICAgbGV0IG1vbnRoID0gZGF0ZUFuZFRpbWUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgIC8vYnVpbGRzIG9iamVjdCB0byBwYXNzIGludG8gZmV0Y2hcbiAgICAgICAgbGV0IHN1Ym1pdE1lc3NhZ2VPYmogPSB7XG4gICAgICAgICAgbWVzc2FnZUNvbnRlbnQ6ICQoXCIjbmV3TWVzc2FnZSA+IHRleHRhcmVhXCIpLnZhbCgpLFxuICAgICAgICAgIHRpbWVTdGFtcDogZGF0ZUFycmF5WzRdLCAvL1RPRE86IG1ha2UgaXQgbm9uIG1pbGl0YXJ5IHRpbWVcbiAgICAgICAgICBkYXRlOiBgJHttb250aH0vJHtkYXRlQXJyYXlbMl19LyR7ZGF0ZUFycmF5WzNdfWAsXG4gICAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZFxuXG4gICAgICAgIH1cbiAgICAgICAgLy8gc2VuZCB0byBBUElcbiAgICAgICAgQVBJLnNhdmVJdGVtKFwibWVzc2FnZXNcIiwgc3VibWl0TWVzc2FnZU9iailcbiAgICAgICAgICAudGhlbigoKSA9PiBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGVkaXRCdXR0b25DbGljaygpIHtcbiAgICAvLyBncmFicyB0aGUgZWRpdCBidXR0b25zXG4gICAgJChcInNlY3Rpb24gPiBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIC8vIHN0b3JlcyB0aGUgbWVzc2FnZSBpbiBhIHZhcmFibGVcbiAgICAgIGxldCBtZXNzYWdlSDEgPSBlLnRhcmdldC5wcmV2aW91c1NpYmxpbmdcbiAgICAgIC8vIHN0b3JlIG1lc3NhZ2UncyB0ZXh0IGluIGEgdmFyYWJsZVxuICAgICAgbGV0IG1lc3NhZ2VUZXh0ID0gbWVzc2FnZUgxLmlubmVySFRNTDtcbiAgICAgIC8vIHJlcGxhY2VzIEVkaXQgYnV0dG9uIHdpdGggU2F2ZSBidXR0b25cbiAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKFwiPGJ1dHRvbiBjbGFzcz0gJ2J0bicgdHlwZSA9J2J1dHRvbic+U2F2ZTwvYnV0dG9uPlwiKVxuICAgICAgLy8gcmVwbGFjZXMgbWVzc2FnZSB0ZXh0IHdpdGggYW4gaW5wdXQgZmllbGRcbiAgICAgICQobWVzc2FnZUgxKS5yZXBsYWNlV2l0aChgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQgPSBcImVkaXRGaWVsZFwiIHZhbHVlPVwiJHttZXNzYWdlVGV4dH1cIj5gKVxuICAgICAgLy8gc3RvcmVzIHRoZSBuZXcgaW5wdXQgZmllbGQgaW4gYSB2YXJhYmxlXG4gICAgICBjb25zdCBuZXdJbnB1dEZpZWxkID0gJChcIiNlZGl0RmllbGRcIik7XG4gICAgICAvLyBzZXRzIGEgY2xpY2sgZXZlbnQgb24gdGhlIG5ldyBzYXZlIGJ1dHRvblxuICAgICAgbmV3SW5wdXRGaWVsZC5uZXh0KCkuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gc3RvcmVzIGlucHV0IHZhbHVlIGluIGFuIG9iamVjdCB1cG9uIHNhdmUgY2xpY2tcbiAgICAgICAgY29uc3QgZWRpdGVkTWVzc2FnZVRleHRPYmogPSB7XG4gICAgICAgICAgbWVzc2FnZUNvbnRlbnQ6IG5ld0lucHV0RmllbGQudmFsKCksXG4gICAgICAgIH1cbiAgICAgICAgLy8gc2F2ZSBtZXNzYWdlIGlkICNcbiAgICAgICAgY29uc3QgZWRpdGVkTWVzc2FnZUlkID0gbmV3SW5wdXRGaWVsZC5wYXJlbnQoKS5hdHRyKFwiaWRcIilcbiAgICAgICAgLy8gUGF0Y2ggbWVzc2FnZSBpbiBzZXJ2ZXIgYW5kIHJlZnJlc2ggdGhlIG1lc3NhZ2VzIG9uIHRoZSBwYWdlXG4gICAgICAgIEFQSS51cGRhdGVJdGVtKFwibWVzc2FnZXNcIiwgZWRpdGVkTWVzc2FnZUlkLCBlZGl0ZWRNZXNzYWdlVGV4dE9iailcbiAgICAgICAgICAudGhlbigoKSA9PiBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE1lc3NhZ2VzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgYWN0aXZlVXNlciBmcm9tIFwiLi9zZXNzaW9uU3RvcmFnZVwiXG5cblxuXG5jb25zdCBidWlsZE1pc3Npb25Db250cm9sID0ge1xuICBwcmludFBsYWNlaG9sZGVyICgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gbnVsbDtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm1lc3NhZ2VcIiwgaWQ6IGAke2FjdGl2ZVVzZXIuaW5mbygpLmlkfWB9LFxuICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke2FjdGl2ZVVzZXIuaW5mbygpLnByb2ZpbGVQaWN9YCwgYWx0OiBcIlByb2ZpbGUgUGljXCIsIHN0eWxlOlwiZGlzcGxheTppbmxpbmUtYmxvY2s7IGJvcmRlci1yYWRpdXM6IDhweDsgbWFyZ2luOiA0cHhcIiwgaGVpZ2h0OiBcIjEyNVwiLCB3aWR0aDogXCIxMjVcIn0pLFxuICAgIG5ldyBjb21wLnRpdGxlKCBcImgyXCIsIHtzdHlsZTpcImRpc3BsYXk6IGlubGluZS1ibG9jazsgcG9zaXRpb246IHJlbGF0aXZlOyBib3R0b206IDEwcHhcIn0sIGAke2FjdGl2ZVVzZXIuaW5mbygpLmZpcnN0TmFtZX0gLSAke2FjdGl2ZVVzZXIuaW5mbygpLmxhc3ROYW1lfSAke2FjdGl2ZVVzZXIuaW5mbygpLnVzZXJuYW1lfWApLFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE1pc3Npb25Db250cm9sOyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxuaW1wb3J0IGJ1aWxkTWVzc2FnZXMgZnJvbSBcIi4vbWVzc2FnZXNcIjtcbmltcG9ydCBidWlsZE5ld3MgZnJvbSBcIi4vbmV3c1wiO1xuaW1wb3J0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgZnJvbSBcIi4vbWlzc2lvbkNvbnRyb2xcIjtcbmltcG9ydCBidWlsZFRhc2tzIGZyb20gXCIuL3Rhc2tzXCJcbmltcG9ydCBidWlsZEV2ZW50cyBmcm9tIFwiLi9ldmVudHNcIlxuXG5cbmNvbnN0IG5hdkJhciA9IHtcbiAgbG9hZE5hdkJhcigpIHtcbiAgICBuZXcgY29tcC51bChcbiAgICAgIHt9LFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiSG9tZVwiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIlRhc2tzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiRXZlbnRzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiTWVzc2FnZXNcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJOZXdzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiRnJpZW5kc1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkxvZyBPdXRcIilcbiAgICApLnJlbmRlcihcIiNuYXZCYXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2QmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiSG9tZVwiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJUYXNrc1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZFRhc2tzLmJ1aWxkQ29udGFpbmVycygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkV2ZW50c1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIk1lc3NhZ2VzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJOZXdzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBidWlsZE5ld3MubmV3c01hcCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkZyaWVuZHNcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRnJpZW5kcyBmdW5jdGlvbiBjYWxsZXMuXCIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTG9nIE91dFwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9nIE91dCBmdW5jdGlvbiBjYWxsZWQuXCIpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmF2QmFyIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHt9LCBgJHtuZXdzT2JqLmFydGljbGVOYW1lfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDRcIiwge30sIGBTYXZlZCBieTogJHtuZXdzT2JqLnVzZXIuZmlyc3ROYW1lfSB8IERhdGUgU2F2ZWQ6ICR7bmV3c09iai5kYXRlU2F2ZWR9YCksXG4gICAgbmV3IGNvbXAucGFyKHt9LCBuZXdzT2JqLmFib3V0KSxcbiAgICBuZXcgY29tcC5idG4oXCJEZWxldGUgQXJ0aWNsZVwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgfSxcblxuICBuZXdzTWFwICgpICB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYGFydGljbGVzLz91c2VySWQ9JHthY3RpdmVVc2VyLmluZm8oKS5pZH0mX2V4cGFuZD11c2VyJl9zb3J0PWRhdGVTYXZlZCZfb3JkZXI9ZGVzY2ApXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICB0aGlzLnByaW50TmV3cyhuZXdzKX0pKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5uZXdOZXdzKCkpXG4gICAgICAudGhlbigoKT0+IHRoaXMuZXZlbnRMaXN0ZW5lcigpKVxuXG4gIH0sXG5cbiAgbmV3TmV3cyAoKSB7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXctLW5ld3NcIn0sXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge30sIFwiU2F2ZSBOZXdzIEFydGljbGVcIiksXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZU5hbWVcIn0sIFwiQXJ0aWNsZSBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZU5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBOYW1lXCIsIGlkOiBcImFydGljbGVOYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVVcmxcIn0sIFwiQXJ0aWNsZSBMaW5rXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZVVybFwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIExpbmtcIiwgaWQ6IFwiYXJ0aWNsZUxpbmtcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlSW1hZ2VVcmxcIn0sIFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZUltYWdlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgSW1hZ2UgTGlua1wiLCBpZDogXCJhcnRpY2xlSW1hZ2VcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlRGVzY3JpcHRpb25cIn0sIFwiQXJ0aWNsZSBEZXNjcmlwdGlvblwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVEZXNjcmlwdGlvblwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIsIGlkOiBcImFydGljbGVEZXNjcmlwdGlvblwifSksXG4gICAgICBuZXcgY29tcC5idG4oXCJTYXZlIE5ldyBBcnRpY2xlXCIpXG4gICAgKSxcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgZXZlbnRMaXN0ZW5lcigpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKT0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpPT57XG4gICAgICAgIGlmKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIlNhdmUgTmV3IEFydGljbGVcIil7XG4gICAgICAgICAgbGV0IHN0b3J5ID0ge1xuICAgICAgICAgICAgYXJ0aWNsZU5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZU5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICB1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUxpbmtcIikudmFsdWUsXG4gICAgICAgICAgICBhcnRpY2xlSW1hZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUltYWdlXCIpLnZhbHVlLFxuICAgICAgICAgICAgYWJvdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZURlc2NyaXB0aW9uXCIpLnZhbHVlLFxuICAgICAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZCxcbiAgICAgICAgICAgIGRhdGVTYXZlZDogbmV3IERhdGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBidWlsZE5ld3MuYWRkTmV3cyhzdG9yeSlcbiAgICAgICAgfSBlbHNlIGlmKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkRlbGV0ZSBBcnRpY2xlXCIpe1xuICAgICAgICAgIGxldCBhcnRpY2xlSWQgPSBlLnRhcmdldC5wYXJlbnROb2RlLmlkXG4gICAgICAgICAgQVBJLmRlbGV0ZUl0ZW0oXCJhcnRpY2xlc1wiLCBhcnRpY2xlSWQpLnRoZW4oKCk9PiBidWlsZE5ld3MubmV3c01hcCgpKVxuICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG5cblxuICBhZGROZXdzKHN0b3J5KXtcbiAgICBBUEkuc2F2ZUl0ZW0oXCJhcnRpY2xlc1wiLCBzdG9yeSkudGhlbigoKT0+IHRoaXMubmV3c01hcCgpKVxuICB9XG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE5ld3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5jb25zdCByZWdpc3RlckZ1bmNzID0ge1xuXG4gIGxvYWRSZWdpc3RlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJGaXJzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImZpcnN0TmFtZVwiLCBpZDogXCJmaXJzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiRmlyc3QgTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiTGFzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImxhc3ROYW1lXCIsIGlkOiBcImxhc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkxhc3QgTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRW1haWxcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwiZW1haWxcIiwgaWQ6IFwiZW1haWxcIiwgbmFtZTogXCJlbWFpbFwiLCBwbGFjZWhvbGRlcjogXCJlbWFpbFwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwidXNlcm5hbWVcIiwgaWQ6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcInBhc3N3b3JkXCIgfSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJwYXNzd29yZFwiLCBpZDogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwiY29uZmlybVBhc3N3b3JkXCIgfSwgXCJDb25maXJtIFBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImNvbmZpcm1QYXNzd29yZFwiLCBpZDogXCJjb25maXJtUGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiUmVnaXN0ZXIgQWNjb3VudFwiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkFscmVhZHkgYSB1c2VyPyBMb2cgaW4gbm93XCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJSZWdpc3RlciBBY2NvdW50XCIpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdE5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0TmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1QYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBjaGVjayB0byBlbnN1cmUgYWxsIGZpZWxkcyBhcmUgY29tcGxldGUuXG4gICAgICAgICAgICBhbGVydChcIkFsbCBmaWVsZHMgbXVzdCBiZSBjb21wbGV0ZSB0byBjcmVhdGUgYW4gYWNjb3VudC5cIilcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUuaW5kZXhPZihcIkBcIikgPT09IC0xKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgYSBjaGVjayBvbiB0aGUgZW1haWwgZmllbGQgdG8gbWFrZSBzdXJlIHRoZXJlIGlzIGFuIEAgcHJlc2VudFxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUGFzc3dvcmRcIikudmFsdWUpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY2hlY2sgdG8gbWFrZSBzdXJlIHBhc3N3b3JkcyBhcmUgdGhlIHNhbWUuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGxldCB0ZW1wVXNlciA9IHtcbiAgICAgICAgICAgICAgZmlyc3ROYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpcnN0TmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgbGFzdE5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIGVtYWlsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlLFxuICAgICAgICAgICAgICB1c2VybmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUsXG4gICAgICAgICAgICAgIC8vVGhpcyBpcyBhIHBsYWNlaG9sZGVyIHRvIGEgc3RvY2sgXCJubyBpbWFnZSBhdmFpbGFibGVcIiBpbWFnZSB0aGF0IHdlIGNhbiB1c2UgbGF0ZXIgZm9yIGFjdHVhbCB1c2VyIGltYWdlc1xuICAgICAgICAgICAgICBwcm9maWxlUGljOiBcImh0dHBzOi8vaHloYS54eXovd3AtY29udGVudC90aGVtZXMvZmFzaGlvbi9pbWFnZXMvbm9faW1hZ2VfYXZhaWxhYmxlLmpwZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz9lbWFpbD0ke3RlbXBVc2VyLmVtYWlsfWApLnRoZW4odGhpc0RhdGEgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpc0RhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1JlZ2lzdGVyKHRlbXBVc2VyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlRoaXMgZW1haWwgaXMgYWxyZWFkeSByZWdpc3RlcmVkLlwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7IGFsZXJ0KFwiWW91ciBwYXNzd29yZHMgZGlkIG5vdCBtYXRjaC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIikgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIGNoZWNrUmVnaXN0ZXIodXNlcikge1xuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlci51c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIEFQSS5zYXZlSXRlbShcInVzZXJzXCIsIHVzZXIpLnRoZW4obmV3VXNlciA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlcihuZXdVc2VyKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXJuYW1lIGNoZWNrUmVnaXN0ZXI6IFwiLCBjdXJyZW50VXNlcilcbiAgICAgICAgICAvL1RPRE86dGhlIGZ1bmN0aW9uIGJlbG93IG5lZWRzIHRvIGJlIHRoZSBjYWxsIHRvIGxvYWQgbWlzc2lvbiBjb250cm9sIHBhZ2UuXG4gICAgICAgICAgLy8gUmlnaHQgbm93IGl0IGlzIGp1c3Qgc2VuZGluZyB0byBhIGZ1bmN0aW9uIHRvIGNvbnNvbGUubG9nIHVzZXJcbiAgICAgICAgICB0aGlzLmxvYWRNaXNzaW9uKGN1cnJlbnRVc2VyKTtcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYWxlcnQoYFVzZXJuYW1lLCAke2RhdGFbMF0udXNlcm5hbWV9LCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuIFBsZWFzZSBjaG9vc2UgYW5vdGhlci5gKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLy9UT0RPOiB0aGlzIGZ1bmN0aW9uIGNhbiBnbyBhd2F5IHdoZW4gdGhlIGZ1bmN0aW9uIHRvIGxvYWQgbWlzc2lvbiBwYWdlIGlzIHJlcGxhY2VkIGluIGNoZWNrUmVnaXN0ZXIgZnVuY3Rpb24gYWJvdmVcbiAgbG9hZE1pc3Npb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckZ1bmNzIiwiLy8gc2NyaXB0cyByZWxhdGVkIHRvIHNlc3Npb25TdG9yYWdlXHJcblxyXG5jb25zdCBhY3RpdmVVc2VyID0ge1xyXG4gIGluZm8gKCkge1xyXG4gICAgbGV0IGxvZ2dlZEluVXNlciA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuY3VycmVudFVzZXIpO1xyXG4gICAgICByZXR1cm4gbG9nZ2VkSW5Vc2VyO1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZlVXNlcjtcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkVGFza3MgPSB7XG5cbiAgLy9mdW5jdGlvbiBydW4gZmlyc3QgaW4gb3JkZXIgdG8gY2xlYXIgSFRNTCwgY3JlYXRlIHBhcmVudCBjb250YWluZXJzLCB0aGVuIGFkZCBuZXcgdGFzayBpbnB1dCBhbmQgY2FsbCBmZXRjaFxuICBidWlsZENvbnRhaW5lcnMgKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0taW5jb21wbGV0ZVwifSwgXCJJbmNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgbmV3IGNvbXAuZGl2ICh7aWQ6IFwiaW5jb21wbGV0ZVwifSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7Y2xhc3NOYW1lOiBcInRpdGxlLS1jb21wbGV0ZVwifSwgXCJDb21wbGV0ZSBUYXNrc1wiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIG5ldyBjb21wLmRpdiAoe2lkOiBcImNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIHRoaXMubmV3VGFzaygpXG4gICAgdGhpcy50YXNrc0ZldGNoKClcbiAgfSxcblxuICAvL3VzZWQgdG8gY3JlYXRlIGFuZCBhcHBlbmQgYWxsIHRhc2tzIGZyb20gZGF0YWJhc2UgdG8gRE9NXG4gIHByaW50VGFza3MgKHRhc2tzT2JqKSB7XG4gICAgbGV0IG91dHB1dENvbnRhaW5lcjtcblxuICAgIGlmICh0YXNrc09iai5jb21wbGV0ZSkge1xuICAgICAgb3V0cHV0Q29udGFpbmVyID0gXCIjY29tcGxldGVcIlxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNpbmNvbXBsZXRlXCJcbiAgICB9XG5cbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcInRhc2tcIiwgaWQ6IGAke3Rhc2tzT2JqLmlkfWB9LFxuICAgIG5ldyBjb21wLmNoZWNrYm94KCksXG4gICAgbmV3IGNvbXAucGFyKHtjbGFzc05hbWU6IFwiZWRpdGFibGUtLXRhc2tcIn0sIHRhc2tzT2JqLnRhc2spLFxuICAgIG5ldyBjb21wLnBhcih7Y2xhc3NOYW1lOiBcImVkaXRhYmxlLS1kYXRlXCJ9LCB0YXNrc09iai5kdWVEYXRlKSkucmVuZGVyKG91dHB1dENvbnRhaW5lcilcbiAgfSxcblxuICAvL2ZldGNoIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlLCBjYWxsIGNyZWF0ZS9hcHBlbmQgYW5kIGNhbGwgYWRkIGxpc3RlbmVyc1xuICB0YXNrc0ZldGNoICgpICB7XG4gICAgQVBJLmdldEFsbENhdGVnb3J5KGB0YXNrcy8/dXNlcklkPSR7YWN0aXZlVXNlci5pbmZvKCkuaWR9Jl9zb3J0PWR1ZURhdGUmX29yZGVyPWFzY2ApIC8vY2hlY2sgaWYgdXNlciBpcyBzYW1lIGFzIHNlc3Npb24gc3RvcmFnZVxuICAgIC50aGVuKHRhc2tzT2JqID0+ICB7XG4gICAgICB0YXNrc09iai5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgdGhpcy5wcmludFRhc2tzKHRhc2spfSlcbiAgICAgIHRoaXMuY2JMaXN0ZW5lcigpXG4gICAgICB0aGlzLnBhckxpc3RlbmVyKClcbiAgICB9KVxuICB9LFxuXG4gIC8vY2hlY2tib3ggbGlzdGVuZXIgd2lsbCBtb3ZlIHRhc2tzIGJldHdlZW4gY29tcGxldGUgYW5kIGluY29tcGxldGUgY29udGFpbmVyc1xuICAvL2RhdGFiYXNlIFwiY29tcGxldGVcIiBwcm9wZXJ0eSB3aWxsIGJlIHBhdGNoZWQgYWNjb3JkaW5nbHkgYW5kIERPTSB1cGRhdGVkXG4gIGNiTGlzdGVuZXIgKCkge1xuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIilcblxuICAgIC8vaWYgdGhlIGlkIG9mIHRoZSBncmFuZHBhcmVudCBjb250YWluZXIgaXMgI2NvbXBsZXRlLCB0aGVuIGNoZWNrIHRoZSBib3hcbiAgICBjaGVja2JveGVzLmZvckVhY2goIChjaGVja2JveCkgPT4ge1xuICAgICAgaWYgKGNoZWNrYm94LnBhcmVudE5vZGUucGFyZW50Tm9kZS5pZCA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICAgIGxldCBwYXRjaFByb3BlcnR5O1xuICAgICAgICAvL2lmIGZhbHNlIC0+IHRydWVcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICBwYXRjaFByb3BlcnR5ID0ge2NvbXBsZXRlOiB0cnVlfVxuICAgICAgICAgIC8vcGF0Y2ggXCJjb21wbGV0ZVwiIHByb3BlcnR5IG9mIGRhdGFiYXNlIG9iamVjdCB1c2luZyBwYXJlbnROb2RlIChzZWN0aW9uKSBJRCB0byBUUlVFXG4gICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWAsIHBhdGNoUHJvcGVydHkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vaWYgY2hlY2tib3ggaXMgdW5jaGVja2VkLi4uXG4gICAgICAgICAgcGF0Y2hQcm9wZXJ0eSA9IHtjb21wbGV0ZTogZmFsc2V9XG4gICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWAsIHBhdGNoUHJvcGVydHkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgfSxcblxuICAvL2Z1bmN0aW9uIHVzZWQgdG8gZWRpdCB0YXNrcyBpbiBET00gYW5kIHBhdGNoIG5ldyBpbmZvIHRvIGRhdGFiYXNlIHRhc2sgZGVzY3JpcHRpb24gYW5kIGRhdGVcbiAgcGFyTGlzdGVuZXIgKCkge1xuICAgIC8vZ2V0IGFsbCBzZWN0aW9ucyBvbiBwYWdlXG4gICAgbGV0IHNlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlY3Rpb25cIilcblxuICAgIC8vL2FkZCBjbGljayBsaXN0ZW5lciB0byBhbGwgc2VjdGlvbnNcbiAgICBzZWN0aW9ucy5mb3JFYWNoKHNlY3Rpb24gPT4ge1xuICAgICAgc2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgLy9nZXQgaWQgb2YgdGFyZ2V0IHNlY3Rpb25cbiAgICAgICAgY29uc3QgaWQgPSBlLnRhcmdldC5wYXJlbnROb2RlLmlkXG5cbiAgICAgICAgLy9pZiBwYXJhZ3JhcGggY2xpY2tlZCBpcyB0YXNrIGRlc2NyaXB0aW9uLCBnZXQgdGV4dCBjb250ZW50XG4gICAgICAgIC8vY3JlYXRlIG5ldyA8aW5wdXQ+IHRlbXBsYXRlICh3aXRoICBJRCEpIGFuZCByZXBsYWNlIDxwPiB3aXRoIDxpbnB1dD5cbiAgICAgICAgLy9hZGQgYSBrZXlkb3duIGxpc3RlbmVyIHRvIHRoZSBpbnB1dCBhZnRlciBpdCBpcyBpbiBET00gYW5kXG4gICAgICAgIC8vcGF0Y2ggdGhlIHRhc2sgZGVzY3JpcHRpb24gdG8gZGF0YWJhc2Ugd2hlbiBFTlRFUiBpcyBwcmVzc2VkXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0YWJsZS0tdGFza1wiKSkge1xuICAgICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZS50YXJnZXQudGV4dENvbnRlbnRcbiAgICAgICAgICBsZXQgdGVtcFRhc2tJbnB1dCA9IGA8aW5wdXQgaWQ9XCJ0ZW1wMVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke3Rhc2tOYW1lfVwiPmBcbiAgICAgICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aCh0ZW1wVGFza0lucHV0KVxuICAgICAgICAgIGNvbnN0IHRlbXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcDFcIik7XG4gICAgICAgICAgICB0ZW1wSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaFRhc2sgPSB7dGFzazogdGVtcElucHV0LnZhbHVlfVxuICAgICAgICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgaWQsIHBhdGNoVGFzaylcbiAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIC8vaWYgcGFyYWdyYXBoIGNsaWNrZWQgaXMgdGFzayBkdWUgZGF0ZSwgZ2V0IHRleHQgY29udGVudFxuICAgICAgICAvL2NyZWF0ZSBuZXcgPGlucHV0PiB0ZW1wbGF0ZSAod2l0aCAgSUQhKSBhbmQgcmVwbGFjZSA8cD4gd2l0aCA8aW5wdXQ+XG4gICAgICAgIC8vYWRkIGEgY2hhbmdlIGxpc3RlbmVyIHRvIHRoZSBpbnB1dCBhZnRlciBpdCBpcyBpbiBET00gYW5kXG4gICAgICAgIC8vcGF0Y2ggdGhlIHRhc2sgZHVlIGRhdGUgdG8gZGF0YWJhc2Ugd2hlbiBuZXcgZGF0ZSBpcyBzZWxlY3RlZFxuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRhYmxlLS1kYXRlXCIpKSB7XG4gICAgICAgICAgY29uc3QgdGFza0RhdGUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxuICAgICAgICAgIGxldCB0ZW1wVGFza0RhdGUgPSBgPGlucHV0IGlkPVwidGVtcDJcIiB0eXBlPVwiZGF0ZVwiIHZhbHVlPVwiJHt0YXNrRGF0ZX1cIj5gXG4gICAgICAgICAgJChlLnRhcmdldCkucmVwbGFjZVdpdGgodGVtcFRhc2tEYXRlKVxuICAgICAgICAgICAgY29uc3QgdGVtcERhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcDJcIik7XG4gICAgICAgICAgICB0ZW1wRGF0ZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaERhdGUgPSB7ZHVlRGF0ZTogdGVtcERhdGVJbnB1dC52YWx1ZX1cbiAgICAgICAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGlkLCBwYXRjaERhdGUpXG4gICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH0sXG5cbiAgLy9jcmVhdGVzIG5ldyB0YXNrIGlucHV0IGZpZWxkIHdpdGggYXBwZW5kIGJ1dHRvbiBpbnNpZGUgZmlyc3Qgc2VjdGlvbiBvZiBJTkNPTVBMRVRFIGNvbnRhaW5lclxuICBuZXdUYXNrICgpIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tdGFza1wifSxcbiAgICBuZXcgY29tcC5idG4gKFwiK1wiKSxcbiAgICBuZXcgY29tcC5pbnB1dCh7aWQ6IFwiaW5wdXQtLXRhc2tcIiwgdHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiBcInR5cGUgbmV3IHRhc2sgaGVyZVwifSksXG4gICAgbmV3IGNvbXAuaW5wdXQoe2lkOiBcImlucHV0LS1kYXRlXCIsIHR5cGU6IFwiZGF0ZVwifSkpLnJlbmRlcihcIiNpbmNvbXBsZXRlXCIpXG5cbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpXG4gICAgY29uc3QgaW5wdXRfdGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtLXRhc2tcIilcbiAgICBjb25zdCBpbnB1dF9kYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC0tZGF0ZVwiKVxuXG4gICAgLy9idXR0b24gY2xpY2sgcG9zdHMgbmV3IHRhc2sgdG8gZGF0YWJhc2UgYW5kIHJlc2V0cyBuZXcgdGFzayBpbnB1dCBzdHJpbmdzXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKGlucHV0X3Rhc2sudmFsdWUgPT09IFwiXCIgfHwgaW5wdXRfZGF0ZS52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0YXNrSXRlbSA9IHtcbiAgICAgICAgICB0YXNrOiBpbnB1dF90YXNrLnZhbHVlLFxuICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICBkdWVEYXRlOiBpbnB1dF9kYXRlLnZhbHVlLFxuICAgICAgICAgIC8qXG4gICAgICAgICAgTkVFRCBUTyBVUERBVEUgVVNFUiBJRCBUTyBTQVZFIFNFU1NJT04gQVNTSUdORUQgSURcbiAgICAgICAgICAqL1xuICAgICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWQsXG4gICAgICAgIH1cbiAgICAgICAgQVBJLnNhdmVJdGVtKFwidGFza3NcIiwgdGFza0l0ZW0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy5wcmludFRhc2tzKGRhdGEpXG4gICAgICAgICAgdGhpcy5jYkxpc3RlbmVyKClcbiAgICAgICAgICB0aGlzLnBhckxpc3RlbmVyKClcbiAgICAgICAgfSlcbiAgICAgICAgaW5wdXRfdGFzay52YWx1ZSA9IFwiXCJcbiAgICAgICAgaW5wdXRfZGF0ZS52YWx1ZSA9IFwiXCJcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkVGFza3MiXX0=
