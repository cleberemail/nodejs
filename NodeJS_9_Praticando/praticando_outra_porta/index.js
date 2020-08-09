import express from "express";
const app = new express();                          // criando um objeto express
app.use(express.json());                            // informa ao node que iremos usar json
app.use(express.static("public"));                  // servindo arquivo estatico


// iniciando a porta da api
app.listen(3001, () => {

    console.log("Api Iniciada");

});