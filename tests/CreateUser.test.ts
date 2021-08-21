import CreateUser from "../src/core/modules/accounts/usecases/CreateUser"

const email = 'peter@peterphotos.com'
const firstName = 'Peter'
const lastName = 'Silva'
const phone = '11999998888'
const password = '1234567'
const role = 'commun'

test('Create a new user', ()=>{
    const createUser = new CreateUser()
    const { user } = createUser.execute({
        email,
        firstName,
        lastName,
        phone,
        password,
        role
    })

    expect(user.email).toBe(email)
    
})