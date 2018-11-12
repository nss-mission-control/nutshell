import activeUser from "./sessionStorage"
import API from "./apiData";

const friend = {
  addFriendMessage(){
    console.log("active user",activeUser.info())
    console.log("API Call",API.getAllCategory(`friends/?request_userId=${activeUser.info().id}&_expand=request_userId`))

  }

}

export default friend