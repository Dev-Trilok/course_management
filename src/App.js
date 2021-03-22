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
import SignIn from "./pages/SignIn/SignIn";
import StaffDashboard from "./pages/StaffDashboard/StaffDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
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
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  if (!user)
    return (
      <ThemeProvider theme={theme}>
        <SignIn setUser={setUser} />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      {user.role === "staff" && <StaffDashboard user={user} />}
      {user.role === "admin" && <AdminDashboard user={user} />}
      {user.role === "student" && <StudentDashboard user={user} />}
    </ThemeProvider>
  );
}

export default App;
