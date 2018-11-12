import DOMComponent from "../lib/node_modules/nss-domcomponent"

export default Object.create(null, {

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
    }
    //TODO: this is just a test function. we would have the ability to call for saving
    // messages,articles, events be referencing a function defined here
      test() {
        return `Welcome ${this.firstName}! Let's see what's going on.`;
      }
    }
  },

  div: {
    value: class div extends DOMComponent {
      constructor(attributes, ...children) {
        super("div", attributes, ...children)
      }
    }
  },
  btn: {
    value: class btn extends DOMComponent {
      constructor(...children) {
        super("button", { className: "btn", type: "button" }, ...children)
      }
    }
  },
  input: {
    value: class input extends DOMComponent {
      constructor(attributes, ...children) {
        super("input", attributes, ...children)
      }
    }
  },
  section: {
    value: class section extends DOMComponent {
      constructor(attributes, ...children) {
        super("section", attributes, ...children)
      }
    }
  },
  title: { //define any type of h#.. h1, h2, etc.
    value: class title extends DOMComponent {
      constructor(h_type, attributes, ...children) {
        super(h_type, attributes, ...children)
      }
    }
  },
  anchor: {
    value: class anchor extends DOMComponent {
      constructor(attributes, ...children) {
        super("a", attributes, ...children)
      }
    }
  },
  checkbox: {
    value: class checkbox extends DOMComponent {
      constructor(...children) {
        super("input", { type: "checkbox", className: "cb" }, ...children)
      }
    }
  },
  image: {
    value: class image extends DOMComponent {
      constructor(attributes, ...children) {
        super("img", attributes, ...children)
      }
    }
  },
  ul: {
    value: class ul extends DOMComponent {
      constructor(attributes, ...children) {
        super("ul", attributes, ...children)
      }
    }
  },
  li: {
    value: class li extends DOMComponent {
      constructor(attributes, ...children) {
        super("li", attributes, ...children)
      }
    }
  },
  form: {
    value: class form extends DOMComponent {
      constructor(...children) {
        super("form", {}, ...children)
      }
    }
  },
  label: {
    value: class label extends DOMComponent {
      constructor(attributes, ...children) {
        super("label", attributes, ...children)
      }
    }
  },
  textarea: {
    value: class textarea extends DOMComponent {
      constructor(attributes, ...children) {
        super("textarea", attributes, ...children)
      }
    }
  },
  par: {
    value: class par extends DOMComponent {
      constructor(attributes, ...children) {
        super("p", attributes, ...children)
      }
    }
  },
  span: {
    value: class span extends DOMComponent {
      constructor(attributes, ...children) {
        super("span", attributes, ...children)
      }
    }
  }
})