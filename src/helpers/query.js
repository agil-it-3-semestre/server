module.exports = {
  async SafeQuery(query) {
    try {
      console.log('tipo: ' + typeof query);
      console.log('query: ' + query);
      
      return await query()
    } catch(error) {
      return error
    }
  },
  async SendResponse(query, res, successStatus) {
      
      let response = await this.SafeQuery(query())
      
      if (response instanceof Error) {
          res.status(500).json({ error: response.toString() })
      } else {
          res.status(successStatus | 200).json(response)
      }
  }
}