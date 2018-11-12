import comp from "./components"
import activeUser from "./sessionStorage"
import buildMessages from "./messages";
import buildNews from "./news";
import buildTasks from "./tasks"
import buildEvents from "./events"


const buildMissionControl = {
  printPlaceholder () {
    document.querySelector(".container--inner").innerHTML = null;
    new comp.section ({className: "message", id: `${activeUser.info().id}`},
    new comp.image({src: `${activeUser.info().profilePic}`, alt: "Profile Pic", style:"display:inline-block; border-radius: 8px; margin: 4px", height: "125", width: "125"}),
    new comp.title( "h2", {style:"display: inline-block; position: relative; bottom: 10px"}, `${activeUser.info().firstName} - ${activeUser.info().lastName} ${activeUser.info().username}`),
    ).render(".container--inner")
  },

  printPlanets () {
    document.querySelector(".container--inner").innerHTML = null;
    // make planets - each section is a planet
    new comp.section ({className: "container--sub visible-1 planet-task"},
    new comp.div({className: "ring"}),
    new comp.div({className: "ring-2"}),
    new comp.span({className: "container--sub2 planet-task"}, "Tasks")
    ).render(".container--inner")

    new comp.section ({className: "container--sub visible-3 planet-message"},
    new comp.div({className: "ufo"}),
    new comp.span({className: "container--sub2 planet-message"}, "Messages")
    ).render(".container--inner")

    new comp.section ({className: "container--sub visible-5 planet-friends"},
    new comp.div({className: "ring"}),
    new comp.span({className: "container--sub2 planet-friends"}, "Friends")
    ).render(".container--inner")

    new comp.section ({className: "container--sub visible-7 planet-events"},
    new comp.div({className: "ring"}),
    new comp.div({className: "ring-2"}),
    new comp.div({className: "ring-3"}),
    new comp.span({className: "container--sub2 planet-events"}, "Events")
    ).render(".container--inner")

    new comp.section ({className: "container--sub visible-9 planet-news"},
    new comp.span({className: "container--sub2 planet-news"}, "News")
    ).render(".container--inner")

    new comp.section ({className: "container--sub ghost-2"},
    ).render(".container--inner")

    new comp.section ({className: "container--sub ghost-4"},
    ).render(".container--inner")

    new comp.section ({className: "container--sub ghost-6"},
    ).render(".container--inner")

    new comp.section ({className: "container--sub ghost-8"},
    ).render(".container--inner")

    // assign click listeners
    this.clickPlanets();
  },

  clickPlanets() {
    document.querySelector(".container--inner").addEventListener("click", (e) => {
      console.log(e)
      if (e.target.classList.contains("planet-task")) {
        buildTasks.buildContainers()
      } else if (e.target.classList.contains("planet-message")) {
        buildMessages.messageMap();
      } else if (e.target.classList.contains("planet-friends")) {
        console.log("Friends function called.")
      } else if (e.target.classList.contains("planet-events")) {
        buildEvents.buildContainers()
      } else if (e.target.classList.contains("planet-news")) {
        buildNews.newsMap();
      }
    })
  }

}

export default buildMissionControl;