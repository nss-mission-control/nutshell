import activeUser from "./sessionStorage"
import API from "./apiData";

const friend = {
  addFriendMessage(){

    // console.log("active user",activeUser.info())
    // console.log("API Call",API.getAllCategory(`friends/?request_userId=${activeUser.info().id}&_expand=user`))
    // console.log("Messages API Call",API.getAllCategory(`messages/${id}&expand=user`))
    // console.log("API Call v2", API.getAllCategory(`messages/?_expand=user`))

  }

}

export default friend