import HomePage from "../pages/HomePage";
import SinPath from "../components/playerStats/SinPath";
import InfoPage from "../pages/InfoPage";
const routes = [
  {
    path: "/home",
    component: HomePage,
    isPrivate: false,
  },
  {
    path: "/info",
    component: InfoPage,
    isPrivate: false,
  },
  {
    path: "*",
    component: SinPath,
    isPrivate: false,
  }
];

export default routes;