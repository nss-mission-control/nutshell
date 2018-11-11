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
    let popUpBtns = document.querySelectorAll("button");
    popUpBtns[0].addEventListener("click", () => {
      buildEvents.buildContainers();
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzLmpzIiwiLi4vc2NyaXB0cy9sYW5kaW5nLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMuanMiLCIuLi9zY3JpcHRzL25ld3MuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy90YXNrcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLE1BQU0sYUFBYSxHQUFHLE1BQU0sRUFBNUI7O0FBRUEsTUFBTSxZQUFOLENBQW1CO0FBQ2YsRUFBQSxXQUFXLENBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsR0FBRyxRQUF0QixFQUFnQztBQUN2QyxTQUFLLGFBQUwsSUFBc0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBdEI7QUFFQTs7Ozs7QUFJQSxRQUFJLE9BQU8sVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUNoQyxXQUFLLGFBQUwsRUFBb0IsV0FBcEIsR0FBa0MsVUFBbEM7QUFDQSxhQUFPLElBQVA7QUFDSCxLQUhELE1BR08sSUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDdkMsV0FBSyxhQUFMLElBQXNCLE1BQU0sQ0FBQyxNQUFQLENBQWMsS0FBSyxhQUFMLENBQWQsRUFBbUMsVUFBbkMsQ0FBdEI7QUFDSDs7QUFFRCxRQUFJLFFBQVEsQ0FBQyxNQUFiLEVBQXFCO0FBQ2pCLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3RCO0FBQ0EsWUFBSSxLQUFLLENBQUMsT0FBTixZQUF5QixNQUFNLENBQUMsT0FBcEMsRUFB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bkI7QUFDQSxRQUFBLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLEVBQW5CO0FBQ0Q7QUFDRixLQXJCRDtBQXNCRDs7QUF0SmdCLENBQW5CO2VBeUplLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWxlbWVudFN5bWJvbCA9IFN5bWJvbCgpXG5cbmNsYXNzIERPTUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgSWYgYGF0dHJpYnV0ZXNgIGlzIGp1c3QgYSBzdHJpbmcsIGl0J3MgYSBzaW1wbGUgZWxlbWVudCB3aXRoIG5vXG4gICAgICAgICAgICBwcm9wZXJ0aWVzIC0ganVzdCBzb21lIHRleHQgY29udGVudFxuICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gT2JqZWN0LmFzc2lnbih0aGlzW2VsZW1lbnRTeW1ib2xdLCBhdHRyaWJ1dGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25lIEhUTUxFbGVtZW50IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoY2hpbGQuZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBbiBhcnJheSBvZiBlbGVtZW50cyB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVsZW1lbnQuZm9yRWFjaChjID0+IHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoYykpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nIHZhbHVlIHdhcyBwYXNzZWQgaW4sIHNldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2VsZW1lbnRTeW1ib2xdXG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzW2VsZW1lbnRTeW1ib2xdKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERPTUNvbXBvbmVudFxuIiwiY29uc3QgVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODgvXCJcblxuY29uc3QgQVBJID0ge1xuICBnZXRBbGxDYXRlZ29yeShjYXRlZ29yeSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gKVxuICAgICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBnZXRPbmVGcm9tQ2F0ZWdvcnkoY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWApXG4gICAgICAudGhlbihpbnB1dHMgPT4gaW5wdXRzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSXRlbShjYXRlZ29yeSwgaXRlbSl7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICB9XG4gICAgKS50aGVuKGpzb25EYXRhID0+IGpzb25EYXRhLmpzb24oKSlcbiAgfSxcblxuICBkZWxldGVJdGVtKGNhdGVnb3J5LCBpZCl7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9XG4gICAgKVxuICB9LFxuXG4gIHVwZGF0ZUl0ZW0oY2F0ZWdvcnksIGlkLCBpdGVtKXtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9LyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICB9XG4gICAgKVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgRE9NQ29tcG9uZW50IGZyb20gXCIuLi9saWIvbm9kZV9tb2R1bGVzL25zcy1kb21jb21wb25lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmNyZWF0ZShudWxsLCB7XHJcbiAgZGl2OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgZGl2IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImRpdlwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnRuOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYnRuIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJidG5cIiwgdHlwZTogXCJidXR0b25cIn0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbnB1dDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGlucHV0IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZWN0aW9uOiB7XHJcbiAgICB2YWx1ZTogY2xhc3Mgc2VjdGlvbiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJzZWN0aW9uXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0aXRsZTogeyAvL2RlZmluZSBhbnkgdHlwZSBvZiBoIy4uIGgxLCBoMiwgZXRjLlxyXG4gICAgdmFsdWU6IGNsYXNzIHRpdGxlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGFuY2hvcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGFuY2hvciBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGVja2JveDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGNoZWNrYm94IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIHt0eXBlOiBcImNoZWNrYm94XCIsIGNsYXNzTmFtZTogXCJjYlwifSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGltYWdlOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW1hZ2UgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW1nXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsaToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxpIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxpXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgZm9ybSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJmb3JtXCIse30sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsYWJlbDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxhYmVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxhYmVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0ZXh0YXJlYToge1xyXG4gICAgdmFsdWU6IGNsYXNzIHRleHRhcmVhIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInRleHRhcmVhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBwYXI6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBwYXIgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwicFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSkiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcclxuXHJcbmxldCBjdXJyZW50VXNlciA9IDI7XHJcblxyXG5cclxuY29uc3QgYnVpbGRFdmVudHMgPSB7XHJcblxyXG4gIGJ1aWxkQ29udGFpbmVycygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBjb25zdCBuZXdCdG4gPSBuZXcgY29tcC5kaXYoe1xyXG4gICAgICAgIGlkOiBcIm5ld0V2ZW50QnRuXCJcclxuICAgICAgfSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiK1wiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuXHJcblxyXG4gICAgY29uc3QgdGl0bGUxID0gbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7XHJcbiAgICAgIGNsYXNzTmFtZTogXCJ0aXRsZS0tdXBjb21pbmdcIlxyXG4gICAgfSwgXCJVcGNvbWluZyBFdmVudFwiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgY29uc3QgaW5jb21wbGV0ZSA9IG5ldyBjb21wLmRpdih7XHJcbiAgICAgIGlkOiBcInVwY29taW5nXCJcclxuICAgIH0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBjb25zdCB0aXRsZTIgPSBuZXcgY29tcC50aXRsZShcImgxXCIsIHtcclxuICAgICAgY2xhc3NOYW1lOiBcInRpdGxlLS1wYXN0XCJcclxuICAgIH0sIFwiUGFzdCBFdmVudFwiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgY29uc3QgY29tcGxldGUgPSBuZXcgY29tcC5kaXYoe1xyXG4gICAgICBpZDogXCJwYXN0XCJcclxuICAgIH0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICAvLyB0aGlzLm5ld1Rhc2soKVxyXG4gICAgdGhpcy5ldmVudEZldGNoKCk7XHJcbiAgICB0aGlzLm5ld0V2ZW50QnV0dG9uKCk7XHJcbiAgfSxcclxuXHJcbiAgcHJpbnRFdmVudHMoZXZlbnRPYmopIHtcclxuICAgIGxldCBvdXRwdXRDb250YWluZXI7XHJcblxyXG4gICAgLy8gbmVlZCB0byB0ZXN0IGlmIGRhdGUgaXMgaW4gdGhlIGZ1dHVyZSBvciB0aGUgcGFzdFxyXG5cclxuICAgIG91dHB1dENvbnRhaW5lciA9IFwiI3VwY29taW5nXCJcclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgY29tcC5zZWN0aW9uKHtcclxuICAgICAgICBjbGFzc05hbWU6IFwiZXZlbnRcIixcclxuICAgICAgICBpZDogYCR7ZXZlbnRPYmouaWR9YFxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgzXCIsIGAke2V2ZW50T2JqLm5hbWV9YCksXHJcbiAgICAgIG5ldyBjb21wLnBhcihgJHtldmVudE9iai5kYXRlfSAke2V2ZW50T2JqLnRpbWV9YCksXHJcbiAgICAgIG5ldyBjb21wLnBhcihgJHtldmVudE9iai5sb2NhdGlvbn1gKSkucmVuZGVyKG91dHB1dENvbnRhaW5lcilcclxuICB9LFxyXG5cclxuICBldmVudEZldGNoKCkge1xyXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwiZXZlbnRzXCIpIC8vY2hlY2sgaWYgdXNlciBpcyBzYW1lIGFzIHNlc3Npb24gc3RvcmFnZVxyXG4gICAgICAudGhlbihldmVudE9iaiA9PiB7XHJcbiAgICAgICAgZXZlbnRPYmouZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByaW50RXZlbnRzKGV2ZW50KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICB9KVxyXG4gIH0sXHJcblxyXG4gIG5ld0V2ZW50QnV0dG9uKCkge1xyXG4gICAgLy8gd2hlbiBjbGlja2VkIGl0IGNsZWFycyB0aGUgZG9tIGFuZCBjYWxscyB0aGUgZnVuY3Rpb24gdG8gYnVpbGQgdGhlIGZvcm1cclxuICAgICQoXCIjbmV3RXZlbnRCdG5cIikuY2xpY2soXHJcbiAgICAgIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGljayxjbGlja1wiKVxyXG4gICAgICAgICQoXCIuY29udGFpbmVyLS1pbm5lclwiKS50ZXh0KFwiXCIpXHJcbiAgICAgICAgYnVpbGRFdmVudHMubmV3RXZlbnRQb3BVcCgpO1xyXG5cclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH0sXHJcbiAgbmV3RXZlbnRQb3BVcCgpIHtcclxuICAgIC8vIEJ1aWxkcyBuZXcgZXZlbnQgZW50cnkgZm9ybVxyXG4gICAgbGV0IGRpdjIgPSBuZXcgY29tcC5kaXYoe1xyXG4gICAgICAgIGNsYXNzTGlzdDogXCJuZXdFdmVudEZvcm1cIlxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHtcclxuICAgICAgICBjbGFzc05hbWU6IFwidGl0bGVcIlxyXG4gICAgICB9LCBcIkFkZCBBIE5ldyBFdmVudFwiKSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJFdmVudCBOYW1lXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7XHJcbiAgICAgICAgdHlwZTogXCJ0ZXh0XCJcclxuICAgICAgfSksXHJcbiAgICAgIG5ldyBjb21wLmxhYmVsKFwiRGF0ZVwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoe1xyXG4gICAgICAgIHR5cGU6IFwiZGF0ZVwiXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgY29tcC5sYWJlbChcIlRpbWVcIiksXHJcbiAgICAgIG5ldyBjb21wLmlucHV0KHtcclxuICAgICAgICB0eXBlOiBcInRleHRcIlxyXG4gICAgICB9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJMb2NhdGlvblwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoe1xyXG4gICAgICAgIHR5cGU6IFwidGV4dFwiXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJTYXZlXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJCYWNrXCIpKVxyXG4gICAgZGl2Mi5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgYnVpbGRFdmVudHMubmV3RXZlbnRQb3BVcEJ0bkNsaWNrcygpO1xyXG4gIH0sXHJcbiAgbmV3RXZlbnRQb3BVcEJ0bkNsaWNrcygpIHtcclxuICAgIC8vIGdyYWJzIHRoZSB0d28gYnV0dG9ucyBvbiB0aGUgcGFnZSBhbmQgYWRkcyBhIGNsaWNrIGxpc3RlbmVyIGJhc2VkIG9uIGluZGV4XHJcbiAgICBsZXQgcG9wVXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKTtcclxuICAgIHBvcFVwQnRuc1swXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBidWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTtcclxuICAgIH0pXHJcbiAgICBwb3BVcEJ0bnNbMV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgYnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKCk7XHJcbiAgICB9KVxyXG5cclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEV2ZW50cyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiXHJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcclxuXHJcbmNvbnN0IGxhbmRpbmdQYWdlRnVuY3MgPSB7XHJcbiAgbG9hZExhbmRpbmdQYWdlKCkge1xyXG4gICAgbGV0IGRpdjIgPSBuZXcgY29tcC5kaXYoXHJcbiAgICAgIHsgY2xhc3NMaXN0OiBcIndlbGNvbWVcIiB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCIgfSwgXCJXZWxjb21lIHRvIE1pc3Npb24gQ29udHJvbFwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiTG9naW5cIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIlJlZ2lzdGVyXCIpKVxyXG4gICAgZGl2Mi5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbGV0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpXHJcblxyXG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJMb2dpblwiKSB7XHJcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlZ2lzdGVyRnVuY3MubG9hZFJlZ2lzdGVyKClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhbmRpbmdQYWdlRnVuY3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcblxuY29uc3QgbG9nSW5GdW5jcyA9IHtcbiAgbG9hZExvZ0luKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBsZXQgbG9nSW4gPSBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcInBhc3N3b3JkXCJ9LCBcIlBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIn0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiTG9naW4gTm93XCIpLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiTm90IGEgdXNlcj8gQ3JlYXRlIG5ldyBhY2NvdW50LlwiKVxuICAgICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9naW4gTm93XCIpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luIG5vd1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBsb2dJbkZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBsYW5kaW5nUGFnZUZ1bmNzIGZyb20gXCIuL2xhbmRpbmdcIlxyXG5pbXBvcnQgYnVpbGRNZXNzYWdlcyBmcm9tIFwiLi9tZXNzYWdlc1wiXHJcbmltcG9ydCBidWlsZFRhc2tzIGZyb20gXCIuL3Rhc2tzXCJcclxuaW1wb3J0IGJ1aWxkTmV3cyBmcm9tIFwiLi9uZXdzXCJcclxuaW1wb3J0IGJ1aWxkRXZlbnRzIGZyb20gXCIuL2V2ZW50c1wiXHJcblxyXG4vLyBsYW5kaW5nUGFnZUZ1bmNzLmxvYWRMYW5kaW5nUGFnZSgpO1xyXG4vLyBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKTtcclxuLy8gYnVpbGRUYXNrcy5idWlsZENvbnRhaW5lcnMoKTtcclxuLy8gYnVpbGROZXdzLm5ld3NNYXAoKVxyXG5idWlsZEV2ZW50cy5idWlsZENvbnRhaW5lcnMoKTsiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcclxuXHJcbmNvbnN0IGN1cnJlbnRVc2VyID0gMztcclxuXHJcbmNvbnN0IGJ1aWxkTWVzc2FnZXMgPSB7XHJcbiAgcHJpbnRNZXNzYWdlcyhtZXNzYWdlT2JqKSB7XHJcbiAgICBpZiAoY3VycmVudFVzZXIgPT09IG1lc3NhZ2VPYmoudXNlci5pZCkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gbmV3IGNvbXAuc2VjdGlvbih7XHJcbiAgICAgICAgICBjbGFzc05hbWU6IFwibWVzc2FnZVwiLFxyXG4gICAgICAgICAgaWQ6IGAke21lc3NhZ2VPYmouaWR9YFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7fSwgYCR7bWVzc2FnZU9iai51c2VyLmZpcnN0TmFtZX0gLSAke21lc3NhZ2VPYmouZGF0ZX0gJHttZXNzYWdlT2JqLnRpbWVTdGFtcH1gKSxcclxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBtZXNzYWdlT2JqLm1lc3NhZ2VDb250ZW50KSxcclxuICAgICAgICBuZXcgY29tcC5idG4oXCJFZGl0XCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IG5ldyBjb21wLnNlY3Rpb24oe1xyXG4gICAgICAgICAgY2xhc3NOYW1lOiBcIm1lc3NhZ2VcIixcclxuICAgICAgICAgIGlkOiBgJHttZXNzYWdlT2JqLmlkfWBcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge30sIGAke21lc3NhZ2VPYmoudXNlci5maXJzdE5hbWV9IC0gJHttZXNzYWdlT2JqLmRhdGV9ICR7bWVzc2FnZU9iai50aW1lU3RhbXB9YCksXHJcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbWVzc2FnZU1hcCgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJtZXNzYWdlcy8/X2V4cGFuZD11c2VyXCIpXHJcbiAgICAgIC50aGVuKG1lc3NhZ2VPYmogPT4ge1xyXG5cclxuICAgICAgICBtZXNzYWdlT2JqLmZvckVhY2gobWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByaW50TWVzc2FnZXMobWVzc2FnZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMubmV3TWVzc2FnZSgpO1xyXG4gICAgICAgIHRoaXMuc3VibWl0TWVzc2FnZSgpO1xyXG4gICAgICAgIHRoaXMuZWRpdEJ1dHRvbkNsaWNrKCk7XHJcblxyXG4gICAgICB9KVxyXG4gIH0sXHJcbiAgLy8gYnVpbGRzIG5ldyBtZXNzYWdlIGVudHJ5IGZpZWxkXHJcbiAgbmV3TWVzc2FnZSgpIHtcclxuICAgIC8vd3JhcHBlZCB0aGlzIGluIGEgZGl2IGluc3RlYWQgb2YgYSBzZWN0aW9uLCB0byBncmFiIHNlY3Rpb25zIGVhc2llci5cclxuICAgIGNvbnN0IG5ld01lc3NhZ2VGaWVsZCA9IG5ldyBjb21wLmRpdih7XHJcbiAgICAgICAgY2xhc3NOYW1lOiBcIm5ldy0tbWVzc2FnZVwiLFxyXG4gICAgICAgIGlkOiBcIm5ld01lc3NhZ2VcIlxyXG4gICAgICB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHt9LCBcIk5ldyBNZXNzYWdlXCIpLFxyXG4gICAgICBuZXcgY29tcC50ZXh0YXJlYSh7XHJcbiAgICAgICAgcGxhY2Vob2xkZXI6IFwidHlwZSB5b3VyIG1lc3NhZ2UgaGVyZVwiLFxyXG4gICAgICAgIHdyYXA6IFwiaGFyZFwiXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJTdWJtaXRcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgfSxcclxuXHJcbiAgc3VibWl0TWVzc2FnZSgpIHtcclxuICAgICQoXCIjbmV3TWVzc2FnZSA+IGJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAvL2lmIHN0YXRtZW50IHRvIHByZXZlbnQgYmxhbmsgZW50cmllc1xyXG4gICAgICBpZiAoJChcIiNuZXdNZXNzYWdlID4gdGV4dGFyZWFcIikudmFsKCkgPT09IFwiXCIpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciB5b3VyIG1lc3NhZ2VcIilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAvL2NyZWF0ZXMgb2JqZWN0IG9mIGN1cnJlbnQgbW9tZW50XHJcbiAgICAgICAgbGV0IGRhdGVBbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAvL2NvbnZlcnRzIGl0IGludG8gYSBzdHJpbmcgYW5kIHRoZW4gYW4gYXJyYXkgdG8gZ3JhYiBzcGVjaWZpYyB2YWx1ZXNcclxuICAgICAgICBsZXQgZGF0ZUFycmF5ID0gZGF0ZUFuZFRpbWUudG9TdHJpbmcoKS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgLy9nZXRNb250aCgpIG1ldGhvZCByZXR1cm5zIGEgbnVtYmVyIGJldHdlZW4gMC0xMS4gQWRkZWQgMSB0byBnZXQgY3VycmVudCBtb250aFxyXG4gICAgICAgIGxldCBtb250aCA9IGRhdGVBbmRUaW1lLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIC8vYnVpbGRzIG9iamVjdCB0byBwYXNzIGludG8gZmV0Y2hcclxuICAgICAgICBsZXQgc3VibWl0TWVzc2FnZU9iaiA9IHtcclxuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiAkKFwiI25ld01lc3NhZ2UgPiB0ZXh0YXJlYVwiKS52YWwoKSxcclxuICAgICAgICAgIHRpbWVTdGFtcDogZGF0ZUFycmF5WzRdLCAvL1RPRE86IG1ha2UgaXQgbm9uIG1pbGl0YXJ5IHRpbWVcclxuICAgICAgICAgIGRhdGU6IGAke21vbnRofS8ke2RhdGVBcnJheVsyXX0vJHtkYXRlQXJyYXlbM119YCxcclxuICAgICAgICAgIHVzZXJJZDogY3VycmVudFVzZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2VuZCB0byBBUElcclxuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJtZXNzYWdlc1wiLCBzdWJtaXRNZXNzYWdlT2JqKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgZWRpdEJ1dHRvbkNsaWNrKCkge1xyXG4gICAgLy8gZ3JhYnMgdGhlIGVkaXQgYnV0dG9uc1xyXG4gICAgJChcInNlY3Rpb24gPiBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgLy8gc3RvcmVzIHRoZSBtZXNzYWdlIGluIGEgdmFyYWJsZVxyXG4gICAgICBsZXQgbWVzc2FnZUgxID0gZS50YXJnZXQucHJldmlvdXNTaWJsaW5nXHJcbiAgICAgIC8vIHN0b3JlIG1lc3NhZ2UncyB0ZXh0IGluIGEgdmFyYWJsZVxyXG4gICAgICBsZXQgbWVzc2FnZVRleHQgPSBtZXNzYWdlSDEuaW5uZXJIVE1MO1xyXG4gICAgICAvLyByZXBsYWNlcyBFZGl0IGJ1dHRvbiB3aXRoIFNhdmUgYnV0dG9uXHJcbiAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKFwiPGJ1dHRvbiBjbGFzcz0gJ2J0bicgdHlwZSA9J2J1dHRvbic+U2F2ZTwvYnV0dG9uPlwiKVxyXG4gICAgICAvLyByZXBsYWNlcyBtZXNzYWdlIHRleHQgd2l0aCBhbiBpbnB1dCBmaWVsZFxyXG4gICAgICAkKG1lc3NhZ2VIMSkucmVwbGFjZVdpdGgoYDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkID0gXCJlZGl0RmllbGRcIiB2YWx1ZT1cIiR7bWVzc2FnZVRleHR9XCI+YClcclxuICAgICAgLy8gc3RvcmVzIHRoZSBuZXcgaW5wdXQgZmllbGQgaW4gYSB2YXJhYmxlXHJcbiAgICAgIGNvbnN0IG5ld0lucHV0RmllbGQgPSAkKFwiI2VkaXRGaWVsZFwiKTtcclxuICAgICAgLy8gc2V0cyBhIGNsaWNrIGV2ZW50IG9uIHRoZSBuZXcgc2F2ZSBidXR0b25cclxuICAgICAgbmV3SW5wdXRGaWVsZC5uZXh0KCkuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyBzdG9yZXMgaW5wdXQgdmFsdWUgaW4gYW4gb2JqZWN0IHVwb24gc2F2ZSBjbGlja1xyXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VUZXh0T2JqID0ge1xyXG4gICAgICAgICAgbWVzc2FnZUNvbnRlbnQ6IG5ld0lucHV0RmllbGQudmFsKCksXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNhdmUgbWVzc2FnZSBpZCAjXHJcbiAgICAgICAgY29uc3QgZWRpdGVkTWVzc2FnZUlkID0gbmV3SW5wdXRGaWVsZC5wYXJlbnQoKS5hdHRyKFwiaWRcIilcclxuICAgICAgICAvLyBQYXRjaCBtZXNzYWdlIGluIHNlcnZlciBhbmQgcmVmcmVzaCB0aGUgbWVzc2FnZXMgb24gdGhlIHBhZ2VcclxuICAgICAgICBBUEkudXBkYXRlSXRlbShcIm1lc3NhZ2VzXCIsIGVkaXRlZE1lc3NhZ2VJZCwgZWRpdGVkTWVzc2FnZVRleHRPYmopXHJcbiAgICAgICAgICAudGhlbigoKSA9PiBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZE1lc3NhZ2VzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcblxuICAgIGNvbnN0IG5ld3MgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHt9LCBgJHtuZXdzT2JqLmFydGljbGVOYW1lfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDRcIiwge30sIGBTYXZlZCBieTogJHtuZXdzT2JqLnVzZXIuZmlyc3ROYW1lfSB8IERhdGUgU2F2ZWQ6ICR7bmV3c09iai5kYXRlU2F2ZWR9YCksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbmV3c09iai5hYm91dCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgbmV3c01hcCAoKSAge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwiYXJ0aWNsZXMvP19leHBhbmQ9dXNlciZfc29ydD1kYXRlU2F2ZWQmX29yZGVyPWRlc2NcIilcbiAgICAudGhlbihuZXdzT2JqID0+IG5ld3NPYmouZm9yRWFjaChuZXdzID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKG5ld3MpO1xuICAgICAgdGhpcy5wcmludE5ld3MobmV3cyl9KSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMubmV3TmV3cygpKVxuXG4gIH0sXG5cbiAgbmV3TmV3cyAoKSB7XG4gICAgY29uc3QgbmV3TmV3cyA9IG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS1uZXdzXCJ9LFxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHt9LCBcIlNhdmUgTmV3cyBBcnRpY2xlXCIpLFxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVOYW1lXCJ9LCBcIkFydGljbGUgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVOYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTmFtZVwiLCBpZDogXCJhcnRpY2xlTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlVXJsXCJ9LCBcIkFydGljbGUgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBMaW5rXCIsIGlkOiBcImFydGljbGVMaW5rXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZUltYWdlVXJsXCJ9LCBcIkFydGljbGUgSW1hZ2UgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVJbWFnZVVybFwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIEltYWdlIExpbmtcIiwgaWQ6IFwiYXJ0aWNsZUltYWdlXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9LCBcIkFydGljbGUgRGVzY3JpcHRpb25cIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlRGVzY3JpcHRpb25cIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBEZXNjcmlwdGlvblwiLCBpZDogXCJhcnRpY2xlRGVzY3JpcHRpb25cIn0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiU2F2ZSBOZXcgQXJ0aWNsZVwiKVxuICAgICksXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgIGxldCBzdG9yeSA9IHtcbiAgICAgICAgYXJ0aWNsZU5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZU5hbWVcIikudmFsdWUsXG4gICAgICAgIHVybDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlTGlua1wiKS52YWx1ZSxcbiAgICAgICAgYXJ0aWNsZUltYWdlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVJbWFnZVwiKS52YWx1ZSxcbiAgICAgICAgYWJvdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZURlc2NyaXB0aW9uXCIpLnZhbHVlLFxuICAgICAgICAvKlxuICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxuICAgICAgICAqL1xuICAgICAgICB1c2VySWQ6IDIsXG4gICAgICAgIGRhdGVTYXZlZDogbmV3IERhdGUoKVxuICAgICAgfVxuICAgICAgYnVpbGROZXdzLmFkZE5ld3Moc3RvcnkpXG4gICAgfSlcbiAgfSxcblxuICBhZGROZXdzKHN0b3J5KXtcbiAgICBBUEkuc2F2ZUl0ZW0oXCJhcnRpY2xlc1wiLCBzdG9yeSkudGhlbigoKT0+IHRoaXMubmV3c01hcCgpKVxuICB9XG5cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGROZXdzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuXG5jb25zdCByZWdpc3RlckZ1bmNzID0ge1xuICBsb2FkUmVnaXN0ZXIoKXtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIGxldCByZWdpc3RlciA9IG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJGaXJzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiZmlyc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkZpcnN0IE5hbWVcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiTGFzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwibGFzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiTGFzdCBOYW1lXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkVtYWlsXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyB0eXBlOiBcImVtYWlsXCIsIG5hbWU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiZW1haWxcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcInBhc3N3b3JkXCJ9LCBcIlBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJjb25maXJtUGFzc3dvcmRcIn0sIFwiQ29uZmlybSBQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImNvbmZpcm1QYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJDb25maXJtIFBhc3N3b3JkXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlJlZ2lzdGVyIEFjY291bnRcIiksXG4gICAgICBuZXcgY29tcC5idG4oXCJBbHJlYWR5IGEgdXNlcj8gTG9nIGluIG5vd1wiKVxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJSZWdpc3RlciBBY2NvdW50XCIpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyaW5nIG5ldyBhY2NvdW50XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyRnVuY3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcclxuXHJcblxyXG5jb25zdCBidWlsZFRhc2tzID0ge1xyXG5cclxuICAvL2Z1bmN0aW9uIHJ1biBmaXJzdCBpbiBvcmRlciB0byBjbGVhciBIVE1MLCBjcmVhdGUgcGFyZW50IGNvbnRhaW5lcnMsIHRoZW4gYWRkIG5ldyB0YXNrIGlucHV0IGFuZCBjYWxsIGZldGNoXHJcbiAgYnVpbGRDb250YWluZXJzICgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBjb25zdCB0aXRsZTEgPSBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7Y2xhc3NOYW1lOiBcInRpdGxlLS1pbmNvbXBsZXRlXCJ9LCBcIkluY29tcGxldGUgVGFza3NcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGNvbnN0IGluY29tcGxldGUgPSBuZXcgY29tcC5kaXYgKHtpZDogXCJpbmNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgY29uc3QgdGl0bGUyID0gbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0tY29tcGxldGVcIn0sIFwiQ29tcGxldGUgVGFza3NcIikucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGNvbnN0IGNvbXBsZXRlID0gbmV3IGNvbXAuZGl2ICh7aWQ6IFwiY29tcGxldGVcIn0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICB0aGlzLm5ld1Rhc2soKVxyXG4gICAgdGhpcy50YXNrc0ZldGNoKClcclxuICB9LFxyXG5cclxuICAvL3VzZWQgdG8gY3JlYXRlIGFuZCBhcHBlbmQgYWxsIHRhc2tzIGZyb20gZGF0YWJhc2UgdG8gRE9NXHJcbiAgcHJpbnRUYXNrcyAodGFza3NPYmopIHtcclxuICAgIGxldCBvdXRwdXRDb250YWluZXI7XHJcblxyXG4gICAgaWYgKHRhc2tzT2JqLmNvbXBsZXRlKSB7XHJcbiAgICAgIG91dHB1dENvbnRhaW5lciA9IFwiI2NvbXBsZXRlXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG91dHB1dENvbnRhaW5lciA9IFwiI2luY29tcGxldGVcIlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRhc2sgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcInRhc2tcIiwgaWQ6IGAke3Rhc2tzT2JqLmlkfWB9LFxyXG4gICAgbmV3IGNvbXAuY2hlY2tib3goKSxcclxuICAgIG5ldyBjb21wLnBhcih7Y2xhc3NOYW1lOiBcImVkaXRhYmxlLS10YXNrXCJ9LCB0YXNrc09iai50YXNrKSxcclxuICAgIG5ldyBjb21wLnBhcih7Y2xhc3NOYW1lOiBcImVkaXRhYmxlLS1kYXRlXCJ9LCB0YXNrc09iai5kdWVEYXRlKSkucmVuZGVyKG91dHB1dENvbnRhaW5lcilcclxuICB9LFxyXG5cclxuICAvL2ZldGNoIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlLCBjYWxsIGNyZWF0ZS9hcHBlbmQgYW5kIGNhbGwgYWRkIGxpc3RlbmVyc1xyXG4gIHRhc2tzRmV0Y2ggKCkgIHtcclxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcInRhc2tzXCIpIC8vY2hlY2sgaWYgdXNlciBpcyBzYW1lIGFzIHNlc3Npb24gc3RvcmFnZVxyXG4gICAgLnRoZW4odGFza3NPYmogPT4gIHtcclxuICAgICAgdGFza3NPYmouZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgdGhpcy5wcmludFRhc2tzKHRhc2spfSlcclxuICAgICAgdGhpcy5jYkxpc3RlbmVyKClcclxuICAgICAgdGhpcy5wYXJMaXN0ZW5lcigpXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIC8vY2hlY2tib3ggbGlzdGVuZXIgd2lsbCBtb3ZlIHRhc2tzIGJldHdlZW4gY29tcGxldGUgYW5kIGluY29tcGxldGUgY29udGFpbmVyc1xyXG4gIC8vZGF0YWJhc2UgXCJjb21wbGV0ZVwiIHByb3BlcnR5IHdpbGwgYmUgcGF0Y2hlZCBhY2NvcmRpbmdseSBhbmQgRE9NIHVwZGF0ZWRcclxuICBjYkxpc3RlbmVyICgpIHtcclxuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIilcclxuXHJcbiAgICAvL2lmIHRoZSBpZCBvZiB0aGUgZ3JhbmRwYXJlbnQgY29udGFpbmVyIGlzICNjb21wbGV0ZSwgdGhlbiBjaGVjayB0aGUgYm94XHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goIChjaGVja2JveCkgPT4ge1xyXG4gICAgICBpZiAoY2hlY2tib3gucGFyZW50Tm9kZS5wYXJlbnROb2RlLmlkID09PSBcImNvbXBsZXRlXCIpIHtcclxuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICBsZXQgcGF0Y2hQcm9wZXJ0eTtcclxuICAgICAgICAvL2lmIGZhbHNlIC0+IHRydWVcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgcGF0Y2hQcm9wZXJ0eSA9IHtjb21wbGV0ZTogdHJ1ZX1cclxuICAgICAgICAgIC8vcGF0Y2ggXCJjb21wbGV0ZVwiIHByb3BlcnR5IG9mIGRhdGFiYXNlIG9iamVjdCB1c2luZyBwYXJlbnROb2RlIChzZWN0aW9uKSBJRCB0byBUUlVFXHJcbiAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YCwgcGF0Y2hQcm9wZXJ0eSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9pZiBjaGVja2JveCBpcyB1bmNoZWNrZWQuLi5cclxuICAgICAgICAgIHBhdGNoUHJvcGVydHkgPSB7Y29tcGxldGU6IGZhbHNlfVxyXG4gICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWAsIHBhdGNoUHJvcGVydHkpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfSxcclxuXHJcbiAgLy9mdW5jdGlvbiB1c2VkIHRvIGVkaXQgdGFza3MgaW4gRE9NIGFuZCBwYXRjaCBuZXcgaW5mbyB0byBkYXRhYmFzZSB0YXNrIGRlc2NyaXB0aW9uIGFuZCBkYXRlXHJcbiAgcGFyTGlzdGVuZXIgKCkge1xyXG4gICAgLy9nZXQgYWxsIHNlY3Rpb25zIG9uIHBhZ2VcclxuICAgIGxldCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWN0aW9uXCIpXHJcblxyXG4gICAgLy8vYWRkIGNsaWNrIGxpc3RlbmVyIHRvIGFsbCBzZWN0aW9uc1xyXG4gICAgc2VjdGlvbnMuZm9yRWFjaChzZWN0aW9uID0+IHtcclxuICAgICAgc2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAvL2dldCBpZCBvZiB0YXJnZXQgc2VjdGlvblxyXG4gICAgICAgIGNvbnN0IGlkID0gZS50YXJnZXQucGFyZW50Tm9kZS5pZFxyXG5cclxuICAgICAgICAvL2lmIHBhcmFncmFwaCBjbGlja2VkIGlzIHRhc2sgZGVzY3JpcHRpb24sIGdldCB0ZXh0IGNvbnRlbnRcclxuICAgICAgICAvL2NyZWF0ZSBuZXcgPGlucHV0PiB0ZW1wbGF0ZSAod2l0aCAgSUQhKSBhbmQgcmVwbGFjZSA8cD4gd2l0aCA8aW5wdXQ+XHJcbiAgICAgICAgLy9hZGQgYSBrZXlkb3duIGxpc3RlbmVyIHRvIHRoZSBpbnB1dCBhZnRlciBpdCBpcyBpbiBET00gYW5kXHJcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkZXNjcmlwdGlvbiB0byBkYXRhYmFzZSB3aGVuIEVOVEVSIGlzIHByZXNzZWRcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGFibGUtLXRhc2tcIikpIHtcclxuICAgICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZS50YXJnZXQudGV4dENvbnRlbnRcclxuICAgICAgICAgIGxldCB0ZW1wVGFza0lucHV0ID0gYDxpbnB1dCBpZD1cInRlbXAxXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGFza05hbWV9XCI+YFxyXG4gICAgICAgICAgJChlLnRhcmdldCkucmVwbGFjZVdpdGgodGVtcFRhc2tJbnB1dClcclxuICAgICAgICAgIGNvbnN0IHRlbXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcDFcIik7XHJcbiAgICAgICAgICAgIHRlbXBJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaFRhc2sgPSB7dGFzazogdGVtcElucHV0LnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBpZCwgcGF0Y2hUYXNrKVxyXG4gICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAvL2lmIHBhcmFncmFwaCBjbGlja2VkIGlzIHRhc2sgZHVlIGRhdGUsIGdldCB0ZXh0IGNvbnRlbnRcclxuICAgICAgICAvL2NyZWF0ZSBuZXcgPGlucHV0PiB0ZW1wbGF0ZSAod2l0aCAgSUQhKSBhbmQgcmVwbGFjZSA8cD4gd2l0aCA8aW5wdXQ+XHJcbiAgICAgICAgLy9hZGQgYSBjaGFuZ2UgbGlzdGVuZXIgdG8gdGhlIGlucHV0IGFmdGVyIGl0IGlzIGluIERPTSBhbmRcclxuICAgICAgICAvL3BhdGNoIHRoZSB0YXNrIGR1ZSBkYXRlIHRvIGRhdGFiYXNlIHdoZW4gbmV3IGRhdGUgaXMgc2VsZWN0ZWRcclxuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRhYmxlLS1kYXRlXCIpKSB7XHJcbiAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XHJcbiAgICAgICAgICBsZXQgdGVtcFRhc2tEYXRlID0gYDxpbnB1dCBpZD1cInRlbXAyXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7dGFza0RhdGV9XCI+YFxyXG4gICAgICAgICAgJChlLnRhcmdldCkucmVwbGFjZVdpdGgodGVtcFRhc2tEYXRlKVxyXG4gICAgICAgICAgICBjb25zdCB0ZW1wRGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wMlwiKTtcclxuICAgICAgICAgICAgdGVtcERhdGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaERhdGUgPSB7ZHVlRGF0ZTogdGVtcERhdGVJbnB1dC52YWx1ZX1cclxuICAgICAgICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgaWQsIHBhdGNoRGF0ZSlcclxuICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9LFxyXG5cclxuICAvL2NyZWF0ZXMgbmV3IHRhc2sgaW5wdXQgZmllbGQgd2l0aCBhcHBlbmQgYnV0dG9uIGluc2lkZSBmaXJzdCBzZWN0aW9uIG9mIElOQ09NUExFVEUgY29udGFpbmVyXHJcbiAgbmV3VGFzayAoKSB7XHJcbiAgICBjb25zdCBuZXdUYXNrRmllbGQgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tdGFza1wifSxcclxuICAgIG5ldyBjb21wLmJ0biAoXCIrXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoe2lkOiBcImlucHV0LS10YXNrXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJ0eXBlIG5ldyB0YXNrIGhlcmVcIn0pLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQoe2lkOiBcImlucHV0LS1kYXRlXCIsIHR5cGU6IFwiZGF0ZVwifSkpLnJlbmRlcihcIiNpbmNvbXBsZXRlXCIpXHJcblxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKVxyXG4gICAgY29uc3QgaW5wdXRfdGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5wdXQtLXRhc2tcIilcclxuICAgIGNvbnN0IGlucHV0X2RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LS1kYXRlXCIpXHJcblxyXG4gICAgLy9idXR0b24gY2xpY2sgcG9zdHMgbmV3IHRhc2sgdG8gZGF0YWJhc2UgYW5kIHJlc2V0cyBuZXcgdGFzayBpbnB1dCBzdHJpbmdzXHJcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgIGlmIChpbnB1dF90YXNrLnZhbHVlID09PSBcIlwiIHx8IGlucHV0X2RhdGUudmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgdGFza0l0ZW0gPSB7XHJcbiAgICAgICAgICB0YXNrOiBpbnB1dF90YXNrLnZhbHVlLFxyXG4gICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxyXG4gICAgICAgICAgZHVlRGF0ZTogaW5wdXRfZGF0ZS52YWx1ZSxcclxuICAgICAgICAgIC8qXHJcbiAgICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxyXG4gICAgICAgICAgKi9cclxuICAgICAgICAgIHVzZXJJZDogMyxcclxuICAgICAgICB9XHJcbiAgICAgICAgQVBJLnNhdmVJdGVtKFwidGFza3NcIiwgdGFza0l0ZW0pLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByaW50VGFza3MoZGF0YSlcclxuICAgICAgICAgIHRoaXMuY2JMaXN0ZW5lcigpXHJcbiAgICAgICAgICB0aGlzLnBhckxpc3RlbmVyKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlucHV0X3Rhc2sudmFsdWUgPSBcIlwiXHJcbiAgICAgICAgaW5wdXRfZGF0ZS52YWx1ZSA9IFwiXCJcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkVGFza3MiXX0=
