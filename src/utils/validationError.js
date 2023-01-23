const AppError = require('./appError')
const {StatusCodes} = require('http-status-codes')

class ValidationError extends AppError{
    constructor(error){
        
        let message = "not able to validate the data sent in the req"
        let explanation = []
        error.errors.forEach((err) => {
            explanation.push(err.message)
        });
       super(error.name
        ,message,
        explanation,
        StatusCodes.BAD_REQUEST
        )
    }
}


module.exports = ValidationError