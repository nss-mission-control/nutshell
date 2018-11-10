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

},{"./components":3,"./login":5,"./register":9}],5:[function(require,module,exports){
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

},{"./components":3,"./register":9}],6:[function(require,module,exports){
"use strict";

var _components = _interopRequireDefault(require("./components"));

var _landing = _interopRequireDefault(require("./landing"));

var _messages = _interopRequireDefault(require("./messages"));

var _tasks = _interopRequireDefault(require("./tasks"));

var _news = _interopRequireDefault(require("./news"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// landingPageFuncs.loadLandingPage();
// buildMessages.messageMap();
_tasks.default.buildContainers(); // buildNews.newsMap()

},{"./components":3,"./landing":4,"./messages":7,"./news":8,"./tasks":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _apiData = _interopRequireDefault(require("./apiData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildMessages = {
  printMessages(messageObj) {
    const message = new _components.default.section({
      className: "message",
      id: `${messageObj.id}`
    }, new _components.default.title("h2", {}, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`), new _components.default.title("h1", {}, messageObj.messageContent)).render(".container--inner");
  },

  messageMap() {
    document.querySelector(".container--inner").innerHTML = "";

    _apiData.default.getAllCategory("messages/?_expand=user").then(messageObj => messageObj.forEach(message => {
      console.log(message);
      this.printMessages(message);
    })).then(() => this.newMessage()); //check promise return on this line

  },

  newMessage() {
    const newMessageField = new _components.default.section({
      className: "new--message"
    }, new _components.default.title("h1", {}, "New Message"), new _components.default.textarea({
      placeholder: "type your message here",
      wrap: "hard"
    }), new _components.default.btn("Submit")).render(".container--inner");
  }

};
var _default = buildMessages;
exports.default = _default;

},{"./apiData":2,"./components":3}],8:[function(require,module,exports){
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

},{"./apiData":2,"./components":3}],9:[function(require,module,exports){
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

},{"./components":3,"./login":5}],10:[function(require,module,exports){
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
        console.log("content missing", input_task.value, input_date.value, "x");
      } else {
        console.log("content exists", input_task.value, input_date.value);
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

},{"./apiData":2,"./components":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvbGFuZGluZy5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9uZXdzLmpzIiwiLi4vc2NyaXB0cy9yZWdpc3Rlci5qcyIsIi4uL3NjcmlwdHMvdGFza3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxNQUFNLEVBQTVCOztBQUVBLE1BQU0sWUFBTixDQUFtQjtBQUNmLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLEdBQUcsUUFBdEIsRUFBZ0M7QUFDdkMsU0FBSyxhQUFMLElBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQXRCO0FBRUE7Ozs7O0FBSUEsUUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDaEMsV0FBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLFVBQWxDO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FIRCxNQUdPLElBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ3ZDLFdBQUssYUFBTCxJQUFzQixNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssYUFBTCxDQUFkLEVBQW1DLFVBQW5DLENBQXRCO0FBQ0g7O0FBRUQsUUFBSSxRQUFRLENBQUMsTUFBYixFQUFxQjtBQUNqQixNQUFBLFFBQVEsQ0FBQyxPQUFULENBQWlCLEtBQUssSUFBSTtBQUN0QjtBQUNBLFlBQUksS0FBSyxDQUFDLE9BQU4sWUFBeUIsTUFBTSxDQUFDLE9BQXBDLEVBQTZDO0FBQ3pDLGVBQUssYUFBTCxFQUFv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ZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGVsZW1lbnRTeW1ib2wgPSBTeW1ib2woKVxuXG5jbGFzcyBET01Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIElmIGBhdHRyaWJ1dGVzYCBpcyBqdXN0IGEgc3RyaW5nLCBpdCdzIGEgc2ltcGxlIGVsZW1lbnQgd2l0aCBub1xuICAgICAgICAgICAgcHJvcGVydGllcyAtIGp1c3Qgc29tZSB0ZXh0IGNvbnRlbnRcbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gYXR0cmlidXRlc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IE9iamVjdC5hc3NpZ24odGhpc1tlbGVtZW50U3ltYm9sXSwgYXR0cmlidXRlcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9uZSBIVE1MRWxlbWVudCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmVsZW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGNoaWxkLmVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQW4gYXJyYXkgb2YgZWxlbWVudHMgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaGlsZC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5lbGVtZW50LmZvckVhY2goYyA9PiB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGMpKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZyB2YWx1ZSB3YXMgcGFzc2VkIGluLCBzZXQgdGV4dCBjb250ZW50XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS50ZXh0Q29udGVudCA9IGNoaWxkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZ2V0IGVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tlbGVtZW50U3ltYm9sXVxuICAgIH1cblxuICAgIHJlbmRlcihjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpc1tlbGVtZW50U3ltYm9sXSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpLmFwcGVuZENoaWxkKGZyYWdtZW50KVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBET01Db21wb25lbnRcbiIsImNvbnN0IFVSTCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L1wiXG5cbmNvbnN0IEFQSSA9IHtcbiAgZ2V0QWxsQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YClcbiAgICAgIC50aGVuKGVudHJpZXMgPT4gZW50cmllcy5qc29uKCkpXG4gIH0sXG5cbiAgZ2V0T25lRnJvbUNhdGVnb3J5KGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0/aWQ9JHtpZH1gKVxuICAgICAgLnRoZW4oaW5wdXRzID0+IGlucHV0cy5qc29uKCkpXG4gIH0sXG5cbiAgc2F2ZUl0ZW0oY2F0ZWdvcnksIGl0ZW0pe1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfVxuICAgICkudGhlbihqc29uRGF0YSA9PiBqc29uRGF0YS5qc29uKCkpXG4gIH0sXG5cbiAgZGVsZXRlSXRlbShjYXRlZ29yeSwgaWQpe1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0/aWQ9JHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfVxuICAgIClcbiAgfSxcblxuICB1cGRhdGVJdGVtKGNhdGVnb3J5LCBpZCwgaXRlbSl7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfVxuICAgIClcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiaW1wb3J0IERPTUNvbXBvbmVudCBmcm9tIFwiLi4vbGliL25vZGVfbW9kdWxlcy9uc3MtZG9tY29tcG9uZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5jcmVhdGUobnVsbCwge1xyXG4gIGRpdjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGRpdiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkaXZcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGJ0bjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGJ0biBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYnV0dG9uXCIsIHtjbGFzc05hbWU6IFwiYnRuXCIsIHR5cGU6IFwiYnV0dG9uXCJ9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW5wdXQ6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBpbnB1dCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbnB1dFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VjdGlvbjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHNlY3Rpb24gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwic2VjdGlvblwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGl0bGU6IHsgLy9kZWZpbmUgYW55IHR5cGUgb2YgaCMuLiBoMSwgaDIsIGV0Yy5cclxuICAgIHZhbHVlOiBjbGFzcyB0aXRsZSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBhbmNob3I6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBhbmNob3IgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2hlY2tib3g6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBjaGVja2JveCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbnB1dFwiLCB7dHlwZTogXCJjaGVja2JveFwiLCBjbGFzc05hbWU6IFwiY2JcIn0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbWFnZToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGltYWdlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImltZ1wiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB1bCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ1bFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGk6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsaSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsaVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGZvcm0gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZm9ybVwiLHt9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGFiZWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsYWJlbCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsYWJlbFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGV4dGFyZWE6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB0ZXh0YXJlYSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ0ZXh0YXJlYVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFyOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgcGFyIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInBcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBsb2dJbkZ1bmNzIGZyb20gXCIuL2xvZ2luXCJcclxuaW1wb3J0IHJlZ2lzdGVyRnVuY3MgZnJvbSBcIi4vcmVnaXN0ZXJcIlxyXG5cclxuY29uc3QgbGFuZGluZ1BhZ2VGdW5jcyA9IHtcclxuICBsb2FkTGFuZGluZ1BhZ2UoKSB7XHJcbiAgICBsZXQgZGl2MiA9IG5ldyBjb21wLmRpdihcclxuICAgICAgeyBjbGFzc0xpc3Q6IFwid2VsY29tZVwiIH0sXHJcbiAgICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGl0bGVcIiB9LCBcIldlbGNvbWUgdG8gTWlzc2lvbiBDb250cm9sXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJMb2dpblwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiUmVnaXN0ZXJcIikpXHJcbiAgICBkaXYyLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBsZXQgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIilcclxuXHJcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luXCIpIHtcclxuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbGFuZGluZ1BhZ2VGdW5jcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IHJlZ2lzdGVyRnVuY3MgZnJvbSBcIi4vcmVnaXN0ZXJcIlxuXG5jb25zdCBsb2dJbkZ1bmNzID0ge1xuICBsb2FkTG9nSW4oKXtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIGxldCBsb2dJbiA9IG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJVc2VybmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcInVzZXJuYW1lXCIsIHBsYWNlaG9sZGVyOiBcInVzZXJuYW1lXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwicGFzc3dvcmRcIn0sIFwiUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJQYXNzd29yZFwifSksXG4gICAgICBuZXcgY29tcC5idG4oXCJMb2dpbiBOb3dcIiksXG4gICAgICBuZXcgY29tcC5idG4oXCJOb3QgYSB1c2VyPyBDcmVhdGUgbmV3IGFjY291bnQuXCIpXG4gICAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJMb2dpbiBOb3dcIikge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gbm93XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlZ2lzdGVyRnVuY3MubG9hZFJlZ2lzdGVyKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGxvZ0luRnVuY3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IGxhbmRpbmdQYWdlRnVuY3MgZnJvbSBcIi4vbGFuZGluZ1wiXHJcbmltcG9ydCBidWlsZE1lc3NhZ2VzIGZyb20gXCIuL21lc3NhZ2VzXCJcclxuaW1wb3J0IGJ1aWxkVGFza3MgZnJvbSBcIi4vdGFza3NcIlxyXG5pbXBvcnQgYnVpbGROZXdzIGZyb20gXCIuL25ld3NcIlxyXG5cclxuLy8gbGFuZGluZ1BhZ2VGdW5jcy5sb2FkTGFuZGluZ1BhZ2UoKTtcclxuLy8gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCk7XHJcbmJ1aWxkVGFza3MuYnVpbGRDb250YWluZXJzKCk7XHJcbi8vIGJ1aWxkTmV3cy5uZXdzTWFwKClcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcblxyXG5cclxuY29uc3QgYnVpbGRNZXNzYWdlcyA9IHtcclxuICBwcmludE1lc3NhZ2VzIChtZXNzYWdlT2JqKSB7XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZSA9IG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibWVzc2FnZVwiLCBpZDogYCR7bWVzc2FnZU9iai5pZH1gfSxcclxuICAgIG5ldyBjb21wLnRpdGxlKCBcImgyXCIsIHt9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxyXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgfSxcclxuXHJcbiAgbWVzc2FnZU1hcCAoKSAge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcIm1lc3NhZ2VzLz9fZXhwYW5kPXVzZXJcIilcclxuICAgIC50aGVuKG1lc3NhZ2VPYmogPT4gbWVzc2FnZU9iai5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgICAgdGhpcy5wcmludE1lc3NhZ2VzKG1lc3NhZ2UpfSkpXHJcbiAgICAgIC50aGVuKCgpID0+IHRoaXMubmV3TWVzc2FnZSgpKSAvL2NoZWNrIHByb21pc2UgcmV0dXJuIG9uIHRoaXMgbGluZVxyXG5cclxuICB9LFxyXG5cclxuICBuZXdNZXNzYWdlICgpIHtcclxuICAgIGNvbnN0IG5ld01lc3NhZ2VGaWVsZCA9IG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS1tZXNzYWdlXCJ9LFxyXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge30sIFwiTmV3IE1lc3NhZ2VcIiksXHJcbiAgICBuZXcgY29tcC50ZXh0YXJlYSAoe3BsYWNlaG9sZGVyOiBcInR5cGUgeW91ciBtZXNzYWdlIGhlcmVcIiwgd3JhcDogXCJoYXJkXCJ9KSxcclxuICAgIG5ldyBjb21wLmJ0biAoXCJTdWJtaXRcIikpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgfVxyXG5cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBidWlsZE1lc3NhZ2VzXHJcbiIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcblxuXG5jb25zdCBidWlsZE5ld3MgPSB7XG4gIHByaW50TmV3cyhuZXdzT2JqKSB7XG5cbiAgICBjb25zdCBuZXdzID0gbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXdzXCIsIGlkOiBgJHtuZXdzT2JqLmlkfWB9LFxuICAgIG5ldyBjb21wLmFuY2hvcih7aHJlZjogYCR7bmV3c09iai51cmx9YCwgdGFyZ2V0OiBcIl9ibGFua1wifSwgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke25ld3NPYmouYXJ0aWNsZUltYWdlfWAsIGFsdDogXCJBcnRpY2xlIEltYWdlXCIsIGhlaWdodDogXCIxMjBcIiwgd2lkdGg6IFwiMTIwXCJ9KSksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMlwiLCB7fSwgYCR7bmV3c09iai5hcnRpY2xlTmFtZX1gKSxcbiAgICBuZXcgY29tcC50aXRsZShcImg0XCIsIHt9LCBgU2F2ZWQgYnk6ICR7bmV3c09iai51c2VyLmZpcnN0TmFtZX0gfCBEYXRlIFNhdmVkOiAke25ld3NPYmouZGF0ZVNhdmVkfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG5ld3NPYmouYWJvdXQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG4gIG5ld3NNYXAgKCkgIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcImFydGljbGVzLz9fZXhwYW5kPXVzZXImX3NvcnQ9ZGF0ZVNhdmVkJl9vcmRlcj1kZXNjXCIpXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhuZXdzKTtcbiAgICAgIHRoaXMucHJpbnROZXdzKG5ld3MpfSkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLm5ld05ld3MoKSlcblxuICB9LFxuXG4gIG5ld05ld3MgKCkge1xuICAgIGNvbnN0IG5ld05ld3MgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tbmV3c1wifSxcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7fSwgXCJTYXZlIE5ld3MgQXJ0aWNsZVwiKSxcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlTmFtZVwifSwgXCJBcnRpY2xlIE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIE5hbWVcIiwgaWQ6IFwiYXJ0aWNsZU5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZVVybFwifSwgXCJBcnRpY2xlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTGlua1wiLCBpZDogXCJhcnRpY2xlTGlua1wifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVJbWFnZVVybFwifSwgXCJBcnRpY2xlIEltYWdlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlSW1hZ2VVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIsIGlkOiBcImFydGljbGVJbWFnZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVEZXNjcmlwdGlvblwifSwgXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgRGVzY3JpcHRpb25cIiwgaWQ6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlNhdmUgTmV3IEFydGljbGVcIilcbiAgICApLFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICBsZXQgc3RvcnkgPSB7XG4gICAgICAgIGFydGljbGVOYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVOYW1lXCIpLnZhbHVlLFxuICAgICAgICB1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUxpbmtcIikudmFsdWUsXG4gICAgICAgIGFydGljbGVJbWFnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlSW1hZ2VcIikudmFsdWUsXG4gICAgICAgIGFib3V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVEZXNjcmlwdGlvblwiKS52YWx1ZSxcbiAgICAgICAgLypcbiAgICAgICAgTkVFRCBUTyBVUERBVEUgVVNFUiBJRCBUTyBTQVZFIFNFU1NJT04gQVNTSUdORUQgSURcbiAgICAgICAgKi9cbiAgICAgICAgdXNlcklkOiAyLFxuICAgICAgICBkYXRlU2F2ZWQ6IG5ldyBEYXRlKClcbiAgICAgIH1cbiAgICAgIGJ1aWxkTmV3cy5hZGROZXdzKHN0b3J5KVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkTmV3cyhzdG9yeSl7XG4gICAgQVBJLnNhdmVJdGVtKFwiYXJ0aWNsZXNcIiwgc3RvcnkpLnRoZW4oKCk9PiB0aGlzLm5ld3NNYXAoKSlcbiAgfVxuXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTmV3cyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIjtcblxuY29uc3QgcmVnaXN0ZXJGdW5jcyA9IHtcbiAgbG9hZFJlZ2lzdGVyKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBsZXQgcmVnaXN0ZXIgPSBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRmlyc3QgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImZpcnN0TmFtZVwiLCBwbGFjZWhvbGRlcjogXCJGaXJzdCBOYW1lXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkxhc3QgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImxhc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkxhc3QgTmFtZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJFbWFpbFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJlbWFpbFwiLCBuYW1lOiBcImVtYWlsXCIsIHBsYWNlaG9sZGVyOiBcImVtYWlsXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJwYXNzd29yZFwifSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiY29uZmlybVBhc3N3b3JkXCJ9LCBcIkNvbmZpcm0gUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJjb25maXJtUGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBQYXNzd29yZFwifSksXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlciBBY2NvdW50XCIpLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiQWxyZWFkeSBhIHVzZXI/IExvZyBpbiBub3dcIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiUmVnaXN0ZXIgQWNjb3VudFwiKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWdpc3RlcmluZyBuZXcgYWNjb3VudFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9XG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcblxyXG5cclxuY29uc3QgYnVpbGRUYXNrcyA9IHtcclxuXHJcbiAgLy9mdW5jdGlvbiBydW4gZmlyc3QgaW4gb3JkZXIgdG8gY2xlYXIgSFRNTCwgY3JlYXRlIHBhcmVudCBjb250YWluZXJzLCB0aGVuIGFkZCBuZXcgdGFzayBpbnB1dCBhbmQgY2FsbCBmZXRjaFxyXG4gIGJ1aWxkQ29udGFpbmVycyAoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgY29uc3QgdGl0bGUxID0gbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge2NsYXNzTmFtZTogXCJ0aXRsZS0taW5jb21wbGV0ZVwifSwgXCJJbmNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBjb25zdCBpbmNvbXBsZXRlID0gbmV3IGNvbXAuZGl2ICh7aWQ6IFwiaW5jb21wbGV0ZVwifSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGNvbnN0IHRpdGxlMiA9IG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHtjbGFzc05hbWU6IFwidGl0bGUtLWNvbXBsZXRlXCJ9LCBcIkNvbXBsZXRlIFRhc2tzXCIpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgICBjb25zdCBjb21wbGV0ZSA9IG5ldyBjb21wLmRpdiAoe2lkOiBcImNvbXBsZXRlXCJ9KS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgdGhpcy5uZXdUYXNrKClcclxuICAgIHRoaXMudGFza3NGZXRjaCgpXHJcbiAgfSxcclxuXHJcbiAgLy91c2VkIHRvIGNyZWF0ZSBhbmQgYXBwZW5kIGFsbCB0YXNrcyBmcm9tIGRhdGFiYXNlIHRvIERPTVxyXG4gIHByaW50VGFza3MgKHRhc2tzT2JqKSB7XHJcbiAgICBsZXQgb3V0cHV0Q29udGFpbmVyO1xyXG5cclxuICAgIGlmICh0YXNrc09iai5jb21wbGV0ZSkge1xyXG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNjb21wbGV0ZVwiXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvdXRwdXRDb250YWluZXIgPSBcIiNpbmNvbXBsZXRlXCJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXNrID0gbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJ0YXNrXCIsIGlkOiBgJHt0YXNrc09iai5pZH1gfSxcclxuICAgIG5ldyBjb21wLmNoZWNrYm94KCksXHJcbiAgICBuZXcgY29tcC5wYXIoe2NsYXNzTmFtZTogXCJlZGl0YWJsZS0tdGFza1wifSwgdGFza3NPYmoudGFzayksXHJcbiAgICBuZXcgY29tcC5wYXIoe2NsYXNzTmFtZTogXCJlZGl0YWJsZS0tZGF0ZVwifSwgdGFza3NPYmouZHVlRGF0ZSkpLnJlbmRlcihvdXRwdXRDb250YWluZXIpXHJcbiAgfSxcclxuXHJcbiAgLy9mZXRjaCBhbGwgdGFza3MgZnJvbSBkYXRhYmFzZSwgY2FsbCBjcmVhdGUvYXBwZW5kIGFuZCBjYWxsIGFkZCBsaXN0ZW5lcnNcclxuICB0YXNrc0ZldGNoICgpICB7XHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJ0YXNrc1wiKSAvL2NoZWNrIGlmIHVzZXIgaXMgc2FtZSBhcyBzZXNzaW9uIHN0b3JhZ2VcclxuICAgIC50aGVuKHRhc2tzT2JqID0+ICB7XHJcbiAgICAgIHRhc2tzT2JqLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgIHRoaXMucHJpbnRUYXNrcyh0YXNrKX0pXHJcbiAgICAgIHRoaXMuY2JMaXN0ZW5lcigpXHJcbiAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvL2NoZWNrYm94IGxpc3RlbmVyIHdpbGwgbW92ZSB0YXNrcyBiZXR3ZWVuIGNvbXBsZXRlIGFuZCBpbmNvbXBsZXRlIGNvbnRhaW5lcnNcclxuICAvL2RhdGFiYXNlIFwiY29tcGxldGVcIiBwcm9wZXJ0eSB3aWxsIGJlIHBhdGNoZWQgYWNjb3JkaW5nbHkgYW5kIERPTSB1cGRhdGVkXHJcbiAgY2JMaXN0ZW5lciAoKSB7XHJcbiAgICBjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpXHJcblxyXG4gICAgLy9pZiB0aGUgaWQgb2YgdGhlIGdyYW5kcGFyZW50IGNvbnRhaW5lciBpcyAjY29tcGxldGUsIHRoZW4gY2hlY2sgdGhlIGJveFxyXG4gICAgY2hlY2tib3hlcy5mb3JFYWNoKCAoY2hlY2tib3gpID0+IHtcclxuICAgICAgaWYgKGNoZWNrYm94LnBhcmVudE5vZGUucGFyZW50Tm9kZS5pZCA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgbGV0IHBhdGNoUHJvcGVydHk7XHJcbiAgICAgICAgLy9pZiBmYWxzZSAtPiB0cnVlXHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICAgIHBhdGNoUHJvcGVydHkgPSB7Y29tcGxldGU6IHRydWV9XHJcbiAgICAgICAgICAvL3BhdGNoIFwiY29tcGxldGVcIiBwcm9wZXJ0eSBvZiBkYXRhYmFzZSBvYmplY3QgdXNpbmcgcGFyZW50Tm9kZSAoc2VjdGlvbikgSUQgdG8gVFJVRVxyXG4gICAgICAgICAgQVBJLnVwZGF0ZUl0ZW0oXCJ0YXNrc1wiLCBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWAsIHBhdGNoUHJvcGVydHkpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vaWYgY2hlY2tib3ggaXMgdW5jaGVja2VkLi4uXHJcbiAgICAgICAgICBwYXRjaFByb3BlcnR5ID0ge2NvbXBsZXRlOiBmYWxzZX1cclxuICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gLCBwYXRjaFByb3BlcnR5KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLmJ1aWxkQ29udGFpbmVycygpKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gIH0sXHJcblxyXG4gIC8vZnVuY3Rpb24gdXNlZCB0byBlZGl0IHRhc2tzIGluIERPTSBhbmQgcGF0Y2ggbmV3IGluZm8gdG8gZGF0YWJhc2UgdGFzayBkZXNjcmlwdGlvbiBhbmQgZGF0ZVxyXG4gIHBhckxpc3RlbmVyICgpIHtcclxuICAgIC8vZ2V0IGFsbCBzZWN0aW9ucyBvbiBwYWdlXHJcbiAgICBsZXQgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VjdGlvblwiKVxyXG5cclxuICAgIC8vL2FkZCBjbGljayBsaXN0ZW5lciB0byBhbGwgc2VjdGlvbnNcclxuICAgIHNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiB7XHJcbiAgICAgIHNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgLy9nZXQgaWQgb2YgdGFyZ2V0IHNlY3Rpb25cclxuICAgICAgICBjb25zdCBpZCA9IGUudGFyZ2V0LnBhcmVudE5vZGUuaWRcclxuXHJcbiAgICAgICAgLy9pZiBwYXJhZ3JhcGggY2xpY2tlZCBpcyB0YXNrIGRlc2NyaXB0aW9uLCBnZXQgdGV4dCBjb250ZW50XHJcbiAgICAgICAgLy9jcmVhdGUgbmV3IDxpbnB1dD4gdGVtcGxhdGUgKHdpdGggIElEISkgYW5kIHJlcGxhY2UgPHA+IHdpdGggPGlucHV0PlxyXG4gICAgICAgIC8vYWRkIGEga2V5ZG93biBsaXN0ZW5lciB0byB0aGUgaW5wdXQgYWZ0ZXIgaXQgaXMgaW4gRE9NIGFuZFxyXG4gICAgICAgIC8vcGF0Y2ggdGhlIHRhc2sgZGVzY3JpcHRpb24gdG8gZGF0YWJhc2Ugd2hlbiBFTlRFUiBpcyBwcmVzc2VkXHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRhYmxlLS10YXNrXCIpKSB7XHJcbiAgICAgICAgICBjb25zdCB0YXNrTmFtZSA9IGUudGFyZ2V0LnRleHRDb250ZW50XHJcbiAgICAgICAgICBsZXQgdGVtcFRhc2tJbnB1dCA9IGA8aW5wdXQgaWQ9XCJ0ZW1wMVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke3Rhc2tOYW1lfVwiPmBcclxuICAgICAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKHRlbXBUYXNrSW5wdXQpXHJcbiAgICAgICAgICBjb25zdCB0ZW1wSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXAxXCIpO1xyXG4gICAgICAgICAgICB0ZW1wSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2hUYXNrID0ge3Rhc2s6IHRlbXBJbnB1dC52YWx1ZX1cclxuICAgICAgICAgICAgICAgIEFQSS51cGRhdGVJdGVtKFwidGFza3NcIiwgaWQsIHBhdGNoVGFzaylcclxuICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5idWlsZENvbnRhaW5lcnMoKSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy9pZiBwYXJhZ3JhcGggY2xpY2tlZCBpcyB0YXNrIGR1ZSBkYXRlLCBnZXQgdGV4dCBjb250ZW50XHJcbiAgICAgICAgLy9jcmVhdGUgbmV3IDxpbnB1dD4gdGVtcGxhdGUgKHdpdGggIElEISkgYW5kIHJlcGxhY2UgPHA+IHdpdGggPGlucHV0PlxyXG4gICAgICAgIC8vYWRkIGEgY2hhbmdlIGxpc3RlbmVyIHRvIHRoZSBpbnB1dCBhZnRlciBpdCBpcyBpbiBET00gYW5kXHJcbiAgICAgICAgLy9wYXRjaCB0aGUgdGFzayBkdWUgZGF0ZSB0byBkYXRhYmFzZSB3aGVuIG5ldyBkYXRlIGlzIHNlbGVjdGVkXHJcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0YWJsZS0tZGF0ZVwiKSkge1xyXG4gICAgICAgICAgY29uc3QgdGFza0RhdGUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxyXG4gICAgICAgICAgbGV0IHRlbXBUYXNrRGF0ZSA9IGA8aW5wdXQgaWQ9XCJ0ZW1wMlwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke3Rhc2tEYXRlfVwiPmBcclxuICAgICAgICAgICQoZS50YXJnZXQpLnJlcGxhY2VXaXRoKHRlbXBUYXNrRGF0ZSlcclxuICAgICAgICAgICAgY29uc3QgdGVtcERhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcDJcIik7XHJcbiAgICAgICAgICAgIHRlbXBEYXRlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2hEYXRlID0ge2R1ZURhdGU6IHRlbXBEYXRlSW5wdXQudmFsdWV9XHJcbiAgICAgICAgICAgICAgICBBUEkudXBkYXRlSXRlbShcInRhc2tzXCIsIGlkLCBwYXRjaERhdGUpXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYnVpbGRDb250YWluZXJzKCkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfSxcclxuXHJcbiAgLy9jcmVhdGVzIG5ldyB0YXNrIGlucHV0IGZpZWxkIHdpdGggYXBwZW5kIGJ1dHRvbiBpbnNpZGUgZmlyc3Qgc2VjdGlvbiBvZiBJTkNPTVBMRVRFIGNvbnRhaW5lclxyXG4gIG5ld1Rhc2sgKCkge1xyXG4gICAgY29uc3QgbmV3VGFza0ZpZWxkID0gbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXctLXRhc2tcIn0sXHJcbiAgICBuZXcgY29tcC5idG4gKFwiK1wiKSxcclxuICAgIG5ldyBjb21wLmlucHV0KHtpZDogXCJpbnB1dC0tdGFza1wiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwidHlwZSBuZXcgdGFzayBoZXJlXCJ9KSxcclxuICAgIG5ldyBjb21wLmlucHV0KHtpZDogXCJpbnB1dC0tZGF0ZVwiLCB0eXBlOiBcImRhdGVcIn0pKS5yZW5kZXIoXCIjaW5jb21wbGV0ZVwiKVxyXG5cclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIilcclxuICAgIGNvbnN0IGlucHV0X3Rhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0LS10YXNrXCIpXHJcbiAgICBjb25zdCBpbnB1dF9kYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dC0tZGF0ZVwiKVxyXG5cclxuICAgIC8vYnV0dG9uIGNsaWNrIHBvc3RzIG5ldyB0YXNrIHRvIGRhdGFiYXNlIGFuZCByZXNldHMgbmV3IHRhc2sgaW5wdXQgc3RyaW5nc1xyXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICBpZiAoaW5wdXRfdGFzay52YWx1ZSA9PT0gXCJcIiB8fCBpbnB1dF9kYXRlLnZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb250ZW50IG1pc3NpbmdcIiwgaW5wdXRfdGFzay52YWx1ZSwgaW5wdXRfZGF0ZS52YWx1ZSwgXCJ4XCIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb250ZW50IGV4aXN0c1wiLCBpbnB1dF90YXNrLnZhbHVlLCBpbnB1dF9kYXRlLnZhbHVlKVxyXG4gICAgICAgIGxldCB0YXNrSXRlbSA9IHtcclxuICAgICAgICAgIHRhc2s6IGlucHV0X3Rhc2sudmFsdWUsXHJcbiAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgICBkdWVEYXRlOiBpbnB1dF9kYXRlLnZhbHVlLFxyXG4gICAgICAgICAgLypcclxuICAgICAgICAgIE5FRUQgVE8gVVBEQVRFIFVTRVIgSUQgVE8gU0FWRSBTRVNTSU9OIEFTU0lHTkVEIElEXHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgICAgdXNlcklkOiAzLFxyXG4gICAgICAgIH1cclxuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJ0YXNrc1wiLCB0YXNrSXRlbSkudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgIHRoaXMucHJpbnRUYXNrcyhkYXRhKVxyXG4gICAgICAgICAgdGhpcy5jYkxpc3RlbmVyKClcclxuICAgICAgICAgIHRoaXMucGFyTGlzdGVuZXIoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaW5wdXRfdGFzay52YWx1ZSA9IFwiXCJcclxuICAgICAgICBpbnB1dF9kYXRlLnZhbHVlID0gXCJcIlxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRUYXNrcyJdfQ==
