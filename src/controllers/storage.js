const Utils = require('../helpers/utils')
const Storage = require('../models').Storage

module.exports = {
  async retrieve(req, res){
    const {id} = req.params

    try {
      response = await Storage.findOne({ 
        where: {
          id: id
        }
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Storage ${id} not found` })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await Storage.findAll()
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async create(req, res){
    const {description, integrationId} = req.body
    try {
      response = await Storage.create({
        description: description,
        integrationId: integrationId
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async update(req, res) {
    const {id} = req.params
    const {description, integrationId} = req.body
    try {
      response = await Storage.update({
        description: description,
        integrationId: integrationId
      }, { where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response.length == 1 && response[0] == 1) {
      try {
        let storage = await Storage.findOne({ 
          where: {
            id: id
          }
        }) 

        res.json(storage)
        return
      } catch (error) {
        //res.json({'message': `Storage ${id} updated sucessfully`})
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
      let storage = await Storage.findOne({ where: { id: id } })

      if (Utils.verifyNotFound(storage)) {
        res.status(404).json({ error: `Storage ${id} not found` })
        return
      }

      response = await storage.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await Storage.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.json({'message': `Storage ${id} deleted sucessfully`})
    }

    res.json(response)
  },
  async listByItem(req, res) {
    const {itemId} = req.params

    try {
      response = await Storage.findAll({
        include: [
          {
            model: Warehouse,
            through: {
              where: {
                itemId: itemId
              }
            },
            required: true,
            include: [ { model: Item }]
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
