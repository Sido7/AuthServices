const {UserRepository} = require('../repository/index')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {JWT_KEY} = require('../config/serverConfig')
const user = require('../models/user')

class UserServices{
    constructor(){
        this.userRepository = new UserRepository()
    }

    async create(data){
        try{
            const user =  await this.userRepository.create(data)
            return user;
        }
        catch(error){
            console.log("something went wrong at service layer")
            throw{error}
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
            const token = await this.createToken({email:userObject.email,userId:userObject.userId})
            return token;
        }catch(error){
            console.log("getting error in signIn process")
            throw error
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

    async passwordChecker(userPlainPassword,dbEncryptedPassword)
    {
        try{
            const result = bcrypt.compareSync(userPlainPassword,dbEncryptedPassword)
            return result;
              
        }catch(error){
            console.log("Getting problem in passwordChecker function")
            throw{error}
        }
    }
}

module.exports = UserServices