import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, sendPasswordResetEmail ,createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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

   // Funktion zum Abrufen der IP-Adresse direkt hier
  async function getCurrentUserIP() {
    try {
        console.log('Firebase: Rufe IP-Adresse ab...');
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('Firebase: IP-Adresse erhalten:', data.ip);
        return data.ip;
    } catch (error) {
        console.warn('Firebase: IP-Adresse konnte nicht ermittelt werden:', error);
        return null;
    }
  }

  const signUp=document.getElementById('submitSignUp');
  signUp?.addEventListener('click', async (event)=>{

    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    // Prüfe zuerst ob alle Felder ausgefüllt sind

    if (!firstName || !lastName || !email || !password) {
        event.preventDefault();
        showMessage('Bitte füllen Sie alle Felder aus.', 'signUpMessage');
        return;
    }

    // Prüfe zuerst ob Zustimmung gegeben wurde (falls Checkbox sichtbar)
    const consentGroup = document.getElementById('consentGroup');
    const consentCheckbox = document.getElementById('consentCheckbox');

        // Wenn Checkbox-Bereich noch nicht sichtbar, zeige ihn an
    if (!consentGroup || consentGroup.style.display !== 'block') {
        event.preventDefault();
        if (consentGroup) {
            consentGroup.style.display = 'block';
            document.getElementById('submitSignUp').textContent = 'Registrierung abschließen';
        }
        return;
    }
    
    // Wenn Checkbox-Bereich sichtbar ist, prüfe Zustimmung
    if (!consentCheckbox.checked) {
        event.preventDefault();
        showMessage('Bitte stimmen Sie den Datenschutzbestimmungen zu.', 'signUpMessage');
        const consentError = document.getElementById('consentError');
        if (consentError) {
            consentError.style.display = 'block';
        }
        return;
    }

        // Alle Validierungen erfolgreich - verhindere Default und führe Registrierung durch
    event.preventDefault();

    try {
        const auth = getAuth();
        const db = getFirestore();

        // IP-Adresse abrufen bevor wir den Account erstellen
        const userIP = await getCurrentUserIP();
        console.log('Firebase: IP-Adresse für Registrierung:', userIP);

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        const user = userCredential.user;
        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            consent: {
                consentGiven: consentCheckbox.checked,
                consentTimestamp: new Date().toISOString(),
                consentIP: userIP
            }
        };

        console.log('Firebase: Benutzerdaten zum Speichern:', userData);

        showMessage('Account erfolgreich erstellt!', 'signUpMessage');
        
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, userData);
        
        console.log('Firebase: Benutzerdaten erfolgreich gespeichert');
        
        setTimeout(() => {
            window.location.href = 'welcome.html'; // Geändert von login.html zu welcome.html
        }, 1500);

    } catch (error) {
        console.error('Firebase: Fehler bei der Registrierung:', error);
        const errorCode = error.code;
        if (errorCode == 'auth/email-already-in-use') {
            showMessage('Email Addresse existiert bereits!!!', 'signUpMessage');
        } else {
            showMessage('Account erstellen unmöglich.. Fehler: ' + error.message, 'signUpMessage');
        }
    }
  });
   /* event.preventDefault();


    const auth=getAuth();
    const db=getFirestore();
    const database = getDatabase(); // Für Realtime Database
    //const user=auth.currentUser();

    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName: lastName
        };

            if (window.getConsentStatus) {
            userData.consent = window.getConsentStatus();
        }

        showMessage('Account erfolgreich erstellt!', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            setTimeout( () => {
            window.location.href='login.html';
            }, 1500);
        })
        .catch((error)=>{
            console.error("error writing document", error);
            showMessage('Fehler beim Speichern der Benutzerdaten', 'signUpMessage');
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
  });*/

  const signIn=document.getElementById('submitSignIn');
  signIn?.addEventListener('click', (event)=>{
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
  reset?.addEventListener("click", function(event) {
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

async function handleLogout() {
    try {
        await firebase.auth().signOut();
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Fehler beim Abmelden:', error);
    }
}

window.handleLogout = handleLogout;