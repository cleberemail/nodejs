// IMPORT FILE SYSTEM
// FS - MODULO NATIVO DO NODE

// writeFile - cria e grava no arquivo
// appEndFile - cria e adiciona no fim do arquivo
// readFile - ler um arquivo (path, formato, callback(err, data))


// ---------------------------------------------------------------------------------------------------------------------
// EXEMPLO CLÁSSICO DE EVENT LOG
// ---------------------------------------------------------------------------------------------------------------------

import fs from "fs";

try {
    console.log(1);
    fs.appendFileSync('teste2.txt', 'bla bla bla\n');
    console.log(2);
    const data = fs.readFileSync('teste2.txt', 'utf-8');
    console.log(3);
    console.log(data);
    console.log(4);
} catch (error) {
    console.log(error);
}
