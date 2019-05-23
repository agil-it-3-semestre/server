const Utils = require('../Util')
const User = require('../app/models').user

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

module.exports = {
  async retrieve(req, res){
    try {
      response = await User.findOne({ where: { id: req.params.id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
    }
    res.json(response)
  },
  async list(req, res){
    try {
      response = await User.findAll()
    }catch(error){
      res.status(500).json({ error: error.toString() })
    }
    res.json(response)
  },
  async create(req, res){
    try {
      response = await User.create(req.body)
    }catch(error){
      res.status(500).json({ error: error.toString() })
    }
    res.json(response)
  },
  async update(req, res) {
    try {
      response = await User.update(req.body, { where: { id: req.params.id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
    }
    res.json(response)
  },
  async delete(req, res) {
    try {
      response = await User.destroy({ where: { id: req.params.id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
    }
    res.json(response)
  },
  async login(req, res) {
    let login = req.body.login
    let password = req.body.password

    try {
      response = await User.findOne({ where: {
        [Op.or]: [
          {
            name: login
          },
          {
            email: login
          }
        ],
        password: password
      } })
    } catch (error) {
      res.status(500).json({ error: error.toString() })
    }

    if (response === null || response === undefined) {
      res.status(401).json({ message: "Usuário não autenticado" })
    }

    res.json(response)
  }
}
