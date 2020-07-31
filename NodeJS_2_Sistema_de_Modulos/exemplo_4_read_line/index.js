import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pergunta = () => {
    rl.question("Digite um número: ", x => {
        const numero = parseInt(x);
        if (numero <= 3) {
            rl.close();
        } else {
            multiplos(numero);
            pergunta();
        }
    });
};

const multiplos = (numero) => {
    const multiplos = [];
    for (let i = 3; i < numero; i++) {
        if ((i % 3 == 0) || (i % 5 == 0)) {
            multiplos.push(i);
        }
    }
    console.log('numeros', multiplos);
}

pergunta();