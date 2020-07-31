/**
 * exportação default
 */

const variavel = "Uma variável qualquer";

const funcao_um = () => {
    console.log('função 1 ' + Math.random() * 1000);
}

const funcao_dois = (valor) => {
    console.log('função 2 ' + Math.random() * valor);
}

export default { variavel, funcao_um, funcao_dois };