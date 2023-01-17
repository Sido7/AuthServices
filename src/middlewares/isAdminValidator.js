function validateIsAdmin(req,res,next){
    if(!req.body.id){
       return res.status(400).json({
            data: {},
            err: "required data is missing",
            message: "something went wrong"
        })
      
    }
    next()
}

module.exports = {
    validateIsAdmin
}