const componentController = require('../controllers').component;
const baseAPI='/api/v1/components'

module.exports = (app) => {
  app.get(baseAPI, componentController.list);
  app.get(baseAPI + '/:id', componentController.retrieve);
  app.post(baseAPI, componentController.create);
  app.put(baseAPI + '/:id', componentController.update);
  app.delete(baseAPI + '/:id', componentController.delete);
  app.patch(baseAPI + '/:id', componentController.updateAttributes);
}