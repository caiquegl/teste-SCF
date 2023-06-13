var data =  require("./fakeData");

module.exports =  function(req, res) {
    try {
        
        const { id } =  req.query;
        const { name, job } = req.body;

        const indexUser = data.findIndex((d) => d.id == id);

        if (indexUser < 0) return res.status(404).send("Usuário não encontrado");
        
        var oldValues = data[indexUser]

        data[indexUser] = {
            name: name || oldValues.name,
            job: job || oldValues.job,
            id: oldValues.id
        }
    
        res.status(500).send(data[indexUser]);   
    } catch (error) {
        res.status(500).send('Erro ao atualizar usuário');   
    }

};