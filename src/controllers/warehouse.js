const Utils = require('../helpers/utils')
const Warehouse = require('../models').Warehouse
const Item = require('../models').Item
const Storage = require('../models').Storage

module.exports = {
  async retrieve(req, res) {
    const { storageId, itemId } = req.body

    try {
      response = await Warehouse.findOne({ 
        where: {
          itemId: itemId,
          storageId: storageId
        }
      })
    } catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({
        error: `Warehouse not found`,
        arguments: [
          {
            name: 'item',
            value: itemId
          },
          {
            name: 'storage',
            value: storageId
          }
        ]
      })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await Warehouse.findAll()
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async create(req, res){
    const { storageId, itemId, avaliableStock, reservedStock } = req.body

    try {
      response = await Warehouse.create({
        storageId: storageId,
        itemId: itemId,
        avaliableStock: avaliableStock,
        reservedStock: reservedStock
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async update(req, res) {
    const { storageId, itemId, avaliableStock, reservedStock } = req.body
    
    try {
      response = await Warehouse.update({
        storageId: storageId,
        itemId: itemId,
        avaliableStock: avaliableStock,
        reservedStock: reservedStock
      }, {
        where: {
          itemId: itemId,
          storageId: storageId
        }
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response.length == 1 && response[0] == 1) {
      try {
        let warehouse = await Warehouse.findOne({ 
          where: {
            itemId: itemId,
            storageId: storageId
          }
        }) 

        res.json(warehouse)
        return
      } catch (error) {
        res.json(response)
        return
      }
    }

    res.json(response)
  },
  async updateAttributes(req,res){
    const { storageId, itemId } = req.body
    
    try {
      let warehouse = await Warehouse.findOne({
        where: {
          itemId: itemId,
          storageId: storageId
        }
      })

      if (Utils.verifyNotFound(warehouse)) {
        res.status(404).json({
          error: `Warehouse not found`,
          arguments: [
            {
              name: 'item',
              value: itemId
            },
            {
              name: 'storage',
              value: storageId
            }
          ]
        })
        return
      }

      response = await warehouse.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const { storageId, itemId } = req.body
    
    try {
      response = await Warehouse.destroy({
        where: {
          itemId: itemId,
          storageId: storageId
        }
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.status(200).json({
        message: `Warehouse deleted`,
        arguments: [
          {
            name: 'item',
            value: itemId
          },
          {
            name: 'storage',
            value: storageId
          }
        ]
      })
    }

    res.json(response)
  },
  async RetrieveByStorageItem(req, res) {
    const {itemId, storageId} = req.params

    try {
      response = await Warehouse.findOne({
        where: {
          itemId: itemId,
          storageId: storageId
        }
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (Utils.verifyNotFound(response)) {
      res.status(404).json({
        error: `Warehouse not found`,
        arguments: [
          {
            name: 'item',
            value: itemId
          },
          {
            name: 'storage',
            value: storageId
          }
        ]
      })
      return
    }
    
    res.json(response)
  }
}
