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

},{"./components":3,"./login":5,"./register":10}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _register = _interopRequireDefault(require("./register"));

var _apiData = _interopRequireDefault(require("./apiData"));

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
          //these console logs will be removed once we can add a function to move to mission control page
          console.log(currentUser.test());
          console.log(currentUser);
          sessionStorage.setItem("userId", currentUser.id);
          sessionStorage.setItem("currentUser", JSON.stringify(currentUser)); //this will be the function to send to the mission control page
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

},{"./apiData":2,"./components":3,"./register":10}],6:[function(require,module,exports){
"use strict";

var _landing = _interopRequireDefault(require("./landing"));

var _nav = _interopRequireDefault(require("./nav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import comp from "./components"
// import buildMessages from "./messages"
// import buildNews from "./news"
_nav.default.loadNavBar();

_landing.default.loadLandingPage(); // buildMessages.messageMap();
// buildNews.newsMap()

},{"./landing":4,"./nav":8}],7:[function(require,module,exports){
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
    const user = sessionStorage.getItem("currentUser");
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

var _login = _interopRequireDefault(require("./login"));

var _messages = _interopRequireDefault(require("./messages"));

var _news = _interopRequireDefault(require("./news"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const navBar = {
  loadNavBar() {
    new _components.default.ul({}, new _components.default.li({}, "Home"), new _components.default.li({}, "Tasks"), new _components.default.li({}, "Events"), new _components.default.li({}, "Messages"), new _components.default.li({}, "News"), new _components.default.li({}, "Friends"), new _components.default.li({}, "Log Out")).render("#navBar");
    document.querySelector("#navBar").addEventListener("click", event => {
      if (event.target.textContent === "Home") {
        _login.default.loadLogIn();
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
      }
    });
  }

};
var _default = navBar;
exports.default = _default;

},{"./components":3,"./login":5,"./messages":7,"./news":9}],9:[function(require,module,exports){
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
    document.querySelector(".container--inner").innerHTML = "";

    _apiData.default.getAllCategory("articles/?_expand=user&_sort=dateSaved&_order=desc").then(newsObj => newsObj.forEach(news => {
      console.log(news);
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

},{"./apiData":2,"./components":3}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = _interopRequireDefault(require("./components"));

var _login = _interopRequireDefault(require("./login"));

var _apiData = _interopRequireDefault(require("./apiData"));

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
              profilePic: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiF4fb4-cneAhUEc98KHTuRBWAQjRx6BAgBEAU&url=https%3A%2F%2Fwingslax.com%2Fteam%2Ffront-office%2Fattachment%2Fno-image-available%2F&psig=AOvVaw1iTVpvjLmigkzni5ssYj57&ust=1541943668925656"
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
          sessionStorage.setItem("currentUser", currentUser); //TODO:the function below needs to be the call to load mission control page.
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
    console.log("Load Mission: ", user);
  }

};
var _default = registerFuncs;
exports.default = _default;

},{"./apiData":2,"./components":3,"./login":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvbGFuZGluZy5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9uYXYuanMiLCIuLi9zY3JpcHRzL25ld3MuanMiLCIuLi9zY3JpcHRzL3JlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsTUFBTSxhQUFhLEdBQUcsTUFBTSxFQUE1Qjs7QUFFQSxNQUFNLFlBQU4sQ0FBbUI7QUFDZixFQUFBLFdBQVcsQ0FBQyxJQUFELEVBQU8sVUFBUCxFQUFtQixHQUFHLFFBQXRCLEVBQWdDO0FBQ3ZDLFNBQUssYUFBTCxJQUFzQixRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUF0QjtBQUVBOzs7OztBQUlBLFFBQUksT0FBTyxVQUFQLEtBQXNCLFFBQTFCLEVBQW9DO0FBQ2hDLFdBQUssYUFBTCxFQUFvQixXQUFwQixHQUFrQyxVQUFsQztBQUNBLGFBQU8sSUFBUDtBQUNILEtBSEQsTUFHTyxJQUFJLE9BQU8sVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUN2QyxXQUFLLGFBQUwsSUFBc0IsTUFBTSxDQUFDLE1BQVAsQ0FBYyxLQUFLLGFBQUwsQ0FBZCxFQUFtQyxVQUFuQyxDQUF0QjtBQUNIOztBQUVELFFBQUksUUFBUSxDQUFDLE1BQWIsRUFBcUI7QUFDakIsTUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixLQUFLLElBQUk7QUFDdEI7QUFDQSxZQUFJLEtBQUssQ0FBQyxPQUFOLFlBQXlCLE1BQU0sQ0FBQyxPQUFwQyxFQUE2QztBQUN6QyxlQUFLLGFBQUwsRUFBb0IsV0FBcEIsQ0FBZ0MsS0FBSyxDQUFDLE9BQXRDLEVBRHlDLENBR3pDO0FBQ0gsU0FKRCxNQUlPLElBQUksS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFLLENBQUMsT0FBcEIsQ0FBSixFQUFrQztBQUNyQyxVQUFBLEtBQUssQ0FBQyxPQUFOLENBQWMsT0FBZCxDQUFzQixDQUFDLElBQUksS0FBSyxhQUFMLEVBQW9CLFdBQXBCLENBQWdDLENBQWhDLENBQTNCLEVBRHFDLENBR3JDO0FBQ0gsU0FKTSxNQUlBO0FBQ0gsZUFBSyxhQUFMLEVBQW9CLFdBQXBCLEdBQWtDLEtBQWxDO0FBQ0g7QUFDSixPQWJEO0FBY0g7O0FBRUQsV0FBTyxJQUFQO0FBQ0g7O0FBRUQsTUFBSSxPQUFKLEdBQWU7QUFDWCxXQUFPLEtBQUssYUFBTCxDQUFQO0FBQ0g7O0FBRUQsRUFBQSxNQUFNLENBQUMsU0FBRCxFQUFZO0FBQ2QsVUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLHNCQUFULEVBQWpCO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxDQUFxQixLQUFLLGFBQUwsQ0FBckI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLFdBQWxDLENBQThDLFFBQTlDO0FBQ0g7O0FBM0NjOztBQThDbkIsTUFBTSxDQUFDLE9BQVAsR0FBaUIsWUFBakI7Ozs7Ozs7OztBQ2xEQSxNQUFNLEdBQUcsR0FBRyx3QkFBWjtBQUVBLE1BQU0sR0FBRyxHQUFHO0FBQ1YsRUFBQSxjQUFjLENBQUMsUUFBRCxFQUFXO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLEdBQUUsR0FBSSxHQUFFLFFBQVMsRUFBbkIsQ0FBTCxDQUNKLElBREksQ0FDQyxPQUFPLElBQUksT0FBTyxDQUFDLElBQVIsRUFEWixDQUFQO0FBRUQsR0FKUzs7QUFNVixFQUFBLGtCQUFrQixDQUFDLFFBQUQsRUFBVyxFQUFYLEVBQWU7QUFDL0IsV0FBTyxLQUFLLENBQUUsR0FBRSxHQUFJLEdBQUUsUUFBUyxPQUFNLEVBQUcsRUFBNUIsQ0FBTCxDQUNKLElBREksQ0FDQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQVAsRUFEWCxDQUFQO0FBRUQsR0FUUzs7QUFXVixFQUFBLFFBQVEsQ0FBQyxRQUFELEVBQVcsSUFBWCxFQUFpQjtBQUN2QixXQUFPLEtBQUssQ0FBRSxHQUFFLEdBQUksR0FBRSxRQUFTLEVBQW5CLEVBQXNCO0FBQ2hDLE1BQUEsTUFBTSxFQUFFLE1BRHdCO0FBRWhDLE1BQUEsT0FBTyxFQUFFO0FBQ1Asd0JBQWdCO0FBRFQsT0FGdUI7QUFLaEMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmO0FBTDBCLEtBQXRCLENBQUwsQ0FNSixJQU5JLENBTUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFMLEVBTlQsQ0FBUDtBQU9ELEdBbkJTOztBQXFCVixFQUFBLFVBQVUsQ0FBQyxRQUFELEVBQVcsRUFBWCxFQUFlO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLEdBQUUsR0FBSSxHQUFFLFFBQVMsT0FBTSxFQUFHLEVBQTVCLEVBQStCO0FBQ3pDLE1BQUEsTUFBTSxFQUFFLFFBRGlDO0FBRXpDLE1BQUEsT0FBTyxFQUFFO0FBQ1Asd0JBQWdCO0FBRFQ7QUFGZ0MsS0FBL0IsQ0FBWjtBQU1ELEdBNUJTOztBQThCVixFQUFBLFVBQVUsQ0FBQyxRQUFELEVBQVcsRUFBWCxFQUFlO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLEdBQUUsR0FBSSxHQUFFLFFBQVMsT0FBTSxFQUFHLEVBQTVCLEVBQStCO0FBQ3pDLE1BQUEsTUFBTSxFQUFFLE9BRGlDO0FBRXpDLE1BQUEsT0FBTyxFQUFFO0FBQ1Asd0JBQWdCO0FBRFQ7QUFGZ0MsS0FBL0IsQ0FBWjtBQU1EOztBQXJDUyxDQUFaO2VBd0NlLEc7Ozs7Ozs7Ozs7O0FDMUNmOzs7O2VBRWUsTUFBTSxDQUFDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CO0FBRWpDLEVBQUEsSUFBSSxFQUFFO0FBQ0osSUFBQSxLQUFLLEVBQUUsTUFBTSxJQUFOLENBQVc7QUFDaEIsTUFBQSxXQUFXLENBQUMsUUFBRCxFQUFXO0FBQ3BCLGFBQUssRUFBTCxHQUFVLFFBQVEsQ0FBQyxFQUFuQjtBQUNBLGFBQUssU0FBTCxHQUFpQixRQUFRLENBQUMsU0FBMUI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBUSxDQUFDLFFBQXpCO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLFFBQVEsQ0FBQyxRQUF6QjtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFRLENBQUMsUUFBekI7QUFDQSxhQUFLLEtBQUwsR0FBYSxRQUFRLENBQUMsS0FBdEI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsUUFBUSxDQUFDLFVBQTNCO0FBQ0gsT0FUaUIsQ0FVbEI7QUFDQTs7O0FBQ0UsTUFBQSxJQUFJLEdBQUc7QUFDTCxlQUFRLFdBQVUsS0FBSyxTQUFVLDhCQUFqQztBQUNEOztBQWRlO0FBRGQsR0FGMkI7QUFxQmpDLEVBQUEsR0FBRyxFQUFFO0FBQ0gsSUFBQSxLQUFLLEVBQUUsTUFBTSxHQUFOLFNBQWtCLHdCQUFsQixDQUErQjtBQUNwQyxNQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWEsR0FBRyxRQUFoQixFQUEwQjtBQUNuQyxjQUFNLEtBQU4sRUFBYSxVQUFiLEVBQXlCLEdBQUcsUUFBNUI7QUFDRDs7QUFIbUM7QUFEbkMsR0FyQjRCO0FBNEJqQyxFQUFBLEdBQUcsRUFBRTtBQUNILElBQUEsS0FBSyxFQUFFLE1BQU0sR0FBTixTQUFrQix3QkFBbEIsQ0FBK0I7QUFDcEMsTUFBQSxXQUFXLENBQUMsR0FBRyxRQUFKLEVBQWM7QUFDdkIsY0FBTSxRQUFOLEVBQWdCO0FBQUUsVUFBQSxTQUFTLEVBQUUsS0FBYjtBQUFvQixVQUFBLElBQUksRUFBRTtBQUExQixTQUFoQixFQUFzRCxHQUFHLFFBQXpEO0FBQ0Q7O0FBSG1DO0FBRG5DLEdBNUI0QjtBQW1DakMsRUFBQSxLQUFLLEVBQUU7QUFDTCxJQUFBLEtBQUssRUFBRSxNQUFNLEtBQU4sU0FBb0Isd0JBQXBCLENBQWlDO0FBQ3RDLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sT0FBTixFQUFlLFVBQWYsRUFBMkIsR0FBRyxRQUE5QjtBQUNEOztBQUhxQztBQURuQyxHQW5DMEI7QUEwQ2pDLEVBQUEsT0FBTyxFQUFFO0FBQ1AsSUFBQSxLQUFLLEVBQUUsTUFBTSxPQUFOLFNBQXNCLHdCQUF0QixDQUFtQztBQUN4QyxNQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWEsR0FBRyxRQUFoQixFQUEwQjtBQUNuQyxjQUFNLFNBQU4sRUFBaUIsVUFBakIsRUFBNkIsR0FBRyxRQUFoQztBQUNEOztBQUh1QztBQURuQyxHQTFDd0I7QUFpRGpDLEVBQUEsS0FBSyxFQUFFO0FBQUU7QUFDUCxJQUFBLEtBQUssRUFBRSxNQUFNLEtBQU4sU0FBb0Isd0JBQXBCLENBQWlDO0FBQ3RDLE1BQUEsV0FBVyxDQUFDLE1BQUQsRUFBUyxVQUFULEVBQXFCLEdBQUcsUUFBeEIsRUFBa0M7QUFDM0MsY0FBTSxNQUFOLEVBQWMsVUFBZCxFQUEwQixHQUFHLFFBQTdCO0FBQ0Q7O0FBSHFDO0FBRG5DLEdBakQwQjtBQXdEakMsRUFBQSxNQUFNLEVBQUU7QUFDTixJQUFBLEtBQUssRUFBRSxNQUFNLE1BQU4sU0FBcUIsd0JBQXJCLENBQWtDO0FBQ3ZDLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sR0FBTixFQUFXLFVBQVgsRUFBdUIsR0FBRyxRQUExQjtBQUNEOztBQUhzQztBQURuQyxHQXhEeUI7QUErRGpDLEVBQUEsUUFBUSxFQUFFO0FBQ1IsSUFBQSxLQUFLLEVBQUUsTUFBTSxRQUFOLFNBQXVCLHdCQUF2QixDQUFvQztBQUN6QyxNQUFBLFdBQVcsQ0FBQyxHQUFHLFFBQUosRUFBYztBQUN2QixjQUFNLE9BQU4sRUFBZTtBQUFFLFVBQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0IsVUFBQSxTQUFTLEVBQUU7QUFBL0IsU0FBZixFQUFzRCxHQUFHLFFBQXpEO0FBQ0Q7O0FBSHdDO0FBRG5DLEdBL0R1QjtBQXNFakMsRUFBQSxLQUFLLEVBQUU7QUFDTCxJQUFBLEtBQUssRUFBRSxNQUFNLEtBQU4sU0FBb0Isd0JBQXBCLENBQWlDO0FBQ3RDLE1BQUEsV0FBVyxDQUFDLFVBQUQsRUFBYSxHQUFHLFFBQWhCLEVBQTBCO0FBQ25DLGNBQU0sS0FBTixFQUFhLFVBQWIsRUFBeUIsR0FBRyxRQUE1QjtBQUNEOztBQUhxQztBQURuQyxHQXRFMEI7QUE2RWpDLEVBQUEsRUFBRSxFQUFFO0FBQ0YsSUFBQSxLQUFLLEVBQUUsTUFBTSxFQUFOLFNBQWlCLHdCQUFqQixDQUE4QjtBQUNuQyxNQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWEsR0FBRyxRQUFoQixFQUEwQjtBQUNuQyxjQUFNLElBQU4sRUFBWSxVQUFaLEVBQXdCLEdBQUcsUUFBM0I7QUFDRDs7QUFIa0M7QUFEbkMsR0E3RTZCO0FBb0ZqQyxFQUFBLEVBQUUsRUFBRTtBQUNGLElBQUEsS0FBSyxFQUFFLE1BQU0sRUFBTixTQUFpQix3QkFBakIsQ0FBOEI7QUFDbkMsTUFBQSxXQUFXLENBQUMsVUFBRCxFQUFhLEdBQUcsUUFBaEIsRUFBMEI7QUFDbkMsY0FBTSxJQUFOLEVBQVksVUFBWixFQUF3QixHQUFHLFFBQTNCO0FBQ0Q7O0FBSGtDO0FBRG5DLEdBcEY2QjtBQTJGakMsRUFBQSxJQUFJLEVBQUU7QUFDSixJQUFBLEtBQUssRUFBRSxNQUFNLElBQU4sU0FBbUIsd0JBQW5CLENBQWdDO0FBQ3JDLE1BQUEsV0FBVyxDQUFDLEdBQUcsUUFBSixFQUFjO0FBQ3ZCLGNBQU0sTUFBTixFQUFjLEVBQWQsRUFBa0IsR0FBRyxRQUFyQjtBQUNEOztBQUhvQztBQURuQyxHQTNGMkI7QUFrR2pDLEVBQUEsS0FBSyxFQUFFO0FBQ0wsSUFBQSxLQUFLLEVBQUUsTUFBTSxLQUFOLFNBQW9CLHdCQUFwQixDQUFpQztBQUN0QyxNQUFBLFdBQVcsQ0FBQyxVQUFELEVBQWEsR0FBRyxRQUFoQixFQUEwQjtBQUNuQyxjQUFNLE9BQU4sRUFBZSxVQUFmLEVBQTJCLEdBQUcsUUFBOUI7QUFDRDs7QUFIcUM7QUFEbkM7QUFsRzBCLENBQXBCLEM7Ozs7Ozs7Ozs7OztBQ0ZmOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxnQkFBZ0IsR0FBRztBQUN2QixFQUFBLGVBQWUsR0FBRztBQUNoQixRQUFJLG9CQUFLLEdBQVQsQ0FDRTtBQUFFLE1BQUEsU0FBUyxFQUFFO0FBQWIsS0FERixFQUVFLElBQUksb0JBQUssS0FBVCxDQUFlLElBQWYsRUFBcUI7QUFBRSxNQUFBLFNBQVMsRUFBRTtBQUFiLEtBQXJCLEVBQTZDLDRCQUE3QyxDQUZGLEVBR0UsSUFBSSxvQkFBSyxHQUFULENBQWEsT0FBYixDQUhGLEVBSUUsSUFBSSxvQkFBSyxHQUFULENBQWEsVUFBYixDQUpGLEVBSTRCLE1BSjVCLENBSW1DLG1CQUpuQztBQUtBLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixRQUExQixDQUFkO0FBRUEsSUFBQSxPQUFPLENBQUMsT0FBUixDQUFpQixNQUFELElBQVk7QUFDMUIsTUFBQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0MsQ0FBRCxJQUFPO0FBQ3RDLFlBQUksQ0FBQyxDQUFDLE1BQUYsQ0FBUyxXQUFULEtBQXlCLE9BQTdCLEVBQXNDO0FBQ3BDLHlCQUFXLFNBQVg7QUFDRCxTQUZELE1BRU87QUFDTCw0QkFBYyxZQUFkO0FBQ0Q7QUFDRixPQU5EO0FBT0QsS0FSRDtBQVVEOztBQW5Cc0IsQ0FBekI7ZUFzQmUsZ0I7Ozs7Ozs7Ozs7O0FDMUJmOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxVQUFVLEdBQUc7QUFDakIsRUFBQSxTQUFTLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUI7QUFDNUIsUUFBSSxRQUFRLEtBQUssRUFBYixJQUFtQixRQUFRLEtBQUksRUFBbkMsRUFBdUM7QUFDckMsTUFBQSxLQUFLLENBQUMsMkRBQUQsQ0FBTDtBQUNELEtBRkQsTUFFTztBQUNMLHVCQUFJLGNBQUosQ0FBb0IsbUJBQWtCLFFBQVMsRUFBL0MsRUFBa0QsSUFBbEQsQ0FBdUQsSUFBSSxJQUFJO0FBQzdELFlBQUksSUFBSSxDQUFDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsVUFBQSxLQUFLLENBQUMsc0NBQUQsQ0FBTDtBQUNBO0FBQ0QsU0FIRCxNQUdPLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxRQUF6QixFQUFtQztBQUN4QyxjQUFJLFdBQVcsR0FBRyxJQUFJLG9CQUFLLElBQVQsQ0FBZSxJQUFJLENBQUMsQ0FBRCxDQUFuQixDQUFsQjtBQUNBLGlCQUFPLFdBQVA7QUFDRCxTQUhNLE1BR0UsS0FBSyxDQUFDLDRDQUFELENBQVA7QUFDUixPQVJELEVBUUcsSUFSSCxDQVFRLFdBQVcsSUFBSTtBQUNyQixRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWjs7QUFDQSxZQUFJLFdBQVcsS0FBSyxTQUFwQixFQUErQjtBQUM3QjtBQUNBLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxXQUFXLENBQUMsSUFBWixFQUFaO0FBQ0EsVUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFdBQVo7QUFDQSxVQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLFdBQVcsQ0FBQyxFQUE3QztBQUNBLFVBQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsYUFBdkIsRUFBc0MsSUFBSSxDQUFDLFNBQUwsQ0FBZSxXQUFmLENBQXRDLEVBTDZCLENBTTdCO0FBQ0Q7QUFFRixPQW5CRDtBQW9CRDtBQUNGLEdBMUJnQjs7QUEyQmpCLEVBQUEsU0FBUyxHQUFHO0FBQ1YsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsR0FBd0QsRUFBeEQ7QUFDQSxRQUFJLG9CQUFLLElBQVQsQ0FDRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxFQUFmLEVBQW1CLFVBQW5CLENBREYsRUFFRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0IsTUFBQSxFQUFFLEVBQUUsVUFBeEI7QUFBb0MsTUFBQSxXQUFXLEVBQUU7QUFBakQsS0FBZixDQUZGLEVBR0UsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLEdBQUcsRUFBRTtBQUFQLEtBQWYsRUFBb0MsVUFBcEMsQ0FIRixFQUlFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxJQUFJLEVBQUUsVUFBUjtBQUFvQixNQUFBLEVBQUUsRUFBRSxVQUF4QjtBQUFvQyxNQUFBLFdBQVcsRUFBRTtBQUFqRCxLQUFmLENBSkYsRUFLRSxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxXQUFiLENBTEYsRUFNRSxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxpQ0FBYixDQU5GLEVBT0UsTUFQRixDQU9TLG1CQVBUO0FBUUEsSUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0MsT0FBcEMsQ0FBNkMsTUFBRCxJQUFZO0FBQ3RELE1BQUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWtDLENBQUQsSUFBTztBQUN0QyxZQUFJLENBQUMsQ0FBQyxNQUFGLENBQVMsV0FBVCxLQUF5QixXQUE3QixFQUEwQztBQUN4QyxlQUFLLFNBQUwsQ0FBZSxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUFuRCxFQUEwRCxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxLQUE5RjtBQUNELFNBRkQsTUFFTztBQUNMLDRCQUFjLFlBQWQ7QUFDRDtBQUNGLE9BTkQ7QUFPRCxLQVJEO0FBU0Q7O0FBOUNnQixDQUFuQjtlQWdEZSxVOzs7Ozs7QUNuRGY7O0FBR0E7Ozs7QUFKQTtBQUVBO0FBQ0E7QUFHQSxhQUFPLFVBQVA7O0FBQ0EsaUJBQWlCLGVBQWpCLEcsQ0FDQTtBQUNBOzs7Ozs7Ozs7O0FDVEE7O0FBQ0E7Ozs7QUFHQSxNQUFNLGFBQWEsR0FBRztBQUNwQixFQUFBLGFBQWEsQ0FBRSxVQUFGLEVBQWM7QUFDekIsUUFBSSxvQkFBSyxPQUFULENBQWtCO0FBQUMsTUFBQSxTQUFTLEVBQUUsU0FBWjtBQUF1QixNQUFBLEVBQUUsRUFBRyxHQUFFLFVBQVUsQ0FBQyxFQUFHO0FBQTVDLEtBQWxCLEVBQ0EsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLEdBQUcsRUFBRyxHQUFFLFVBQVUsQ0FBQyxJQUFYLENBQWdCLFVBQVcsRUFBcEM7QUFBdUMsTUFBQSxHQUFHLEVBQUUsYUFBNUM7QUFBMkQsTUFBQSxLQUFLLEVBQUMsdURBQWpFO0FBQTBILE1BQUEsTUFBTSxFQUFFLElBQWxJO0FBQXdJLE1BQUEsS0FBSyxFQUFFO0FBQS9JLEtBQWYsQ0FEQSxFQUVBLElBQUksb0JBQUssS0FBVCxDQUFnQixJQUFoQixFQUFzQjtBQUFDLE1BQUEsS0FBSyxFQUFDO0FBQVAsS0FBdEIsRUFBMEYsR0FBRSxVQUFVLENBQUMsSUFBWCxDQUFnQixTQUFVLE1BQUssVUFBVSxDQUFDLElBQUssSUFBRyxVQUFVLENBQUMsU0FBVSxFQUFuSyxDQUZBLEVBR0EsSUFBSSxvQkFBSyxLQUFULENBQWUsSUFBZixFQUFxQixFQUFyQixFQUF5QixVQUFVLENBQUMsY0FBcEMsQ0FIQSxFQUdxRCxNQUhyRCxDQUc0RCxtQkFINUQ7QUFJRCxHQU5tQjs7QUFRcEIsRUFBQSxVQUFVLEdBQUs7QUFDYixVQUFNLElBQUksR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixhQUF2QixDQUFiO0FBQ0EsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7QUFDQSxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QixFQUE0QyxTQUE1QyxHQUF3RCxFQUF4RDs7QUFDQSxxQkFBSSxjQUFKLENBQW1CLHdCQUFuQixFQUNDLElBREQsQ0FDTSxVQUFVLElBQUksVUFBVSxDQUFDLE9BQVgsQ0FBbUIsT0FBTyxJQUFJO0FBQ2hELE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaO0FBQ0EsV0FBSyxhQUFMLENBQW1CLE9BQW5CO0FBQTRCLEtBRlYsQ0FEcEIsRUFJRyxJQUpILENBSVEsTUFBTSxLQUFLLFVBQUwsRUFKZDtBQU1ELEdBbEJtQjs7QUFvQnBCLEVBQUEsVUFBVSxHQUFJO0FBQ1osUUFBSSxvQkFBSyxPQUFULENBQWtCO0FBQUMsTUFBQSxTQUFTLEVBQUU7QUFBWixLQUFsQixFQUNBLElBQUksb0JBQUssS0FBVCxDQUFnQixJQUFoQixFQUFzQixFQUF0QixFQUEwQixhQUExQixDQURBLEVBRUEsSUFBSSxvQkFBSyxLQUFULENBQWdCO0FBQUMsTUFBQSxXQUFXLEVBQUUsd0JBQWQ7QUFBd0MsTUFBQSxJQUFJLEVBQUU7QUFBOUMsS0FBaEIsQ0FGQSxFQUdBLElBQUksb0JBQUssR0FBVCxDQUFjLFFBQWQsQ0FIQSxFQUd5QixNQUh6QixDQUdnQyxtQkFIaEM7QUFJRDs7QUF6Qm1CLENBQXRCO2VBOEJlLGE7Ozs7Ozs7Ozs7O0FDbENmOztBQUNBOztBQUNBOztBQUNBOzs7O0FBR0EsTUFBTSxNQUFNLEdBQUc7QUFDYixFQUFBLFVBQVUsR0FBRztBQUNYLFFBQUksb0JBQUssRUFBVCxDQUNFLEVBREYsRUFFRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLE1BQWhCLENBRkYsRUFHRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLE9BQWhCLENBSEYsRUFJRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLFFBQWhCLENBSkYsRUFLRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLFVBQWhCLENBTEYsRUFNRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLE1BQWhCLENBTkYsRUFPRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLFNBQWhCLENBUEYsRUFRRSxJQUFJLG9CQUFLLEVBQVQsQ0FBWSxFQUFaLEVBQWdCLFNBQWhCLENBUkYsRUFTRSxNQVRGLENBU1MsU0FUVDtBQVdBLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0MsZ0JBQWxDLENBQW1ELE9BQW5ELEVBQTZELEtBQUQsSUFBVztBQUNyRSxVQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsV0FBYixLQUE2QixNQUFqQyxFQUF5QztBQUN2Qyx1QkFBVyxTQUFYO0FBQ0QsT0FGRCxNQUVPLElBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxXQUFiLElBQTRCLE9BQWhDLEVBQXlDO0FBQzlDLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx1QkFBWjtBQUNELE9BRk0sTUFFQSxJQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsV0FBYixJQUE0QixRQUFoQyxFQUEwQztBQUMvQyxRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkseUJBQVo7QUFDRCxPQUZNLE1BRUEsSUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFdBQWIsSUFBNEIsVUFBaEMsRUFBNEM7QUFDakQsMEJBQWMsVUFBZDtBQUNELE9BRk0sTUFFQSxJQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsV0FBYixJQUE0QixNQUFoQyxFQUF3QztBQUM3QyxzQkFBVSxPQUFWO0FBQ0QsT0FGTSxNQUVBLElBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxXQUFiLElBQTRCLFNBQWhDLEVBQTJDO0FBQ2hELFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSwwQkFBWjtBQUNELE9BRk0sTUFFQSxJQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsV0FBYixJQUE0QixTQUFoQyxFQUEyQztBQUNoRCxRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksMEJBQVo7QUFDRDtBQUNGLEtBaEJEO0FBaUJEOztBQTlCWSxDQUFmO2VBa0NlLE07Ozs7Ozs7Ozs7O0FDeENmOztBQUNBOzs7O0FBR0EsTUFBTSxTQUFTLEdBQUc7QUFDaEIsRUFBQSxTQUFTLENBQUMsT0FBRCxFQUFVO0FBQ2pCLFFBQUksb0JBQUssT0FBVCxDQUFrQjtBQUFDLE1BQUEsU0FBUyxFQUFFLE1BQVo7QUFBb0IsTUFBQSxFQUFFLEVBQUcsR0FBRSxPQUFPLENBQUMsRUFBRztBQUF0QyxLQUFsQixFQUNBLElBQUksb0JBQUssTUFBVCxDQUFnQjtBQUFDLE1BQUEsSUFBSSxFQUFHLEdBQUUsT0FBTyxDQUFDLEdBQUksRUFBdEI7QUFBeUIsTUFBQSxNQUFNLEVBQUU7QUFBakMsS0FBaEIsRUFBNkQsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLEdBQUcsRUFBRyxHQUFFLE9BQU8sQ0FBQyxZQUFhLEVBQTlCO0FBQWlDLE1BQUEsR0FBRyxFQUFFLGVBQXRDO0FBQXVELE1BQUEsTUFBTSxFQUFFLEtBQS9EO0FBQXNFLE1BQUEsS0FBSyxFQUFFO0FBQTdFLEtBQWYsQ0FBN0QsQ0FEQSxFQUVBLElBQUksb0JBQUssS0FBVCxDQUFnQixJQUFoQixFQUFzQixFQUF0QixFQUEyQixHQUFFLE9BQU8sQ0FBQyxXQUFZLEVBQWpELENBRkEsRUFHQSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLEVBQXJCLEVBQTBCLGFBQVksT0FBTyxDQUFDLElBQVIsQ0FBYSxTQUFVLGtCQUFpQixPQUFPLENBQUMsU0FBVSxFQUFoRyxDQUhBLEVBSUEsSUFBSSxvQkFBSyxLQUFULENBQWUsSUFBZixFQUFxQixFQUFyQixFQUF5QixPQUFPLENBQUMsS0FBakMsQ0FKQSxFQUl5QyxNQUp6QyxDQUlnRCxtQkFKaEQ7QUFLRCxHQVBlOztBQVNoQixFQUFBLE9BQU8sR0FBSztBQUNWLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFNBQTVDLEdBQXdELEVBQXhEOztBQUNBLHFCQUFJLGNBQUosQ0FBbUIsb0RBQW5CLEVBQ0MsSUFERCxDQUNNLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBUixDQUFnQixJQUFJLElBQUk7QUFDdkMsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7QUFDQSxXQUFLLFNBQUwsQ0FBZSxJQUFmO0FBQXFCLEtBRk4sQ0FEakIsRUFJRyxJQUpILENBSVEsTUFBTSxLQUFLLE9BQUwsRUFKZDtBQU1ELEdBakJlOztBQW1CaEIsRUFBQSxPQUFPLEdBQUk7QUFDVCxRQUFJLG9CQUFLLE9BQVQsQ0FBa0I7QUFBQyxNQUFBLFNBQVMsRUFBRTtBQUFaLEtBQWxCLEVBQ0EsSUFBSSxvQkFBSyxLQUFULENBQWdCLElBQWhCLEVBQXNCLEVBQXRCLEVBQTBCLG1CQUExQixDQURBLEVBRUEsSUFBSSxvQkFBSyxJQUFULENBQ0UsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLEdBQUcsRUFBRTtBQUFOLEtBQWYsRUFBcUMsY0FBckMsQ0FERixFQUVFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxJQUFJLEVBQUUsYUFBUDtBQUFzQixNQUFBLFdBQVcsRUFBRSxjQUFuQztBQUFtRCxNQUFBLEVBQUUsRUFBRTtBQUF2RCxLQUFmLENBRkYsRUFHRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLE1BQUEsR0FBRyxFQUFFO0FBQU4sS0FBZixFQUFvQyxjQUFwQyxDQUhGLEVBSUUsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLElBQUksRUFBRSxZQUFQO0FBQXFCLE1BQUEsV0FBVyxFQUFFLGNBQWxDO0FBQWtELE1BQUEsRUFBRSxFQUFFO0FBQXRELEtBQWYsQ0FKRixFQUtFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUMsTUFBQSxHQUFHLEVBQUU7QUFBTixLQUFmLEVBQXlDLG9CQUF6QyxDQUxGLEVBTUUsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLElBQUksRUFBRSxpQkFBUDtBQUEwQixNQUFBLFdBQVcsRUFBRSxvQkFBdkM7QUFBNkQsTUFBQSxFQUFFLEVBQUU7QUFBakUsS0FBZixDQU5GLEVBT0UsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBQyxNQUFBLEdBQUcsRUFBRTtBQUFOLEtBQWYsRUFBNEMscUJBQTVDLENBUEYsRUFRRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFDLE1BQUEsSUFBSSxFQUFFLG9CQUFQO0FBQTZCLE1BQUEsV0FBVyxFQUFFLHFCQUExQztBQUFpRSxNQUFBLEVBQUUsRUFBRTtBQUFyRSxLQUFmLENBUkYsRUFTRSxJQUFJLG9CQUFLLEdBQVQsQ0FBYSxrQkFBYixDQVRGLENBRkEsRUFhRSxNQWJGLENBYVMsbUJBYlQ7QUFlQSxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLEVBQWlDLGdCQUFqQyxDQUFrRCxPQUFsRCxFQUEyRCxNQUFJO0FBQzdELFVBQUksS0FBSyxHQUFHO0FBQ1YsUUFBQSxXQUFXLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsS0FEMUM7QUFFVixRQUFBLEdBQUcsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixFQUF1QyxLQUZsQztBQUdWLFFBQUEsWUFBWSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLEtBSDVDO0FBSVYsUUFBQSxLQUFLLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLEtBSjNDOztBQUtWOzs7QUFHQSxRQUFBLE1BQU0sRUFBRSxDQVJFO0FBU1YsUUFBQSxTQUFTLEVBQUUsSUFBSSxJQUFKO0FBVEQsT0FBWjtBQVdBLE1BQUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsS0FBbEI7QUFDRCxLQWJEO0FBY0QsR0FqRGU7O0FBbURoQixFQUFBLE9BQU8sQ0FBQyxLQUFELEVBQU87QUFDWixxQkFBSSxRQUFKLENBQWEsVUFBYixFQUF5QixLQUF6QixFQUFnQyxJQUFoQyxDQUFxQyxNQUFLLEtBQUssT0FBTCxFQUExQztBQUNEOztBQXJEZSxDQUFsQjtlQTBEZSxTOzs7Ozs7Ozs7OztBQzlEZjs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0sYUFBYSxHQUFHO0FBRXBCLEVBQUEsWUFBWSxHQUFHO0FBQ2IsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixtQkFBdkIsRUFBNEMsU0FBNUMsR0FBd0QsRUFBeEQ7QUFDQSxRQUFJLG9CQUFLLElBQVQsQ0FDRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxFQUFmLEVBQW1CLFlBQW5CLENBREYsRUFFRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLFdBQVI7QUFBcUIsTUFBQSxFQUFFLEVBQUUsV0FBekI7QUFBc0MsTUFBQSxXQUFXLEVBQUU7QUFBbkQsS0FBZixDQUZGLEVBR0UsSUFBSSxvQkFBSyxLQUFULENBQWUsRUFBZixFQUFtQixXQUFuQixDQUhGLEVBSUUsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLElBQUksRUFBRSxVQUFSO0FBQW9CLE1BQUEsRUFBRSxFQUFFLFVBQXhCO0FBQW9DLE1BQUEsV0FBVyxFQUFFO0FBQWpELEtBQWYsQ0FKRixFQUtFLElBQUksb0JBQUssS0FBVCxDQUFlLEVBQWYsRUFBbUIsT0FBbkIsQ0FMRixFQU1FLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxJQUFJLEVBQUUsT0FBUjtBQUFpQixNQUFBLEVBQUUsRUFBRSxPQUFyQjtBQUE4QixNQUFBLElBQUksRUFBRSxPQUFwQztBQUE2QyxNQUFBLFdBQVcsRUFBRTtBQUExRCxLQUFmLENBTkYsRUFPRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZSxFQUFmLEVBQW1CLFVBQW5CLENBUEYsRUFRRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsSUFBSSxFQUFFLFVBQVI7QUFBb0IsTUFBQSxFQUFFLEVBQUUsVUFBeEI7QUFBb0MsTUFBQSxXQUFXLEVBQUU7QUFBakQsS0FBZixDQVJGLEVBU0UsSUFBSSxvQkFBSyxLQUFULENBQWU7QUFBRSxNQUFBLEdBQUcsRUFBRTtBQUFQLEtBQWYsRUFBb0MsVUFBcEMsQ0FURixFQVVFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxJQUFJLEVBQUUsVUFBUjtBQUFvQixNQUFBLEVBQUUsRUFBRSxVQUF4QjtBQUFvQyxNQUFBLFdBQVcsRUFBRTtBQUFqRCxLQUFmLENBVkYsRUFXRSxJQUFJLG9CQUFLLEtBQVQsQ0FBZTtBQUFFLE1BQUEsR0FBRyxFQUFFO0FBQVAsS0FBZixFQUEyQyxrQkFBM0MsQ0FYRixFQVlFLElBQUksb0JBQUssS0FBVCxDQUFlO0FBQUUsTUFBQSxJQUFJLEVBQUUsaUJBQVI7QUFBMkIsTUFBQSxFQUFFLEVBQUUsaUJBQS9CO0FBQWtELE1BQUEsV0FBVyxFQUFFO0FBQS9ELEtBQWYsQ0FaRixFQWFFLElBQUksb0JBQUssR0FBVCxDQUFhLGtCQUFiLENBYkYsRUFjRSxJQUFJLG9CQUFLLEdBQVQsQ0FBYSw0QkFBYixDQWRGLEVBZUUsTUFmRixDQWVTLG1CQWZUO0FBZ0JBLElBQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLFFBQTFCLEVBQW9DLE9BQXBDLENBQTZDLE1BQUQsSUFBWTtBQUN0RCxNQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFrQyxDQUFELElBQU87QUFDdEMsWUFBSSxDQUFDLENBQUMsTUFBRixDQUFTLFdBQVQsS0FBeUIsa0JBQTdCLEVBQWlEO0FBQy9DLGNBQUksUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsS0FBckMsS0FBK0MsRUFBL0MsSUFBcUQsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0MsS0FBcEMsS0FBOEMsRUFBbkcsSUFBeUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsS0FBakMsS0FBMkMsRUFBcEosSUFBMEosUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0MsS0FBcEMsS0FBOEMsRUFBeE0sSUFBOE0sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0MsS0FBcEMsS0FBOEMsRUFBNVAsSUFBa1EsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLEtBQTNDLEtBQXFELEVBQTNULEVBQStUO0FBQzdUO0FBQ0EsWUFBQSxLQUFLLENBQUMsbURBQUQsQ0FBTDtBQUNELFdBSEQsTUFHTyxJQUFJLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLEVBQWlDLEtBQWpDLENBQXVDLE9BQXZDLENBQStDLEdBQS9DLE1BQXdELENBQUMsQ0FBN0QsRUFBZ0U7QUFDckU7QUFDQSxZQUFBLEtBQUssQ0FBQyxxQ0FBRCxDQUFMO0FBQ0QsV0FITSxNQUdBLElBQUksUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0MsS0FBcEMsS0FBOEMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLEtBQTdGLEVBQW9HO0FBQ3pHO0FBQ0EsWUFBQSxDQUFDLENBQUMsY0FBRjtBQUNBLGdCQUFJLFFBQVEsR0FBRztBQUNiLGNBQUEsU0FBUyxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLEVBQXFDLEtBRG5DO0FBRWIsY0FBQSxRQUFRLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0MsS0FGakM7QUFHYixjQUFBLEtBQUssRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxLQUgzQjtBQUliLGNBQUEsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLEtBSmpDO0FBS2IsY0FBQSxRQUFRLEVBQUUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0MsS0FMakM7QUFNYjtBQUNBLGNBQUEsVUFBVSxFQUFFO0FBUEMsYUFBZjs7QUFTQSw2QkFBSSxjQUFKLENBQW9CLGdCQUFlLFFBQVEsQ0FBQyxLQUFNLEVBQWxELEVBQXFELElBQXJELENBQTBELFFBQVEsSUFBSTtBQUNwRSxrQkFBSSxRQUFRLENBQUMsTUFBVCxLQUFvQixDQUF4QixFQUEyQjtBQUN6QixxQkFBSyxhQUFMLENBQW1CLFFBQW5CO0FBQ0QsZUFGRCxNQUVPO0FBQ0wsZ0JBQUEsS0FBSyxDQUFDLG1DQUFELENBQUw7QUFDRDtBQUNGLGFBTkQ7QUFPRCxXQW5CTSxNQW1CQTtBQUFFLFlBQUEsS0FBSyxDQUFDLGlEQUFELENBQUw7QUFBMEQ7QUFDcEUsU0EzQkQsTUEyQk87QUFDTCx5QkFBVyxTQUFYO0FBQ0Q7QUFDRixPQS9CRDtBQWdDRCxLQWpDRDtBQWtDRCxHQXREbUI7O0FBd0RwQixFQUFBLGFBQWEsQ0FBQyxJQUFELEVBQU87QUFDbEIscUJBQUksY0FBSixDQUFvQixtQkFBa0IsSUFBSSxDQUFDLFFBQVMsRUFBcEQsRUFBdUQsSUFBdkQsQ0FBNEQsSUFBSSxJQUFJO0FBQ2xFLFVBQUksSUFBSSxDQUFDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIseUJBQUksUUFBSixDQUFhLE9BQWIsRUFBc0IsSUFBdEIsRUFBNEIsSUFBNUIsQ0FBaUMsT0FBTyxJQUFJO0FBQzFDLGNBQUksV0FBVyxHQUFHLElBQUksb0JBQUssSUFBVCxDQUFjLE9BQWQsQ0FBbEI7QUFDQSxVQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGFBQXZCLEVBQXNDLFdBQXRDLEVBRjBDLENBRzFDO0FBQ0E7O0FBQ0EsZUFBSyxXQUFMLENBQWlCLFdBQWpCO0FBQ0QsU0FORDtBQU9ELE9BUkQsTUFRTyxJQUFJLElBQUksQ0FBQyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQzVCLFFBQUEsS0FBSyxDQUFFLGFBQVksSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRLFFBQVMsaURBQS9CLENBQUw7QUFDRDtBQUNGLEtBWkQ7QUFhRCxHQXRFbUI7O0FBd0VwQjtBQUNBLEVBQUEsV0FBVyxDQUFDLElBQUQsRUFBTztBQUNoQixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDRDs7QUEzRW1CLENBQXRCO2VBOEVlLGEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgZWxlbWVudFN5bWJvbCA9IFN5bWJvbCgpXG5cbmNsYXNzIERPTUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgSWYgYGF0dHJpYnV0ZXNgIGlzIGp1c3QgYSBzdHJpbmcsIGl0J3MgYSBzaW1wbGUgZWxlbWVudCB3aXRoIG5vXG4gICAgICAgICAgICBwcm9wZXJ0aWVzIC0ganVzdCBzb21lIHRleHQgY29udGVudFxuICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0udGV4dENvbnRlbnQgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdID0gT2JqZWN0LmFzc2lnbih0aGlzW2VsZW1lbnRTeW1ib2xdLCBhdHRyaWJ1dGVzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gT25lIEhUTUxFbGVtZW50IHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoY2hpbGQuZWxlbWVudClcblxuICAgICAgICAgICAgICAgICAgICAvLyBBbiBhcnJheSBvZiBlbGVtZW50cyB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmVsZW1lbnQuZm9yRWFjaChjID0+IHRoaXNbZWxlbWVudFN5bWJvbF0uYXBwZW5kQ2hpbGQoYykpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RyaW5nIHZhbHVlIHdhcyBwYXNzZWQgaW4sIHNldCB0ZXh0IGNvbnRlbnRcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gY2hpbGRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBnZXQgZWxlbWVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2VsZW1lbnRTeW1ib2xdXG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0aGlzW2VsZW1lbnRTeW1ib2xdKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcikuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERPTUNvbXBvbmVudFxuIiwiY29uc3QgVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODgvXCJcblxuY29uc3QgQVBJID0ge1xuICBnZXRBbGxDYXRlZ29yeShjYXRlZ29yeSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gKVxuICAgICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcblxuICBnZXRPbmVGcm9tQ2F0ZWdvcnkoY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWApXG4gICAgICAudGhlbihpbnB1dHMgPT4gaW5wdXRzLmpzb24oKSlcbiAgfSxcblxuICBzYXZlSXRlbShjYXRlZ29yeSwgaXRlbSkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfSkudGhlbihkYXRhID0+IGRhdGEuanNvbigpKVxuICB9LFxuXG4gIGRlbGV0ZUl0ZW0oY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIHVwZGF0ZUl0ZW0oY2F0ZWdvcnksIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfVxuICAgIH0pXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImltcG9ydCBET01Db21wb25lbnQgZnJvbSBcIi4uL2xpYi9ub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuY3JlYXRlKG51bGwsIHtcclxuXHJcbiAgdXNlcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIFVzZXIge1xyXG4gICAgICBjb25zdHJ1Y3Rvcih0ZW1wSW5mbykge1xyXG4gICAgICAgIHRoaXMuaWQgPSB0ZW1wSW5mby5pZDtcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IHRlbXBJbmZvLmZpcnN0TmFtZTtcclxuICAgICAgICB0aGlzLmxhc3ROYW1lID0gdGVtcEluZm8ubGFzdE5hbWU7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHRlbXBJbmZvLnVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSB0ZW1wSW5mby5wYXNzd29yZDtcclxuICAgICAgICB0aGlzLmVtYWlsID0gdGVtcEluZm8uZW1haWw7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlUGljID0gdGVtcEluZm8ucHJvZmlsZVBpYztcclxuICAgIH1cclxuICAgIC8vVE9ETzogdGhpcyBpcyBqdXN0IGEgdGVzdCBmdW5jdGlvbi4gd2Ugd291bGQgaGF2ZSB0aGUgYWJpbGl0eSB0byBjYWxsIGZvciBzYXZpbmdcclxuICAgIC8vIG1lc3NhZ2VzLGFydGljbGVzLCBldmVudHMgYmUgcmVmZXJlbmNpbmcgYSBmdW5jdGlvbiBkZWZpbmVkIGhlcmVcclxuICAgICAgdGVzdCgpIHtcclxuICAgICAgICByZXR1cm4gYFdlbGNvbWUgJHt0aGlzLmZpcnN0TmFtZX0hIExldCdzIHNlZSB3aGF0J3MgZ29pbmcgb24uYDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGRpdjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGRpdiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkaXZcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGJ0bjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGJ0biBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwiYnRuXCIsIHR5cGU6IFwiYnV0dG9uXCIgfSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGlucHV0OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgaW5wdXQgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNlY3Rpb246IHtcclxuICAgIHZhbHVlOiBjbGFzcyBzZWN0aW9uIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcInNlY3Rpb25cIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHRpdGxlOiB7IC8vZGVmaW5lIGFueSB0eXBlIG9mIGgjLi4gaDEsIGgyLCBldGMuXHJcbiAgICB2YWx1ZTogY2xhc3MgdGl0bGUgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYW5jaG9yOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgYW5jaG9yIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImFcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNoZWNrYm94OiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgY2hlY2tib3ggZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNsYXNzTmFtZTogXCJjYlwiIH0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbWFnZToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGltYWdlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImltZ1wiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB1bCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ1bFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGk6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsaSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsaVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGZvcm0gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZm9ybVwiLCB7fSwgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxhYmVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGFiZWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGFiZWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBsb2dJbkZ1bmNzIGZyb20gXCIuL2xvZ2luXCJcclxuaW1wb3J0IHJlZ2lzdGVyRnVuY3MgZnJvbSBcIi4vcmVnaXN0ZXJcIlxyXG5cclxuY29uc3QgbGFuZGluZ1BhZ2VGdW5jcyA9IHtcclxuICBsb2FkTGFuZGluZ1BhZ2UoKSB7XHJcbiAgICBuZXcgY29tcC5kaXYoXHJcbiAgICAgIHsgY2xhc3NMaXN0OiBcIndlbGNvbWVcIiB9LFxyXG4gICAgICBuZXcgY29tcC50aXRsZShcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRpdGxlXCIgfSwgXCJXZWxjb21lIHRvIE1pc3Npb24gQ29udHJvbFwiKSxcclxuICAgICAgbmV3IGNvbXAuYnRuKFwiTG9naW5cIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIlJlZ2lzdGVyXCIpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gICAgbGV0IGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpXHJcblxyXG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJMb2dpblwiKSB7XHJcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlZ2lzdGVyRnVuY3MubG9hZFJlZ2lzdGVyKClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxhbmRpbmdQYWdlRnVuY3MiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiO1xuXG5jb25zdCBsb2dJbkZ1bmNzID0ge1xuICBjaGVja1VzZXIodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgaWYgKHVzZXJuYW1lID09PSBcIlwiIHx8IHBhc3N3b3JkID09PVwiXCIpIHtcbiAgICAgIGFsZXJ0KFwiWW91IG11c3QgZW50ZXIgYm90aCB5b3VyIHVzZXJuYW1lIGFuZCBwYXNzd29yZCB0byBsb2cgaW4uXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP3VzZXJuYW1lPSR7dXNlcm5hbWV9YCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYWxlcnQoXCJUaGVyZSBpcyBubyB1c2VyIHdpdGggdGhhdCB1c2VybmFtZS5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHBhc3N3b3JkID09PSBkYXRhWzBdLnBhc3N3b3JkKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gbmV3IGNvbXAudXNlciAoZGF0YVswXSk7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRVc2VyO1xuICAgICAgICB9IGVsc2UgKCBhbGVydChcIllvdSBlbnRlcmVkIHRoZSB3cm9uZyBwYXNzd29yZC4gVHJ5IGFnYWluLlwiKSlcbiAgICAgIH0pLnRoZW4oY3VycmVudFVzZXIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VXNlcilcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvL3RoZXNlIGNvbnNvbGUgbG9ncyB3aWxsIGJlIHJlbW92ZWQgb25jZSB3ZSBjYW4gYWRkIGEgZnVuY3Rpb24gdG8gbW92ZSB0byBtaXNzaW9uIGNvbnRyb2wgcGFnZVxuICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRVc2VyLnRlc3QoKSk7XG4gICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFVzZXIpO1xuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgY3VycmVudFVzZXIuaWQpXG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRVc2VyKSk7XG4gICAgICAgICAgLy90aGlzIHdpbGwgYmUgdGhlIGZ1bmN0aW9uIHRvIHNlbmQgdG8gdGhlIG1pc3Npb24gY29udHJvbCBwYWdlXG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGxvYWRMb2dJbigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJVc2VybmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJ1c2VybmFtZVwiLCBpZDogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwicGFzc3dvcmRcIiB9LCBcIlBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInBhc3N3b3JkXCIsIGlkOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCIgfSksXG4gICAgICBuZXcgY29tcC5idG4oXCJMb2dpbiBOb3dcIiksXG4gICAgICBuZXcgY29tcC5idG4oXCJOb3QgYSB1c2VyPyBDcmVhdGUgbmV3IGFjY291bnQuXCIpXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJidXR0b25cIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJMb2dpbiBOb3dcIikge1xuICAgICAgICAgIHRoaXMuY2hlY2tVc2VyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGxvZ0luRnVuY3MiLCIvLyBpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IGxhbmRpbmdQYWdlRnVuY3MgZnJvbSBcIi4vbGFuZGluZ1wiXHJcbi8vIGltcG9ydCBidWlsZE1lc3NhZ2VzIGZyb20gXCIuL21lc3NhZ2VzXCJcclxuLy8gaW1wb3J0IGJ1aWxkTmV3cyBmcm9tIFwiLi9uZXdzXCJcclxuaW1wb3J0IG5hdkJhciBmcm9tIFwiLi9uYXZcIlxyXG5cclxubmF2QmFyLmxvYWROYXZCYXIoKTtcclxubGFuZGluZ1BhZ2VGdW5jcy5sb2FkTGFuZGluZ1BhZ2UoKTtcclxuLy8gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCk7XHJcbi8vIGJ1aWxkTmV3cy5uZXdzTWFwKClcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcblxyXG5cclxuY29uc3QgYnVpbGRNZXNzYWdlcyA9IHtcclxuICBwcmludE1lc3NhZ2VzIChtZXNzYWdlT2JqKSB7XHJcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm1lc3NhZ2VcIiwgaWQ6IGAke21lc3NhZ2VPYmouaWR9YH0sXHJcbiAgICBuZXcgY29tcC5pbWFnZSh7c3JjOiBgJHttZXNzYWdlT2JqLnVzZXIucHJvZmlsZVBpY31gLCBhbHQ6IFwiUHJvZmlsZSBQaWNcIiwgc3R5bGU6XCJkaXNwbGF5OmlubGluZS1ibG9jazsgYm9yZGVyLXJhZGl1czogOHB4OyBtYXJnaW46IDRweFwiLCBoZWlnaHQ6IFwiMjVcIiwgd2lkdGg6IFwiMjVcIn0pLFxyXG4gICAgbmV3IGNvbXAudGl0bGUoIFwiaDJcIiwge3N0eWxlOlwiZGlzcGxheTogaW5saW5lLWJsb2NrOyBwb3NpdGlvbjogcmVsYXRpdmU7IGJvdHRvbTogMTBweFwifSwgYCR7bWVzc2FnZU9iai51c2VyLmZpcnN0TmFtZX0gLSAke21lc3NhZ2VPYmouZGF0ZX0gJHttZXNzYWdlT2JqLnRpbWVTdGFtcH1gKSxcclxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG1lc3NhZ2VPYmoubWVzc2FnZUNvbnRlbnQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gIH0sXHJcblxyXG4gIG1lc3NhZ2VNYXAgKCkgIHtcclxuICAgIGNvbnN0IHVzZXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XHJcbiAgICBjb25zb2xlLmxvZyh1c2VyKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJtZXNzYWdlcy8/X2V4cGFuZD11c2VyXCIpXHJcbiAgICAudGhlbihtZXNzYWdlT2JqID0+IG1lc3NhZ2VPYmouZm9yRWFjaChtZXNzYWdlID0+IHtcclxuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICAgIHRoaXMucHJpbnRNZXNzYWdlcyhtZXNzYWdlKX0pKVxyXG4gICAgICAudGhlbigoKSA9PiB0aGlzLm5ld01lc3NhZ2UoKSlcclxuXHJcbiAgfSxcclxuXHJcbiAgbmV3TWVzc2FnZSAoKSB7XHJcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tbWVzc2FnZVwifSxcclxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHt9LCBcIk5ldyBNZXNzYWdlXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQgKHtwbGFjZWhvbGRlcjogXCJ0eXBlIHlvdXIgbWVzc2FnZSBoZXJlXCIsIHR5cGU6IFwidGV4dGFyZWFcIn0pLFxyXG4gICAgbmV3IGNvbXAuYnRuIChcIlN1Ym1pdFwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICB9XHJcblxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTWVzc2FnZXNcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiXG5pbXBvcnQgYnVpbGRNZXNzYWdlcyBmcm9tIFwiLi9tZXNzYWdlc1wiO1xuaW1wb3J0IGJ1aWxkTmV3cyBmcm9tIFwiLi9uZXdzXCI7XG5cblxuY29uc3QgbmF2QmFyID0ge1xuICBsb2FkTmF2QmFyKCkge1xuICAgIG5ldyBjb21wLnVsKFxuICAgICAge30sXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJIb21lXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiVGFza3NcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJFdmVudHNcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJNZXNzYWdlc1wiKSxcbiAgICAgIG5ldyBjb21wLmxpKHt9LCBcIk5ld3NcIiksXG4gICAgICBuZXcgY29tcC5saSh7fSwgXCJGcmllbmRzXCIpLFxuICAgICAgbmV3IGNvbXAubGkoe30sIFwiTG9nIE91dFwiKVxuICAgICkucmVuZGVyKFwiI25hdkJhclwiKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYXZCYXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJIb21lXCIpIHtcbiAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJUYXNrc1wiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGFzayBmdW5jdGlvbiBjYWxsZWQuXCIpXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkV2ZW50c1wiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXZlbnRzIGZ1bmN0aW9uIGNhbGxlZC5cIilcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTWVzc2FnZXNcIikge1xuICAgICAgICBidWlsZE1lc3NhZ2VzLm1lc3NhZ2VNYXAoKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09IFwiTmV3c1wiKSB7XG4gICAgICAgIGJ1aWxkTmV3cy5uZXdzTWFwKCk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkZyaWVuZHNcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZyaWVuZHMgZnVuY3Rpb24gY2FsbGVzLlwiKVxuICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJMb2cgT3V0XCIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2cgT3V0IGZ1bmN0aW9uIGNhbGxlZC5cIilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmF2QmFyIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZSggXCJoMlwiLCB7fSwgYCR7bmV3c09iai5hcnRpY2xlTmFtZX1gKSxcbiAgICBuZXcgY29tcC50aXRsZShcImg0XCIsIHt9LCBgU2F2ZWQgYnk6ICR7bmV3c09iai51c2VyLmZpcnN0TmFtZX0gfCBEYXRlIFNhdmVkOiAke25ld3NPYmouZGF0ZVNhdmVkfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG5ld3NPYmouYWJvdXQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG4gIG5ld3NNYXAgKCkgIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcImFydGljbGVzLz9fZXhwYW5kPXVzZXImX3NvcnQ9ZGF0ZVNhdmVkJl9vcmRlcj1kZXNjXCIpXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhuZXdzKTtcbiAgICAgIHRoaXMucHJpbnROZXdzKG5ld3MpfSkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLm5ld05ld3MoKSlcblxuICB9LFxuXG4gIG5ld05ld3MgKCkge1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS1uZXdzXCJ9LFxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHt9LCBcIlNhdmUgTmV3cyBBcnRpY2xlXCIpLFxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVOYW1lXCJ9LCBcIkFydGljbGUgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVOYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTmFtZVwiLCBpZDogXCJhcnRpY2xlTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlVXJsXCJ9LCBcIkFydGljbGUgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBMaW5rXCIsIGlkOiBcImFydGljbGVMaW5rXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZUltYWdlVXJsXCJ9LCBcIkFydGljbGUgSW1hZ2UgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVJbWFnZVVybFwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIEltYWdlIExpbmtcIiwgaWQ6IFwiYXJ0aWNsZUltYWdlXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9LCBcIkFydGljbGUgRGVzY3JpcHRpb25cIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlRGVzY3JpcHRpb25cIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBEZXNjcmlwdGlvblwiLCBpZDogXCJhcnRpY2xlRGVzY3JpcHRpb25cIn0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiU2F2ZSBOZXcgQXJ0aWNsZVwiKVxuICAgICksXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgIGxldCBzdG9yeSA9IHtcbiAgICAgICAgYXJ0aWNsZU5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZU5hbWVcIikudmFsdWUsXG4gICAgICAgIHVybDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlTGlua1wiKS52YWx1ZSxcbiAgICAgICAgYXJ0aWNsZUltYWdlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVJbWFnZVwiKS52YWx1ZSxcbiAgICAgICAgYWJvdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZURlc2NyaXB0aW9uXCIpLnZhbHVlLFxuICAgICAgICAvKlxuICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxuICAgICAgICAqL1xuICAgICAgICB1c2VySWQ6IDIsXG4gICAgICAgIGRhdGVTYXZlZDogbmV3IERhdGUoKVxuICAgICAgfVxuICAgICAgYnVpbGROZXdzLmFkZE5ld3Moc3RvcnkpXG4gICAgfSlcbiAgfSxcblxuICBhZGROZXdzKHN0b3J5KXtcbiAgICBBUEkuc2F2ZUl0ZW0oXCJhcnRpY2xlc1wiLCBzdG9yeSkudGhlbigoKT0+IHRoaXMubmV3c01hcCgpKVxuICB9XG5cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGROZXdzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5cbmNvbnN0IHJlZ2lzdGVyRnVuY3MgPSB7XG5cbiAgbG9hZFJlZ2lzdGVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkZpcnN0IE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwiZmlyc3ROYW1lXCIsIGlkOiBcImZpcnN0TmFtZVwiLCBwbGFjZWhvbGRlcjogXCJGaXJzdCBOYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJMYXN0IE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwibGFzdE5hbWVcIiwgaWQ6IFwibGFzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiTGFzdCBOYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJFbWFpbFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJlbWFpbFwiLCBpZDogXCJlbWFpbFwiLCBuYW1lOiBcImVtYWlsXCIsIHBsYWNlaG9sZGVyOiBcImVtYWlsXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJVc2VybmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJ1c2VybmFtZVwiLCBpZDogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwicGFzc3dvcmRcIiB9LCBcIlBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInBhc3N3b3JkXCIsIGlkOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJjb25maXJtUGFzc3dvcmRcIiB9LCBcIkNvbmZpcm0gUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwiY29uZmlybVBhc3N3b3JkXCIsIGlkOiBcImNvbmZpcm1QYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJDb25maXJtIFBhc3N3b3JkXCIgfSksXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlciBBY2NvdW50XCIpLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiQWxyZWFkeSBhIHVzZXI/IExvZyBpbiBub3dcIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIlJlZ2lzdGVyIEFjY291bnRcIikge1xuICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpcnN0TmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhc3ROYW1lXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVBhc3N3b3JkXCIpLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNoZWNrIHRvIGVuc3VyZSBhbGwgZmllbGRzIGFyZSBjb21wbGV0ZS5cbiAgICAgICAgICAgIGFsZXJ0KFwiQWxsIGZpZWxkcyBtdXN0IGJlIGNvbXBsZXRlIHRvIGNyZWF0ZSBhbiBhY2NvdW50LlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKS52YWx1ZS5pbmRleE9mKFwiQFwiKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyBhIGNoZWNrIG9uIHRoZSBlbWFpbCBmaWVsZCB0byBtYWtlIHN1cmUgdGhlcmUgaXMgYW4gQCBwcmVzZW50XG4gICAgICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCIpXG4gICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlID09PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1QYXNzd29yZFwiKS52YWx1ZSkge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBjaGVjayB0byBtYWtlIHN1cmUgcGFzc3dvcmRzIGFyZSB0aGUgc2FtZS5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgbGV0IHRlbXBVc2VyID0ge1xuICAgICAgICAgICAgICBmaXJzdE5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmlyc3ROYW1lXCIpLnZhbHVlLFxuICAgICAgICAgICAgICBsYXN0TmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXN0TmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgZW1haWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUsXG4gICAgICAgICAgICAgIHVzZXJuYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJuYW1lXCIpLnZhbHVlLFxuICAgICAgICAgICAgICBwYXNzd29yZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgLy9UaGlzIGlzIGEgcGxhY2Vob2xkZXIgdG8gYSBzdG9jayBcIm5vIGltYWdlIGF2YWlsYWJsZVwiIGltYWdlIHRoYXQgd2UgY2FuIHVzZSBsYXRlciBmb3IgYWN0dWFsIHVzZXIgaW1hZ2VzXG4gICAgICAgICAgICAgIHByb2ZpbGVQaWM6IFwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS91cmw/c2E9aSZzb3VyY2U9aW1hZ2VzJmNkPSZ2ZWQ9MmFoVUtFd2lGNGZiNC1jbmVBaFVFYzk4S0hUdVJCV0FRalJ4NkJBZ0JFQVUmdXJsPWh0dHBzJTNBJTJGJTJGd2luZ3NsYXguY29tJTJGdGVhbSUyRmZyb250LW9mZmljZSUyRmF0dGFjaG1lbnQlMkZuby1pbWFnZS1hdmFpbGFibGUlMkYmcHNpZz1BT3ZWYXcxaVRWcHZqTG1pZ2t6bmk1c3NZajU3JnVzdD0xNTQxOTQzNjY4OTI1NjU2XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFQSS5nZXRBbGxDYXRlZ29yeShgdXNlcnMvP2VtYWlsPSR7dGVtcFVzZXIuZW1haWx9YCkudGhlbih0aGlzRGF0YSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzRGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUmVnaXN0ZXIodGVtcFVzZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVGhpcyBlbWFpbCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQuXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHsgYWxlcnQoXCJZb3VyIHBhc3N3b3JkcyBkaWQgbm90IG1hdGNoLiBQbGVhc2UgdHJ5IGFnYWluLlwiKSB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgY2hlY2tSZWdpc3Rlcih1c2VyKSB7XG4gICAgQVBJLmdldEFsbENhdGVnb3J5KGB1c2Vycy8/dXNlcm5hbWU9JHt1c2VyLnVzZXJuYW1lfWApLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgQVBJLnNhdmVJdGVtKFwidXNlcnNcIiwgdXNlcikudGhlbihuZXdVc2VyID0+IHtcbiAgICAgICAgICBsZXQgY3VycmVudFVzZXIgPSBuZXcgY29tcC51c2VyKG5ld1VzZXIpO1xuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBjdXJyZW50VXNlcilcbiAgICAgICAgICAvL1RPRE86dGhlIGZ1bmN0aW9uIGJlbG93IG5lZWRzIHRvIGJlIHRoZSBjYWxsIHRvIGxvYWQgbWlzc2lvbiBjb250cm9sIHBhZ2UuXG4gICAgICAgICAgLy8gUmlnaHQgbm93IGl0IGlzIGp1c3Qgc2VuZGluZyB0byBhIGZ1bmN0aW9uIHRvIGNvbnNvbGUubG9nIHVzZXJcbiAgICAgICAgICB0aGlzLmxvYWRNaXNzaW9uKGN1cnJlbnRVc2VyKTtcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYWxlcnQoYFVzZXJuYW1lLCAke2RhdGFbMF0udXNlcm5hbWV9LCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuIFBsZWFzZSBjaG9vc2UgYW5vdGhlci5gKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLy9UT0RPOiB0aGlzIGZ1bmN0aW9uIGNhbiBnbyBhd2F5IHdoZW4gdGhlIGZ1bmN0aW9uIHRvIGxvYWQgbWlzc2lvbiBwYWdlIGlzIHJlcGxhY2VkIGluIGNoZWNrUmVnaXN0ZXIgZnVuY3Rpb24gYWJvdmVcbiAgbG9hZE1pc3Npb24odXNlcikge1xuICAgIGNvbnNvbGUubG9nKFwiTG9hZCBNaXNzaW9uOiBcIiwgdXNlcilcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckZ1bmNzIl19
