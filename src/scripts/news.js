import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"
import formatDate from "./format"


const buildNews = {
  createContainer(){
    new comp.section({className:"new--news"},
      new comp.btn("+"),
      new comp.title("h2", {}, "Save New Article")
    ).render(".container--inner")
  },
  printNews(newsObj) {
    new comp.section ({className: "news", id: `${newsObj.id}`},
    new comp.anchor({href: `${newsObj.url}`, target: "_blank"},  new comp.image({src: `${newsObj.articleImage}`, alt: "Article Image", height: "120", width: "120"})),
    new comp.title("h2", {}, `${newsObj.articleName}`),
    new comp.title("h4", {}, `Saved by: ${newsObj.user.firstName} | Date Saved: ${formatDate.getCorrectDate(newsObj.dateSaved)}`),
    new comp.par({}, newsObj.about),
    new comp.btn("Delete Article")).render(".container--inner")
  },

  newsMap ()  {
    document.querySelector(".container--inner").innerHTML = ""
    this.createContainer()
    API.getAllCategory(`articles/?userId=${activeUser.info().id}&_expand=user&_sort=dateSaved&_order=desc`)
    .then(newsObj => newsObj.forEach(news => {
      this.printNews(news)}))
      .then(()=> this.eventListener())

  },

  newNews () {
      new comp.input({name: "articleName", placeholder: "Article Name", id: "articleName" }).render(".new--news")
      new comp.input({name: "articleUrl", placeholder: "Article Link", id: "articleLink"}).render(".new--news")
      new comp.input({name: "articleImageUrl", placeholder: "Article Image Link", id: "articleImage"}).render(".new--news")
      new comp.input({name: "articleDescription", placeholder: "Article Description", id: "articleDescription"}).render(".new--news")
      new comp.btn("Save New Article").render(".new--news")
      this.eventListener()
  },

  eventListener(){
    document.querySelectorAll("button").forEach((button)=> {
      button.addEventListener("click", (e)=>{
        if(e.target.textContent === "+"){
          this.newNews()
          $(".new--news button:first-child").remove()
        }
        else if(e.target.textContent === "Save New Article"){
          let story = {
            articleName: document.querySelector("#articleName").value,
            url: document.querySelector("#articleLink").value,
            articleImage: document.querySelector("#articleImage").value,
            about: document.querySelector("#articleDescription").value,
            userId: activeUser.info().id,
            dateSaved: new Date()
          }
          buildNews.addNews(story)
        } else if(e.target.textContent === "Delete Article"){
          let articleId = e.target.parentNode.id
          API.deleteItem("articles", articleId).then(()=> buildNews.newsMap())
        }
        })
      })
    },


  addNews(story){
    API.saveItem("articles", story).then(()=> this.newsMap())
  }

}


export default buildNews