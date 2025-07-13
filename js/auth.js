import { getAuth, signOut } from "firebase/auth";

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    const auth = getAuth();

    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                await signOut(auth);
                window.location.href = '/login.html';
            } catch (error) {
                console.error('Logout error:', error);
                alert('Fehler beim Abmelden. Bitte versuchen Sie es erneut.');
            }
        });
    }

    // Überprüfen des Auth-Status
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = '/login.html';
        }
    });
});