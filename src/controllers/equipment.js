const Utils = require('../helpers/utils')
const Equipment = require('../models').Equipment
const Sector = require('../models').Sector

module.exports = {
  async retrieve(req, res){
    const {id} = req.params

    try {
      response = await Equipment.findOne({ 
        where: {
          id: id
        },
        include: [ { model: Sector} ]
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Equipment ${id} not found` })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await Equipment.findAll({ include: [ { model: Sector} ] })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async create(req, res){
    const {description, integrationId, sectorId} = req.body
    try {
      response = await Equipment.create({
        description: description,
        sectorId:sectorId,
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
    const {description, integrationId, sectorId} = req.body
    try {
      response = await Equipment.update({
        description: description,
        sectorId:sectorId,
        integrationId:integrationId
      }, { where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response.length == 1 && response[0] == 1) {
      try {
        let equipment = await Equipment.findOne({ 
          where: {
            id: id
          },
          include: [ { model: Sector} ]
        }) 

        res.json(equipment)
        return
      } catch (error) {
        //res.json({'message': `Equipment ${id} updated sucessfully`})
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
      let equipment = await Equipment.findOne({ where: { id: id } })

      if (Utils.verifyNotFound(equipment)) {
        res.status(404).json({ error: `Equipment ${id} not found` })
        return
      }

      response = await equipment.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await Equipment.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.json({'message': `Equipment ${id} deleted sucessfully`})
    }

    res.json(response)
  }
}
