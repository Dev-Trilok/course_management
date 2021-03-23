import React, { Children } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    borderColor: "#00000061",
    borderWidth: 1,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

export default function NavigationDrawer({ open, user, children, menus }) {
  const classes = useStyles();
  const createMenus = menus.map((val) => (
    <MenuItem item={val} key={val.path} />
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}></div>
        <Divider />
        {createMenus}
        {children}
      </Drawer>
    </div>
  );
}

function MenuItem({ item }) {
  return (
    <ListItem button component={Link} to={item.path}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  );
}
