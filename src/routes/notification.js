const notificationController = require('../controllers').notification;
const baseAPI='/api/v1/notifications'

module.exports = (app) => {
  app.get(baseAPI, notificationController.list);
  app.get(baseAPI + '/:id', notificationController.retrieve);
  app.post(baseAPI, notificationController.create);
  app.put(baseAPI + '/:id', notificationController.update);
  app.delete(baseAPI + '/:id', notificationController.delete);
  app.patch(baseAPI + '/:id', notificationController.updateAttributes);
}