import { promises as fs, writeFile } from "fs";

init();

const times = [];

async function init() {

    try {

        // lendo o arquivo brasileirao
        const resp = await fs.readFile('2003.json');
        const data = JSON.parse(resp);

        // inicializando array de times
        data[0].partidas.forEach(partida => {
            times.push({ time: partida.mandante, pontuacao: 0 });
            times.push({ time: partida.visitante, pontuacao: 0 });
        });

        data.forEach(rodada => {
            rodada.partidas.forEach(partida => {
                const timeMandante = times.find(item => item.time === partida.mandante);
                const timeVisitante = times.find(item => item.time === partida.visitante);

                if (partida.placar_visitante > partida.placar_mandante) {
                    timeVisitante.pontuacao += 3;
                } else if (partida.placar_visitante < partida.placar_mandante) {
                    timeMandante.pontuacao += 3;
                } else {
                    timeVisitante.pontuacao += 1;
                    timeMandante.pontuacao += 1;
                }
            });
        });

        times.sort((a, b) => b.pontuacao - a.pontuacao);

        salvaTimes();
        salvaQuatroPrimeiros();

        console.log(times);

    } catch (error) {

        console.log('Error: ' + error);

    }

}

async function salvaTimes() {
    try {
        await fs.writeFile("times.json", JSON.stringify(times, null, 2));
    } catch (error) {
        console.log('Error: ' + error);
    }
}

async function salvaQuatroPrimeiros() {
    try {
        await fs.writeFile("times.json", JSON.stringify(times.slice(0, 4), null, 2));
    } catch (error) {
        console.log('Error: ' + error);
    }
}