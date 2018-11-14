
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
    new comp.section({className: "display--friends"},
      ).render(".container--inner")
  },
  printFriends(friendObj){
    if(activeUser.info().id === friendObj.request_userId){
      new comp.section({
        className: "friend",
        id: `${friendObj.id}`
      },
      new comp.div({id: `deleteAlert-${friendObj.id}`}),
      new comp.image({src: `${friendObj.user.profilePic}`, className: "friendPic", alt: "Profile Pic", height: "120", width: "120"}),
      new comp.title("h2", {}, `${friendObj.user.firstName} ${friendObj.user.lastName}`),
      new comp.btn("Delete Friend")
      ).render(".display--friends")
    }
  },

  friendMap(){
    document.querySelector(".container--inner").innerHTML = "";
    this.createContainer();
    API.getAllCategory(`friends/?request_userId=${activeUser.info().id}&_expand=user`)
    .then((friendObj) => {
      friendObj.forEach(friend => {
        this.printFriends(friend)
      })})
      .then(()=> this.friendDelete())
  },

  friendDelete(){
    document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", ()=>{
        if(event.target.textContent === "Delete Friend"){
          let id = event.target.parentNode.id
          this.confirmDelete(id)
        } else if(event.target.textContent === "Yes"){


        }
      })
    })
  },

  confirmDelete(id){
    new comp.par({className: "alert"},"Are you sure you want to delete this friend?",
      new comp.btn("Yes"),
      new comp.btn("No")
    ).render(`#deleteAlert-${id}`)
    document.querySelectorAll("button").forEach(button =>{
      if(button.textContent === "Yes" || button.textContent === "No"){
        button.addEventListener("click", (event)=>{
          if(event.target.textContent=== "Yes"){
            let friendId = event.target.parentNode.parentNode.parentNode.id
           this.deleteFriend(friendId)
          } else if(event.target.textContent === "No"){
            this.friendMap()
          }
        })
      }
    })
  },

  deleteFriend(id){
    API.deleteItem("friends", id)
    .then(()=> this.friendMap())
  },
}
export default buildFriends