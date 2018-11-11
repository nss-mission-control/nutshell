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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let currentUser = 2;
const buildEvents = {
  buildContainers() {
    document.querySelector(".container--inner").innerHTML = "";
    const newBtn = new _components.default.div({
      id: "newEventBtn"
    }, new _components.default.btn("+")).render(".container--inner");
    const title1 = new _components.default.title("h1", {
      className: "title--upcoming"
    }, "Upcoming Event").render(".container--inner");
    const incomplete = new _components.default.div({
      id: "upcoming"
    }).render(".container--inner");
    const title2 = new _components.default.title("h1", {
      className: "title--past"
    }, "Past Event").render(".container--inner");
    const complete = new _components.default.div({
      id: "past"
    }).render(".container--inner"); // this.newTask()

    this.eventFetch();
    this.newEventButton();
  },

  printEvents(eventObj) {
    let outputContainer; // need to test if date is in the future or the past

    outputContainer = "#upcoming";
    const task = new _components.default.section({
      className: "event",
      id: `${eventObj.id}`
    }, new _components.default.title("h3", `${eventObj.name}`), new _components.default.par(`${eventObj.date} ${eventObj.time}`), new _components.default.par(`${eventObj.location}`)).render(outputContainer);
  },

  eventFetch() {
    _apiData.default.getAllCategory("events") //check if user is same as session storage
    .then(eventObj => {
      eventObj.forEach(event => {
        this.printEvents(event);
      });
    });
  },

  newEventButton() {
    // when clicked it clears the dom and calls the function to build the form
    $("#newEventBtn").click(function (e) {
      console.log("click,click");
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
      type: "text"
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
      const inputArray = document.querySelectorAll("input");
      console.log(inputArray);
      const newEventObj = {
        name: inputArray[0].value,
        date: inputArray[1].value,
        time: inputArray[2].value,
        location: inputArray[3].value,
        userId: currentUser
      };
      console.log(newEventObj);

      _apiData.default.saveItem("events", newEventObj).then(() => {
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

},{"./apiData":2,"./components":3}],5:[function(require,module,exports){
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
    let div2 = new _components.default.div({
      classList: "welcome"
    }, new _components.default.title("h1", {
      className: "title"
    }, "Welcome to Mission Control"), new _components.default.btn("Login"), new _components.default.btn("Register"));
    div2.render(".container--inner");
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

},{"./components":3,"./login":6,"./register":10}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _register = _interopRequireDefault(require("./register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logInFuncs = {
  loadLogIn() {
    document.querySelector(".container--inner").innerHTML = "";
    let logIn = new _components.default.form(new _components.default.label({}, "Username"), new _components.default.input({
      name: "username",
      placeholder: "username"
    }), new _components.default.label({
      for: "password"
    }, "Password"), new _components.default.input({
      name: "password",
      placeholder: "Password"
    }), new _components.default.btn("Login Now"), new _components.default.btn("Not a user? Create new account.")).render(".container--inner");
    document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", e => {
        if (e.target.textContent === "Login Now") {
          e.preventDefault();
          console.log("login now");
        } else {
          _register.default.loadRegister();
        }
      });
    });
  }

};
var _default = logInFuncs;
exports.default = _default;

},{"./components":3,"./register":10}],7:[function(require,module,exports){
"use strict";

var _components = _interopRequireDefault(require("./components"));

var _landing = _interopRequireDefault(require("./landing"));

var _messages = _interopRequireDefault(require("./messages"));

var _tasks = _interopRequireDefault(require("./tasks"));

var _news = _interopRequireDefault(require("./news"));

var _events = _interopRequireDefault(require("./events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// landingPageFuncs.loadLandingPage();
// buildMessages.messageMap();
// buildTasks.buildContainers();
// buildNews.newsMap()
_events.default.buildContainers();

},{"./components":3,"./events":4,"./landing":5,"./messages":8,"./news":9,"./tasks":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _apiData = _interopRequireDefault(require("./apiData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const currentUser = 3;
const buildMessages = {
  printMessages(messageObj) {
    if (currentUser === messageObj.user.id) {
      const message = new _components.default.section({
        className: "message",
        id: `${messageObj.id}`
      }, new _components.default.title("h2", {}, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`), new _components.default.title("h1", {}, messageObj.messageContent), new _components.default.btn("Edit")).render(".container--inner");
    } else {
      const message = new _components.default.section({
        className: "message",
        id: `${messageObj.id}`
      }, new _components.default.title("h2", {}, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`), new _components.default.title("h1", {}, messageObj.messageContent)).render(".container--inner");
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
    const newMessageField = new _components.default.div({
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
          userId: currentUser // send to API

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

},{"./apiData":2,"./components":3}],9:[function(require,module,exports){
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
    const news = new _components.default.section({
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

    _apiData.default.getAllCategory("articles/?_expand=user&_sort=dateSaved&_order=desc").then(newsObj => newsObj.forEach(news => {
      console.log(news);
      this.printNews(news);
    })).then(() => this.newNews());
  },

  newNews() {
    const newNews = new _components.default.section({
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

},{"./apiData":2,"./components":3}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _login = _interopRequireDefault(require("./login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerFuncs = {
  loadRegister() {
    document.querySelector(".container--inner").innerHTML = "";
    let register = new _components.default.form(new _components.default.label({}, "First Name"), new _components.default.input({
      name: "firstName",
      placeholder: "First Name"
    }), new _components.default.label({}, "Last Name"), new _components.default.input({
      name: "lastName",
      placeholder: "Last Name"
    }), new _components.default.label({}, "Email"), new _components.default.input({
      type: "email",
      name: "email",
      placeholder: "email"
    }), new _components.default.label({}, "Username"), new _components.default.input({
      name: "username",
      placeholder: "username"
    }), new _components.default.label({
      for: "password"
    }, "Password"), new _components.default.input({
      name: "password",
      placeholder: "Password"
    }), new _components.default.label({
      for: "confirmPassword"
    }, "Confirm Password"), new _components.default.input({
      name: "confirmPassword",
      placeholder: "Confirm Password"
    }), new _components.default.btn("Register Account"), new _components.default.btn("Already a user? Log in now")).render(".container--inner");
    document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", e => {
        if (e.target.textContent === "Register Account") {
          e.preventDefault();
          console.log("registering new account");
        } else {
          _login.default.loadLogIn();
        }
      });
    });
  }

};
var _default = registerFuncs;
exports.default = _default;

},{"./components":3,"./login":6}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _apiData = _interopRequireDefault(require("./apiData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildTasks = {
  //function run first in order to clear HTML, create parent containers, then add new task input and call fetch
  buildContainers() {
    document.querySelector(".container--inner").innerHTML = "";
    const title1 = new _components.default.title("h1", {
      className: "title--incomplete"
    }, "Incomplete Tasks").render(".container--inner");
    const incomplete = new _components.default.div({
      id: "incomplete"
    }).render(".container--inner");
    const title2 = new _components.default.title("h1", {
      className: "title--complete"
    }, "Complete Tasks").render(".container--inner");
    const complete = new _components.default.div({
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

    const task = new _components.default.section({
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
    const newTaskField = new _components.default.section({
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

},{"./apiData":2,"./components":3}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzLmpzIiwiLi4vc2NyaXB0cy9sYW5kaW5nLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMuanMiLCIuLi9zY3JpcHRzL25ld3MuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy90YXNrcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLE1BQU0sYUFBYSxHQUFHLE1BQU0sRUFBNUI7O0FBRUEsTUFBTSxZQUFOLENBQW1CO0FBQ2YsRUFBQSxXQUFXLENBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsR0FBRyxRQUF0QixFQUFnQztBQUN2QyxTQUFLLGFBQUwsSUFBc0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBdEI7QUFFQTs7Ozs7QUFJQSxRQUFJLE9BQU8sVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUNoQyxXQUFLLGFBQUwsRUFBb0IsV0FBcEIsR0FBa0MsVUFBbEM7QUFDQSxhQUFPLElBQVA7QUFDSCxLQUhELE1BR08sSUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDdkMsV0FBSyxhQUFMLElBQXNCLE1BQU0sQ0FBQyxNQUFQLENBQWMsS0FBSyxhQUFMLENBQWQsRUFBbUMsVUFBbkMsQ0FBdEI7QUFDSDs7QUFFRCxRQUFJLFFBQVEsQ0FBQyxNQUFiLEVBQXFCO0FBQ2pCLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3RCO0FBQ0EsWUFBSSxLQUFLLENBQUMsT0FBTixZQUF5QixNQUFNLENBQUMsT0FBcEMsRUFB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QSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0MsQ0FBRCxJQUFPO0FBQ3RDLFVBQUksVUFBVSxDQUFDLEtBQVgsS0FBcUIsRUFBckIsSUFBMkIsVUFBVSxDQUFDLEtBQVgsS0FBcUIsRUFBcEQsRUFBd0Q7QUFDdEQ7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJLFFBQVEsR0FBRztBQUNiLFVBQUEsSUFBSSxFQUFFLFVBQVUsQ0FBQyxLQURKO0FBRWIsVUFBQSxRQUFRLEVBQUUsS0FGRztBQUdiLFVBQUEsT0FBTyxFQUFFLFVBQVUsQ0FBQyxLQUhQOztBQUliOzs7QUFHQSxVQUFBLE1BQU0sRUFBRTtBQVBLLFNBQWY7O0FBU0EseUJBQUksUUFBSixDQUFhLE9BQWIsRUFBc0IsUUFBdEIsRUFBZ0MsSUFBaEMsQ0FBcUMsSUFBSSxJQUFJO0FBQzNDLGVBQUssVUFBTCxDQUFnQixJQUFoQjtBQUNBLGVBQUssVUFBTDtBQUNBLGVBQUssV0FBTDtBQUNELFNBSkQ7O0FBS0EsUUFBQSxVQUFVLENBQUMsS0FBWCxHQUFtQixFQUFuQjtBQUNBLFFBQUEsVUFBVSxDQUFDLEtBQVgsR0FBbUIsRUFBbkI7QUFDRDtBQUNGLEtBckJEO0FBc0JEOztBQXRKZ0IsQ0FBbkI7ZUF5SmUsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBlbGVtZW50U3ltYm9sID0gU3ltYm9sKClcblxuY2xhc3MgRE9NQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xuICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBJZiBgYXR0cmlidXRlc2AgaXMganVzdCBhIHN0cmluZywgaXQncyBhIHNpbXBsZSBlbGVtZW50IHdpdGggbm9cbiAgICAgICAgICAgIHByb3BlcnRpZXMgLSBqdXN0IHNvbWUgdGV4dCBjb250ZW50XG4gICAgICAgICovXG4gICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZXNcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0gPSBPYmplY3QuYXNzaWduKHRoaXNbZWxlbWVudFN5bWJvbF0sIGF0dHJpYnV0ZXMpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAvLyBPbmUgSFRNTEVsZW1lbnQgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5lbGVtZW50IGluc3RhbmNlb2Ygd2luZG93LkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS5hcHBlbmRDaGlsZChjaGlsZC5lbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuIGFycmF5IG9mIGVsZW1lbnRzIHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuZWxlbWVudC5mb3JFYWNoKGMgPT4gdGhpc1tlbGVtZW50U3ltYm9sXS5hcHBlbmRDaGlsZChjKSlcblxuICAgICAgICAgICAgICAgICAgICAvLyBTdHJpbmcgdmFsdWUgd2FzIHBhc3NlZCBpbiwgc2V0IHRleHQgY29udGVudFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBjaGlsZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGdldCBlbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbZWxlbWVudFN5bWJvbF1cbiAgICB9XG5cbiAgICByZW5kZXIoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRoaXNbZWxlbWVudFN5bWJvbF0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKS5hcHBlbmRDaGlsZChmcmFnbWVudClcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRE9NQ29tcG9uZW50XG4iLCJjb25zdCBVUkwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9cIlxuXG5jb25zdCBBUEkgPSB7XG4gIGdldEFsbENhdGVnb3J5KGNhdGVnb3J5KSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fWApXG4gICAgICAudGhlbihlbnRyaWVzID0+IGVudHJpZXMuanNvbigpKVxuICB9LFxuXG4gIGdldE9uZUZyb21DYXRlZ29yeShjYXRlZ29yeSwgaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9P2lkPSR7aWR9YClcbiAgICAgIC50aGVuKGlucHV0cyA9PiBpbnB1dHMuanNvbigpKVxuICB9LFxuXG4gIHNhdmVJdGVtKGNhdGVnb3J5LCBpdGVtKXtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgIH1cbiAgICApLnRoZW4oanNvbkRhdGEgPT4ganNvbkRhdGEuanNvbigpKVxuICB9LFxuXG4gIGRlbGV0ZUl0ZW0oY2F0ZWdvcnksIGlkKXtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9P2lkPSR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfVxuICAgIH1cbiAgICApXG4gIH0sXG5cbiAgdXBkYXRlSXRlbShjYXRlZ29yeSwgaWQsIGl0ZW0pe1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0vJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgIH1cbiAgICApXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBET01Db21wb25lbnQgZnJvbSBcIi4uL2xpYi9ub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKG51bGwsIHtcclxuICBkaXY6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBkaXYgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZGl2XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBidG46IHtcclxuICAgIHZhbHVlOiBjbGFzcyBidG4gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciggLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImJ1dHRvblwiLCB7Y2xhc3NOYW1lOiBcImJ0blwiLCB0eXBlOiBcImJ1dHRvblwifSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGlucHV0OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW5wdXQgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNlY3Rpb246IHtcclxuICAgIHZhbHVlOiBjbGFzcyBzZWN0aW9uIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInNlY3Rpb25cIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHRpdGxlOiB7IC8vZGVmaW5lIGFueSB0eXBlIG9mIGgjLi4gaDEsIGgyLCBldGMuXHJcbiAgICB2YWx1ZTogY2xhc3MgdGl0bGUgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYW5jaG9yOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYW5jaG9yIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImFcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNoZWNrYm94OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgY2hlY2tib3ggZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwge3R5cGU6IFwiY2hlY2tib3hcIiwgY2xhc3NOYW1lOiBcImNiXCJ9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW1hZ2U6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBpbWFnZSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbWdcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgdWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwidWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxpOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGkgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGlcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHZhbHVlOiBjbGFzcyBmb3JtIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImZvcm1cIix7fSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxhYmVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGFiZWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGFiZWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHRleHRhcmVhOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgdGV4dGFyZWEgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwidGV4dGFyZWFcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHBhcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHBhciBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJwXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KSIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxyXG5cclxubGV0IGN1cnJlbnRVc2VyID0gMjtcclxuXHJcblxyXG5jb25zdCBidWlsZEV2ZW50cyA9IHtcclxuXHJcbiAgYnVpbGRDb250YWluZXJzKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGNvbnN0IG5ld0J0biA9IG5ldyBjb21wLmRpdih7XHJcbiAgICAgICAgaWQ6IFwibmV3RXZlbnRCdG5cIlxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC5idG4oXCIrXCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG5cclxuXHJcbiAgICBjb25zdCB0aXRsZTEgPSBuZXcgY29tcC50aXRsZShcImgxXCIsIHtcclxuICAgICAgY2xhc3NOYW1lOiBcInRpdGxlLS11cGNvbWluZ1wiXHJcbiAgICB9LCBcIlVwY29taW5nIEV2ZW50XCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBjb25zdCBpbmNvbXBsZXRlID0gbmV3IGNvbXAuZGl2KHtcclxuICAgICAgaWQ6IFwidXBjb21pbmdcIlxyXG4gICAgfSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGNvbnN0IHRpdGxlMiA9IG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge1xyXG4gICAgICBjbGFzc05hbWU6IFwidGl0bGUtLXBhc3RcIlxyXG4gICAgfSwgXCJQYXN0IEV2ZW50XCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBjb25zdCBjb21wbGV0ZSA9IG5ldyBjb21wLmRpdih7XHJcbiAgICAgIGlkOiBcInBhc3RcIlxyXG4gICAgfSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIC8vIHRoaXMubmV3VGFzaygpXHJcbiAgICB0aGlzLmV2ZW50RmV0Y2goKTtcclxuICAgIHRoaXMubmV3RXZlbnRCdXR0b24oKTtcclxuICB9LFxyXG5cclxuICBwcmludEV2ZW50cyhldmVudE9iaikge1xyXG4gICAgbGV0IG91dHB1dENvbnRhaW5lcjtcclxuXHJcbiAgICAvLyBuZWVkIHRvIHRlc3QgaWYgZGF0ZSBpcyBpbiB0aGUgZnV0dXJlIG9yIHRoZSBwYXN0XHJcblxyXG4gICAgb3V0cHV0Q29udGFpbmVyID0gXCIjdXBjb21pbmdcIlxyXG4gICAgY29uc3QgdGFzayA9IG5ldyBjb21wLnNlY3Rpb24oe1xyXG4gICAgICAgIGNsYXNzTmFtZTogXCJldmVudFwiLFxyXG4gICAgICAgIGlkOiBgJHtldmVudE9iai5pZH1gXHJcbiAgICAgIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDNcIiwgYCR7ZXZlbnRPYmoubmFtZX1gKSxcclxuICAgICAgbmV3IGNvbXAucGFyKGAke2V2ZW50T2JqLmRhdGV9ICR7ZXZlbnRPYmoudGltZX1gKSxcclxuICAgICAgbmV3IGNvbXAucGFyKGAke2V2ZW50T2JqLmxvY2F0aW9ufWApKS5yZW5kZXIob3V0cHV0Q29udGFpbmVyKVxyXG4gIH0sXHJcblxyXG4gIGV2ZW50RmV0Y2goKSB7XHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJldmVudHNcIikgLy9jaGVjayBpZiB1c2VyIGlzIHNhbWUgYXMgc2Vzc2lvbiBzdG9yYWdlXHJcbiAgICAgIC50aGVuKGV2ZW50T2JqID0+IHtcclxuICAgICAgICBldmVudE9iai5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMucHJpbnRFdmVudHMoZXZlbnQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgbmV3RXZlbnRCdXR0b24oKSB7XHJcbiAgICAvLyB3aGVuIGNsaWNrZWQgaXQgY2xlYXJzIHRoZSBkb20gYW5kIGNhbGxzIHRoZSBmdW5jdGlvbiB0byBidWlsZCB0aGUgZm9ybVxyXG4gICAgJChcIiNuZXdFdmVudEJ0blwiKS5jbGljayhcclxuICAgICAgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrLGNsaWNrXCIpXHJcbiAgICAgICAgJChcIi5jb250YWluZXItLWlubmVyXCIpLnRleHQoXCJcIilcclxuICAgICAgICBidWlsZEV2ZW50cy5uZXdFdmVudFBvcFVwKCk7XHJcblxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfSxcclxuICBuZXdFdmVudFBvcFVwKCkge1xyXG4gICAgLy8gQnVpbGRzIG5ldyBldmVudCBlbnRyeSBmb3JtXHJcbiAgICBsZXQgZGl2MiA9IG5ldyBjb21wLmRpdih7XHJcbiAgICAgICAgY2xhc3NMaXN0OiBcIm5ld0V2ZW50Rm9ybVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge1xyXG4gICAgICAgIGNsYXNzTmFtZTogXCJ0aXRsZVwiXHJcbiAgICAgIH0sIFwiQWRkIEEgTmV3IEV2ZW50XCIpLFxyXG4gICAgICBuZXcgY29tcC5sYWJlbChcIkV2ZW50IE5hbWVcIiksXHJcbiAgICAgIG5ldyBjb21wLmlucHV0KHtcclxuICAgICAgICB0eXBlOiBcInRleHRcIlxyXG4gICAgICB9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJEYXRlXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7XHJcbiAgICAgICAgdHlwZTogXCJkYXRlXCJcclxuICAgICAgfSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiVGltZVwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoe1xyXG4gICAgICAgIHR5cGU6IFwidGV4dFwiXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgY29tcC5sYWJlbChcIkxvY2F0aW9uXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7XHJcbiAgICAgICAgdHlwZTogXCJ0ZXh0XCJcclxuICAgICAgfSksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIlNhdmVcIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkJhY2tcIikpXHJcbiAgICBkaXYyLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBidWlsZEV2ZW50cy5uZXdFdmVudFBvcFVwQnRuQ2xpY2tzKCk7XHJcbiAgfSxcclxuICBuZXdFdmVudFBvcFVwQnRuQ2xpY2tzKCkge1xyXG4gICAgLy8gZ3JhYnMgdGhlIHR3byBidXR0b25zIG9uIHRoZSBwYWdlIGFuZCBhZGRzIGEgY2xpY2sgbGlzdGVuZXIgYmFzZWQgb24gaW5kZXhcclxuICAgIGNvbnN0IHBvcFVwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIik7XHJcbiAgICBwb3BVcEJ0bnNbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgY29uc3QgaW5wdXRBcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcclxuICAgICAgY29uc29sZS5sb2coaW5wdXRBcnJheSk7XHJcbiAgICAgIGNvbnN0IG5ld0V2ZW50T2JqID0ge1xyXG4gICAgICAgIG5hbWU6IGlucHV0QXJyYXlbMF0udmFsdWUsXHJcbiAgICAgICAgZGF0ZTogaW5wdXRBcnJheVsxXS52YWx1ZSxcclxuICAgICAgICB0aW1lOiBpbnB1dEFycmF5WzJdLnZhbHVlLFxyXG4gICAgICAgIGxvY2F0aW9uOiBpbnB1dEFycmF5WzNdLnZhbHVlLFxyXG4gICAgICAgIHVzZXJJZDogY3VycmVudFVzZXJcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhuZXdFdmVudE9iaik7XHJcbiAgICAgIEFQSS5zYXZlSXRlbShcImV2ZW50c1wiLCBuZXdFdmVudE9iaikudGhlbigoKSA9PiB7XHJcbiAgICAgIGJ1aWxkRXZlbnRzLmJ1aWxkQ29udGFpbmVycygpO1xyXG4gICAgIH0pIH0pXHJcblxyXG4gICAgLy8gQmFjayBCdXR0b24gUmV0dXJucyB0byBFdmVudCBQYWdlXHJcbiAgICBwb3BVcEJ0bnNbMV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgYnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKCk7XHJcbiAgICB9KVxyXG5cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEV2ZW50cyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiXHJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcclxuXHJcbmNvbnN0IGxhbmRpbmdQYWdlRnVuY3MgPSB7XHJcbiAgbG9hZExhbmRpbmdQYWdlKCkge1xyXG4gICAgbGV0IGRpdjIgPSBuZXcgY29tcC5kaXYoXHJcbiAgICAgIHsgY2xhc3NMaXN0OiBcIndlbGNvbWVcIiB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCIgfSwgXCJXZWxjb21lIHRvIE1pc3Npb24gQ29udHJvbFwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiTG9naW5cIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIlJlZ2lzdGVyXCIpKVxyXG4gICAgZGl2Mi5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbGV0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpXHJcblxyXG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJMb2dpblwiKSB7XHJcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlZ2lzdGVyRnVuY3MubG9hZFJlZ2lzdGVyKClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhbmRpbmdQYWdlRnVuY3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcblxuY29uc3QgbG9nSW5GdW5jcyA9IHtcbiAgbG9hZExvZ0luKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBsZXQgbG9nSW4gPSBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcInBhc3N3b3JkXCJ9LCBcIlBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIn0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiTG9naW4gTm93XCIpLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiTm90IGEgdXNlcj8gQ3JlYXRlIG5ldyBhY2NvdW50LlwiKVxuICAgICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9naW4gTm93XCIpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luIG5vd1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBsb2dJbkZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBsYW5kaW5nUGFnZUZ1bmNzIGZyb20gXCIuL2xhbmRpbmdcIlxyXG5pbXBvcnQgYnVpbGRNZXNzYWdlcyBmcm9tIFwiLi9tZXNzYWdlc1wiXHJcbmltcG9ydCBidWlsZFRhc2tzIGZyb20gXCIuL3Rhc2tzXCJcclxuaW1wb3J0IGJ1aWxkTmV3cyBmcm9tIFwiLi9uZXdzXCJcclxuaW1wb3J0IGJ1aWxkRXZlbnRzIGZyb20gXCIuL2V2ZW50c1wiXHJcblxyXG4vLyBsYW5kaW5nUGFnZUZ1bmNzLmxvYWRMYW5kaW5nUGFnZSgpO1xyXG4vLyBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKTtcclxuLy8gYnVpbGRUYXNrcy5idWlsZENvbnRhaW5lcnMoKTtcclxuLy8gYnVpbGROZXdzLm5ld3NNYXAoKVxyXG5idWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTsiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcclxuXHJcbmNvbnN0IGN1cnJlbnRVc2VyID0gMztcclxuXHJcbmNvbnN0IGJ1aWxkTWVzc2FnZXMgPSB7XHJcbiAgcHJpbnRNZXNzYWdlcyhtZXNzYWdlT2JqKSB7XHJcbiAgICBpZiAoY3VycmVudFVzZXIgPT09IG1lc3NhZ2VPYmoudXNlci5pZCkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gbmV3IGNvbXAuc2VjdGlvbih7XHJcbiAgICAgICAgICBjbGFzc05hbWU6IFwibWVzc2FnZVwiLFxyXG4gICAgICAgICAgaWQ6IGAke21lc3NhZ2VPYmouaWR9YFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7fSwgYCR7bWVzc2FnZU9iai51c2VyLmZpcnN0TmFtZX0gLSAke21lc3NhZ2VPYmouZGF0ZX0gJHttZXNzYWdlT2JqLnRpbWVTdGFtcH1gKSxcclxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBtZXNzYWdlT2JqLm1lc3NhZ2VDb250ZW50KSxcclxuICAgICAgICBuZXcgY29tcC5idG4oXCJFZGl0XCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IG5ldyBjb21wLnNlY3Rpb24oe1xyXG4gICAgICAgICAgY2xhc3NOYW1lOiBcIm1lc3NhZ2VcIixcclxuICAgICAgICAgIGlkOiBgJHttZXNzYWdlT2JqLmlkfWBcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge30sIGAke21lc3NhZ2VPYmoudXNlci5maXJzdE5hbWV9IC0gJHttZXNzYWdlT2JqLmRhdGV9ICR7bWVzc2FnZU9iai50aW1lU3RhbXB9YCksXHJcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbWVzc2FnZU1hcCgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJtZXNzYWdlcy8/X2V4cGFuZD11c2VyXCIpXHJcbiAgICAgIC50aGVuKG1lc3NhZ2VPYmogPT4ge1xyXG5cclxuICAgICAgICBtZXNzYWdlT2JqLmZvckVhY2gobWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByaW50TWVzc2FnZXMobWVzc2FnZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMubmV3TWVzc2FnZSgpO1xyXG4gICAgICAgIHRoaXMuc3VibWl0TWVzc2FnZSgpO1xyXG4gICAgICAgIHRoaXMuZWRpdEJ1dHRvbkNsaWNrKCk7XHJcblxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgLy8gYnVpbGRzIG5ldyBtZXNzYWdlIGVudHJ5IGZpZWxkXHJcbiAgbmV3TWVzc2FnZSgpIHtcclxuICAgIC8vd3JhcHBlZCB0aGlzIGluIGEgZGl2IGluc3RlYWQgb2YgYSBzZWN0aW9uLCB0byBncmFiIHNlY3Rpb25zIGVhc2llci5cclxuICAgIGNvbnN0IG5ld01lc3NhZ2VGaWVsZCA9IG5ldyBjb21wLmRpdih7XHJcbiAgICAgICAgY2xhc3NOYW1lOiBcIm5ldy0tbWVzc2FnZVwiLFxyXG4gICAgICAgIGlkOiBcIm5ld01lc3NhZ2VcIlxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBcIk5ldyBNZXNzYWdlXCIpLFxyXG4gICAgICBuZXcgY29tcC50ZXh0YXJlYSh7XHJcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwidHlwZSB5b3VyIG1lc3NhZ2UgaGVyZVwiLFxyXG4gICAgICAgIHdyYXA6IFwiaGFyZFwiXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJTdWJtaXRcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgfSxcclxuXHJcbiAgc3VibWl0TWVzc2FnZSgpIHtcclxuICAgICQoXCIjbmV3TWVzc2FnZSA+IGJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAvL2lmIHN0YXRtZW50IHRvIHByZXZlbnQgYmxhbmsgZW50cmllc1xyXG4gICAgICBpZiAoJChcIiNuZXdNZXNzYWdlID4gdGV4dGFyZWFcIikudmFsKCkgPT09IFwiXCIpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciB5b3VyIG1lc3NhZ2VcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAvL2NyZWF0ZXMgb2JqZWN0IG9mIGN1cnJlbnQgbW9tZW50XHJcbiAgICAgICAgbGV0IGRhdGVBbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAvL2NvbnZlcnRzIGl0IGludG8gYSBzdHJpbmcgYW5kIHRoZW4gYW4gYXJyYXkgdG8gZ3JhYiBzcGVjaWZpYyB2YWx1ZXNcclxuICAgICAgICBsZXQgZGF0ZUFycmF5ID0gZGF0ZUFuZFRpbWUudG9TdHJpbmcoKS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgLy9nZXRNb250aCgpIG1ldGhvZCByZXR1cm5zIGEgbnVtYmVyIGJldHdlZW4gMC0xMS4gQWRkZWQgMSB0byBnZXQgY3VycmVudCBtb250aFxyXG4gICAgICAgIGxldCBtb250aCA9IGRhdGVBbmRUaW1lLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIC8vYnVpbGRzIG9iamVjdCB0byBwYXNzIGludG8gZmV0Y2hcclxuICAgICAgICBsZXQgc3VibWl0TWVzc2FnZU9iaiA9IHtcclxuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiAkKFwiI25ld01lc3NhZ2UgPiB0ZXh0YXJlYVwiKS52YWwoKSxcclxuICAgICAgICAgIHRpbWVTdGFtcDogZGF0ZUFycmF5WzRdLCAvL1RPRE86IG1ha2UgaXQgbm9uIG1pbGl0YXJ5IHRpbWVcclxuICAgICAgICAgIGRhdGU6IGAke21vbnRofS8ke2RhdGVBcnJheVsyXX0vJHtkYXRlQXJyYXlbM119YCxcclxuICAgICAgICAgIHVzZXJJZDogY3VycmVudFVzZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2VuZCB0byBBUElcclxuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJtZXNzYWdlc1wiLCBzdWJtaXRNZXNzYWdlT2JqKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgZWRpdEJ1dHRvbkNsaWNrKCkge1xyXG4gICAgLy8gZ3JhYnMgdGhlIGVkaXQgYnV0dG9uc1xyXG4gICAgJChcInNlY3Rpb24gPiBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgLy8gc3RvcmVzIHRoZSBtZXNzYWdlIGluIGEgdmFyYWJsZVxyXG4gICAgICBsZXQgbWVzc2FnZUgxID0gZS50YXJnZXQucHJldmlvdXNTaWJsaW5nXHJcbiAgICAgIC8vIHN0b3JlIG1lc3NhZ2UncyB0ZXh0IGluIGEgdmFyYWJsZVxyXG4gICAgICBsZXQgbWVzc2FnZVRleHQgPSBtZXNzYWdlSDEuaW5uZXJIVE1MO1xyXG4gICAgICAvLyByZXBsYWNlcyBFZGl0IGJ1dHRvbiB3aXRoIFNhdmUgYnV0dG9uXHJcbiAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKFwiPGJ1dHRvbiBjbGFzcz0gJ2J0bicgdHlwZSA9J2J1dHRvbic+U2F2ZTwvYnV0dG9uPlwiKVxyXG4gICAgICAvLyByZXBsYWNlcyBtZXNzYWdlIHRleHQgd2l0aCBhbiBpbnB1dCBmaWVsZFxyXG4gICAgICAkKG1lc3NhZ2VIMSkucmVwbGFjZVdpdGgoYDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkID0gXCJlZGl0RmllbGRcIiB2YWx1ZT1cIiR7bWVzc2FnZVRleHR9XCI+YClcclxuICAgICAgLy8gc3RvcmVzIHRoZSBuZXcgaW5wdXQgZmllbGQgaW4gYSB2YXJhYmxlXHJcbiAgICAgIGNvbnN0IG5ld0lucHV0RmllbGQgPSAkKFwiI2VkaXRGaWVsZFwiKTtcclxuICAgICAgLy8gc2V0cyBhIGNsaWNrIGV2ZW50IG9uIHRoZSBuZXcgc2F2ZSBidXR0b25cclxuICAgICAgbmV3SW5wdXRGaWVsZC5uZXh0KCkuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyBzdG9yZXMgaW5wdXQgdmFsdWUgaW4gYW4gb2JqZWN0IHVwb24gc2F2ZSBjbGlja1xyXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VUZXh0T2JqID0ge1xyXG4gICAgICAgICAgbWVzc2FnZUNvbnRlbnQ6IG5ld0lucHV0RmllbGQudmFsKCksXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNhdmUgbWVzc2FnZSBpZCAjXHJcbiAgICAgICAgY29uc3QgZWRpdGVkTWVzc2FnZUlkID0gbmV3SW5wdXRGaWVsZC5wYXJlbnQoKS5hdHRyKFwiaWRcIilcclxuICAgICAgICAvLyBQYXRjaCBtZXNzYWdlIGluIHNlcnZlciBhbmQgcmVmcmVzaCB0aGUgbWVzc2FnZXMgb24gdGhlIHBhZ2VcclxuICAgICAgICBBUEkudXBkYXRlSXRlbShcIm1lc3NhZ2VzXCIsIGVkaXRlZE1lc3NhZ2VJZCwgZWRpdGVkTWVzc2FnZVRleHRPYmopXHJcbiAgICAgICAgICAudGhlbigoKSA9PiBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZE1lc3NhZ2VzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcblxuICAgIGNvbnN0IG5ld3MgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHt9LCBgJHtuZXdzT2JqLmFydGljbGVOYW1lfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDRcIiwge30sIGBTYXZlZCBieTogJHtuZXdzT2JqLnVzZXIuZmlyc3ROYW1lfSB8IERhdGUgU2F2ZWQ6ICR7bmV3c09iai5kYXRlU2F2ZWR9YCksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbmV3c09iai5hYm91dCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgbmV3c01hcCAoKSAge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwiYXJ0aWNsZXMvP19leHBhbmQ9dXNlciZfc29ydD1kYXRlU2F2ZWQmX29yZGVyPWRlc2NcIilcbiAgICAudGhlbihuZXdzT2JqID0+IG5ld3NPYmouZm9yRWFjaChuZXdzID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKG5ld3MpO1xuICAgICAgdGhpcy5wcmludE5ld3MobmV3cyl9KSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMubmV3TmV3cygpKVxuXG4gIH0sXG5cbiAgbmV3TmV3cyAoKSB7XG4gICAgY29uc3QgbmV3TmV3cyA9IG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS1uZXdzXCJ9LFxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHt9LCBcIlNhdmUgTmV3cyBBcnRpY2xlXCIpLFxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVOYW1lXCJ9LCBcIkFydGljbGUgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVOYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTmFtZVwiLCBpZDogXCJhcnRpY2xlTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlVXJsXCJ9LCBcIkFydGljbGUgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBMaW5rXCIsIGlkOiBcImFydGljbGVMaW5rXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZUltYWdlVXJsXCJ9LCBcIkFydGljbGUgSW1hZ2UgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVJbWFnZVVybFwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIEltYWdlIExpbmtcIiwgaWQ6IFwiYXJ0aWNsZUltYWdlXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9LCBcIkFydGljbGUgRGVzY3JpcHRpb25cIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlRGVzY3JpcHRpb25cIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBEZXNjcmlwdGlvblwiLCBpZDogXCJhcnRpY2xlRGVzY3JpcHRpb25cIn0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiU2F2ZSBOZXcgQXJ0aWNsZVwiKVxuICAgICksXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgIGxldCBzdG9yeSA9IHtcbiAgICAgICAgYXJ0aWNsZU5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZU5hbWVcIikudmFsdWUsXG4gICAgICAgIHVybDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlTGlua1wiKS52YWx1ZSxcbiAgICAgICAgYXJ0aWNsZUltYWdlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVJbWFnZVwiKS52YWx1ZSxcbiAgICAgICAgYWJvdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZURlc2NyaXB0aW9uXCIpLnZhbHVlLFxuICAgICAgICAvKlxuICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxuICAgICAgICAqL1xuICAgICAgICB1c2VySWQ6IDIsXG4gICAgICAgIGRhdGVTYXZlZDogbmV3IERhdGUoKVxuICAgICAgfVxuICAgICAgYnVpbGROZXdzLmFkZE5ld3Moc3RvcnkpXG4gICAgfSlcbiAgfSxcblxuICBhZGROZXdzKHN0b3J5KXtcbiAgICBBUEkuc2F2ZUl0ZW0oXCJhcnRpY2xlc1wiLCBzdG9yeSkudGhlbigoKT0+IHRoaXMubmV3c01hcCgpKVxuICB9XG5cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGROZXdzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuXG5jb25zdCByZWdpc3RlckZ1bmNzID0ge1xuICBsb2FkUmVnaXN0ZXIoKXtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIGxldCByZWdpc3RlciA9IG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJGaXJzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiZmlyc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkZpcnN0IE5hbWVcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiTGFzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwibGFzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiTGFzdCBOYW1lXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkVtYWlsXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcImVtYWlsXCIsIG5hbWU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiZW1haWxcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcInBhc3N3b3JkXCJ9LCBcIlBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJjb25maXJtUGFzc3dvcmRcIn0sIFwiQ29uZmlybSBQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImNvbmZpcm1QYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJDb25maXJtIFBhc3N3b3JkXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlJlZ2lzdGVyIEFjY291bnRcIiksXG4gICAgICBuZXcgY29tcC5idG4oXCJBbHJlYWR5IGEgdXNlcj8gTG9nIGluIG5vd1wiKVxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJSZWdpc3RlciBBY2NvdW50XCIpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyaW5nIG5ldyBhY2NvdW50XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyRnVuY3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcclxuXHJcblxyXG5jb25zdCBidWlsZFRhc2tzID0ge1xyXG5cclxuICAvL2Z1bmN0aW9uIHJ1biBmaXJzdCBpbiBvcmRlciB0byBjbGVhciBIVE1MLCBjcmVhdGUgcGFyZW50IGNvbnRhaW5lcnMsIHRoZW4gYWRkIG5ldyB0YXNrIGlucHV0IGFuZCBjYWxsIGZldGNoXHJcbiAgYnVpbGRDb250YWluZXJzICgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBjb25zdCB0aXRsZTEgPSBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7Y2xhc3NOYW1lOiBcInRpdGxlLS1pbmNvbXBsZXRlXCJ9LCBcIkluY29tcGxldGUgVGFza3NcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGNvbnN0IGluY29tcGxldGUgPSBuZXcgY29tcC5kaXYgKHtpZDogXCJpbmNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgY29uc3QgdGl0bGUyID0gbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0tY29tcGxldGVcIn0sIFwiQ29tcGxldGUgVGFza3NcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGNvbnN0IGNvbXBsZXRlID0gbmV3IGNvbXAuZGl2ICh7aWQ6IFwiY29tcGxldGVcIn0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICB0aGlzLm5ld1Rhc2soKVxyXG4gICAgdGhpcy50YXNrc0ZldGNoKClcclxuICB9LFxyXG5cclxuICAvL3VzZWQgdG8gY3JlYXRlIGFuZCBhcHBlbmQgYWxsIHRhc2tzIGZyb20gZGF0YWJhc2UgdG8gRE9NXHJcbiAgcHJpbnRUYXNrcyAodGFza3NPYmopIHtcclxuICAgIGxldCBvdXRwdXRDb250YWluZXI7XHJcblxyXG4gICAgaWYgKHRhc2tzT2JqLmNvbXBsZXRlKSB7XHJcbiAgICAgIG91dHB1dENvbnRhaW5lciA9IFwiI2NvbXBsZXRlXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG91dHB1dENvbnRhaW5lciA9IFwiI2luY29tcGxldGVcIlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcInRhc2tcIiwgaWQ6IGAke3Rhc2tzT2JqLmlkfWB9LFxyXG4gICAgbmV3IGNvbXAuY2hlY2tib3goKSxcclxuICAgIG5ldyBjb21wLnBhcih7Y2xhc3NOYW1lOiBcImVkaXRhYmxlLS10YXNrXCJ9LCB0YXNrc09iai50YXNrKSxcclxuICAgIG5ldyBjb21wLnBhcih7Y2xhc3NOYW1lOiBcImVkaXRhYmxlLS1kYXRlXCJ9LCB0YXNrc09iai5kdWVEYXRlKSkucmVuZGVyKG91dHB1dENvbnRhaW5lcilcclxuICB9LFxyXG5cclxuICAvL2ZldGNoIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlLCBjYWxsIGNyZWF0ZS9hcHBlbmQgYW5kIGNhbGwgYWRkIGxpc3RlbmVyc1xyXG4gIHRhc2tzRmV0Y2ggKCkgIHtcclxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcInRhc2tzXCIpIC8vY2hlY2sgaWYgdXNlciBpcyBzYW1lIGFzIHNlc3Npb24gc3RvcmFnZVxyXG4gICAgLnRoZW4odGFza3NPYmogPT4gIHtcclxuICAgICAgdGFza3NPYmouZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgdGhpcy5wcmludFRhc2tzKHRhc2spfSlcclxuICAgICAgdGhpcy5jYkxpc3RlbmVyKClcclxuICAgICAgdGhpcy5wYXJMaXN0ZW5lcigpXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIC8vY2hlY2tib3ggbGlzdGVuZXIgd2lsbCBtb3ZlIHRhc2tzIGJldHdlZW4gY29tcGxldGUgYW5kIGluY29tcGxldGUgY29udGFpbmVyc1xyXG4gIC8vZGF0YWJhc2UgXCJjb21wbGV0ZVwiIHByb3BlcnR5IHdpbGwgYmUgcGF0Y2hlZCBhY2NvcmRpbmdseSBhbmQgRE9NIHVwZGF0ZWRcclxuICBjYkxpc3RlbmVyICgpIHtcclxuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIilcclxuXHJcbiAgICAvL2lmIHRoZSBpZCBvZiB0aGUgZ3JhbmRwYXJlbnQgY29udGFpbmVyIGlzICNjb21wbGV0ZSwgdGhlbiBjaGVjayB0aGUgYm94XHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goIChjaGVja2JveCkgPT4ge1xyXG4gICAgICBpZiAoY2hlY2tib3gucGFyZW50Tm9kZS5wYXJlbnROb2RlLmlkID09PSBcImNvbXBsZXRlXCIpIHtcclxuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICBsZXQgcGF0Y2hQcm9wZXJ0eTtcclxuICAgICAgICAvL2lmIGZhbHNlIC0+IHRydWVcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgcGF0Y2hQcm9wZXJ0eSA9IHtjb21wbGV0ZTogdHJ1ZX1cclxuICAgICAgICAgIC8vcGF0Y2ggXCJjb21wbGV0ZVwiIHByb3BlcnR5IG9mIGRhdGFiYXNlIG9iamVjdCB1c2luZyBwYXJlbnROb2RlIChzZWN0aW9uKSBJRCB0byBUUlVFXHJcbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9pZiBjaGVja2JveCBpcyB1bmNoZWNrZWQuLi5cclxuICAgICAgICAgIHBhdGNoUHJvcGVydHkgPSB7Y29tcGxldGU6IGZhbHNlfVxyXG4gICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWAsIHBhdGNoUHJvcGVydHkpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfSxcclxuXHJcbiAgLy9mdW5jdGlvbiB1c2VkIHRvIGVkaXQgdGFza3MgaW4gRE9NIGFuZCBwYXRjaCBuZXcgaW5mbyB0byBkYXRhYmFzZSB0YXNrIGRlc2NyaXB0aW9uIGFuZCBkYXRlXHJcbiAgcGFyTGlzdGVuZXIgKCkge1xyXG4gICAgLy9nZXQgYWxsIHNlY3Rpb25zIG9uIHBhZ2VcclxuICAgIGxldCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWN0aW9uXCIpXHJcblxyXG4gICAgLy8vYWRkIGNsaWNrIGxpc3RlbmVyIHRvIGFsbCBzZWN0aW9uc1xyXG4gICAgc2VjdGlvbnMuZm9yRWFjaChzZWN0aW9uID0+IHtcclxuICAgICAgc2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAvL2dldCBpZCBvZiB0YXJnZXQgc2VjdGlvblxyXG4gICAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQucGFyZW50Tm9kZS5pZFxyXG5cclxuICAgICAgICAvL2lmIHBhcmFncmFwaCBjbGlja2VkIGlzIHRhc2sgZGVzY3JpcHRpb24sIGdldCB0ZXh0IGNvbnRlbnRcclxuICAgICAgICAvL2NyZWF0ZSBuZXcgPGlucHV0PiB0ZW1wbGF0ZSAod2l0aCAgSUQhKSBhbmQgcmVwbGFjZSA8cD4gd2l0aCA8aW5wdXQ+XHJcbiAgICAgICAgLy9hZGQgYSBrZXlkb3duIGxpc3RlbmVyIHRvIHRoZSBpbnB1dCBhZnRlciBpdCBpcyBpbiBET00gYW5kXHJcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkZXNjcmlwdGlvbiB0byBkYXRhYmFzZSB3aGVuIEVOVEVSIGlzIHByZXNzZWRcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGFibGUtLXRhc2tcIikpIHtcclxuICAgICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZS50YXJnZXQudGV4dENvbnRlbnRcclxuICAgICAgICAgIGxldCB0ZW1wVGFza0lucHV0ID0gYDxpbnB1dCBpZD1cInRlbXAxXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGFza05hbWV9XCI+YFxyXG4gICAgICAgICAgJChlLnRhcmdldCkucmVwbGFjZVdpdGgodGVtcFRhc2tJbnB1dClcclxuICAgICAgICAgIGNvbnN0IHRlbXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcDFcIik7XHJcbiAgICAgICAgICAgIHRlbXBJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaFRhc2sgPSB7dGFzazogdGVtcElucHV0LnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBpZCwgcGF0Y2hUYXNrKVxyXG4gICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAvL2lmIHBhcmFncmFwaCBjbGlja2VkIGlzIHRhc2sgZHVlIGRhdGUsIGdldCB0ZXh0IGNvbnRlbnRcclxuICAgICAgICAvL2NyZWF0ZSBuZXcgPGlucHV0PiB0ZW1wbGF0ZSAod2l0aCAgSUQhKSBhbmQgcmVwbGFjZSA8cD4gd2l0aCA8aW5wdXQ+XHJcbiAgICAgICAgLy9hZGQgYSBjaGFuZ2UgbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcclxuICAgICAgICAvL3BhdGNoIHRoZSB0YXNrIGR1ZSBkYXRlIHRvIGRhdGFiYXNlIHdoZW4gbmV3IGRhdGUgaXMgc2VsZWN0ZWRcclxuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRhYmxlLS1kYXRlXCIpKSB7XHJcbiAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XHJcbiAgICAgICAgICBsZXQgdGVtcFRhc2tEYXRlID0gYDxpbnB1dCBpZD1cInRlbXAyXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7dGFza0RhdGV9XCI+YFxyXG4gICAgICAgICAgJChlLnRhcmdldCkucmVwbGFjZVdpdGgodGVtcFRhc2tEYXRlKVxyXG4gICAgICAgICAgICBjb25zdCB0ZW1wRGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMlwiKTtcclxuICAgICAgICAgICAgdGVtcERhdGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaERhdGUgPSB7ZHVlRGF0ZTogdGVtcERhdGVJbnB1dC52YWx1ZX1cclxuICAgICAgICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgaWQsIHBhdGNoRGF0ZSlcclxuICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9LFxyXG5cclxuICAvL2NyZWF0ZXMgbmV3IHRhc2sgaW5wdXQgZmllbGQgd2l0aCBhcHBlbmQgYnV0dG9uIGluc2lkZSBmaXJzdCBzZWN0aW9uIG9mIElOQ09NUExFVEUgY29udGFpbmVyXHJcbiAgbmV3VGFzayAoKSB7XHJcbiAgICBjb25zdCBuZXdUYXNrRmllbGQgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tdGFza1wifSxcclxuICAgIG5ldyBjb21wLmJ0biAoXCIrXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoe2lkOiBcImlucHV0LS10YXNrXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJ0eXBlIG5ldyB0YXNrIGhlcmVcIn0pLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoe2lkOiBcImlucHV0LS1kYXRlXCIsIHR5cGU6IFwiZGF0ZVwifSkpLnJlbmRlcihcIiNpbmNvbXBsZXRlXCIpXHJcblxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKVxyXG4gICAgY29uc3QgaW5wdXRfdGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtLXRhc2tcIilcclxuICAgIGNvbnN0IGlucHV0X2RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LS1kYXRlXCIpXHJcblxyXG4gICAgLy9idXR0b24gY2xpY2sgcG9zdHMgbmV3IHRhc2sgdG8gZGF0YWJhc2UgYW5kIHJlc2V0cyBuZXcgdGFzayBpbnB1dCBzdHJpbmdzXHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgIGlmIChpbnB1dF90YXNrLnZhbHVlID09PSBcIlwiIHx8IGlucHV0X2RhdGUudmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgdGFza0l0ZW0gPSB7XHJcbiAgICAgICAgICB0YXNrOiBpbnB1dF90YXNrLnZhbHVlLFxyXG4gICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxyXG4gICAgICAgICAgZHVlRGF0ZTogaW5wdXRfZGF0ZS52YWx1ZSxcclxuICAgICAgICAgIC8qXHJcbiAgICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxyXG4gICAgICAgICAgKi9cclxuICAgICAgICAgIHVzZXJJZDogMyxcclxuICAgICAgICB9XHJcbiAgICAgICAgQVBJLnNhdmVJdGVtKFwidGFza3NcIiwgdGFza0l0ZW0pLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByaW50VGFza3MoZGF0YSlcclxuICAgICAgICAgIHRoaXMuY2JMaXN0ZW5lcigpXHJcbiAgICAgICAgICB0aGlzLnBhckxpc3RlbmVyKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlucHV0X3Rhc2sudmFsdWUgPSBcIlwiXHJcbiAgICAgICAgaW5wdXRfZGF0ZS52YWx1ZSA9IFwiXCJcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkVGFza3MiXX0=
