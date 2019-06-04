const Utils = require('../helpers/utils')
const Item = require('../models').Item
const UnitMeasurement = require('../models').UnitMeasurement
const Warehouse = require('../models').Warehouse

module.exports = {
  async retrieve(req, res){
    const {id} = req.params

    try {
      response = await Item.findOne({ 
        where: {
          id: id
        },
        include: [ { model: UnitMeasurement} ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Item ${id} not found` })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await Item.findAll({ include: [ { model: UnitMeasurement} ] })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async create(req, res){
    const {description, integrationId, unitMeasurementId} = req.body
    try {
      response = await Item.create({
        description: description,
        unitMeasurementId:unitMeasurementId,
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
    const {description, integrationId, unitMeasurementId} = req.body
    try {
      response = await Item.update({
        description: description,
        unitMeasurementId: unitMeasurementId,
        integrationId: integrationId
      }, { where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response.length == 1 && response[0] == 1) {
      try {
        let item = await Item.findOne({ 
          where: {
            id: id
          },
          include: [ { model: UnitMeasurement} ]
        }) 

        res.json(item)
        return
      } catch (error) {
        //res.json({'message': `Item ${id} updated sucessfully`})
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
      let item = await Item.findOne({ where: { id: id }, include: [ { model: UnitMeasurement} ] })

      if (Utils.verifyNotFound(item)) {
        res.status(404).json({ error: `Item ${id} not found` })
        return
      }

      response = await item.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await Item.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.json({'message': `Item ${id} deleted sucessfully`})
    }

    res.json(response)
  },
  async listByStorage(req, res) {
    const {storageId} = req.params

    try {
      response = await Item.findAll({
        include: [
          {
            model: UnitMeasurement
          },
          {
            model: Warehouse,
            through: {
              where: {
                storageId: storageId
              }
            },
            required: true,
            include: [ { model: Storage }]
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
