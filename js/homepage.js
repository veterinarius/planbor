
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut, deleteUser} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='login.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  });

//delete user
// Select the delete button
const deleteButton = document.getElementById("deleteUser");

// Handle delete user
deleteButton?.addEventListener("click", async () => {
    var question = confirm("Bist du sicher?")

    if (question) {
    try {
        // Ensure the user is signed in
        const user = auth.currentUser;

        if (!user) {
            alert("Zur Zeit ist kein Nutzer eingeloggt");
            return;
        }

        // Delete related Firestore or Realtime Database data (if applicable)
        // Example: Deleting a user document in Firestore
        const docRef=doc(db, "users", user.uid);
        await deleteDoc(docRef);

        // Delete the user's account
        await deleteUser(user)
        .then(()=>{
            window.location.href='login.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);
        });
        
        alert("Dein Nutzerkonto und deine Daten wurden erfolgreich gelöscht!");

    } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
            alert("Please reauthenticate and try again.");
            // Optionally handle reauthentication
        } else {
            console.error("Fehler beim Löschen deines Kontos:", error);
            alert("Das Löschen deines Kontos ist fehlgeschlagen!");
        }
    }
} else {
    alert("Okay");
};
});