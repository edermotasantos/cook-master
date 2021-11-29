require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;
