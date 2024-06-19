import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCwnvo1X5rM0DH0VQQSzZEPZwghuP7g3KM",
  authDomain: "restaurant-18f89.firebaseapp.com",
  databaseURL: "https://restaurant-18f89-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "restaurant-18f89",
  storageBucket: "restaurant-18f89.appspot.com",
  messagingSenderId: "449452220871",
  appId: "1:449452220871:web:87eaec11e9842efc9139e2"
};

  const app =getApps.length>0? getApps(): initializeApp(firebaseConfig);

  const db=getFirestore(app);
  const auth = getAuth();
  const storage = getStorage(app);

  export { db, auth, storage };