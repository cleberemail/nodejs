import { promises as fs } from "fs";

console.log(1);
fs.appendFile('teste3.txt', 'bla bla bla\n').then(() => {
    console.log(2);
    fs.readFile('teste3.txt', 'utf-8').then(data => {
        console.log(3);
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}).catch(err => {
    console.log(err);
});
console.log(4);