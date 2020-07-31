// IMPORT FILE SYSTEM
// FS - MODULO NATIVO DO NODE

// writeFile - cria e grava no arquivo
// appEndFile - cria e adiciona no fim do arquivo
// readFile - ler um arquivo (path, formato, callback(err, data))

// ---------------------------------------------------------------------------------------------------------------------
// EXEMPLO CLÁSSICO DE EVENT LOG
// ---------------------------------------------------------------------------------------------------------------------

import fs from "fs";
console.log(1);
fs.appendFile('teste.txt', "bla bla bla inicial\n", (err) => {
    console.log(2);
    if (err) {
        console.log('erro: ' + err);
    } else {
        fs.appendFile('teste.txt', "bla bla bla secundario\n", (err) => {
            if (err) {
                console.log('erro: ' + err);
            } else {
                fs.readFile('./teste.txt', 'utf-8', (err, data) => {
                    if (err) {
                        console.log('erro: ' + err);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
    }
});
console.log(3);
