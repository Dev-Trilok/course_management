import React from "react";
import clsx from "clsx";
import MenuBar from "../../components/menubar/MenuBar";
import HomeIcon from "@material-ui/icons/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import NavigationDrawer from "../../components/navigationdrawer/NavigationDrawer";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";
import Students from "./pages/Students";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Staff from "./pages/Staff";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Masters from "./pages/masters/Masters";
import { makeStyles } from "@material-ui/core";
import AddMultipleStudent from "./pages/AddMultipleStudent";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    marginLeft: 0,
    marginTop: 50,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
    marginTop: 50,
  },
}));
export default function AdminDashboard({ user }) {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <div>
      <Router>
        <MenuBar
          drawerOpen={drawerOpen}
          user={user}
          setDrawerOpen={setDrawerOpen}
        />
        <NavigationDrawer
          open={drawerOpen}
          menus={Menus}
          user={user}
          setOpen={setDrawerOpen}
        ></NavigationDrawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
        >
          <div>
            <Switch>
              <Route path="/courses">
                <Courses user={user} />
              </Route>
              <Route path="/staff">
                <Staff user={user} />
              </Route>
              <Route path="/student">
                <Students user={user} />
              </Route>
              <Route path="/masters">
                <Masters user={user} />
              </Route>
              <Route path="/addMultipleStudents">
                <AddMultipleStudent />
              </Route>
              <Route path="/">
                <Dashboard user={user} />
              </Route>
            </Switch>
          </div>
        </main>
      </Router>
    </div>
  );
}
const Menus = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Courses",
    path: "/courses",
    icon: <LibraryBooksIcon />,
  },
  {
    name: "Staff",
    path: "/staff",
    icon: <SupervisorAccountIcon />,
  },
  {
    name: "Students",
    path: "/student",
    icon: <PersonIcon />,
  },
  {
    name: "Masters",
    path: "/masters",
    icon: <ListAltIcon />,
  },
];
