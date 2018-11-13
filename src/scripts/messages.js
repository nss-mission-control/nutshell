import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"
import friend from "./friends";
import formatDate from "./format"


const buildMessages = {
  printMessages(messageObj) {
    friend.addFriendMessage();
    if (activeUser.info().id === messageObj.user.id) {
      new comp.section({
          className: "message",
          id: `${messageObj.id}`
        },
        new comp.image({src: `${messageObj.user.profilePic}`, className: "messagePic", alt: "Profile Pic"}),
        new comp.title("h2", {className: "messageAuthor"}, `${messageObj.user.firstName} - ${formatDate.correctDateAndTime(messageObj.timeStamp)}`),
        new comp.title("h1", {}, messageObj.messageContent),
        new comp.btn("Edit")).render(".old--messages")
    } else {
      new comp.section({
          className: "message",
          id: `${messageObj.id}`
        },
        new comp.image({src: `${messageObj.user.profilePic}`, alt: "Profile Pic", className: "messagePic"}),
        new comp.title("h2", {className:"messageAuthor"}, `${messageObj.user.firstName} - ${formatDate.correctDateAndTime(messageObj.timeStamp)}`),
        new comp.title("h1", {}, messageObj.messageContent)).render(".old--messages")
    }
  },

  messageMap() {
    document.querySelector(".container--inner").innerHTML = "";
    new comp.title("h1", {id: "messageName"}, "Messages").render(".container--inner");
    new comp.div({className: "old--messages"}).render(".container--inner");
    API.getAllCategory("messages/?_expand=user")
      .then(messageObj => {

        messageObj.forEach(message => {
          this.printMessages(message)
        })
        this.newMessage();
        this.submitMessage();
        this.editButtonClick();
        this.addFriend();
      }).then(() => this.scrollWindowButtom());
  },

  // sets scroll window to bottom of old--messages container
  scrollWindowButtom() {
    let messageWindow = document.querySelector(".old--messages");
    messageWindow.scrollTop = messageWindow.scrollHeight;
  },


  // builds new message entry field
  newMessage() {
    //wrapped this in a div instead of a section, to grab sections easier.
    new comp.div({
        className: "new--message",
        id: "newMessage"
      },
      new comp.title("h1", {}, "New Message"),
      new comp.textarea({
        placeholder: "type your message here",
        wrap: "hard"
      }),
      new comp.btn("Submit")).render(".container--inner")
  },


  submitMessage() {
    $("#newMessage > button").click(function (e) {
      //if statment to prevent blank entries
      if ($("#newMessage > textarea").val() === "") {
        alert("Please enter your message")
      } else {
        e.preventDefault()

        //builds object to pass into fetch
        let submitMessageObj = {
          messageContent: $("#newMessage > textarea").val(),
          timeStamp: new Date(),
          // dateArray[4], //TODO: make it non military time
          // date: `${month}/${dateArray[2]}/${dateArray[3]}`,
          userId: activeUser.info().id

        }
        // send to API
        API.saveItem("messages", submitMessageObj)
          .then(() => buildMessages.messageMap())
      }
    })
  },

  editButtonClick() {
    // grabs the edit buttons
    $("section > button").click(function (e) {
      // stores the message in a varable
      let messageH1 = e.target.previousSibling
      // store message's text in a varable
      let messageText = messageH1.innerHTML;
      // replaces Edit button with Save button
      $(e.target).replaceWith("<button class= 'btn' type ='button'>Save</button>")
      // replaces message text with an input field
      $(messageH1).replaceWith(`<input type="text" id = "editField" value="${messageText}">`)
      // stores the new input field in a varable
      const newInputField = $("#editField");
      // sets a click event on the new save button
      newInputField.next().click(function (e) {
        // stores input value in an object upon save click
        const editedMessageTextObj = {
          messageContent: newInputField.val(),
        }
        // save message id #
        const editedMessageId = newInputField.parent().attr("id")
        // Patch message in server and refresh the messages on the page
        API.updateItem("messages", editedMessageId, editedMessageTextObj)
          .then(() => buildMessages.messageMap())
      })
    })
  },

  confirmFriend(userObj, friendObj){
    document.querySelector(".old--messages").innerHTML="",
    new comp.div({},
      new comp.image({src: userObj.user.profilePic}),
      new comp.title("h2", {}, `${userObj.user.firstName} ${userObj.user.lastName}`),
      new comp.par({}, "Are you sure you want to add this person as a friend "),
      new comp.btn({className: "confirmButton", onclick: this.postFriendship(friendObj)}, "Yes"),
      new comp.btn({className: "confirmButton"}, "No")
      ).render(".old--messages")
  },

  // checkFriendships(friendObj){
  //   API.getAllCategory("friends")
  //   .then(info => console.log(info))
  //     .then(data => {
  //       if(data.request_userId === friendObj.request_userId && data.userId === friendObj.userId){
  //         console.log("You are already friends with this person")
  //         return
  //       } else{
  //         this.postFriendship(friendObj)
  //       }
  //     })
  // },

  addFriend(){
    document.querySelectorAll(".messageAuthor").forEach(message =>{
      let friendObj = " ";
      let returnObj = ""
      // console.log(message.parentNode.childNodes[3])
      if(message.parentNode.childNodes[3]){
        // console.log("You cant add yourself as a friend")
        // If there is a button, the event listener does not attach
        return
      } else{
        message.addEventListener("click", ()=>{

          let messageId = event.target.parentNode.id
          API.getAllCategory(`messages/${messageId}/?_expand=user`)
          .then(data=> {
            returnObj = data
            friendObj = {
              request_userId: activeUser.info().id,
              userId: data.user.id
            }
            return(returnObj, friendObj)
            // this.confirmFriend(data, friendObj)
            })
            console.log("outside the 1st fetch")

            API.getAllCategory("friends")
            .then((info)=>{
              console.log("inside the 2nd fetch")
              console.log(info)
              if((info.userId === friendObj.userId)){
                alert("This person has friends")
              }
              // } else if((info.request_userId !== friendObj.request_userId) && (info.userId !== friendObj.userId)){
              //   this.confirmFriend(returnObj, friendObj)
                // this.postFriendship(friendObj)
              }
            })
          } )
        }
      })
    },

  postFriendship(friendObj){
    API.saveItem(`friends`,friendObj)

  }
}

export default buildMessages