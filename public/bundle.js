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

},{"./components":3,"./login":5,"./register":9}],5:[function(require,module,exports){
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
        if (currentUser !== undefined) {
          //these console logs will be removed once we can add a function to move to mission control page
          console.log(currentUser.test());
          console.log(currentUser); //this will be the function to send to the mission control page
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

},{"./apiData":2,"./components":3,"./register":9}],6:[function(require,module,exports){
"use strict";

var _components = _interopRequireDefault(require("./components"));

var _landing = _interopRequireDefault(require("./landing"));

var _messages = _interopRequireDefault(require("./messages"));

var _news = _interopRequireDefault(require("./news"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_landing.default.loadLandingPage(); // buildMessages.messageMap();
// buildNews.newsMap()

},{"./components":3,"./landing":4,"./messages":7,"./news":8}],7:[function(require,module,exports){
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
    }, new _components.default.title("h2", {}, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`), new _components.default.title("h1", {}, messageObj.messageContent)).render(".container--inner");
  },

  messageMap() {
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

},{"./apiData":2,"./components":3}],9:[function(require,module,exports){
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
            this.checkRegister(tempUser);
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
          let currentUser = new _components.default.user(newUser); //TODO:the function below needs to be the call to load mission control page.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvbGFuZGluZy5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9uZXdzLmpzIiwiLi4vc2NyaXB0cy9yZWdpc3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLE1BQU0sYUFBYSxHQUFHLE1BQU0sRUFBNUI7O0FBRUEsTUFBTSxZQUFOLENBQW1CO0FBQ2YsRUFBQSxXQUFXLENBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsR0FBRyxRQUF0QixFQUFnQztBQUN2QyxTQUFLLGFBQUwsSUFBc0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBdEI7QUFFQTs7Ozs7QUFJQSxRQUFJLE9BQU8sVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUNoQyxXQUFLLGFBQUwsRUFBb0IsV0FBcEIsR0FBa0MsVUFBbEM7QUFDQSxhQUFPLElBQVA7QUFDSCxLQUhELE1BR08sSUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDdkMsV0FBSyxhQUFMLElBQXNCLE1BQU0sQ0FBQyxNQUFQLENBQWMsS0FBSyxhQUFMLENBQWQsRUFBbUMsVUFBbkMsQ0FBdEI7QUFDSDs7QUFFRCxRQUFJLFFBQVEsQ0FBQyxNQUFiLEVBQXFCO0FBQ2pCLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3RCO0FBQ0EsWUFBSSxLQUFLLENBQUMsT0FBTixZQUF5QixNQUFNLENBQUMsT0FBcEMsRUFBNkM7QUFDekMsZUFBSyxhQUFMLEVBQW9CLFdBQXBCLENBQWdDLEtBQUssQ0FB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QUFnQixDQUFwQixFQUF1QjtBQUM1QixRQUFBLEtBQUssQ0FBRSxhQUFZLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxRQUFTLGlEQUEvQixDQUFMO0FBQ0Q7QUFDRixLQVhEO0FBWUQsR0EvRG1COztBQWlFcEI7QUFDQSxFQUFBLFdBQVcsQ0FBQyxJQUFELEVBQU87QUFDaEIsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCO0FBQ0Q7O0FBcEVtQixDQUF0QjtlQXVFZSxhIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGVsZW1lbnRTeW1ib2wgPSBTeW1ib2woKVxuXG5jbGFzcyBET01Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIElmIGBhdHRyaWJ1dGVzYCBpcyBqdXN0IGEgc3RyaW5nLCBpdCdzIGEgc2ltcGxlIGVsZW1lbnQgd2l0aCBub1xuICAgICAgICAgICAgcHJvcGVydGllcyAtIGp1c3Qgc29tZSB0ZXh0IGNvbnRlbnRcbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gYXR0cmlidXRlc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IE9iamVjdC5hc3NpZ24odGhpc1tlbGVtZW50U3ltYm9sXSwgYXR0cmlidXRlcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9uZSBIVE1MRWxlbWVudCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmVsZW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGNoaWxkLmVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQW4gYXJyYXkgb2YgZWxlbWVudHMgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaGlsZC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5lbGVtZW50LmZvckVhY2goYyA9PiB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGMpKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZyB2YWx1ZSB3YXMgcGFzc2VkIGluLCBzZXQgdGV4dCBjb250ZW50XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS50ZXh0Q29udGVudCA9IGNoaWxkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZ2V0IGVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tlbGVtZW50U3ltYm9sXVxuICAgIH1cblxuICAgIHJlbmRlcihjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpc1tlbGVtZW50U3ltYm9sXSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpLmFwcGVuZENoaWxkKGZyYWdtZW50KVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBET01Db21wb25lbnRcbiIsImNvbnN0IFVSTCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L1wiXG5cbmNvbnN0IEFQSSA9IHtcbiAgZ2V0QWxsQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YClcbiAgICAgIC50aGVuKGVudHJpZXMgPT4gZW50cmllcy5qc29uKCkpXG4gIH0sXG5cbiAgZ2V0T25lRnJvbUNhdGVnb3J5KGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0/aWQ9JHtpZH1gKVxuICAgICAgLnRoZW4oaW5wdXRzID0+IGlucHV0cy5qc29uKCkpXG4gIH0sXG5cbiAgc2F2ZUl0ZW0oY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgIH0pLnRoZW4oZGF0YSA9PiBkYXRhLmpzb24oKSlcbiAgfSxcblxuICBkZWxldGVJdGVtKGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0/aWQ9JHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICB1cGRhdGVJdGVtKGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0/aWQ9JHtpZH1gLCB7XG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9KVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgRE9NQ29tcG9uZW50IGZyb20gXCIuLi9saWIvbm9kZV9tb2R1bGVzL25zcy1kb21jb21wb25lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmNyZWF0ZShudWxsLCB7XHJcblxyXG4gIHVzZXI6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBVc2VyIHtcclxuICAgICAgY29uc3RydWN0b3IodGVtcEluZm8pIHtcclxuICAgICAgICB0aGlzLmlkID0gdGVtcEluZm8uaWQ7XHJcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB0ZW1wSW5mby5maXJzdE5hbWU7XHJcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9IHRlbXBJbmZvLmxhc3ROYW1lO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB0ZW1wSW5mby51c2VybmFtZTtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gdGVtcEluZm8ucGFzc3dvcmQ7XHJcbiAgICAgICAgdGhpcy5lbWFpbCA9IHRlbXBJbmZvLmVtYWlsO1xyXG4gICAgICAgIHRoaXMucHJvZmlsZVBpYyA9IHRlbXBJbmZvLnByb2ZpbGVQaWM7XHJcbiAgICB9XHJcbiAgICAvL1RPRE86IHRoaXMgaXMganVzdCBhIHRlc3QgZnVuY3Rpb24uIHdlIHdvdWxkIGhhdmUgdGhlIGFiaWxpdHkgdG8gY2FsbCBmb3Igc2F2aW5nXHJcbiAgICAvLyBtZXNzYWdlcyxhcnRpY2xlcywgZXZlbnRzIGJlIHJlZmVyZW5jaW5nIGEgZnVuY3Rpb24gZGVmaW5lZCBoZXJlXHJcbiAgICAgIHRlc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIGBXZWxjb21lICR7dGhpcy5maXJzdE5hbWV9ISBMZXQncyBzZWUgd2hhdCdzIGdvaW5nIG9uLmA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBkaXY6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBkaXYgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZGl2XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBidG46IHtcclxuICAgIHZhbHVlOiBjbGFzcyBidG4gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImJ0blwiLCB0eXBlOiBcImJ1dHRvblwiIH0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbnB1dDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGlucHV0IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZWN0aW9uOiB7XHJcbiAgICB2YWx1ZTogY2xhc3Mgc2VjdGlvbiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJzZWN0aW9uXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB0aXRsZTogeyAvL2RlZmluZSBhbnkgdHlwZSBvZiBoIy4uIGgxLCBoMiwgZXRjLlxyXG4gICAgdmFsdWU6IGNsYXNzIHRpdGxlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoaF90eXBlLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGFuY2hvcjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGFuY2hvciBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJhXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGVja2JveDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGNoZWNrYm94IGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBjbGFzc05hbWU6IFwiY2JcIiB9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW1hZ2U6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBpbWFnZSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbWdcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHVsOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgdWwgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwidWxcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGxpOiB7XHJcbiAgICB2YWx1ZTogY2xhc3MgbGkgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwibGlcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHZhbHVlOiBjbGFzcyBmb3JtIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImZvcm1cIiwge30sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBsYWJlbDoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGxhYmVsIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImxhYmVsXCIsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KSIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiXHJcbmltcG9ydCByZWdpc3RlckZ1bmNzIGZyb20gXCIuL3JlZ2lzdGVyXCJcclxuXHJcbmNvbnN0IGxhbmRpbmdQYWdlRnVuY3MgPSB7XHJcbiAgbG9hZExhbmRpbmdQYWdlKCkge1xyXG4gICAgbmV3IGNvbXAuZGl2KFxyXG4gICAgICB7IGNsYXNzTGlzdDogXCJ3ZWxjb21lXCIgfSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJ0aXRsZVwiIH0sIFwiV2VsY29tZSB0byBNaXNzaW9uIENvbnRyb2xcIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlclwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGxldCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKVxyXG5cclxuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9naW5cIikge1xyXG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYW5kaW5nUGFnZUZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIjtcblxuY29uc3QgbG9nSW5GdW5jcyA9IHtcbiAgY2hlY2tVc2VyKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgIGlmICh1c2VybmFtZSA9PT0gXCJcIiB8fCBwYXNzd29yZCA9PT1cIlwiKSB7XG4gICAgICBhbGVydChcIllvdSBtdXN0IGVudGVyIGJvdGggeW91ciB1c2VybmFtZSBhbmQgcGFzc3dvcmQgdG8gbG9nIGluLlwiKVxuICAgIH0gZWxzZSB7XG4gICAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz91c2VybmFtZT0ke3VzZXJuYW1lfWApLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgaXMgbm8gdXNlciB3aXRoIHRoYXQgdXNlcm5hbWUuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChwYXNzd29yZCA9PT0gZGF0YVswXS5wYXNzd29yZCkge1xuICAgICAgICAgIGxldCBjdXJyZW50VXNlciA9IG5ldyBjb21wLnVzZXIgKGRhdGFbMF0pO1xuICAgICAgICAgIHJldHVybiBjdXJyZW50VXNlcjtcbiAgICAgICAgfSBlbHNlICggYWxlcnQoXCJZb3UgZW50ZXJlZCB0aGUgd3JvbmcgcGFzc3dvcmQuIFRyeSBhZ2Fpbi5cIikpXG4gICAgICB9KS50aGVuKGN1cnJlbnRVc2VyID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvL3RoZXNlIGNvbnNvbGUgbG9ncyB3aWxsIGJlIHJlbW92ZWQgb25jZSB3ZSBjYW4gYWRkIGEgZnVuY3Rpb24gdG8gbW92ZSB0byBtaXNzaW9uIGNvbnRyb2wgcGFnZVxuICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRVc2VyLnRlc3QoKSk7XG4gICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFVzZXIpO1xuICAgICAgICAgIC8vdGhpcyB3aWxsIGJlIHRoZSBmdW5jdGlvbiB0byBzZW5kIHRvIHRoZSBtaXNzaW9uIGNvbnRyb2wgcGFnZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbG9hZExvZ0luKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInVzZXJuYW1lXCIsIGlkOiBcInVzZXJuYW1lXCIsIHBsYWNlaG9sZGVyOiBcInVzZXJuYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJwYXNzd29yZFwiIH0sIFwiUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwicGFzc3dvcmRcIiwgaWQ6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIiB9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luIE5vd1wiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIk5vdCBhIHVzZXI/IENyZWF0ZSBuZXcgYWNjb3VudC5cIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luIE5vd1wiKSB7XG4gICAgICAgICAgdGhpcy5jaGVja1VzZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZFwiKS52YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbG9nSW5GdW5jcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgbGFuZGluZ1BhZ2VGdW5jcyBmcm9tIFwiLi9sYW5kaW5nXCJcclxuaW1wb3J0IGJ1aWxkTWVzc2FnZXMgZnJvbSBcIi4vbWVzc2FnZXNcIlxyXG5pbXBvcnQgYnVpbGROZXdzIGZyb20gXCIuL25ld3NcIlxyXG5cclxubGFuZGluZ1BhZ2VGdW5jcy5sb2FkTGFuZGluZ1BhZ2UoKTtcclxuLy8gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCk7XHJcbi8vIGJ1aWxkTmV3cy5uZXdzTWFwKClcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcblxyXG5cclxuY29uc3QgYnVpbGRNZXNzYWdlcyA9IHtcclxuICBwcmludE1lc3NhZ2VzIChtZXNzYWdlT2JqKSB7XHJcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm1lc3NhZ2VcIiwgaWQ6IGAke21lc3NhZ2VPYmouaWR9YH0sXHJcbiAgICBuZXcgY29tcC50aXRsZSggXCJoMlwiLCB7fSwgYCR7bWVzc2FnZU9iai51c2VyLmZpcnN0TmFtZX0gLSAke21lc3NhZ2VPYmouZGF0ZX0gJHttZXNzYWdlT2JqLnRpbWVTdGFtcH1gKSxcclxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG1lc3NhZ2VPYmoubWVzc2FnZUNvbnRlbnQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxyXG4gIH0sXHJcblxyXG4gIG1lc3NhZ2VNYXAgKCkgIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoXCJtZXNzYWdlcy8/X2V4cGFuZD11c2VyXCIpXHJcbiAgICAudGhlbihtZXNzYWdlT2JqID0+IG1lc3NhZ2VPYmouZm9yRWFjaChtZXNzYWdlID0+IHtcclxuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICAgIHRoaXMucHJpbnRNZXNzYWdlcyhtZXNzYWdlKX0pKVxyXG4gICAgICAudGhlbigoKSA9PiB0aGlzLm5ld01lc3NhZ2UoKSlcclxuXHJcbiAgfSxcclxuXHJcbiAgbmV3TWVzc2FnZSAoKSB7XHJcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tbWVzc2FnZVwifSxcclxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHt9LCBcIk5ldyBNZXNzYWdlXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQgKHtwbGFjZWhvbGRlcjogXCJ0eXBlIHlvdXIgbWVzc2FnZSBoZXJlXCIsIHR5cGU6IFwidGV4dGFyZWFcIn0pLFxyXG4gICAgbmV3IGNvbXAuYnRuIChcIlN1Ym1pdFwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICB9XHJcblxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTWVzc2FnZXNcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcbiAgICBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZSggXCJoMlwiLCB7fSwgYCR7bmV3c09iai5hcnRpY2xlTmFtZX1gKSxcbiAgICBuZXcgY29tcC50aXRsZShcImg0XCIsIHt9LCBgU2F2ZWQgYnk6ICR7bmV3c09iai51c2VyLmZpcnN0TmFtZX0gfCBEYXRlIFNhdmVkOiAke25ld3NPYmouZGF0ZVNhdmVkfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG5ld3NPYmouYWJvdXQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG4gIG5ld3NNYXAgKCkgIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcImFydGljbGVzLz9fZXhwYW5kPXVzZXImX3NvcnQ9ZGF0ZVNhdmVkJl9vcmRlcj1kZXNjXCIpXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhuZXdzKTtcbiAgICAgIHRoaXMucHJpbnROZXdzKG5ld3MpfSkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLm5ld05ld3MoKSlcblxuICB9LFxuXG4gIG5ld05ld3MgKCkge1xuICAgIG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibmV3LS1uZXdzXCJ9LFxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHt9LCBcIlNhdmUgTmV3cyBBcnRpY2xlXCIpLFxuICAgIG5ldyBjb21wLmZvcm0oXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVOYW1lXCJ9LCBcIkFydGljbGUgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVOYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTmFtZVwiLCBpZDogXCJhcnRpY2xlTmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlVXJsXCJ9LCBcIkFydGljbGUgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBMaW5rXCIsIGlkOiBcImFydGljbGVMaW5rXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZUltYWdlVXJsXCJ9LCBcIkFydGljbGUgSW1hZ2UgTGlua1wiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImFydGljbGVJbWFnZVVybFwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIEltYWdlIExpbmtcIiwgaWQ6IFwiYXJ0aWNsZUltYWdlXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9LCBcIkFydGljbGUgRGVzY3JpcHRpb25cIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlRGVzY3JpcHRpb25cIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBEZXNjcmlwdGlvblwiLCBpZDogXCJhcnRpY2xlRGVzY3JpcHRpb25cIn0pLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiU2F2ZSBOZXcgQXJ0aWNsZVwiKVxuICAgICksXG4gICAgKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgIGxldCBzdG9yeSA9IHtcbiAgICAgICAgYXJ0aWNsZU5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZU5hbWVcIikudmFsdWUsXG4gICAgICAgIHVybDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlTGlua1wiKS52YWx1ZSxcbiAgICAgICAgYXJ0aWNsZUltYWdlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVJbWFnZVwiKS52YWx1ZSxcbiAgICAgICAgYWJvdXQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZURlc2NyaXB0aW9uXCIpLnZhbHVlLFxuICAgICAgICAvKlxuICAgICAgICBORUVEIFRPIFVQREFURSBVU0VSIElEIFRPIFNBVkUgU0VTU0lPTiBBU1NJR05FRCBJRFxuICAgICAgICAqL1xuICAgICAgICB1c2VySWQ6IDIsXG4gICAgICAgIGRhdGVTYXZlZDogbmV3IERhdGUoKVxuICAgICAgfVxuICAgICAgYnVpbGROZXdzLmFkZE5ld3Moc3RvcnkpXG4gICAgfSlcbiAgfSxcblxuICBhZGROZXdzKHN0b3J5KXtcbiAgICBBUEkuc2F2ZUl0ZW0oXCJhcnRpY2xlc1wiLCBzdG9yeSkudGhlbigoKT0+IHRoaXMubmV3c01hcCgpKVxuICB9XG5cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgYnVpbGROZXdzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgbG9nSW5GdW5jcyBmcm9tIFwiLi9sb2dpblwiO1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9hcGlEYXRhXCI7XG5cbmNvbnN0IHJlZ2lzdGVyRnVuY3MgPSB7XG5cbiAgbG9hZFJlZ2lzdGVyKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkZpcnN0IE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwiZmlyc3ROYW1lXCIsIGlkOiBcImZpcnN0TmFtZVwiLCBwbGFjZWhvbGRlcjogXCJGaXJzdCBOYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJMYXN0IE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwibGFzdE5hbWVcIiwgaWQ6IFwibGFzdE5hbWVcIiwgcGxhY2Vob2xkZXI6IFwiTGFzdCBOYW1lXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJFbWFpbFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJlbWFpbFwiLCBpZDogXCJlbWFpbFwiLCBuYW1lOiBcImVtYWlsXCIsIHBsYWNlaG9sZGVyOiBcImVtYWlsXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJVc2VybmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgbmFtZTogXCJ1c2VybmFtZVwiLCBpZDogXCJ1c2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ1c2VybmFtZVwiIH0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoeyBmb3I6IFwicGFzc3dvcmRcIiB9LCBcIlBhc3N3b3JkXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoeyBuYW1lOiBcInBhc3N3b3JkXCIsIGlkOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCIgfSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7IGZvcjogXCJjb25maXJtUGFzc3dvcmRcIiB9LCBcIkNvbmZpcm0gUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7IG5hbWU6IFwiY29uZmlybVBhc3N3b3JkXCIsIGlkOiBcImNvbmZpcm1QYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJDb25maXJtIFBhc3N3b3JkXCIgfSksXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlciBBY2NvdW50XCIpLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiQWxyZWFkeSBhIHVzZXI/IExvZyBpbiBub3dcIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIlJlZ2lzdGVyIEFjY291bnRcIikge1xuICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpcnN0TmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhc3ROYW1lXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWxcIikudmFsdWUgPT09IFwiXCIgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZVwiKS52YWx1ZSA9PT0gXCJcIiB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlID09PSBcIlwiIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVBhc3N3b3JkXCIpLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNoZWNrIHRvIGVuc3VyZSBhbGwgZmllbGRzIGFyZSBjb21wbGV0ZS5cbiAgICAgICAgICAgIGFsZXJ0KFwiQWxsIGZpZWxkcyBtdXN0IGJlIGNvbXBsZXRlIHRvIGNyZWF0ZSBhbiBhY2NvdW50LlwiKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKS52YWx1ZS5pbmRleE9mKFwiQFwiKT09PSAtMSkge1xuICAgICAgICAgICAgLy9UaGlzIGlzIGEgY2hlY2sgb24gdGhlIGVtYWlsIGZpZWxkIHRvIG1ha2Ugc3VyZSB0aGVyZSBpcyBhbiBAIHByZXNlbnRcbiAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcy5cIilcbiAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmRcIikudmFsdWUgPT09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVBhc3N3b3JkXCIpLnZhbHVlKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNoZWNrIHRvIG1ha2Ugc3VyZSBwYXNzd29yZHMgYXJlIHRoZSBzYW1lLlxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBsZXQgdGVtcFVzZXIgPSB7XG4gICAgICAgICAgICAgIGZpcnN0TmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaXJzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIGxhc3ROYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhc3ROYW1lXCIpLnZhbHVlLFxuICAgICAgICAgICAgICBlbWFpbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbFwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgdXNlcm5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkXCIpLnZhbHVlLFxuICAgICAgICAgICAgICAvL1RoaXMgaXMgYSBwbGFjZWhvbGRlciB0byBhIHN0b2NrIFwibm8gaW1hZ2UgYXZhaWxhYmxlXCIgaW1hZ2UgdGhhdCB3ZSBjYW4gdXNlIGxhdGVyIGZvciBhY3R1YWwgdXNlciBpbWFnZXNcbiAgICAgICAgICAgICAgcHJvZmlsZVBpYzogXCJodHRwczovL3d3dy5nb29nbGUuY29tL3VybD9zYT1pJnNvdXJjZT1pbWFnZXMmY2Q9JnZlZD0yYWhVS0V3aUY0ZmI0LWNuZUFoVUVjOThLSFR1UkJXQVFqUng2QkFnQkVBVSZ1cmw9aHR0cHMlM0ElMkYlMkZ3aW5nc2xheC5jb20lMkZ0ZWFtJTJGZnJvbnQtb2ZmaWNlJTJGYXR0YWNobWVudCUyRm5vLWltYWdlLWF2YWlsYWJsZSUyRiZwc2lnPUFPdlZhdzFpVFZwdmpMbWlna3puaTVzc1lqNTcmdXN0PTE1NDE5NDM2Njg5MjU2NTZcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGVja1JlZ2lzdGVyKHRlbXBVc2VyKTtcbiAgICAgICAgICB9IGVsc2UgeyBhbGVydChcIllvdXIgcGFzc3dvcmRzIGRpZCBub3QgbWF0Y2guIFBsZWFzZSB0cnkgYWdhaW4uXCIpIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBjaGVja1JlZ2lzdGVyKHVzZXIpIHtcbiAgICBBUEkuZ2V0QWxsQ2F0ZWdvcnkoYHVzZXJzLz91c2VybmFtZT0ke3VzZXIudXNlcm5hbWV9YCkudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBBUEkuc2F2ZUl0ZW0oXCJ1c2Vyc1wiLCB1c2VyKS50aGVuKG5ld1VzZXIgPT4ge1xuICAgICAgICAgIGxldCBjdXJyZW50VXNlciA9IG5ldyBjb21wLnVzZXIobmV3VXNlcik7XG4gICAgICAgICAgLy9UT0RPOnRoZSBmdW5jdGlvbiBiZWxvdyBuZWVkcyB0byBiZSB0aGUgY2FsbCB0byBsb2FkIG1pc3Npb24gY29udHJvbCBwYWdlLlxuICAgICAgICAgIC8vIFJpZ2h0IG5vdyBpdCBpcyBqdXN0IHNlbmRpbmcgdG8gYSBmdW5jdGlvbiB0byBjb25zb2xlLmxvZyB1c2VyXG4gICAgICAgICAgdGhpcy5sb2FkTWlzc2lvbihjdXJyZW50VXNlcik7XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFsZXJ0KGBVc2VybmFtZSwgJHtkYXRhWzBdLnVzZXJuYW1lfSwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLiBQbGVhc2UgY2hvb3NlIGFub3RoZXIuYClcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8vVE9ETzogdGhpcyBmdW5jdGlvbiBjYW4gZ28gYXdheSB3aGVuIHRoZSBmdW5jdGlvbiB0byBsb2FkIG1pc3Npb24gcGFnZSBpcyByZXBsYWNlZCBpbiBjaGVja1JlZ2lzdGVyIGZ1bmN0aW9uIGFib3ZlXG4gIGxvYWRNaXNzaW9uKHVzZXIpIHtcbiAgICBjb25zb2xlLmxvZyhcIkxvYWQgTWlzc2lvbjogXCIsIHVzZXIpXG4gIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXJGdW5jcyJdfQ==
