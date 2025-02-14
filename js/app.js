if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
    console.log('POST-Anfrage empfangen:', req.body);
    res.send('POST-Anfrage erfolgreich!');
});

app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});
