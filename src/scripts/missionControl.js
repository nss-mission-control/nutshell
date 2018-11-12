import comp from "./components"
import activeUser from "./sessionStorage"



const buildMissionControl = {
  printPlaceholder () {
    document.querySelector(".container--inner").innerHTML = null;
    new comp.section ({className: "message", id: `${activeUser.info().id}`},
    new comp.image({src: `${activeUser.info().profilePic}`, alt: "Profile Pic", style:"display:inline-block; border-radius: 8px; margin: 4px", height: "125", width: "125"}),
    new comp.title( "h2", {style:"display: inline-block; position: relative; bottom: 10px"}, `${activeUser.info().firstName} - ${activeUser.info().lastName} ${activeUser.info().username}`),
    ).render(".container--inner")
  }
}

export default buildMissionControl;