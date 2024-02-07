const express = require('express')
const app = express()
const port = 2800

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Funzione che crea un numero variabile di file
function generateFiles(dirPath, numFiles) {
    for (let i = 0; i < numFiles; i++) {
        const filename = `${uuidv4()}.jpg`; // Genero un nome del file a caso
        const filePath = path.join(dirPath, filename);
        // Faccio in modo che il file sia voluminoso (1MB - 10MB) con dati a caso
        const fileSize = Math.floor(Math.random() * (10 - 1 + 1) + 1) * 1024 * 1024; // voglio che la misura del file casuale sia tra 1 e 10mb
        const buffer = Buffer.alloc(fileSize, Math.random().toString(36).substring(2)); // Riempio il contenuto con dati casuali
        fs.writeFileSync(filePath, buffer);
    }
}

// controllare UUID

// Funzione per creare cartelle annidate con file casuali
function createDirectoryStructure(rootDir, depth, maxFilesPerDir) {
    if (depth <= 0) return;

    const numDirs = Math.floor(Math.random() * 5) + 1; // chiamo un numero di sottocartelle variabile (1-5)
    for (let i = 0; i < numDirs; i++) {
        const dirName = `dir_${uuidv4().substring(0, 8)}`; // Usando UUID creo un nome a caso per la cartella
        const dirPath = path.join(rootDir, dirName);
        fs.mkdirSync(dirPath); 
        generateFiles(dirPath, Math.floor(Math.random() * maxFilesPerDir) + 1); // creo file a caso dentro la cartella
        createDirectoryStructure(dirPath, depth - 1, maxFilesPerDir);
    }
}

// Principale funzione che creerà dei dati temporanei nei file
function createTestData(rootDir, depth, maxFilesPerDir) {
    fs.mkdirSync(rootDir);
    generateFiles(rootDir, Math.floor(Math.random() * maxFilesPerDir) + 1); // creo file randomici nella cartella indicata nella root
    createDirectoryStructure(rootDir, depth, maxFilesPerDir);
}

// COSTANTI UTILI E RICORRENTI
const rootDir = './temp_data';
const depth = 3; // Numero massimo di livelli di file annidati per cartella (ex cartella 1 ha al suo interno cartella 2 che al suo interno ha cartella 3 SENZA PIù ALTRE CARTELLE ANNIDATE)
const maxFilesPerDir = 5; // numero massimo di file tollerati in una cartella

createTestData(rootDir, depth, maxFilesPerDir);
console.log(`Temporary file data created in: ${rootDir}`);
