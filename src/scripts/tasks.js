import comp from "./components"
import API from "./apiData"


const buildTasks = {

  buildContainers () {
    document.querySelector(".container--inner").innerHTML = ""
    const title1 = new comp.title ("h1", {className: "title--incomplete"}, "Incomplete Tasks").render(".container--inner")
    const incomplete = new comp.div ({id: "incomplete"}).render(".container--inner")
    const title2 = new comp.title ("h1", {className: "title--complete"}, "Complete Tasks").render(".container--inner")
    const complete = new comp.div ({id: "complete"}).render(".container--inner")
    this.newTask()
    this.tasksFetch()
  },

  printTasks (tasksObj) {
    let outputContainer;

    if (tasksObj.complete) {
      outputContainer = "#complete"
    } else {
      outputContainer = "#incomplete"
    }

    const task = new comp.section ({className: "task", id: `${tasksObj.id}`},
    new comp.checkbox(),
    new comp.par({}, tasksObj.task),
    new comp.par({}, tasksObj.dueDate)).render(outputContainer)
  },

  tasksFetch ()  {
    API.getAllCategory("tasks") //check if user is same as session storage
    .then(tasksObj => tasksObj.forEach(task => {
      console.log(task);
      this.printTasks(task)}))
  },

  newTask () {
    const newTaskField = new comp.section ({className: "new--task"},
    new comp.btn ("+"),
    new comp.input({type: "text", placeholder: "type new task here"}),
    new comp.input({type: "date"})).render("#incomplete")
  }

};

export default buildTasks
