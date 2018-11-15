// Author(s): Kelly Morin, Brendan McCray, Brad Davis
// Purpose: Allows creation, viewing, editing, and deletion of messages

import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"
import formatDate from "./format"


const buildMessages = {
  // prints message with edit button if current user is the message author
  printMessages(messageObj) {
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
      // prints messages not created by current user
      new comp.section({
          className: "message",
          id: `${messageObj.id}`
        },
        new comp.div({id: `friendAlert-${messageObj.id}`}),
        new comp.image({src: `${messageObj.user.profilePic}`, alt: "Profile Pic", className: "messagePic"}),
        new comp.title("h2", {className:"messageAuthor addFriend"}, `${messageObj.user.firstName} - ${formatDate.correctDateAndTime(messageObj.timeStamp)}`),
        new comp.title("h1", {}, messageObj.messageContent)).render(".old--messages")
    }
  },

  // adds functionality to add friends by message author
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
        wrap: "hard",
        style: "resize: none"
      }),
      new comp.btn("Submit")).render(".container--inner")
  },

  // adds new message to database and dom
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

  //Builds display to confirm if you'd like to add someone as a friend
  confirmFriend(userObj, friendObj){
    document.querySelector(".old--messages").innerHTML="",
    new comp.div({id: "friendConfirmation"},
      new comp.image({src: userObj.user.profilePic, alt: "Profile Picture", height: "120", width: "120"}),
      new comp.title("h2", {}, `${userObj.user.firstName} ${userObj.user.lastName}`),
      new comp.par({}, "Are you sure you want to add this person as a friend "),
      new comp.btn("Yes"),
      new comp.btn("No")
      ).render(".old--messages")
      //Calls function that adds event listeners to "Yes" and "No" buttons
      this.addEventListener(friendObj)
  },

  addEventListener(friendObj){
    let buttons = document.querySelectorAll("button")
    buttons.forEach(button => {
      //Do not attach event listener if the button is "submit"
      if(button.textContent === "Submit"){
        return
      } else {
        button.addEventListener("click", ()=>{
          //if the user confirms adding a friend, call the function that posts to the API
          if(button.textContent === "Yes"){
            this.postFriendship(friendObj)
          //if the user declines adding a friend, call the function that reloads the messages page
          } else if(button.textContent === "No"){
            this.messageMap()
          }
        })
      }
    })
  },
  addFriend(){
    document.querySelectorAll(".messageAuthor").forEach(message =>{
      let friendObj = " ";
      let returnObj = ""
      if(message.classList[1]){
        message.addEventListener("click", ()=>{

          let messageId = event.target.parentNode.id
          //API call to get the userId of the person you select
          API.getAllCategory(`messages/${messageId}/?_expand=user`)
          .then(data=> {
            returnObj = data
            //Create friend Object that will be posted to the DOM upon confirmation of adding a friend
            friendObj = {
              request_userId: activeUser.info().id,
              userId: data.user.id
            }
            return(returnObj, friendObj)
            })
            .then(()=>{
              //Get all instances of friends from the database where the active user is the "friend requester"
              API.getAllCategory(`friends/?request_userId=${activeUser.info().id}`)
              .then((info)=>{
                let itemStatus = false

                //For each relationship found in the fetch, check and make sure that friendship does not already exist
                info.forEach(item => {
                  if((item.request_userId === friendObj.request_userId) && (item.userId === friendObj.userId)){
                    //If the relationship does exist, display an alert inline with the friend
                    $(`#friendAlert-${messageId}`).empty()
                    new comp.par({className: "alert"}, "You are already friends with this person").render(`#friendAlert-${messageId}`)
                    itemStatus = true
                    return
                  }
                  })
                  //if the match does not exist, create the confirmation page
                  if(itemStatus === false){
                    this.confirmFriend(returnObj, friendObj)
                  }
                  }
                )
              })
      })
    }
  })
},

//Call the API and post the new friend relationship, then re-populate the DOM with messages
  postFriendship(friendObj){
    API.saveItem(`friends`,friendObj)
    this.messageMap()
  }
}

export default buildMessages