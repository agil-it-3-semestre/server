const userController = require('../controllers').user;

module.exports = (app) => {
  app.get('/api/v1/users', userController.list);
  app.get('/api/v1/users/:id', userController.retrieve);
  app.post('/api/v1/users', userController.create);
  app.put('/api/v1/users/:id', userController.update);
  app.delete('/api/v1/users/:id', userController.delete);
  app.post('/api/v1/login', userController.login);
}