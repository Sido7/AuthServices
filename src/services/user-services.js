const {UserRepository} = require('../repository/index')

const jwt = require('jsonwebtoken')

const {JWT_KEY} = require('../config/serverConfig')

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
}

module.exports = UserServices