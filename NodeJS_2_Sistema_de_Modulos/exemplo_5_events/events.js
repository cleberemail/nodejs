import { EventEmitter } from "events";

const teste = new EventEmitter();

teste.on("testeEvent", obj => {
    console.log(obj);
});

teste.on("testeEvent", obj => {
    console.log(obj + " 2");
});

export default teste;