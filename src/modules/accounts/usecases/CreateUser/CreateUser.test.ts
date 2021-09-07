import Email from '../../entities/Email'
import Password from '../../entities/Password'
import Phone from '../../entities/Phone'
import UserRepositoryInMemory from '../../repositories/in-memory/UserRepositoryInMemory'
import CreateUser from './CreateUser'
import EmailAlreadyUsed from './errors/EmailAlreadyUsed'

const email = Email.create('peter@peterphotos.com')
const firstName = 'Peter'
const lastName = 'Silva'
const phone = Phone.create('11999998888')
const password = Password.create('1234567')
const role = 'commun'

describe('Usecase create new user', () => {
  it('should create a new user', async () => {
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

  it('should reject two users with the same e-mail', async () => {
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

    expect(async () => {
      await createUser.execute({
        email,
        firstName,
        lastName,
        phone,
        password,
        role
      })
    }).rejects.toThrowError(EmailAlreadyUsed)
  })
})
