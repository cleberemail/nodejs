import express from "express";
import carrosRouter from "./carrousRouter.js";

const app = new express();
app.use(express.json());
app.use("/carros", carrosRouter);

// ---------------------------------------------------------------------------------------------------------------------
// executado sempre, independente da requisição
// ---------------------------------------------------------------------------------------------------------------------

app.use((req, res, next) => {
    console.log(new Date());
    next();
});

app.get('/teste1', (req, res) => {
    res.send('teste 1');
});

app.get('/teste2', (req, res) => {
    res.send('teste 2');
});

app.listen(3000, () => {
    console.log('Exemplo 02');
});