import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./config.js"

const form = document.querySelector("#form")
const name = document.querySelector("#name")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirm = document.querySelector("#confirm")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (password.value === confirm.value) {
        
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                email.value = "";
                confirm.value = "";
                name.value = "";
                password.value = "";

                window.location = "index.html"

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              console.log(errorMessage);  
            });





    } else {
        alert("password not match")
    }
})








