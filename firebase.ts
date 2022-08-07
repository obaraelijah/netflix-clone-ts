// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH1xqYVdu0DMSb6QlNPCsVvwAd2WVZAfY",
  authDomain: "netflix-clone-ts-3789b.firebaseapp.com",
  projectId: "netflix-clone-ts-3789b",
  storageBucket: "netflix-clone-ts-3789b.appspot.com",
  messagingSenderId: "802797083237",
  appId: "1:802797083237:web:393b614e4d9003c1a5c48c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }