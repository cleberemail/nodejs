import express from "express";          // importa o express
import { promises as fs } from "fs";    // importando filesystem, importando com Promises
import cors from "cors";                // ferramenta para liberar a api ser acessa de outro servido

const { readFile, writeFile } = fs;     // chamando o metodo especifico
const router = express.Router();        // objeto roteador

router.post('/', async (req, res, next) => {

    try {

        let conta = req.body;
        let dados = await readFile(global.fileName);
        let json = JSON.parse(dados);

        if (!conta.nome || conta.saldo == null) {
            throw new Error("Nome e saldo são obrigatórios");
        }

        conta = {
            "id": json.nextId,
            "nome": conta.nome,
            "saldo": conta.saldo
        };
        json.nextId = json.nextId + 1;
        json.accounts.push(conta);

        await writeFile(global.fileName, JSON.stringify(json, null, 4)).then(() => {
            global.meulog.info(`POST /account - ${JSON.stringify(conta)}`);
            res.send(json);
        }).catch(error => {
            next(error);
        });

    } catch (error) {

        next(error);

    }

});

router.get('/', cors(), async (req, res, next) => {

    try {

        let dados = await readFile(global.fileName);
        let json = JSON.parse(dados);
        delete json.nextId;
        global.meulog.info(`GET /`);
        res.send(json);

    } catch (error) {

        next(error);

    }

});

router.get('/:id', async (req, res, next) => {

    try {

        // let dados = await readFile(global.fileName);
        // let json = JSON.parse(dados);
        // const conta = json.accounts.find(conta => {
        //     if (conta.id === parseInt(req.params.id)) {
        //         return true;
        //     }
        //     return false;
        // });

        let dados = JSON.parse(await readFile(global.fileName));
        const conta = dados.accounts.find(conta => conta.id === parseInt(req.params.id));
        global.meulog.info(`GET /account/id - ${JSON.stringify(conta)}`);
        res.send(conta);

    } catch (error) {

        next(error);

    }

});


router.delete('/:id', async (req, res, next) => {

    try {

        let dados = JSON.parse(await readFile(global.fileName));
        dados.accounts = dados.accounts.filter(conta => conta.id !== parseInt(req.params.id));

        await writeFile(global.fileName, JSON.stringify(dados, null, 4)).then(() => {
            global.meulog.info(`DELETE /${req.params.id}`);
            res.send(dados);
        }).catch(error => {
            next(error);
        });

    } catch (error) {

        next(error);

    }

});

router.put('/', async (req, res, next) => {

    try {

        let atualiza = req.body;
        let dados = JSON.parse(await readFile(global.fileName));
        let indice = dados.accounts.findIndex(conta => conta.id === parseInt(atualiza.id));

        if (indice === -1) {
            throw new Error("Registro não encontrado");
        } else if (!atualiza.id || !atualiza.nome || atualiza.saldo == null) {
            throw new Error("ID, Nome e Saldo são obrigatórios");
        }

        dados.accounts[indice].nome = atualiza.nome;
        dados.accounts[indice].saldo = atualiza.saldo;

        await writeFile(global.fileName, JSON.stringify(dados, null, 4)).then(() => {
            global.meulog.info(`PUT /${JSON.stringify(atualiza)}`);
            res.send(dados);
        }).catch(error => {
            next(error);
        });

    } catch (error) {

        next(error);

    }

});

router.patch("/atualizaSaldo", async (req, res, next) => {
    try {

        const novo = req.body;
        const dados = JSON.parse(await readFile(global.fileName));
        const indice = dados.accounts.findIndex(conta => conta.id === parseInt(novo.id));

        if (indice === -1) {
            throw new Error("Registro não encontrado");
        } else if (novo.saldo == null) {
            throw new Error("Saldo são obrigatórios");
        }

        dados.accounts[indice].saldo = novo.saldo;

        await writeFile(global.fileName, JSON.stringify(dados, null, 4)).then(() => {
            global.meulog.info(`PATCH /${JSON.stringify(dados.accounts[indice])}`);
            res.send(dados.accounts[indice]);
        }).catch(error => {
            next(error);
        });

    } catch (error) {

        next(error);

    }
});

router.use((error, req, res, next) => {
    global.meulog.error(`${req.method} ${req.baseUrl} ${error.message}`);
    res.status(400).send({ error: error.message });
});

// exportando o objeto roteador como default, 
// desta forma posso usar o nome que eu quiser 
// quando for expotar o objeto roteador
export default router;
