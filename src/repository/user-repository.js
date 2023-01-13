const { user } = require('../models/index')

class UserRepository{
    async create(data){
        try{
            const value  = await user.create(data)
            return value

        }catch(error)
        {
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
            throw{error}
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
}

module.exports = UserRepository;