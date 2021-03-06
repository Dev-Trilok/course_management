import React from "react";
import clsx from "clsx";
import MenuBar from "./components/menubar/MenuBar";
import NavigationDrawer from "./components/navigationdrawer/NavigationDrawer";
import {
  makeStyles,
  useMediaQuery,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
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

function App() {
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: !prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const [drawerOpen, setDrawerOpen] = React.useState(true);

  return (
    <ThemeProvider theme={theme}>
      <MenuBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <NavigationDrawer open={drawerOpen} setOpen={setDrawerOpen} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      ></main>
    </ThemeProvider>
  );
}

export default App;
