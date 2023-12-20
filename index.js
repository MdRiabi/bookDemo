
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
  //import the fonvctinalities provided by the firebase>firestone
  import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";


//"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
  const firebaseConfig = {
    apiKey: "AIzaSyDkWtS_mt-o0as-MbUT8eG8vR_ks3O8QCI",
    authDomain: "bookdemo-327a8.firebaseapp.com",
    projectId: "bookdemo-327a8",
    storageBucket: "bookdemo-327a8.appspot.com",
    messagingSenderId: "370023910423",
    appId: "1:370023910423:web:7cf13bb54cfe54b7ebe052"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const colRef = collection(db, "bookdemo");

  const addForm = document.querySelector(".add");
  addForm.addEventListener("submit", event =>{
    event.preventDefault();

    addDoc(colRef,{
        link: addForm.link.value,
        title: addForm.title.value,
        category: addForm.category.value,
        createAt: serverTimestamp()
    })
    .then(() =>{
        addForm.reset();
    })
  });
