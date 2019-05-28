const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./app/models').User;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


require('./routes')(app);

app.listen(3000);


module.exports = app