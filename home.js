import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc , getDocs , Timestamp , query, where, doc, deleteDoc , updateDoc  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


const list = document.querySelector("#list");
const form = document.querySelector("#form");
const maindiv = document.querySelector("#div");
const names = document.querySelector('#name');
const uid = document.querySelector('#uid');


onAuthStateChanged(auth,async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);

        const q = query(collection(db, "list"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            names.innerHTML = doc.data().name
            profileImage.src = doc.data().profileUrl
            uid.innerHTML = doc.data().uid
        });


    } else {
        window.location = "index.html"
    }
});

let array = []
function renderpost(){
  maindiv.innerHTML = ''
  array.map((item) =>{
    maindiv.innerHTML += `
    <ol>
    <li> ${item.lists}</li>
    </ol>
    <button type="button" id="delete" class"btn">Delete</button>
    <button type="button" id="update" class="btn">Edit</button>`  
  })

  const deletes = document.querySelectorAll('#delete')
  deletes.forEach((item, index) => {
    item.addEventListener('click',  async () => {
      console.log('delete called', array[index]);
      await deleteDoc(doc(db, 'list', array[index].docid))
      .then(() => {
                  console.log('post deleted');
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
        await updateDoc(doc(db, "post", array[index].docid), {
          list: updatedlist,
        });
        array[index].list = updatedlist;
        renderpost()

    })
})
}
  
//getdata
async function getdata(){
    array = []
    
    const querySnapshot = await getDocs(collection(db, "list"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    array.push({...doc.data(), docid: doc.id})
  });
  renderpost()
  }
  getdata()
  
  

















//adddata

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let arr = [];
    
    if(list.value == "" ){ 
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



