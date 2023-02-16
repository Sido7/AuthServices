const express = require('express')
const bodyparser = require('body-parser')

const apiRoutes = require('./routes/index')

const {Port,DB_SYNC} = require('./config/serverConfig')

const db  = require('../src/models/index')

const {user,Role} = require('../src/models/index')


const createServer = async () => {

    const app = express()

    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({extended:true}))

    app.use('/api',apiRoutes)

    //  if(DB_SYNC)
    // {
    //     db.sequelize.sync({alert:true})
    // }


    app.listen(Port,()=>{
        console.log("server started at " + Port)
    })
}

createServer()
