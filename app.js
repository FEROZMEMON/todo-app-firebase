import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./config.js"


const form = document.querySelector("#form")
const email = document.querySelector("#email")
const password = document.querySelector("#password")


form.addEventListener("submit", (event) => {

  event.preventDefault();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {

      const user = userCredential.user;
      console.log(user);

      window.location = "home.html"

    })
    .catch((error) => {
      alert("invalid login")
    });

});



















