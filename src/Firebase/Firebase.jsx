// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9oYVTRmK2Pt_xH0MTsgiqmunShQcXV1Q",
  authDomain: "donor-site.firebaseapp.com",
  projectId: "donor-site",
  storageBucket: "donor-site.appspot.com",
  messagingSenderId: "303260857813",
  appId: "1:303260857813:web:00d697b284081627f4b95c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;