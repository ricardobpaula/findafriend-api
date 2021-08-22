import Email from "../src/core/modules/accounts/entities/email"
import Password from "../src/core/modules/accounts/entities/password"
import Phone from "../src/core/modules/accounts/entities/phone"
import UserRepositoryInMemory from "../src/core/modules/accounts/repositories/in-memory/UserRepositoryInMemory"
import CreateUser from "../src/core/modules/accounts/usecases/CreateUser"

const email = new Email('peter@peterphotos.com')
const firstName = 'Peter'
const lastName = 'Silva'
const phone = new Phone('11999998888')
const password = new Password('1234567')
const role = 'commun'

test('Create a new user', async ()=>{
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