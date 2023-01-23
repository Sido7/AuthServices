const {StatusCodes} = require('http-status-codes')


 
class AppError extends Error {
    constructor(
        name = "AppsError",
        message = "Something Went Wrong",
        explanation = "Something Went Wrong",
        statusCode = StatusCodes.BAD_REQUEST
        ){
            super()
            this.name = name,
            this.message = message,
            this.explanation = explanation,
            this.statusCode = statusCode
        }
        
}

// const checked = new AppError()

// console.log(checked)

module.exports = AppError