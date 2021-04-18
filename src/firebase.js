import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDZWDIcAsr64rjEoOodQduHwkfI1cXTa10",
  authDomain: "course-manage.firebaseapp.com",
  projectId: "course-manage",
  storageBucket: "course-manage.appspot.com",
  messagingSenderId: "733324725166",
  appId: "1:733324725166:web:330fc3a4035bb95226d63f",
  measurementId: "G-DF9VH3182Q",
};
const FirebaseApp = firebase.initializeApp(firebaseConfig);

export default FirebaseApp;
