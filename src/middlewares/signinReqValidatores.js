function signinValidatores(req,res,next){
    if(!req.body.email || !req.body.password){
       return res.status(400).json({
            data: {},
            message: "something went wrong",
            err : "email or password is missing from the req"
        })

    }
    next()
}

module.exports = {signinValidatores}