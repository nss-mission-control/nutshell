import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"


const buildNews = {
  printNews(newsObj) {
    new comp.section ({className: "news", id: `${newsObj.id}`},
    new comp.anchor({href: `${newsObj.url}`, target: "_blank"},  new comp.image({src: `${newsObj.articleImage}`, alt: "Article Image", height: "120", width: "120"})),
    new comp.title("h2", {}, `${newsObj.articleName}`),
    new comp.title("h4", {}, `Saved by: ${newsObj.user.firstName} | Date Saved: ${newsObj.dateSaved}`),
    new comp.par({}, newsObj.about),
    new comp.btn("Delete Article")).render(".container--inner")
  },

  newsMap ()  {
    document.querySelector(".container--inner").innerHTML = ""
    API.getAllCategory(`articles/?userId=${activeUser.info().id}&_expand=user&_sort=dateSaved&_order=desc`)
    .then(newsObj => newsObj.forEach(news => {
      this.printNews(news)}))
      .then(() => this.newNews())
      .then(()=> this.eventListener())

  },

  newNews () {
    new comp.section ({className: "new--news"},
    new comp.title ("h1", {}, "Save News Article"),
    new comp.form(
      new comp.label({for: "articleName"}, "Article Name"),
      new comp.input({name: "articleName", placeholder: "Article Name", id: "articleName" }),
      new comp.label({for: "articleUrl"}, "Article Link"),
      new comp.input({name: "articleUrl", placeholder: "Article Link", id: "articleLink"}),
      new comp.label({for: "articleImageUrl"}, "Article Image Link"),
      new comp.input({name: "articleImageUrl", placeholder: "Article Image Link", id: "articleImage"}),
      new comp.label({for: "articleDescription"}, "Article Description"),
      new comp.input({name: "articleDescription", placeholder: "Article Description", id: "articleDescription"}),
      new comp.btn("Save New Article")
    ),
    ).render(".container--inner")
  },

  eventListener(){
    document.querySelectorAll("button").forEach((button)=> {
      button.addEventListener("click", (e)=>{
        if(e.target.textContent === "Save New Article"){
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