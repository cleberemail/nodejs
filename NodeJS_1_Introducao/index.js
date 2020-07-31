console.log(process.argv);
console.log('iniciando processo');
const numero = parseInt(process.argv[2]); // não precisa, porém é aconselhado converter
const multiplos = [];
for (let i = 3; i < numero; i++) {
    if ((i % 3 == 0) || (i % 5 == 0))
        multiplos.push(i);
}
console.log(multiplos);
console.log('finalizando processo');