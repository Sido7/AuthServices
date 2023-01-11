const express = require('express')
const UserContoller = require('../../controllers/user-controller')

const routes = express.Router()

routes.post('/signup',UserContoller.createUser)

module.exports = routes