const maintenanceOrderController = require('../controllers').maintenanceOrder;
const baseAPI='/api/v1/maintenance-orders'

module.exports = (app) => {
  app.get(baseAPI, maintenanceOrderController.list);
  app.get(baseAPI + '/:id', maintenanceOrderController.retrieve);
  app.post(baseAPI, maintenanceOrderController.create);
  app.put(baseAPI + '/:id', maintenanceOrderController.update);
  app.delete(baseAPI + '/:id', maintenanceOrderController.delete);
  app.patch(baseAPI + '/:id', maintenanceOrderController.updateAttributes);
  app.get(baseAPI + '/:id/operations', maintenanceOrderController.listOperations);
  app.get(baseAPI + '/:id/operations/:sequence', maintenanceOrderController.retrieveOperationBySequence);
  app.post(baseAPI + '/:id/assign', maintenanceOrderController.assignOrder);
  app.get(baseAPI + '/:id/assignatures', maintenanceOrderController.getAssignatures);
}