var data =  require("./fakeData");

const normalizeString = str => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const getUser = (req, res, next) => {
  try {
    const { name } = req.query;

    if(!name) res.status(404).send('Nenhum usuário encontrado');

    const normalizedSearchTerm = normalizeString(name);
    const indexUser = data.findIndex(user =>
      normalizeString(user.name).includes(normalizedSearchTerm)
    );

    if (indexUser > -1) {
      let view = data[indexUser].view || 0
      data[indexUser] = {...data[indexUser], view: view + 1}
      res.send(data[indexUser]);
    } else {
      res.status(404).send('Nenhum usuário encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao encontrar usuário');
  }
};

const getUsers = ( req, res, next ) => {
    
    res.send(data);
    
};

module.exports = {
    getUser,
    getUsers
};