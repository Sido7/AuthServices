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
}

module.exports = UserRepository;