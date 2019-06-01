const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const models = require('./src/models');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


require('./src/routes')(app);

models.sequelize.sync().then(() => {
  app.listen(3000);
})


module.exports = app