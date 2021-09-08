import PasswordFactory from '../factories/PasswordFactory'
import UserRepositoryInMemory from '../repositories/in-memory/UserRepositoryInMemory'
import CreateUser from '../usecases/CreateUser/CreateUser'

import Email from './Email'
import Phone from './Phone'

const email = Email.create('peter@peterphotos.com')
const firstName = 'Peter'
const lastName = 'Silva'
const phone = Phone.create('11999998888')
const password = PasswordFactory('1234567')

describe('User entity', () => {
  it('should create a new user', async () => {
    const userRepositoryInMemory = new UserRepositoryInMemory()
    const createUser = new CreateUser(userRepositoryInMemory)
    const user = await createUser.execute({
      email,
      firstName,
      lastName,
      phone,
      password
    })
    expect(user.props.email).toBe(email)
  })
})
