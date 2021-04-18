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
import SignIn from "./pages/signin/SignIn";
import StaffDashboard from "./pages/staffdashboard/StaffDashboard";
import StudentDashboard from "./pages/studentdashboard/StudentDashboard";
import AdminDashboard from "./pages/admindashboard/AdminDashboard";
import UserContext from "./context/UserContext";
import FirebaseApp from "./firebase";
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
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      updateUser(foundUser);
      setUser(foundUser);
    }
  }, []);

  const updateUser = (foundUser) => {
    const db = FirebaseApp.firestore();
    db.collection("users")
      .where("username", "==", foundUser.username)
      .where("password", "==", foundUser.password)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty)
          querySnapshot.forEach((doc) => {
            localStorage.setItem("user", JSON.stringify(doc.data()));
            setUser(doc.data());
          });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  if (!user)
    return (
      <ThemeProvider theme={theme}>
        <SignIn setUser={setUser} />
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        {user.role === "staff" && <StaffDashboard user={user} />}
        {user.role === "admin" && <AdminDashboard user={user} />}
        {user.role === "student" && <StudentDashboard user={user} />}
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
