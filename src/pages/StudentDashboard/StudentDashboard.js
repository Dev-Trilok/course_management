import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import MenuBar from "../../components/menubar/MenuBar";
import NavigationDrawer from "../../components/navigationdrawer/NavigationDrawer";
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
      <MenuBar
        drawerOpen={drawerOpen}
        user={user}
        setDrawerOpen={setDrawerOpen}
      />
      <NavigationDrawer open={drawerOpen} user={user} setOpen={setDrawerOpen} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        Student Dashboard
      </main>
    </div>
  );
}
