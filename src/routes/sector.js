const sectorController = require('../controllers').sector;
const baseAPI='/api/v1/sectors'

module.exports = (app) => {
  app.get(baseAPI, sectorController.list);
  app.get(baseAPI + '/:id', sectorController.retrieve);
  app.post(baseAPI, sectorController.create);
  app.put(baseAPI + '/:id', sectorController.update);
  app.delete(baseAPI + '/:id', sectorController.delete);
  app.patch(baseAPI + '/:id', sectorController.updateAttributes);
}