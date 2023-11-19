import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


const list = document.querySelector("#list");
const form = document.querySelector("#form");
const div = document.querySelector("#div");


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = "index.html"
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let arr = [];
    
    if(list.value == "" ){ 
        alert("enter your task")
    }
    try {
        const docRef = await addDoc(collection(db, "lists"), {
            list: list.value,
            UID: auth.currentUser.uid
        });

        console.log("Document written with ID: ", docRef.id);
        list.value = "";
        arr.push()
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
console.log(arr);







});























const logout = document.querySelector("#logout")

logout.addEventListener("click", () => {

    signOut(auth).then(() => {
        console.log("logout successfully")
        window.location = "./index.html"

    }).catch((error) => {
        console.log(error);
    });
});



