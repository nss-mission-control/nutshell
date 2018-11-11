import comp from "./components"



const buildMissionControl = {
  printPlaceholder () {
    document.querySelector(".container--inner").innerHTML = null;
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(user);
    new comp.section ({className: "message", id: `${user.id}`},
    new comp.image({src: `${user.profilePic}`, alt: "Profile Pic", style:"display:inline-block; border-radius: 8px; margin: 4px", height: "125", width: "125"}),
    new comp.title( "h2", {style:"display: inline-block; position: relative; bottom: 10px"}, `${user.firstName} - ${user.lastName} ${user.username}`),
    ).render(".container--inner")
  }
}

export default buildMissionControl;