import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHsV6r1GekCMRt_ZXgS_wlW7G31pUIE5M",
  authDomain: "book-app-e4992.firebaseapp.com",
  databaseURL: "https://book-app-e4992-default-rtdb.firebaseio.com",
  projectId: "book-app-e4992",
  storageBucket: "book-app-e4992.appspot.com",
  messagingSenderId: "94946529274",
  appId: "1:94946529274:web:3af91f525e7282ddc41e43",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
