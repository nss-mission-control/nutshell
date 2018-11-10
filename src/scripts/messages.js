import comp from "./components"
import API from "./apiData"


const buildMessages = {
  printMessages (messageObj) {
    new comp.section ({className: "message", id: `${messageObj.id}`},
    new comp.image({src: `${messageObj.user.profilePic}`, alt: "Profile Pic", style:"display:inline-block; border-radius: 8px; margin: 4px", height: "25", width: "25"}),
    new comp.title( "h2", {style:"display: inline-block; position: relative; bottom: 10px"}, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`),
    new comp.title("h1", {}, messageObj.messageContent)).render(".container--inner")
  },

  messageMap ()  {
    document.querySelector(".container--inner").innerHTML = ""
    API.getAllCategory("messages/?_expand=user")
    .then(messageObj => messageObj.forEach(message => {
      console.log(message);
      this.printMessages(message)}))
      .then(() => this.newMessage())

  },

  newMessage () {
    new comp.section ({className: "new--message"},
    new comp.title ("h1", {}, "New Message"),
    new comp.input ({placeholder: "type your message here", type: "textarea"}),
    new comp.btn ("Submit")).render(".container--inner")
  }

};


export default buildMessages
