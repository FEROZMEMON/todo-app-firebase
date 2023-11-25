import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, Timestamp, query, where, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


const list = document.querySelector("#list");
const form = document.querySelector("#form");
const render = document.querySelector("#div");
const name = document.querySelector('#name');


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);


  } else {
    window.location = "index.html"
  }
});

let array = []

function renderpost() {
  render.innerHTML = ''
  array.map((item) => {
    render.innerHTML += `
    <ol>
    <li> ${item.lists}</li>
    </ol>
    <button type="button" id="delete" class"btn">Delete</button>
    <button type="button" id="update" class="btn">Edit</button>`
  })

  const deletes = document.querySelectorAll('#delete')
  deletes.forEach((item, index) => {
    item.addEventListener('click', async () => {
      console.log('delete called', array[index]);
      await deleteDoc(doc(db, 'lists', array[index].docid))
        .then(() => {
          // console.log('post deleted');
          array.splice(index, 1);
          renderpost()
        });
    })
  })
  const upd = document.querySelectorAll('#update')
  upd.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      console.log('update called', array[index]);
      const updatedlist = prompt('enter new Title');
      await updateDoc(doc(db, "lists", array[index].docid), {
        lists: updatedlist,
      });
      array[index].list = updatedlist;
      renderpost()

    })
  })
}


//getdata
async function getdata() {
  array = []

  const querySnapshot = await getDocs(collection(db, "lists"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    array.push({...doc.data(), docid: doc.id })
  });
  renderpost()
}
getdata()



















//adddata

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let arr = [];

  if (list.value == "") {
    alert("enter your task")
  }
  try {
    const docRef = await addDoc(collection(db, "lists"), {
      lists: list.value,
      UID: auth.currentUser.uid,
      postdate: Timestamp.fromDate(new Date())

    });

    console.log("Document written with ID: ", docRef.id);
    // list.value = "";
    getdata()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  list.value = ""
})




const logout = document.querySelector("#logout")

logout.addEventListener("click", () => {

  signOut(auth).then(() => {
    console.log("logout successfully")
    window.location = "./index.html"

  }).catch((error) => {
    console.log(error);
  });
});



