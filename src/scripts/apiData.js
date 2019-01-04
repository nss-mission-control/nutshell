const URL = "https://mission-control-database.herokuapp.com/"

const API = {

  // api call to return all results in a given object
  getAllCategory(category) {
    return fetch(`${URL}${category}`)
      .then(entries => entries.json())
  },

  // api call to return results for individual id
  getOneFromCategory(category, id) {
    return fetch(`${URL}${category}/${id}`)
      .then(inputs => inputs.json())
  },

  // api call to save new user, message, friend, task, news article, etc
  saveItem(category, item) {
    return fetch(`${URL}${category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }
    ).then(jsonData => jsonData.json())
  },

  // api call to delete object from json file
  deleteItem(category, id) {
    return fetch(`${URL}${category}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  },

  //api call to edit current object
  updateItem(category, id, item){
    return fetch(`${URL}${category}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }
    )

  }
};

export default API