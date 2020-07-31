import ev from './events.js';

ev.on("testeEvent", obj => {
    console.log('ouviu também');
});

ev.emit("testeEvent", "bla bla bla");