import express from "express";
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    throw new Error("Error message teste");
});

app.post("/", async (req, res, next) => {
    try {
        throw new Error("Error message asyn");
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.log("error 1");
    next(err);
});

app.use((err, req, res, next) => {
    console.log("error 2");
    res.status(500).send("ocorreu um erro, tente mais tarde");
});

app.listen(3000, () => {
    console.log("Api tratamento de erro");
});