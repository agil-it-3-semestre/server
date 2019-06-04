const unitMeasurementController = require('../controllers').unitMeasurement;
const baseAPI='/api/v1/units-measurement'

module.exports = (app) => {
  app.get(baseAPI, unitMeasurementController.list);
  app.get(baseAPI + '/:id', unitMeasurementController.retrieve);
  app.post(baseAPI, unitMeasurementController.create);
  app.put(baseAPI + '/:id', unitMeasurementController.update);
  app.delete(baseAPI + '/:id', unitMeasurementController.delete);
  app.patch(baseAPI + '/:id', unitMeasurementController.updateAttributes);
}