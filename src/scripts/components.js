// Author(s): Kelly Morin, Jase Hackman, Brendan McCray, Brad Davis
// Purpose: Incorporates nss-domcomponent library and User class for use by other components

import DOMComponent from "../lib/node_modules/nss-domcomponent";



export default Object.create(null, {

  // creates user class
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
    }
  },

  // creates div using nss-domcomponent
  div: {
    value: class div extends DOMComponent {
      constructor(attributes, ...children) {
        super("div", attributes, ...children)
      }
    }
  },

  // creates button using nss-domcomponent
  btn: {
    value: class btn extends DOMComponent {
      constructor(...children) {
        super("button", { className: "btn", type: "button" }, ...children)
      }
    }
  },

  // creates input using nss-domcomponent
  input: {
    value: class input extends DOMComponent {
      constructor(attributes, ...children) {
        super("input", attributes, ...children)
      }
    }
  },

  // creates section using nss-domcomponent
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

  // creates anchor element using nss-domcomponent
  anchor: {
    value: class anchor extends DOMComponent {
      constructor(attributes, ...children) {
        super("a", attributes, ...children)
      }
    }
  },

  // creates checkbox using nss-domcomponent
  checkbox: {
    value: class checkbox extends DOMComponent {
      constructor(...children) {
        super("input", { type: "checkbox", className: "cb" }, ...children)
      }
    }
  },

  // creates image using nss-domcomponent
  image: {
    value: class image extends DOMComponent {
      constructor(attributes, ...children) {
        super("img", attributes, ...children)
      }
    }
  },

  // creates ul using nss-domcomponent
  ul: {
    value: class ul extends DOMComponent {
      constructor(attributes, ...children) {
        super("ul", attributes, ...children)
      }
    }
  },

  // creates li using nss-domcomponent
  li: {
    value: class li extends DOMComponent {
      constructor(attributes, ...children) {
        super("li", attributes, ...children)
      }
    }
  },

  // creates form using nss-domcomponent
  form: {
    value: class form extends DOMComponent {
      constructor(...children) {
        super("form", {}, ...children)
      }
    }
  },

  // creates label using nss-domcomponent
  label: {
    value: class label extends DOMComponent {
      constructor(attributes, ...children) {
        super("label", attributes, ...children)
      }
    }
  },

  // creates textArea using nss-domcomponent
  textarea: {
    value: class textarea extends DOMComponent {
      constructor(attributes, ...children) {
        super("textarea", attributes, ...children)
      }
    }
  },

  // creates p using nss-domcomponent
  par: {
    value: class par extends DOMComponent {
      constructor(attributes, ...children) {
        super("p", attributes, ...children)
      }
    }
  },

  // creates span using nss-domcomponent
  span: {
    value: class span extends DOMComponent {
      constructor(attributes, ...children) {
        super("span", attributes, ...children)
      }
    }
  }
})


