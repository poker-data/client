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
    isPrivate: true,
  },
  {
    path: "/playerdashboard",
    component: PlayerDashboard,
    isPrivate: true,
  },
  {
    path: "/teamdashboard",
    component: TeamDashboard,
    isPrivate: true,
  },
  {
    path: "/roomdashboard",
    component: RoomDashboard,
    isPrivate: true,
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