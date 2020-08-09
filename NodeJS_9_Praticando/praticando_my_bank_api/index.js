import express from "express";                                          // importando o express
import accountsRouter from "./routes/accounts.js";                      // importando o objeto roteador de accounts, como
import { promises as fs } from "fs";                                    // importando filesystem, importando com Promises
import winston from "winston";                                          // ferramenta para gravação de log
import cors from "cors";                                                // ferramenta para liberar a api ser acessa de outro servido
import swaggerUi from "swagger-ui-express";                             // documentação
import { swaggerDocument } from "./doc.js";

const { readFile, writeFile } = fs;                                     // chamando o metodo especifico
const app = new express();                                              // criando um objeto express
app.use(express.json());                                                // informa ao node que iremos usar json
app.use("/account", accountsRouter);                                    // associando a instancia do nosso express
app.use(express.static("public"));                                      // servindo arquivo estatico
app.use(cors());                                                        // permite acesso da api através de outro servidor globalmente
global.fileName = "accounts.json";                                      // variavel global 

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));     // servindo documentação

// criando log
const { combine, timestamp, label, printf } = winston.format;
const meuFormato = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.meulog = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "meu-app-api.log" }),
    ],
    format: combine(
        label({ label: "meu-app-api" }),
        timestamp(),
        meuFormato
    )
});

// iniciando a porta da api
app.listen(3000, async () => {

    try {
        await readFile(global.fileName).then(() => {
            // mensagem informando que a API foi iniciada
            global.meulog.info('Api iniciada!');
        });
    } catch (error) {
        // estrutura inicial
        const initialJson = {
            nextId: 1,
            accounts: []
        }
        await writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
            // mensagem informando que a API foi iniciada
            global.meulog.info('Api iniciada - Arquivo JSON criado!');
        }).catch(err => {
            global.meulog.error(err);
        });
    }

});