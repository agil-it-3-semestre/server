const Utils = require('../helpers/utils')
const User = require('../models').User
const Notification = require('../models').Notification

module.exports = {
  async retrieve(req, res){
    const {id} = req.params

    try {
      response = await User.findOne({ 
        where: {
          id: id
        },
        attributes: {
          exclude: ['password']
        }
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `User ${id} not found` })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await User.findAll({ attributes: { exclude: ['password'] } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
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
      return
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
      return
    }

    if (response.length == 1 && response[0] == 1) {
      try {
        let user = await User.findOne({ 
          where: {
            id: id
          },
          attributes: {
            exclude: ['password']
          }
        }) 

        res.json(user)
        return
      } catch (error) {
        //res.json({'message': `User ${id} updated sucessfully`})
        res.json(response)
        return
      }
    }

    res.json(response)
  },
  async updateAttributes(req,res){
    let response = {}

    const {id} = req.params

    try {
      let user = await User.findOne({ where: { id: id } })

      if (Utils.verifyNotFound(user)) {
        res.status(404).json({ error: `User ${id} not found` })
        return
      }

      response = await user.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await User.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.json({'message': `User ${id} deleted sucessfully`})
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
      return
    }

    if (Utils.verifyNotFound(response)) {
      res.status(401).json({ error: "Email or password incorrect" })
      return
    }

    res.json(response)
  },
  async getUserNotifications(req, res) {
    
    const {id} = req.params
    
    try {
      response = await Notification.findAll({
        where: {
          userId:id
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password']
            }
          }
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  }
}
