module.exports = {
    verifyNotFound(value) {
        if (value === null || value === undefined) {
            return true
        }
        return false
    }
}