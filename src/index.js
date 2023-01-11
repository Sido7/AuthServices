const express = require('express')
const bodyparser = require('body-parser')

const apiRoutes = require('./routes/index')

const {Port} = require('./config/serverConfig')

const createServer = async () => {

    const app = express()

    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({extended:true}))

    app.use('/api',apiRoutes)

    app.listen(Port,()=>{
        console.log("server started at " + Port)
    })
}

createServer()
