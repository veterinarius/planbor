// Firebase Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyBNLlDNNGN5LN2CvOPsmuPyX2KEkThf-4Q",
    authDomain: "dienstplansheet.firebaseapp.com",
    databaseURL: "https://dienstplansheet-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dienstplansheet",
    storageBucket: "dienstplansheet.firebasestorage.app",
    messagingSenderId: "204633242951",
    appId: "1:204633242951:web:3ec595337f60439a5ae062",
    measurementId: "G-QNMDR3WHVD"
  };

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);

// Messaging als globale Variable definieren
const messaging = firebase.messaging();

// Debugging-Hilfsfunktionen
async function checkPrerequisites() {
    console.group('🔍 Firebase Messaging Diagnose');
    
    // 1. Überprüfe Browser-Unterstützung
    console.log('1. Überprüfe Browser-Funktionen:');
    console.log('- ServiceWorker Support:', 'serviceWorker' in navigator);
    console.log('- Push Support:', 'PushManager' in window);
    console.log('- Notification Support:', 'Notification' in window);
    
    // 2. Überprüfe Notification-Berechtigung
    const permission = await Notification.permission;
    console.log('2. Notification Berechtigung:', permission);
    
    // 3. Überprüfe Firebase Initialisierung
    try {
        firebase.initializeApp(firebaseConfig);
        console.log('3. Firebase wurde initialisiert');
    } catch (error) {
        console.error('3. Firebase Initialisierungsfehler:', error);
    }
    
    // 4. Überprüfe Service Worker
    try {
        const registration = await navigator.serviceWorker.getRegistration();
        console.log('4. Service Worker Status:', registration ? 'Registriert' : 'Nicht registriert');
        if (registration) {
            console.log('- Service Worker Scope:', registration.scope);
            console.log('- Service Worker State:', registration.active ? 'Aktiv' : 'Inaktiv');
        }
    } catch (error) {
        console.error('4. Service Worker Fehler:', error);
    }
    
    console.groupEnd();
}

// Funktion zum Anfordern der Berechtigung
async function requestPermission() {
    try {
        console.log('Berechtigung wird angefordert...');
        
        // Erst Service Worker registrieren
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registriert:', registration);

        const permission = await Notification.requestPermission();
        console.log('Notification Permission:', permission);

        if (permission === 'granted') {
            // Token abrufen
            const token = await messaging.getToken({
                vapidKey: 'Bg3pw4tHBATqu5lw4eXSLR6GVwoNCtH3DIqNXARZflQ',
                serviceWorkerRegistration: registration
            });
            console.log('FCM Token:', token);
            
            // Optional: Token an Server senden
            // await sendTokenToServer(token);
        } else {
            console.log('Keine Berechtigung erhalten');
        }
    } catch (error) {
        console.error('Fehler beim Anfordern der Berechtigung:', error);
    }
}

// Nachrichtenempfang im Vordergrund
messaging.onMessage((payload) => {
    console.log('Nachricht empfangen:', payload);
});

// Automatischer Start der Diagnose
document.addEventListener('DOMContentLoaded', checkPrerequisites);