import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"
import formatDate from "./format"
import moment from "moment"

window.moment = moment


const buildEvents = {

  buildContainers() {
    // builds the two containers to hold everything
    document.querySelector(".container--inner").innerHTML = ""
    // containers
    new comp.title("h1", {
      className: "title--upcoming"
    }, "Upcoming Event").render(".container--inner")
    new comp.div({
      id: "upcoming"
    }).render(".container--inner")
    new comp.title("h1", {
      className: "title--past"
    }, "Past Event").render(".container--inner")
    new comp.div({
      id: "past"
    }).render(".container--inner")
    // this.newTask()
    // this.newEventButton();
    this.eventFetch()
    },



  printEvents(eventObj) {
    // takes the objects from the api and prints them to the dom
    let outputContainer;

    if (moment(eventObj.date).isBefore(moment().format("YYYY-MM-DD"))){
      outputContainer = "#past"
      console.log(moment().hour())
    } else if (moment(eventObj.date).isSame((moment().format("YYYY-MM-DD")))) {
      console.log(moment().minute())
      if(moment().hour() >= Number(eventObj.time.substr(0,2))){
        if(moment().minute() >= Number(eventObj.time.substr(3,2))) {
        outputContainer = "#past"
      } else {outputContainer = "#upcoming"}
    }
   }
    else {
      outputContainer = "#upcoming"
    }

    console.log("Moment test" ,moment().format("YYYY-MM-DD"));
    // TODO:need to test if date is in the future or the past


    new comp.section({
        className: "event",
        id: `${eventObj.id}`
      },
      new comp.div ( {},
      new comp.title("h3", `${eventObj.name}`),
      new comp.par(`${formatDate.getCorrectDate(eventObj.date)} ${eventObj.time}`),
      new comp.par(`${eventObj.location}`),
      new comp.btn("Edit"))).render(outputContainer)

  },

  newEvent () {
    new comp.div ({className: "new--event",id: "newEventBtnSection"},
    new comp.btn ("+"),
    new comp.title("h3", "New Event")).render("#upcoming")
    buildEvents.newEventClickListener();
  },

  newEventClickListener () {
    const button = document.querySelector("#newEventBtnSection > button")
    button.addEventListener("click", (e) => {
      console.log("click")
      $("#upcoming").text("");
      let upcomingContainer = document.getElementById("upcoming");
      upcomingContainer.style.paddingTop = 0;
      new comp.div({
      classList: "newEventForm"},
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
      buildEvents.newEventPopUpBtnClicks();

    })
    },


  nextEvent() {
    console.log(document.getElementById("upcoming").firstChild)
    document.getElementById("upcoming").firstChild.classList.add("nextEvent");
  },

  eventFetch() {
    API.getAllCategory(`events/?userId=${activeUser.info().id}&_sort=date,time&_order=asc`) //check if user is same as session storage
      .then(eventObj => {
        buildEvents.newEvent();
        eventObj.forEach(event => {
          this.printEvents(event)
        })
        buildEvents.nextEvent();
        buildEvents.editBtnListen()
      })
  },

  newEventPopUpBtnClicks() {
    // grabs the two buttons on the page and adds a click listener based on index
    const popUpBtns = document.querySelectorAll("button");
    popUpBtns[0].addEventListener("click", () => {
      // Save Button
      const inputArray = document.querySelectorAll("input");
      // builds object to send to api
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
    const allTheButtons = document.querySelectorAll("section > div > button");
    console.log(allTheButtons);
    allTheButtons.forEach(currentBtn => {
      currentBtn.addEventListener("click", () => {
        console.log("I am an edit button")
        // takes the id of the event that was clicks, fetches from the api with that id and passes on to the Edit Element form
        const currentBtnId = currentBtn.parentElement.parentElement.id;
        console.log(currentBtnId);
        API.getOneFromCategory("events", currentBtnId)
          .then(singleEvent => {
               buildEvents.eventEditForm(singleEvent, currentBtnId)
          })
      })
    })
  },
  eventEditForm(singleEventObj) {
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
        new comp.btn("Back"))).render("#upcoming")
        buildEvents.editEventPopUpBtnClicks(singleEventObj.id);
  },
  editEventPopUpBtnClicks(id) {
    // grabs the two buttons on the page and adds a click listener based on index
    // takes the event id so it can be passed on with the PATCH
    const popUpBtns = document.querySelectorAll("button");
    popUpBtns[0].addEventListener("click", () => {
      // Save Button
      const inputArray = document.querySelectorAll("input");
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
  },

}

export default buildEvents