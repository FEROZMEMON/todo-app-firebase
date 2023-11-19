import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIISJ1LfRtiKFlx--IixN1h7hiJVK-Tdk",
  authDomain: "todo-list-726.firebaseapp.com",
  projectId: "todo-list-726",
  storageBucket: "todo-list-726.appspot.com",
  messagingSenderId: "806539189216",
  appId: "1:806539189216:web:55d2b7be435fc1b6152985",
  measurementId: "G-L0CHHTRJGT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);