const express = require('express');
const bodyParser = require('body-parser');

const User = require('./app/models').user;

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//User.create({name:"marcio",email:"marcio@teste.com",password:"1234"})

require('./routes')(app);

app.listen(3000);

module.exports = app