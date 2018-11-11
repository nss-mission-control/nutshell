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
const buildTasks = {
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
    $("#newEventBtn").click(function (e) {
      console.log("click,click");
      $(".container--inner").text(null);
      buildTasks.newEventPopUp();
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
    let buttons = document.querySelectorAll("button");
  }

};
var _default = buildTasks;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzLmpzIiwiLi4vc2NyaXB0cy9sYW5kaW5nLmpzIiwiLi4vc2NyaXB0cy9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvbWVzc2FnZXMuanMiLCIuLi9zY3JpcHRzL25ld3MuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy90YXNrcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLE1BQU0sYUFBYSxHQUFHLE1BQU0sRUFBNUI7O0FBRUEsTUFBTSxZQUFOLENBQW1CO0FBQ2YsRUFBQSxXQUFXLENBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsR0FBRyxRQUF0QixFQUFnQztBQUN2QyxTQUFLLGFBQUwsSUFBc0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBdEI7QUFFQTs7Ozs7QUFJQSxRQUFJLE9BQU8sVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUNoQyxXQUFLLGFBQUwsRUFBb0IsV0FBcEIsR0FBa0MsVUFBbEM7QUFDQSxhQUFPLElBQVA7QUFDSCxLQUhELE1BR08sSUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDdkMsV0FBSyxhQUFMLElBQXNCLE1BQU0sQ0FBQyxNQUFQLENBQWMsS0FBSyxhQUFMLENBQWQsRUFBbUMsVUFBbkMsQ0FBdEI7QUFDSDs7QUFFRCxRQUFJLFFBQVEsQ0FBQyxNQUFiLEVBQXFCO0FBQ2pCLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3RCO0FBQ0EsWUFBSSxLQUFLLENBQUMsT0FBTixZQUF5QixNQUFNLENBQUMsT0FBcEMsRUFB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QUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFVBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLENBQW5CO0FBQ0EsVUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBbkIsQ0FSUyxDQVVUOztBQUNBLElBQUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWtDLENBQUQsSUFBTztBQUN0QyxVQUFJLFVBQVUsQ0FBQyxLQUFYLEtBQXFCLEVBQXJCLElBQTJCLFVBQVUsQ0FBQyxLQUFYLEtBQXFCLEVBQXBELEVBQXdEO0FBQ3REO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSSxRQUFRLEdBQUc7QUFDYixVQUFBLElBQUksRUFBRSxVQUFVLENBQUMsS0FESjtBQUViLFVBQUEsUUFBUSxFQUFFLEtBRkc7QUFHYixVQUFBLE9BQU8sRUFBRSxVQUFVLENBQUMsS0FIUDs7QUFJYjs7O0FBR0EsVUFBQSxNQUFNLEVBQUU7QUFQSyxTQUFmOztBQVNBLHlCQUFJLFFBQUosQ0FBYSxPQUFiLEVBQXNCLFFBQXRCLEVBQWdDLElBQWhDLENBQXFDLElBQUksSUFBSTtBQUMzQyxlQUFLLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDQSxlQUFLLFVBQUw7QUFDQSxlQUFLLFdBQUw7QUFDRCxTQUpEOztBQUtBLFFBQUEsVUFBVSxDQUFDLEtBQVgsR0FBbUIsRUFBbkI7QUFDQSxRQUFBLFVBQVUsQ0FBQyxLQUFYLEdBQW1CLEVBQW5CO0FBQ0Q7QUFDRixLQXJCRDtBQXNCRDs7QUF0SmdCLENBQW5CO2VBeUplLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWxlbWVudFN5bWJvbCA9IFN5bWJvbCgpXG5cbmNsYXNzIERPTUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgSWYgYGF0dHJpYnV0ZXNgIGlzIGp1c3QgYSBzdHJpbmcsIGl0J3MgYSBzaW1wbGUgZWxlbWVudCB3aXRoIG5vXG4gICAgICAgICAgICBwcm9wZXJ0aWVzIC0ganVzdCBzb21lIHRleHQgY29udGVudFxuICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gT2JqZWN0LmFzc2lnbih0aGlzW2VsZW1lbnRTeW1ib2xdLCBhdHRyaWJ1dGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25lIEhUTUxFbGVtZW50IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoY2hpbGQuZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBbiBhcnJheSBvZiBlbGVtZW50cyB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVsZW1lbnQuZm9yRWFjaChjID0+IHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoYykpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nIHZhbHVlIHdhcyBwYXNzZWQgaW4sIHNldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2VsZW1lbnRTeW1ib2xdXG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzW2VsZW1lbnRTeW1ib2xdKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERPTUNvbXBvbmVudFxuIiwiY29uc3QgVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODgvXCJcblxuY29uc3QgQVBJID0ge1xuICBnZXRBbGxDYXRlZ29yeShjYXRlZ29yeSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gKVxuICAgICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBnZXRPbmVGcm9tQ2F0ZWdvcnkoY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWApXG4gICAgICAudGhlbihpbnB1dHMgPT4gaW5wdXRzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSXRlbShjYXRlZ29yeSwgaXRlbSl7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICB9XG4gICAgKS50aGVuKGpzb25EYXRhID0+IGpzb25EYXRhLmpzb24oKSlcbiAgfSxcblxuICBkZWxldGVJdGVtKGNhdGVnb3J5LCBpZCl7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9XG4gICAgKVxuICB9LFxuXG4gIHVwZGF0ZUl0ZW0oY2F0ZWdvcnksIGlkLCBpdGVtKXtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9LyR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICB9XG4gICAgKVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgRE9NQ29tcG9uZW50IGZyb20gXCIuLi9saWIvbm9kZV9tb2R1bGVzL25zcy1kb21jb21wb25lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmNyZWF0ZShudWxsLCB7XHJcbiAgZGl2OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgZGl2IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImRpdlwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnRuOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYnRuIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJidXR0b25cIiwge2NsYXNzTmFtZTogXCJidG5cIiwgdHlwZTogXCJidXR0b25cIn0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbnB1dDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGlucHV0IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZWN0aW9uOiB7XHJcbiAgICB2YWx1ZTogY2xhc3Mgc2VjdGlvbiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJzZWN0aW9uXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0aXRsZTogeyAvL2RlZmluZSBhbnkgdHlwZSBvZiBoIy4uIGgxLCBoMiwgZXRjLlxyXG4gICAgdmFsdWU6IGNsYXNzIHRpdGxlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGFuY2hvcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGFuY2hvciBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGVja2JveDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGNoZWNrYm94IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIHt0eXBlOiBcImNoZWNrYm94XCIsIGNsYXNzTmFtZTogXCJjYlwifSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGltYWdlOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW1hZ2UgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW1nXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB1bDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsaToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxpIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxpXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgZm9ybSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJmb3JtXCIse30sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsYWJlbDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxhYmVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxhYmVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0ZXh0YXJlYToge1xyXG4gICAgdmFsdWU6IGNsYXNzIHRleHRhcmVhIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInRleHRhcmVhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBwYXI6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBwYXIgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwicFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSkiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcclxuXHJcbmxldCBjdXJyZW50VXNlciA9IDI7XHJcblxyXG5cclxuY29uc3QgYnVpbGRUYXNrcyA9IHtcclxuXHJcbiAgYnVpbGRDb250YWluZXJzICgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBjb25zdCBuZXdCdG4gPSBuZXcgY29tcC5kaXYgKHtpZDogXCJuZXdFdmVudEJ0blwifSxcclxuICAgIG5ldyBjb21wLmJ0biAoXCIrXCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG5cclxuXHJcbiAgICBjb25zdCB0aXRsZTEgPSBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7Y2xhc3NOYW1lOiBcInRpdGxlLS11cGNvbWluZ1wifSwgXCJVcGNvbWluZyBFdmVudFwiKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgY29uc3QgaW5jb21wbGV0ZSA9IG5ldyBjb21wLmRpdiAoe2lkOiBcInVwY29taW5nXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgY29uc3QgdGl0bGUyID0gbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0tcGFzdFwifSwgXCJQYXN0IEV2ZW50XCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBjb25zdCBjb21wbGV0ZSA9IG5ldyBjb21wLmRpdiAoe2lkOiBcInBhc3RcIn0pLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICAvLyB0aGlzLm5ld1Rhc2soKVxyXG4gICAgdGhpcy5ldmVudEZldGNoKCk7XHJcbiAgICB0aGlzLm5ld0V2ZW50QnV0dG9uKCk7XHJcbiAgfSxcclxuXHJcbiAgcHJpbnRFdmVudHMgKGV2ZW50T2JqKSB7XHJcbiAgICBsZXQgb3V0cHV0Q29udGFpbmVyO1xyXG5cclxuICAgIC8vIG5lZWQgdG8gdGVzdCBpZiBkYXRlIGlzIGluIHRoZSBmdXR1cmUgb3IgdGhlIHBhc3RcclxuXHJcbiAgICBvdXRwdXRDb250YWluZXIgPSBcIiN1cGNvbWluZ1wiXHJcbiAgICBjb25zdCB0YXNrID0gbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJldmVudFwiLCBpZDogYCR7ZXZlbnRPYmouaWR9YH0sXHJcbiAgICBuZXcgY29tcC50aXRsZShcImgzXCIsICBgJHtldmVudE9iai5uYW1lfWApLFxyXG4gICAgbmV3IGNvbXAucGFyKGAke2V2ZW50T2JqLmRhdGV9ICR7ZXZlbnRPYmoudGltZX1gKSxcclxuICAgIG5ldyBjb21wLnBhcihgJHtldmVudE9iai5sb2NhdGlvbn1gKSkucmVuZGVyKG91dHB1dENvbnRhaW5lcilcclxuICB9LFxyXG5cclxuICBldmVudEZldGNoICgpICB7XHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJldmVudHNcIikgLy9jaGVjayBpZiB1c2VyIGlzIHNhbWUgYXMgc2Vzc2lvbiBzdG9yYWdlXHJcbiAgICAudGhlbihldmVudE9iaiA9PiAge1xyXG4gICAgICBldmVudE9iai5mb3JFYWNoKGV2ZW50ID0+IHtcclxuICAgICAgdGhpcy5wcmludEV2ZW50cyhldmVudCl9KVxyXG5cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgbmV3RXZlbnRCdXR0b24gKCkge1xyXG4gICAgJChcIiNuZXdFdmVudEJ0blwiKS5jbGljayhcclxuICAgICAgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrLGNsaWNrXCIpXHJcbiAgICAgICAgJChcIi5jb250YWluZXItLWlubmVyXCIpLnRleHQobnVsbClcclxuICAgICAgICBidWlsZFRhc2tzLm5ld0V2ZW50UG9wVXAoKTtcclxuXHJcbiAgICAgIH1cclxuICAgIClcclxuICB9LFxyXG4gIG5ld0V2ZW50UG9wVXAoKSB7XHJcbiAgICAgIC8vIEJ1aWxkcyBuZXcgZXZlbnQgZW50cnkgZm9ybVxyXG4gICAgbGV0IGRpdjIgPSBuZXcgY29tcC5kaXYoXHJcbiAgICAgIHsgY2xhc3NMaXN0OiBcIm5ld0V2ZW50Rm9ybVwiIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIiB9LCBcIkFkZCBBIE5ldyBFdmVudFwiKSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJFdmVudCBOYW1lXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7dHlwZTogXCJ0ZXh0XCJ9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJEYXRlXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7dHlwZTogXCJkYXRlXCJ9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJUaW1lXCIpLFxyXG4gICAgICBuZXcgY29tcC5pbnB1dCh7dHlwZTogXCJ0ZXh0XCJ9KSxcclxuICAgICAgbmV3IGNvbXAubGFiZWwoXCJMb2NhdGlvblwiKSxcclxuICAgICAgbmV3IGNvbXAuaW5wdXQoe3R5cGU6IFwidGV4dFwifSksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIlNhdmVcIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkJhY2tcIikpXHJcbiAgICBkaXYyLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBsZXQgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIilcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRUYXNrc1xyXG4iLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxyXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXHJcblxyXG5jb25zdCBsYW5kaW5nUGFnZUZ1bmNzID0ge1xyXG4gIGxvYWRMYW5kaW5nUGFnZSgpIHtcclxuICAgIGxldCBkaXYyID0gbmV3IGNvbXAuZGl2KFxyXG4gICAgICB7IGNsYXNzTGlzdDogXCJ3ZWxjb21lXCIgfSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJ0aXRsZVwiIH0sIFwiV2VsY29tZSB0byBNaXNzaW9uIENvbnRyb2xcIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlclwiKSlcclxuICAgIGRpdjIucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGxldCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKVxyXG5cclxuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9naW5cIikge1xyXG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYW5kaW5nUGFnZUZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXG5cbmNvbnN0IGxvZ0luRnVuY3MgPSB7XG4gIGxvYWRMb2dJbigpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbGV0IGxvZ0luID0gbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJwYXNzd29yZFwifSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luIE5vd1wiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIk5vdCBhIHVzZXI/IENyZWF0ZSBuZXcgYWNjb3VudC5cIilcbiAgICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luIE5vd1wiKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbiBub3dcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbG9nSW5GdW5jcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgbGFuZGluZ1BhZ2VGdW5jcyBmcm9tIFwiLi9sYW5kaW5nXCJcclxuaW1wb3J0IGJ1aWxkTWVzc2FnZXMgZnJvbSBcIi4vbWVzc2FnZXNcIlxyXG5pbXBvcnQgYnVpbGRUYXNrcyBmcm9tIFwiLi90YXNrc1wiXHJcbmltcG9ydCBidWlsZE5ld3MgZnJvbSBcIi4vbmV3c1wiXHJcbmltcG9ydCBidWlsZEV2ZW50cyBmcm9tIFwiLi9ldmVudHNcIlxyXG5cclxuLy8gbGFuZGluZ1BhZ2VGdW5jcy5sb2FkTGFuZGluZ1BhZ2UoKTtcclxuLy8gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCk7XHJcbi8vIGJ1aWxkVGFza3MuYnVpbGRDb250YWluZXJzKCk7XHJcbi8vIGJ1aWxkTmV3cy5uZXdzTWFwKClcclxuYnVpbGRFdmVudHMuYnVpbGRDb250YWluZXJzKCk7IiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcblxyXG5jb25zdCBjdXJyZW50VXNlciA9IDM7XHJcblxyXG5jb25zdCBidWlsZE1lc3NhZ2VzID0ge1xyXG4gIHByaW50TWVzc2FnZXMobWVzc2FnZU9iaikge1xyXG4gICAgaWYgKGN1cnJlbnRVc2VyID09PSBtZXNzYWdlT2JqLnVzZXIuaWQpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IG5ldyBjb21wLnNlY3Rpb24oe1xyXG4gICAgICAgICAgY2xhc3NOYW1lOiBcIm1lc3NhZ2VcIixcclxuICAgICAgICAgIGlkOiBgJHttZXNzYWdlT2JqLmlkfWBcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDJcIiwge30sIGAke21lc3NhZ2VPYmoudXNlci5maXJzdE5hbWV9IC0gJHttZXNzYWdlT2JqLmRhdGV9ICR7bWVzc2FnZU9iai50aW1lU3RhbXB9YCksXHJcbiAgICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCksXHJcbiAgICAgICAgbmV3IGNvbXAuYnRuKFwiRWRpdFwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgY29tcC5zZWN0aW9uKHtcclxuICAgICAgICAgIGNsYXNzTmFtZTogXCJtZXNzYWdlXCIsXHJcbiAgICAgICAgICBpZDogYCR7bWVzc2FnZU9iai5pZH1gXHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZXcgY29tcC50aXRsZShcImgyXCIsIHt9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxyXG4gICAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG1lc3NhZ2VPYmoubWVzc2FnZUNvbnRlbnQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG1lc3NhZ2VNYXAoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgQVBJLmdldEFsbENhdGVnb3J5KFwibWVzc2FnZXMvP19leHBhbmQ9dXNlclwiKVxyXG4gICAgICAudGhlbihtZXNzYWdlT2JqID0+IHtcclxuXHJcbiAgICAgICAgbWVzc2FnZU9iai5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wcmludE1lc3NhZ2VzKG1lc3NhZ2UpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLm5ld01lc3NhZ2UoKTtcclxuICAgICAgICB0aGlzLnN1Ym1pdE1lc3NhZ2UoKTtcclxuICAgICAgICB0aGlzLmVkaXRCdXR0b25DbGljaygpO1xyXG5cclxuICAgICAgfSlcclxuICB9LFxyXG4gIC8vIGJ1aWxkcyBuZXcgbWVzc2FnZSBlbnRyeSBmaWVsZFxyXG4gIG5ld01lc3NhZ2UoKSB7XHJcbiAgICAvL3dyYXBwZWQgdGhpcyBpbiBhIGRpdiBpbnN0ZWFkIG9mIGEgc2VjdGlvbiwgdG8gZ3JhYiBzZWN0aW9ucyBlYXNpZXIuXHJcbiAgICBjb25zdCBuZXdNZXNzYWdlRmllbGQgPSBuZXcgY29tcC5kaXYoe1xyXG4gICAgICAgIGNsYXNzTmFtZTogXCJuZXctLW1lc3NhZ2VcIixcclxuICAgICAgICBpZDogXCJuZXdNZXNzYWdlXCJcclxuICAgICAgfSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgXCJOZXcgTWVzc2FnZVwiKSxcclxuICAgICAgbmV3IGNvbXAudGV4dGFyZWEoe1xyXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcInR5cGUgeW91ciBtZXNzYWdlIGhlcmVcIixcclxuICAgICAgICB3cmFwOiBcImhhcmRcIlxyXG4gICAgICB9KSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiU3VibWl0XCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gIH0sXHJcblxyXG4gIHN1Ym1pdE1lc3NhZ2UoKSB7XHJcbiAgICAkKFwiI25ld01lc3NhZ2UgPiBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgLy9pZiBzdGF0bWVudCB0byBwcmV2ZW50IGJsYW5rIGVudHJpZXNcclxuICAgICAgaWYgKCQoXCIjbmV3TWVzc2FnZSA+IHRleHRhcmVhXCIpLnZhbCgpID09PSBcIlwiKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgeW91ciBtZXNzYWdlXCIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgLy9jcmVhdGVzIG9iamVjdCBvZiBjdXJyZW50IG1vbWVudFxyXG4gICAgICAgIGxldCBkYXRlQW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgLy9jb252ZXJ0cyBpdCBpbnRvIGEgc3RyaW5nIGFuZCB0aGVuIGFuIGFycmF5IHRvIGdyYWIgc3BlY2lmaWMgdmFsdWVzXHJcbiAgICAgICAgbGV0IGRhdGVBcnJheSA9IGRhdGVBbmRUaW1lLnRvU3RyaW5nKCkuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIC8vZ2V0TW9udGgoKSBtZXRob2QgcmV0dXJucyBhIG51bWJlciBiZXR3ZWVuIDAtMTEuIEFkZGVkIDEgdG8gZ2V0IGN1cnJlbnQgbW9udGhcclxuICAgICAgICBsZXQgbW9udGggPSBkYXRlQW5kVGltZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAvL2J1aWxkcyBvYmplY3QgdG8gcGFzcyBpbnRvIGZldGNoXHJcbiAgICAgICAgbGV0IHN1Ym1pdE1lc3NhZ2VPYmogPSB7XHJcbiAgICAgICAgICBtZXNzYWdlQ29udGVudDogJChcIiNuZXdNZXNzYWdlID4gdGV4dGFyZWFcIikudmFsKCksXHJcbiAgICAgICAgICB0aW1lU3RhbXA6IGRhdGVBcnJheVs0XSwgLy9UT0RPOiBtYWtlIGl0IG5vbiBtaWxpdGFyeSB0aW1lXHJcbiAgICAgICAgICBkYXRlOiBgJHttb250aH0vJHtkYXRlQXJyYXlbMl19LyR7ZGF0ZUFycmF5WzNdfWAsXHJcbiAgICAgICAgICB1c2VySWQ6IGN1cnJlbnRVc2VyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNlbmQgdG8gQVBJXHJcbiAgICAgICAgQVBJLnNhdmVJdGVtKFwibWVzc2FnZXNcIiwgc3VibWl0TWVzc2FnZU9iailcclxuICAgICAgICAgIC50aGVuKCgpID0+IGJ1aWxkTWVzc2FnZXMubWVzc2FnZU1hcCgpKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGVkaXRCdXR0b25DbGljaygpIHtcclxuICAgIC8vIGdyYWJzIHRoZSBlZGl0IGJ1dHRvbnNcclxuICAgICQoXCJzZWN0aW9uID4gYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIC8vIHN0b3JlcyB0aGUgbWVzc2FnZSBpbiBhIHZhcmFibGVcclxuICAgICAgbGV0IG1lc3NhZ2VIMSA9IGUudGFyZ2V0LnByZXZpb3VzU2libGluZ1xyXG4gICAgICAvLyBzdG9yZSBtZXNzYWdlJ3MgdGV4dCBpbiBhIHZhcmFibGVcclxuICAgICAgbGV0IG1lc3NhZ2VUZXh0ID0gbWVzc2FnZUgxLmlubmVySFRNTDtcclxuICAgICAgLy8gcmVwbGFjZXMgRWRpdCBidXR0b24gd2l0aCBTYXZlIGJ1dHRvblxyXG4gICAgICAkKGUudGFyZ2V0KS5yZXBsYWNlV2l0aChcIjxidXR0b24gY2xhc3M9ICdidG4nIHR5cGUgPSdidXR0b24nPlNhdmU8L2J1dHRvbj5cIilcclxuICAgICAgLy8gcmVwbGFjZXMgbWVzc2FnZSB0ZXh0IHdpdGggYW4gaW5wdXQgZmllbGRcclxuICAgICAgJChtZXNzYWdlSDEpLnJlcGxhY2VXaXRoKGA8aW5wdXQgdHlwZT1cInRleHRcIiBpZCA9IFwiZWRpdEZpZWxkXCIgdmFsdWU9XCIke21lc3NhZ2VUZXh0fVwiPmApXHJcbiAgICAgIC8vIHN0b3JlcyB0aGUgbmV3IGlucHV0IGZpZWxkIGluIGEgdmFyYWJsZVxyXG4gICAgICBjb25zdCBuZXdJbnB1dEZpZWxkID0gJChcIiNlZGl0RmllbGRcIik7XHJcbiAgICAgIC8vIHNldHMgYSBjbGljayBldmVudCBvbiB0aGUgbmV3IHNhdmUgYnV0dG9uXHJcbiAgICAgIG5ld0lucHV0RmllbGQubmV4dCgpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy8gc3RvcmVzIGlucHV0IHZhbHVlIGluIGFuIG9iamVjdCB1cG9uIHNhdmUgY2xpY2tcclxuICAgICAgICBjb25zdCBlZGl0ZWRNZXNzYWdlVGV4dE9iaiA9IHtcclxuICAgICAgICAgIG1lc3NhZ2VDb250ZW50OiBuZXdJbnB1dEZpZWxkLnZhbCgpLFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzYXZlIG1lc3NhZ2UgaWQgI1xyXG4gICAgICAgIGNvbnN0IGVkaXRlZE1lc3NhZ2VJZCA9IG5ld0lucHV0RmllbGQucGFyZW50KCkuYXR0cihcImlkXCIpXHJcbiAgICAgICAgLy8gUGF0Y2ggbWVzc2FnZSBpbiBzZXJ2ZXIgYW5kIHJlZnJlc2ggdGhlIG1lc3NhZ2VzIG9uIHRoZSBwYWdlXHJcbiAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJtZXNzYWdlc1wiLCBlZGl0ZWRNZXNzYWdlSWQsIGVkaXRlZE1lc3NhZ2VUZXh0T2JqKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCkpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRNZXNzYWdlcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcblxuXG5jb25zdCBidWlsZE5ld3MgPSB7XG4gIHByaW50TmV3cyhuZXdzT2JqKSB7XG5cbiAgICBjb25zdCBuZXdzID0gbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXdzXCIsIGlkOiBgJHtuZXdzT2JqLmlkfWB9LFxuICAgIG5ldyBjb21wLmFuY2hvcih7aHJlZjogYCR7bmV3c09iai51cmx9YCwgdGFyZ2V0OiBcIl9ibGFua1wifSwgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke25ld3NPYmouYXJ0aWNsZUltYWdlfWAsIGFsdDogXCJBcnRpY2xlIEltYWdlXCIsIGhlaWdodDogXCIxMjBcIiwgd2lkdGg6IFwiMTIwXCJ9KSksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7fSwgYCR7bmV3c09iai5hcnRpY2xlTmFtZX1gKSxcbiAgICBuZXcgY29tcC50aXRsZShcImg0XCIsIHt9LCBgU2F2ZWQgYnk6ICR7bmV3c09iai51c2VyLmZpcnN0TmFtZX0gfCBEYXRlIFNhdmVkOiAke25ld3NPYmouZGF0ZVNhdmVkfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG5ld3NPYmouYWJvdXQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG4gIG5ld3NNYXAgKCkgIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcImFydGljbGVzLz9fZXhwYW5kPXVzZXImX3NvcnQ9ZGF0ZVNhdmVkJl9vcmRlcj1kZXNjXCIpXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhuZXdzKTtcbiAgICAgIHRoaXMucHJpbnROZXdzKG5ld3MpfSkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLm5ld05ld3MoKSlcblxuICB9LFxuXG4gIG5ld05ld3MgKCkge1xuICAgIGNvbnN0IG5ld05ld3MgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tbmV3c1wifSxcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7fSwgXCJTYXZlIE5ld3MgQXJ0aWNsZVwiKSxcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlTmFtZVwifSwgXCJBcnRpY2xlIE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIE5hbWVcIiwgaWQ6IFwiYXJ0aWNsZU5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZVVybFwifSwgXCJBcnRpY2xlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTGlua1wiLCBpZDogXCJhcnRpY2xlTGlua1wifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVJbWFnZVVybFwifSwgXCJBcnRpY2xlIEltYWdlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlSW1hZ2VVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIsIGlkOiBcImFydGljbGVJbWFnZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVEZXNjcmlwdGlvblwifSwgXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgRGVzY3JpcHRpb25cIiwgaWQ6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlNhdmUgTmV3IEFydGljbGVcIilcbiAgICApLFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICBsZXQgc3RvcnkgPSB7XG4gICAgICAgIGFydGljbGVOYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVOYW1lXCIpLnZhbHVlLFxuICAgICAgICB1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUxpbmtcIikudmFsdWUsXG4gICAgICAgIGFydGljbGVJbWFnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlSW1hZ2VcIikudmFsdWUsXG4gICAgICAgIGFib3V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVEZXNjcmlwdGlvblwiKS52YWx1ZSxcbiAgICAgICAgLypcbiAgICAgICAgTkVFRCBUTyBVUERBVEUgVVNFUiBJRCBUTyBTQVZFIFNFU1NJT04gQVNTSUdORUQgSURcbiAgICAgICAgKi9cbiAgICAgICAgdXNlcklkOiAyLFxuICAgICAgICBkYXRlU2F2ZWQ6IG5ldyBEYXRlKClcbiAgICAgIH1cbiAgICAgIGJ1aWxkTmV3cy5hZGROZXdzKHN0b3J5KVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkTmV3cyhzdG9yeSl7XG4gICAgQVBJLnNhdmVJdGVtKFwiYXJ0aWNsZXNcIiwgc3RvcnkpLnRoZW4oKCk9PiB0aGlzLm5ld3NNYXAoKSlcbiAgfVxuXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTmV3cyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIjtcblxuY29uc3QgcmVnaXN0ZXJGdW5jcyA9IHtcbiAgbG9hZFJlZ2lzdGVyKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBsZXQgcmVnaXN0ZXIgPSBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRmlyc3QgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImZpcnN0TmFtZVwiLCBwbGFjZWhvbGRlcjogXCJGaXJzdCBOYW1lXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkxhc3QgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImxhc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkxhc3QgTmFtZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJFbWFpbFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJlbWFpbFwiLCBuYW1lOiBcImVtYWlsXCIsIHBsYWNlaG9sZGVyOiBcImVtYWlsXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJwYXNzd29yZFwifSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiY29uZmlybVBhc3N3b3JkXCJ9LCBcIkNvbmZpcm0gUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJjb25maXJtUGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBQYXNzd29yZFwifSksXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlciBBY2NvdW50XCIpLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiQWxyZWFkeSBhIHVzZXI/IExvZyBpbiBub3dcIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiUmVnaXN0ZXIgQWNjb3VudFwiKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWdpc3RlcmluZyBuZXcgYWNjb3VudFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9XG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcblxyXG5cclxuY29uc3QgYnVpbGRUYXNrcyA9IHtcclxuXHJcbiAgLy9mdW5jdGlvbiBydW4gZmlyc3QgaW4gb3JkZXIgdG8gY2xlYXIgSFRNTCwgY3JlYXRlIHBhcmVudCBjb250YWluZXJzLCB0aGVuIGFkZCBuZXcgdGFzayBpbnB1dCBhbmQgY2FsbCBmZXRjaFxyXG4gIGJ1aWxkQ29udGFpbmVycyAoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgY29uc3QgdGl0bGUxID0gbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0taW5jb21wbGV0ZVwifSwgXCJJbmNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBjb25zdCBpbmNvbXBsZXRlID0gbmV3IGNvbXAuZGl2ICh7aWQ6IFwiaW5jb21wbGV0ZVwifSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGNvbnN0IHRpdGxlMiA9IG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHtjbGFzc05hbWU6IFwidGl0bGUtLWNvbXBsZXRlXCJ9LCBcIkNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBjb25zdCBjb21wbGV0ZSA9IG5ldyBjb21wLmRpdiAoe2lkOiBcImNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgdGhpcy5uZXdUYXNrKClcclxuICAgIHRoaXMudGFza3NGZXRjaCgpXHJcbiAgfSxcclxuXHJcbiAgLy91c2VkIHRvIGNyZWF0ZSBhbmQgYXBwZW5kIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlIHRvIERPTVxyXG4gIHByaW50VGFza3MgKHRhc2tzT2JqKSB7XHJcbiAgICBsZXQgb3V0cHV0Q29udGFpbmVyO1xyXG5cclxuICAgIGlmICh0YXNrc09iai5jb21wbGV0ZSkge1xyXG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNjb21wbGV0ZVwiXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNpbmNvbXBsZXRlXCJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXNrID0gbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJ0YXNrXCIsIGlkOiBgJHt0YXNrc09iai5pZH1gfSxcclxuICAgIG5ldyBjb21wLmNoZWNrYm94KCksXHJcbiAgICBuZXcgY29tcC5wYXIoe2NsYXNzTmFtZTogXCJlZGl0YWJsZS0tdGFza1wifSwgdGFza3NPYmoudGFzayksXHJcbiAgICBuZXcgY29tcC5wYXIoe2NsYXNzTmFtZTogXCJlZGl0YWJsZS0tZGF0ZVwifSwgdGFza3NPYmouZHVlRGF0ZSkpLnJlbmRlcihvdXRwdXRDb250YWluZXIpXHJcbiAgfSxcclxuXHJcbiAgLy9mZXRjaCBhbGwgdGFza3MgZnJvbSBkYXRhYmFzZSwgY2FsbCBjcmVhdGUvYXBwZW5kIGFuZCBjYWxsIGFkZCBsaXN0ZW5lcnNcclxuICB0YXNrc0ZldGNoICgpICB7XHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJ0YXNrc1wiKSAvL2NoZWNrIGlmIHVzZXIgaXMgc2FtZSBhcyBzZXNzaW9uIHN0b3JhZ2VcclxuICAgIC50aGVuKHRhc2tzT2JqID0+ICB7XHJcbiAgICAgIHRhc2tzT2JqLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgIHRoaXMucHJpbnRUYXNrcyh0YXNrKX0pXHJcbiAgICAgIHRoaXMuY2JMaXN0ZW5lcigpXHJcbiAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvL2NoZWNrYm94IGxpc3RlbmVyIHdpbGwgbW92ZSB0YXNrcyBiZXR3ZWVuIGNvbXBsZXRlIGFuZCBpbmNvbXBsZXRlIGNvbnRhaW5lcnNcclxuICAvL2RhdGFiYXNlIFwiY29tcGxldGVcIiBwcm9wZXJ0eSB3aWxsIGJlIHBhdGNoZWQgYWNjb3JkaW5nbHkgYW5kIERPTSB1cGRhdGVkXHJcbiAgY2JMaXN0ZW5lciAoKSB7XHJcbiAgICBjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpXHJcblxyXG4gICAgLy9pZiB0aGUgaWQgb2YgdGhlIGdyYW5kcGFyZW50IGNvbnRhaW5lciBpcyAjY29tcGxldGUsIHRoZW4gY2hlY2sgdGhlIGJveFxyXG4gICAgY2hlY2tib3hlcy5mb3JFYWNoKCAoY2hlY2tib3gpID0+IHtcclxuICAgICAgaWYgKGNoZWNrYm94LnBhcmVudE5vZGUucGFyZW50Tm9kZS5pZCA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgbGV0IHBhdGNoUHJvcGVydHk7XHJcbiAgICAgICAgLy9pZiBmYWxzZSAtPiB0cnVlXHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICAgIHBhdGNoUHJvcGVydHkgPSB7Y29tcGxldGU6IHRydWV9XHJcbiAgICAgICAgICAvL3BhdGNoIFwiY29tcGxldGVcIiBwcm9wZXJ0eSBvZiBkYXRhYmFzZSBvYmplY3QgdXNpbmcgcGFyZW50Tm9kZSAoc2VjdGlvbikgSUQgdG8gVFJVRVxyXG4gICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWAsIHBhdGNoUHJvcGVydHkpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vaWYgY2hlY2tib3ggaXMgdW5jaGVja2VkLi4uXHJcbiAgICAgICAgICBwYXRjaFByb3BlcnR5ID0ge2NvbXBsZXRlOiBmYWxzZX1cclxuICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gLCBwYXRjaFByb3BlcnR5KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gIH0sXHJcblxyXG4gIC8vZnVuY3Rpb24gdXNlZCB0byBlZGl0IHRhc2tzIGluIERPTSBhbmQgcGF0Y2ggbmV3IGluZm8gdG8gZGF0YWJhc2UgdGFzayBkZXNjcmlwdGlvbiBhbmQgZGF0ZVxyXG4gIHBhckxpc3RlbmVyICgpIHtcclxuICAgIC8vZ2V0IGFsbCBzZWN0aW9ucyBvbiBwYWdlXHJcbiAgICBsZXQgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VjdGlvblwiKVxyXG5cclxuICAgIC8vL2FkZCBjbGljayBsaXN0ZW5lciB0byBhbGwgc2VjdGlvbnNcclxuICAgIHNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XHJcbiAgICAgIHNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgLy9nZXQgaWQgb2YgdGFyZ2V0IHNlY3Rpb25cclxuICAgICAgICBjb25zdCBpZCA9IGUudGFyZ2V0LnBhcmVudE5vZGUuaWRcclxuXHJcbiAgICAgICAgLy9pZiBwYXJhZ3JhcGggY2xpY2tlZCBpcyB0YXNrIGRlc2NyaXB0aW9uLCBnZXQgdGV4dCBjb250ZW50XHJcbiAgICAgICAgLy9jcmVhdGUgbmV3IDxpbnB1dD4gdGVtcGxhdGUgKHdpdGggIElEISkgYW5kIHJlcGxhY2UgPHA+IHdpdGggPGlucHV0PlxyXG4gICAgICAgIC8vYWRkIGEga2V5ZG93biBsaXN0ZW5lciB0byB0aGUgaW5wdXQgYWZ0ZXIgaXQgaXMgaW4gRE9NIGFuZFxyXG4gICAgICAgIC8vcGF0Y2ggdGhlIHRhc2sgZGVzY3JpcHRpb24gdG8gZGF0YWJhc2Ugd2hlbiBFTlRFUiBpcyBwcmVzc2VkXHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRhYmxlLS10YXNrXCIpKSB7XHJcbiAgICAgICAgICBjb25zdCB0YXNrTmFtZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XHJcbiAgICAgICAgICBsZXQgdGVtcFRhc2tJbnB1dCA9IGA8aW5wdXQgaWQ9XCJ0ZW1wMVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke3Rhc2tOYW1lfVwiPmBcclxuICAgICAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKHRlbXBUYXNrSW5wdXQpXHJcbiAgICAgICAgICBjb25zdCB0ZW1wSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXAxXCIpO1xyXG4gICAgICAgICAgICB0ZW1wSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2hUYXNrID0ge3Rhc2s6IHRlbXBJbnB1dC52YWx1ZX1cclxuICAgICAgICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgaWQsIHBhdGNoVGFzaylcclxuICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy9pZiBwYXJhZ3JhcGggY2xpY2tlZCBpcyB0YXNrIGR1ZSBkYXRlLCBnZXQgdGV4dCBjb250ZW50XHJcbiAgICAgICAgLy9jcmVhdGUgbmV3IDxpbnB1dD4gdGVtcGxhdGUgKHdpdGggIElEISkgYW5kIHJlcGxhY2UgPHA+IHdpdGggPGlucHV0PlxyXG4gICAgICAgIC8vYWRkIGEgY2hhbmdlIGxpc3RlbmVyIHRvIHRoZSBpbnB1dCBhZnRlciBpdCBpcyBpbiBET00gYW5kXHJcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkdWUgZGF0ZSB0byBkYXRhYmFzZSB3aGVuIG5ldyBkYXRlIGlzIHNlbGVjdGVkXHJcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0YWJsZS0tZGF0ZVwiKSkge1xyXG4gICAgICAgICAgY29uc3QgdGFza0RhdGUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxyXG4gICAgICAgICAgbGV0IHRlbXBUYXNrRGF0ZSA9IGA8aW5wdXQgaWQ9XCJ0ZW1wMlwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke3Rhc2tEYXRlfVwiPmBcclxuICAgICAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKHRlbXBUYXNrRGF0ZSlcclxuICAgICAgICAgICAgY29uc3QgdGVtcERhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcDJcIik7XHJcbiAgICAgICAgICAgIHRlbXBEYXRlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2hEYXRlID0ge2R1ZURhdGU6IHRlbXBEYXRlSW5wdXQudmFsdWV9XHJcbiAgICAgICAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGlkLCBwYXRjaERhdGUpXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfSxcclxuXHJcbiAgLy9jcmVhdGVzIG5ldyB0YXNrIGlucHV0IGZpZWxkIHdpdGggYXBwZW5kIGJ1dHRvbiBpbnNpZGUgZmlyc3Qgc2VjdGlvbiBvZiBJTkNPTVBMRVRFIGNvbnRhaW5lclxyXG4gIG5ld1Rhc2sgKCkge1xyXG4gICAgY29uc3QgbmV3VGFza0ZpZWxkID0gbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXctLXRhc2tcIn0sXHJcbiAgICBuZXcgY29tcC5idG4gKFwiK1wiKSxcclxuICAgIG5ldyBjb21wLmlucHV0KHtpZDogXCJpbnB1dC0tdGFza1wiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwidHlwZSBuZXcgdGFzayBoZXJlXCJ9KSxcclxuICAgIG5ldyBjb21wLmlucHV0KHtpZDogXCJpbnB1dC0tZGF0ZVwiLCB0eXBlOiBcImRhdGVcIn0pKS5yZW5kZXIoXCIjaW5jb21wbGV0ZVwiKVxyXG5cclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIilcclxuICAgIGNvbnN0IGlucHV0X3Rhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LS10YXNrXCIpXHJcbiAgICBjb25zdCBpbnB1dF9kYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC0tZGF0ZVwiKVxyXG5cclxuICAgIC8vYnV0dG9uIGNsaWNrIHBvc3RzIG5ldyB0YXNrIHRvIGRhdGFiYXNlIGFuZCByZXNldHMgbmV3IHRhc2sgaW5wdXQgc3RyaW5nc1xyXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICBpZiAoaW5wdXRfdGFzay52YWx1ZSA9PT0gXCJcIiB8fCBpbnB1dF9kYXRlLnZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHRhc2tJdGVtID0ge1xyXG4gICAgICAgICAgdGFzazogaW5wdXRfdGFzay52YWx1ZSxcclxuICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcclxuICAgICAgICAgIGR1ZURhdGU6IGlucHV0X2RhdGUudmFsdWUsXHJcbiAgICAgICAgICAvKlxyXG4gICAgICAgICAgTkVFRCBUTyBVUERBVEUgVVNFUiBJRCBUTyBTQVZFIFNFU1NJT04gQVNTSUdORUQgSURcclxuICAgICAgICAgICovXHJcbiAgICAgICAgICB1c2VySWQ6IDMsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFQSS5zYXZlSXRlbShcInRhc2tzXCIsIHRhc2tJdGVtKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wcmludFRhc2tzKGRhdGEpXHJcbiAgICAgICAgICB0aGlzLmNiTGlzdGVuZXIoKVxyXG4gICAgICAgICAgdGhpcy5wYXJMaXN0ZW5lcigpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpbnB1dF90YXNrLnZhbHVlID0gXCJcIlxyXG4gICAgICAgIGlucHV0X2RhdGUudmFsdWUgPSBcIlwiXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZFRhc2tzIl19
