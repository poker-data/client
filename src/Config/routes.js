import HomePage from "../pages/HomePage";
import PlayerDashboard from "../pages/PlayerDashboard";
import TeamDashboard from "../pages/TeamDashboard";
import TournamentsPage from "../pages/TournamentsPage";
import LoginPage from "../pages/Login/LoginPage";
import GroupPage from "../pages/GroupPage";
import GroupDashboard from "../pages/GroupDashboard";
import PlayerPage from "../pages/PlayerPage";

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
    path: "/",
    component: LoginPage,
    isPrivate: false,
  }
  
];

export default routes;