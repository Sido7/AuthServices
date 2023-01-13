const express = require('express')
const bodyparser = require('body-parser')

const apiRoutes = require('./routes/index')

const {Port} = require('./config/serverConfig')

const UserServices = require('./services/user-services')



const createServer = async () => {

    const app = express()

    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({extended:true}))

    app.use('/api',apiRoutes)
    
    const service = new UserServices()

    // const token = await service.createToken({email:"siddhrth",id:33,userid:"karebikkua"})
    // console.log(token)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpZGRocnRoIiwiaWQiOjMzLCJ1c2VyaWQiOiJrYXJlYmlra3VhIiwiaWF0IjoxNjczNjEwMzcwLCJleHAiOjE2NzM2MTM5NzB9.z6esJQM0sF28PJfIcAfH_W1oSWIU7GgNvflEekzzQM8"
    const userObject = await service.verifyToken(token)
    console.log(userObject)


    app.listen(Port,()=>{
        console.log("server started at " + Port)
    })
}

createServer()
