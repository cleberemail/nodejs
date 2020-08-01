import { promises as fs } from "fs";
import { Console } from "console";

init();
var cidades = [];
var estados = [];
var cidadesEstado = [];

async function init() {

    try {

        // lendo o arquivo estado
        const dataEstado = JSON.parse(await fs.readFile('./json/Estados.json'));
        const dataCidade = JSON.parse(await fs.readFile('./json/Cidades.json'));
        let total;
        // cria um grande array de objeto resumindo cidade e estado
        dataEstado.forEach(estado => {
            total = 0;
            dataCidade.forEach(cidade => {
                if (estado.ID == cidade.Estado) {
                    cidades.push({ 'estado': estado.ID, 'uf': estado.Sigla, 'cidade': cidade.Nome });
                    cidadesEstado.push({ 'cidade': cidade.Nome });
                    total++;
                }
            });
            const obj = { "total": total, "nomes": cidadesEstado };
            fs.writeFile('./json/' + estado.Sigla + '.json', JSON.stringify(obj));
            cidadesEstado = [];
            estados.push(estado.Sigla);
        });

        //quantidadeCidade('MG');
        //estadoComMaisCidade();s
        //estadoComMenosCidade();
        //cidadeMaiorNomePorEstado();
        //cidadeMenorNomePorEstado();
        //cidadeMaiorNome();
        cidadeMenorNome();

    } catch (error) {

        console.log(error);

    }

}

// quantidade de cidade por estado
const quantidadeCidade = async (uf) => {

    try {

        // lendo o arquivo estado
        const resp = await fs.readFile('./json/' + uf.toUpperCase() + '.json');
        const data = JSON.parse(resp);
        console.log(data.nomes.length);

    } catch (error) {
        console.log(error);
    }

}

async function estadoComMaisCidade() {
    const arr = [];
    let total = 0;
    for (const estado of estados) {
        const data = JSON.parse(await fs.readFile('./json/' + estado + '.json'));
        arr.push({ 'uf': estado, 'total': data.total });
    }
    arr.sort((a, b) => {
        return (a.total < b.total) ? 1 : ((b.total < a.total) ? -1 : 0);
    });
    for (let i = 0; i < 5; i++) {
        console.log(arr[i].uf + ' - ' + arr[i].total);
        total += arr[i].total;
    }
    console.log('total: ' + total);
}

async function estadoComMenosCidade() {
    const arr = [];
    let total = 0;
    for (const estado of estados) {
        const data = JSON.parse(await fs.readFile('./json/' + estado + '.json'));
        arr.push({ 'uf': estado, 'total': data.total });
    }
    arr.sort((a, b) => {
        return (a.total > b.total) ? 1 : ((b.total > a.total) ? -1 : 0);
    });
    for (let i = 0; i < 5; i++) {
        console.log(arr[i].uf + ' - ' + arr[i].total);
        total += arr[i].total;
    }
    console.log('total: ' + total);
}

async function cidadeMaiorNomePorEstado() {
    let MaiorNome = '';
    for (const estado of estados) {
        const data = JSON.parse(await fs.readFile('./json/' + estado + '.json'));
        data.nomes.forEach(dado => {
            if (dado.cidade.length > MaiorNome.length) {
                MaiorNome = dado.cidade;
            }
        });
        console.log(`${MaiorNome} - ${estado}`);
        MaiorNome = '';
    }
}

async function cidadeMenorNomePorEstado() {
    let MenorNome = '';
    for (const estado of estados) {
        const data = JSON.parse(await fs.readFile('./json/' + estado + '.json'));
        MenorNome = data.nomes[0].cidade;
        data.nomes.forEach(dado => {
            if (dado.cidade.length < MenorNome.length) {
                MenorNome = dado.cidade;
            }
        });
        console.log(`${MenorNome} - ${estado}`);
    }
}

async function cidadeMaiorNome() {
    let maiorNome = '';
    let estadoMaiorNome = '';
    for (const estado of estados) {
        const data = JSON.parse(await fs.readFile('./json/' + estado + '.json'));
        data.nomes.forEach(dado => {
            if (dado.cidade.length > maiorNome.length) {
                maiorNome = dado.cidade;
                estadoMaiorNome = estado;
            }
        });
    }
    console.log(`cidade maior nome país: ${estadoMaiorNome} - ${maiorNome}`);
}

async function cidadeMenorNome() {
    let menorNome = '';
    let estadoMenorNome = '';
    for (const estado of estados) {
        const data = JSON.parse(await fs.readFile('./json/' + estado + '.json'));
        if (menorNome == '') {
            menorNome = data.nomes[0].cidade;
            estadoMenorNome = estado;
        }
        data.nomes.forEach(dado => {
            if (dado.cidade.length < menorNome.length) {
                menorNome = dado.cidade;
                estadoMenorNome = estado;
            }
        });
    }
    console.log(`cidade menor nome país: ${estadoMenorNome} - ${menorNome}`);
}