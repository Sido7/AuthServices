const {UserServices} = require('../services/index')



const userServices = new UserServices()

   const  createUser = async (req,res)=>{
        try{
            const data = {
                email: req.body.email,
                userId: req.body.userId,
                password: req.body.password,
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
            return res.status(error.statusCode).json({
                data: {},
                error: error.explanation,
                message: error.message,
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
            return res.status(error.statusCode).json({
                data: {},
                error: error.explanation,
                message: error.message,
                success: false
            })

        }
     }

     const isAuthenticated = async (req,res) => {
        try{
            console.log("hitting")
            const response = await userServices.isAuthenticated(req.headers['x-access-token'])
            return res.status(201).json({
                data: response,
                success: true,
                error: {},
                message: "successfull Authenticated"
            })

        }
        catch(error){
            console.log("getting error in signIn at Contoller")
            return res.status(400).json({
                data: {},
                error: error,
                message: "Not able to Authenticate",
                success: false
            })

        }
     }

     const isAdmin = async (req,res)=>{
        try{
            const response = await userServices.isAdmin(req.body.id)
           return res.status(200).json({
                data: response,
                err: {},
                success: true,
                message: "successfully fetched if the user is admin or not"
            })
        }catch(error){
            console.log("getting error in isAdmin at Contoller")
            return res.status(400).json({
                data: {},
                err: error,
                message: "Getting error in verifying User Role",
                success: false
            })
        }
     }

     const addRole = async (req,res)=>{
        try{
            const response = await userServices.addrole(req.body)
            return res.status(201).json({
                data: response,
                err: {},
                success: true,
                message: "successfully added role to the user"
            })
        }catch(error){
            console.log("getting error in isAdmin at Contoller")
            return res.status(400).json({
                data: {},
                err: error,
                message: "Does not have sufficient permission to add role",
                success: false
            })
        }

     }

     module.exports= {
        createUser,
        signIn,
        isAuthenticated,
        isAdmin,
        addRole
     }