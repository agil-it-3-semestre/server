const warehouseController = require('../controllers').warehouse;
const baseAPI='/api/v1/warehouses'

module.exports = (app) => {
  app.get(baseAPI, warehouseController.list);
  app.post(baseAPI + '/get', warehouseController.retrieve);
  app.post(baseAPI, warehouseController.create);
  app.put(baseAPI, warehouseController.update);
  app.post(baseAPI + '/delete', warehouseController.delete);
  app.patch(baseAPI, warehouseController.updateAttributes);
}