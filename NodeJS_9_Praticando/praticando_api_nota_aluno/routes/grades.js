import express from "express";          // importa o express
import { promises as fs } from "fs";    // importando filesystem, importando com Promises

const { readFile, writeFile } = fs;     // chamando o metodo especifico
const router = express.Router();        // objeto roteador

// get 

router.get('/', async (req, res, next) => {

    try {

        let dados = await readFile(global.fileName);
        let json = JSON.parse(dados);
        delete json.nextId;
        res.send(json);

    } catch (error) {

        next(error);

    }

});

// get/id

router.get('/:id', async (req, res, next) => {

    try {

        let dados = JSON.parse(await readFile(global.fileName));
        const grade = dados.grades.find(aux => aux.id === parseInt(req.params.id));
        res.send(grade);

    } catch (error) {

        next(error);

    }

});

// post

router.post('/', async (req, res, next) => {

    try {

        let aux = req.body;
        let dados = await readFile(global.fileName);
        let json = JSON.parse(dados);

        if (!aux.student || !aux.subject || !aux.type || aux.value == null) {
            throw new Error("Student, Subject, Type e Value are not null");
        }

        aux = {
            "id": json.nextId,
            "student": aux.student,
            "subject": aux.subject,
            "type": aux.type,
            "value": aux.value,
            "timestamp": new Date()
        };
        json.nextId = json.nextId + 1;
        json.grades.push(aux);

        await writeFile(global.fileName, JSON.stringify(json, null, 4)).then(() => {
            res.send(aux);
        }).catch(error => {
            next(error);
        });

    } catch (error) {

        next(error);

    }

});

// post nota

router.post('/nota', async (req, res, next) => {

    try {

        const aux = req.body;
        const dados = JSON.parse(await readFile(global.fileName));

        if (!aux.student || !aux.subject) {
            throw new Error("Student e Subject são obrigatórios");
        }

        const notas = dados.grades.filter(nota => {
            if (nota.student === aux.student && nota.subject == aux.subject) {
                return true;
            }
            return false;
        });

        const total = notas.reduce((acumulador, atual) => {
            return acumulador = acumulador + atual.value;
        }, 0);

        res.send(`Total: ${total}`);

    } catch (error) {

        next(error);

    }

});

// post media

router.post('/media', async (req, res, next) => {

    try {

        const aux = req.body;
        const dados = JSON.parse(await readFile(global.fileName));

        if (!aux.subject || !aux.type) {
            throw new Error("Student e Type são obrigatórios");
        }

        const notas = dados.grades.filter(nota => {
            if (nota.subject == aux.subject && nota.type == aux.type) {
                return true;
            }
            return false;
        });

        const total = notas.reduce((acumulador, atual) => {
            return acumulador = acumulador + atual.value;
        }, 0);

        res.send(`Total: ${total} Número: ${notas.length} Média ${total / notas.length}`);

    } catch (error) {

        next(error);

    }

});

// post melhor nota

router.post('/melhornota', async (req, res, next) => {

    try {

        const aux = req.body;
        const dados = JSON.parse(await readFile(global.fileName));

        if (!aux.subject || !aux.type) {
            throw new Error("Student e Type são obrigatórios");
        }

        const notas = dados.grades.filter(nota => {
            if (nota.subject == aux.subject && nota.type == aux.type) {
                return true;
            }
            return false;
        });

        notas.sort((a, b) => (a.value < b.value) ? 1 : (a.value > b.value) ? - 1 : 0);

        const arr = [];
        for (let i = 0; i < (notas.length > 3 ? 3 : notas.length); i++) {
            arr.push(notas[i]);
        }

        res.send(arr);

    } catch (error) {

        next(error);

    }

});

// put

router.put('/', async (req, res, next) => {

    try {

        let aux = req.body;
        let dados = JSON.parse(await readFile(global.fileName));
        let indice = dados.grades.findIndex(grade => grade.id === parseInt(aux.id));

        if (!aux.student || !aux.subject || !aux.type || aux.value == null) {
            throw new Error("Student, Subject, Type e Value são obrigatórios");
        } else if (indice === -1) {
            throw new Error("Registro não encontrado");
        }

        aux = {
            "id": aux.id,
            "student": aux.student,
            "subject": aux.subject,
            "type": aux.type,
            "value": aux.value,
            "timestamp": new Date()
        };

        dados.grades[indice] = aux;

        await writeFile(global.fileName, JSON.stringify(dados, null, 4)).then(() => {
            res.send(dados.grades[indice]);
        }).catch(error => {
            next(error);
        });

    } catch (error) {

        next(error);

    }

});

// delete

router.delete('/:id', async (req, res, next) => {

    try {

        let dados = JSON.parse(await readFile(global.fileName));
        dados.grades = dados.grades.filter(grade => grade.id !== parseInt(req.params.id));

        await writeFile(global.fileName, JSON.stringify(dados, null, 4)).then(() => {
            res.send(dados);
        }).catch(error => {
            next(error);
        });

    } catch (error) {

        next(error);

    }

});


router.use((error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

export default router;                  // exportando o objeto roteador como default