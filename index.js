
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


  // delete card function
  function deleteEvent(){
    const deleteButtons = document.querySelectorAll("i.delete");
    deleteButtons.forEach(button =>{
        button.addEventListener('click', (e) => {
            const deleteRef = doc(db, "bookmarks", button.dataset.id);
            deleteDoc(deleteRef)
            .then(()=>{
                button.parentElement.parentElement.parentElement.remove();
                })
            })
        });
  
  }
  function generateTemplate(response, id){

    return `<div class="card">
                <p class="title">${response.title}</p>
                <div class="sub-information">
                    <p>
                        <span class="category ${response.category}">${response.category[0].toUpperCase()}${response.category.slice(1)}</span>
                    </p>
                    <a href="${response.link}" target="_blank"><i class="bi bi-box-arrow-up-right website"></i></a>
                    <a href="https://www.google.com/search?q=${response.title}" target="_blank"><i class="bi bi-google search"></i></a>
                    <span><i class="bi bi-trash delete" data-id="${id}"></i></span>
                </div>
            </div>`;
}

  

  //  showing the inserted card in the html page 

  const cards = document.querySelector(".cards");
  function showCard(){
    cards.innerHTML = "";
    getDocs(colRef)
     .then(data =>{
        data.docs.forEach(document =>{
            cards.innerHTML += generateTemplate(document.data(), document.id);
        });
        deleteEvent();
     })
     .catch(error =>{
        console.log(`Error getting documents ${error}`);
     });
  }

  showCard();


// add card by insert input values 
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
        showCard();
    })
  });


// filter cards 

function filteredCards(category){

    if (category === "ALL") {
        showCard();
    } else{
        const qRef = query(colRef, where("category", "==", category.toLowerCase()));
        cards.innerHTML = "";
        getDocs(qRef)
            .then(data => {
                data.docs.forEach(document => {
                    cards.innerHTML += generateTemplate(document.data(), document.id);
                });
                deleteEvent();
            })
            .catch(error =>{
                console.log(error);
            })
    }
}

const categoryList = document.querySelector(".category-list");
const categorySpan = document.querySelectorAll(".category-list span");
categoryList.addEventListener("click", event => {
    if(event.target.tagName === "SPAN"){
        filteredCards(event.target.innerText);
        categorySpan.forEach(span => span.classList.remove("active"));
        event.target.classList.add("active");
    }
});