const Utils = require('../helpers/utils')
const Component = require('../models').Component
const Storage = require('../models').Storage
const Item = require('../models').Item

module.exports = {
  async retrieve(req, res){
    const {id} = req.params
    try {
      response = await Component.findOne({ 
        where: {
          id: id
        },
        include: [
          { model: Storage },
          { model: Item },
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Component ${id} not found` })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await Component.findAll({
        include: [
          { model: Storage },
          { model: Item },
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async create(req, res){
    const {quantityItem, sequence, operationId, storageId, itemId} = req.body
    try {
      response = await Component.create({
        quantityItem: quantityItem,
        sequence: sequence,
        operationId: operationId,
        storageId: storageId,
        itemId: itemId
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async update(req, res) {
    const {id} = req.params
    const {quantityItem, sequence, operationId, storageId, itemId} = req.body
    try {
      response = await Component.update({
        quantityItem: quantityItem,
        sequence: sequence,
        operationId: operationId,
        storageId: storageId,
        itemId: itemId
      }, { where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response.length == 1 && response[0] == 1) {
      try {
        let component = await Component.findOne({ 
          where: {
            id: id
          },
          include: [
            { model: Storage },
            { model: Item },
          ]
        }) 

        res.json(component)
        return
      } catch (error) {
        //res.json({'message': `Component ${id} updated sucessfully`})
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
      let component = await Component.findOne({
        where: {
          id: id
        },
        include: [
          { model: Storage },
          { model: Item },
        ]
      })

      if (Utils.verifyNotFound(component)) {
        res.status(404).json({ error: `Component ${id} not found` })
        return
      }

      response = await component.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await Component.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.json({'message': `Component ${id} deleted sucessfully`})
    }

    res.json(response)
  }
}