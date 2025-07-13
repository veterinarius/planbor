const firebaseConfig = {
    // Ihre Firebase-Konfiguration
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();