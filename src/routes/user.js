const userController = require('../controllers').user;
const baseAPI='/api/v1/users'

module.exports = (app) => {
  app.get(baseAPI, userController.list);
  app.get(baseAPI + '/:id', userController.retrieve);
  app.post(baseAPI, userController.create);
  app.put(baseAPI + '/:id', userController.update);
  app.delete(baseAPI + '/:id', userController.delete);
  app.patch(baseAPI + '/:id', userController.updateAttributes);
  app.get(baseAPI + '/:id/notifications', userController.getUserNotifications);
  app.post('/api/v1/login', userController.login);
}