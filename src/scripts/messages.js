import comp from "./components"
import API from "./apiData"

const currentUser = 3;

const buildMessages = {
  printMessages (messageObj) {
    if(currentUser === messageObj.user.id){
      const message = new comp.section ({className: "message", id: `${messageObj.id}`},
      new comp.title( "h2", {}, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`),
      new comp.title("h1", {}, messageObj.messageContent),
      new comp.btn("Edit")).render(".container--inner")
    } else {
      const message = new comp.section ({className: "message", id: `${messageObj.id}`},
      new comp.title( "h2", {}, `${messageObj.user.firstName} - ${messageObj.date} ${messageObj.timeStamp}`),
      new comp.title("h1", {}, messageObj.messageContent)).render(".container--inner")
    }
  },

  messageMap ()  {
    document.querySelector(".container--inner").innerHTML = ""
    API.getAllCategory("messages/?_expand=user")
    .then(messageObj => {

      messageObj.forEach(message => {
      this.printMessages(message)})
      this.newMessage();
      this.submitMessage();
      this.editButtonClick();

    })
  },

  newMessage () {
    const newMessageField = new comp.div ({className: "new--message", id: "newMessage"},
    new comp.title ("h1", {}, "New Message"),
    new comp.textarea ({placeholder: "type your message here", wrap: "hard"}),
    new comp.btn ("Submit")).render(".container--inner")
  },

  submitMessage() {
    $("#newMessage > button").click(function (e) {
        e.preventDefault()
       //creates object of current moment
      let dateAndTime = new Date();
      //converts it into a string and then an array to grab specific values
      let dateArray = dateAndTime.toString().split(" ");
      //getMonth() method returns a number between 0-11. Added 1 to get current month
      let month = dateAndTime.getMonth()+1;
      //builds object to pass into fetch
      let submitMessageObj = {
        messageContent: $("#newMessage > textarea").val(),
        timeStamp: dateArray[4],
        date: `${month}/${dateArray[2]}/${dateArray[3]}`,
        userId: currentUser
      }
      API.saveItem("messages", submitMessageObj)
        .then(() => buildMessages.messageMap())
    })
  },

  editButtonClick () {
    console.log($("section > button").not("#newMessage"));
    console.log("change")
  }

}


export default buildMessages
