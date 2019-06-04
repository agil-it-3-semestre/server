const operationController = require('../controllers').operation;
const baseAPI='/api/v1/operations'

module.exports = (app) => {
  app.get(baseAPI, operationController.list);
  app.get(baseAPI + '/:id', operationController.retrieve);
  app.post(baseAPI, operationController.create);
  app.put(baseAPI + '/:id', operationController.update);
  app.delete(baseAPI + '/:id', operationController.delete);
  app.patch(baseAPI + '/:id', operationController.updateAttributes);
  app.get(baseAPI + '/:id/components', operationController.listComponents);
  app.get(baseAPI + '/:id/components/:sequence', operationController.retrieveComponentBySequence);
}