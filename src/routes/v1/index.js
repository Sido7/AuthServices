const express = require('express')
const UserContoller = require('../../controllers/user-controller')
const {signin,signup} = require('../../middlewares/index')

const routes = express.Router()

routes.post('/signup',signup.signUpValidatores,UserContoller.createUser)
routes.post('/signin',signin.signinValidatores,UserContoller.signIn)
routes.get('/authenticated',UserContoller.isAuthenticated)
module.exports = routes