module.exports = {
    async SafeQuery(query) {
        let response = ""
        try {
            response = await query()
        }catch(error){
            response = error
        }
        return response;
    }
}