var data = require("./fakeData");

module.exports = function (req, res) {
  try {
    const { name, job } = req.body;

    if (!name || !job) return res.status(400).send('Falta o nome ou o job do usuário');
    

    var newUser = {
      name,
      job,
      id: data.length + 1
    };

    data.push(newUser);

    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao criar usuário');
  }
};
