
const formatDate = {
  getCorrectDate (eventDate){
    let datearr =`${eventDate}`.substring(0,10).split("-");
    [datearr[0], datearr[1], datearr[2]] = [datearr[1], datearr[2], datearr[0]];
    let dateFormatted = datearr.join("/");
    return dateFormatted;
  },

  getCorrectTime(eventTime){
    let timeArr = `${eventTime}`.substring(11,16).split(":");
    let morningEvening= "am";
    if(timeArr[0] > 12){
      timeArr[0] = (timeArr[0]-12);
      morningEvening = "pm";
    } else if(timeArr[0] === 0){
      timeArr[0] = 12;
    }else{
      timeArr[0] = timeArr[0].substring(1);
    }
    let updatedTime = timeArr.join(":");
    timeArr = [];
    timeArr.unshift(updatedTime, morningEvening);
    let timeFormatted = timeArr.join(" ");
    return timeFormatted;
  }
}

export default formatDate

