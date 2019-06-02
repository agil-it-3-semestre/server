module.exports = (app) => {
  app.get('/api/v1/', (req, res) => res.status(200).send({
    message: 'Agil.It API!',
  }));

  require('./user')(app);
}