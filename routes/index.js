const userController = require('../controllers').user;

const User = require('../app/models').User

module.exports = (app) => {
  app.get('/api/v1/', (req, res) => res.status(200).send({
    message: 'Agil.It API!',
  }));

  app.get('/api/v1/users', userController.list);
  app.post('/api/v1/login', userController.login);
}