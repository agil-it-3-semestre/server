const equipmentController = require('../controllers').equipment;
const baseAPI='/api/v1/equipments'

module.exports = (app) => {
  app.get(baseAPI, equipmentController.list);
  app.get(baseAPI + '/:id', equipmentController.retrieve);
  app.post(baseAPI, equipmentController.create);
  app.put(baseAPI + '/:id', equipmentController.update);
  app.delete(baseAPI + '/:id', equipmentController.delete);
  app.patch(baseAPI + '/:id', equipmentController.updateAttributes);
}