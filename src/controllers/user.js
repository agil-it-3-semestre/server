const Utils = require('../helpers/utils')
const User = require('../models').User

module.exports = {
  async retrieve(req, res){
    const {id} = req.params
    try {
      response = await User.findOne({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: "User not found" }) 
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
    const {name, email, password, role, integrationId} = req.body
    try {
      response = await User.create({
        name: name,
        email:email,
        password:password,
        role:role,
        integrationId:integrationId
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
    }
    res.json(response)
  },
  async update(req, res) {
    const {id} = req.params
    const {name, email, password, role, integrationId} = req.body
    try {
      response = await User.update({
        name: name,
        email:email,
        password:password,
        role:role,
        integrationId:integrationId
      }, { where: { id: id } })
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

    const {email, password} = req.body

    try {
      response = await User.findOne({ where: {
        email: email,
        password: password
      } })
    } catch (error) {
      res.status(500).json({ error: error.toString() })
    }

    if (Utils.verifyNotFound(response)) {
      res.status(401).json({ error: "Email or password incorrect" })
    }

    res.json(response)
  }
}
