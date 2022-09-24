import HomePage from "../pages/HomePage";
import SinPath from "../components/playerStats/SinPath";
import PlayerDashboard from "../pages/PlayerDashboard";
import TeamDashboard from "../pages/TeamDashboard";
import RoomDashboard from "../pages/RoomDashboard";
import LoginPage from "../pages/Login/LoginPage";

const routes = [
  {
    path: "/home",
    component: HomePage,
    isPrivate: false,
  },
  {
    path: "/playerdashboard",
    component: PlayerDashboard,
    isPrivate: false,
  },
  {
    path: "/teamdashboard",
    component: TeamDashboard,
    isPrivate: false,
  },
  {
    path: "/roomdashboard",
    component: RoomDashboard,
    isPrivate: false,
  },
  {
    path: "/",
    component: LoginPage,
    isPrivate: false,
  }/* ,
  {
    path: "*",
    component: SinPath,
    isPrivate: false,
  } */
];

export default routes;