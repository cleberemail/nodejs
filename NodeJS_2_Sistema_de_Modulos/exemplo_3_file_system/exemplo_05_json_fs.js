import { promises as fs } from "fs";
init();

async function init() {
    try {

        // objeto com valores iniciais
        const arrayNome = ["cleber", "barbara", "helena"];
        const obj = { "nomes": arrayNome };

        // escrevendo os valores iniciais
        await fs.writeFile('teste.json', JSON.stringify(obj));

        // lendo o arquivo
        const data = JSON.parse(await fs.readFile('teste.json'));
        console.log(data);

        // adicionando conteudo no objeto json
        data.nomes.push('meg');
        console.log(data);

        // sobrescrevendo conteudo
        await fs.writeFile('teste.json', JSON.stringify(data));

    } catch (error) {

        console.log(error);

    }

}
