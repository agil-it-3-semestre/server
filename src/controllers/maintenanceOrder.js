const Utils = require('../helpers/utils')
const MaintenanceOrder = require('../models').MaintenanceOrder
const Equipment = require('../models').Equipment
const Operation = require('../models').Operation
const User = require('../models').User
const Item = require('../models').Item
const Compoenent = require('../models').Component
const UnitMeasurement = require('../models').UnitMeasurement
const Storage = require('../models').Storage
const Sector = require('../models').Sector
const Assignature = require('../models').Assignature

module.exports = {
  async retrieve(req, res){
    const {id} = req.params

    try {
      response = await MaintenanceOrder.findOne({
        where: {
          id: id
        },
        include: [
          {
            model: Operation,
            include: [
              { model: User, as: 'technician', attributes: { exclude: ['password'] } },
              { model: Compoenent, include: [
                { model: Item, include: [{model: UnitMeasurement}] },
                { model: Storage }
              ]},
            ]
          },
          { model: Equipment, include: [ { model: Sector }] },
          { model: User, as: 'responsible', attributes: { exclude: ['password'] } },
          { model: Assignature, as: 'assignatures' }
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Maintenance Order ${id} not found` })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await MaintenanceOrder.findAll({
        include: [
          {
            model: Operation,
            include: [
              { model: User, as: 'technician', attributes: { exclude: ['password'] } },
              { model: Compoenent, include: [
                { model: Item, include: [{model: UnitMeasurement}] },
                { model: Storage }
              ]}
            ]
          },
          { model: Equipment, include: [ { model: Sector }] },
          { model: User, as: 'responsible', attributes: { exclude: ['password'] } },
          { model: Assignature, as: 'assignatures' }
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async create(req, res){
    const {orderNumber,
      maintenanceType,
      stoppedEquipment,
      codeABC,
      plannedStart,
      programmedStart,
      plannedFinish,
      programmedFinish,
      status,
      priority,
      exported,
      integrationId,
      responsibleId,
      equipmentId,
      maintenanceSpot,
      note} = req.body
    try {
      response = await MaintenanceOrder.create({
        orderNumber: orderNumber,
        maintenanceType: maintenanceType,
        maintenanceSpot: maintenanceSpot,
        stoppedEquipment: stoppedEquipment,
        codeABC: codeABC,
        plannedStart: plannedStart,
        programmedStart: programmedStart,
        plannedFinish: plannedFinish,
        programmedFinish: programmedFinish,
        status: status,
        priority: priority,
        exported: exported,
        integrationId: integrationId,
        responsibleId: responsibleId,
        equipmentId: equipmentId,
        note: note
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async update(req, res) {
    const {id} = req.params
    const {orderNumber,
      maintenanceType,
      stoppedEquipment,
      codeABC,
      plannedStart,
      programmedStart,
      plannedFinish,
      programmedFinish,
      status,
      priority,
      exported,
      integrationId,
      responsibleId,
      equipmentId,
      note} = req.body
    try {
      response = await MaintenanceOrder.update({
        orderNumber: orderNumber,
        maintenanceType: maintenanceType,
        stoppedEquipment: stoppedEquipment,
        codeABC: codeABC,
        plannedStart: plannedStart,
        programmedStart: programmedStart,
        plannedFinish: plannedFinish,
        programmedFinish: programmedFinish,
        status: status,
        priority: priority,
        exported: exported,
        integrationId: integrationId,
        responsibleId: responsibleId,
        equipmentId: equipmentId,
        note: note
      }, { where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response.length == 1 && response[0] == 1) {
      try {
        let maintenanceOrder = await MaintenanceOrder.findOne({ 
          where: {
            id: id
          },
          attributes: {
            include: [
              { model: Operation,
                include: [
                  { model: User, as:'technician' },
                  { model: Compoenent, where: {operationId: id}}
                ]
              },
              { model: Equipment, include: [ { model: Sector }] },
              { model: User, as:'responsible' },
              { model: Assignature, as: 'assignatures' }
            ]
          }
        }) 

        res.json(maintenanceOrder)
        return
      } catch (error) {
        //res.json({'message': `Maintenance Order ${id} updated sucessfully`})
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
      let maintenanceOrder = await MaintenanceOrder.findOne({ where: { id: id } })

      if (Utils.verifyNotFound(maintenanceOrder)) {
        res.status(404).json({ error: `Maintenance Order ${id} not found` })
        return
      }

      response = await maintenanceOrder.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await MaintenanceOrder.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.json({'message': `Maintenance Order ${id} deleted sucessfully`})
    }

    res.json(response)
  },
  async listOperations(req, res) {
    const {id} = req.params
    try {
      response = await Operation.findAll({
        where: {
          maintenanceOrderId: id
        },
        include: [
          { model: User, as:'technician' },
          { model: Compoenent },
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async retrieveOperationBySequence(req, res) {
    const {id, sequence} = req.params
    try {
      response = await Operation.findOne({
        where: {
          maintenanceOrderId: id,
          sequence: sequence
        },
        include: [
          { model: User, as:'technician' },
          { model: Compoenent },
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Operation's sequence ${sequence} not found in maintenance order ${id}` })
      return
    }

    res.json(response)
  },
  async assignOrder(req, res) {
    const { id } = req.params
    const { userId } = req.body
    try {
      response = await Assignature.create({
        userId: userId,
        maintenanceOrderId: id
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async getAssignatures(req, res) {
    const { id } = req.params

    try {
      response = await Assignature.findAll({
        where: {
          maintenanceOrderId: id
        },
        include: [
          { model: User, attributes: { exclude: ['password'] } }
        ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  }
}
