const Utils = require('../helpers/utils')
const UnitMeasurement = require('../models').UnitMeasurement

module.exports = {
  async retrieve(req, res){
    const {id} = req.params

    try {
      response = await UnitMeasurement.findOne({ 
        where: {
          id: id
        }
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Unit Measurement ${id} not found` })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await UnitMeasurement.findAll()
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async create(req, res){
    const {description, integrationId} = req.body
    try {
      response = await UnitMeasurement.create({
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
      response = await UnitMeasurement.update({
        description: description,
        integrationId: integrationId
      }, { where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response.length == 1 && response[0] == 1) {
      try {
        let unitMeasurement = await UnitMeasurement.findOne({ 
          where: {
            id: id
          }
        }) 

        res.json(unitMeasurement)
        return
      } catch (error) {
        //res.json({'message': `Unit Measurement ${id} updated sucessfully`})
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
      let unitMeasurement = await UnitMeasurement.findOne({ where: { id: id } })

      if (Utils.verifyNotFound(unitMeasurement)) {
        res.status(404).json({ error: `Unit Measurement ${id} not found` })
        return
      }

      response = await unitMeasurement.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await UnitMeasurement.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.json({'message': `Unit Measurement ${id} deleted sucessfully`})
    }

    res.json(response)
  }
}
