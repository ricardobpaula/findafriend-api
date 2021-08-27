import TokenAccess from "../../../../domain/infra/gateways/TokenAccess"
import JtwAdapter from "../../../../infra/gateways/JwtAdapter"
import Email from "../../entities/Email"
import Password from "../../entities/Password"
import Phone from "../../entities/Phone"

import UserRepositoryInMemory from "../../repositories/in-memory/UserRepositoryInMemory"
import CreateUser from "../CreateUser/CreateUser"
import AuthUser from "./AuthUser"

const email = new Email('peter@peterphotos.com')
const firstName = 'Peter'
const lastName = 'Silva'
const phone = new Phone('11999998888')
const password = new Password('1234567')
const role = 'commun'

let userRepositoryInMemory: UserRepositoryInMemory
let authUser: AuthUser
let tokenAdapter: JtwAdapter

describe('Authentication a new user',()=> {
    beforeEach(async()=>{
        userRepositoryInMemory = new UserRepositoryInMemory()
        tokenAdapter = new JtwAdapter()
        authUser = new AuthUser(userRepositoryInMemory,tokenAdapter)
        const createUser = new CreateUser(userRepositoryInMemory)
        await createUser.execute({
            email,
            firstName,
            lastName,
            phone,
            password,
            role
        }) 
    })
    it('should receive a valid token', async() => {
        const token = await authUser.execute('peter@peterphotos.com','1234567')
        expect(!!await tokenAdapter.verify(token)).toBeTruthy()
    })
})