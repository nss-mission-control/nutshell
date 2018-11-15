// Author(s): Brad Davis
// Purpose: Main file that checks sessionStorage and routes accordingly

import landingPageFuncs from "./landing";
import navBar from "./nav";
import buildMissionControl from "./missionControl";

navBar.loadNavBar();
if (sessionStorage.getItem("currentUser") === null) {
  landingPageFuncs.loadLandingPage()
} else {
  buildMissionControl.printPlanets();
}
