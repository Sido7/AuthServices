const {UserServices} = require('./services/index')
const {UserRepository} = require('./repository/index')
const {user} = require('./models/index')

console.log(user)

const userServices = new UserServices()
const userRepository = new UserRepository()
console.log(userRepository)


async function hecking(){
    const data = {
        email : "sniht@g.com",
        userId: "SnID0",
        passwaord: "dhdsosos"
    }
   // const chikku = await user.create(data)
    const chikku = await userRepository.create(data)
    console.log(chikku)
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