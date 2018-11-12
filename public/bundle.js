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

<<<<<<< HEAD
},{"./landing":4,"./nav":9}],7:[function(require,module,exports){
=======
},{"./landing":5,"./nav":10}],8:[function(require,module,exports){
>>>>>>> master
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _apiData = _interopRequireDefault(require("./apiData"));

var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));

<<<<<<< HEAD
let currentUser = {};
=======
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

>>>>>>> master
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
<<<<<<< HEAD
          userId: currentUser.id // send to API
=======
          userId: _sessionStorage.default.info().id // send to API
>>>>>>> master

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

<<<<<<< HEAD
},{"./apiData":2,"./components":3,"./login":5,"./missionControl":8}],12:[function(require,module,exports){
=======
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
>>>>>>> master
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

<<<<<<< HEAD
},{"./apiData":2,"./components":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvbGFuZGluZy5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9taXNzaW9uQ29udHJvbC5qcyIsIi4uL3NjcmlwdHMvbmF2LmpzIiwiLi4vc2NyaXB0cy9uZXdzLmpzIiwiLi4vc2NyaXB0cy9yZWdpc3Rlci5qcyIsIi4uL3NjcmlwdHMvdGFza3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLEtBQUssSUFBSTtBQUN0QjtBQUNBLFlBQUksS0FBSyxDQUFDLE9B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QURKO0FBRWIsVUFBQSxRQUFRLEVBQUUsS0FGRztBQUdiLFVBQUEsT0FBTyxFQUFFLFVBQVUsQ0FBQyxLQUhQOztBQUliOzs7QUFHQSxVQUFBLE1BQU0sRUFBRTtBQVBLLFNBQWY7O0FBU0EseUJBQUksUUFBSixDQUFhLE9BQWIsRUFBc0IsUUFBdEIsRUFBZ0MsSUFBaEMsQ0FBcUMsSUFBSSxJQUFJO0FBQzNDLGVBQUssVUFBTCxDQUFnQixJQUFoQjtBQUNBLGVBQUssVUFBTDtBQUNBLGVBQUssV0FBTDtBQUNELFNBSkQ7O0FBS0EsUUFBQSxVQUFVLENBQUMsS0FBWCxHQUFtQixFQUFuQjtBQUNBLFFBQUEsVUFBVSxDQUFDLEtBQVgsR0FBbUIsRUFBbkI7QUFDRDtBQUNGLEtBckJEO0FBc0JEOztBQXhKZ0IsQ0FBbkI7ZUEySmUsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBlbGVtZW50U3ltYm9sID0gU3ltYm9sKClcblxuY2xhc3MgRE9NQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xuICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBJZiBgYXR0cmlidXRlc2AgaXMganVzdCBhIHN0cmluZywgaXQncyBhIHNpbXBsZSBlbGVtZW50IHdpdGggbm9cbiAgICAgICAgICAgIHByb3BlcnRpZXMgLSBqdXN0IHNvbWUgdGV4dCBjb250ZW50XG4gICAgICAgICovXG4gICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZXNcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0gPSBPYmplY3QuYXNzaWduKHRoaXNbZWxlbWVudFN5bWJvbF0sIGF0dHJpYnV0ZXMpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAvLyBPbmUgSFRNTEVsZW1lbnQgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5lbGVtZW50IGluc3RhbmNlb2Ygd2luZG93LkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS5hcHBlbmRDaGlsZChjaGlsZC5lbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuIGFycmF5IG9mIGVsZW1lbnRzIHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZWxlbWVudC5mb3JFYWNoKGMgPT4gdGhpc1tlbGVtZW50U3ltYm9sXS5hcHBlbmRDaGlsZChjKSlcblxuICAgICAgICAgICAgICAgICAgICAvLyBTdHJpbmcgdmFsdWUgd2FzIHBhc3NlZCBpbiwgc2V0IHRleHQgY29udGVudFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBjaGlsZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGdldCBlbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbZWxlbWVudFN5bWJvbF1cbiAgICB9XG5cbiAgICByZW5kZXIoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXNbZWxlbWVudFN5bWJvbF0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKS5hcHBlbmRDaGlsZChmcmFnbWVudClcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRE9NQ29tcG9uZW50XG4iLCJjb25zdCBVUkwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9cIlxuXG5jb25zdCBBUEkgPSB7XG4gIGdldEFsbENhdGVnb3J5KGNhdGVnb3J5KSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fWApXG4gICAgICAudGhlbihlbnRyaWVzID0+IGVudHJpZXMuanNvbigpKVxuICB9LFxuXG4gIGdldE9uZUZyb21DYXRlZ29yeShjYXRlZ29yeSwgaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9P2lkPSR7aWR9YClcbiAgICAgIC50aGVuKGlucHV0cyA9PiBpbnB1dHMuanNvbigpKVxuICB9LFxuXG4gIHNhdmVJdGVtKGNhdGVnb3J5LCBpdGVtKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICB9XG4gICAgKS50aGVuKGpzb25EYXRhID0+IGpzb25EYXRhLmpzb24oKSlcbiAgfSxcblxuICBkZWxldGVJdGVtKGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0/aWQ9JHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICB1cGRhdGVJdGVtKGNhdGVnb3J5LCBpZCwgaXRlbSl7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfVxuICAgIClcblxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgRE9NQ29tcG9uZW50IGZyb20gXCIuLi9saWIvbm9kZV9tb2R1bGVzL25zcy1kb21jb21wb25lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmNyZWF0ZShudWxsLCB7XHJcblxyXG4gIHVzZXI6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBVc2VyIHtcclxuICAgICAgY29uc3RydWN0b3IodGVtcEluZm8pIHtcclxuICAgICAgICB0aGlzLmlkID0gdGVtcEluZm8uaWQ7XHJcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB0ZW1wSW5mby5maXJzdE5hbWU7XHJcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9IHRlbXBJbmZvLmxhc3ROYW1lO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB0ZW1wSW5mby51c2VybmFtZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gdGVtcEluZm8ucGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5lbWFpbCA9IHRlbXBJbmZvLmVtYWlsO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZVBpYyA9IHRlbXBJbmZvLnByb2ZpbGVQaWM7XHJcbiAgICB9XHJcbiAgICAvL1RPRE86IHRoaXMgaXMganVzdCBhIHRlc3QgZnVuY3Rpb24uIHdlIHdvdWxkIGhhdmUgdGhlIGFiaWxpdHkgdG8gY2FsbCBmb3Igc2F2aW5nXHJcbiAgICAvLyBtZXNzYWdlcyxhcnRpY2xlcywgZXZlbnRzIGJlIHJlZmVyZW5jaW5nIGEgZnVuY3Rpb24gZGVmaW5lZCBoZXJlXHJcbiAgICAgIHRlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBXZWxjb21lICR7dGhpcy5maXJzdE5hbWV9ISBMZXQncyBzZWUgd2hhdCdzIGdvaW5nIG9uLmA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBkaXY6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBkaXYgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZGl2XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBidG46IHtcclxuICAgIHZhbHVlOiBjbGFzcyBidG4gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImJ0blwiLCB0eXBlOiBcImJ1dHRvblwiIH0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbnB1dDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGlucHV0IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZWN0aW9uOiB7XHJcbiAgICB2YWx1ZTogY2xhc3Mgc2VjdGlvbiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJzZWN0aW9uXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0aXRsZTogeyAvL2RlZmluZSBhbnkgdHlwZSBvZiBoIy4uIGgxLCBoMiwgZXRjLlxyXG4gICAgdmFsdWU6IGNsYXNzIHRpdGxlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGFuY2hvcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGFuY2hvciBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGVja2JveDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGNoZWNrYm94IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBjbGFzc05hbWU6IFwiY2JcIiB9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW1hZ2U6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBpbWFnZSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbWdcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgdWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwidWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxpOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGkgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGlcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHZhbHVlOiBjbGFzcyBmb3JtIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImZvcm1cIiwge30sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsYWJlbDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxhYmVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxhYmVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0ZXh0YXJlYToge1xyXG4gICAgdmFsdWU6IGNsYXNzIHRleHRhcmVhIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInRleHRhcmVhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBwYXI6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBwYXIgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwicFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSkiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxyXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXHJcblxyXG5jb25zdCBsYW5kaW5nUGFnZUZ1bmNzID0ge1xyXG4gIGxvYWRMYW5kaW5nUGFnZSgpIHtcclxuICAgIG5ldyBjb21wLmRpdihcclxuICAgICAgeyBjbGFzc0xpc3Q6IFwid2VsY29tZVwiIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIiB9LCBcIldlbGNvbWUgdG8gTWlzc2lvbiBDb250cm9sXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJMb2dpblwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiUmVnaXN0ZXJcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBsZXQgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIilcclxuXHJcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luXCIpIHtcclxuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGFuZGluZ1BhZ2VGdW5jcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IHJlZ2lzdGVyRnVuY3MgZnJvbSBcIi4vcmVnaXN0ZXJcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5jb25zdCBsb2dJbkZ1bmNzID0ge1xuICBjaGVja1VzZXIodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgaWYgKHVzZXJuYW1lID09PSBcIlwiIHx8IHBhc3N3b3JkID09PVwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiWW91IG11c3QgZW50ZXIgYm90aCB5b3VyIHVzZXJuYW1lIGFuZCBwYXNzd29yZCB0byBsb2cgaW4uXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlcm5hbWV9YCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYWxlcnQoXCJUaGVyZSBpcyBubyB1c2VyIHdpdGggdGhhdCB1c2VybmFtZS5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHBhc3N3b3JkID09PSBkYXRhWzBdLnBhc3N3b3JkKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlciAoZGF0YVswXSk7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRVc2VyO1xuICAgICAgICB9IGVsc2UgKCBhbGVydChcIllvdSBlbnRlcmVkIHRoZSB3cm9uZyBwYXNzd29yZC4gVHJ5IGFnYWluLlwiKSlcbiAgICAgIH0pLnRoZW4oY3VycmVudFVzZXIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VXNlcilcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkJ1aWxkIE1pc3Npb24gTG9naW5cIilcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFVzZXIpKTtcbiAgICAgICAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbG9hZExvZ0luKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInVzZXJuYW1lXCIsIGlkOiBcInVzZXJuYW1lXCIsIHBsYWNlaG9sZGVyOiBcInVzZXJuYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJwYXNzd29yZFwiIH0sIFwiUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwicGFzc3dvcmRcIiwgaWQ6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIiB9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luIE5vd1wiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIk5vdCBhIHVzZXI/IENyZWF0ZSBuZXcgYWNjb3VudC5cIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luIE5vd1wiKSB7XG4gICAgICAgICAgdGhpcy5jaGVja1VzZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbG9nSW5GdW5jcyIsImltcG9ydCBsYW5kaW5nUGFnZUZ1bmNzIGZyb20gXCIuL2xhbmRpbmdcIlxyXG5pbXBvcnQgbmF2QmFyIGZyb20gXCIuL25hdlwiXHJcblxyXG5uYXZCYXIubG9hZE5hdkJhcigpO1xyXG5sYW5kaW5nUGFnZUZ1bmNzLmxvYWRMYW5kaW5nUGFnZSgpO1xyXG4iLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXG5cbmxldCBjdXJyZW50VXNlciA9IHt9O1xuXG5jb25zdCBidWlsZE1lc3NhZ2VzID0ge1xuICBwcmludE1lc3NhZ2VzKG1lc3NhZ2VPYmopIHtcbiAgICBpZiAoY3VycmVudFVzZXIuaWQgPT09IG1lc3NhZ2VPYmoudXNlci5pZCkge1xuICAgICAgbmV3IGNvbXAuc2VjdGlvbih7XG4gICAgICAgICAgY2xhc3NOYW1lOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICBpZDogYCR7bWVzc2FnZU9iai5pZH1gXG4gICAgICAgIH0sXG4gICAgICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke21lc3NhZ2VPYmoudXNlci5wcm9maWxlUGljfWAsIGNsYXNzTmFtZTogXCJtZXNzYWdlUGljXCIsIGFsdDogXCJQcm9maWxlIFBpY1wifSksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge2NsYXNzTmFtZTogXCJtZXNzYWdlQXV0aG9yXCJ9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBtZXNzYWdlT2JqLm1lc3NhZ2VDb250ZW50KSxcbiAgICAgICAgbmV3IGNvbXAuYnRuKFwiRWRpdFwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IGNvbXAuc2VjdGlvbih7XG4gICAgICAgICAgY2xhc3NOYW1lOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICBpZDogYCR7bWVzc2FnZU9iai5pZH1gXG4gICAgICAgIH0sXG4gICAgICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke21lc3NhZ2VPYmoudXNlci5wcm9maWxlUGljfWAsIGFsdDogXCJQcm9maWxlIFBpY1wiLCBjbGFzc05hbWU6IFwibWVzc2FnZVBpY1wifSksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge2NsYXNzTmFtZTpcIm1lc3NhZ2VBdXRob3JcIn0sIGAke21lc3NhZ2VPYmoudXNlci5maXJzdE5hbWV9IC0gJHttZXNzYWdlT2JqLmRhdGV9ICR7bWVzc2FnZU9iai50aW1lU3RhbXB9YCksXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG1lc3NhZ2VPYmoubWVzc2FnZUNvbnRlbnQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIH1cbiAgfSxcblxuICBtZXNzYWdlTWFwKCkge1xuICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikpO1xuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRVc2VyKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJtZXNzYWdlcy8/X2V4cGFuZD11c2VyXCIpXG4gICAgICAudGhlbihtZXNzYWdlT2JqID0+IHtcblxuICAgICAgICBtZXNzYWdlT2JqLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAgICAgdGhpcy5wcmludE1lc3NhZ2VzKG1lc3NhZ2UpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubmV3TWVzc2FnZSgpO1xuICAgICAgICB0aGlzLnN1Ym1pdE1lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5lZGl0QnV0dG9uQ2xpY2soKTtcbiAgICAgIH0pXG4gIH0sXG4gIC8vIGJ1aWxkcyBuZXcgbWVzc2FnZSBlbnRyeSBmaWVsZFxuICBuZXdNZXNzYWdlKCkge1xuICAgIC8vd3JhcHBlZCB0aGlzIGluIGEgZGl2IGluc3RlYWQgb2YgYSBzZWN0aW9uLCB0byBncmFiIHNlY3Rpb25zIGVhc2llci5cbiAgICBuZXcgY29tcC5kaXYoe1xuICAgICAgICBjbGFzc05hbWU6IFwibmV3LS1tZXNzYWdlXCIsXG4gICAgICAgIGlkOiBcIm5ld01lc3NhZ2VcIlxuICAgICAgfSxcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIFwiTmV3IE1lc3NhZ2VcIiksXG4gICAgICBuZXcgY29tcC50ZXh0YXJlYSh7XG4gICAgICAgIHBsYWNlaG9sZGVyOiBcInR5cGUgeW91ciBtZXNzYWdlIGhlcmVcIixcbiAgICAgICAgd3JhcDogXCJoYXJkXCJcbiAgICAgIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiU3VibWl0XCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG5cbiAgc3VibWl0TWVzc2FnZSgpIHtcbiAgICAkKFwiI25ld01lc3NhZ2UgPiBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIC8vaWYgc3RhdG1lbnQgdG8gcHJldmVudCBibGFuayBlbnRyaWVzXG4gICAgICBpZiAoJChcIiNuZXdNZXNzYWdlID4gdGV4dGFyZWFcIikudmFsKCkgPT09IFwiXCIpIHtcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgeW91ciBtZXNzYWdlXCIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgLy9jcmVhdGVzIG9iamVjdCBvZiBjdXJyZW50IG1vbWVudFxuICAgICAgICBsZXQgZGF0ZUFuZFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAvL2NvbnZlcnRzIGl0IGludG8gYSBzdHJpbmcgYW5kIHRoZW4gYW4gYXJyYXkgdG8gZ3JhYiBzcGVjaWZpYyB2YWx1ZXNcbiAgICAgICAgbGV0IGRhdGVBcnJheSA9IGRhdGVBbmRUaW1lLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpO1xuICAgICAgICAvL2dldE1vbnRoKCkgbWV0aG9kIHJldHVybnMgYSBudW1iZXIgYmV0d2VlbiAwLTExLiBBZGRlZCAxIHRvIGdldCBjdXJyZW50IG1vbnRoXG4gICAgICAgIGxldCBtb250aCA9IGRhdGVBbmRUaW1lLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAvL2J1aWxkcyBvYmplY3QgdG8gcGFzcyBpbnRvIGZldGNoXG4gICAgICAgIGxldCBzdWJtaXRNZXNzYWdlT2JqID0ge1xuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiAkKFwiI25ld01lc3NhZ2UgPiB0ZXh0YXJlYVwiKS52YWwoKSxcbiAgICAgICAgICB0aW1lU3RhbXA6IGRhdGVBcnJheVs0XSwgLy9UT0RPOiBtYWtlIGl0IG5vbiBtaWxpdGFyeSB0aW1lXG4gICAgICAgICAgZGF0ZTogYCR7bW9udGh9LyR7ZGF0ZUFycmF5WzJdfS8ke2RhdGVBcnJheVszXX1gLFxuICAgICAgICAgIHVzZXJJZDogY3VycmVudFVzZXIuaWRcblxuICAgICAgICB9XG4gICAgICAgIC8vIHNlbmQgdG8gQVBJXG4gICAgICAgIEFQSS5zYXZlSXRlbShcIm1lc3NhZ2VzXCIsIHN1Ym1pdE1lc3NhZ2VPYmopXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBlZGl0QnV0dG9uQ2xpY2soKSB7XG4gICAgLy8gZ3JhYnMgdGhlIGVkaXQgYnV0dG9uc1xuICAgICQoXCJzZWN0aW9uID4gYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyBzdG9yZXMgdGhlIG1lc3NhZ2UgaW4gYSB2YXJhYmxlXG4gICAgICBsZXQgbWVzc2FnZUgxID0gZS50YXJnZXQucHJldmlvdXNTaWJsaW5nXG4gICAgICAvLyBzdG9yZSBtZXNzYWdlJ3MgdGV4dCBpbiBhIHZhcmFibGVcbiAgICAgIGxldCBtZXNzYWdlVGV4dCA9IG1lc3NhZ2VIMS5pbm5lckhUTUw7XG4gICAgICAvLyByZXBsYWNlcyBFZGl0IGJ1dHRvbiB3aXRoIFNhdmUgYnV0dG9uXG4gICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aChcIjxidXR0b24gY2xhc3M9ICdidG4nIHR5cGUgPSdidXR0b24nPlNhdmU8L2J1dHRvbj5cIilcbiAgICAgIC8vIHJlcGxhY2VzIG1lc3NhZ2UgdGV4dCB3aXRoIGFuIGlucHV0IGZpZWxkXG4gICAgICAkKG1lc3NhZ2VIMSkucmVwbGFjZVdpdGgoYDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkID0gXCJlZGl0RmllbGRcIiB2YWx1ZT1cIiR7bWVzc2FnZVRleHR9XCI+YClcbiAgICAgIC8vIHN0b3JlcyB0aGUgbmV3IGlucHV0IGZpZWxkIGluIGEgdmFyYWJsZVxuICAgICAgY29uc3QgbmV3SW5wdXRGaWVsZCA9ICQoXCIjZWRpdEZpZWxkXCIpO1xuICAgICAgLy8gc2V0cyBhIGNsaWNrIGV2ZW50IG9uIHRoZSBuZXcgc2F2ZSBidXR0b25cbiAgICAgIG5ld0lucHV0RmllbGQubmV4dCgpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIHN0b3JlcyBpbnB1dCB2YWx1ZSBpbiBhbiBvYmplY3QgdXBvbiBzYXZlIGNsaWNrXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VUZXh0T2JqID0ge1xuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiBuZXdJbnB1dEZpZWxkLnZhbCgpLFxuICAgICAgICB9XG4gICAgICAgIC8vIHNhdmUgbWVzc2FnZSBpZCAjXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VJZCA9IG5ld0lucHV0RmllbGQucGFyZW50KCkuYXR0cihcImlkXCIpXG4gICAgICAgIC8vIFBhdGNoIG1lc3NhZ2UgaW4gc2VydmVyIGFuZCByZWZyZXNoIHRoZSBtZXNzYWdlcyBvbiB0aGUgcGFnZVxuICAgICAgICBBUEkudXBkYXRlSXRlbShcIm1lc3NhZ2VzXCIsIGVkaXRlZE1lc3NhZ2VJZCwgZWRpdGVkTWVzc2FnZVRleHRPYmopXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRNZXNzYWdlcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuXG5cblxuY29uc3QgYnVpbGRNaXNzaW9uQ29udHJvbCA9IHtcbiAgcHJpbnRQbGFjZWhvbGRlciAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IG51bGw7XG4gICAgY29uc3QgdXNlciA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpKTtcbiAgICBjb25zb2xlLmxvZyh1c2VyKTtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm1lc3NhZ2VcIiwgaWQ6IGAke3VzZXIuaWR9YH0sXG4gICAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7dXNlci5wcm9maWxlUGljfWAsIGFsdDogXCJQcm9maWxlIFBpY1wiLCBzdHlsZTpcImRpc3BsYXk6aW5saW5lLWJsb2NrOyBib3JkZXItcmFkaXVzOiA4cHg7IG1hcmdpbjogNHB4XCIsIGhlaWdodDogXCIxMjVcIiwgd2lkdGg6IFwiMTI1XCJ9KSxcbiAgICBuZXcgY29tcC50aXRsZSggXCJoMlwiLCB7c3R5bGU6XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgYm90dG9tOiAxMHB4XCJ9LCBgJHt1c2VyLmZpcnN0TmFtZX0gLSAke3VzZXIubGFzdE5hbWV9ICR7dXNlci51c2VybmFtZX1gKSxcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRNaXNzaW9uQ29udHJvbDsiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBsb2dJbkZ1bmNzIGZyb20gXCIuL2xvZ2luXCJcbmltcG9ydCBidWlsZE1lc3NhZ2VzIGZyb20gXCIuL21lc3NhZ2VzXCI7XG5pbXBvcnQgYnVpbGROZXdzIGZyb20gXCIuL25ld3NcIjtcbmltcG9ydCBidWlsZE1pc3Npb25Db250cm9sIGZyb20gXCIuL21pc3Npb25Db250cm9sXCI7XG5pbXBvcnQgYnVpbGRUYXNrcyBmcm9tIFwiLi90YXNrc1wiXG5cblxuY29uc3QgbmF2QmFyID0ge1xuICBsb2FkTmF2QmFyKCkge1xuICAgIG5ldyBjb21wLnVsKFxuICAgICAge30sXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJIb21lXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiVGFza3NcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJFdmVudHNcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJNZXNzYWdlc1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIk5ld3NcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJGcmllbmRzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiTG9nIE91dFwiKVxuICAgICkucmVuZGVyKFwiI25hdkJhclwiKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYXZCYXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJIb21lXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1aWxkTWlzc2lvbkNvbnRyb2wucHJpbnRQbGFjZWhvbGRlcigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIlRhc2tzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1aWxkVGFza3MuYnVpbGRDb250YWluZXJzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiRXZlbnRzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkV2ZW50cyBmdW5jdGlvbiBjYWxsZWQuXCIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTWVzc2FnZXNcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1aWxkTWVzc2FnZXMubWVzc2FnZU1hcCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIk5ld3NcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1aWxkTmV3cy5uZXdzTWFwKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiRnJpZW5kc1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGcmllbmRzIGZ1bmN0aW9uIGNhbGxlcy5cIilcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJMb2cgT3V0XCIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2cgT3V0IGZ1bmN0aW9uIGNhbGxlZC5cIik7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuYXZCYXIiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXG5cblxuY29uc3QgYnVpbGROZXdzID0ge1xuICBwcmludE5ld3MobmV3c09iaikge1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3c1wiLCBpZDogYCR7bmV3c09iai5pZH1gfSxcbiAgICBuZXcgY29tcC5hbmNob3Ioe2hyZWY6IGAke25ld3NPYmoudXJsfWAsIHRhcmdldDogXCJfYmxhbmtcIn0sICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHtuZXdzT2JqLmFydGljbGVJbWFnZX1gLCBhbHQ6IFwiQXJ0aWNsZSBJbWFnZVwiLCBoZWlnaHQ6IFwiMTIwXCIsIHdpZHRoOiBcIjEyMFwifSkpLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge30sIGAke25ld3NPYmouYXJ0aWNsZU5hbWV9YCksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoNFwiLCB7fSwgYFNhdmVkIGJ5OiAke25ld3NPYmoudXNlci5maXJzdE5hbWV9IHwgRGF0ZSBTYXZlZDogJHtuZXdzT2JqLmRhdGVTYXZlZH1gKSxcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBuZXdzT2JqLmFib3V0KSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgfSxcblxuICBuZXdzTWFwICgpICB7XG4gICAgY29uc3QgdXNlciA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpKTtcbiAgICBjb25zb2xlLmxvZyh1c2VyKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcImFydGljbGVzLz9fZXhwYW5kPXVzZXImX3NvcnQ9ZGF0ZVNhdmVkJl9vcmRlcj1kZXNjXCIpXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICB0aGlzLnByaW50TmV3cyhuZXdzKX0pKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5uZXdOZXdzKCkpXG5cbiAgfSxcblxuICBuZXdOZXdzICgpIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tbmV3c1wifSxcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7fSwgXCJTYXZlIE5ld3MgQXJ0aWNsZVwiKSxcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlTmFtZVwifSwgXCJBcnRpY2xlIE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIE5hbWVcIiwgaWQ6IFwiYXJ0aWNsZU5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZVVybFwifSwgXCJBcnRpY2xlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTGlua1wiLCBpZDogXCJhcnRpY2xlTGlua1wifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVJbWFnZVVybFwifSwgXCJBcnRpY2xlIEltYWdlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlSW1hZ2VVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIsIGlkOiBcImFydGljbGVJbWFnZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVEZXNjcmlwdGlvblwifSwgXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgRGVzY3JpcHRpb25cIiwgaWQ6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlNhdmUgTmV3IEFydGljbGVcIilcbiAgICApLFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICBsZXQgc3RvcnkgPSB7XG4gICAgICAgIGFydGljbGVOYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVOYW1lXCIpLnZhbHVlLFxuICAgICAgICB1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUxpbmtcIikudmFsdWUsXG4gICAgICAgIGFydGljbGVJbWFnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlSW1hZ2VcIikudmFsdWUsXG4gICAgICAgIGFib3V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVEZXNjcmlwdGlvblwiKS52YWx1ZSxcbiAgICAgICAgLypcbiAgICAgICAgTkVFRCBUTyBVUERBVEUgVVNFUiBJRCBUTyBTQVZFIFNFU1NJT04gQVNTSUdORUQgSURcbiAgICAgICAgKi9cbiAgICAgICAgdXNlcklkOiAyLFxuICAgICAgICBkYXRlU2F2ZWQ6IG5ldyBEYXRlKClcbiAgICAgIH1cbiAgICAgIGJ1aWxkTmV3cy5hZGROZXdzKHN0b3J5KVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkTmV3cyhzdG9yeSl7XG4gICAgQVBJLnNhdmVJdGVtKFwiYXJ0aWNsZXNcIiwgc3RvcnkpLnRoZW4oKCk9PiB0aGlzLm5ld3NNYXAoKSlcbiAgfVxuXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTmV3cyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIjtcbmltcG9ydCBsb2dJbkZ1bmNzIGZyb20gXCIuL2xvZ2luXCI7XG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIjtcbmltcG9ydCBidWlsZE1pc3Npb25Db250cm9sIGZyb20gXCIuL21pc3Npb25Db250cm9sXCI7XG5cbmNvbnN0IHJlZ2lzdGVyRnVuY3MgPSB7XG5cbiAgbG9hZFJlZ2lzdGVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkZpcnN0IE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwiZmlyc3ROYW1lXCIsIGlkOiBcImZpcnN0TmFtZVwiLCBwbGFjZWhvbGRlcjogXCJGaXJzdCBOYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJMYXN0IE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwibGFzdE5hbWVcIiwgaWQ6IFwibGFzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiTGFzdCBOYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJFbWFpbFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJlbWFpbFwiLCBpZDogXCJlbWFpbFwiLCBuYW1lOiBcImVtYWlsXCIsIHBsYWNlaG9sZGVyOiBcImVtYWlsXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJVc2VybmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJ1c2VybmFtZVwiLCBpZDogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwicGFzc3dvcmRcIiB9LCBcIlBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInBhc3N3b3JkXCIsIGlkOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJjb25maXJtUGFzc3dvcmRcIiB9LCBcIkNvbmZpcm0gUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwiY29uZmlybVBhc3N3b3JkXCIsIGlkOiBcImNvbmZpcm1QYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJDb25maXJtIFBhc3N3b3JkXCIgfSksXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlciBBY2NvdW50XCIpLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiQWxyZWFkeSBhIHVzZXI/IExvZyBpbiBub3dcIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIlJlZ2lzdGVyIEFjY291bnRcIikge1xuICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpcnN0TmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhc3ROYW1lXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVBhc3N3b3JkXCIpLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNoZWNrIHRvIGVuc3VyZSBhbGwgZmllbGRzIGFyZSBjb21wbGV0ZS5cbiAgICAgICAgICAgIGFsZXJ0KFwiQWxsIGZpZWxkcyBtdXN0IGJlIGNvbXBsZXRlIHRvIGNyZWF0ZSBhbiBhY2NvdW50LlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKS52YWx1ZS5pbmRleE9mKFwiQFwiKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyBhIGNoZWNrIG9uIHRoZSBlbWFpbCBmaWVsZCB0byBtYWtlIHN1cmUgdGhlcmUgaXMgYW4gQCBwcmVzZW50XG4gICAgICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCIpXG4gICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlID09PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1QYXNzd29yZFwiKS52YWx1ZSkge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBjaGVjayB0byBtYWtlIHN1cmUgcGFzc3dvcmRzIGFyZSB0aGUgc2FtZS5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgbGV0IHRlbXBVc2VyID0ge1xuICAgICAgICAgICAgICBmaXJzdE5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlyc3ROYW1lXCIpLnZhbHVlLFxuICAgICAgICAgICAgICBsYXN0TmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0TmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgZW1haWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUsXG4gICAgICAgICAgICAgIHVzZXJuYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJuYW1lXCIpLnZhbHVlLFxuICAgICAgICAgICAgICBwYXNzd29yZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgLy9UaGlzIGlzIGEgcGxhY2Vob2xkZXIgdG8gYSBzdG9jayBcIm5vIGltYWdlIGF2YWlsYWJsZVwiIGltYWdlIHRoYXQgd2UgY2FuIHVzZSBsYXRlciBmb3IgYWN0dWFsIHVzZXIgaW1hZ2VzXG4gICAgICAgICAgICAgIHByb2ZpbGVQaWM6IFwiaHR0cHM6Ly9oeWhhLnh5ei93cC1jb250ZW50L3RoZW1lcy9mYXNoaW9uL2ltYWdlcy9ub19pbWFnZV9hdmFpbGFibGUuanBnXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP2VtYWlsPSR7dGVtcFVzZXIuZW1haWx9YCkudGhlbih0aGlzRGF0YSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzRGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUmVnaXN0ZXIodGVtcFVzZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVGhpcyBlbWFpbCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQuXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHsgYWxlcnQoXCJZb3VyIHBhc3N3b3JkcyBkaWQgbm90IG1hdGNoLiBQbGVhc2UgdHJ5IGFnYWluLlwiKSB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgY2hlY2tSZWdpc3Rlcih1c2VyKSB7XG4gICAgQVBJLmdldEFsbENhdGVnb3J5KGB1c2Vycy8/dXNlcm5hbWU9JHt1c2VyLnVzZXJuYW1lfWApLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgQVBJLnNhdmVJdGVtKFwidXNlcnNcIiwgdXNlcikudGhlbihuZXdVc2VyID0+IHtcbiAgICAgICAgICBsZXQgY3VycmVudFVzZXIgPSBuZXcgY29tcC51c2VyKG5ld1VzZXIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlcm5hbWUgY2hlY2tSZWdpc3RlcjogXCIsIGN1cnJlbnRVc2VyKVxuICAgICAgICAgIC8vVE9ETzp0aGUgZnVuY3Rpb24gYmVsb3cgbmVlZHMgdG8gYmUgdGhlIGNhbGwgdG8gbG9hZCBtaXNzaW9uIGNvbnRyb2wgcGFnZS5cbiAgICAgICAgICAvLyBSaWdodCBub3cgaXQgaXMganVzdCBzZW5kaW5nIHRvIGEgZnVuY3Rpb24gdG8gY29uc29sZS5sb2cgdXNlclxuICAgICAgICAgIHRoaXMubG9hZE1pc3Npb24oY3VycmVudFVzZXIpO1xuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBhbGVydChgVXNlcm5hbWUsICR7ZGF0YVswXS51c2VybmFtZX0sIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4gUGxlYXNlIGNob29zZSBhbm90aGVyLmApXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICAvL1RPRE86IHRoaXMgZnVuY3Rpb24gY2FuIGdvIGF3YXkgd2hlbiB0aGUgZnVuY3Rpb24gdG8gbG9hZCBtaXNzaW9uIHBhZ2UgaXMgcmVwbGFjZWQgaW4gY2hlY2tSZWdpc3RlciBmdW5jdGlvbiBhYm92ZVxuICBsb2FkTWlzc2lvbih1c2VyKSB7XG4gICAgY29uc29sZS5sb2codXNlcilcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICAgIGJ1aWxkTWlzc2lvbkNvbnRyb2wucHJpbnRQbGFjZWhvbGRlcigpO1xuICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyRnVuY3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXG5cbmxldCBjdXJyZW50VXNlciA9IHt9XG5cblxuY29uc3QgYnVpbGRUYXNrcyA9IHtcblxuICAvL2Z1bmN0aW9uIHJ1biBmaXJzdCBpbiBvcmRlciB0byBjbGVhciBIVE1MLCBjcmVhdGUgcGFyZW50IGNvbnRhaW5lcnMsIHRoZW4gYWRkIG5ldyB0YXNrIGlucHV0IGFuZCBjYWxsIGZldGNoXG4gIGJ1aWxkQ29udGFpbmVycyAoKSB7XG4gICAgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSk7XG4gICAgY29uc29sZS5sb2coY3VycmVudFVzZXIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0taW5jb21wbGV0ZVwifSwgXCJJbmNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgbmV3IGNvbXAuZGl2ICh7aWQ6IFwiaW5jb21wbGV0ZVwifSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7Y2xhc3NOYW1lOiBcInRpdGxlLS1jb21wbGV0ZVwifSwgXCJDb21wbGV0ZSBUYXNrc1wiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIG5ldyBjb21wLmRpdiAoe2lkOiBcImNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIHRoaXMubmV3VGFzaygpXG4gICAgdGhpcy50YXNrc0ZldGNoKClcbiAgfSxcblxuICAvL3VzZWQgdG8gY3JlYXRlIGFuZCBhcHBlbmQgYWxsIHRhc2tzIGZyb20gZGF0YWJhc2UgdG8gRE9NXG4gIHByaW50VGFza3MgKHRhc2tzT2JqKSB7XG4gICAgbGV0IG91dHB1dENvbnRhaW5lcjtcblxuICAgIGlmICh0YXNrc09iai5jb21wbGV0ZSkge1xuICAgICAgb3V0cHV0Q29udGFpbmVyID0gXCIjY29tcGxldGVcIlxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNpbmNvbXBsZXRlXCJcbiAgICB9XG5cbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcInRhc2tcIiwgaWQ6IGAke3Rhc2tzT2JqLmlkfWB9LFxuICAgIG5ldyBjb21wLmNoZWNrYm94KCksXG4gICAgbmV3IGNvbXAucGFyKHtjbGFzc05hbWU6IFwiZWRpdGFibGUtLXRhc2tcIn0sIHRhc2tzT2JqLnRhc2spLFxuICAgIG5ldyBjb21wLnBhcih7Y2xhc3NOYW1lOiBcImVkaXRhYmxlLS1kYXRlXCJ9LCB0YXNrc09iai5kdWVEYXRlKSkucmVuZGVyKG91dHB1dENvbnRhaW5lcilcbiAgfSxcblxuICAvL2ZldGNoIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlLCBjYWxsIGNyZWF0ZS9hcHBlbmQgYW5kIGNhbGwgYWRkIGxpc3RlbmVyc1xuICB0YXNrc0ZldGNoICgpICB7XG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwidGFza3NcIikgLy9jaGVjayBpZiB1c2VyIGlzIHNhbWUgYXMgc2Vzc2lvbiBzdG9yYWdlXG4gICAgLnRoZW4odGFza3NPYmogPT4gIHtcbiAgICAgIHRhc2tzT2JqLmZvckVhY2godGFzayA9PiB7XG4gICAgICB0aGlzLnByaW50VGFza3ModGFzayl9KVxuICAgICAgdGhpcy5jYkxpc3RlbmVyKClcbiAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxuICAgIH0pXG4gIH0sXG5cbiAgLy9jaGVja2JveCBsaXN0ZW5lciB3aWxsIG1vdmUgdGFza3MgYmV0d2VlbiBjb21wbGV0ZSBhbmQgaW5jb21wbGV0ZSBjb250YWluZXJzXG4gIC8vZGF0YWJhc2UgXCJjb21wbGV0ZVwiIHByb3BlcnR5IHdpbGwgYmUgcGF0Y2hlZCBhY2NvcmRpbmdseSBhbmQgRE9NIHVwZGF0ZWRcbiAgY2JMaXN0ZW5lciAoKSB7XG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKVxuXG4gICAgLy9pZiB0aGUgaWQgb2YgdGhlIGdyYW5kcGFyZW50IGNvbnRhaW5lciBpcyAjY29tcGxldGUsIHRoZW4gY2hlY2sgdGhlIGJveFxuICAgIGNoZWNrYm94ZXMuZm9yRWFjaCggKGNoZWNrYm94KSA9PiB7XG4gICAgICBpZiAoY2hlY2tib3gucGFyZW50Tm9kZS5wYXJlbnROb2RlLmlkID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgbGV0IHBhdGNoUHJvcGVydHk7XG4gICAgICAgIC8vaWYgZmFsc2UgLT4gdHJ1ZVxuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIHBhdGNoUHJvcGVydHkgPSB7Y29tcGxldGU6IHRydWV9XG4gICAgICAgICAgLy9wYXRjaCBcImNvbXBsZXRlXCIgcHJvcGVydHkgb2YgZGF0YWJhc2Ugb2JqZWN0IHVzaW5nIHBhcmVudE5vZGUgKHNlY3Rpb24pIElEIHRvIFRSVUVcbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy9pZiBjaGVja2JveCBpcyB1bmNoZWNrZWQuLi5cbiAgICAgICAgICBwYXRjaFByb3BlcnR5ID0ge2NvbXBsZXRlOiBmYWxzZX1cbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9LFxuXG4gIC8vZnVuY3Rpb24gdXNlZCB0byBlZGl0IHRhc2tzIGluIERPTSBhbmQgcGF0Y2ggbmV3IGluZm8gdG8gZGF0YWJhc2UgdGFzayBkZXNjcmlwdGlvbiBhbmQgZGF0ZVxuICBwYXJMaXN0ZW5lciAoKSB7XG4gICAgLy9nZXQgYWxsIHNlY3Rpb25zIG9uIHBhZ2VcbiAgICBsZXQgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VjdGlvblwiKVxuXG4gICAgLy8vYWRkIGNsaWNrIGxpc3RlbmVyIHRvIGFsbCBzZWN0aW9uc1xuICAgIHNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XG4gICAgICBzZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAvL2dldCBpZCBvZiB0YXJnZXQgc2VjdGlvblxuICAgICAgICBjb25zdCBpZCA9IGUudGFyZ2V0LnBhcmVudE5vZGUuaWRcblxuICAgICAgICAvL2lmIHBhcmFncmFwaCBjbGlja2VkIGlzIHRhc2sgZGVzY3JpcHRpb24sIGdldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgLy9jcmVhdGUgbmV3IDxpbnB1dD4gdGVtcGxhdGUgKHdpdGggIElEISkgYW5kIHJlcGxhY2UgPHA+IHdpdGggPGlucHV0PlxuICAgICAgICAvL2FkZCBhIGtleWRvd24gbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkZXNjcmlwdGlvbiB0byBkYXRhYmFzZSB3aGVuIEVOVEVSIGlzIHByZXNzZWRcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRhYmxlLS10YXNrXCIpKSB7XG4gICAgICAgICAgY29uc3QgdGFza05hbWUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxuICAgICAgICAgIGxldCB0ZW1wVGFza0lucHV0ID0gYDxpbnB1dCBpZD1cInRlbXAxXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGFza05hbWV9XCI+YFxuICAgICAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKHRlbXBUYXNrSW5wdXQpXG4gICAgICAgICAgY29uc3QgdGVtcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMVwiKTtcbiAgICAgICAgICAgIHRlbXBJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoVGFzayA9IHt0YXNrOiB0ZW1wSW5wdXQudmFsdWV9XG4gICAgICAgICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBpZCwgcGF0Y2hUYXNrKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgLy9pZiBwYXJhZ3JhcGggY2xpY2tlZCBpcyB0YXNrIGR1ZSBkYXRlLCBnZXQgdGV4dCBjb250ZW50XG4gICAgICAgIC8vY3JlYXRlIG5ldyA8aW5wdXQ+IHRlbXBsYXRlICh3aXRoICBJRCEpIGFuZCByZXBsYWNlIDxwPiB3aXRoIDxpbnB1dD5cbiAgICAgICAgLy9hZGQgYSBjaGFuZ2UgbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkdWUgZGF0ZSB0byBkYXRhYmFzZSB3aGVuIG5ldyBkYXRlIGlzIHNlbGVjdGVkXG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGFibGUtLWRhdGVcIikpIHtcbiAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgbGV0IHRlbXBUYXNrRGF0ZSA9IGA8aW5wdXQgaWQ9XCJ0ZW1wMlwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke3Rhc2tEYXRlfVwiPmBcbiAgICAgICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aCh0ZW1wVGFza0RhdGUpXG4gICAgICAgICAgICBjb25zdCB0ZW1wRGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMlwiKTtcbiAgICAgICAgICAgIHRlbXBEYXRlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoRGF0ZSA9IHtkdWVEYXRlOiB0ZW1wRGF0ZUlucHV0LnZhbHVlfVxuICAgICAgICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgaWQsIHBhdGNoRGF0ZSlcbiAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgfSxcblxuICAvL2NyZWF0ZXMgbmV3IHRhc2sgaW5wdXQgZmllbGQgd2l0aCBhcHBlbmQgYnV0dG9uIGluc2lkZSBmaXJzdCBzZWN0aW9uIG9mIElOQ09NUExFVEUgY29udGFpbmVyXG4gIG5ld1Rhc2sgKCkge1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS10YXNrXCJ9LFxuICAgIG5ldyBjb21wLmJ0biAoXCIrXCIpLFxuICAgIG5ldyBjb21wLmlucHV0KHtpZDogXCJpbnB1dC0tdGFza1wiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwidHlwZSBuZXcgdGFzayBoZXJlXCJ9KSxcbiAgICBuZXcgY29tcC5pbnB1dCh7aWQ6IFwiaW5wdXQtLWRhdGVcIiwgdHlwZTogXCJkYXRlXCJ9KSkucmVuZGVyKFwiI2luY29tcGxldGVcIilcblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIilcbiAgICBjb25zdCBpbnB1dF90YXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC0tdGFza1wiKVxuICAgIGNvbnN0IGlucHV0X2RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LS1kYXRlXCIpXG5cbiAgICAvL2J1dHRvbiBjbGljayBwb3N0cyBuZXcgdGFzayB0byBkYXRhYmFzZSBhbmQgcmVzZXRzIG5ldyB0YXNrIGlucHV0IHN0cmluZ3NcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoaW5wdXRfdGFzay52YWx1ZSA9PT0gXCJcIiB8fCBpbnB1dF9kYXRlLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRhc2tJdGVtID0ge1xuICAgICAgICAgIHRhc2s6IGlucHV0X3Rhc2sudmFsdWUsXG4gICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgIGR1ZURhdGU6IGlucHV0X2RhdGUudmFsdWUsXG4gICAgICAgICAgLypcbiAgICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxuICAgICAgICAgICovXG4gICAgICAgICAgdXNlcklkOiAzLFxuICAgICAgICB9XG4gICAgICAgIEFQSS5zYXZlSXRlbShcInRhc2tzXCIsIHRhc2tJdGVtKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMucHJpbnRUYXNrcyhkYXRhKVxuICAgICAgICAgIHRoaXMuY2JMaXN0ZW5lcigpXG4gICAgICAgICAgdGhpcy5wYXJMaXN0ZW5lcigpXG4gICAgICAgIH0pXG4gICAgICAgIGlucHV0X3Rhc2sudmFsdWUgPSBcIlwiXG4gICAgICAgIGlucHV0X2RhdGUudmFsdWUgPSBcIlwiXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBidWlsZFRhc2tzIl19
=======
},{"./apiData":2,"./components":3,"./sessionStorage":13}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzLmpzIiwiLi4vc2NyaXB0cy9sYW5kaW5nLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMuanMiLCIuLi9zY3JpcHRzL21pc3Npb25Db250cm9sLmpzIiwiLi4vc2NyaXB0cy9uYXYuanMiLCIuLi9zY3JpcHRzL25ld3MuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9zZXNzaW9uU3RvcmFnZS5qcyIsIi4uL3NjcmlwdHMvdGFza3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLEtBQUssSUFBSTtBQUN0QjtBQUNBLFlBQUksS0FBSyxDQUFDLE9BQU4sWUFBeUIsTUFBTSxDQUFDLE9BQXBDLEVBQTZDO0FBQ3pDLGVBQUssYUFBTCxFQUFvQixXQUFwQixDQUFnQyxLQUFLLENBQUMsT0FBdEMsRUFEeUMsQ0FHekM7QUFDSCxTQUpELE1BSU8sSUFBSSxLQUFLLENBQUMsT0FBTixDQUFjLEtBQUssQ0FBQyxPQUFwQixDQUFKLEVBQWtDO0FBQ3JDLFVBQUEsS0FBSyxDQUFDLE9BQU4sQ0FBYyxPQUFkLENBQXNCLENBQUMsSUFBSSxLQUFLLGFBQUwsRUFBb0IsV0FBcEIsQ0FBZ0MsQ0FBaEMsQ0FBM0IsRUFEcUMsQ0FHckM7QUFDSCxTQUpNLE1BSUE7QUFDSCxlQUFLLGFBQUwsRUFBb0IsV0FBcEIsR0FBa0MsS0FBbEM7QUFDSDtBQUNKLE9BYkQ7QUFjSDs7QUFFRCxXQUFPLElBQVA7QUFDSDs7QUFFRCxNQUFJLE9BQUosR0FBZTtBQUNYLFdBQU8sS0FBSyxhQUFMLENBQVA7QUFDSDs7QUFFRCxFQUFBLE1BQU0sQ0FBQyxTQUFELEVBQVk7QUFDZCxVQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsc0JBQVQsRUFBakI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLEtBQUssYUFBTCxDQUFyQjtBQUNBLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0MsV0FBbEMsQ0FBOEMsUUFBOUM7QUFDSDs7QUEzQ2M7O0FBOENuQixNQUFNLENBQUMsT0FBUCxHQUFpQixZQUFqQjs7Ozs7Ozs7O0FDbERBLE1BQU0sR0FBRyxHQUFHLHdCQUFaO0FBRUEsTUFBTSxHQUFHLEdBQUc7QUFDVixFQUFBLGNBQWMsQ0FBQyxRQUFELEVBQVc7QUFDdkIsV0FBTyxLQUFLLENBQUUsR0FBRSxHQUFJLEdBQUUsUUFBUyxFQUFuQixDQUFMLENBQ0osSUFESSxDQUNDLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBUixFQURaLENBQVA7QUFFRCxHQUpTOztBQU1WLEVBQUEsa0JBQWtCLENBQUMsUUFBRCxFQUFXLEVBQVgsRUFBZTtBQUMvQixXQUFPLEtBQUssQ0FBRSxHQUFFLEdBQUksR0FBRSxRQUFTLElBQUcsRUFBRyxFQUF6QixDQUFMLENBQ0osSUFESSxDQUNDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBUCxFQURYLENBQVA7QUFFRCxHQVRTOztBQVdWLEVBQUEsUUFBUSxDQUFDLFFBQUQsRUFBVyxJQUFYLEVBQWlCO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLEdBQUUsR0FBSSxHQUFFLFFBQVMsRUFBbkIsRUFBc0I7QUFDaEMsTUFBQSxNQUFNLEVBQUUsTUFEd0I7QUFFaEMsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVCxPQUZ1QjtBQUtoQyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLElBQWY7QUFMMEIsS0FBdEIsQ0FBTCxDQU9MLElBUEssQ0FPQSxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFQWixDQUFQO0FBUUQsR0FwQlM7O0FBc0JWLEVBQUEsVUFBVSxDQUFDLFFBQUQsRUFBVyxFQUFYLEVBQWU7QUFDdkIsV0FBTyxLQUFLLENBQUUsR0FBRSxHQUFJLEdBQUUsUUFBUyxPQUFNLEVBQUcsRUFBNUIsRUFBK0I7QUFDekMsTUFBQSxNQUFNLEVBQUUsUUFEaUM7QUFFekMsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVDtBQUZnQyxLQUEvQixDQUFaO0FBTUQsR0E3QlM7O0FBK0JWLEVBQUEsVUFBVSxDQUFDLFFBQUQsRUFBVyxFQUFYLEVBQWUsSUFBZixFQUFvQjtBQUM1QixXQUFPLEtBQUssQ0FBRSxHQUFFLEdBQUksR0FBRSxRQUFTLElBQUcsRUFBRyxFQUF6QixFQUE0QjtBQUN0QyxNQUFBLE1BQU0sRUFBRSxPQUQ4QjtBQUV0QyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRjZCO0FBS3RDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZjtBQUxnQyxLQUE1QixDQUFaO0FBU0Q7O0FBekNTLENBQVo7ZUE0Q2UsRzs7Ozs7Ozs7Ozs7QUM5Q2Y7Ozs7ZUFFZSxNQUFNLENBQUMsTUFBUCxDQUFjLElBQWQsRUFBb0I7QUFFakMsRUFBQSxJQUFJLEVBQUU7QUFDSixJQUFBLEtBQUssRUFBRSxNQUFNLElBQU4sQ0FBVztBQUNoQixNQUFBLFdBQVcsQ0FBQyxRQUFELEVBQVc7QUFDcEIsYUFBSyxFQUFMLEdBQVUsUUFBUSxDQUFDLEVBQW5CO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLFFBQVEsQ0FBQyxTQUExQjtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFRLENBQUMsUUFBekI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBUSxDQUFDLFFBQXpCO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLFFBQVEsQ0FBQyxRQUF6QjtBQUNBLGFBQUssS0FBTCxHQUFhLFFBQVEsQ0FBQyxLQUF0QjtBQUNBLGFBQUssVUFBTCxHQUFrQixRQUFRLENBQUMsVUFBM0I7QUFDSCxPQVRpQixDQVVsQjtBQUNBOzs7QUFDRSxNQUFBLElBQUksR0FBRztBQUNMLGVBQVEsV0FBVSxLQUFLLFNBQVUsOEJBQWpDO0FBQ0Q7O0FBZGU7QUFEZCxHQUYyQjtBQXFCakMsRUFBQSxHQUFHLEVBQUU7QUFDSCxJQUFBLEtBQUssRUFBRSxNQUFNLEdBQU4sU0FBa0Isd0JBQWxCLENBQStCO0FBQ3BDLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sS0FBTixFQUFhLFVBQWIsRUFBeUIsR0FBRyxRQUE1QjtBQUNEOztBQUhtQztBQURuQyxHQXJCNEI7QUE0QmpDLEVBQUEsR0FBRyxFQUFFO0FBQ0gsSUFBQSxLQUFLLEVBQUUsTUFBTSxHQUFOLFNBQWtCLHdCQUFsQixDQUErQjtBQUNwQyxNQUFBLFdBQVcsQ0FBQyxHQUFHLFFBQUosRUFBYztBQUN2QixjQUFNLFFBQU4sRUFBZ0I7QUFBRSxVQUFBLFNBQVMsRUFBRSxLQUFiO0FBQW9CLFVBQUEsSUFBSSxFQUFFO0FBQTFCLFNBQWhCLEVBQXNELEdBQUcsUUFBekQ7QUFDRDs7QUFIbUM7QUFEbkMsR0E1QjRCO0FBbUNqQyxFQUFBLEtBQUssRUFBRTtBQUNMLElBQUEsS0FBSyxFQUFFLE1BQU0sS0FBTixTQUFvQix3QkFBcEIsQ0FBaUM7QUFDdEMsTUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhLEdBQUcsUUFBaEIsRUFBMEI7QUFDbkMsY0FBTSxPQUFOLEVBQWUsVUFBZixFQUEyQixHQUFHLFFBQTlCO0FBQ0Q7O0FBSHFDO0FBRG5DLEdBbkMwQjtBQTBDakMsRUFBQSxPQUFPLEVBQUU7QUFDUCxJQUFBLEtBQUssRUFBRSxNQUFNLE9BQU4sU0FBc0Isd0JBQXRCLENBQW1DO0FBQ3hDLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sU0FBTixFQUFpQixVQUFqQixFQUE2QixHQUFHLFFBQWhDO0FBQ0Q7O0FBSHVDO0FBRG5DLEdBMUN3QjtBQWlEakMsRUFBQSxLQUFLLEVBQUU7QUFBRTtBQUNQLElBQUEsS0FBSyxFQUFFLE1BQU0sS0FBTixTQUFvQix3QkFBcEIsQ0FBaUM7QUFDdEMsTUFBQSxXQUFXLENBQUMsTUFBRCxFQUFTLFVBQVQsRUFBcUIsR0FBRyxRQUF4QixFQUFrQztBQUMzQyxjQUFNLE1BQU4sRUFBYyxVQUFkLEVBQTBCLEdBQUcsUUFBN0I7QUFDRDs7QUFIcUM7QUFEbkMsR0FqRDBCO0FBd0RqQyxFQUFBLE1BQU0sRUFBRTtBQUNOLElBQUEsS0FBSyxFQUFFLE1BQU0sTUFBTixTQUFxQix3QkFBckIsQ0FBa0M7QUFDdkMsTUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhLEdBQUcsUUFBaEIsRUFBMEI7QUFDbkMsY0FBTSxHQUFOLEVBQVcsVUFBWCxFQUF1QixHQUFHLFFBQTFCO0FBQ0Q7O0FBSHNDO0FBRG5DLEdBeER5QjtBQStEakMsRUFBQSxRQUFRLEVBQUU7QUFDUixJQUFBLEtBQUssRUFBRSxNQUFNLFFBQU4sU0FBdUIsd0JBQXZCLENBQW9DO0FBQ3pDLE1BQUEsV0FBVyxDQUFDLEdBQUcsUUFBSixFQUFjO0FBQ3ZCLGNBQU0sT0FBTixFQUFlO0FBQUUsVUFBQSxJQUFJLEVBQUUsVUFBUjtBQUFvQixVQUFBLFNBQVMsRUFBRTtBQUEvQixTQUFmLEVBQXNELEdBQUcsUUFBekQ7QUFDRDs7QUFId0M7QUFEbkMsR0EvRHVCO0FBc0VqQyxFQUFBLEtBQUssRUFBRTtBQUNMLElBQUEsS0FBSyxFQUFFLE1BQU0sS0FBTixTQUFvQix3QkFBcEIsQ0FBaUM7QUFDdEMsTUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhLEdBQUcsUUFBaEIsRUFBMEI7QUFDbkMsY0FBTSxLQUFOLEVBQWEsVUFBYixFQUF5QixHQUFHLFFBQTVCO0FBQ0Q7O0FBSHFDO0FBRG5DLEdBdEUwQjtBQTZFakMsRUFBQSxFQUFFLEVBQUU7QUFDRixJQUFBLEtBQUssRUFBRSxNQUFNLEVBQU4sU0FBaUIsd0JBQWpCLENBQThCO0FBQ25DLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sSUFBTixFQUFZLFVBQVosRUFBd0IsR0FBRyxRQUEzQjtBQUNEOztBQUhrQztBQURuQyxHQTdFNkI7QUFvRmpDLEVBQUEsRUFBRSxFQUFFO0FBQ0YsSUFBQSxLQUFLLEVBQUUsTUFBTSxFQUFOLFNBQWlCLHdCQUFqQixDQUE4QjtBQUNuQyxNQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWEsR0FBRyxRQUFoQixFQUEwQjtBQUNuQyxjQUFNLElBQU4sRUFBWSxVQUFaLEVBQXdCLEdBQUcsUUFBM0I7QUFDRDs7QUFIa0M7QUFEbkMsR0FwRjZCO0FBMkZqQyxFQUFBLElBQUksRUFBRTtBQUNKLElBQUEsS0FBSyxFQUFFLE1BQU0sSUFBTixTQUFtQix3QkFBbkIsQ0FBZ0M7QUFDckMsTUFBQSxXQUFXLENBQUMsR0FBRyxRQUFKLEVBQWM7QUFDdkIsY0FBTSxNQUFOLEVBQWMsRUFBZCxFQUFrQixHQUFHLFFBQXJCO0FBQ0Q7O0FBSG9DO0FBRG5DLEdBM0YyQjtBQWtHakMsRUFBQSxLQUFLLEVBQUU7QUFDTCxJQUFBLEtBQUssRUFBRSxNQUFNLEtBQU4sU0FBb0Isd0JBQXBCLENBQWlDO0FBQ3RDLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sT0FBTixFQUFlLFVBQWYsRUFBMkIsR0FBRyxRQUE5QjtBQUNEOztBQUhxQztBQURuQyxHQWxHMEI7QUF5R2pDLEVBQUEsUUFBUSxFQUFFO0FBQ1IsSUFBQSxLQUFLLEVBQUUsTUFBTSxRQUFOLFNBQXVCLHdCQUF2QixDQUFvQztBQUN6QyxNQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWEsR0FBRyxRQUFoQixFQUEwQjtBQUNuQyxjQUFNLFVBQU4sRUFBa0IsVUFBbEIsRUFBOEIsR0FBRyxRQUFqQztBQUNEOztBQUh3QztBQURuQyxHQXpHdUI7QUFnSGpDLEVBQUEsR0FBRyxFQUFFO0FBQ0gsSUFBQSxLQUFLLEVBQUUsTUFBTSxHQUFOLFNBQWtCLHdCQUFsQixDQUErQjtBQUNwQyxNQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWEsR0FBRyxRQUFoQixFQUEwQjtBQUNuQyxjQUFNLEdBQU4sRUFBVyxVQUFYLEVBQXVCLEdBQUcsUUFBMUI7QUFDRDs7QUFIbUM7QUFEbkM7QUFoSDRCLENBQXBCLEM7Ozs7Ozs7Ozs7OztBQ0ZmOztBQUNBOztBQUNBOzs7O0FBR0EsTUFBTSxXQUFXLEdBQUc7QUFFbEIsRUFBQSxlQUFlLEdBQUc7QUFDaEI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxTQUE1QyxHQUF3RCxFQUF4RCxDQUZnQixDQUdoQjs7QUFDQSxVQUFNLE1BQU0sR0FBRyxJQUFJLG9CQUFLLEdBQVQsQ0FBYTtBQUFFLE1BQUEsRUFBRSxFQUFFO0FBQU4sS0FBYixFQUNiLElBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUIsWUFBckIsQ0FEYSxFQUViLElBQUksb0JBQUssR0FBVCxDQUFhLEdBQWIsQ0FGYSxFQUVNLE1BRk4sQ0FFYSxtQkFGYixDQUFmLENBSmdCLENBUWhCOztBQUNBLFFBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUI7QUFDbkIsTUFBQSxTQUFTLEVBQUU7QUFEUSxLQUFyQixFQUVHLGdCQUZILEVBRXFCLE1BRnJCLENBRTRCLG1CQUY1QjtBQUdBLFFBQUksb0JBQUssR0FBVCxDQUFhO0FBQ1gsTUFBQSxFQUFFLEVBQUU7QUFETyxLQUFiLEVBRUcsTUFGSCxDQUVVLG1CQUZWO0FBR0EsUUFBSSxvQkFBSyxLQUFULENBQWUsSUFBZixFQUFxQjtBQUNuQixNQUFBLFNBQVMsRUFBRTtBQURRLEtBQXJCLEVBRUcsWUFGSCxFQUVpQixNQUZqQixDQUV3QixtQkFGeEI7QUFHQSxRQUFJLG9CQUFLLEdBQVQsQ0FBYTtBQUNYLE1BQUEsRUFBRSxFQUFFO0FBRE8sS0FBYixFQUVHLE1BRkgsQ0FFVSxtQkFGVixFQWxCZ0IsQ0FxQmhCOztBQUNBLFNBQUssY0FBTDtBQUNBLFNBQUssVUFBTDtBQUNDLEdBMUJlOztBQTRCbEIsRUFBQSxXQUFXLENBQUMsUUFBRCxFQUFXO0FBQ3BCO0FBQ0EsUUFBSSxlQUFKLENBRm9CLENBSXBCOztBQUVBLElBQUEsZUFBZSxHQUFHLFdBQWxCO0FBQ0EsVUFBTSxJQUFJLEdBQUcsSUFBSSxvQkFBSyxPQUFULENBQWlCO0FBQzFCLE1BQUEsU0FBUyxFQUFFLE9BRGU7QUFFMUIsTUFBQSxFQUFFLEVBQUcsR0FBRSxRQUFRLENBQUMsRUFBRztBQUZPLEtBQWpCLEVBSVgsSUFBSSxvQkFBSyxLQUFULENBQWUsSUFBZixFQUFzQixHQUFFLFFBQVEsQ0FBQyxJQUFLLEVBQXRDLENBSlcsRUFLWCxJQUFJLG9CQUFLLEdBQVQsQ0FBYyxHQUFFLFFBQVEsQ0FBQyxJQUFLLElBQUcsUUFBUSxDQUFDLElBQUssRUFBL0MsQ0FMVyxFQU1YLElBQUksb0JBQUssR0FBVCxDQUFjLEdBQUUsUUFBUSxDQUFDLFFBQVMsRUFBbEMsQ0FOVyxFQU9YLElBQUksb0JBQUssR0FBVCxDQUFhLE1BQWIsQ0FQVyxFQU9XLE1BUFgsQ0FPa0IsZUFQbEIsQ0FBYjtBQVFELEdBM0NpQjs7QUE2Q2xCLEVBQUEsVUFBVSxHQUFHO0FBQ1gscUJBQUksY0FBSixDQUFvQixrQkFBaUIsd0JBQVcsSUFBWCxHQUFrQixFQUFHLEVBQTFELEVBQTZEO0FBQTdELEtBQ0csSUFESCxDQUNRLFFBQVEsSUFBSTtBQUNoQixNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLEtBQUssSUFBSTtBQUN4QixhQUFLLFdBQUwsQ0FBaUIsS0FBakI7QUFDRCxPQUZEO0FBR0EsTUFBQSxXQUFXLENBQUMsYUFBWjtBQUNELEtBTkg7QUFPRCxHQXJEaUI7O0FBdURsQixFQUFBLGNBQWMsR0FBRztBQUNmO0FBQ0EsSUFBQSxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCLEtBQWxCLENBQ0UsVUFBVSxDQUFWLEVBQWE7QUFDWCxNQUFBLENBQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCLElBQXZCLENBQTRCLEVBQTVCO0FBQ0EsTUFBQSxXQUFXLENBQUMsYUFBWjtBQUNELEtBSkg7QUFNRCxHQS9EaUI7O0FBaUVsQixFQUFBLGFBQWEsR0FBRztBQUNkO0FBQ0EsUUFBSSxJQUFJLEdBQUcsSUFBSSxvQkFBSyxHQUFULENBQWE7QUFDcEIsTUFBQSxTQUFTLEVBQUU7QUFEUyxLQUFiLEVBR1QsSUFBSSxvQkFBSyxLQUFULENBQWUsSUFBZixFQUFxQjtBQUFFLE1BQUEsU0FBUyxFQUFFO0FBQWIsS0FBckIsRUFBNEMsaUJBQTVDLENBSFMsRUFJVCxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxZQUFmLENBSlMsRUFLVCxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFO0FBQVIsS0FBZixDQUxTLEVBTVQsSUFBSSxvQkFBSyxLQUFULENBQWUsTUFBZixDQU5TLEVBT1QsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLElBQUksRUFBRTtBQUFQLEtBQWYsQ0FQUyxFQVFULElBQUksb0JBQUssS0FBVCxDQUFlLE1BQWYsQ0FSUyxFQVNULElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxJQUFJLEVBQUU7QUFBUCxLQUFmLENBVFMsRUFVVCxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxVQUFmLENBVlMsRUFXVCxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFO0FBQVIsS0FBZixDQVhTLEVBWVQsSUFBSSxvQkFBSyxHQUFULENBQWEsTUFBYixDQVpTLEVBYVQsSUFBSSxvQkFBSyxHQUFULENBQWEsTUFBYixDQWJTLENBQVg7QUFjQSxJQUFBLElBQUksQ0FBQyxNQUFMLENBQVksbUJBQVo7QUFDQSxJQUFBLFdBQVcsQ0FBQyxzQkFBWjtBQUNELEdBbkZpQjs7QUFxRmxCLEVBQUEsc0JBQXNCLEdBQUc7QUFDdkI7QUFDQSxVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsUUFBMUIsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxNQUFNO0FBQzNDO0FBQ0EsWUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLENBQW5CLENBRjJDLENBRzNDOztBQUNBLFlBQU0sV0FBVyxHQUFHO0FBQ2xCLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQURGO0FBRWxCLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUZGO0FBR2xCLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUhGO0FBSWxCLFFBQUEsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUpOO0FBS2xCLFFBQUEsTUFBTSxFQUFFLHdCQUFXLElBQVgsR0FBa0IsRUFMUixDQU9wQjs7QUFQb0IsT0FBcEI7O0FBUUEsdUJBQUksUUFBSixDQUFhLFFBQWIsRUFBdUIsV0FBdkIsRUFBb0MsSUFBcEMsQ0FBeUMsTUFBTTtBQUMvQyxRQUFBLFdBQVcsQ0FBQyxlQUFaO0FBQ0EsT0FGQTtBQUVHLEtBZEwsRUFIdUIsQ0FtQnZCOztBQUNBLElBQUEsU0FBUyxDQUFDLENBQUQsQ0FBVCxDQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLE1BQU07QUFDM0MsTUFBQSxXQUFXLENBQUMsZUFBWjtBQUNELEtBRkQ7QUFHRCxHQTVHaUI7O0FBNkdsQixFQUFBLGFBQWEsR0FBSTtBQUNmO0FBQ0EsVUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixDQUF0QjtBQUNBLElBQUEsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsVUFBVSxJQUFJO0FBQ2xDLE1BQUEsVUFBVSxDQUFDLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLE1BQU07QUFDekM7QUFDQSxjQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsYUFBWCxDQUF5QixFQUE5Qzs7QUFDQSx5QkFBSSxrQkFBSixDQUF1QixRQUF2QixFQUFpQyxZQUFqQyxFQUNHLElBREgsQ0FDUSxXQUFXLElBQUk7QUFDbkIsVUFBQSxDQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QixJQUF2QixDQUE0QixFQUE1QjtBQUNBLFVBQUEsV0FBVyxDQUFDLGFBQVosQ0FBMEIsV0FBMUIsRUFBdUMsWUFBdkM7QUFDRCxTQUpIO0FBS0QsT0FSRDtBQVNELEtBVkQ7QUFXRCxHQTNIaUI7O0FBNEhsQixFQUFBLGFBQWEsQ0FBQyxjQUFELEVBQWlCO0FBQzVCO0FBQ0E7QUFDQSxRQUFJLElBQUksR0FBRyxJQUFJLG9CQUFLLEdBQVQsQ0FBYTtBQUN0QixNQUFBLFNBQVMsRUFBRTtBQURXLEtBQWIsRUFHWCxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCO0FBQUUsTUFBQSxTQUFTLEVBQUU7QUFBYixLQUFyQixFQUE0QyxpQkFBNUMsQ0FIVyxFQUlYLElBQUksb0JBQUssS0FBVCxDQUFlLFlBQWYsQ0FKVyxFQUtYLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxJQUFJLEVBQUUsTUFBUjtBQUFnQixNQUFBLEtBQUssRUFBRyxHQUFFLGNBQWMsQ0FBQyxJQUFLO0FBQTlDLEtBQWYsQ0FMVyxFQU1YLElBQUksb0JBQUssS0FBVCxDQUFlLE1BQWYsQ0FOVyxFQU9YLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxJQUFJLEVBQUUsTUFBUDtBQUFlLE1BQUEsS0FBSyxFQUFHLEdBQUUsY0FBYyxDQUFDLElBQUs7QUFBN0MsS0FBZixDQVBXLEVBUVgsSUFBSSxvQkFBSyxLQUFULENBQWUsTUFBZixDQVJXLEVBU1gsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLElBQUksRUFBRSxNQUFQO0FBQWUsTUFBQSxLQUFLLEVBQUcsR0FBRSxjQUFjLENBQUMsSUFBSztBQUE3QyxLQUFmLENBVFcsRUFVWCxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxVQUFmLENBVlcsRUFXWCxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLE1BQVI7QUFBZ0IsTUFBQSxLQUFLLEVBQUcsR0FBRSxjQUFjLENBQUMsUUFBUztBQUFsRCxLQUFmLENBWFcsRUFZWCxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxNQUFiLENBWlcsRUFhWCxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxNQUFiLENBYlcsQ0FBWDtBQWNGLElBQUEsSUFBSSxDQUFDLE1BQUwsQ0FBWSxtQkFBWjtBQUNBLElBQUEsV0FBVyxDQUFDLHVCQUFaLENBQW9DLGNBQWMsQ0FBQyxFQUFuRDtBQUNDLEdBL0lpQjs7QUFnSmxCLEVBQUEsdUJBQXVCLENBQUMsRUFBRCxFQUFLO0FBQzFCO0FBQ0E7QUFDQSxVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsUUFBMUIsQ0FBbEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxNQUFNO0FBQzNDO0FBQ0EsWUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLENBQW5CLENBRjJDLENBRzNDOztBQUNBLFlBQU0sWUFBWSxHQUFHO0FBQ25CLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUREO0FBRW5CLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUZEO0FBR25CLFFBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUhEO0FBSW5CLFFBQUEsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxLQUpMO0FBS25CLFFBQUEsTUFBTSxFQUFFLHdCQUFXLElBQVgsR0FBa0IsRUFMUCxDQU9yQjs7QUFQcUIsT0FBckI7O0FBUUEsdUJBQUksVUFBSixDQUFlLFFBQWYsRUFBeUIsRUFBekIsRUFBNkIsWUFBN0IsRUFBMkMsSUFBM0MsQ0FBZ0QsTUFBTTtBQUN0RCxRQUFBLFdBQVcsQ0FBQyxlQUFaO0FBQ0EsT0FGQTtBQUVHLEtBZEwsRUFKMEIsQ0FvQjFCOztBQUNBLElBQUEsU0FBUyxDQUFDLENBQUQsQ0FBVCxDQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLE1BQU07QUFDM0MsTUFBQSxXQUFXLENBQUMsZUFBWjtBQUNELEtBRkQ7QUFHRDs7QUF4S2lCLENBQXBCO2VBNEtlLFc7Ozs7Ozs7Ozs7O0FDakxmOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxnQkFBZ0IsR0FBRztBQUN2QixFQUFBLGVBQWUsR0FBRztBQUNoQixRQUFJLG9CQUFLLEdBQVQsQ0FDRTtBQUFFLE1BQUEsU0FBUyxFQUFFO0FBQWIsS0FERixFQUVFLElBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUI7QUFBRSxNQUFBLFNBQVMsRUFBRTtBQUFiLEtBQXJCLEVBQTZDLDRCQUE3QyxDQUZGLEVBR0UsSUFBSSxvQkFBSyxHQUFULENBQWEsT0FBYixDQUhGLEVBSUUsSUFBSSxvQkFBSyxHQUFULENBQWEsVUFBYixDQUpGLEVBSTRCLE1BSjVCLENBSW1DLG1CQUpuQztBQUtBLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixRQUExQixDQUFkO0FBRUEsSUFBQSxPQUFPLENBQUMsT0FBUixDQUFpQixNQUFELElBQVk7QUFDMUIsTUFBQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0MsQ0FBRCxJQUFPO0FBQ3RDLFlBQUksQ0FBQyxDQUFDLE1BQUYsQ0FBUyxXQUFULEtBQXlCLE9BQTdCLEVBQXNDO0FBQ3BDLHlCQUFXLFNBQVg7QUFDRCxTQUZELE1BRU87QUFDTCw0QkFBYyxZQUFkO0FBQ0Q7QUFDRixPQU5EO0FBT0QsS0FSRDtBQVVEOztBQW5Cc0IsQ0FBekI7ZUFzQmUsZ0I7Ozs7Ozs7Ozs7O0FDMUJmOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxVQUFVLEdBQUc7QUFDakIsRUFBQSxTQUFTLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUI7QUFDNUIsUUFBSSxRQUFRLEtBQUssRUFBYixJQUFtQixRQUFRLEtBQUksRUFBbkMsRUFBdUM7QUFDckMsTUFBQSxLQUFLLENBQUMsMkRBQUQsQ0FBTDtBQUNELEtBRkQsTUFFTztBQUNMLHVCQUFJLGNBQUosQ0FBb0IsbUJBQWtCLFFBQVMsRUFBL0MsRUFBa0QsSUFBbEQsQ0FBdUQsSUFBSSxJQUFJO0FBQzdELFlBQUksSUFBSSxDQUFDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsVUFBQSxLQUFLLENBQUMsc0NBQUQsQ0FBTDtBQUNBO0FBQ0QsU0FIRCxNQUdPLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxRQUF6QixFQUFtQztBQUN4QyxjQUFJLFdBQVcsR0FBRyxJQUFJLG9CQUFLLElBQVQsQ0FBZSxJQUFJLENBQUMsQ0FBRCxDQUFuQixDQUFsQjtBQUNBLGlCQUFPLFdBQVA7QUFDRCxTQUhNLE1BR0UsS0FBSyxDQUFDLDRDQUFELENBQVA7QUFDUixPQVJELEVBUUcsSUFSSCxDQVFRLFdBQVcsSUFBSTtBQUNyQixRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWjs7QUFDQSxZQUFJLFdBQVcsS0FBSyxTQUFwQixFQUErQjtBQUM3QixVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkscUJBQVo7QUFDQSxVQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGFBQXZCLEVBQXNDLElBQUksQ0FBQyxTQUFMLENBQWUsV0FBZixDQUF0Qzs7QUFDQSxrQ0FBb0IsZ0JBQXBCO0FBQ0Q7QUFFRixPQWhCRDtBQWlCRDtBQUNGLEdBdkJnQjs7QUF3QmpCLEVBQUEsU0FBUyxHQUFHO0FBQ1YsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsR0FBd0QsRUFBeEQ7QUFDQSxRQUFJLG9CQUFLLElBQVQsQ0FDRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxFQUFmLEVBQW1CLFVBQW5CLENBREYsRUFFRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0IsTUFBQSxFQUFFLEVBQUUsVUFBeEI7QUFBb0MsTUFBQSxXQUFXLEVBQUU7QUFBakQsS0FBZixDQUZGLEVBR0UsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLEdBQUcsRUFBRTtBQUFQLEtBQWYsRUFBb0MsVUFBcEMsQ0FIRixFQUlFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxJQUFJLEVBQUUsVUFBUjtBQUFvQixNQUFBLEVBQUUsRUFBRSxVQUF4QjtBQUFvQyxNQUFBLFdBQVcsRUFBRTtBQUFqRCxLQUFmLENBSkYsRUFLRSxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxXQUFiLENBTEYsRUFNRSxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxpQ0FBYixDQU5GLEVBT0UsTUFQRixDQU9TLG1CQVBUO0FBUUEsSUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0MsT0FBcEMsQ0FBNkMsTUFBRCxJQUFZO0FBQ3RELE1BQUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWtDLENBQUQsSUFBTztBQUN0QyxZQUFJLENBQUMsQ0FBQyxNQUFGLENBQVMsV0FBVCxLQUF5QixXQUE3QixFQUEwQztBQUN4QyxlQUFLLFNBQUwsQ0FBZSxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUFuRCxFQUEwRCxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUE5RjtBQUNELFNBRkQsTUFFTztBQUNMLDRCQUFjLFlBQWQ7QUFDRDtBQUNGLE9BTkQ7QUFPRCxLQVJEO0FBU0Q7O0FBM0NnQixDQUFuQjtlQTZDZSxVOzs7Ozs7QUNsRGY7O0FBQ0E7Ozs7QUFFQSxhQUFPLFVBQVA7O0FBQ0EsaUJBQWlCLGVBQWpCOzs7Ozs7Ozs7O0FDSkE7O0FBQ0E7O0FBQ0E7Ozs7QUFHQSxNQUFNLGFBQWEsR0FBRztBQUNwQixFQUFBLGFBQWEsQ0FBQyxVQUFELEVBQWE7QUFDeEIsUUFBSSx3QkFBVyxJQUFYLEdBQWtCLEVBQWxCLEtBQXlCLFVBQVUsQ0FBQyxJQUFYLENBQWdCLEVBQTdDLEVBQWlEO0FBQy9DLFVBQUksb0JBQUssT0FBVCxDQUFpQjtBQUNiLFFBQUEsU0FBUyxFQUFFLFNBREU7QUFFYixRQUFBLEVBQUUsRUFBRyxHQUFFLFVBQVUsQ0FBQyxFQUFHO0FBRlIsT0FBakIsRUFJRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLFFBQUEsR0FBRyxFQUFHLEdBQUUsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsVUFBVyxFQUFwQztBQUF1QyxRQUFBLFNBQVMsRUFBRSxZQUFsRDtBQUFnRSxRQUFBLEdBQUcsRUFBRTtBQUFyRSxPQUFmLENBSkYsRUFLRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCO0FBQUMsUUFBQSxTQUFTLEVBQUU7QUFBWixPQUFyQixFQUFvRCxHQUFFLFVBQVUsQ0FBQyxJQUFYLENBQWdCLFNBQVUsTUFBSyxVQUFVLENBQUMsSUFBSyxJQUFHLFVBQVUsQ0FBQyxTQUFVLEVBQTdILENBTEYsRUFNRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLEVBQXJCLEVBQXlCLFVBQVUsQ0FBQyxjQUFwQyxDQU5GLEVBT0UsSUFBSSxvQkFBSyxHQUFULENBQWEsTUFBYixDQVBGLEVBT3dCLE1BUHhCLENBTytCLG1CQVAvQjtBQVFELEtBVEQsTUFTTztBQUNMLFVBQUksb0JBQUssT0FBVCxDQUFpQjtBQUNiLFFBQUEsU0FBUyxFQUFFLFNBREU7QUFFYixRQUFBLEVBQUUsRUFBRyxHQUFFLFVBQVUsQ0FBQyxFQUFHO0FBRlIsT0FBakIsRUFJRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLFFBQUEsR0FBRyxFQUFHLEdBQUUsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsVUFBVyxFQUFwQztBQUF1QyxRQUFBLEdBQUcsRUFBRSxhQUE1QztBQUEyRCxRQUFBLFNBQVMsRUFBRTtBQUF0RSxPQUFmLENBSkYsRUFLRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCO0FBQUMsUUFBQSxTQUFTLEVBQUM7QUFBWCxPQUFyQixFQUFtRCxHQUFFLFVBQVUsQ0FBQyxJQUFYLENBQWdCLFNBQVUsTUFBSyxVQUFVLENBQUMsSUFBSyxJQUFHLFVBQVUsQ0FBQyxTQUFVLEVBQTVILENBTEYsRUFNRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLEVBQXJCLEVBQXlCLFVBQVUsQ0FBQyxjQUFwQyxDQU5GLEVBTXVELE1BTnZELENBTThELG1CQU45RDtBQU9EO0FBQ0YsR0FwQm1COztBQXNCcEIsRUFBQSxVQUFVLEdBQUc7QUFDWCxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxTQUE1QyxHQUF3RCxFQUF4RDs7QUFDQSxxQkFBSSxjQUFKLENBQW1CLHdCQUFuQixFQUNHLElBREgsQ0FDUSxVQUFVLElBQUk7QUFFbEIsTUFBQSxVQUFVLENBQUMsT0FBWCxDQUFtQixPQUFPLElBQUk7QUFDNUIsYUFBSyxhQUFMLENBQW1CLE9BQW5CO0FBQ0QsT0FGRDtBQUdBLFdBQUssVUFBTDtBQUNBLFdBQUssYUFBTDtBQUNBLFdBQUssZUFBTDtBQUNELEtBVEg7QUFVRCxHQWxDbUI7O0FBbUNwQjtBQUNBLEVBQUEsVUFBVSxHQUFHO0FBQ1g7QUFDQSxRQUFJLG9CQUFLLEdBQVQsQ0FBYTtBQUNULE1BQUEsU0FBUyxFQUFFLGNBREY7QUFFVCxNQUFBLEVBQUUsRUFBRTtBQUZLLEtBQWIsRUFJRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLEVBQXJCLEVBQXlCLGFBQXpCLENBSkYsRUFLRSxJQUFJLG9CQUFLLFFBQVQsQ0FBa0I7QUFDaEIsTUFBQSxXQUFXLEVBQUUsd0JBREc7QUFFaEIsTUFBQSxJQUFJLEVBQUU7QUFGVSxLQUFsQixDQUxGLEVBU0UsSUFBSSxvQkFBSyxHQUFULENBQWEsUUFBYixDQVRGLEVBUzBCLE1BVDFCLENBU2lDLG1CQVRqQztBQVVELEdBaERtQjs7QUFtRHBCLEVBQUEsYUFBYSxHQUFHO0FBQ2QsSUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQixLQUExQixDQUFnQyxVQUFVLENBQVYsRUFBYTtBQUMzQztBQUNBLFVBQUksQ0FBQyxDQUFDLHdCQUFELENBQUQsQ0FBNEIsR0FBNUIsT0FBc0MsRUFBMUMsRUFBOEM7QUFDNUMsUUFBQSxLQUFLLENBQUMsMkJBQUQsQ0FBTDtBQUNELE9BRkQsTUFFTztBQUNMLFFBQUEsQ0FBQyxDQUFDLGNBQUYsR0FESyxDQUVMOztBQUNBLFlBQUksV0FBVyxHQUFHLElBQUksSUFBSixFQUFsQixDQUhLLENBSUw7O0FBQ0EsWUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVosR0FBdUIsS0FBdkIsQ0FBNkIsR0FBN0IsQ0FBaEIsQ0FMSyxDQU1MOztBQUNBLFlBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFaLEtBQXlCLENBQXJDLENBUEssQ0FRTDs7QUFDQSxZQUFJLGdCQUFnQixHQUFHO0FBQ3JCLFVBQUEsY0FBYyxFQUFFLENBQUMsQ0FBQyx3QkFBRCxDQUFELENBQTRCLEdBQTVCLEVBREs7QUFFckIsVUFBQSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUQsQ0FGQztBQUVJO0FBQ3pCLFVBQUEsSUFBSSxFQUFHLEdBQUUsS0FBTSxJQUFHLFNBQVMsQ0FBQyxDQUFELENBQUksSUFBRyxTQUFTLENBQUMsQ0FBRCxDQUFJLEVBSDFCO0FBSXJCLFVBQUEsTUFBTSxFQUFFLHdCQUFXLElBQVgsR0FBa0IsRUFKTCxDQU92Qjs7QUFQdUIsU0FBdkI7O0FBUUEseUJBQUksUUFBSixDQUFhLFVBQWIsRUFBeUIsZ0JBQXpCLEVBQ0csSUFESCxDQUNRLE1BQU0sYUFBYSxDQUFDLFVBQWQsRUFEZDtBQUVEO0FBQ0YsS0F4QkQ7QUF5QkQsR0E3RW1COztBQStFcEIsRUFBQSxlQUFlLEdBQUc7QUFDaEI7QUFDQSxJQUFBLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCLEtBQXRCLENBQTRCLFVBQVUsQ0FBVixFQUFhO0FBQ3ZDO0FBQ0EsVUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxlQUF6QixDQUZ1QyxDQUd2Qzs7QUFDQSxVQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsU0FBNUIsQ0FKdUMsQ0FLdkM7O0FBQ0EsTUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUgsQ0FBRCxDQUFZLFdBQVosQ0FBd0IsbURBQXhCLEVBTnVDLENBT3ZDOztBQUNBLE1BQUEsQ0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhLFdBQWIsQ0FBMEIsOENBQTZDLFdBQVksSUFBbkYsRUFSdUMsQ0FTdkM7O0FBQ0EsWUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLFlBQUQsQ0FBdkIsQ0FWdUMsQ0FXdkM7O0FBQ0EsTUFBQSxhQUFhLENBQUMsSUFBZCxHQUFxQixLQUFyQixDQUEyQixVQUFVLENBQVYsRUFBYTtBQUN0QztBQUNBLGNBQU0sb0JBQW9CLEdBQUc7QUFDM0IsVUFBQSxjQUFjLEVBQUUsYUFBYSxDQUFDLEdBQWQsRUFEVyxDQUc3Qjs7QUFINkIsU0FBN0I7QUFJQSxjQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsTUFBZCxHQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUF4QixDQU5zQyxDQU90Qzs7QUFDQSx5QkFBSSxVQUFKLENBQWUsVUFBZixFQUEyQixlQUEzQixFQUE0QyxvQkFBNUMsRUFDRyxJQURILENBQ1EsTUFBTSxhQUFhLENBQUMsVUFBZCxFQURkO0FBRUQsT0FWRDtBQVdELEtBdkJEO0FBd0JEOztBQXpHbUIsQ0FBdEI7ZUE0R2UsYTs7Ozs7Ozs7Ozs7QUNqSGY7O0FBQ0E7Ozs7QUFJQSxNQUFNLG1CQUFtQixHQUFHO0FBQzFCLEVBQUEsZ0JBQWdCLEdBQUk7QUFDbEIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsR0FBd0QsSUFBeEQ7QUFDQSxRQUFJLG9CQUFLLE9BQVQsQ0FBa0I7QUFBQyxNQUFBLFNBQVMsRUFBRSxTQUFaO0FBQXVCLE1BQUEsRUFBRSxFQUFHLEdBQUUsd0JBQVcsSUFBWCxHQUFrQixFQUFHO0FBQW5ELEtBQWxCLEVBQ0EsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLEdBQUcsRUFBRyxHQUFFLHdCQUFXLElBQVgsR0FBa0IsVUFBVyxFQUF0QztBQUF5QyxNQUFBLEdBQUcsRUFBRSxhQUE5QztBQUE2RCxNQUFBLEtBQUssRUFBQyx1REFBbkU7QUFBNEgsTUFBQSxNQUFNLEVBQUUsS0FBcEk7QUFBMkksTUFBQSxLQUFLLEVBQUU7QUFBbEosS0FBZixDQURBLEVBRUEsSUFBSSxvQkFBSyxLQUFULENBQWdCLElBQWhCLEVBQXNCO0FBQUMsTUFBQSxLQUFLLEVBQUM7QUFBUCxLQUF0QixFQUEwRixHQUFFLHdCQUFXLElBQVgsR0FBa0IsU0FBVSxNQUFLLHdCQUFXLElBQVgsR0FBa0IsUUFBUyxJQUFHLHdCQUFXLElBQVgsR0FBa0IsUUFBUyxFQUF0TCxDQUZBLEVBR0UsTUFIRixDQUdTLG1CQUhUO0FBSUQ7O0FBUHlCLENBQTVCO2VBVWUsbUI7Ozs7Ozs7Ozs7O0FDZmY7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFHQSxNQUFNLE1BQU0sR0FBRztBQUNiLEVBQUEsVUFBVSxHQUFHO0FBQ1gsUUFBSSxvQkFBSyxFQUFULENBQ0UsRUFERixFQUVFLElBQUksb0JBQUssRUFBVCxDQUFZLEVBQVosRUFBZ0IsTUFBaEIsQ0FGRixFQUdFLElBQUksb0JBQUssRUFBVCxDQUFZLEVBQVosRUFBZ0IsT0FBaEIsQ0FIRixFQUlFLElBQUksb0JBQUssRUFBVCxDQUFZLEVBQVosRUFBZ0IsUUFBaEIsQ0FKRixFQUtFLElBQUksb0JBQUssRUFBVCxDQUFZLEVBQVosRUFBZ0IsVUFBaEIsQ0FMRixFQU1FLElBQUksb0JBQUssRUFBVCxDQUFZLEVBQVosRUFBZ0IsTUFBaEIsQ0FORixFQU9FLElBQUksb0JBQUssRUFBVCxDQUFZLEVBQVosRUFBZ0IsU0FBaEIsQ0FQRixFQVFFLElBQUksb0JBQUssRUFBVCxDQUFZLEVBQVosRUFBZ0IsU0FBaEIsQ0FSRixFQVNFLE1BVEYsQ0FTUyxTQVRUO0FBV0EsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxnQkFBbEMsQ0FBbUQsT0FBbkQsRUFBNkQsS0FBRCxJQUFXO0FBQ3JFLFVBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxXQUFiLEtBQTZCLE1BQWpDLEVBQXlDO0FBQ3ZDLFlBQUksY0FBYyxDQUFDLE9BQWYsQ0FBdUIsYUFBdkIsTUFBMEMsSUFBOUMsRUFBbUQ7QUFDakQsVUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGdCQUFaOztBQUNBLHlCQUFXLFNBQVg7QUFDRCxTQUhELE1BR087QUFDTCxrQ0FBb0IsZ0JBQXBCO0FBQ0Q7QUFDRixPQVBELE1BT08sSUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFdBQWIsSUFBNEIsT0FBaEMsRUFBeUM7QUFDOUMsWUFBSSxjQUFjLENBQUMsT0FBZixDQUF1QixhQUF2QixNQUEwQyxJQUE5QyxFQUFtRDtBQUNqRCxVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZ0JBQVo7O0FBQ0EseUJBQVcsU0FBWDtBQUNELFNBSEQsTUFHTztBQUNMLHlCQUFXLGVBQVg7QUFDRDtBQUNGLE9BUE0sTUFPQSxJQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsV0FBYixJQUE0QixRQUFoQyxFQUEwQztBQUMvQyxZQUFJLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGFBQXZCLE1BQTBDLElBQTlDLEVBQW1EO0FBQ2pELFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWjs7QUFDQSx5QkFBVyxTQUFYO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsMEJBQVksZUFBWjtBQUNEO0FBQ0YsT0FQTSxNQU9BLElBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxXQUFiLElBQTRCLFVBQWhDLEVBQTRDO0FBQ2pELFlBQUksY0FBYyxDQUFDLE9BQWYsQ0FBdUIsYUFBdkIsTUFBMEMsSUFBOUMsRUFBbUQ7QUFDakQsVUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGdCQUFaOztBQUNBLHlCQUFXLFNBQVg7QUFDRCxTQUhELE1BR087QUFDUCw0QkFBYyxVQUFkO0FBQ0M7QUFDRixPQVBNLE1BT0EsSUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFdBQWIsSUFBNEIsTUFBaEMsRUFBd0M7QUFDN0MsWUFBSSxjQUFjLENBQUMsT0FBZixDQUF1QixhQUF2QixNQUEwQyxJQUE5QyxFQUFtRDtBQUNqRCxVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZ0JBQVo7O0FBQ0EseUJBQVcsU0FBWDtBQUNELFNBSEQsTUFHTztBQUNQLHdCQUFVLE9BQVY7QUFDQztBQUNGLE9BUE0sTUFPQSxJQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsV0FBYixJQUE0QixTQUFoQyxFQUEyQztBQUNoRCxZQUFJLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGFBQXZCLE1BQTBDLElBQTlDLEVBQW1EO0FBQ2pELFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWjs7QUFDQSx5QkFBVyxTQUFYO0FBQ0QsU0FIRCxNQUdPO0FBQ1AsVUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDBCQUFaO0FBQ0M7QUFDRixPQVBNLE1BT0EsSUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFdBQWIsSUFBNEIsU0FBaEMsRUFBMkM7QUFDaEQsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDBCQUFaO0FBQ0EsUUFBQSxjQUFjLENBQUMsVUFBZixDQUEwQixhQUExQjs7QUFDQSx1QkFBVyxTQUFYO0FBQ0Q7QUFDRixLQWhERDtBQWlERDs7QUE5RFksQ0FBZjtlQWtFZSxNOzs7Ozs7Ozs7OztBQzNFZjs7QUFDQTs7QUFDQTs7OztBQUdBLE1BQU0sU0FBUyxHQUFHO0FBQ2hCLEVBQUEsU0FBUyxDQUFDLE9BQUQsRUFBVTtBQUNqQixRQUFJLG9CQUFLLE9BQVQsQ0FBa0I7QUFBQyxNQUFBLFNBQVMsRUFBRSxNQUFaO0FBQW9CLE1BQUEsRUFBRSxFQUFHLEdBQUUsT0FBTyxDQUFDLEVBQUc7QUFBdEMsS0FBbEIsRUFDQSxJQUFJLG9CQUFLLE1BQVQsQ0FBZ0I7QUFBQyxNQUFBLElBQUksRUFBRyxHQUFFLE9BQU8sQ0FBQyxHQUFJLEVBQXRCO0FBQXlCLE1BQUEsTUFBTSxFQUFFO0FBQWpDLEtBQWhCLEVBQTZELElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxHQUFHLEVBQUcsR0FBRSxPQUFPLENBQUMsWUFBYSxFQUE5QjtBQUFpQyxNQUFBLEdBQUcsRUFBRSxlQUF0QztBQUF1RCxNQUFBLE1BQU0sRUFBRSxLQUEvRDtBQUFzRSxNQUFBLEtBQUssRUFBRTtBQUE3RSxLQUFmLENBQTdELENBREEsRUFFQSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLEVBQXJCLEVBQTBCLEdBQUUsT0FBTyxDQUFDLFdBQVksRUFBaEQsQ0FGQSxFQUdBLElBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUIsRUFBckIsRUFBMEIsYUFBWSxPQUFPLENBQUMsSUFBUixDQUFhLFNBQVUsa0JBQWlCLE9BQU8sQ0FBQyxTQUFVLEVBQWhHLENBSEEsRUFJQSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLEVBQXJCLEVBQXlCLE9BQU8sQ0FBQyxLQUFqQyxDQUpBLEVBSXlDLE1BSnpDLENBSWdELG1CQUpoRDtBQUtELEdBUGU7O0FBU2hCLEVBQUEsT0FBTyxHQUFLO0FBQ1YsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsR0FBd0QsRUFBeEQ7O0FBQ0EscUJBQUksY0FBSixDQUFtQiwyREFBbkIsRUFDQyxJQURELENBQ00sT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFSLENBQWdCLElBQUksSUFBSTtBQUN2QyxXQUFLLFNBQUwsQ0FBZSxJQUFmO0FBQXFCLEtBRE4sQ0FEakIsRUFHRyxJQUhILENBR1EsTUFBTSxLQUFLLE9BQUwsRUFIZDtBQUtELEdBaEJlOztBQWtCaEIsRUFBQSxPQUFPLEdBQUk7QUFDVCxRQUFJLG9CQUFLLE9BQVQsQ0FBa0I7QUFBQyxNQUFBLFNBQVMsRUFBRTtBQUFaLEtBQWxCLEVBQ0EsSUFBSSxvQkFBSyxLQUFULENBQWdCLElBQWhCLEVBQXNCLEVBQXRCLEVBQTBCLG1CQUExQixDQURBLEVBRUEsSUFBSSxvQkFBSyxJQUFULENBQ0UsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLEdBQUcsRUFBRTtBQUFOLEtBQWYsRUFBcUMsY0FBckMsQ0FERixFQUVFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxJQUFJLEVBQUUsYUFBUDtBQUFzQixNQUFBLFdBQVcsRUFBRSxjQUFuQztBQUFtRCxNQUFBLEVBQUUsRUFBRTtBQUF2RCxLQUFmLENBRkYsRUFHRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLE1BQUEsR0FBRyxFQUFFO0FBQU4sS0FBZixFQUFvQyxjQUFwQyxDQUhGLEVBSUUsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLElBQUksRUFBRSxZQUFQO0FBQXFCLE1BQUEsV0FBVyxFQUFFLGNBQWxDO0FBQWtELE1BQUEsRUFBRSxFQUFFO0FBQXRELEtBQWYsQ0FKRixFQUtFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxHQUFHLEVBQUU7QUFBTixLQUFmLEVBQXlDLG9CQUF6QyxDQUxGLEVBTUUsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLElBQUksRUFBRSxpQkFBUDtBQUEwQixNQUFBLFdBQVcsRUFBRSxvQkFBdkM7QUFBNkQsTUFBQSxFQUFFLEVBQUU7QUFBakUsS0FBZixDQU5GLEVBT0UsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLEdBQUcsRUFBRTtBQUFOLEtBQWYsRUFBNEMscUJBQTVDLENBUEYsRUFRRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLE1BQUEsSUFBSSxFQUFFLG9CQUFQO0FBQTZCLE1BQUEsV0FBVyxFQUFFLHFCQUExQztBQUFpRSxNQUFBLEVBQUUsRUFBRTtBQUFyRSxLQUFmLENBUkYsRUFTRSxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxrQkFBYixDQVRGLENBRkEsRUFhRSxNQWJGLENBYVMsbUJBYlQ7QUFlQSxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLEVBQWlDLGdCQUFqQyxDQUFrRCxPQUFsRCxFQUEyRCxNQUFJO0FBQzdELFVBQUksS0FBSyxHQUFHO0FBQ1YsUUFBQSxXQUFXLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsS0FEMUM7QUFFVixRQUFBLEdBQUcsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixFQUF1QyxLQUZsQztBQUdWLFFBQUEsWUFBWSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLEtBSDVDO0FBSVYsUUFBQSxLQUFLLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLEtBSjNDOztBQUtWOzs7QUFHQSxRQUFBLE1BQU0sRUFBRSx3QkFBVyxJQUFYLENBQWdCLEVBQWhCLEVBUkU7QUFTVixRQUFBLFNBQVMsRUFBRSxJQUFJLElBQUo7QUFURCxPQUFaO0FBV0EsTUFBQSxTQUFTLENBQUMsT0FBVixDQUFrQixLQUFsQjtBQUNELEtBYkQ7QUFjRCxHQWhEZTs7QUFrRGhCLEVBQUEsT0FBTyxDQUFDLEtBQUQsRUFBTztBQUNaLHFCQUFJLFFBQUosQ0FBYSxVQUFiLEVBQXlCLEtBQXpCLEVBQWdDLElBQWhDLENBQXFDLE1BQUssS0FBSyxPQUFMLEVBQTFDO0FBQ0Q7O0FBcERlLENBQWxCO2VBeURlLFM7Ozs7Ozs7Ozs7O0FDOURmOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxhQUFhLEdBQUc7QUFFcEIsRUFBQSxZQUFZLEdBQUc7QUFDYixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxTQUE1QyxHQUF3RCxFQUF4RDtBQUNBLFFBQUksb0JBQUssSUFBVCxDQUNFLElBQUksb0JBQUssS0FBVCxDQUFlLEVBQWYsRUFBbUIsWUFBbkIsQ0FERixFQUVFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxJQUFJLEVBQUUsV0FBUjtBQUFxQixNQUFBLEVBQUUsRUFBRSxXQUF6QjtBQUFzQyxNQUFBLFdBQVcsRUFBRTtBQUFuRCxLQUFmLENBRkYsRUFHRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxFQUFmLEVBQW1CLFdBQW5CLENBSEYsRUFJRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0IsTUFBQSxFQUFFLEVBQUUsVUFBeEI7QUFBb0MsTUFBQSxXQUFXLEVBQUU7QUFBakQsS0FBZixDQUpGLEVBS0UsSUFBSSxvQkFBSyxLQUFULENBQWUsRUFBZixFQUFtQixPQUFuQixDQUxGLEVBTUUsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLElBQUksRUFBRSxPQUFSO0FBQWlCLE1BQUEsRUFBRSxFQUFFLE9BQXJCO0FBQThCLE1BQUEsSUFBSSxFQUFFLE9BQXBDO0FBQTZDLE1BQUEsV0FBVyxFQUFFO0FBQTFELEtBQWYsQ0FORixFQU9FLElBQUksb0JBQUssS0FBVCxDQUFlLEVBQWYsRUFBbUIsVUFBbkIsQ0FQRixFQVFFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxJQUFJLEVBQUUsVUFBUjtBQUFvQixNQUFBLEVBQUUsRUFBRSxVQUF4QjtBQUFvQyxNQUFBLFdBQVcsRUFBRTtBQUFqRCxLQUFmLENBUkYsRUFTRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsR0FBRyxFQUFFO0FBQVAsS0FBZixFQUFvQyxVQUFwQyxDQVRGLEVBVUUsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLElBQUksRUFBRSxVQUFSO0FBQW9CLE1BQUEsRUFBRSxFQUFFLFVBQXhCO0FBQW9DLE1BQUEsV0FBVyxFQUFFO0FBQWpELEtBQWYsQ0FWRixFQVdFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxHQUFHLEVBQUU7QUFBUCxLQUFmLEVBQTJDLGtCQUEzQyxDQVhGLEVBWUUsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLElBQUksRUFBRSxpQkFBUjtBQUEyQixNQUFBLEVBQUUsRUFBRSxpQkFBL0I7QUFBa0QsTUFBQSxXQUFXLEVBQUU7QUFBL0QsS0FBZixDQVpGLEVBYUUsSUFBSSxvQkFBSyxHQUFULENBQWEsa0JBQWIsQ0FiRixFQWNFLElBQUksb0JBQUssR0FBVCxDQUFhLDRCQUFiLENBZEYsRUFlRSxNQWZGLENBZVMsbUJBZlQ7QUFnQkEsSUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0MsT0FBcEMsQ0FBNkMsTUFBRCxJQUFZO0FBQ3RELE1BQUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWtDLENBQUQsSUFBTztBQUN0QyxZQUFJLENBQUMsQ0FBQyxNQUFGLENBQVMsV0FBVCxLQUF5QixrQkFBN0IsRUFBaUQ7QUFDL0MsY0FBSSxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQUFyQyxLQUErQyxFQUEvQyxJQUFxRCxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUFwQyxLQUE4QyxFQUFuRyxJQUF5RyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxLQUFqQyxLQUEyQyxFQUFwSixJQUEwSixRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUFwQyxLQUE4QyxFQUF4TSxJQUE4TSxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUFwQyxLQUE4QyxFQUE1UCxJQUFrUSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsS0FBM0MsS0FBcUQsRUFBM1QsRUFBK1Q7QUFDN1Q7QUFDQSxZQUFBLEtBQUssQ0FBQyxtREFBRCxDQUFMO0FBQ0QsV0FIRCxNQUdPLElBQUksUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsS0FBakMsQ0FBdUMsT0FBdkMsQ0FBK0MsR0FBL0MsTUFBd0QsQ0FBQyxDQUE3RCxFQUFnRTtBQUNyRTtBQUNBLFlBQUEsS0FBSyxDQUFDLHFDQUFELENBQUw7QUFDRCxXQUhNLE1BR0EsSUFBSSxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUFwQyxLQUE4QyxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsS0FBN0YsRUFBb0c7QUFDekc7QUFDQSxZQUFBLENBQUMsQ0FBQyxjQUFGO0FBQ0EsZ0JBQUksUUFBUSxHQUFHO0FBQ2IsY0FBQSxTQUFTLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsS0FEbkM7QUFFYixjQUFBLFFBQVEsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUZqQztBQUdiLGNBQUEsS0FBSyxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLEVBQWlDLEtBSDNCO0FBSWIsY0FBQSxRQUFRLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0MsS0FKakM7QUFLYixjQUFBLFFBQVEsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUxqQztBQU1iO0FBQ0EsY0FBQSxVQUFVLEVBQUU7QUFQQyxhQUFmOztBQVNBLDZCQUFJLGNBQUosQ0FBb0IsZ0JBQWUsUUFBUSxDQUFDLEtBQU0sRUFBbEQsRUFBcUQsSUFBckQsQ0FBMEQsUUFBUSxJQUFJO0FBQ3BFLGtCQUFJLFFBQVEsQ0FBQyxNQUFULEtBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLHFCQUFLLGFBQUwsQ0FBbUIsUUFBbkI7QUFDRCxlQUZELE1BRU87QUFDTCxnQkFBQSxLQUFLLENBQUMsbUNBQUQsQ0FBTDtBQUNEO0FBQ0YsYUFORDtBQU9ELFdBbkJNLE1BbUJBO0FBQUUsWUFBQSxLQUFLLENBQUMsaURBQUQsQ0FBTDtBQUEwRDtBQUNwRSxTQTNCRCxNQTJCTztBQUNMLHlCQUFXLFNBQVg7QUFDRDtBQUNGLE9BL0JEO0FBZ0NELEtBakNEO0FBa0NELEdBdERtQjs7QUF3RHBCLEVBQUEsYUFBYSxDQUFDLElBQUQsRUFBTztBQUNsQixxQkFBSSxjQUFKLENBQW9CLG1CQUFrQixJQUFJLENBQUMsUUFBUyxFQUFwRCxFQUF1RCxJQUF2RCxDQUE0RCxJQUFJLElBQUk7QUFDbEUsVUFBSSxJQUFJLENBQUMsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNyQix5QkFBSSxRQUFKLENBQWEsT0FBYixFQUFzQixJQUF0QixFQUE0QixJQUE1QixDQUFpQyxPQUFPLElBQUk7QUFDMUMsY0FBSSxXQUFXLEdBQUcsSUFBSSxvQkFBSyxJQUFULENBQWMsT0FBZCxDQUFsQjtBQUNBLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSwwQkFBWixFQUF3QyxXQUF4QyxFQUYwQyxDQUcxQztBQUNBOztBQUNBLGVBQUssV0FBTCxDQUFpQixXQUFqQjtBQUNELFNBTkQ7QUFPRCxPQVJELE1BUU8sSUFBSSxJQUFJLENBQUMsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUM1QixRQUFBLEtBQUssQ0FBRSxhQUFZLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxRQUFTLGlEQUEvQixDQUFMO0FBQ0Q7QUFDRixLQVpEO0FBYUQsR0F0RW1COztBQXdFcEI7QUFDQSxFQUFBLFdBQVcsQ0FBQyxJQUFELEVBQU87QUFDaEIsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7QUFDQSxJQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGFBQXZCLEVBQXNDLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixDQUF0Qzs7QUFDQSw0QkFBb0IsZ0JBQXBCO0FBQ0Q7O0FBN0VtQixDQUF0QjtlQWdGZSxhOzs7Ozs7Ozs7O0FDckZmO0FBRUEsTUFBTSxVQUFVLEdBQUc7QUFDakIsRUFBQSxJQUFJLEdBQUk7QUFDTixRQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBTCxDQUFXLGNBQWMsQ0FBQyxXQUExQixDQUFuQjtBQUNFLFdBQU8sWUFBUDtBQUNIOztBQUpnQixDQUFuQjtlQVVlLFU7Ozs7Ozs7Ozs7O0FDWmY7O0FBQ0E7O0FBQ0E7Ozs7QUFHQSxNQUFNLFVBQVUsR0FBRztBQUVqQjtBQUNBLEVBQUEsZUFBZSxHQUFJO0FBQ2pCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFNBQTVDLEdBQXdELEVBQXhEO0FBQ0EsUUFBSSxvQkFBSyxLQUFULENBQWdCLElBQWhCLEVBQXNCO0FBQUMsTUFBQSxTQUFTLEVBQUU7QUFBWixLQUF0QixFQUF3RCxrQkFBeEQsRUFBNEUsTUFBNUUsQ0FBbUYsbUJBQW5GO0FBQ0EsUUFBSSxvQkFBSyxHQUFULENBQWM7QUFBQyxNQUFBLEVBQUUsRUFBRTtBQUFMLEtBQWQsRUFBa0MsTUFBbEMsQ0FBeUMsbUJBQXpDO0FBQ0EsUUFBSSxvQkFBSyxLQUFULENBQWdCLElBQWhCLEVBQXNCO0FBQUMsTUFBQSxTQUFTLEVBQUU7QUFBWixLQUF0QixFQUFzRCxnQkFBdEQsRUFBd0UsTUFBeEUsQ0FBK0UsbUJBQS9FO0FBQ0EsUUFBSSxvQkFBSyxHQUFULENBQWM7QUFBQyxNQUFBLEVBQUUsRUFBRTtBQUFMLEtBQWQsRUFBZ0MsTUFBaEMsQ0FBdUMsbUJBQXZDO0FBQ0EsU0FBSyxPQUFMO0FBQ0EsU0FBSyxVQUFMO0FBQ0QsR0FYZ0I7O0FBYWpCO0FBQ0EsRUFBQSxVQUFVLENBQUUsUUFBRixFQUFZO0FBQ3BCLFFBQUksZUFBSjs7QUFFQSxRQUFJLFFBQVEsQ0FBQyxRQUFiLEVBQXVCO0FBQ3JCLE1BQUEsZUFBZSxHQUFHLFdBQWxCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsTUFBQSxlQUFlLEdBQUcsYUFBbEI7QUFDRDs7QUFFRCxRQUFJLG9CQUFLLE9BQVQsQ0FBa0I7QUFBQyxNQUFBLFNBQVMsRUFBRSxNQUFaO0FBQW9CLE1BQUEsRUFBRSxFQUFHLEdBQUUsUUFBUSxDQUFDLEVBQUc7QUFBdkMsS0FBbEIsRUFDQSxJQUFJLG9CQUFLLFFBQVQsRUFEQSxFQUVBLElBQUksb0JBQUssR0FBVCxDQUFhO0FBQUMsTUFBQSxTQUFTLEVBQUU7QUFBWixLQUFiLEVBQTRDLFFBQVEsQ0FBQyxJQUFyRCxDQUZBLEVBR0EsSUFBSSxvQkFBSyxHQUFULENBQWE7QUFBQyxNQUFBLFNBQVMsRUFBRTtBQUFaLEtBQWIsRUFBNEMsUUFBUSxDQUFDLE9BQXJELENBSEEsRUFHK0QsTUFIL0QsQ0FHc0UsZUFIdEU7QUFJRCxHQTNCZ0I7O0FBNkJqQjtBQUNBLEVBQUEsVUFBVSxHQUFLO0FBQ2IscUJBQUksY0FBSixDQUFtQixPQUFuQixFQUE0QjtBQUE1QixLQUNDLElBREQsQ0FDTSxRQUFRLElBQUs7QUFDakIsTUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixJQUFJLElBQUk7QUFDekIsYUFBSyxVQUFMLENBQWdCLElBQWhCO0FBQXNCLE9BRHRCO0FBRUEsV0FBSyxVQUFMO0FBQ0EsV0FBSyxXQUFMO0FBQ0QsS0FORDtBQU9ELEdBdENnQjs7QUF3Q2pCO0FBQ0E7QUFDQSxFQUFBLFVBQVUsR0FBSTtBQUNaLFVBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixzQkFBMUIsQ0FBbkIsQ0FEWSxDQUdaOztBQUNBLElBQUEsVUFBVSxDQUFDLE9BQVgsQ0FBcUIsUUFBRCxJQUFjO0FBQ2hDLFVBQUksUUFBUSxDQUFDLFVBQVQsQ0FBb0IsVUFBcEIsQ0FBK0IsRUFBL0IsS0FBc0MsVUFBMUMsRUFBc0Q7QUFDcEQsUUFBQSxRQUFRLENBQUMsT0FBVCxHQUFtQixJQUFuQjtBQUNEOztBQUNELE1BQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLFFBQTFCLEVBQXFDLENBQUQsSUFBTztBQUN6QyxZQUFJLGFBQUosQ0FEeUMsQ0FFekM7O0FBQ0EsWUFBSSxDQUFDLENBQUMsTUFBRixDQUFTLE9BQWIsRUFBc0I7QUFDcEIsVUFBQSxhQUFhLEdBQUc7QUFBQyxZQUFBLFFBQVEsRUFBRSxJQUFYLENBQ2hCOztBQURnQixXQUFoQjs7QUFFQSwyQkFBSSxVQUFKLENBQWUsT0FBZixFQUF5QixHQUFFLENBQUMsQ0FBQyxNQUFGLENBQVMsVUFBVCxDQUFvQixFQUFHLEVBQWxELEVBQXFELGFBQXJELEVBQ0csSUFESCxDQUNRLE1BQU0sS0FBSyxlQUFMLEVBRGQ7QUFFRCxTQUxELE1BS087QUFDTDtBQUNBLFVBQUEsYUFBYSxHQUFHO0FBQUMsWUFBQSxRQUFRLEVBQUU7QUFBWCxXQUFoQjs7QUFDQSwyQkFBSSxVQUFKLENBQWUsT0FBZixFQUF5QixHQUFFLENBQUMsQ0FBQyxNQUFGLENBQVMsVUFBVCxDQUFvQixFQUFHLEVBQWxELEVBQXFELGFBQXJELEVBQ0csSUFESCxDQUNRLE1BQU0sS0FBSyxlQUFMLEVBRGQ7QUFFRDtBQUNGLE9BZEQ7QUFlRCxLQW5CRDtBQXFCRCxHQW5FZ0I7O0FBcUVqQjtBQUNBLEVBQUEsV0FBVyxHQUFJO0FBQ2I7QUFDQSxRQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBZixDQUZhLENBSWI7O0FBQ0EsSUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixPQUFPLElBQUk7QUFDMUIsTUFBQSxPQUFPLENBQUMsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBbUMsQ0FBRCxJQUFPO0FBQ3ZDO0FBQ0EsY0FBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxVQUFULENBQW9CLEVBQS9CLENBRnVDLENBSXZDO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFlBQUksQ0FBQyxDQUFDLE1BQUYsQ0FBUyxTQUFULENBQW1CLFFBQW5CLENBQTRCLGdCQUE1QixDQUFKLEVBQW1EO0FBQ2pELGdCQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBRixDQUFTLFdBQTFCO0FBQ0EsY0FBSSxhQUFhLEdBQUksd0NBQXVDLFFBQVMsSUFBckU7QUFDQSxVQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBSCxDQUFELENBQVksV0FBWixDQUF3QixhQUF4QjtBQUNBLGdCQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFsQjtBQUNFLFVBQUEsU0FBUyxDQUFDLGdCQUFWLENBQTJCLFNBQTNCLEVBQXVDLENBQUQsSUFBTztBQUMzQyxnQkFBSSxDQUFDLENBQUMsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLG9CQUFNLFNBQVMsR0FBRztBQUFDLGdCQUFBLElBQUksRUFBRSxTQUFTLENBQUM7QUFBakIsZUFBbEI7O0FBQ0EsK0JBQUksVUFBSixDQUFlLE9BQWYsRUFBd0IsRUFBeEIsRUFBNEIsU0FBNUIsRUFDRyxJQURILENBQ1EsTUFBTSxLQUFLLGVBQUwsRUFEZDtBQUVEO0FBQ0YsV0FORCxFQUwrQyxDQVluRDtBQUNBO0FBQ0E7QUFDQTtBQUNDLFNBaEJELE1BZ0JPLElBQUksQ0FBQyxDQUFDLE1BQUYsQ0FBUyxTQUFULENBQW1CLFFBQW5CLENBQTRCLGdCQUE1QixDQUFKLEVBQW1EO0FBQ3hELGdCQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBRixDQUFTLFdBQTFCO0FBQ0EsY0FBSSxZQUFZLEdBQUksd0NBQXVDLFFBQVMsSUFBcEU7QUFDQSxVQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBSCxDQUFELENBQVksV0FBWixDQUF3QixZQUF4QjtBQUNFLGdCQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUF0QjtBQUNBLFVBQUEsYUFBYSxDQUFDLGdCQUFkLENBQStCLFFBQS9CLEVBQTBDLENBQUQsSUFBTztBQUM1QyxrQkFBTSxTQUFTLEdBQUc7QUFBQyxjQUFBLE9BQU8sRUFBRSxhQUFhLENBQUM7QUFBeEIsYUFBbEI7O0FBQ0EsNkJBQUksVUFBSixDQUFlLE9BQWYsRUFBd0IsRUFBeEIsRUFBNEIsU0FBNUIsRUFDRyxJQURILENBQ1EsTUFBTSxLQUFLLGVBQUwsRUFEZDtBQUVILFdBSkQ7QUFLSDtBQUNGLE9BbkNEO0FBb0NELEtBckNEO0FBdUNELEdBbEhnQjs7QUFvSGpCO0FBQ0EsRUFBQSxPQUFPLEdBQUk7QUFDVCxRQUFJLG9CQUFLLE9BQVQsQ0FBa0I7QUFBQyxNQUFBLFNBQVMsRUFBRTtBQUFaLEtBQWxCLEVBQ0EsSUFBSSxvQkFBSyxHQUFULENBQWMsR0FBZCxDQURBLEVBRUEsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLEVBQUUsRUFBRSxhQUFMO0FBQW9CLE1BQUEsSUFBSSxFQUFFLE1BQTFCO0FBQWtDLE1BQUEsV0FBVyxFQUFFO0FBQS9DLEtBQWYsQ0FGQSxFQUdBLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxFQUFFLEVBQUUsYUFBTDtBQUFvQixNQUFBLElBQUksRUFBRTtBQUExQixLQUFmLENBSEEsRUFHbUQsTUFIbkQsQ0FHMEQsYUFIMUQ7QUFLQSxVQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFmO0FBQ0EsVUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBbkI7QUFDQSxVQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUFuQixDQVJTLENBVVQ7O0FBQ0EsSUFBQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0MsQ0FBRCxJQUFPO0FBQ3RDLFVBQUksVUFBVSxDQUFDLEtBQVgsS0FBcUIsRUFBckIsSUFBMkIsVUFBVSxDQUFDLEtBQVgsS0FBcUIsRUFBcEQsRUFBd0Q7QUFDdEQ7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJLFFBQVEsR0FBRztBQUNiLFVBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxLQURKO0FBRWIsVUFBQSxRQUFRLEVBQUUsS0FGRztBQUdiLFVBQUEsT0FBTyxFQUFFLFVBQVUsQ0FBQyxLQUhQOztBQUliOzs7QUFHQSxVQUFBLE1BQU0sRUFBRSx3QkFBVyxJQUFYLEdBQWtCO0FBUGIsU0FBZjs7QUFTQSx5QkFBSSxRQUFKLENBQWEsT0FBYixFQUFzQixRQUF0QixFQUFnQyxJQUFoQyxDQUFxQyxJQUFJLElBQUk7QUFDM0MsZUFBSyxVQUFMLENBQWdCLElBQWhCO0FBQ0EsZUFBSyxVQUFMO0FBQ0EsZUFBSyxXQUFMO0FBQ0QsU0FKRDs7QUFLQSxRQUFBLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLEVBQW5CO0FBQ0EsUUFBQSxVQUFVLENBQUMsS0FBWCxHQUFtQixFQUFuQjtBQUNEO0FBQ0YsS0FyQkQ7QUFzQkQ7O0FBdEpnQixDQUFuQjtlQXlKZSxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGVsZW1lbnRTeW1ib2wgPSBTeW1ib2woKVxuXG5jbGFzcyBET01Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIElmIGBhdHRyaWJ1dGVzYCBpcyBqdXN0IGEgc3RyaW5nLCBpdCdzIGEgc2ltcGxlIGVsZW1lbnQgd2l0aCBub1xuICAgICAgICAgICAgcHJvcGVydGllcyAtIGp1c3Qgc29tZSB0ZXh0IGNvbnRlbnRcbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gYXR0cmlidXRlc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IE9iamVjdC5hc3NpZ24odGhpc1tlbGVtZW50U3ltYm9sXSwgYXR0cmlidXRlcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9uZSBIVE1MRWxlbWVudCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmVsZW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGNoaWxkLmVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQW4gYXJyYXkgb2YgZWxlbWVudHMgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaGlsZC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5lbGVtZW50LmZvckVhY2goYyA9PiB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGMpKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZyB2YWx1ZSB3YXMgcGFzc2VkIGluLCBzZXQgdGV4dCBjb250ZW50XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS50ZXh0Q29udGVudCA9IGNoaWxkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZ2V0IGVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tlbGVtZW50U3ltYm9sXVxuICAgIH1cblxuICAgIHJlbmRlcihjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpc1tlbGVtZW50U3ltYm9sXSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpLmFwcGVuZENoaWxkKGZyYWdtZW50KVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBET01Db21wb25lbnRcbiIsImNvbnN0IFVSTCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L1wiXG5cbmNvbnN0IEFQSSA9IHtcbiAgZ2V0QWxsQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YClcbiAgICAgIC50aGVuKGVudHJpZXMgPT4gZW50cmllcy5qc29uKCkpXG4gIH0sXG5cbiAgZ2V0T25lRnJvbUNhdGVnb3J5KGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0vJHtpZH1gKVxuICAgICAgLnRoZW4oaW5wdXRzID0+IGlucHV0cy5qc29uKCkpXG4gIH0sXG5cbiAgc2F2ZUl0ZW0oY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgIH1cbiAgICApLnRoZW4oanNvbkRhdGEgPT4ganNvbkRhdGEuanNvbigpKVxuICB9LFxuXG4gIGRlbGV0ZUl0ZW0oY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIHVwZGF0ZUl0ZW0oY2F0ZWdvcnksIGlkLCBpdGVtKXtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9LyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICB9XG4gICAgKVxuXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBET01Db21wb25lbnQgZnJvbSBcIi4uL2xpYi9ub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKG51bGwsIHtcclxuXHJcbiAgdXNlcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIFVzZXIge1xyXG4gICAgICBjb25zdHJ1Y3Rvcih0ZW1wSW5mbykge1xyXG4gICAgICAgIHRoaXMuaWQgPSB0ZW1wSW5mby5pZDtcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IHRlbXBJbmZvLmZpcnN0TmFtZTtcclxuICAgICAgICB0aGlzLmxhc3ROYW1lID0gdGVtcEluZm8ubGFzdE5hbWU7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRlbXBJbmZvLnVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSB0ZW1wSW5mby5wYXNzd29yZDtcclxuICAgICAgICB0aGlzLmVtYWlsID0gdGVtcEluZm8uZW1haWw7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlUGljID0gdGVtcEluZm8ucHJvZmlsZVBpYztcclxuICAgIH1cclxuICAgIC8vVE9ETzogdGhpcyBpcyBqdXN0IGEgdGVzdCBmdW5jdGlvbi4gd2Ugd291bGQgaGF2ZSB0aGUgYWJpbGl0eSB0byBjYWxsIGZvciBzYXZpbmdcclxuICAgIC8vIG1lc3NhZ2VzLGFydGljbGVzLCBldmVudHMgYmUgcmVmZXJlbmNpbmcgYSBmdW5jdGlvbiBkZWZpbmVkIGhlcmVcclxuICAgICAgdGVzdCgpIHtcclxuICAgICAgICByZXR1cm4gYFdlbGNvbWUgJHt0aGlzLmZpcnN0TmFtZX0hIExldCdzIHNlZSB3aGF0J3MgZ29pbmcgb24uYDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGRpdjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGRpdiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkaXZcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGJ0bjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGJ0biBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwiYnRuXCIsIHR5cGU6IFwiYnV0dG9uXCIgfSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGlucHV0OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW5wdXQgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNlY3Rpb246IHtcclxuICAgIHZhbHVlOiBjbGFzcyBzZWN0aW9uIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInNlY3Rpb25cIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHRpdGxlOiB7IC8vZGVmaW5lIGFueSB0eXBlIG9mIGgjLi4gaDEsIGgyLCBldGMuXHJcbiAgICB2YWx1ZTogY2xhc3MgdGl0bGUgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYW5jaG9yOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYW5jaG9yIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImFcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNoZWNrYm94OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgY2hlY2tib3ggZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNsYXNzTmFtZTogXCJjYlwiIH0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbWFnZToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGltYWdlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImltZ1wiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB1bCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ1bFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGk6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsaSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsaVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGZvcm0gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZm9ybVwiLCB7fSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxhYmVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGFiZWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGFiZWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHRleHRhcmVhOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgdGV4dGFyZWEgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwidGV4dGFyZWFcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHBhcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHBhciBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJwXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KSIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxyXG5pbXBvcnQgYWN0aXZlVXNlciBmcm9tIFwiLi9zZXNzaW9uU3RvcmFnZVwiXHJcblxyXG5cclxuY29uc3QgYnVpbGRFdmVudHMgPSB7XHJcblxyXG4gIGJ1aWxkQ29udGFpbmVycygpIHtcclxuICAgIC8vIGJ1aWxkcyB0aGUgdHdvIGNvbnRhaW5lcnMgdG8gaG9sZCBldmVyeXRoaW5nXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgLy8gYnV0dG9uIGZvciBuZXcgZXZlbnRcclxuICAgIGNvbnN0IG5ld0J0biA9IG5ldyBjb21wLmRpdih7IGlkOiBcIm5ld0V2ZW50QnRuXCJ9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgzXCIsIFwiTmV3IEV2ZW50IVwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiK1wiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuXHJcbiAgICAvLyBjb250YWluZXJzXHJcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHtcclxuICAgICAgY2xhc3NOYW1lOiBcInRpdGxlLS11cGNvbWluZ1wiXHJcbiAgICB9LCBcIlVwY29taW5nIEV2ZW50XCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBuZXcgY29tcC5kaXYoe1xyXG4gICAgICBpZDogXCJ1cGNvbWluZ1wiXHJcbiAgICB9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7XHJcbiAgICAgIGNsYXNzTmFtZTogXCJ0aXRsZS0tcGFzdFwiXHJcbiAgICB9LCBcIlBhc3QgRXZlbnRcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIG5ldyBjb21wLmRpdih7XHJcbiAgICAgIGlkOiBcInBhc3RcIlxyXG4gICAgfSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIC8vIHRoaXMubmV3VGFzaygpXHJcbiAgICB0aGlzLm5ld0V2ZW50QnV0dG9uKCk7XHJcbiAgICB0aGlzLmV2ZW50RmV0Y2goKVxyXG4gICAgfSxcclxuXHJcbiAgcHJpbnRFdmVudHMoZXZlbnRPYmopIHtcclxuICAgIC8vIHRha2VzIHRoZSBvYmplY3RzIGZyb20gdGhlIGFwaSBhbmQgcHJpbnRzIHRoZW0gdG8gdGhlIGRvbVxyXG4gICAgbGV0IG91dHB1dENvbnRhaW5lcjtcclxuXHJcbiAgICAvLyBuZWVkIHRvIHRlc3QgaWYgZGF0ZSBpcyBpbiB0aGUgZnV0dXJlIG9yIHRoZSBwYXN0XHJcblxyXG4gICAgb3V0cHV0Q29udGFpbmVyID0gXCIjdXBjb21pbmdcIlxyXG4gICAgY29uc3QgdGFzayA9IG5ldyBjb21wLnNlY3Rpb24oe1xyXG4gICAgICAgIGNsYXNzTmFtZTogXCJldmVudFwiLFxyXG4gICAgICAgIGlkOiBgJHtldmVudE9iai5pZH1gXHJcbiAgICAgIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDNcIiwgYCR7ZXZlbnRPYmoubmFtZX1gKSxcclxuICAgICAgbmV3IGNvbXAucGFyKGAke2V2ZW50T2JqLmRhdGV9ICR7ZXZlbnRPYmoudGltZX1gKSxcclxuICAgICAgbmV3IGNvbXAucGFyKGAke2V2ZW50T2JqLmxvY2F0aW9ufWApLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJFZGl0XCIpKS5yZW5kZXIob3V0cHV0Q29udGFpbmVyKVxyXG4gIH0sXHJcblxyXG4gIGV2ZW50RmV0Y2goKSB7XHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYGV2ZW50cy8/dXNlcklkPSR7YWN0aXZlVXNlci5pbmZvKCkuaWR9YCkgLy9jaGVjayBpZiB1c2VyIGlzIHNhbWUgYXMgc2Vzc2lvbiBzdG9yYWdlXHJcbiAgICAgIC50aGVuKGV2ZW50T2JqID0+IHtcclxuICAgICAgICBldmVudE9iai5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMucHJpbnRFdmVudHMoZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBidWlsZEV2ZW50cy5lZGl0QnRuTGlzdGVuKClcclxuICAgICAgfSlcclxuICB9LFxyXG5cclxuICBuZXdFdmVudEJ1dHRvbigpIHtcclxuICAgIC8vIHdoZW4gY2xpY2tlZCBpdCBjbGVhcnMgdGhlIGRvbSBhbmQgY2FsbHMgdGhlIGZ1bmN0aW9uIHRvIGJ1aWxkIHRoZSBmb3JtXHJcbiAgICAkKFwiI25ld0V2ZW50QnRuXCIpLmNsaWNrKFxyXG4gICAgICBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQoXCIuY29udGFpbmVyLS1pbm5lclwiKS50ZXh0KFwiXCIpXHJcbiAgICAgICAgYnVpbGRFdmVudHMubmV3RXZlbnRQb3BVcCgpO1xyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgbmV3RXZlbnRQb3BVcCgpIHtcclxuICAgIC8vIEJ1aWxkcyBuZXcgZXZlbnQgZW50cnkgZm9ybVxyXG4gICAgbGV0IGRpdjIgPSBuZXcgY29tcC5kaXYoe1xyXG4gICAgICAgIGNsYXNzTGlzdDogXCJuZXdFdmVudEZvcm1cIlxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCJ9LCBcIkFkZCBBIE5ldyBFdmVudFwiKSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJFdmVudCBOYW1lXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwidGV4dFwifSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiRGF0ZVwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwiZGF0ZVwifSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiVGltZVwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwidGltZVwifSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiTG9jYXRpb25cIiksXHJcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJ0ZXh0XCJ9KSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiU2F2ZVwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiQmFja1wiKSlcclxuICAgIGRpdjIucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGJ1aWxkRXZlbnRzLm5ld0V2ZW50UG9wVXBCdG5DbGlja3MoKTtcclxuICB9LFxyXG5cclxuICBuZXdFdmVudFBvcFVwQnRuQ2xpY2tzKCkge1xyXG4gICAgLy8gZ3JhYnMgdGhlIHR3byBidXR0b25zIG9uIHRoZSBwYWdlIGFuZCBhZGRzIGEgY2xpY2sgbGlzdGVuZXIgYmFzZWQgb24gaW5kZXhcclxuICAgIGNvbnN0IHBvcFVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIik7XHJcbiAgICBwb3BVcEJ0bnNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgLy8gU2F2ZSBCdXR0b25cclxuICAgICAgY29uc3QgaW5wdXRBcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcclxuICAgICAgLy8gYnVpbGRzIG9iamVjdCB0byBzZW5kIHRvIGFwaVxyXG4gICAgICBjb25zdCBuZXdFdmVudE9iaiA9IHtcclxuICAgICAgICBuYW1lOiBpbnB1dEFycmF5WzBdLnZhbHVlLFxyXG4gICAgICAgIGRhdGU6IGlucHV0QXJyYXlbMV0udmFsdWUsXHJcbiAgICAgICAgdGltZTogaW5wdXRBcnJheVsyXS52YWx1ZSxcclxuICAgICAgICBsb2NhdGlvbjogaW5wdXRBcnJheVszXS52YWx1ZSxcclxuICAgICAgICB1c2VySWQ6IGFjdGl2ZVVzZXIuaW5mbygpLmlkXHJcbiAgICAgIH1cclxuICAgICAgLy8gc2F2ZXMgbmV3IGV2ZW50IHRvIEFQSVxyXG4gICAgICBBUEkuc2F2ZUl0ZW0oXCJldmVudHNcIiwgbmV3RXZlbnRPYmopLnRoZW4oKCkgPT4ge1xyXG4gICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTtcclxuICAgICB9KSB9KVxyXG5cclxuICAgIC8vIEJhY2sgQnV0dG9uIFJldHVybnMgdG8gRXZlbnQgUGFnZVxyXG4gICAgcG9wVXBCdG5zWzFdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgfSlcclxuICB9LFxyXG4gIGVkaXRCdG5MaXN0ZW4gKCkge1xyXG4gICAgLy8gbGlzdGVucyBmb3IgYWxsIHRoZSBlZGl0IGJ1dHRvbnMgb24gdGhlIHBhZ2VcclxuICAgIGNvbnN0IGFsbFRoZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VjdGlvbiA+IGJ1dHRvblwiKTtcclxuICAgIGFsbFRoZUJ1dHRvbnMuZm9yRWFjaChjdXJyZW50QnRuID0+IHtcclxuICAgICAgY3VycmVudEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vIHRha2VzIHRoZSBpZCBvZiB0aGUgZXZlbnQgdGhhdCB3YXMgY2xpY2tzLCBmZXRjaGVzIGZyb20gdGhlIGFwaSB3aXRoIHRoYXQgaWQgYW5kIHBhc3NlcyBvbiB0byB0aGUgRWRpdCBFbGVtZW50IGZvcm1cclxuICAgICAgICBjb25zdCBjdXJyZW50QnRuSWQgPSBjdXJyZW50QnRuLnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgQVBJLmdldE9uZUZyb21DYXRlZ29yeShcImV2ZW50c1wiLCBjdXJyZW50QnRuSWQpXHJcbiAgICAgICAgICAudGhlbihzaW5nbGVFdmVudCA9PiB7XHJcbiAgICAgICAgICAgICQoXCIuY29udGFpbmVyLS1pbm5lclwiKS50ZXh0KFwiXCIpXHJcbiAgICAgICAgICAgIGJ1aWxkRXZlbnRzLmV2ZW50RWRpdEZvcm0oc2luZ2xlRXZlbnQsIGN1cnJlbnRCdG5JZClcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZXZlbnRFZGl0Rm9ybShzaW5nbGVFdmVudE9iaikge1xyXG4gICAgLy8gYnVpbGRzIEVkaXQgZm9ybVxyXG4gICAgLy8gdGFrZXMgdGhlIHJldHVybiBmcm9tIHRoZSBmZXRjaFxyXG4gICAgbGV0IGRpdjIgPSBuZXcgY29tcC5kaXYoe1xyXG4gICAgICBjbGFzc0xpc3Q6IFwibmV3RXZlbnRGb3JtXCJcclxuICAgIH0sXHJcbiAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCJ9LCBcIkVkaXQgWW91ciBFdmVudFwiKSxcclxuICAgIG5ldyBjb21wLmxhYmVsKFwiRXZlbnQgTmFtZVwiKSxcclxuICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBgJHtzaW5nbGVFdmVudE9iai5uYW1lfWB9KSxcclxuICAgIG5ldyBjb21wLmxhYmVsKFwiRGF0ZVwiKSxcclxuICAgIG5ldyBjb21wLmlucHV0KHt0eXBlOiBcImRhdGVcIiwgdmFsdWU6IGAke3NpbmdsZUV2ZW50T2JqLmRhdGV9YH0pLFxyXG4gICAgbmV3IGNvbXAubGFiZWwoXCJUaW1lXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwidGltZVwiLCB2YWx1ZTogYCR7c2luZ2xlRXZlbnRPYmoudGltZX1gfSksXHJcbiAgICBuZXcgY29tcC5sYWJlbChcIkxvY2F0aW9uXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGAke3NpbmdsZUV2ZW50T2JqLmxvY2F0aW9ufWB9KSxcclxuICAgIG5ldyBjb21wLmJ0bihcIlNhdmVcIiksXHJcbiAgICBuZXcgY29tcC5idG4oXCJCYWNrXCIpKVxyXG4gIGRpdjIucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICBidWlsZEV2ZW50cy5lZGl0RXZlbnRQb3BVcEJ0bkNsaWNrcyhzaW5nbGVFdmVudE9iai5pZCk7XHJcbiAgfSxcclxuICBlZGl0RXZlbnRQb3BVcEJ0bkNsaWNrcyhpZCkge1xyXG4gICAgLy8gZ3JhYnMgdGhlIHR3byBidXR0b25zIG9uIHRoZSBwYWdlIGFuZCBhZGRzIGEgY2xpY2sgbGlzdGVuZXIgYmFzZWQgb24gaW5kZXhcclxuICAgIC8vIHRha2VzIHRoZSBldmVudCBpZCBzbyBpdCBjYW4gYmUgcGFzc2VkIG9uIHdpdGggdGhlIFBBVENIXHJcbiAgICBjb25zdCBwb3BVcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpO1xyXG4gICAgcG9wVXBCdG5zWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIC8vIFNhdmUgQnV0dG9uXHJcbiAgICAgIGNvbnN0IGlucHV0QXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XHJcbiAgICAgIC8vIGJ1aWxkcyBvYmplY3QgdG8gc2VuZCB0byBhcGlcclxuICAgICAgY29uc3QgZWRpdEV2ZW50T2JqID0ge1xyXG4gICAgICAgIG5hbWU6IGlucHV0QXJyYXlbMF0udmFsdWUsXHJcbiAgICAgICAgZGF0ZTogaW5wdXRBcnJheVsxXS52YWx1ZSxcclxuICAgICAgICB0aW1lOiBpbnB1dEFycmF5WzJdLnZhbHVlLFxyXG4gICAgICAgIGxvY2F0aW9uOiBpbnB1dEFycmF5WzNdLnZhbHVlLFxyXG4gICAgICAgIHVzZXJJZDogYWN0aXZlVXNlci5pbmZvKCkuaWRcclxuICAgICAgfVxyXG4gICAgICAvLyBzYXZlcyBuZXcgZXZlbnQgdG8gQVBJXHJcbiAgICAgIEFQSS51cGRhdGVJdGVtKFwiZXZlbnRzXCIsIGlkLCBlZGl0RXZlbnRPYmopLnRoZW4oKCkgPT4ge1xyXG4gICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTtcclxuICAgICB9KSB9KVxyXG5cclxuICAgIC8vIEJhY2sgQnV0dG9uIFJldHVybnMgdG8gRXZlbnQgUGFnZVxyXG4gICAgcG9wVXBCdG5zWzFdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgfSlcclxuICB9LFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRFdmVudHMiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxyXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXHJcblxyXG5jb25zdCBsYW5kaW5nUGFnZUZ1bmNzID0ge1xyXG4gIGxvYWRMYW5kaW5nUGFnZSgpIHtcclxuICAgIG5ldyBjb21wLmRpdihcclxuICAgICAgeyBjbGFzc0xpc3Q6IFwid2VsY29tZVwiIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIiB9LCBcIldlbGNvbWUgdG8gTWlzc2lvbiBDb250cm9sXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJMb2dpblwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiUmVnaXN0ZXJcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBsZXQgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIilcclxuXHJcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luXCIpIHtcclxuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGFuZGluZ1BhZ2VGdW5jcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IHJlZ2lzdGVyRnVuY3MgZnJvbSBcIi4vcmVnaXN0ZXJcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5jb25zdCBsb2dJbkZ1bmNzID0ge1xuICBjaGVja1VzZXIodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgaWYgKHVzZXJuYW1lID09PSBcIlwiIHx8IHBhc3N3b3JkID09PVwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiWW91IG11c3QgZW50ZXIgYm90aCB5b3VyIHVzZXJuYW1lIGFuZCBwYXNzd29yZCB0byBsb2cgaW4uXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlcm5hbWV9YCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYWxlcnQoXCJUaGVyZSBpcyBubyB1c2VyIHdpdGggdGhhdCB1c2VybmFtZS5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHBhc3N3b3JkID09PSBkYXRhWzBdLnBhc3N3b3JkKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlciAoZGF0YVswXSk7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRVc2VyO1xuICAgICAgICB9IGVsc2UgKCBhbGVydChcIllvdSBlbnRlcmVkIHRoZSB3cm9uZyBwYXNzd29yZC4gVHJ5IGFnYWluLlwiKSlcbiAgICAgIH0pLnRoZW4oY3VycmVudFVzZXIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VXNlcilcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkJ1aWxkIE1pc3Npb24gTG9naW5cIilcbiAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFVzZXIpKTtcbiAgICAgICAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbG9hZExvZ0luKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInVzZXJuYW1lXCIsIGlkOiBcInVzZXJuYW1lXCIsIHBsYWNlaG9sZGVyOiBcInVzZXJuYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJwYXNzd29yZFwiIH0sIFwiUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwicGFzc3dvcmRcIiwgaWQ6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIiB9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luIE5vd1wiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIk5vdCBhIHVzZXI/IENyZWF0ZSBuZXcgYWNjb3VudC5cIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luIE5vd1wiKSB7XG4gICAgICAgICAgdGhpcy5jaGVja1VzZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbG9nSW5GdW5jcyIsImltcG9ydCBsYW5kaW5nUGFnZUZ1bmNzIGZyb20gXCIuL2xhbmRpbmdcIlxyXG5pbXBvcnQgbmF2QmFyIGZyb20gXCIuL25hdlwiXHJcblxyXG5uYXZCYXIubG9hZE5hdkJhcigpO1xyXG5sYW5kaW5nUGFnZUZ1bmNzLmxvYWRMYW5kaW5nUGFnZSgpO1xyXG4iLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXG5pbXBvcnQgYWN0aXZlVXNlciBmcm9tIFwiLi9zZXNzaW9uU3RvcmFnZVwiXG5cblxuY29uc3QgYnVpbGRNZXNzYWdlcyA9IHtcbiAgcHJpbnRNZXNzYWdlcyhtZXNzYWdlT2JqKSB7XG4gICAgaWYgKGFjdGl2ZVVzZXIuaW5mbygpLmlkID09PSBtZXNzYWdlT2JqLnVzZXIuaWQpIHtcbiAgICAgIG5ldyBjb21wLnNlY3Rpb24oe1xuICAgICAgICAgIGNsYXNzTmFtZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgaWQ6IGAke21lc3NhZ2VPYmouaWR9YFxuICAgICAgICB9LFxuICAgICAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHttZXNzYWdlT2JqLnVzZXIucHJvZmlsZVBpY31gLCBjbGFzc05hbWU6IFwibWVzc2FnZVBpY1wiLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIn0pLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHtjbGFzc05hbWU6IFwibWVzc2FnZUF1dGhvclwifSwgYCR7bWVzc2FnZU9iai51c2VyLmZpcnN0TmFtZX0gLSAke21lc3NhZ2VPYmouZGF0ZX0gJHttZXNzYWdlT2JqLnRpbWVTdGFtcH1gKSxcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCksXG4gICAgICAgIG5ldyBjb21wLmJ0bihcIkVkaXRcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBjb21wLnNlY3Rpb24oe1xuICAgICAgICAgIGNsYXNzTmFtZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgaWQ6IGAke21lc3NhZ2VPYmouaWR9YFxuICAgICAgICB9LFxuICAgICAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHttZXNzYWdlT2JqLnVzZXIucHJvZmlsZVBpY31gLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIiwgY2xhc3NOYW1lOiBcIm1lc3NhZ2VQaWNcIn0pLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHtjbGFzc05hbWU6XCJtZXNzYWdlQXV0aG9yXCJ9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBtZXNzYWdlT2JqLm1lc3NhZ2VDb250ZW50KSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICB9XG4gIH0sXG5cbiAgbWVzc2FnZU1hcCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcIm1lc3NhZ2VzLz9fZXhwYW5kPXVzZXJcIilcbiAgICAgIC50aGVuKG1lc3NhZ2VPYmogPT4ge1xuXG4gICAgICAgIG1lc3NhZ2VPYmouZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgICB0aGlzLnByaW50TWVzc2FnZXMobWVzc2FnZSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5uZXdNZXNzYWdlKCk7XG4gICAgICAgIHRoaXMuc3VibWl0TWVzc2FnZSgpO1xuICAgICAgICB0aGlzLmVkaXRCdXR0b25DbGljaygpO1xuICAgICAgfSlcbiAgfSxcbiAgLy8gYnVpbGRzIG5ldyBtZXNzYWdlIGVudHJ5IGZpZWxkXG4gIG5ld01lc3NhZ2UoKSB7XG4gICAgLy93cmFwcGVkIHRoaXMgaW4gYSBkaXYgaW5zdGVhZCBvZiBhIHNlY3Rpb24sIHRvIGdyYWIgc2VjdGlvbnMgZWFzaWVyLlxuICAgIG5ldyBjb21wLmRpdih7XG4gICAgICAgIGNsYXNzTmFtZTogXCJuZXctLW1lc3NhZ2VcIixcbiAgICAgICAgaWQ6IFwibmV3TWVzc2FnZVwiXG4gICAgICB9LFxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgXCJOZXcgTWVzc2FnZVwiKSxcbiAgICAgIG5ldyBjb21wLnRleHRhcmVhKHtcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwidHlwZSB5b3VyIG1lc3NhZ2UgaGVyZVwiLFxuICAgICAgICB3cmFwOiBcImhhcmRcIlxuICAgICAgfSksXG4gICAgICBuZXcgY29tcC5idG4oXCJTdWJtaXRcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cblxuICBzdWJtaXRNZXNzYWdlKCkge1xuICAgICQoXCIjbmV3TWVzc2FnZSA+IGJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgLy9pZiBzdGF0bWVudCB0byBwcmV2ZW50IGJsYW5rIGVudHJpZXNcbiAgICAgIGlmICgkKFwiI25ld01lc3NhZ2UgPiB0ZXh0YXJlYVwiKS52YWwoKSA9PT0gXCJcIikge1xuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciB5b3VyIG1lc3NhZ2VcIilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAvL2NyZWF0ZXMgb2JqZWN0IG9mIGN1cnJlbnQgbW9tZW50XG4gICAgICAgIGxldCBkYXRlQW5kVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vY29udmVydHMgaXQgaW50byBhIHN0cmluZyBhbmQgdGhlbiBhbiBhcnJheSB0byBncmFiIHNwZWNpZmljIHZhbHVlc1xuICAgICAgICBsZXQgZGF0ZUFycmF5ID0gZGF0ZUFuZFRpbWUudG9TdHJpbmcoKS5zcGxpdChcIiBcIik7XG4gICAgICAgIC8vZ2V0TW9udGgoKSBtZXRob2QgcmV0dXJucyBhIG51bWJlciBiZXR3ZWVuIDAtMTEuIEFkZGVkIDEgdG8gZ2V0IGN1cnJlbnQgbW9udGhcbiAgICAgICAgbGV0IG1vbnRoID0gZGF0ZUFuZFRpbWUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgIC8vYnVpbGRzIG9iamVjdCB0byBwYXNzIGludG8gZmV0Y2hcbiAgICAgICAgbGV0IHN1Ym1pdE1lc3NhZ2VPYmogPSB7XG4gICAgICAgICAgbWVzc2FnZUNvbnRlbnQ6ICQoXCIjbmV3TWVzc2FnZSA+IHRleHRhcmVhXCIpLnZhbCgpLFxuICAgICAgICAgIHRpbWVTdGFtcDogZGF0ZUFycmF5WzRdLCAvL1RPRE86IG1ha2UgaXQgbm9uIG1pbGl0YXJ5IHRpbWVcbiAgICAgICAgICBkYXRlOiBgJHttb250aH0vJHtkYXRlQXJyYXlbMl19LyR7ZGF0ZUFycmF5WzNdfWAsXG4gICAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZFxuXG4gICAgICAgIH1cbiAgICAgICAgLy8gc2VuZCB0byBBUElcbiAgICAgICAgQVBJLnNhdmVJdGVtKFwibWVzc2FnZXNcIiwgc3VibWl0TWVzc2FnZU9iailcbiAgICAgICAgICAudGhlbigoKSA9PiBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGVkaXRCdXR0b25DbGljaygpIHtcbiAgICAvLyBncmFicyB0aGUgZWRpdCBidXR0b25zXG4gICAgJChcInNlY3Rpb24gPiBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgIC8vIHN0b3JlcyB0aGUgbWVzc2FnZSBpbiBhIHZhcmFibGVcbiAgICAgIGxldCBtZXNzYWdlSDEgPSBlLnRhcmdldC5wcmV2aW91c1NpYmxpbmdcbiAgICAgIC8vIHN0b3JlIG1lc3NhZ2UncyB0ZXh0IGluIGEgdmFyYWJsZVxuICAgICAgbGV0IG1lc3NhZ2VUZXh0ID0gbWVzc2FnZUgxLmlubmVySFRNTDtcbiAgICAgIC8vIHJlcGxhY2VzIEVkaXQgYnV0dG9uIHdpdGggU2F2ZSBidXR0b25cbiAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKFwiPGJ1dHRvbiBjbGFzcz0gJ2J0bicgdHlwZSA9J2J1dHRvbic+U2F2ZTwvYnV0dG9uPlwiKVxuICAgICAgLy8gcmVwbGFjZXMgbWVzc2FnZSB0ZXh0IHdpdGggYW4gaW5wdXQgZmllbGRcbiAgICAgICQobWVzc2FnZUgxKS5yZXBsYWNlV2l0aChgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQgPSBcImVkaXRGaWVsZFwiIHZhbHVlPVwiJHttZXNzYWdlVGV4dH1cIj5gKVxuICAgICAgLy8gc3RvcmVzIHRoZSBuZXcgaW5wdXQgZmllbGQgaW4gYSB2YXJhYmxlXG4gICAgICBjb25zdCBuZXdJbnB1dEZpZWxkID0gJChcIiNlZGl0RmllbGRcIik7XG4gICAgICAvLyBzZXRzIGEgY2xpY2sgZXZlbnQgb24gdGhlIG5ldyBzYXZlIGJ1dHRvblxuICAgICAgbmV3SW5wdXRGaWVsZC5uZXh0KCkuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gc3RvcmVzIGlucHV0IHZhbHVlIGluIGFuIG9iamVjdCB1cG9uIHNhdmUgY2xpY2tcbiAgICAgICAgY29uc3QgZWRpdGVkTWVzc2FnZVRleHRPYmogPSB7XG4gICAgICAgICAgbWVzc2FnZUNvbnRlbnQ6IG5ld0lucHV0RmllbGQudmFsKCksXG4gICAgICAgIH1cbiAgICAgICAgLy8gc2F2ZSBtZXNzYWdlIGlkICNcbiAgICAgICAgY29uc3QgZWRpdGVkTWVzc2FnZUlkID0gbmV3SW5wdXRGaWVsZC5wYXJlbnQoKS5hdHRyKFwiaWRcIilcbiAgICAgICAgLy8gUGF0Y2ggbWVzc2FnZSBpbiBzZXJ2ZXIgYW5kIHJlZnJlc2ggdGhlIG1lc3NhZ2VzIG9uIHRoZSBwYWdlXG4gICAgICAgIEFQSS51cGRhdGVJdGVtKFwibWVzc2FnZXNcIiwgZWRpdGVkTWVzc2FnZUlkLCBlZGl0ZWRNZXNzYWdlVGV4dE9iailcbiAgICAgICAgICAudGhlbigoKSA9PiBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE1lc3NhZ2VzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgYWN0aXZlVXNlciBmcm9tIFwiLi9zZXNzaW9uU3RvcmFnZVwiXG5cblxuXG5jb25zdCBidWlsZE1pc3Npb25Db250cm9sID0ge1xuICBwcmludFBsYWNlaG9sZGVyICgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gbnVsbDtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm1lc3NhZ2VcIiwgaWQ6IGAke2FjdGl2ZVVzZXIuaW5mbygpLmlkfWB9LFxuICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke2FjdGl2ZVVzZXIuaW5mbygpLnByb2ZpbGVQaWN9YCwgYWx0OiBcIlByb2ZpbGUgUGljXCIsIHN0eWxlOlwiZGlzcGxheTppbmxpbmUtYmxvY2s7IGJvcmRlci1yYWRpdXM6IDhweDsgbWFyZ2luOiA0cHhcIiwgaGVpZ2h0OiBcIjEyNVwiLCB3aWR0aDogXCIxMjVcIn0pLFxuICAgIG5ldyBjb21wLnRpdGxlKCBcImgyXCIsIHtzdHlsZTpcImRpc3BsYXk6IGlubGluZS1ibG9jazsgcG9zaXRpb246IHJlbGF0aXZlOyBib3R0b206IDEwcHhcIn0sIGAke2FjdGl2ZVVzZXIuaW5mbygpLmZpcnN0TmFtZX0gLSAke2FjdGl2ZVVzZXIuaW5mbygpLmxhc3ROYW1lfSAke2FjdGl2ZVVzZXIuaW5mbygpLnVzZXJuYW1lfWApLFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE1pc3Npb25Db250cm9sOyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxuaW1wb3J0IGJ1aWxkTWVzc2FnZXMgZnJvbSBcIi4vbWVzc2FnZXNcIjtcbmltcG9ydCBidWlsZE5ld3MgZnJvbSBcIi4vbmV3c1wiO1xuaW1wb3J0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgZnJvbSBcIi4vbWlzc2lvbkNvbnRyb2xcIjtcbmltcG9ydCBidWlsZFRhc2tzIGZyb20gXCIuL3Rhc2tzXCJcbmltcG9ydCBidWlsZEV2ZW50cyBmcm9tIFwiLi9ldmVudHNcIlxuXG5cbmNvbnN0IG5hdkJhciA9IHtcbiAgbG9hZE5hdkJhcigpIHtcbiAgICBuZXcgY29tcC51bChcbiAgICAgIHt9LFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiSG9tZVwiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIlRhc2tzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiRXZlbnRzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiTWVzc2FnZXNcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJOZXdzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiRnJpZW5kc1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkxvZyBPdXRcIilcbiAgICApLnJlbmRlcihcIiNuYXZCYXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2QmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiSG9tZVwiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJUYXNrc1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZFRhc2tzLmJ1aWxkQ29udGFpbmVycygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkV2ZW50c1wiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIk1lc3NhZ2VzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJOZXdzXCIpIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSA9PT0gbnVsbCl7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgbG9nZ2VkIGluLlwiKTtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICBidWlsZE5ld3MubmV3c01hcCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkZyaWVuZHNcIikge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpID09PSBudWxsKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBsb2dnZWQgaW4uXCIpO1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRnJpZW5kcyBmdW5jdGlvbiBjYWxsZXMuXCIpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTG9nIE91dFwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9nIE91dCBmdW5jdGlvbiBjYWxsZWQuXCIpO1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmF2QmFyIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHt9LCBgJHtuZXdzT2JqLmFydGljbGVOYW1lfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDRcIiwge30sIGBTYXZlZCBieTogJHtuZXdzT2JqLnVzZXIuZmlyc3ROYW1lfSB8IERhdGUgU2F2ZWQ6ICR7bmV3c09iai5kYXRlU2F2ZWR9YCksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbmV3c09iai5hYm91dCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgbmV3c01hcCAoKSAge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwiYXJ0aWNsZXMvP19leHBhbmQ9dXNlciZ1c2VyaWQ9X3NvcnQ9ZGF0ZVNhdmVkJl9vcmRlcj1kZXNjXCIpXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICB0aGlzLnByaW50TmV3cyhuZXdzKX0pKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5uZXdOZXdzKCkpXG5cbiAgfSxcblxuICBuZXdOZXdzICgpIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tbmV3c1wifSxcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7fSwgXCJTYXZlIE5ld3MgQXJ0aWNsZVwiKSxcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlTmFtZVwifSwgXCJBcnRpY2xlIE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIE5hbWVcIiwgaWQ6IFwiYXJ0aWNsZU5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZVVybFwifSwgXCJBcnRpY2xlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTGlua1wiLCBpZDogXCJhcnRpY2xlTGlua1wifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVJbWFnZVVybFwifSwgXCJBcnRpY2xlIEltYWdlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlSW1hZ2VVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIsIGlkOiBcImFydGljbGVJbWFnZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVEZXNjcmlwdGlvblwifSwgXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgRGVzY3JpcHRpb25cIiwgaWQ6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlNhdmUgTmV3IEFydGljbGVcIilcbiAgICApLFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICBsZXQgc3RvcnkgPSB7XG4gICAgICAgIGFydGljbGVOYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVOYW1lXCIpLnZhbHVlLFxuICAgICAgICB1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUxpbmtcIikudmFsdWUsXG4gICAgICAgIGFydGljbGVJbWFnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlSW1hZ2VcIikudmFsdWUsXG4gICAgICAgIGFib3V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVEZXNjcmlwdGlvblwiKS52YWx1ZSxcbiAgICAgICAgLypcbiAgICAgICAgTkVFRCBUTyBVUERBVEUgVVNFUiBJRCBUTyBTQVZFIFNFU1NJT04gQVNTSUdORUQgSURcbiAgICAgICAgKi9cbiAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8uaWQoKSxcbiAgICAgICAgZGF0ZVNhdmVkOiBuZXcgRGF0ZSgpXG4gICAgICB9XG4gICAgICBidWlsZE5ld3MuYWRkTmV3cyhzdG9yeSlcbiAgICB9KVxuICB9LFxuXG4gIGFkZE5ld3Moc3Rvcnkpe1xuICAgIEFQSS5zYXZlSXRlbShcImFydGljbGVzXCIsIHN0b3J5KS50aGVuKCgpPT4gdGhpcy5uZXdzTWFwKCkpXG4gIH1cblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE5ld3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5jb25zdCByZWdpc3RlckZ1bmNzID0ge1xuXG4gIGxvYWRSZWdpc3RlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJGaXJzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImZpcnN0TmFtZVwiLCBpZDogXCJmaXJzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiRmlyc3QgTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiTGFzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImxhc3ROYW1lXCIsIGlkOiBcImxhc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkxhc3QgTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRW1haWxcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwiZW1haWxcIiwgaWQ6IFwiZW1haWxcIiwgbmFtZTogXCJlbWFpbFwiLCBwbGFjZWhvbGRlcjogXCJlbWFpbFwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwidXNlcm5hbWVcIiwgaWQ6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcInBhc3N3b3JkXCIgfSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJwYXNzd29yZFwiLCBpZDogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwiY29uZmlybVBhc3N3b3JkXCIgfSwgXCJDb25maXJtIFBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImNvbmZpcm1QYXNzd29yZFwiLCBpZDogXCJjb25maXJtUGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiUmVnaXN0ZXIgQWNjb3VudFwiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkFscmVhZHkgYSB1c2VyPyBMb2cgaW4gbm93XCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJSZWdpc3RlciBBY2NvdW50XCIpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdE5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0TmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1QYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBjaGVjayB0byBlbnN1cmUgYWxsIGZpZWxkcyBhcmUgY29tcGxldGUuXG4gICAgICAgICAgICBhbGVydChcIkFsbCBmaWVsZHMgbXVzdCBiZSBjb21wbGV0ZSB0byBjcmVhdGUgYW4gYWNjb3VudC5cIilcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUuaW5kZXhPZihcIkBcIikgPT09IC0xKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgYSBjaGVjayBvbiB0aGUgZW1haWwgZmllbGQgdG8gbWFrZSBzdXJlIHRoZXJlIGlzIGFuIEAgcHJlc2VudFxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUGFzc3dvcmRcIikudmFsdWUpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY2hlY2sgdG8gbWFrZSBzdXJlIHBhc3N3b3JkcyBhcmUgdGhlIHNhbWUuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGxldCB0ZW1wVXNlciA9IHtcbiAgICAgICAgICAgICAgZmlyc3ROYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpcnN0TmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgbGFzdE5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIGVtYWlsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlLFxuICAgICAgICAgICAgICB1c2VybmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUsXG4gICAgICAgICAgICAgIC8vVGhpcyBpcyBhIHBsYWNlaG9sZGVyIHRvIGEgc3RvY2sgXCJubyBpbWFnZSBhdmFpbGFibGVcIiBpbWFnZSB0aGF0IHdlIGNhbiB1c2UgbGF0ZXIgZm9yIGFjdHVhbCB1c2VyIGltYWdlc1xuICAgICAgICAgICAgICBwcm9maWxlUGljOiBcImh0dHBzOi8vaHloYS54eXovd3AtY29udGVudC90aGVtZXMvZmFzaGlvbi9pbWFnZXMvbm9faW1hZ2VfYXZhaWxhYmxlLmpwZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz9lbWFpbD0ke3RlbXBVc2VyLmVtYWlsfWApLnRoZW4odGhpc0RhdGEgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpc0RhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1JlZ2lzdGVyKHRlbXBVc2VyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlRoaXMgZW1haWwgaXMgYWxyZWFkeSByZWdpc3RlcmVkLlwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7IGFsZXJ0KFwiWW91ciBwYXNzd29yZHMgZGlkIG5vdCBtYXRjaC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIikgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIGNoZWNrUmVnaXN0ZXIodXNlcikge1xuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlci51c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIEFQSS5zYXZlSXRlbShcInVzZXJzXCIsIHVzZXIpLnRoZW4obmV3VXNlciA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlcihuZXdVc2VyKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXJuYW1lIGNoZWNrUmVnaXN0ZXI6IFwiLCBjdXJyZW50VXNlcilcbiAgICAgICAgICAvL1RPRE86dGhlIGZ1bmN0aW9uIGJlbG93IG5lZWRzIHRvIGJlIHRoZSBjYWxsIHRvIGxvYWQgbWlzc2lvbiBjb250cm9sIHBhZ2UuXG4gICAgICAgICAgLy8gUmlnaHQgbm93IGl0IGlzIGp1c3Qgc2VuZGluZyB0byBhIGZ1bmN0aW9uIHRvIGNvbnNvbGUubG9nIHVzZXJcbiAgICAgICAgICB0aGlzLmxvYWRNaXNzaW9uKGN1cnJlbnRVc2VyKTtcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYWxlcnQoYFVzZXJuYW1lLCAke2RhdGFbMF0udXNlcm5hbWV9LCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuIFBsZWFzZSBjaG9vc2UgYW5vdGhlci5gKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLy9UT0RPOiB0aGlzIGZ1bmN0aW9uIGNhbiBnbyBhd2F5IHdoZW4gdGhlIGZ1bmN0aW9uIHRvIGxvYWQgbWlzc2lvbiBwYWdlIGlzIHJlcGxhY2VkIGluIGNoZWNrUmVnaXN0ZXIgZnVuY3Rpb24gYWJvdmVcbiAgbG9hZE1pc3Npb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckZ1bmNzIiwiLy8gc2NyaXB0cyByZWxhdGVkIHRvIHNlc3Npb25TdG9yYWdlXHJcblxyXG5jb25zdCBhY3RpdmVVc2VyID0ge1xyXG4gIGluZm8gKCkge1xyXG4gICAgbGV0IGxvZ2dlZEluVXNlciA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuY3VycmVudFVzZXIpO1xyXG4gICAgICByZXR1cm4gbG9nZ2VkSW5Vc2VyO1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZlVXNlcjtcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuaW1wb3J0IGFjdGl2ZVVzZXIgZnJvbSBcIi4vc2Vzc2lvblN0b3JhZ2VcIlxuXG5cbmNvbnN0IGJ1aWxkVGFza3MgPSB7XG5cbiAgLy9mdW5jdGlvbiBydW4gZmlyc3QgaW4gb3JkZXIgdG8gY2xlYXIgSFRNTCwgY3JlYXRlIHBhcmVudCBjb250YWluZXJzLCB0aGVuIGFkZCBuZXcgdGFzayBpbnB1dCBhbmQgY2FsbCBmZXRjaFxuICBidWlsZENvbnRhaW5lcnMgKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0taW5jb21wbGV0ZVwifSwgXCJJbmNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgbmV3IGNvbXAuZGl2ICh7aWQ6IFwiaW5jb21wbGV0ZVwifSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7Y2xhc3NOYW1lOiBcInRpdGxlLS1jb21wbGV0ZVwifSwgXCJDb21wbGV0ZSBUYXNrc1wiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIG5ldyBjb21wLmRpdiAoe2lkOiBcImNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIHRoaXMubmV3VGFzaygpXG4gICAgdGhpcy50YXNrc0ZldGNoKClcbiAgfSxcblxuICAvL3VzZWQgdG8gY3JlYXRlIGFuZCBhcHBlbmQgYWxsIHRhc2tzIGZyb20gZGF0YWJhc2UgdG8gRE9NXG4gIHByaW50VGFza3MgKHRhc2tzT2JqKSB7XG4gICAgbGV0IG91dHB1dENvbnRhaW5lcjtcblxuICAgIGlmICh0YXNrc09iai5jb21wbGV0ZSkge1xuICAgICAgb3V0cHV0Q29udGFpbmVyID0gXCIjY29tcGxldGVcIlxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNpbmNvbXBsZXRlXCJcbiAgICB9XG5cbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcInRhc2tcIiwgaWQ6IGAke3Rhc2tzT2JqLmlkfWB9LFxuICAgIG5ldyBjb21wLmNoZWNrYm94KCksXG4gICAgbmV3IGNvbXAucGFyKHtjbGFzc05hbWU6IFwiZWRpdGFibGUtLXRhc2tcIn0sIHRhc2tzT2JqLnRhc2spLFxuICAgIG5ldyBjb21wLnBhcih7Y2xhc3NOYW1lOiBcImVkaXRhYmxlLS1kYXRlXCJ9LCB0YXNrc09iai5kdWVEYXRlKSkucmVuZGVyKG91dHB1dENvbnRhaW5lcilcbiAgfSxcblxuICAvL2ZldGNoIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlLCBjYWxsIGNyZWF0ZS9hcHBlbmQgYW5kIGNhbGwgYWRkIGxpc3RlbmVyc1xuICB0YXNrc0ZldGNoICgpICB7XG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwidGFza3NcIikgLy9jaGVjayBpZiB1c2VyIGlzIHNhbWUgYXMgc2Vzc2lvbiBzdG9yYWdlXG4gICAgLnRoZW4odGFza3NPYmogPT4gIHtcbiAgICAgIHRhc2tzT2JqLmZvckVhY2godGFzayA9PiB7XG4gICAgICB0aGlzLnByaW50VGFza3ModGFzayl9KVxuICAgICAgdGhpcy5jYkxpc3RlbmVyKClcbiAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxuICAgIH0pXG4gIH0sXG5cbiAgLy9jaGVja2JveCBsaXN0ZW5lciB3aWxsIG1vdmUgdGFza3MgYmV0d2VlbiBjb21wbGV0ZSBhbmQgaW5jb21wbGV0ZSBjb250YWluZXJzXG4gIC8vZGF0YWJhc2UgXCJjb21wbGV0ZVwiIHByb3BlcnR5IHdpbGwgYmUgcGF0Y2hlZCBhY2NvcmRpbmdseSBhbmQgRE9NIHVwZGF0ZWRcbiAgY2JMaXN0ZW5lciAoKSB7XG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKVxuXG4gICAgLy9pZiB0aGUgaWQgb2YgdGhlIGdyYW5kcGFyZW50IGNvbnRhaW5lciBpcyAjY29tcGxldGUsIHRoZW4gY2hlY2sgdGhlIGJveFxuICAgIGNoZWNrYm94ZXMuZm9yRWFjaCggKGNoZWNrYm94KSA9PiB7XG4gICAgICBpZiAoY2hlY2tib3gucGFyZW50Tm9kZS5wYXJlbnROb2RlLmlkID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgbGV0IHBhdGNoUHJvcGVydHk7XG4gICAgICAgIC8vaWYgZmFsc2UgLT4gdHJ1ZVxuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgIHBhdGNoUHJvcGVydHkgPSB7Y29tcGxldGU6IHRydWV9XG4gICAgICAgICAgLy9wYXRjaCBcImNvbXBsZXRlXCIgcHJvcGVydHkgb2YgZGF0YWJhc2Ugb2JqZWN0IHVzaW5nIHBhcmVudE5vZGUgKHNlY3Rpb24pIElEIHRvIFRSVUVcbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy9pZiBjaGVja2JveCBpcyB1bmNoZWNrZWQuLi5cbiAgICAgICAgICBwYXRjaFByb3BlcnR5ID0ge2NvbXBsZXRlOiBmYWxzZX1cbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9LFxuXG4gIC8vZnVuY3Rpb24gdXNlZCB0byBlZGl0IHRhc2tzIGluIERPTSBhbmQgcGF0Y2ggbmV3IGluZm8gdG8gZGF0YWJhc2UgdGFzayBkZXNjcmlwdGlvbiBhbmQgZGF0ZVxuICBwYXJMaXN0ZW5lciAoKSB7XG4gICAgLy9nZXQgYWxsIHNlY3Rpb25zIG9uIHBhZ2VcbiAgICBsZXQgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VjdGlvblwiKVxuXG4gICAgLy8vYWRkIGNsaWNrIGxpc3RlbmVyIHRvIGFsbCBzZWN0aW9uc1xuICAgIHNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XG4gICAgICBzZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAvL2dldCBpZCBvZiB0YXJnZXQgc2VjdGlvblxuICAgICAgICBjb25zdCBpZCA9IGUudGFyZ2V0LnBhcmVudE5vZGUuaWRcblxuICAgICAgICAvL2lmIHBhcmFncmFwaCBjbGlja2VkIGlzIHRhc2sgZGVzY3JpcHRpb24sIGdldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgLy9jcmVhdGUgbmV3IDxpbnB1dD4gdGVtcGxhdGUgKHdpdGggIElEISkgYW5kIHJlcGxhY2UgPHA+IHdpdGggPGlucHV0PlxuICAgICAgICAvL2FkZCBhIGtleWRvd24gbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkZXNjcmlwdGlvbiB0byBkYXRhYmFzZSB3aGVuIEVOVEVSIGlzIHByZXNzZWRcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRhYmxlLS10YXNrXCIpKSB7XG4gICAgICAgICAgY29uc3QgdGFza05hbWUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxuICAgICAgICAgIGxldCB0ZW1wVGFza0lucHV0ID0gYDxpbnB1dCBpZD1cInRlbXAxXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGFza05hbWV9XCI+YFxuICAgICAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKHRlbXBUYXNrSW5wdXQpXG4gICAgICAgICAgY29uc3QgdGVtcElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMVwiKTtcbiAgICAgICAgICAgIHRlbXBJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoVGFzayA9IHt0YXNrOiB0ZW1wSW5wdXQudmFsdWV9XG4gICAgICAgICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBpZCwgcGF0Y2hUYXNrKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgLy9pZiBwYXJhZ3JhcGggY2xpY2tlZCBpcyB0YXNrIGR1ZSBkYXRlLCBnZXQgdGV4dCBjb250ZW50XG4gICAgICAgIC8vY3JlYXRlIG5ldyA8aW5wdXQ+IHRlbXBsYXRlICh3aXRoICBJRCEpIGFuZCByZXBsYWNlIDxwPiB3aXRoIDxpbnB1dD5cbiAgICAgICAgLy9hZGQgYSBjaGFuZ2UgbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkdWUgZGF0ZSB0byBkYXRhYmFzZSB3aGVuIG5ldyBkYXRlIGlzIHNlbGVjdGVkXG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGFibGUtLWRhdGVcIikpIHtcbiAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgbGV0IHRlbXBUYXNrRGF0ZSA9IGA8aW5wdXQgaWQ9XCJ0ZW1wMlwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke3Rhc2tEYXRlfVwiPmBcbiAgICAgICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aCh0ZW1wVGFza0RhdGUpXG4gICAgICAgICAgICBjb25zdCB0ZW1wRGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMlwiKTtcbiAgICAgICAgICAgIHRlbXBEYXRlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGNoRGF0ZSA9IHtkdWVEYXRlOiB0ZW1wRGF0ZUlucHV0LnZhbHVlfVxuICAgICAgICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgaWQsIHBhdGNoRGF0ZSlcbiAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgfSxcblxuICAvL2NyZWF0ZXMgbmV3IHRhc2sgaW5wdXQgZmllbGQgd2l0aCBhcHBlbmQgYnV0dG9uIGluc2lkZSBmaXJzdCBzZWN0aW9uIG9mIElOQ09NUExFVEUgY29udGFpbmVyXG4gIG5ld1Rhc2sgKCkge1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS10YXNrXCJ9LFxuICAgIG5ldyBjb21wLmJ0biAoXCIrXCIpLFxuICAgIG5ldyBjb21wLmlucHV0KHtpZDogXCJpbnB1dC0tdGFza1wiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwidHlwZSBuZXcgdGFzayBoZXJlXCJ9KSxcbiAgICBuZXcgY29tcC5pbnB1dCh7aWQ6IFwiaW5wdXQtLWRhdGVcIiwgdHlwZTogXCJkYXRlXCJ9KSkucmVuZGVyKFwiI2luY29tcGxldGVcIilcblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIilcbiAgICBjb25zdCBpbnB1dF90YXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC0tdGFza1wiKVxuICAgIGNvbnN0IGlucHV0X2RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LS1kYXRlXCIpXG5cbiAgICAvL2J1dHRvbiBjbGljayBwb3N0cyBuZXcgdGFzayB0byBkYXRhYmFzZSBhbmQgcmVzZXRzIG5ldyB0YXNrIGlucHV0IHN0cmluZ3NcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoaW5wdXRfdGFzay52YWx1ZSA9PT0gXCJcIiB8fCBpbnB1dF9kYXRlLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRhc2tJdGVtID0ge1xuICAgICAgICAgIHRhc2s6IGlucHV0X3Rhc2sudmFsdWUsXG4gICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgIGR1ZURhdGU6IGlucHV0X2RhdGUudmFsdWUsXG4gICAgICAgICAgLypcbiAgICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxuICAgICAgICAgICovXG4gICAgICAgICAgdXNlcklkOiBhY3RpdmVVc2VyLmluZm8oKS5pZCxcbiAgICAgICAgfVxuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJ0YXNrc1wiLCB0YXNrSXRlbSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLnByaW50VGFza3MoZGF0YSlcbiAgICAgICAgICB0aGlzLmNiTGlzdGVuZXIoKVxuICAgICAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxuICAgICAgICB9KVxuICAgICAgICBpbnB1dF90YXNrLnZhbHVlID0gXCJcIlxuICAgICAgICBpbnB1dF9kYXRlLnZhbHVlID0gXCJcIlxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRUYXNrcyJdfQ==
>>>>>>> master
