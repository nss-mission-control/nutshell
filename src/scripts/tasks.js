// Author(s): Kelly Morin, Jase Hackman, Brendan McCray
// Purpose: Creates ability to create, edit, and delete tasks displayed to user

import comp from "./components"
import API from "./apiData"
import activeUser from "./sessionStorage"

//used to prevent user from editing multiple task fields at once
let globalEditTrackingVariable = null;

const buildTasks = {

  //function run first in order to clear HTML, create parent containers, then add new task input and call fetch
  buildContainers() {
    document.querySelector(".container--inner").innerHTML = ""
    new comp.title("h1", { className: "title--incomplete" }, "Incomplete Tasks").render(".container--inner")
    new comp.div({ id: "incomplete" }).render(".container--inner")
    new comp.title("h1", { className: "title--complete" }, "Complete Tasks").render(".container--inner")
    new comp.div({ id: "complete" }).render(".container--inner")
    new comp.div({ className: "new--task", id: "new--task" }).render("#incomplete")
    this.newTask()
    this.tasksFetch()
  },

  //used to create and append all tasks from database to DOM
  printTasks(tasksObj) {
    let outputContainer;

    if (tasksObj.complete) {
      outputContainer = "#complete"
    } else {
      outputContainer = "#incomplete"
    }

    new comp.section({ className: "task", id: `_${tasksObj.id}` },
      new comp.checkbox(),
      new comp.par({ className: "editable--task" }, tasksObj.task),
      new comp.par({ className: "editable--date" }, tasksObj.dueDate)).render(outputContainer)
  },

  //fetch all tasks from database, call create/append and call add listeners
  tasksFetch() {
    API.getAllCategory(`tasks/?userId=${activeUser.info().id}&_sort=dueDate&_order=asc`) //check if user is same as session storage
      .then(tasksObj => {
        tasksObj.forEach(task => {
          this.printTasks(task)
        })
        this.cbListener()
        this.editTaskListener()
      })
  },

  // checkbox listener will move tasks between complete and incomplete containers
  // database "complete" property will be patched accordingly and DOM updated
  cbListener(singleCheckbox, newTaskData) {
    // if a single checkbox is true, prevent change listeners from being stacked
    // by targeting the single new checkbox
    if (singleCheckbox) {
      //identify checkbox that was just appended
      const cbParent = document.getElementById(`_${newTaskData.id}`)
      const cb = cbParent.getElementsByClassName("cb")[0]
      cb.addEventListener("change", (e) => {
        let patchProperty;
        // if false -> true
        if (e.target.checked) {
          globalEditTrackingVariable = null //reset edit tracking var
          patchProperty = { complete: true }
          // patch "complete" property of database object using parentNode (section) ID to TRUE
          API.updateItem("tasks", `${e.target.parentNode.id.slice(1)}`, patchProperty)
            .then(() => this.buildContainers())
        } else {
          globalEditTrackingVariable = null //reset edit tracking var
          // if checkbox is unchecked...
          patchProperty = { complete: false }
          API.updateItem("tasks", `${e.target.parentNode.id.slice(1)}`, patchProperty)
            .then(() => this.buildContainers())
        }
      })
    } else {
      const checkboxes = document.querySelectorAll("input[type=checkbox]")

      //if the id of the grandparent container is #complete, then check the box
      checkboxes.forEach((checkbox) => {
        if (checkbox.parentNode.parentNode.id === "complete") {
          checkbox.checked = true
        }
        checkbox.addEventListener("change", (e) => {
          let patchProperty;
          // if false -> true
          if (e.target.checked) {
            globalEditTrackingVariable = null //reset edit tracking var
            patchProperty = { complete: true }
            // patch "complete" property of database object using parentNode (section) ID to TRUE
            API.updateItem("tasks", `${e.target.parentNode.id.slice(1)}`, patchProperty)
              .then(() => this.buildContainers())
          } else {
            // if checkbox is unchecked...
            globalEditTrackingVariable = null //reset edit tracking var
            patchProperty = { complete: false }
            API.updateItem("tasks", `${e.target.parentNode.id.slice(1)}`, patchProperty)
              .then(() => this.buildContainers())
          }
        })
      })
    }

  },

  //function used to edit tasks in DOM and patch new info to database task description and date
  editTaskListener() {
    let sections = document.querySelectorAll("section")

    // add event listener to each section
    sections.forEach(section => {
      section.addEventListener("click", (event) => {
        const target = event.target
        const id = target.parentNode.id //ID with underscore
        const numId = id.slice(1) //ID without underscore
        // check if any element is currently being edited
        if (this.editTaskManager(target, id)) {
          return // break out if true
        }
        // edit task description and update database
        if (target.classList.contains("editable--task")) {
          const taskName = target.textContent
          let tempTaskInput = `<input id="temp1" type="text" value="${taskName}">`
          $(target).replaceWith(tempTaskInput)
          const tempInput = document.querySelector("#temp1");
          tempInput.addEventListener("keydown", (event) => {
            if (event.keyCode === 13) { // activate on ENTER key
              if (tempInput.value === "") { //prevent user from adding blank field
                tempInput.value = `${taskName}`
              } else {
                globalEditTrackingVariable = null // reset edit tracking var
                const patchTask = { task: tempInput.value }
                API.updateItem("tasks", numId, patchTask) // pass new description object and section id
                  .then(() => this.buildContainers())
              }
            }
          }) // OR... edit task date and update database
        } else if (target.classList.contains("editable--date")) {
          const taskDate = target.textContent
          let tempTaskDate = `<input id="temp2" type="date" value="${taskDate}">`
          $(target).replaceWith(tempTaskDate)
          const tempDateInput = document.querySelector("#temp2");
          tempDateInput.addEventListener("change", () => { //activate on change
            if (tempDateInput.value === "") { //prevent user from adding blank field
              tempDateInput.value = `${taskDate}`
              this.buildContainers()
              globalEditTrackingVariable = null //reset edit tracking var
            } else {
              const patchDate = { dueDate: tempDateInput.value }
              API.updateItem("tasks", numId, patchDate) // pass new date object and section id
                .then(() => this.buildContainers())
              globalEditTrackingVariable = null //reset edit tracking var
            }
          })
        }
      })
    })
  },

  // determines if an item is currently being edited
  // rejects additional edit attempts
  editTaskManager(target, id) {
    // if the class is editable, proceed with the evaluation
    // (prevents any click on a section from changing global variable)
    if (target.classList.contains("editable--date") || target.classList.contains("editable--task") ) {
      if (globalEditTrackingVariable === null) {
        // change var to indicate editing in progress
        globalEditTrackingVariable = "editing";
        // enable ability to selected delete task
        this.deleteTask(id);
        return false // editing is not currently taking place
      } else {
        return true // editing is taking place
      }
    } else {
      return false
    }
  },

  deleteTask(id) {
    new comp.btn("Delete Task").render(`#${id}`)
    let buttons = document.querySelectorAll("button")
    buttons.forEach(button => {
      if (button.textContent === "Delete Task") {
        button.addEventListener("click", () => {
        globalEditTrackingVariable = null //reset edit tracking var (since you have to start editing to delete)
        const numId = id.slice(1) //ID without underscore
        API.deleteItem("tasks", numId)
          .then($(`#${id}`).remove()) //delete element from DOM
        })
      }
    })
  },

  // creates button that, on click, will create inputs for a new task and a "+" button
  newTask() {
    new comp.btn("Create New Task").render("#new--task")

    const button = document.querySelector("button")

    //button click posts new task to database and resets new task input strings
    button.addEventListener("click", () => {
      document.getElementById("new--task").innerHTML = null;
      this.createNewTask();
    })
  },

  // validate new task inputs and then save new task to database before reloading container
  createNewTask() {
    new comp.btn("Add Task").render("#new--task")
    new comp.input({ id: "input--task", type: "text", placeholder: "type new task here" }).render("#new--task")
    new comp.input({ id: "input--date", type: "date" }).render("#new--task")

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
          userId: activeUser.info().id,
        }
        API.saveItem("tasks", taskItem).then(data => {
          this.printTasks(data)
          this.cbListener(true, data) //true means single checkbox appended
          this.editTaskListener()
          document.getElementById("new--task").innerHTML = null;
          this.newTask()
        })
      }
    })
  }
}

export default buildTasks