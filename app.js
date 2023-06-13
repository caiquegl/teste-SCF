var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();

var teste1 = require("./teste1");
var teste2 = require("./teste2");
var teste3 = require("./teste3");
var teste4 = require("./teste4");
var teste5 = require("./teste5");

function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    const tokenValue = token.slice(7);

    try {
      const decodedToken = jwt.verify(tokenValue, 'teste'); // Substitua 'suaChaveSecreta' pela sua chave secreta

      if (decodedToken.master === true) {
        next();
      } else {
        res.status(403).json({ message: 'Acesso não autorizado.' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
  } else {
    res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }
}

app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

app.get("/user", teste1.getUser);
app.get("/users", teste1.getUsers);
app.post("/users", teste2)
app.delete("/users",verificarToken, teste3)
app.put("/users",verificarToken, teste4)
app.get("/users/access", teste5);


const port  = 3000;
app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});