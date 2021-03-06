import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider } from "reactfire";
const firebaseConfig = {
  apiKey: "AIzaSyDZWDIcAsr64rjEoOodQduHwkfI1cXTa10",
  authDomain: "course-manage.firebaseapp.com",
  projectId: "course-manage",
  storageBucket: "course-manage.appspot.com",
  messagingSenderId: "733324725166",
  appId: "1:733324725166:web:330fc3a4035bb95226d63f",
  measurementId: "G-DF9VH3182Q",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
