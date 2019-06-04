const Utils = require('../helpers/utils')
const Operation = require('../models').Operation
const MaintenanceOrder = require('../models').MaintenanceOrder
const User = require('../models').User
const Component = require('../models').Component
const Item = require('../models').Item
const Storage = require('../models').Storage

module.exports = {
  async retrieve(req, res){
    const {id} = req.params
    try {
      response = await Operation.findOne({ 
        where: {
          id: id
        },
        include: [
          { model: MaintenanceOrder },
          { model: User, as:'Technician' },
          { model: Component },
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Operation ${id} not found` })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await Operation.findAll({
        include: [
          { model: MaintenanceOrder },
          { model: User, as:'Technician' },
          { model: Component },
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async create(req, res){
    const {description, sequence, maintenanceOrderId, timeExecuted, taskExecuted, technicianId} = req.body
    try {
      response = await Operation.create({
        description:description,
        sequence: sequence,
        maintenanceOrderId: maintenanceOrderId,
        timeExecuted: timeExecuted,
        taskExecuted: taskExecuted,
        technicianId: technicianId
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async update(req, res) {
    const {id} = req.params
    const {description, sequence, maintenanceOrderId, timeExecuted, taskExecuted, technicianId} = req.body
    try {
      response = await Operation.update({
        description:description,
        sequence: sequence,
        maintenanceOrderId: maintenanceOrderId,
        timeExecuted: timeExecuted,
        taskExecuted: taskExecuted,
        technicianId: technicianId
      }, { where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response.length == 1 && response[0] == 1) {
      try {
        let operation = await Operation.findOne({
          where: {
            id: id
          },
          include: [
            { model: MaintenanceOrder },
            { model: User, as:'Technician' },
            { model: Component },
          ]
        })

        res.json(operation)
        return
      } catch (error) {
        //res.json({'message': `Operation ${id} updated sucessfully`})
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
      let operation = await Operation.findOne({
        where: {
          id: id
        },
        include: [
          { model: MaintenanceOrder },
          { model: User, as:'Technician' },
          { model: Component },
        ]
      })

      if (Utils.verifyNotFound(operation)) {
        res.status(404).json({ error: `Operation ${id} not found` })
        return
      }

      response = await operation.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await Operation.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.json({'message': `Operation ${id} deleted sucessfully`})
    }

    res.json(response)
  },
  async listComponents(req, res) {
    const {id} = req.params
    try {
      response = await Component.findAll({
        where: {
          operationId: id
        },
        include: [
          { model: Storage },
          { model: Item }
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async retrieveComponentBySequence(req, res) {
    const {id, sequence} = req.params
    try {
      response = await Component.findOne({
        where: {
          operationId: id,
          sequence: sequence
        },
        include: [
          { model: Storage },
          { model: Item }
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Component's sequence ${sequence} not found in operation ${id}` })
      return
    }

    res.json(response)
  }
}