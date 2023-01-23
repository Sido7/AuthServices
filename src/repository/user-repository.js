const { user,Role } = require('../models/index')
const ValidationError = require('../utils/validationError')

class UserRepository{
    async create(data){
        try{
            const value  = await user.create(data)
            return value

        }catch(error)
        {  // console.log(error)
            if(error.name == "SequelizeValidationError")
            {  
                console.log("creating new validation error")
                throw new ValidationError(error)
                
            }
            console.log("got some error at repository layer")
            throw{error}
        }
    }

    async destroy(userId){
        try{
            await user.destroy({
                where: {
                    id: userId
                }
            })
            return true;

        }catch(error)
        {
            console.log("got some error at repository layer")
            throw error
        }
    }

    async getById(id){
        try{
            const data = await user.findByPk(id,{
                attributes: ['id','email','userId']
            })
            return data
        }catch(error){
            console.log("not able to find user by the provided id")
            throw{error}
        }
    }

    async getByEmail(userEmail){
        try{
            const data = await user.findOne({
                where:{
                email: userEmail
                }
            })
            return data

        }catch(error){
            console.log("getting Error in getByEmail function")
            throw error
        }        
    }

    async isAdmin(userId){
        try{
            const users = await user.findByPk(userId)
            const role = await Role.findOne({
                where:{
                    name:"ADMIN"
                }
            })
            return await users.hasRole(role)
        }catch(error){
            console.log("getting Error in isAdmin function")
            throw{error}
        }     

    }
}

module.exports = UserRepository;