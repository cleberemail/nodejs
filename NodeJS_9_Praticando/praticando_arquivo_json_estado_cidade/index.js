import { promises as fs } from "fs";


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

        quantidadeCidade('MG');
        estadoComMaisCidade();

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
    for (const estado of estados) {
        const data = JSON.parse(await fs.readFile('./json/' + estado.toUpperCase() + '.json'));
        arr.push({ 'uf': estado.uf.toUpperCase(), 'total': data.total });
    }
    arr.sort((a, b) => {
        return (a.total > b.total) ? 1 : ((b.total > a.total) ? -1 : 0);
    });
    for (let i = 0; i < 5; i++) {
        console.log(arr[i].uf + ' - ' + await quantidadeCidade(arr[i].uf));
    }
}

async function estadoComMenosCidade() {
    const arr = [];
    for (const estado of estados) {
        const data = JSON.parse(await fs.readFile('./json/' + estado.uf.toUpperCase() + '.json'));
        arr.push({ 'uf': estado.uf.toUpperCase(), 'total': data.total });
    }
    arr.sort((a, b) => {
        return (a.total > b.total) ? 1 : ((b.total > a.total) ? -1 : 0);
    });
    for (let i = 0; i < 5; i++) {
        console.log(arr[i].uf + ' - ' + await quantidadeCidade(arr[i].uf));
    }
}