const { validationResult } = require("express-validator")

const validationError = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    else {
        next()
    }
    
}

module.exports = {
    validationError
}