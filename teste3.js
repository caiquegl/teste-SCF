var data = require("./fakeData");

const normalizeString = str => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
};

module.exports = function (req, res) {
    try {
        
        const { name } = req.query
        
        if(!name) res.status(404).send('Nenhum usuário encontrado');
    
        const normalizedSearchTerm = normalizeString(name);
    
        var index = data.findIndex(user => normalizeString(user.name) === normalizedSearchTerm);
    
        if (index !== -1) {
            data.splice(index, 1);
            res.send("success");
        } else {
            res.status(404).send("Usuário não encontrado");
        }
    } catch (error) {
        res.status(500).send('Erro ao deletar usuário');   
    }
};
