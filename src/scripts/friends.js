// Given an active wants to remove another user from their friends list
// When the active performs a gesture on a delete affordance in the friends list
// Then the the other user should be removed from their friends list
// Given an active user wants to add another user to their friends list, but has no chat messages from that user
// When the active user performs a gesture on the Add a friend affordance
// Then the active user will be presented with an input field in which the other user's name can be entered
import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"

const buildFriends = {
  createContainer(){
    new comp.section({className: "new--friends"},
    new comp.btn("+"),
    new comp.title("h3", {}, "Add New Friend")).render(".container--inner")
    new comp.section({className: "display--friends"}).render(".container--inner")
  },
  printFriends(friendObj){
    if(activeUser.info().id === friendObj.request_userId){
      new comp.section({
        className: "friend",
        id: `${friendObj.id}`
      },
      new comp.image({src: `${friendObj.user.profilePic}`, className: "friendPic", alt: "Profile Pic", height: "120", width: "120"}),
      new comp.title("h2", {}, `${friendObj.user.firstName} ${friendObj.user.lastName}`),
      new comp.btn("Delete Friend")
      ).render(".display--friends")
    }
  },

  friendMap(){
    document.querySelector(".container--inner").innerHTML = "";
    this.createContainer();
    document.querySelector(".display--friends").innerHTML = ""
    API.getAllCategory(`friends/?request_userId=${activeUser.info().id}&_expand=user`)
    // .then(data => console.log(data))
    .then((friendObj) => {
      friendObj.forEach(friend => {
        this.printFriends(friend)
      })})
  }
}
export default buildFriends