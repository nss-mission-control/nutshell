import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"
import formatDate from "./format"


const buildNews = {

  friendsFinder() {
    document.querySelector(".container--inner").innerHTML = ""
    this.createContainer()
    document.querySelector(".display--news").innerHTML = ""
    API.getAllCategory(`friends/?request_userId=${activeUser.info().id}`)
      .then(friendsArray => {
        let friendsSearchString = ""
        friendsArray.forEach(currentFriend => {
          friendsSearchString += `&userId=${currentFriend.userId}`
        })
        API.getAllCategory(`articles/?_expand=user&userId=${activeUser.info().id}${friendsSearchString}&_sort=date,time&_order=asc`)
          .then(friendsNews => {
            friendsNews.forEach(singleNews => {

            buildNews.printNews(singleNews)
            })
            buildNews.eventListener()

          })
      })

  },

  //Build the containers on the news page to hold the articles
  createContainer(){
    new comp.section({className:"new--news"},
      new comp.btn("New Article"),
    ).render(".container--inner")
    new comp.section({className: "news--title"},
    new comp.title("h1","News Articles")).render(".container--inner")
    new comp.section({className: "display--news"}).render(".container--inner")

  },
  //Create each section used to display the article in the DOM
  printNews(newsObj) {
    if (newsObj.userId === activeUser.info().id){
    new comp.section({className: "news", id: `${newsObj.id}`},
    new comp.anchor({href: `${newsObj.url}`, target: "_blank"},  new comp.image({src: `${newsObj.articleImage}`, alt: "Article Image", height: "120"})),
    new comp.div({className: "news-info"},
    new comp.title("h2", {}, `${newsObj.articleName}`),
    new comp.title("h4", {}, `Saved by: ${newsObj.user.firstName} | Date Saved: ${formatDate.getCorrectDate(newsObj.dateSaved)}`),
    new comp.par({}, newsObj.about)),
    new comp.btn("Delete Article")).render(".display--news")
    } else {
      new comp.section({className: "news friendsNews", id: `${newsObj.id}`},
      new comp.anchor({href: `${newsObj.url}`, target: "_blank"},  new comp.image({src: `${newsObj.articleImage}`, alt: "Article Image", height: "120"})),
      new comp.div({className: "news-info"},
      new comp.title("h2", {}, `${newsObj.articleName}`),
      new comp.title("h4", {}, `Saved by: ${newsObj.user.firstName} | Date Saved: ${formatDate.getCorrectDate(newsObj.dateSaved)}`),
      new comp.par({}, newsObj.about))).render(".display--news")

  }},

  //builds the form to add a new article and calls the event listener function
  newNews () {
      new comp.div({className: "newsForum"},
      new comp.div({id: "alert"}),
      new comp.input({name: "articleName", placeholder: "Article Name", id: "articleName" }),
      new comp.input({name: "articleUrl", placeholder: "Article Link", id: "articleLink"}),
      new comp.input({name: "articleImageUrl", placeholder: "Article Image Link", id: "articleImage"}),
      new comp.input({name: "articleDescription", placeholder: "Article Description", id: "articleDescription"}),
      new comp.btn("Save New Article")).render(".new--news")
      this.eventListener()
  },

  eventListener(){
    document.querySelectorAll("button").forEach((button)=> {
      //Grabs all buttons on the page and adds an event listener to them
      button.addEventListener("click", (e)=>{
        //if button is "+", call the function to build the new article form
        if(e.target.textContent === "New Article"){
          this.newNews()
          $(".new--news button:first-child").remove()
        }
        //if the button is "Save New Article", select the inputs and check to see if any field is blank, if so, display an alert
        else if(e.target.textContent === "Save New Article"){
          let inputArray = document.querySelectorAll("input");
          if(inputArray[0].value === "" || inputArray[1].value === "" || inputArray[2].value === "" || inputArray[3].value === ""){
            new comp.par({className: "alert"}, "All fields are required.").render("#alert");
            return;
          }
          //if the fields are not blank, create the object to pass to the API
          let story = {
            articleName: document.querySelector("#articleName").value,
            url: document.querySelector("#articleLink").value,
            articleImage: document.querySelector("#articleImage").value,
            about: document.querySelector("#articleDescription").value,
            userId: activeUser.info().id,
            dateSaved: new Date()
          }
          //Call the API and pass the object created above
          buildNews.addNews(story)
          //If the button is "Delete", select the parent node ID and call the API delete function, then re-render the articles section.
        } else if(e.target.textContent === "Delete Article"){
          let articleId = e.target.parentNode.id
          API.deleteItem("articles", articleId).then(()=> buildNews.friendsFinder())
        }
        })
      })
    },


  addNews(story){
    API.saveItem("articles", story).then(()=> this.friendsFinder())
  }

}


export default buildNews