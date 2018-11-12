import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"


const buildTasks = {

  //function run first in order to clear HTML, create parent containers, then add new task input and call fetch
  buildContainers () {
    document.querySelector(".container--inner").innerHTML = ""
    new comp.title ("h1", {className: "title--incomplete"}, "Incomplete Tasks").render(".container--inner")
    new comp.div ({id: "incomplete"}).render(".container--inner")
    new comp.title ("h1", {className: "title--complete"}, "Complete Tasks").render(".container--inner")
    new comp.div ({id: "complete"}).render(".container--inner")
    this.newTask()
    this.tasksFetch()
  },

  //used to create and append all tasks from database to DOM
  printTasks (tasksObj) {
    let outputContainer;

    if (tasksObj.complete) {
      outputContainer = "#complete"
    } else {
      outputContainer = "#incomplete"
    }

    new comp.section ({className: "task", id: `${tasksObj.id}`},
    new comp.checkbox(),
    new comp.par({className: "editable--task"}, tasksObj.task),
    new comp.par({className: "editable--date"}, tasksObj.dueDate)).render(outputContainer)
  },

  //fetch all tasks from database, call create/append and call add listeners
  tasksFetch ()  {
    API.getAllCategory("tasks") //check if user is same as session storage
    .then(tasksObj =>  {
      tasksObj.forEach(task => {
      this.printTasks(task)})
      this.cbListener()
      this.parListener()
    })
  },

  //checkbox listener will move tasks between complete and incomplete containers
  //database "complete" property will be patched accordingly and DOM updated
  cbListener () {
    const checkboxes = document.querySelectorAll("input[type=checkbox]")

    //if the id of the grandparent container is #complete, then check the box
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

  //function used to edit tasks in DOM and patch new info to database task description and date
  parListener () {
    //get all sections on page
    let sections = document.querySelectorAll("section")

    ///add click listener to all sections
    sections.forEach(section => {
      section.addEventListener("click", (e) => {
        //get id of target section
        const id = e.target.parentNode.id

        //if paragraph clicked is task description, get text content
        //create new <input> template (with  ID!) and replace <p> with <input>
        //add a keydown listener to the input after it is in DOM and
        //patch the task description to database when ENTER is pressed
        if (e.target.classList.contains("editable--task")) {
          const taskName = e.target.textContent
          let tempTaskInput = `<input id="temp1" type="text" value="${taskName}">`
          $(e.target).replaceWith(tempTaskInput)
          const tempInput = document.querySelector("#temp1");
            tempInput.addEventListener("keydown", (e) => {
              if (e.keyCode === 13) {
                const patchTask = {task: tempInput.value}
                API.updateItem("tasks", id, patchTask)
                  .then(() => this.buildContainers())
              }
            })
        //if paragraph clicked is task due date, get text content
        //create new <input> template (with  ID!) and replace <p> with <input>
        //add a change listener to the input after it is in DOM and
        //patch the task due date to database when new date is selected
        } else if (e.target.classList.contains("editable--date")) {
          const taskDate = e.target.textContent
          let tempTaskDate = `<input id="temp2" type="date" value="${taskDate}">`
          $(e.target).replaceWith(tempTaskDate)
            const tempDateInput = document.querySelector("#temp2");
            tempDateInput.addEventListener("change", (e) => {
                const patchDate = {dueDate: tempDateInput.value}
                API.updateItem("tasks", id, patchDate)
                  .then(() => this.buildContainers())
            })
        }
      })
    })

  },

  //creates new task input field with append button inside first section of INCOMPLETE container
  newTask () {
    new comp.section ({className: "new--task"},
    new comp.btn ("+"),
    new comp.input({id: "input--task", type: "text", placeholder: "type new task here"}),
    new comp.input({id: "input--date", type: "date"})).render("#incomplete")

    const button = document.querySelector("button")
    const input_task = document.querySelector("#input--task")
    const input_date = document.querySelector("#input--date")

    //button click posts new task to database and resets new task input strings
    button.addEventListener("click", (e) => {
      if (input_task.value === "" || input_date.value === "") {
        return
      } else {
        let taskItem = {
          task: input_task.value,
          complete: false,
          dueDate: input_date.value,
          /*
          NEED TO UPDATE USER ID TO SAVE SESSION ASSIGNED ID
          */
          userId: activeUser.info().id,
        }
        API.saveItem("tasks", taskItem).then(data => {
          this.printTasks(data)
          this.cbListener()
          this.parListener()
        })
        input_task.value = ""
        input_date.value = ""
      }
    })
  }
}

export default buildTasks