import express from 'express';
import gradesRouter from "./routes/grades.js";          // importando o objeto roteador de grades

const app = new express();

app.use(express.json());                                // informa ao express que iremos usar json
app.use("/grades", gradesRouter);                       // associando a instancia do nosso express
global.fileName = "grades.json";                        // variavel global 

app.listen(3000, () => {
    console.log('Api Nota de Aluno Iniciada')
})