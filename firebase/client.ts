import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4Nebt0KioZIfvfVUm5GTAlefKj6Xry3w",
  authDomain: "stageone-5a4b8.firebaseapp.com",
  projectId: "stageone-5a4b8",
  storageBucket: "stageone-5a4b8.firebasestorage.app",
  messagingSenderId: "361402189626",
  appId: "1:361402189626:web:20b2d1e66f4f89ed2c3203",
  measurementId: "G-S8MXNZGCNR",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
