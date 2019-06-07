const Utils = require('../helpers/utils')
const Notification = require('../models').Notification
const User = require('../models').User

module.exports = {
  async retrieve(req, res){
    const {id} = req.params

    try {
      response = await Notification.findOne({ 
        where: {
          id: id
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
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Notification ${id} not found` })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await Notification.findAll({
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
  },
  async create(req, res){
    const {description, icon, redirection, userId} = req.body
    try {
      response = await Notification.create({
        description: description,
        icon: icon,
        redirection: redirection,
        userId: userId
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async update(req, res) {
    const {id} = req.params
    const {description, icon, redirection, userId} = req.body
    try {
      response = await Notification.update({
        description: description,
        icon: icon,
        redirection: redirection,
        userId: userId
      }, {
        where: {
          id: id
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

    if (response.length == 1 && response[0] == 1) {
      try {
        let notification = await Notification.findOne({ 
          where: {
            id: id
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

        res.json(notification)
        return
      } catch (error) {
        //res.json({'message': `Notification ${id} updated sucessfully`})
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
      let notification = await Notification.findOne({
        where: {
          id: id
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

      if (Utils.verifyNotFound(notification)) {
        res.status(404).json({ error: `Notification ${id} not found` })
        return
      }

      response = await notification.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await Notification.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.json({'message': `Notification ${id} deleted sucessfully`})
    }

    res.json(response)
  }
}
