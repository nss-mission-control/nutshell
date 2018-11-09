import DOMComponent from "../lib/node_modules/nss-domcomponent"

export default Object.create(null, {
  div: {
    value: class div extends DOMComponent {
      constructor(attributes, ...children) {
        super("div", attributes, ...children)
      }
    }
  },
  btn: {
    value: class btn extends DOMComponent {
      constructor(attributes, ...children) {
        super("button", attributes, ...children)
      }
    }
  },
  inpt: {
    value: class inpt extends DOMComponent {
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
        super("input", {type: "checkbox", className: "cb"}, ...children)
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
  }
})