const itemController = require('../controllers').item;
const warehouseController = require('../controllers').warehouse;
const storageController = require('../controllers').storage;
const baseAPI='/api/v1/itens'

module.exports = (app) => {
  app.get(baseAPI, itemController.list);
  app.get(baseAPI + '/:id', itemController.retrieve);
  app.post(baseAPI, itemController.create);
  app.put(baseAPI + '/:id', itemController.update);
  app.delete(baseAPI + '/:id', itemController.delete);
  app.patch(baseAPI + '/:id', itemController.updateAttributes);
  app.patch(baseAPI + '/:itemId/storages', storageController.listByItem);
  app.patch(baseAPI + '/:itemId/storages/:storageId', warehouseController.RetrieveByStorageItem);
}