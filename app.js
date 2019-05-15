const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', require('./routes'));

app.listen(3000);

module.exports = app