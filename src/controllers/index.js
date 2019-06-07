const user = require('./user');
const maintenanceOrder = require('./maintenanceOrder');
const equipment = require('./equipment');
const sector = require('./sector');
const unitMeasurement = require('./unitMeasurement');
const storage = require('./storage');
const item = require('./item');
const warehouse = require('./warehouse');
const operation = require('./operation');
const component = require('./component');
const notification = require('./notification');

module.exports = {
  user,
  maintenanceOrder,
  equipment,
  sector,
  unitMeasurement,
  storage,
  item,
  warehouse,
  operation,
  component,
  notification
};