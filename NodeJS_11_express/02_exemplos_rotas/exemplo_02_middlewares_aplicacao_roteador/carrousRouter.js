import express from "express";

const router = new express.Router();

router.use((req, res, next) => {
    console.log('modulo carros');
    next();
});

router.get("/", (req, res) => {
    res.send("GET / Carros");
});

router.get("/consulta", (req, res) => {
    res.send("GET / Carros consultas");
});

export default router;