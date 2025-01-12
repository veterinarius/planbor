// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyAByt4zh9lgZwODxun8St3a83ky-iDZ9Lo",
    authDomain: "dienstplansheet.firebaseapp.com",
    databaseURL: "https://dienstplansheet-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dienstplansheet",
    storageBucket: "dienstplansheet.appspot.com",
    messagingSenderId: "204633242951",
    appId: "1:204633242951:web:980162275ae95d105ae062"
};

// Firebase initialisieren
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, deleteUser } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Beispiel-Benutzerdaten
const email = "example@example.com";
const password = "password123";

// Funktion zum Anmelden des Benutzers
function signIn() {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Anmeldung erfolgreich:", userCredential.user);
        })
        .catch((error) => {
            console.error("Fehler bei der Anmeldung:", error.message);
        });
}

// Funktion zum Löschen des Benutzerkontos
function deleteUser() {
    const user = auth.currentUser;

    if (user) {
        deleteUser(user)
            .then(() => {
                console.log("Benutzerkonto erfolgreich gelöscht.");
            })
            .catch((error) => {
                console.error("Fehler beim Löschen des Benutzerkontos:", error.message);
            });
    } else {
        console.error("Kein Benutzer angemeldet.");
    }
}
