const express = require('express');
const User = require('./app/models').user;


const app = express();

app.use(express.urlencoded({ extended: false }));
User.create({ name: 'Marcio', email: 'marcio@teste.com.br', password: '123456' });

app.listen(3000);

app.get('/users', async (req, res) => {
    let users = await User.findAll()
    res.json(users);
});

app.post('/users', async (req, res) => {
  let user = await User.create(req.body);
  res.json(user);
});

app.get('/users/:id', async (req, res) => {
    let user = await User.findOne({ where: {id: req.params.id} })
    res.json(user);
});

app.put('/users/:id', async (req, res) => {
    let user = await User.update(req.body,{ where: {id: req.params.id} })
    res.json(user);
});

app.delete('/users/:id', async (req, res) => {
    let user = await User.destroy({ where: {id: req.params.id} })
    res.json(user);
});
