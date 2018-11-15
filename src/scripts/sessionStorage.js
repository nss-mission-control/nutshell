// Author(s): Jase Hackman
// Purpose: Incorporation of sessionStorage to a call with json parsing due to object storage

const activeUser = {

  // grabs info from session storage and returns parsed data
  // in future, we will only store an id, not an object
  info () {
    let loggedInUser = JSON.parse(sessionStorage.currentUser);
      return loggedInUser;
  }
}




export default activeUser;
