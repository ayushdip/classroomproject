import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE4tOUPsVReQfI53GvN28yRJgjc28X02I",
  authDomain: "classroomproject-fe770.firebaseapp.com",
  projectId: "classroomproject-fe770",
  storageBucket: "classroomproject-fe770.appspot.com",
  messagingSenderId: "955655825149",
  appId: "1:955655825149:web:d735e8b896d223cd320094",
  measurementId: "G-VMJX9PNZEQ"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
