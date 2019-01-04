// Author(s): Kelly Morin
// Purpose: Creates functionality to render date/time stamps in correct manner

const formatDate = {
  getCorrectDate (eventDate){
    let datearr =`${eventDate}`.substring(0,10).split("-");
    [datearr[0], datearr[1], datearr[2]] = [datearr[1], datearr[2], datearr[0]];
    let dateFormatted = datearr.join("/");
    return dateFormatted;
  },

  correctDateAndTime(eventTime){
    //Take timestamp and capture first half of string containing date, split into an array on the - element
    let datearr =`${eventTime}`.substring(0,10).split("-");
    //Take timestamp and capture second half of string containing time, split into array on the : element
    let timeArr = `${eventTime}`.substring(11,16).split(":");
    let morningEvening= "am";
    //Subtract 6 hours to account for local time
    timeArr[0] = (timeArr[0]-6)
    //If hour is greater than 12, reformat for pm
    if(timeArr[0] > 12){
      timeArr[0] = (timeArr[0]-12);
      morningEvening = "pm";
      //If hour is 0, set to midnight
    } else if(timeArr[0] === 0){
      timeArr[0] = 12;
      //If hour is less than 0, reformat to display previous day and corrected time
    } else if(timeArr[0]< 0){
      timeArr[0] = (24 + timeArr[0]);
      if(timeArr[0]> 12){
        timeArr[0] = (timeArr[0]-12)
        morningEvening = "pm"
        datearr[2] = (datearr[2]-1)
        if (datearr[2]=== 0){
          datearr[1] = (datearr[1]-1)
          let longMonth = [1,3,5,7,8,10,12]
          longMonth.forEach(month => {
            if (datearr[1] === month){
              datearr[2] = 31
            }
          })
          let shortMonth = [4,6,9,11]
          shortMonth.forEach(month => {
            if(datearr[1]=== month){
              datearr[2] = 30
            }
          })
          let february = [2]
          february.forEach(month =>{
            if(datearr[1]=== month){
              datearr[2] = 28
            }
          })
        }
      }
    }
    [datearr[0], datearr[1], datearr[2]] = [datearr[1], datearr[2], datearr[0]];
    let updatedTime = timeArr.join(":");
    timeArr = [];
    timeArr.unshift(updatedTime, morningEvening);
    let timeFormatted = `${datearr.join("/")} ${timeArr.join(" ")} `;
    return timeFormatted;
  }
}

export default formatDate

