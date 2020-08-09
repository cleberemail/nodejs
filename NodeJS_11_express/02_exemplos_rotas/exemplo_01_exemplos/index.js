import express from "express";
const app = new express();
app.use(express.json());

// ---------------------------------------------------------------------------------------------------------------------
// all
// ---------------------------------------------------------------------------------------------------------------------

app.all('/testeAll', (req, res) => {
    res.send('Teste All ' + req.method);
});

// ---------------------------------------------------------------------------------------------------------------------
// caracteres especiais
// ---------------------------------------------------------------------------------------------------------------------

app.get("/teste?", (req, res) => {
    res.send("/teste?");
});

app.get("/testi+", (req, res) => {
    res.send("/testi+");
});

app.get("/testa*Blue", (req, res) => {
    res.send(req.path);
});

app.post("/testan(do)?", (req, res) => {
    console.log(req.body);
    res.send("/testan(do)");
});

app.get(/.*red$/, (req, res) => {
    res.send("qualquer coisa red");
});

// ---------------------------------------------------------------------------------------------------------------------
// parametros na rota
// ---------------------------------------------------------------------------------------------------------------------

app.get("/testParam/:a/:b?", (req, res) => {
    res.send(req.params.a + req.params.b);
});

// ---------------------------------------------------------------------------------------------------------------------
// parametros via query
// ---------------------------------------------------------------------------------------------------------------------

app.get("/testQuery", (req, res) => {
    res.send(req.query);
});

// ---------------------------------------------------------------------------------------------------------------------
// parametro next
// ---------------------------------------------------------------------------------------------------------------------

app.get("/testMultipleHandlers", (req, res, next) => {
    console.log("Callback 1");
    next();
}, (req, res) => {
    console.log("Callback 2");
    // res.send('finalizado');
    res.end();
});

const callback1 = (req, res, next) => {
    console.log("Callback 1")
    next();
};

const callback2 = (req, res, next) => {
    console.log("Callback 2")
    next();
};

const callback3 = (req, res, next) => {
    console.log("Callback 3")
    res.send('finalizado');
};

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);

// ---------------------------------------------------------------------------------------------------------------------
// route
// ---------------------------------------------------------------------------------------------------------------------

app.route("/testeRoute")
    .get((req, res) => { res.send(req.method) })
    .post((req, res) => { res.send(req.method) })
    .delete((req, res) => { res.send(req.method) })
    .put((req, res) => { res.send(req.method) })

app.listen(3000, () => {
    console.log('Api UP');
})