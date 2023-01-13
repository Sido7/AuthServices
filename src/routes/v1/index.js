const express = require('express')
const UserContoller = require('../../controllers/user-controller')

const routes = express.Router()

routes.post('/signup',UserContoller.createUser)
routes.get('/signin',UserContoller.signIn)

module.exports = routes