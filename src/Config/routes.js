import HomePage from "../pages/HomePage";
import SinPath from "../components/playerStats/SinPath";
const routes = [
  {
    path: "/home",
    component: HomePage,
    isPrivate: false,
  },
  {
    path: "*",
    component: SinPath,
    isPrivate: false,
  }
];

export default routes;