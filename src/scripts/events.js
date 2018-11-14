import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"
import formatDate from "./format"
import moment from "moment"

window.moment = moment


// http://localhost:8088/events/?_expand=user&userId=1&userId=2
//http://localhost:8088/friends/?request_userId=4

const buildEvents = {

  friendsFinder() {
    API.getAllCategory(`friends/?request_userId=${activeUser.info().id}`)
      .then(friendsArray => {
        let friendsSearchString = ""
        friendsArray.forEach(currentFriend => {
          friendsSearchString += `&userId=${currentFriend.userId}`
        })
        API.getAllCategory(`events/?_expand=user&userId=${activeUser.info().id}${friendsSearchString}&_sort=date,time&_order=asc`)
          .then(friendsEvents => {
            friendsEvents.forEach(singleEvent => {
            this.printEvents(singleEvent)
            })
            buildEvents.nextEvent();
            buildEvents.editBtnListen()
          })
      })

  },

  buildContainers() {
    // builds the two containers to hold everything
    document.querySelector(".container--inner").innerHTML = ""
    // containers
    new comp.title("h1", {
      className: "title--upcoming"
    }, "Upcoming Events").render(".container--inner")
    new comp.div({
      id: "upcoming"
    }).render(".container--inner")
    new comp.title("h1", {
      className: "title--past"
    }, "Past Events").render(".container--inner")
    new comp.div({
      id: "past"
    }).render(".container--inner")
    this.newEvent()
    // this.newEventButton();
    // this.eventFetch()
    buildEvents.friendsFinder()
    },



  printEvents(eventObj) {

    // takes the objects from the api and prints them to the dom
    let outputContainer;
    // Logic to determin if the event is upcoming or in the past
    if (moment(eventObj.date).isBefore(moment().format("YYYY-MM-DD"))){
      outputContainer = "#past"
    } else if (moment(eventObj.date).isSame((moment().format("YYYY-MM-DD")))) {
      if(moment().hour() >= Number(eventObj.time.substr(0,2))){
        if(moment().minute() >= Number(eventObj.time.substr(3,2))) {
        outputContainer = "#past"
      } else {outputContainer = "#upcoming"}
    } else {outputContainer = "#upcoming"}
   }
    else {
      outputContainer = "#upcoming"
    }
    let theTime;
    // for midnight
    if (eventObj.time.substr(0,2) === "00"){
      theTime = (Number(eventObj.time.substr(0,2))) + 12 + `${eventObj.time.substr(2,3)}AM`
      //noon
    } else if (Number(eventObj.time.substr(0,2)) === 12) {
      theTime = `${eventObj.time}PM`
      //after noon
    } else if(Number(eventObj.time.substr(0,2)) > 12) {
      theTime = (Number(eventObj.time.substr(0,2)) - 12) + `${eventObj.time.substr(2,3)}PM`;
      //before noon
    } else {
      theTime = eventObj.time + "AM";
    }

    // builds each event and renders to the DOM
    console.log(
     eventObj.userId, activeUser.info().id
    )
    if (eventObj.userId===activeUser.info().id){
    new comp.section({
        className: "event",
        id: `${eventObj.id}`
      },
      new comp.div ( {},
      new comp.title("h3", `${eventObj.name}`),
      new comp.par(`${formatDate.getCorrectDate(eventObj.date)} ${theTime}`),
      new comp.par(`${eventObj.location}`)),
      new comp.btn("Edit")).render(outputContainer)
    }
    else {
      new comp.section({
        className: "event friendEvent",
        id: `${eventObj.id}`
      },
      new comp.div ( {},
        new comp.image({src: `${eventObj.user.profilePic}`, alt: "Profile Pic", className: "messagePic"}),
        new comp.title("h2", {className:"messageAuthor"}, `${eventObj.user.firstName}`),
        new comp.title("h3", `${eventObj.name}`),
        new comp.par(`${formatDate.getCorrectDate(eventObj.date)} ${theTime}`),
      new comp.par(`${eventObj.location}`))).render(outputContainer)
    }
  },

  newEvent () {
    new comp.div ({className: "new--event",id: "newEventBtnSection"},
    new comp.btn ("Create New Event")).render("#upcoming")
    buildEvents.newEventClickListener();
  },

  newEventClickListener () {
    const button = document.querySelector("#newEventBtnSection > button")
    button.addEventListener("click", (e) => {
      $("#upcoming").text("");
      let upcomingContainer = document.getElementById("upcoming");
      upcomingContainer.style.paddingTop = 0;
      new comp.div({
      classList: "newEventForm"},
        new comp.div({id: "alert"}),
        new comp.label("Event Name"),
        new comp.input({ type: "text"}),
        new comp.label("Date"),
        new comp.input({type: "date"}),
        new comp.label("Time"),
        new comp.input({type: "time"}),
        new comp.label("Location"),
        new comp.input({ type: "text"}),
        new comp.div({},
        new comp.btn("Save"),
        new comp.btn("Back"))).render("#upcoming")
      buildEvents.newEventBtnClicks();

    })
    },


  nextEvent() {
    if (document.getElementById("upcoming").firstChild.nextSibling) {
    document.getElementById("upcoming").firstChild.nextSibling.classList.add("nextEvent");
    }
  },

  // eventFetch() {
  //   API.getAllCategory(`events/?userId=${activeUser.info().id}&_sort=date,time&_order=asc`) //check if user is same as session storage
  //     .then(eventObj => {
  //       buildEvents.newEvent();
  //       eventObj.forEach(event => {
  //         this.printEvents(event)
  //       })
  //       buildEvents.nextEvent();
  //       buildEvents.editBtnListen()
  //     })
  // },

  newEventBtnClicks() {
    // grabs the two buttons on the page and adds a click listener based on index
    const popUpBtns = document.querySelectorAll("button");
    popUpBtns[0].addEventListener("click", () => {
      // Save Button
      const inputArray = document.querySelectorAll("input");
      // builds object to send to api
      $("#alert").text("");
      //checks if any field is blank
      if(inputArray[0].value === "" || inputArray[1].value === "" || inputArray[2].value === "" ||inputArray[3].value === "" ) {
          new comp.par({classList: "alert newEventForm"}, "All fields are required.").render("#alert");
          return;
        }
      const newEventObj = {
        name: inputArray[0].value,
        date: inputArray[1].value,
        time: inputArray[2].value,
        location: inputArray[3].value,
        userId: activeUser.info().id
      }
      // saves new event to API
      API.saveItem("events", newEventObj).then(() => {
      buildEvents.buildContainers();
     }) })

    // Back Button Returns to Event Page
    popUpBtns[1].addEventListener("click", () => {
      buildEvents.buildContainers();
    })
  },
  editBtnListen () {
    // listens for all the edit buttons on the page
    const allTheButtons = document.querySelectorAll("section > button");
    allTheButtons.forEach(currentBtn => {
      currentBtn.addEventListener("click", () => {
        // takes the id of the event that was clicks, fetches from the api with that id and passes on to the Edit Element form
        const currentBtnId = currentBtn.parentElement.id;
        API.getOneFromCategory("events", currentBtnId)
          .then(singleEvent => {
               buildEvents.eventEditForm(singleEvent, currentBtnId)
          })
      })
    })
  },
  eventEditForm(singleEventObj, id) {
    // builds Edit form
    // takes the return from the fetch
    $("#upcoming").text("");
      let upcomingContainer = document.getElementById("upcoming");
      upcomingContainer.style.paddingTop = 0;
      new comp.div({
      classList: "newEventForm"},
        new comp.label("Event Name"),
        new comp.input({ type: "text", value: `${singleEventObj.name}`}),
        new comp.label("Date"),
        new comp.input({type: "date", value: `${singleEventObj.date}`}),
        new comp.label("Time"),
        new comp.input({type: "time", value: `${singleEventObj.time}`}),
        new comp.label("Location"),
        new comp.input({ type: "text", value: `${singleEventObj.location}`}),
        new comp.div({},
        new comp.btn("Save"),
        new comp.btn("Back"),
        new comp.btn("Delete"))).render("#upcoming")
        buildEvents.editEventBtnClicks(singleEventObj, id);
  },
  editEventBtnClicks(singleEventObj, id) {
    // grabs the two buttons on the page and adds a click listener based on index
    // takes the event id so it can be passed on with the PATCH
    const popUpBtns = document.querySelectorAll("button");
    popUpBtns[0].addEventListener("click", () => {
      // Save Button
      const inputArray = document.querySelectorAll("input");

      //check to see if any input is empty and if it is the old info is repopulated
      if (inputArray[0].value === ""){
        inputArray[0].value = singleEventObj.name
      } else if (inputArray[1].value === ""){
        inputArray[1].value = singleEventObj.date
      }else if (inputArray[2].value === ""){
        inputArray[2].value = singleEventObj.time
      } else if (inputArray[3].value === ""){
        inputArray[3].value = singleEventObj.location
      }
      // builds object to send to api
      const editEventObj = {
        name: inputArray[0].value,
        date: inputArray[1].value,
        time: inputArray[2].value,
        location: inputArray[3].value,
        userId: activeUser.info().id
      }
      // saves new event to API
      API.updateItem("events", id, editEventObj).then(() => {
      buildEvents.buildContainers();
     }) })

    // Back Button Returns to Event Page
    popUpBtns[1].addEventListener("click", () => {
      buildEvents.buildContainers();
    })
    // Delete Button
    popUpBtns[2].addEventListener("click", () => {
      API.deleteItem("events", id).then(() => buildEvents.buildContainers())
    })
  },

}

export default buildEvents