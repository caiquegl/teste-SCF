var data =  require("./fakeData");

const normalizeString = str => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
};

module.exports = function(req, res){
    try {
        const { name } = req.query;
        if(!name) res.status(404).send('Nenhum usuário encontrado');
    
        const normalizedSearchTerm = normalizeString(name);
        const user = data.find(user =>
          normalizeString(user.name).includes(normalizedSearchTerm)
        );
        if (user) {
         
          res.send(`Usuário foi lido ${user.view || 0}`);
        } else {
          res.status(404).send('Nenhum usuário encontrado');
        }
      } catch (error) {
        console.log(error)
        res.status(500).send('Erro ao encontrar usuário');
      }
};