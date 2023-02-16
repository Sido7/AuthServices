const {UserServices} = require('./services/index')
const {UserRepository} = require('./repository/index')
const {user} = require('./models/index')

console.log(user)

const userServices = new UserServices()
const userRepository = new UserRepository()
console.log(userRepository)


async function hecking(){
    const data = await userRepository.isAdmin(1)
    console.log(data)
}

async function checking(){
    const data = {
        email : "siat@g.com",
        userId: "S1850",
        passwaord: "dhdsosos"
    }
    const chikku = await userServices.create(data)
    console.log(chikku)
}

//checking()
hecking()