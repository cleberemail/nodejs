import { promises as fs } from "fs";

init();

async function init() {
    try {

        console.log(1);
        await fs.writeFile('teste3.txt', 'bla bla bla\n');
        console.log(2);
        await fs.appendFile('teste3.txt', 'ble ble ble');
        console.log(3);
        const data = await fs.readFile('teste3.txt', 'utf-8');
        console.log(4);
        console.log(data);
        console.log(5);

    } catch (error) {

        console.log(error);

    }

}
