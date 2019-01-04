// Author(s): Kelly Morin, Brendan McCray
// Purpose: Creates navbar functionality and also sets functionality for editing current user and checking database for duplication

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
    document.querySelectorAll("button").forEach(button =>{
      if(button.textContent === "+"){
        button.addEventListener("click", ()=>{
          this.friendsSearch()
        })
      }
    })
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
  friendsSearch() {
    document.querySelector(".new--friends").innerHTML = null
    new comp.input({ type: "text", id: "friendsSearch", placeholder: "search for new friends here" }).render(".new--friends")
    new comp.div({ id: "searchResults", style: "border:1px solid black" }).render(".new--friends")
    const searchInput = document.getElementById("friendsSearch")
    const searchResults = document.getElementById("searchResults")
    let sneaker = [];
    let allUsers = [];
    let taco = [];
    let unfriendedId;

    API.getAllCategory(`friends/?request_userId=${activeUser.info().id}&_expand=user`)
    .then(friends => {
      friends.forEach(friend =>
        sneaker.push(friend.userId)
        )
        sneaker.push(activeUser.info().id)
    })

    API.getAllCategory(`users`)
    .then(people => {
      people.forEach(person => {
        allUsers.push(person.id)
      })

    })
    .then(()=>{
      allUsers = allUsers.filter(val => !sneaker.includes(val))
      allUsers.forEach(user =>{
        let includeId = `id=${user}`
        taco.push(includeId)
      })
      unfriendedId = taco.join("&")
      searchInput.addEventListener("keyup", (e)=> {
        if (searchInput.value === "") {
          return
        } else {
          document.querySelector("#searchResults").innerHTML=""
          API.getAllCategory(`users/?q=${searchInput.value}&${unfriendedId}`)
          .then((data)=> {
            data.forEach(person => this.showSearchResults(person))
          })
        }
      })
    })
},
  showSearchResults(unfriendedPerson) {
    new comp.div({class: "notFriended"},
      new comp.image({class: "profilePicResult", src: `${unfriendedPerson.profilePic}`, width: "150", height: "150"}),
      new comp.div({class: "nameResult"}, `${unfriendedPerson.firstName} ${unfriendedPerson.lastName}`)
    ).render("#searchResults")
  }
}
export default buildFriends