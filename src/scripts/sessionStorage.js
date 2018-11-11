// scripts related to sessionStorage

const activeUser = {
  info () {
    let loggedInUser = JSON.parse(sessionStorage.currentUser);
      return loggedInUser;
  }
}




export default activeUser;

