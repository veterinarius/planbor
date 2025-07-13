// PDF Icon als Base64-String
const pdfIconUrl = '/img/icons/pdf-icon.jpg';

// PDF Dokumente Array
const pdfDocuments = [
    {
        title: "Urlaubsantrag",
        description: "Urlaubsantrag",
        fileName: "Urlaubsantrag.pdf",
        fileSize: "188 KB",
        uploadDate: "2025-02-14",
        category: "Antrag",
        url: "/pdfs/Urlaubsantrag.pdf" // Pfad zu Ihrem PDF
    },
    {
        title: "Antrag auf Erstattung von Fahrtkosten und Zeitvergütung für dienstliche Veranstaltungen",
        description: "Antrag Fahrtkostenerstattung",
        fileName: "AntragFahrtkostenerstattung.pdf",
        fileSize: "16 KB",
        uploadDate: "2025-02-14",
        category: "Antrag",
        url: "/pdfs/AntragFahrtkostenerstattung.pdf" // Pfad zu Ihrem PDF
    },
    {
        title: "Mitteilung einer Mehrfachbeschäftigung",
        description: "Mehrfachbeschäftigung",
        fileName: "AbfrageMehrfachbeschäftigung.pdf",
        fileSize: "209 KB",
        uploadDate: "2025-02-17",
        category: "Antrag",
        url: "/pdfs/AbfrageMehrfachbeschaeftigung.pdf" // Pfad zu Ihrem PDF
    },
    {
        title: "Sicherheitshinweise für die Arbeitsplätze in der Schlachttier- und Fleischuntersuchung",
        description: "Arbeitsplatzsicherheit",
        fileName: "Sicherheit1.pdf",
        fileSize: "1.1 MB",
        uploadDate: "2025-02-13",
        category: "Merkblatt",
        url: "/pdfs/Sicherheit1.pdf" // Pfad zu Ihrem PDF
    },
    {
        title: "Merkblatt Jährliche Belehrung Infektionskrankheiten",
        description: "Merkblatt Infektionskrankheiten",
        fileName: "MerkblattInfektionskrankheiten.pdf",
        fileSize: "942 KB",
        uploadDate: "2025-02-13",
        category: "Merkblatt",
        url: "/pdfs/MerkblattInfektionskrankheiten.pdf"
    },
    {
        title: "Belehrung zum Arbeitsschutz",
        description: "Arbeitsschutz",
        fileName: "BelehrungArbeitsschutz.pdf",
        fileSize: "217 KB",
        uploadDate: "2025-02-13",
        category: "Belehrung",
        url: "/pdfs/BelehrungArbeitsschutz.pdf"
    },
    {
        title: "Bestätigung über die Belehrung gemäß Infektionsschutzgesetz",
        description: "Infektionsschutz",
        fileName: "BestaetigungBelehrungInfektionsschutzgesetz.pdf",
        fileSize: "360 KB",
        uploadDate: "2025-02-13",
        category: "Belehrung",
        url: "/pdfs/BestaetigungBelehrungInfektionsschutzgesetz.pdf"
    }, // Fügen Sie hier weitere Dokumente hinzu
];

// Funktion zum Anzeigen der PDFs
function displayPDFs(documents) {
    const pdfList = document.getElementById('pdfList');
    pdfList.innerHTML = ''; // Liste leeren

    documents.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'pdf-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg';
        
        card.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <h3 class="text-xl font-semibold mb-2">${doc.title}</h3>
                    <p class="text-gray-600 mb-4">${doc.description}</p>
                    <div class="text-sm text-gray-500">
                        <p>Größe: ${doc.fileSize}</p>
                        <p>Kategorie: ${doc.category}</p>
                        <p>Hochgeladen: ${formatDate(doc.uploadDate)}</p>
                    </div>
                </div>
                <div class="ml-4">
                    <img src="${pdfIconUrl}" alt="Image" class="w-12 h-12 opacity-75">
                </div>
            </div>
            <div class="mt-4 flex justify-end">
                <button 
                    onclick="handleDownload(event, '${doc.url}', '${doc.fileName}')"
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                    Download
                </button>
            </div>
        `;
        
        pdfList.appendChild(card);
    });
}

// Datum formatieren
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('de-DE', options);
}

// Suchfunktion
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredDocs = pdfDocuments.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.description.toLowerCase().includes(searchTerm) ||
        doc.category.toLowerCase().includes(searchTerm)
    );
    displayPDFs(filteredDocs);
});

// Initial PDFs anzeigen
displayPDFs(pdfDocuments);


function sortDocuments(criteria) {
    const sortedDocs = [...pdfDocuments].sort((a, b) => {
        switch(criteria) {
            case 'date':
                return new Date(b.uploadDate) - new Date(a.uploadDate);
            case 'name':
                return a.title.localeCompare(b.title);
            case 'size':
                return parseFloat(b.fileSize) - parseFloat(a.fileSize);
            default:
                return 0;
        }
    });
    displayPDFs(sortedDocs);
}

function handleDownload(event, url, fileName) {
    event.preventDefault();
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Für mobile Geräte: Download statt Öffnen erzwingen
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                // Blob URL erstellen
                const blobUrl = window.URL.createObjectURL(blob);
                
                // Download-Link erstellen
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = fileName;
                link.setAttribute('type', 'application/octet-stream');
                
                // Link zum DOM hinzufügen und klicken
                document.body.appendChild(link);
                link.click();
                
                // Aufräumen
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
            })
            .catch(error => {
                console.error('Download fehlgeschlagen:', error);
                // Fallback: Direkter Link
                window.location.href = url;
            });
    } else {
        // Desktop-Verhalten bleibt unverändert
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
