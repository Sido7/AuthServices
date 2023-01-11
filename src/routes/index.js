const express = require('express')
const routes = express.Router()

const v1ApiRoutes = require('./v1/index')

routes.use('/v1',v1ApiRoutes)

module.exports =  routes