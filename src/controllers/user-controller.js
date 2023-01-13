const {UserServices} = require('../services/index')

const userServices = new UserServices()

   const  createUser = async (req,res)=>{
        try{
            const data = {
                email: req.body.email,
                userId: req.body.userId,
                password: req.body.password
            }
            const user =  await userServices.create(req.body)
            return res.status(201).json({
                data: user,
                success: true,
                error: {},
                message: "User Created SuccessFully"
            })
        }catch(error){
            console.log("facing issue at controller")
            return res.status(400).json({
                data: {},
                error: error,
                message: "could not create user",
                success: false
            })
        }  
     }

     const signIn = async (req,res) => {
        try{
            const response = await userServices.signIn(req.body.email,req.body.password)
            return res.status(201).json({
                data: response,
                success: true,
                error: {},
                message: "successfull Logined"
            })

        }catch(error){
            console.log("getting error in signIn at Contoller")
            return res.status(400).json({
                data: {},
                error: error,
                message: "Not able to signIn",
                success: false
            })

        }
     }

     module.exports= {
        createUser,
        signIn
     }