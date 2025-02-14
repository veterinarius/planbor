/*import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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

    const app = firebase.initializeApp(firebaseConfig)
    const messaging = firebase.messaging()

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BI6glaFidcy00S8nMWgmjchQo9-pDQ7ccAEr9-xFczyO4HYKGK7qjQ38Ilm6Ei9vjwdzJo3bX9UQh4_CdezCqI4",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}
requestPermission();*/
// ... existing code ...

// Entfernen Sie diese Zeilen, da sie nicht im Service Worker funktionieren
// const app = firebase.initializeApp(firebaseConfig)
// const messaging = firebase.messaging()

// Fügen Sie stattdessen diese Service Worker-spezifische Konfiguration hinzu

// Firebase Konfiguration - Ersetzen Sie dies mit Ihren eigenen Werten aus der Firebase Console
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
importScripts('https://www.gstatic.com/firebasejs/9.4.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.3/firebase-messaging-compat.js');

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Hintergrund-Nachrichten behandeln
messaging.onBackgroundMessage((payload) => {
    console.log('Nachricht empfangen im Hintergrund:', payload);

    const notificationTitle = payload.notification.title || 'Neue Nachricht';
    const notificationOptions = {
        body: payload.notification.body || 'Sie haben eine neue Nachricht erhalten.',
        icon: '/img/icons/icon-192x192.png', // Pfad zu Ihrem Icon
        badge: '/img/icons/icon-72x72.png',       // Optional: Ein kleines Badge-Icon
        data: payload.data,                    // Zusätzliche Daten
        vibrate: [200, 100, 200]              // Vibrationsmuster
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Service Worker Installation
self.addEventListener('install', (event) => {
    console.log('Service Worker installiert');
});

// Service Worker Aktivierung
self.addEventListener('activate', (event) => {
    console.log('Service Worker aktiviert');
});

// Klick-Handler für Benachrichtigungen
self.addEventListener('notificationclick', (event) => {
    console.log('Auf Benachrichtigung geklickt');
    
    event.notification.close();

    // Optional: Öffnen Sie eine bestimmte URL beim Klick
    const urlToOpen = new URL('/', self.location.origin).href;

    event.waitUntil(
        clients.matchAll({type: 'window'}).then((windowClients) => {
            // Überprüfen, ob bereits ein Fenster geöffnet ist
            for (const client of windowClients) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // Wenn kein Fenster offen ist, öffnen Sie ein neues
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
