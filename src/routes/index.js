module.exports = (app) => {
  app.get('/api/v1/', (req, res) => res.status(200).send({
    message: 'Agil.It API!',
  }));

  require('./user')(app);
  require('./maintenanceOrder')(app);
  require('./equipment')(app);
  require('./sector')(app);
  require('./unitMeasurement')(app);
  require('./storage')(app);
  require('./item')(app);
  require('./warehouse')(app);
  require('./operation')(app);
  require('./component')(app);
}