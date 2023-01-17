const express = require('express')
const UserContoller = require('../../controllers/user-controller')
const {signin,signup,isAdmin} = require('../../middlewares/index')

const routes = express.Router()

routes.post('/signup',signup.signUpValidatores,UserContoller.createUser)
routes.post('/signin',signin.signinValidatores,UserContoller.signIn)
routes.get('/authenticated',UserContoller.isAuthenticated)
routes.get('/isadmin',isAdmin.validateIsAdmin,UserContoller.isAdmin)

module.exports = routes