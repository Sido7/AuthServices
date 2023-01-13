function signUpValidatores(req,res,next){
    if(!req.body.email || !req.body.password || !req.body.userId){
        return res.status(400).json({
            data: {},
            message: "something went wrong",
            err : "email,userId, or password is missing from the req"
        })
    }

    next()
}

module.exports = {signUpValidatores}