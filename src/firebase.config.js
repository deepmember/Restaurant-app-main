import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIiUWZepmhh8HXwZpa_2gz-WIEex4fklA",
  authDomain: "food-delivery-app-22aff.firebaseapp.com",
  databaseURL: "https://food-delivery-app-22aff-default-rtdb.firebaseio.com",
  projectId: "food-delivery-app-22aff",
  storageBucket: "food-delivery-app-22aff.appspot.com",
  messagingSenderId: "214270264797",
  appId: "1:214270264797:web:34840cfe80c0f181376234",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
