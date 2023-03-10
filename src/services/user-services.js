const {UserRepository} = require('../repository/index')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {JWT_KEY} = require('../config/serverConfig')
const user = require('../models/user')
const AppError = require('../utils/appError')

class UserServices{
    constructor(){
        this.userRepository = new UserRepository()
    }

    async create(data){
        try{
            const user =  await this.userRepository.create(data)
            console.log(user.id,data.role)
             await this.userRepository.addingRole(user.id)
            return user;
        }
        catch(error){
            console.log("something went wrong at service layer")
            if(error.name == "SequelizeValidationError"){
                throw error
            }
            throw error
        }

    }

    async destroy(userId){
        try{
             await this.userRepository.destroy(userId)
             return true;
        }catch(error){
            console.log("something went wrong at service layer")
            throw{error}
        }
    }

    async signIn(email,password){
        try{
            //to check if the user is present id db or not
            const userObject = await this.userRepository.getByEmail(email)
            // to check if the user has enterd the currect password or not
            const matchPassword = await this.passwordChecker(password,userObject.password)
            if(!matchPassword){
                console.log("incorrect Password")
                throw{error: "passwaord doesnot match"}
            }
            // password matched then we will generate the token for the user
            const token = await this.createToken({email:userObject.email,userId:userObject.userId,id:userObject.id})
            return token;
        }catch(error){
            console.log("getting error in signIn process")
            if(error.name == "AttributeNotFound"){
                throw error
            }
            throw error
        }
    }

    async isAuthenticated(token){
        try{
            const userData = await this.verifyToken(token)
            const checkDB = await this.userRepository.getById(userData.id)
            if(!checkDB){
                throw{error: "user no longer exist in db"}
            }

            return checkDB.id

        }catch(error){
            console.log("something went wrong while autheticating")
            throw{error}
        }
    }

    async createToken(userObjet){
        try{
            const token = jwt.sign(userObjet,JWT_KEY,{ expiresIn: '1h' })
            return token;
        }catch(error){
            console.log("Not able to create the token")
            throw{error}
        }
    }

    async verifyToken(suppliedToken){
        try{
            const userObject = jwt.verify(suppliedToken,JWT_KEY)
            return userObject
        }catch(error){
            console.log("Not able to verify the token")
            throw{error}
        }
    }

    async passwordChecker(userPlainPassword,dbEncryptedPassword){
        try{
            const result = bcrypt.compareSync(userPlainPassword,dbEncryptedPassword)
            return result;
              
        }catch(error){
            console.log("Getting problem in passwordChecker function")
            throw{error}
        }
    }

    async  addrole(data){
        try{
            const admincheck = await this.isAdmin(data.id)
        if(admincheck){
            await this.userRepository.addingRole(data.userId,data.role)
            return true
        }
        else 
        {
            throw {error: "Does not have sufficient permission to add role"}
        }

        }catch(error){
            throw error
        }

    }

    async isAdmin(userId){
        try{
            return await this.userRepository.isAdmin(userId)
        }catch(error){
            console.log("Getting problem in isAdmin  function at service Layer")
            throw{error}
       }
   } 
}

module.exports = UserServices