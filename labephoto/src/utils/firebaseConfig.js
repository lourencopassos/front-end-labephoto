import firebase from "@firebase/app";
import "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQQl2bGP9oE-uhmW9dZzTN23TJPRgU-dc",
  projectId: "labephoto-9f8c7",
  storageBucket: "labephoto-9f8c7.appspot.com",    
};
export const storageRef = firebase
  .initializeApp(firebaseConfig)
  .storage()
  .ref();