import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import MenuBar from "../../components/menubar/MenuBar";
import NavigationDrawer from "../../components/navigationdrawer/NavigationDrawer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Courses from "./pages/Courses";
import Resources from "./pages/Resources";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Dashboard from "./pages/Dashboard";
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
export default function StudentDashboard({ user }) {
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
              <Route path="/mycourses">
                <Courses user={user} />
              </Route>
              <Route path="/resources">
                <Resources user={user} />
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
    name: "My Courses",
    path: "/mycourses",
    icon: <MenuBookIcon />,
  },
  {
    name: "Resources",
    path: "/resources",
    icon: <LibraryBooksIcon />,
  },
];
