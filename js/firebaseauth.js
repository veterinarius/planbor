 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import {getAuth, sendPasswordResetEmail ,createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
 
 const firebaseConfig = {
    apiKey: "AIzaSyAByt4zh9lgZwODxun8St3a83ky-iDZ9Lo",
    authDomain: "dienstplansheet.firebaseapp.com",
    databaseURL: "https://dienstplansheet-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dienstplansheet",
    storageBucket: "dienstplansheet.appspot.com",
    messagingSenderId: "204633242951",
    appId: "1:204633242951:web:980162275ae95d105ae062"
 };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }

  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();
    //const user=auth.currentUser();

    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName: lastName
        };

        showMessage('Account erfolgreich erstellt!', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='login.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Addresse existiert bereits!!!', 'signUpMessage');
        }
        else{
            showMessage('Account erstellen unmöglich..', 'signUpMessage');
        }
    })
  });

  const signIn=document.getElementById('submitSignIn');
  signIn.addEventListener('click', (event)=>{
     event.preventDefault();
     const email=document.getElementById('email').value;
     const password=document.getElementById('password').value;
     const auth=getAuth();
 
     signInWithEmailAndPassword(auth, email,password)
     .then((userCredential)=>{
         showMessage('Login erfolgreich!', 'signInMessage');
         const user=userCredential.user;
         localStorage.setItem('loggedInUserId', user.uid);
         window.location.href='welcome.html';
     })
     .catch((error)=>{
         const errorCode=error.code;
         if(errorCode==='auth/invalid-credential'){
             showMessage('Email oder Passwort falsch!', 'signInMessage');
         }
         else{
             showMessage('Account existiert nicht oder deine Anmeldedaten sind nicht korrekt!', 'signInMessage');
         }
     })
  });

  //reset
  const auth=getAuth();
  const reset = document.getElementById("reset");
  reset.addEventListener("click", function(event) {
    event.preventDefault()

    const email = document.getElementById("email").value;

    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!

    alert("Email gesendet")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Bitte gib deine Email ein!")
  });
});