import HomePage from "../pages/HomePage";
import SinPath from "../components/playerStats/SinPath";
import PlayerDashboard from "../pages/PlayerDashboard";
import TeamDashboard from "../pages/TeamDashboard";
import TournamentsPage from "../pages/TournamentsPage";
import LoginPage from "../pages/Login/LoginPage";
import GroupPage from "../pages/GroupPage";
import GroupDashboard from "../pages/GroupDashboard";
import PlayerPage from "../pages/PlayerPage";
import AdminDashboard from "../components/users/AdminDashboard";

const routes = [
  {
    path: "/home",
    component: HomePage,
    isPrivate: true,
  },
  {
    path: "/players",
    component: PlayerPage,
    isPrivate: true,
  },
  {
    path: "/groups",
    component: GroupPage,
    isPrivate: true,
  },
  {
    path: "/playerdashboard",
    component: PlayerDashboard,
    isPrivate: true,
  },
  {
    path: "/groupdashboard",
    component: GroupDashboard,
    isPrivate: true,
  },
  {
    path: "/teamdashboard",
    component: TeamDashboard,
    isPrivate: true,
  },
  {
    path: "/tournaments",
    component: TournamentsPage,
    isPrivate: true,
  },
  {
    path: "/admindashboard",
    component: AdminDashboard,
    isPrivate: true,
  },
  {
    path: "/",
    component: LoginPage,
    isPrivate: false,
  },

  
  /* ,
  {
    path: "*",
    component: SinPath,
    isPrivate: false,
  } */
];

export default routes;