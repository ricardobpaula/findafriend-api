import Email from "../../../src/modules/accounts/entities/email"
import Password from "../../../src/modules/accounts/entities/password"
import Phone from "../../../src/modules/accounts/entities/phone"
import UserRepositoryInMemory from "../../../src/modules/accounts/repositories/in-memory/UserRepositoryInMemory"
import CreateUser from "../../../src/modules/accounts/usecases/CreateUser"

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