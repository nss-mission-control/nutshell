import comp from "./components"
import activeUser from "./sessionStorage"



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
    new comp.section ({className: "container--sub visible-1"},
    new comp.div({className: "ring"}),
    new comp.div({className: "ring-2"}),
    new comp.span({className: "container--sub2"}, "Tasks")
    ).render(".container--inner")

    new comp.section ({className: "container--sub visible-3"},
    new comp.span({className: "container--sub2"}, "Messages")
    ).render(".container--inner")

    new comp.section ({className: "container--sub visible-5"},
    new comp.div({className: "ring"}),
    new comp.span({className: "container--sub2"}, "Friends")
    ).render(".container--inner")

    new comp.section ({className: "container--sub visible-7"},
    new comp.span({className: "container--sub2"}, "Events")
    ).render(".container--inner")

    new comp.section ({className: "container--sub visible-9"},
    new comp.span({className: "container--sub2"}, "News")
    ).render(".container--inner")

    new comp.section ({className: "container--sub ghost-2"},
    ).render(".container--inner")

    new comp.section ({className: "container--sub ghost-4"},
    ).render(".container--inner")

    new comp.section ({className: "container--sub ghost-6"},
    ).render(".container--inner")

    new comp.section ({className: "container--sub ghost-8"},
    ).render(".container--inner")
  }


  /* DO NOT DELETE COMMENTED HTML CONTENT SO ADVANCED STYLING IS EASIER LATER */
  /* DELETE BEFORE END OF PROJECT */

  // <section class="container--sub visible-1"><div class="ring"></div><div class="ring-2"></div><span class="container--sub2">Tasks</span></section>
  // <section class="container--sub visible-3"><span class="container--sub2">Messages</span></section>
  // <section class="container--sub visible-5"><div class="ring"></div><span class="container--sub2">Friends</span></section>
  // <section class="container--sub visible-7"><span class="container--sub2">Events</span></section>
  // <section class="container--sub visible-9"><span class="container--sub2">News</span></section>
  // <section class="container--sub ghost-2"><span class="container--sub2"></span></section>
  // <section class="container--sub ghost-4"><span class="container--sub2"></span></section>
  // <section class="container--sub ghost-6"><span class="container--sub2"></span></section>
  // <section class="container--sub ghost-8"><span class="container--sub2"></span></section>

}

export default buildMissionControl;