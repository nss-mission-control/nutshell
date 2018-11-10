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
    }).then(data => data.json());
  },

  deleteItem(category, id) {
    return fetch(`${URL}${category}?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
  },

  updateItem(category, id) {
    return fetch(`${URL}${category}?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }
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

},{"./components":3,"./login":5,"./register":11}],5:[function(require,module,exports){
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

},{"./apiData":2,"./components":3,"./missionControl":8,"./register":11}],6:[function(require,module,exports){
"use strict";

var _landing = _interopRequireDefault(require("./landing"));

var _nav = _interopRequireDefault(require("./nav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nav.default.loadNavBar();

_landing.default.loadLandingPage();

},{"./landing":4,"./nav":9}],7:[function(require,module,exports){
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
    new _components.default.section({
      className: "message",
      id: `${messageObj.id}`
    }, new _components.default.image({
      src: `${messageObj.user.profilePic}`,
      alt: "Profile Pic",
      style: "display:inline-block; border-radius: 8px; margin: 4px",
      height: "25",
      width: "25"
    }), new _components.default.title("h2", {
      style: "display: inline-block; position: relative; bottom: 10px"
    }, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`), new _components.default.title("h1", {}, messageObj.messageContent)).render(".container--inner");
  },

  messageMap() {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(user);
    document.querySelector(".container--inner").innerHTML = "";

    _apiData.default.getAllCategory("messages/?_expand=user").then(messageObj => messageObj.forEach(message => {
      console.log(message);
      this.printMessages(message);
    })).then(() => this.newMessage());
  },

  newMessage() {
    new _components.default.section({
      className: "new--message"
    }, new _components.default.title("h1", {}, "New Message"), new _components.default.input({
      placeholder: "type your message here",
      type: "textarea"
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildMissionControl = {
  printPlaceholder() {
    document.querySelector(".container--inner").innerHTML = null;
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(user);
    new _components.default.section({
      className: "message",
      id: `${user.id}`
    }, new _components.default.image({
      src: `${user.profilePic}`,
      alt: "Profile Pic",
      style: "display:inline-block; border-radius: 8px; margin: 4px",
      height: "125",
      width: "125"
    }), new _components.default.title("h2", {
      style: "display: inline-block; position: relative; bottom: 10px"
    }, `${user.firstName} - ${user.lastName} ${user.username}`)).render(".container--inner");
  }

};
var _default = buildMissionControl;
exports.default = _default;

},{"./components":3}],9:[function(require,module,exports){
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
        console.log("Task function called.");
      } else if (event.target.textContent == "Events") {
        console.log("Events function called.");
      } else if (event.target.textContent == "Messages") {
        _messages.default.messageMap();
      } else if (event.target.textContent == "News") {
        _news.default.newsMap();
      } else if (event.target.textContent == "Friends") {
        console.log("Friends function calles.");
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

},{"./components":3,"./login":5,"./messages":7,"./missionControl":8,"./news":10}],10:[function(require,module,exports){
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
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(user);
    document.querySelector(".container--inner").innerHTML = "";

    _apiData.default.getAllCategory("articles/?_expand=user&_sort=dateSaved&_order=desc").then(newsObj => newsObj.forEach(news => {
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

},{"./apiData":2,"./components":3}],11:[function(require,module,exports){
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

},{"./apiData":2,"./components":3,"./login":5,"./missionControl":8}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvbGFuZGluZy5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9taXNzaW9uQ29udHJvbC5qcyIsIi4uL3NjcmlwdHMvbmF2LmpzIiwiLi4vc2NyaXB0cy9uZXdzLmpzIiwiLi4vc2NyaXB0cy9yZWdpc3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLE1BQU0sYUFBYSxHQUFHLE1BQU0sRUFBNUI7O0FBRUEsTUFBTSxZQUFOLENBQW1CO0FBQ2YsRUFBQSxXQUFXLENBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsR0FBRyxRQUF0QixFQUFnQztBQUN2QyxTQUFLLGFBQUwsSUFBc0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBdEI7QUFFQTs7Ozs7QUFJQSxRQUFJLE9BQU8sVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUNoQyxXQUFLLGFBQUwsRUFBb0IsV0FBcEIsR0FBa0MsVUFBbEM7QUFDQSxhQUFPLElBQVA7QUFDSCxLQUhELE1BR08sSUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDdkMsV0FBSyxhQUFMLElBQXNCLE1BQU0sQ0FBQyxNQUFQLENBQWMsS0FBSyxhQUFMLENBQWQsRUFBbUMsVUFBbkMsQ0FBdEI7QUFDSDs7QUFFRCxRQUFJLFFBQVEsQ0FBQyxNQUFiLEVBQXFCO0FBQ2pCLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3RCO0FBQ0EsWUFBSSxLQUFLLENBQUMsT0FBTixZQUF5QixNQUFNLENBQUMsT0FB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LENBQWlDLE9BQU8sSUFBSTtBQUMxQyxjQUFJLFdBQVcsR0FBRyxJQUFJLG9CQUFLLElBQVQsQ0FBYyxPQUFkLENBQWxCO0FBQ0EsVUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDBCQUFaLEVBQXdDLFdBQXhDLEVBRjBDLENBRzFDO0FBQ0E7O0FBQ0EsZUFBSyxXQUFMLENBQWlCLFdBQWpCO0FBQ0QsU0FORDtBQU9ELE9BUkQsTUFRTyxJQUFJLElBQUksQ0FBQyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQzVCLFFBQUEsS0FBSyxDQUFFLGFBQVksSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRLFFBQVMsaURBQS9CLENBQUw7QUFDRDtBQUNGLEtBWkQ7QUFhRCxHQXRFbUI7O0FBd0VwQjtBQUNBLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTztBQUNoQixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWjtBQUNBLElBQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsYUFBdkIsRUFBc0MsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLENBQXRDOztBQUNBLDRCQUFvQixnQkFBcEI7QUFDRDs7QUE3RW1CLENBQXRCO2VBZ0ZlLGEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWxlbWVudFN5bWJvbCA9IFN5bWJvbCgpXG5cbmNsYXNzIERPTUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgSWYgYGF0dHJpYnV0ZXNgIGlzIGp1c3QgYSBzdHJpbmcsIGl0J3MgYSBzaW1wbGUgZWxlbWVudCB3aXRoIG5vXG4gICAgICAgICAgICBwcm9wZXJ0aWVzIC0ganVzdCBzb21lIHRleHQgY29udGVudFxuICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gT2JqZWN0LmFzc2lnbih0aGlzW2VsZW1lbnRTeW1ib2xdLCBhdHRyaWJ1dGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25lIEhUTUxFbGVtZW50IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoY2hpbGQuZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBbiBhcnJheSBvZiBlbGVtZW50cyB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVsZW1lbnQuZm9yRWFjaChjID0+IHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoYykpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nIHZhbHVlIHdhcyBwYXNzZWQgaW4sIHNldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2VsZW1lbnRTeW1ib2xdXG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzW2VsZW1lbnRTeW1ib2xdKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERPTUNvbXBvbmVudFxuIiwiY29uc3QgVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODgvXCJcblxuY29uc3QgQVBJID0ge1xuICBnZXRBbGxDYXRlZ29yeShjYXRlZ29yeSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gKVxuICAgICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBnZXRPbmVGcm9tQ2F0ZWdvcnkoY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWApXG4gICAgICAudGhlbihpbnB1dHMgPT4gaW5wdXRzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSXRlbShjYXRlZ29yeSwgaXRlbSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfSkudGhlbihkYXRhID0+IGRhdGEuanNvbigpKVxuICB9LFxuXG4gIGRlbGV0ZUl0ZW0oY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIHVwZGF0ZUl0ZW0oY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfVxuICAgIH0pXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBET01Db21wb25lbnQgZnJvbSBcIi4uL2xpYi9ub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKG51bGwsIHtcclxuXHJcbiAgdXNlcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIFVzZXIge1xyXG4gICAgICBjb25zdHJ1Y3Rvcih0ZW1wSW5mbykge1xyXG4gICAgICAgIHRoaXMuaWQgPSB0ZW1wSW5mby5pZDtcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IHRlbXBJbmZvLmZpcnN0TmFtZTtcclxuICAgICAgICB0aGlzLmxhc3ROYW1lID0gdGVtcEluZm8ubGFzdE5hbWU7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRlbXBJbmZvLnVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSB0ZW1wSW5mby5wYXNzd29yZDtcclxuICAgICAgICB0aGlzLmVtYWlsID0gdGVtcEluZm8uZW1haWw7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlUGljID0gdGVtcEluZm8ucHJvZmlsZVBpYztcclxuICAgIH1cclxuICAgIC8vVE9ETzogdGhpcyBpcyBqdXN0IGEgdGVzdCBmdW5jdGlvbi4gd2Ugd291bGQgaGF2ZSB0aGUgYWJpbGl0eSB0byBjYWxsIGZvciBzYXZpbmdcclxuICAgIC8vIG1lc3NhZ2VzLGFydGljbGVzLCBldmVudHMgYmUgcmVmZXJlbmNpbmcgYSBmdW5jdGlvbiBkZWZpbmVkIGhlcmVcclxuICAgICAgdGVzdCgpIHtcclxuICAgICAgICByZXR1cm4gYFdlbGNvbWUgJHt0aGlzLmZpcnN0TmFtZX0hIExldCdzIHNlZSB3aGF0J3MgZ29pbmcgb24uYDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGRpdjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGRpdiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkaXZcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGJ0bjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGJ0biBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwiYnRuXCIsIHR5cGU6IFwiYnV0dG9uXCIgfSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGlucHV0OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW5wdXQgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNlY3Rpb246IHtcclxuICAgIHZhbHVlOiBjbGFzcyBzZWN0aW9uIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInNlY3Rpb25cIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHRpdGxlOiB7IC8vZGVmaW5lIGFueSB0eXBlIG9mIGgjLi4gaDEsIGgyLCBldGMuXHJcbiAgICB2YWx1ZTogY2xhc3MgdGl0bGUgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYW5jaG9yOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYW5jaG9yIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImFcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNoZWNrYm94OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgY2hlY2tib3ggZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNsYXNzTmFtZTogXCJjYlwiIH0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbWFnZToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGltYWdlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImltZ1wiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB1bCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ1bFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGk6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsaSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsaVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGZvcm0gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZm9ybVwiLCB7fSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxhYmVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGFiZWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGFiZWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBsb2dJbkZ1bmNzIGZyb20gXCIuL2xvZ2luXCJcclxuaW1wb3J0IHJlZ2lzdGVyRnVuY3MgZnJvbSBcIi4vcmVnaXN0ZXJcIlxyXG5cclxuY29uc3QgbGFuZGluZ1BhZ2VGdW5jcyA9IHtcclxuICBsb2FkTGFuZGluZ1BhZ2UoKSB7XHJcbiAgICBuZXcgY29tcC5kaXYoXHJcbiAgICAgIHsgY2xhc3NMaXN0OiBcIndlbGNvbWVcIiB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCIgfSwgXCJXZWxjb21lIHRvIE1pc3Npb24gQ29udHJvbFwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiTG9naW5cIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIlJlZ2lzdGVyXCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbGV0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpXHJcblxyXG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJMb2dpblwiKSB7XHJcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlZ2lzdGVyRnVuY3MubG9hZFJlZ2lzdGVyKClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhbmRpbmdQYWdlRnVuY3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiO1xuaW1wb3J0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgZnJvbSBcIi4vbWlzc2lvbkNvbnRyb2xcIjtcblxuY29uc3QgbG9nSW5GdW5jcyA9IHtcbiAgY2hlY2tVc2VyKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgIGlmICh1c2VybmFtZSA9PT0gXCJcIiB8fCBwYXNzd29yZCA9PT1cIlwiKSB7XG4gICAgICBhbGVydChcIllvdSBtdXN0IGVudGVyIGJvdGggeW91ciB1c2VybmFtZSBhbmQgcGFzc3dvcmQgdG8gbG9nIGluLlwiKVxuICAgIH0gZWxzZSB7XG4gICAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz91c2VybmFtZT0ke3VzZXJuYW1lfWApLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgaXMgbm8gdXNlciB3aXRoIHRoYXQgdXNlcm5hbWUuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChwYXNzd29yZCA9PT0gZGF0YVswXS5wYXNzd29yZCkge1xuICAgICAgICAgIGxldCBjdXJyZW50VXNlciA9IG5ldyBjb21wLnVzZXIgKGRhdGFbMF0pO1xuICAgICAgICAgIHJldHVybiBjdXJyZW50VXNlcjtcbiAgICAgICAgfSBlbHNlICggYWxlcnQoXCJZb3UgZW50ZXJlZCB0aGUgd3JvbmcgcGFzc3dvcmQuIFRyeSBhZ2Fpbi5cIikpXG4gICAgICB9KS50aGVuKGN1cnJlbnRVc2VyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudFVzZXIpXG4gICAgICAgIGlmIChjdXJyZW50VXNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJCdWlsZCBNaXNzaW9uIExvZ2luXCIpXG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRVc2VyKSk7XG4gICAgICAgICAgYnVpbGRNaXNzaW9uQ29udHJvbC5wcmludFBsYWNlaG9sZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGxvYWRMb2dJbigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJVc2VybmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJ1c2VybmFtZVwiLCBpZDogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwicGFzc3dvcmRcIiB9LCBcIlBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInBhc3N3b3JkXCIsIGlkOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCIgfSksXG4gICAgICBuZXcgY29tcC5idG4oXCJMb2dpbiBOb3dcIiksXG4gICAgICBuZXcgY29tcC5idG4oXCJOb3QgYSB1c2VyPyBDcmVhdGUgbmV3IGFjY291bnQuXCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJMb2dpbiBOb3dcIikge1xuICAgICAgICAgIHRoaXMuY2hlY2tVc2VyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGxvZ0luRnVuY3MiLCJpbXBvcnQgbGFuZGluZ1BhZ2VGdW5jcyBmcm9tIFwiLi9sYW5kaW5nXCJcclxuaW1wb3J0IG5hdkJhciBmcm9tIFwiLi9uYXZcIlxyXG5cclxubmF2QmFyLmxvYWROYXZCYXIoKTtcclxubGFuZGluZ1BhZ2VGdW5jcy5sb2FkTGFuZGluZ1BhZ2UoKTsiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCJcclxuXHJcblxyXG5jb25zdCBidWlsZE1lc3NhZ2VzID0ge1xyXG4gIHByaW50TWVzc2FnZXMgKG1lc3NhZ2VPYmopIHtcclxuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibWVzc2FnZVwiLCBpZDogYCR7bWVzc2FnZU9iai5pZH1gfSxcclxuICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke21lc3NhZ2VPYmoudXNlci5wcm9maWxlUGljfWAsIGFsdDogXCJQcm9maWxlIFBpY1wiLCBzdHlsZTpcImRpc3BsYXk6aW5saW5lLWJsb2NrOyBib3JkZXItcmFkaXVzOiA4cHg7IG1hcmdpbjogNHB4XCIsIGhlaWdodDogXCIyNVwiLCB3aWR0aDogXCIyNVwifSksXHJcbiAgICBuZXcgY29tcC50aXRsZSggXCJoMlwiLCB7c3R5bGU6XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgYm90dG9tOiAxMHB4XCJ9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxyXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgfSxcclxuXHJcbiAgbWVzc2FnZU1hcCAoKSAge1xyXG4gICAgY29uc3QgdXNlciA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHVzZXIpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcIm1lc3NhZ2VzLz9fZXhwYW5kPXVzZXJcIilcclxuICAgIC50aGVuKG1lc3NhZ2VPYmogPT4gbWVzc2FnZU9iai5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgICAgdGhpcy5wcmludE1lc3NhZ2VzKG1lc3NhZ2UpfSkpXHJcbiAgICAgIC50aGVuKCgpID0+IHRoaXMubmV3TWVzc2FnZSgpKVxyXG5cclxuICB9LFxyXG5cclxuICBuZXdNZXNzYWdlICgpIHtcclxuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS1tZXNzYWdlXCJ9LFxyXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge30sIFwiTmV3IE1lc3NhZ2VcIiksXHJcbiAgICBuZXcgY29tcC5pbnB1dCAoe3BsYWNlaG9sZGVyOiBcInR5cGUgeW91ciBtZXNzYWdlIGhlcmVcIiwgdHlwZTogXCJ0ZXh0YXJlYVwifSksXHJcbiAgICBuZXcgY29tcC5idG4gKFwiU3VibWl0XCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRNZXNzYWdlc1xyXG4iLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcblxuXG5cbmNvbnN0IGJ1aWxkTWlzc2lvbkNvbnRyb2wgPSB7XG4gIHByaW50UGxhY2Vob2xkZXIgKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBudWxsO1xuICAgIGNvbnN0IHVzZXIgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSk7XG4gICAgY29uc29sZS5sb2codXNlcik7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJtZXNzYWdlXCIsIGlkOiBgJHt1c2VyLmlkfWB9LFxuICAgIG5ldyBjb21wLmltYWdlKHtzcmM6IGAke3VzZXIucHJvZmlsZVBpY31gLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIiwgc3R5bGU6XCJkaXNwbGF5OmlubGluZS1ibG9jazsgYm9yZGVyLXJhZGl1czogOHB4OyBtYXJnaW46IDRweFwiLCBoZWlnaHQ6IFwiMTI1XCIsIHdpZHRoOiBcIjEyNVwifSksXG4gICAgbmV3IGNvbXAudGl0bGUoIFwiaDJcIiwge3N0eWxlOlwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IGJvdHRvbTogMTBweFwifSwgYCR7dXNlci5maXJzdE5hbWV9IC0gJHt1c2VyLmxhc3ROYW1lfSAke3VzZXIudXNlcm5hbWV9YCksXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTWlzc2lvbkNvbnRyb2w7IiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiXG5pbXBvcnQgYnVpbGRNZXNzYWdlcyBmcm9tIFwiLi9tZXNzYWdlc1wiO1xuaW1wb3J0IGJ1aWxkTmV3cyBmcm9tIFwiLi9uZXdzXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5cbmNvbnN0IG5hdkJhciA9IHtcbiAgbG9hZE5hdkJhcigpIHtcbiAgICBuZXcgY29tcC51bChcbiAgICAgIHt9LFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiSG9tZVwiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIlRhc2tzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiRXZlbnRzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiTWVzc2FnZXNcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJOZXdzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiRnJpZW5kc1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIkxvZyBPdXRcIilcbiAgICApLnJlbmRlcihcIiNuYXZCYXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2QmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiSG9tZVwiKSB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIikgPT09IG51bGwpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGxvZ2dlZCBpbi5cIik7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJUYXNrc1wiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBmdW5jdGlvbiBjYWxsZWQuXCIpXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkV2ZW50c1wiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIGZ1bmN0aW9uIGNhbGxlZC5cIilcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTWVzc2FnZXNcIikge1xuICAgICAgICBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTmV3c1wiKSB7XG4gICAgICAgIGJ1aWxkTmV3cy5uZXdzTWFwKCk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkZyaWVuZHNcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZyaWVuZHMgZnVuY3Rpb24gY2FsbGVzLlwiKVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJMb2cgT3V0XCIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2cgT3V0IGZ1bmN0aW9uIGNhbGxlZC5cIik7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuYXZCYXIiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXG5cblxuY29uc3QgYnVpbGROZXdzID0ge1xuICBwcmludE5ld3MobmV3c09iaikge1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3c1wiLCBpZDogYCR7bmV3c09iai5pZH1gfSxcbiAgICBuZXcgY29tcC5hbmNob3Ioe2hyZWY6IGAke25ld3NPYmoudXJsfWAsIHRhcmdldDogXCJfYmxhbmtcIn0sICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHtuZXdzT2JqLmFydGljbGVJbWFnZX1gLCBhbHQ6IFwiQXJ0aWNsZSBJbWFnZVwiLCBoZWlnaHQ6IFwiMTIwXCIsIHdpZHRoOiBcIjEyMFwifSkpLFxuICAgIG5ldyBjb21wLnRpdGxlKCBcImgyXCIsIHt9LCBgJHtuZXdzT2JqLmFydGljbGVOYW1lfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDRcIiwge30sIGBTYXZlZCBieTogJHtuZXdzT2JqLnVzZXIuZmlyc3ROYW1lfSB8IERhdGUgU2F2ZWQ6ICR7bmV3c09iai5kYXRlU2F2ZWR9YCksXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbmV3c09iai5hYm91dCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gIH0sXG5cbiAgbmV3c01hcCAoKSAge1xuICAgIGNvbnN0IHVzZXIgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKSk7XG4gICAgY29uc29sZS5sb2codXNlcik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJhcnRpY2xlcy8/X2V4cGFuZD11c2VyJl9zb3J0PWRhdGVTYXZlZCZfb3JkZXI9ZGVzY1wiKVxuICAgIC50aGVuKG5ld3NPYmogPT4gbmV3c09iai5mb3JFYWNoKG5ld3MgPT4ge1xuICAgICAgdGhpcy5wcmludE5ld3MobmV3cyl9KSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMubmV3TmV3cygpKVxuXG4gIH0sXG5cbiAgbmV3TmV3cyAoKSB7XG4gICAgbmV3IGNvbXAuc2VjdGlvbiAoe2NsYXNzTmFtZTogXCJuZXctLW5ld3NcIn0sXG4gICAgbmV3IGNvbXAudGl0bGUgKFwiaDFcIiwge30sIFwiU2F2ZSBOZXdzIEFydGljbGVcIiksXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZU5hbWVcIn0sIFwiQXJ0aWNsZSBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZU5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBOYW1lXCIsIGlkOiBcImFydGljbGVOYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVVcmxcIn0sIFwiQXJ0aWNsZSBMaW5rXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZVVybFwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIExpbmtcIiwgaWQ6IFwiYXJ0aWNsZUxpbmtcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlSW1hZ2VVcmxcIn0sIFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZUltYWdlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgSW1hZ2UgTGlua1wiLCBpZDogXCJhcnRpY2xlSW1hZ2VcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlRGVzY3JpcHRpb25cIn0sIFwiQXJ0aWNsZSBEZXNjcmlwdGlvblwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVEZXNjcmlwdGlvblwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIsIGlkOiBcImFydGljbGVEZXNjcmlwdGlvblwifSksXG4gICAgICBuZXcgY29tcC5idG4oXCJTYXZlIE5ldyBBcnRpY2xlXCIpXG4gICAgKSxcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgbGV0IHN0b3J5ID0ge1xuICAgICAgICBhcnRpY2xlTmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlTmFtZVwiKS52YWx1ZSxcbiAgICAgICAgdXJsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVMaW5rXCIpLnZhbHVlLFxuICAgICAgICBhcnRpY2xlSW1hZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUltYWdlXCIpLnZhbHVlLFxuICAgICAgICBhYm91dDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlRGVzY3JpcHRpb25cIikudmFsdWUsXG4gICAgICAgIC8qXG4gICAgICAgIE5FRUQgVE8gVVBEQVRFIFVTRVIgSUQgVE8gU0FWRSBTRVNTSU9OIEFTU0lHTkVEIElEXG4gICAgICAgICovXG4gICAgICAgIHVzZXJJZDogMixcbiAgICAgICAgZGF0ZVNhdmVkOiBuZXcgRGF0ZSgpXG4gICAgICB9XG4gICAgICBidWlsZE5ld3MuYWRkTmV3cyhzdG9yeSlcbiAgICB9KVxuICB9LFxuXG4gIGFkZE5ld3Moc3Rvcnkpe1xuICAgIEFQSS5zYXZlSXRlbShcImFydGljbGVzXCIsIHN0b3J5KS50aGVuKCgpPT4gdGhpcy5uZXdzTWFwKCkpXG4gIH1cblxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBidWlsZE5ld3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5pbXBvcnQgYnVpbGRNaXNzaW9uQ29udHJvbCBmcm9tIFwiLi9taXNzaW9uQ29udHJvbFwiO1xuXG5jb25zdCByZWdpc3RlckZ1bmNzID0ge1xuXG4gIGxvYWRSZWdpc3RlcigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJGaXJzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImZpcnN0TmFtZVwiLCBpZDogXCJmaXJzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiRmlyc3QgTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiTGFzdCBOYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImxhc3ROYW1lXCIsIGlkOiBcImxhc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkxhc3QgTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRW1haWxcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IHR5cGU6IFwiZW1haWxcIiwgaWQ6IFwiZW1haWxcIiwgbmFtZTogXCJlbWFpbFwiLCBwbGFjZWhvbGRlcjogXCJlbWFpbFwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiVXNlcm5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwidXNlcm5hbWVcIiwgaWQ6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHsgZm9yOiBcInBhc3N3b3JkXCIgfSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJwYXNzd29yZFwiLCBpZDogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwiY29uZmlybVBhc3N3b3JkXCIgfSwgXCJDb25maXJtIFBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcImNvbmZpcm1QYXNzd29yZFwiLCBpZDogXCJjb25maXJtUGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBQYXNzd29yZFwiIH0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiUmVnaXN0ZXIgQWNjb3VudFwiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkFscmVhZHkgYSB1c2VyPyBMb2cgaW4gbm93XCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJSZWdpc3RlciBBY2NvdW50XCIpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdE5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0TmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1QYXNzd29yZFwiKS52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBjaGVjayB0byBlbnN1cmUgYWxsIGZpZWxkcyBhcmUgY29tcGxldGUuXG4gICAgICAgICAgICBhbGVydChcIkFsbCBmaWVsZHMgbXVzdCBiZSBjb21wbGV0ZSB0byBjcmVhdGUgYW4gYWNjb3VudC5cIilcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUuaW5kZXhPZihcIkBcIikgPT09IC0xKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgYSBjaGVjayBvbiB0aGUgZW1haWwgZmllbGQgdG8gbWFrZSBzdXJlIHRoZXJlIGlzIGFuIEAgcHJlc2VudFxuICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSA9PT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUGFzc3dvcmRcIikudmFsdWUpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY2hlY2sgdG8gbWFrZSBzdXJlIHBhc3N3b3JkcyBhcmUgdGhlIHNhbWUuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGxldCB0ZW1wVXNlciA9IHtcbiAgICAgICAgICAgICAgZmlyc3ROYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpcnN0TmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgbGFzdE5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIGVtYWlsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsXCIpLnZhbHVlLFxuICAgICAgICAgICAgICB1c2VybmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUsXG4gICAgICAgICAgICAgIC8vVGhpcyBpcyBhIHBsYWNlaG9sZGVyIHRvIGEgc3RvY2sgXCJubyBpbWFnZSBhdmFpbGFibGVcIiBpbWFnZSB0aGF0IHdlIGNhbiB1c2UgbGF0ZXIgZm9yIGFjdHVhbCB1c2VyIGltYWdlc1xuICAgICAgICAgICAgICBwcm9maWxlUGljOiBcImh0dHBzOi8vaHloYS54eXovd3AtY29udGVudC90aGVtZXMvZmFzaGlvbi9pbWFnZXMvbm9faW1hZ2VfYXZhaWxhYmxlLmpwZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz9lbWFpbD0ke3RlbXBVc2VyLmVtYWlsfWApLnRoZW4odGhpc0RhdGEgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpc0RhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1JlZ2lzdGVyKHRlbXBVc2VyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlRoaXMgZW1haWwgaXMgYWxyZWFkeSByZWdpc3RlcmVkLlwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7IGFsZXJ0KFwiWW91ciBwYXNzd29yZHMgZGlkIG5vdCBtYXRjaC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIikgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ0luRnVuY3MubG9hZExvZ0luKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIGNoZWNrUmVnaXN0ZXIodXNlcikge1xuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlci51c2VybmFtZX1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIEFQSS5zYXZlSXRlbShcInVzZXJzXCIsIHVzZXIpLnRoZW4obmV3VXNlciA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlcihuZXdVc2VyKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXJuYW1lIGNoZWNrUmVnaXN0ZXI6IFwiLCBjdXJyZW50VXNlcilcbiAgICAgICAgICAvL1RPRE86dGhlIGZ1bmN0aW9uIGJlbG93IG5lZWRzIHRvIGJlIHRoZSBjYWxsIHRvIGxvYWQgbWlzc2lvbiBjb250cm9sIHBhZ2UuXG4gICAgICAgICAgLy8gUmlnaHQgbm93IGl0IGlzIGp1c3Qgc2VuZGluZyB0byBhIGZ1bmN0aW9uIHRvIGNvbnNvbGUubG9nIHVzZXJcbiAgICAgICAgICB0aGlzLmxvYWRNaXNzaW9uKGN1cnJlbnRVc2VyKTtcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYWxlcnQoYFVzZXJuYW1lLCAke2RhdGFbMF0udXNlcm5hbWV9LCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuIFBsZWFzZSBjaG9vc2UgYW5vdGhlci5gKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLy9UT0RPOiB0aGlzIGZ1bmN0aW9uIGNhbiBnbyBhd2F5IHdoZW4gdGhlIGZ1bmN0aW9uIHRvIGxvYWQgbWlzc2lvbiBwYWdlIGlzIHJlcGxhY2VkIGluIGNoZWNrUmVnaXN0ZXIgZnVuY3Rpb24gYWJvdmVcbiAgbG9hZE1pc3Npb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKHVzZXIpXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICBidWlsZE1pc3Npb25Db250cm9sLnByaW50UGxhY2Vob2xkZXIoKTtcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckZ1bmNzIl19
