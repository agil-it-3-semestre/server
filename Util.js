module.exports = {
    async SafeQuery(query) {
        let response = ""
        try {
            response = await query()
        }catch(error){
            return error
        }
        return response;
    },
    async SendResponse(query, res, successStatus) {
        console.log('entrou sendResponse  ',typeof query());
        
        let response = await this.SafeQuery(query())
        console.log('response',response);
        if (response instanceof Error) {
            res.status(500).json({ error: error.toString() });
        } else {
            res.status(successStatus | 200).json(response);
        }
    }
}