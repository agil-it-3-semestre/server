const Utils = require('../helpers/utils')
const User = require('../models').User

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

module.exports = {
  async retrieve(req, res){
    const {id} = req.params
    try {
      response = await User.findOne({ where: { id: id } })
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
    const {name, email, password, idIntegracao} = req.body
    try {
      response = await User.create({
        name: name,
        email:email,
        password:password,
        idIntegracao:idIntegracao
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
    }
    res.json(response)
  },
  async update(req, res) {
    const {id} = req.params
    try {
      response = await User.update(req.body, { where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
    }
    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await User.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
    }
    res.json(response)
  },
  async login(req, res) {

    const {login, password} = req.body

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
