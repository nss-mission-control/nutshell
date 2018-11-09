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
    });
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

var _news = _interopRequireDefault(require("./news"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// landingPageFuncs.loadLandingPage();
// buildMessages.messageMap();
_news.default.newsMap();

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
    })).then(() => this.newMessage());
  },

  newMessage() {
    const newMessage = new _components.default.section({
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

},{"./components":3,"./login":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnNzLWRvbWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NjcmlwdHMvYXBpRGF0YS5qcyIsIi4uL3NjcmlwdHMvY29tcG9uZW50cy5qcyIsIi4uL3NjcmlwdHMvbGFuZGluZy5qcyIsIi4uL3NjcmlwdHMvbG9naW4uanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL21lc3NhZ2VzLmpzIiwiLi4vc2NyaXB0cy9uZXdzLmpzIiwiLi4vc2NyaXB0cy9yZWdpc3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLE1BQU0sYUFBYSxHQUFHLE1BQU0sRUFBNUI7O0FBRUEsTUFBTSxZQUFOLENBQW1CO0FBQ2YsRUFBQSxXQUFXLENBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsR0FBRyxRQUF0QixFQUFnQztBQUN2QyxTQUFLLGFBQUwsSUFBc0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBdEI7QUFFQTs7Ozs7QUFJQSxRQUFJLE9BQU8sVUFBUCxLQUFzQixRQUExQixFQUFvQztBQUNoQyxXQUFLLGFBQUwsRUFBb0IsV0FBcEIsR0FBa0MsVUFBbEM7QUFDQSxhQUFPLElBQVA7QUFDSCxLQUhELE1BR08sSUFBSSxPQUFPLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDdkMsV0FBSyxhQUFMLElBQXNCLE1BQU0sQ0FBQyxNQUFQLENBQWMsS0FBSyxhQUFMLENBQWQsRUFBbUMsVUFBbkMsQ0FBdEI7QUFDSDs7QUFFRCxRQUFJLFFBQVEsQ0FBQyxNQUFiLEVBQXFCO0FBQ2pCLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsS0FBSyxJQUFJO0FBQ3RCO0FBQ0EsWUFBSSxLQUFLLENBQUMsT0FBTixZQUF5QixNQUFNLENBQUMsT0FBcEMsRUFBNkM7QUFDekMsZUFBSyxhQUFMLEVBQW9CLFdBQXBCLENBQWdDLEtBQUssQ0FB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ZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGVsZW1lbnRTeW1ib2wgPSBTeW1ib2woKVxuXG5jbGFzcyBET01Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXNbZWxlbWVudFN5bWJvbF0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIElmIGBhdHRyaWJ1dGVzYCBpcyBqdXN0IGEgc3RyaW5nLCBpdCdzIGEgc2ltcGxlIGVsZW1lbnQgd2l0aCBub1xuICAgICAgICAgICAgcHJvcGVydGllcyAtIGp1c3Qgc29tZSB0ZXh0IGNvbnRlbnRcbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLnRleHRDb250ZW50ID0gYXR0cmlidXRlc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXR0cmlidXRlcyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXSA9IE9iamVjdC5hc3NpZ24odGhpc1tlbGVtZW50U3ltYm9sXSwgYXR0cmlidXRlcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIE9uZSBIVE1MRWxlbWVudCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmVsZW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGNoaWxkLmVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQW4gYXJyYXkgb2YgZWxlbWVudHMgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaGlsZC5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5lbGVtZW50LmZvckVhY2goYyA9PiB0aGlzW2VsZW1lbnRTeW1ib2xdLmFwcGVuZENoaWxkKGMpKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZyB2YWx1ZSB3YXMgcGFzc2VkIGluLCBzZXQgdGV4dCBjb250ZW50XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tlbGVtZW50U3ltYm9sXS50ZXh0Q29udGVudCA9IGNoaWxkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZ2V0IGVsZW1lbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tlbGVtZW50U3ltYm9sXVxuICAgIH1cblxuICAgIHJlbmRlcihjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGhpc1tlbGVtZW50U3ltYm9sXSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpLmFwcGVuZENoaWxkKGZyYWdtZW50KVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBET01Db21wb25lbnRcbiIsImNvbnN0IFVSTCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L1wiXG5cbmNvbnN0IEFQSSA9IHtcbiAgZ2V0QWxsQ2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9YClcbiAgICAgIC50aGVuKGVudHJpZXMgPT4gZW50cmllcy5qc29uKCkpXG4gIH0sXG5cbiAgZ2V0T25lRnJvbUNhdGVnb3J5KGNhdGVnb3J5LCBpZCkge1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX0/aWQ9JHtpZH1gKVxuICAgICAgLnRoZW4oaW5wdXRzID0+IGlucHV0cy5qc29uKCkpXG4gIH0sXG5cbiAgc2F2ZUl0ZW0oY2F0ZWdvcnksIGl0ZW0pe1xuICAgIHJldHVybiBmZXRjaChgJHtVUkx9JHtjYXRlZ29yeX1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgfVxuICAgIClcbiAgfSxcblxuICBkZWxldGVJdGVtKGNhdGVnb3J5LCBpZCl7XG4gICAgcmV0dXJuIGZldGNoKGAke1VSTH0ke2NhdGVnb3J5fT9pZD0ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9XG4gICAgKVxuICB9LFxuXG4gIHVwZGF0ZUl0ZW0oY2F0ZWdvcnksIGlkKXtcbiAgICByZXR1cm4gZmV0Y2goYCR7VVJMfSR7Y2F0ZWdvcnl9P2lkPSR7aWR9YCwge1xuICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfVxuICAgIClcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiaW1wb3J0IERPTUNvbXBvbmVudCBmcm9tIFwiLi4vbGliL25vZGVfbW9kdWxlcy9uc3MtZG9tY29tcG9uZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5jcmVhdGUobnVsbCwge1xyXG4gIGRpdjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGRpdiBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkaXZcIiwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGJ0bjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIGJ0biBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYnV0dG9uXCIsIHtjbGFzc05hbWU6IFwiYnRuXCIsIHR5cGU6IFwiYnV0dG9uXCJ9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW5wdXQ6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBpbnB1dCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbnB1dFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VjdGlvbjoge1xyXG4gICAgdmFsdWU6IGNsYXNzIHNlY3Rpb24gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwic2VjdGlvblwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGl0bGU6IHsgLy9kZWZpbmUgYW55IHR5cGUgb2YgaCMuLiBoMSwgaDIsIGV0Yy5cclxuICAgIHZhbHVlOiBjbGFzcyB0aXRsZSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGhfdHlwZSwgYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihoX3R5cGUsIGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBhbmNob3I6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBhbmNob3IgZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvcihhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiYVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2hlY2tib3g6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBjaGVja2JveCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJpbnB1dFwiLCB7dHlwZTogXCJjaGVja2JveFwiLCBjbGFzc05hbWU6IFwiY2JcIn0sIC4uLmNoaWxkcmVuKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbWFnZToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGltYWdlIGV4dGVuZHMgRE9NQ29tcG9uZW50IHtcclxuICAgICAgY29uc3RydWN0b3IoYXR0cmlidXRlcywgLi4uY2hpbGRyZW4pIHtcclxuICAgICAgICBzdXBlcihcImltZ1wiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyB1bCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ1bFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGk6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsaSBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsaVwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgdmFsdWU6IGNsYXNzIGZvcm0gZXh0ZW5kcyBET01Db21wb25lbnQge1xyXG4gICAgICBjb25zdHJ1Y3RvciguLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHN1cGVyKFwiZm9ybVwiLHt9LCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGFiZWw6IHtcclxuICAgIHZhbHVlOiBjbGFzcyBsYWJlbCBleHRlbmRzIERPTUNvbXBvbmVudCB7XHJcbiAgICAgIGNvbnN0cnVjdG9yKGF0dHJpYnV0ZXMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgc3VwZXIoXCJsYWJlbFwiLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSkiLCJpbXBvcnQgY29tcCBmcm9tIFwiLi9jb21wb25lbnRzXCJcclxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIlxyXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXHJcblxyXG5jb25zdCBsYW5kaW5nUGFnZUZ1bmNzID0ge1xyXG4gIGxvYWRMYW5kaW5nUGFnZSgpIHtcclxuICAgIGxldCBkaXYyID0gbmV3IGNvbXAuZGl2KFxyXG4gICAgICB7IGNsYXNzTGlzdDogXCJ3ZWxjb21lXCIgfSxcclxuICAgICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJ0aXRsZVwiIH0sIFwiV2VsY29tZSB0byBNaXNzaW9uIENvbnRyb2xcIiksXHJcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luXCIpLFxyXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlclwiKSlcclxuICAgIGRpdjIucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICAgIGxldCBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKVxyXG5cclxuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiTG9naW5cIikge1xyXG4gICAgICAgICAgbG9nSW5GdW5jcy5sb2FkTG9nSW4oKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWdpc3RlckZ1bmNzLmxvYWRSZWdpc3RlcigpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsYW5kaW5nUGFnZUZ1bmNzIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgcmVnaXN0ZXJGdW5jcyBmcm9tIFwiLi9yZWdpc3RlclwiXG5cbmNvbnN0IGxvZ0luRnVuY3MgPSB7XG4gIGxvYWRMb2dJbigpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyLS1pbm5lclwiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgbGV0IGxvZ0luID0gbmV3IGNvbXAuZm9ybShcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJwYXNzd29yZFwifSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIkxvZ2luIE5vd1wiKSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIk5vdCBhIHVzZXI/IENyZWF0ZSBuZXcgYWNjb3VudC5cIilcbiAgICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkxvZ2luIE5vd1wiKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbiBub3dcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVnaXN0ZXJGdW5jcy5sb2FkUmVnaXN0ZXIoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbG9nSW5GdW5jcyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQgbGFuZGluZ1BhZ2VGdW5jcyBmcm9tIFwiLi9sYW5kaW5nXCJcclxuaW1wb3J0IGJ1aWxkTWVzc2FnZXMgZnJvbSBcIi4vbWVzc2FnZXNcIlxyXG5pbXBvcnQgYnVpbGROZXdzIGZyb20gXCIuL25ld3NcIlxyXG5cclxuLy8gbGFuZGluZ1BhZ2VGdW5jcy5sb2FkTGFuZGluZ1BhZ2UoKTtcclxuLy8gYnVpbGRNZXNzYWdlcy5tZXNzYWdlTWFwKCk7XHJcbmJ1aWxkTmV3cy5uZXdzTWFwKClcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vYXBpRGF0YVwiXHJcblxyXG5cclxuY29uc3QgYnVpbGRNZXNzYWdlcyA9IHtcclxuICBwcmludE1lc3NhZ2VzIChtZXNzYWdlT2JqKSB7XHJcblxyXG4gICAgY29uc3QgbWVzc2FnZSA9IG5ldyBjb21wLnNlY3Rpb24gKHtjbGFzc05hbWU6IFwibWVzc2FnZVwiLCBpZDogYCR7bWVzc2FnZU9iai5pZH1gfSxcclxuICAgIG5ldyBjb21wLnRpdGxlKCBcImgyXCIsIHt9LCBgJHttZXNzYWdlT2JqLnVzZXIuZmlyc3ROYW1lfSAtICR7bWVzc2FnZU9iai5kYXRlfSAke21lc3NhZ2VPYmoudGltZVN0YW1wfWApLFxyXG4gICAgbmV3IGNvbXAudGl0bGUoXCJoMVwiLCB7fSwgbWVzc2FnZU9iai5tZXNzYWdlQ29udGVudCkpLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXHJcbiAgfSxcclxuXHJcbiAgbWVzc2FnZU1hcCAoKSAge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcIm1lc3NhZ2VzLz9fZXhwYW5kPXVzZXJcIilcclxuICAgIC50aGVuKG1lc3NhZ2VPYmogPT4gbWVzc2FnZU9iai5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgICAgdGhpcy5wcmludE1lc3NhZ2VzKG1lc3NhZ2UpfSkpXHJcbiAgICAgIC50aGVuKCgpID0+IHRoaXMubmV3TWVzc2FnZSgpKVxyXG5cclxuICB9LFxyXG5cclxuICBuZXdNZXNzYWdlICgpIHtcclxuICAgIGNvbnN0IG5ld01lc3NhZ2UgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tbWVzc2FnZVwifSxcclxuICAgIG5ldyBjb21wLnRpdGxlIChcImgxXCIsIHt9LCBcIk5ldyBNZXNzYWdlXCIpLFxyXG4gICAgbmV3IGNvbXAuaW5wdXQgKHtwbGFjZWhvbGRlcjogXCJ0eXBlIHlvdXIgbWVzc2FnZSBoZXJlXCIsIHR5cGU6IFwidGV4dGFyZWFcIn0pLFxyXG4gICAgbmV3IGNvbXAuYnRuIChcIlN1Ym1pdFwiKSkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcclxuICB9XHJcblxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTWVzc2FnZXNcclxuIiwiaW1wb3J0IGNvbXAgZnJvbSBcIi4vY29tcG9uZW50c1wiXG5pbXBvcnQgQVBJIGZyb20gXCIuL2FwaURhdGFcIlxuXG5cbmNvbnN0IGJ1aWxkTmV3cyA9IHtcbiAgcHJpbnROZXdzKG5ld3NPYmopIHtcblxuICAgIGNvbnN0IG5ld3MgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ld3NcIiwgaWQ6IGAke25ld3NPYmouaWR9YH0sXG4gICAgbmV3IGNvbXAuYW5jaG9yKHtocmVmOiBgJHtuZXdzT2JqLnVybH1gLCB0YXJnZXQ6IFwiX2JsYW5rXCJ9LCAgbmV3IGNvbXAuaW1hZ2Uoe3NyYzogYCR7bmV3c09iai5hcnRpY2xlSW1hZ2V9YCwgYWx0OiBcIkFydGljbGUgSW1hZ2VcIiwgaGVpZ2h0OiBcIjEyMFwiLCB3aWR0aDogXCIxMjBcIn0pKSxcbiAgICBuZXcgY29tcC50aXRsZSggXCJoMlwiLCB7fSwgYCR7bmV3c09iai5hcnRpY2xlTmFtZX1gKSxcbiAgICBuZXcgY29tcC50aXRsZShcImg0XCIsIHt9LCBgU2F2ZWQgYnk6ICR7bmV3c09iai51c2VyLmZpcnN0TmFtZX0gfCBEYXRlIFNhdmVkOiAke25ld3NPYmouZGF0ZVNhdmVkfWApLFxuICAgIG5ldyBjb21wLnRpdGxlKFwiaDFcIiwge30sIG5ld3NPYmouYWJvdXQpKS5yZW5kZXIoXCIuY29udGFpbmVyLS1pbm5lclwiKVxuICB9LFxuXG4gIG5ld3NNYXAgKCkgIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lci0taW5uZXJcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIEFQSS5nZXRBbGxDYXRlZ29yeShcImFydGljbGVzLz9fZXhwYW5kPXVzZXImX3NvcnQ9ZGF0ZVNhdmVkJl9vcmRlcj1kZXNjXCIpXG4gICAgLnRoZW4obmV3c09iaiA9PiBuZXdzT2JqLmZvckVhY2gobmV3cyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhuZXdzKTtcbiAgICAgIHRoaXMucHJpbnROZXdzKG5ld3MpfSkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLm5ld05ld3MoKSlcblxuICB9LFxuXG4gIG5ld05ld3MgKCkge1xuICAgIGNvbnN0IG5ld05ld3MgPSBuZXcgY29tcC5zZWN0aW9uICh7Y2xhc3NOYW1lOiBcIm5ldy0tbmV3c1wifSxcbiAgICBuZXcgY29tcC50aXRsZSAoXCJoMVwiLCB7fSwgXCJTYXZlIE5ld3MgQXJ0aWNsZVwiKSxcbiAgICBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJhcnRpY2xlTmFtZVwifSwgXCJBcnRpY2xlIE5hbWVcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJBcnRpY2xlIE5hbWVcIiwgaWQ6IFwiYXJ0aWNsZU5hbWVcIiB9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiYXJ0aWNsZVVybFwifSwgXCJBcnRpY2xlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlVXJsXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgTGlua1wiLCBpZDogXCJhcnRpY2xlTGlua1wifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVJbWFnZVVybFwifSwgXCJBcnRpY2xlIEltYWdlIExpbmtcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJhcnRpY2xlSW1hZ2VVcmxcIiwgcGxhY2Vob2xkZXI6IFwiQXJ0aWNsZSBJbWFnZSBMaW5rXCIsIGlkOiBcImFydGljbGVJbWFnZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7Zm9yOiBcImFydGljbGVEZXNjcmlwdGlvblwifSwgXCJBcnRpY2xlIERlc2NyaXB0aW9uXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCIsIHBsYWNlaG9sZGVyOiBcIkFydGljbGUgRGVzY3JpcHRpb25cIiwgaWQ6IFwiYXJ0aWNsZURlc2NyaXB0aW9uXCJ9KSxcbiAgICAgIG5ldyBjb21wLmJ0bihcIlNhdmUgTmV3IEFydGljbGVcIilcbiAgICApLFxuICAgICkucmVuZGVyKFwiLmNvbnRhaW5lci0taW5uZXJcIilcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICBsZXQgc3RvcnkgPSB7XG4gICAgICAgIGFydGljbGVOYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVOYW1lXCIpLnZhbHVlLFxuICAgICAgICB1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXJ0aWNsZUxpbmtcIikudmFsdWUsXG4gICAgICAgIGFydGljbGVJbWFnZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcnRpY2xlSW1hZ2VcIikudmFsdWUsXG4gICAgICAgIGFib3V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FydGljbGVEZXNjcmlwdGlvblwiKS52YWx1ZSxcbiAgICAgICAgLypcbiAgICAgICAgTkVFRCBUTyBVUERBVEUgVVNFUiBJRCBUTyBTQVZFIFNFU1NJT04gQVNTSUdORUQgSURcbiAgICAgICAgKi9cbiAgICAgICAgdXNlcklkOiAyLFxuICAgICAgICBkYXRlU2F2ZWQ6IG5ldyBEYXRlKClcbiAgICAgIH1cbiAgICAgIGJ1aWxkTmV3cy5hZGROZXdzKHN0b3J5KVxuICAgIH0pXG4gIH0sXG5cbiAgYWRkTmV3cyhzdG9yeSl7XG4gICAgQVBJLnNhdmVJdGVtKFwiYXJ0aWNsZXNcIiwgc3RvcnkpLnRoZW4oKCk9PiB0aGlzLm5ld3NNYXAoKSlcbiAgfVxuXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGJ1aWxkTmV3cyIsImltcG9ydCBjb21wIGZyb20gXCIuL2NvbXBvbmVudHNcIlxuaW1wb3J0IGxvZ0luRnVuY3MgZnJvbSBcIi4vbG9naW5cIjtcblxuY29uc3QgcmVnaXN0ZXJGdW5jcyA9IHtcbiAgbG9hZFJlZ2lzdGVyKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXItLWlubmVyXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICBsZXQgcmVnaXN0ZXIgPSBuZXcgY29tcC5mb3JtKFxuICAgICAgbmV3IGNvbXAubGFiZWwoe30sIFwiRmlyc3QgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImZpcnN0TmFtZVwiLCBwbGFjZWhvbGRlcjogXCJGaXJzdCBOYW1lXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIkxhc3QgTmFtZVwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcImxhc3ROYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkxhc3QgTmFtZVwifSksXG4gICAgICBuZXcgY29tcC5sYWJlbCh7fSwgXCJFbWFpbFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHsgdHlwZTogXCJlbWFpbFwiLCBuYW1lOiBcImVtYWlsXCIsIHBsYWNlaG9sZGVyOiBcImVtYWlsXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHt9LCBcIlVzZXJuYW1lXCIpLFxuICAgICAgbmV3IGNvbXAuaW5wdXQoe25hbWU6IFwidXNlcm5hbWVcIiwgcGxhY2Vob2xkZXI6IFwidXNlcm5hbWVcIn0pLFxuICAgICAgbmV3IGNvbXAubGFiZWwoe2ZvcjogXCJwYXNzd29yZFwifSwgXCJQYXNzd29yZFwiKSxcbiAgICAgIG5ldyBjb21wLmlucHV0KHtuYW1lOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlBhc3N3b3JkXCJ9KSxcbiAgICAgIG5ldyBjb21wLmxhYmVsKHtmb3I6IFwiY29uZmlybVBhc3N3b3JkXCJ9LCBcIkNvbmZpcm0gUGFzc3dvcmRcIiksXG4gICAgICBuZXcgY29tcC5pbnB1dCh7bmFtZTogXCJjb25maXJtUGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBQYXNzd29yZFwifSksXG4gICAgICBuZXcgY29tcC5idG4oXCJSZWdpc3RlciBBY2NvdW50XCIpLFxuICAgICAgbmV3IGNvbXAuYnRuKFwiQWxyZWFkeSBhIHVzZXI/IExvZyBpbiBub3dcIilcbiAgICApLnJlbmRlcihcIi5jb250YWluZXItLWlubmVyXCIpXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiUmVnaXN0ZXIgQWNjb3VudFwiKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWdpc3RlcmluZyBuZXcgYWNjb3VudFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dJbkZ1bmNzLmxvYWRMb2dJbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICB9XG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckZ1bmNzIl19
