// Author(s): Brendan McCray
// Purpose: Creates main landing page functionality and stylings and navigation links through planet images

import comp from "./components"
import activeUser from "./sessionStorage"
import buildMessages from "./messages";
import buildNews from "./news";
import buildTasks from "./tasks"
import buildEvents from "./events"


const buildMissionControl = {
  printPlaceholder() {
    document.querySelector(".container--inner").innerHTML = null;
    new comp.section({ className: "message", id: `${activeUser.info().id}` },
      new comp.image({ src: `${activeUser.info().profilePic}`, alt: "Profile Pic", style: "display:inline-block; border-radius: 8px; margin: 4px", height: "125", width: "125" }),
      new comp.title("h2", { style: "display: inline-block; position: relative; bottom: 10px" }, `${activeUser.info().firstName} - ${activeUser.info().lastName} ${activeUser.info().username}`),
    ).render(".container--inner")
  },

  printPlanets() {
    document.querySelector(".container--inner").innerHTML = null;
    // make planets - each section is a planet
    new comp.section({ className: "container--sub visible-1" },
      new comp.div({ className: "ring" }),
      new comp.div({ className: "ring-2" }),
      new comp.span({ className: "container--sub2", id: "planet-tasks" }, "Tasks")
    ).render(".container--inner")

    new comp.section({ className: "container--sub visible-3" },
      new comp.div({ className: "ufo" }),
      new comp.span({ className: "container--sub2", id: "planet-messages" }, "Messages")
    ).render(".container--inner")

    new comp.section({ className: "container--sub visible-5" },
      new comp.div({ className: "ring" }),
      new comp.span({ className: "container--sub2", id: "planet-friends" }, "Friends")
    ).render(".container--inner")

    new comp.section({ className: "container--sub visible-7" },
      new comp.div({ className: "ring" }),
      new comp.div({ className: "ring-2" }),
      new comp.div({ className: "ring-3" }),
      new comp.span({ className: "container--sub2", id: "planet-events" }, "Events")
    ).render(".container--inner")

    new comp.section({ className: "container--sub visible-9" },
      new comp.span({ className: "container--sub2", id: "planet-news" }, "News")
    ).render(".container--inner")

    new comp.section({ className: "container--sub ghost-2" },
    ).render(".container--inner")

    new comp.section({ className: "container--sub ghost-4" },
    ).render(".container--inner")

    new comp.section({ className: "container--sub ghost-6" },
    ).render(".container--inner")

    new comp.section({ className: "container--sub ghost-8" },
    ).render(".container--inner")

    // assign click listeners
    this.clickPlanets();
  },

  // the small circle of each planet (which are spans) have an id associated with them. A click listener is assigned to each one
  clickPlanets() {
    document.getElementById("planet-tasks").addEventListener("click", () => {buildTasks.buildContainers()})
    document.getElementById("planet-messages").addEventListener("click", () => {buildMessages.messageMap()})
    document.getElementById("planet-friends").addEventListener("click", () => {console.log("Friends function called.")})
    document.getElementById("planet-events").addEventListener("click", () => {buildEvents.buildContainers()})
    document.getElementById("planet-news").addEventListener("click", () => {buildNews.friendsFinder()})
  }
}

export default buildMissionControl;