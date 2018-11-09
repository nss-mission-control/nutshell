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
    .then(tasksObj =>  {
      tasksObj.forEach(task => {
      this.printTasks(task)})
      this.cb_listener()
    })
  },

  cb_listener () {
    const checkboxes = document.querySelectorAll("input[type=checkbox]")

    // if the id of the grandparent container is #complete, then check the box
    checkboxes.forEach( (checkbox) => {
      if (checkbox.parentNode.parentNode.id === "complete") {
        checkbox.checked = true
      }
      checkbox.addEventListener("change", (e) => {
        let patchProperty;
        //if false -> true
        if (e.target.checked) {
          patchProperty = {complete: true}
          //patch "complete" property of database object using parentNode (section) ID to TRUE
          API.updateItem("tasks", `${e.target.parentNode.id}`, patchProperty)
            .then(() => this.buildContainers())
        } else {
          //if checkbox is unchecked...
          patchProperty = {complete: false}
          API.updateItem("tasks", `${e.target.parentNode.id}`, patchProperty)
            .then(() => this.buildContainers())
        }
      })
    })

  },

  newTask () {
    const newTaskField = new comp.section ({className: "new--task"},
    new comp.btn ("+"),
    new comp.input({id: "input--task", type: "text", placeholder: "type new task here"}),
    new comp.input({id: "input--date", type: "date"})).render("#incomplete")

    const button = document.querySelector("button")
    const input_task = document.querySelector("#input--task")
    const input_date = document.querySelector("#input--date")

    button.addEventListener("click", (e) => {
      if (input_task.value === "" || input_date.value === "") {
        console.log("content missing", input_task.value, input_date.value, "x")
      } else {
        console.log("content exists", input_task.value, input_date.value)
        let taskItem = {
          task: input_task.value,
          complete: false,
          dueDate: input_date.value,
          /*
          NEED TO UPDATE USER ID TO SAVE SESSION ASSIGNED ID
          */
          userId: 3,
        }
        API.saveItem("tasks", taskItem).then(data => this.printTasks(data))
        input_task.value = ""
        input_date.value = ""
      }
    })
  }
}

export default buildTasks
