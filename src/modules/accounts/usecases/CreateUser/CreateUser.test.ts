import UserRepositoryInMemory from '../../repositories/in-memory/UserRepositoryInMemory'
import CreateUser from './CreateUser'
import EmailAlreadyUsed from './errors/EmailAlreadyUsed'

const email = 'peter@peterphotos.com'
const firstName = 'Peter'
const lastName = 'Silva'
const phone = '11999998888'
const password = '1234567'

describe('Usecase create new user', () => {
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
    expect(user.props.email.value).toBe(email)
  })

  it('should reject two users with the same e-mail', async () => {
    const userRepositoryInMemory = new UserRepositoryInMemory()
    const createUser = new CreateUser(userRepositoryInMemory)
    const user = await createUser.execute({
      email,
      firstName,
      lastName,
      phone,
      password
    })
    expect(user.props.email.value).toBe(email)

    expect(async () => {
      await createUser.execute({
        email,
        firstName,
        lastName,
        phone,
        password
      })
    }).rejects.toThrowError(EmailAlreadyUsed)
  })
})
