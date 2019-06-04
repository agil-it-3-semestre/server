const storageController = require('../controllers').storage;
const warehouseController = require('../controllers').warehouse;
const itemController = require('../controllers').item;
const baseAPI='/api/v1/storages'

module.exports = (app) => {
  app.get(baseAPI, storageController.list);
  app.get(baseAPI + '/:id', storageController.retrieve);
  app.post(baseAPI, storageController.create);
  app.put(baseAPI + '/:id', storageController.update);
  app.delete(baseAPI + '/:id', storageController.delete);
  app.patch(baseAPI + '/:id', storageController.updateAttributes);
  app.patch(baseAPI + '/:storageId/itens', itemController.listByStorage);
  app.patch(baseAPI + '/:storageId/itens/:itemId', warehouseController.RetrieveByStorageItem);
}