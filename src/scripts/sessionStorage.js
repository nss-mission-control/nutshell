// Author(s): Jase Hackman
// Purpose: Incorporation of sessionStorage to a call with json parsing due to object storage

const activeUser = {
  info () {
    let loggedInUser = JSON.parse(sessionStorage.currentUser);
      return loggedInUser;
  }
}




export default activeUser;
