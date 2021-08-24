import Email from "../entities/Email"
import Password from "../entities/Password"
import Phone from "../entities/Phone"
import UserRepositoryInMemory from "../repositories/in-memory/UserRepositoryInMemory"
import CreateUser from "./CreateUser"

const email = new Email('peter@peterphotos.com')
const firstName = 'Peter'
const lastName = 'Silva'
const phone = new Phone('11999998888')
const password = new Password('1234567')
const role = 'commun'

test.skip('Create a new user', async ()=>{
    const userRepositoryInMemory = new UserRepositoryInMemory()
    const createUser = new CreateUser(userRepositoryInMemory)
    const user = await createUser.execute({
        email,
        firstName,
        lastName,
        phone,
        password,
        role
    })
    expect(user.props.email).toBe(email)
})