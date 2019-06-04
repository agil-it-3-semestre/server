const Utils = require('../helpers/utils')
const Sector = require('../models').Sector

module.exports = {
  async retrieve(req, res){
    const {id} = req.params

    try {
      response = await Sector.findOne({ 
        where: {
          id: id
        }
      })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    
    if (Utils.verifyNotFound(response)) {
      res.status(404).json({ error: `Sector ${id} not found` })
      return
    }
    
    res.json(response)
  },
  async list(req, res){
    try {
      response = await Sector.findAll()
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }
    res.json(response)
  },
  async create(req, res){
    const {description, integrationId} = req.body
    try {
      response = await Sector.create({
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
      response = await Sector.update({
        description: description,
        integrationId: integrationId
      }, { where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response.length == 1 && response[0] == 1) {
      try {
        let sector = await Sector.findOne({ 
          where: {
            id: id
          }
        }) 

        res.json(sector)
        return
      } catch (error) {
        //res.json({'message': `Sector ${id} updated sucessfully`})
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
      let sector = await Sector.findOne({ where: { id: id } })

      if (Utils.verifyNotFound(sector)) {
        res.status(404).json({ error: `Sector ${id} not found` })
        return
      }

      response = await sector.update(req.body)
    } catch (error) {
      res.status(500).json({ error: error.toString() })
      return
    }

    res.json(response)
  },
  async delete(req, res) {
    const {id} = req.params
    try {
      response = await Sector.destroy({ where: { id: id } })
    }catch(error){
      res.status(500).json({ error: error.toString() })
      return
    }

    if (response == 1) {
      res.json({'message': `Sector ${id} deleted sucessfully`})
    }

    res.json(response)
  }
}
