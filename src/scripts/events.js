import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"


const buildEvents = {

  buildContainers() {
    // builds the two containers to hold everything
    document.querySelector(".container--inner").innerHTML = ""
    // button for new event
    const newBtn = new comp.div({ id: "newEventBtn"},
      new comp.title("h3", "New Event!"),
      new comp.btn("+")).render(".container--inner")

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
    this.newEventButton();
    this.eventFetch()
    },

  printEvents(eventObj) {
    // takes the objects from the api and prints them to the dom
    let outputContainer;

    // TODO:need to test if date is in the future or the past

    outputContainer = "#upcoming"
    const task = new comp.section({
        className: "event",
        id: `${eventObj.id}`
      },
      new comp.title("h3", `${eventObj.name}`),
      new comp.par(`${eventObj.date} ${eventObj.time}`),
      new comp.par(`${eventObj.location}`),
      new comp.btn("Edit")).render(outputContainer)
  },

  nextEvent() {
    console.log(document.getElementById("upcoming").firstChild)
    document.getElementById("upcoming").firstChild.classList.add("nextEvent");
  },

  eventFetch() {
    API.getAllCategory(`events/?userId=${activeUser.info().id}&_sort=date,time&_order=asc`) //check if user is same as session storage
      .then(eventObj => {
        eventObj.forEach(event => {
          this.printEvents(event)
        })
        buildEvents.nextEvent();
        buildEvents.editBtnListen()
      })
  },

  newEventButton() {
    // when clicked it clears the dom and calls the function to build the form
    $("#newEventBtn").click(
      function (e) {
        $(".container--inner").text("")
        buildEvents.newEventPopUp();
      }
    )
  },

  newEventPopUp() {
    // Builds new event entry form
    let div2 = new comp.div({
        classList: "newEventForm"
      },
      new comp.title("h1", { className: "title"}, "Add A New Event"),
      new comp.label("Event Name"),
      new comp.input({ type: "text"}),
      new comp.label("Date"),
      new comp.input({type: "date"}),
      new comp.label("Time"),
      new comp.input({type: "time"}),
      new comp.label("Location"),
      new comp.input({ type: "text"}),
      new comp.btn("Save"),
      new comp.btn("Back"))
    div2.render(".container--inner")
    buildEvents.newEventPopUpBtnClicks();
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
    const allTheButtons = document.querySelectorAll("section > button");
    allTheButtons.forEach(currentBtn => {
      currentBtn.addEventListener("click", () => {
        // takes the id of the event that was clicks, fetches from the api with that id and passes on to the Edit Element form
        const currentBtnId = currentBtn.parentElement.id;
        API.getOneFromCategory("events", currentBtnId)
          .then(singleEvent => {
            $(".container--inner").text("")
            buildEvents.eventEditForm(singleEvent, currentBtnId)
          })
      })
    })
  },
  eventEditForm(singleEventObj) {
    // builds Edit form
    // takes the return from the fetch
    let div2 = new comp.div({
      classList: "newEventForm"
    },
    new comp.title("h1", { className: "title"}, "Edit Your Event"),
    new comp.label("Event Name"),
    new comp.input({ type: "text", value: `${singleEventObj.name}`}),
    new comp.label("Date"),
    new comp.input({type: "date", value: `${singleEventObj.date}`}),
    new comp.label("Time"),
    new comp.input({type: "time", value: `${singleEventObj.time}`}),
    new comp.label("Location"),
    new comp.input({ type: "text", value: `${singleEventObj.location}`}),
    new comp.btn("Save"),
    new comp.btn("Back"))
  div2.render(".container--inner")
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