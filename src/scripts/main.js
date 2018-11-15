// Author(s): Brad Davis
// Purpose: Main file that checks sessionStorage and routes accordingly

import landingPageFuncs from "./landing";
import navBar from "./nav";
import buildMissionControl from "./missionControl";

navBar.loadNavBar();
// checks if there is currently a user logged in and either loads mission control or login
// this functionality only exists if the login and register new user password inputs are not set to type: password
if (sessionStorage.getItem("currentUser") === null) {
  landingPageFuncs.loadLandingPage()
} else {
  buildMissionControl.printPlanets();
}
