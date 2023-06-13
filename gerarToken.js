const jwt = require('jsonwebtoken');

// Define a informação que será incluída no token
const payload = {
  master: true,
  // outras propriedades podem ser adicionadas aqui, se necessário
};

// Gera o token usando a chave secreta
const token = jwt.sign(payload, 'teste'); // Substitua 'suaChaveSecreta' pela sua chave secreta

console.log('Bearer ' + token);