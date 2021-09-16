import PasswordFactory from '../factories/PasswordFactory'
import Email from './Email'
import Phone from './Phone'
import User from './User'

const email = 'peter@peterphotos.com'
const firstName = 'Peter'
const lastName = 'Silva'
const phone = '11999998888'
const password = '1234567'

describe('User entity', () => {
  it('should create a new user', async () => {
    const emailOrError = Email.create(email)
    const passwordOrError = PasswordFactory(password)
    const phoneOrError = Phone.create(phone)

    if (emailOrError.isLeft()) {
      throw emailOrError.value
    }
    if (passwordOrError.isLeft()) {
      throw passwordOrError.value
    }
    if (phoneOrError.isLeft()) {
      throw phoneOrError.value
    }

    const userOrError = User.create({
      email: emailOrError.value,
      firstName,
      lastName,
      password: passwordOrError.value,
      phone: phoneOrError.value
    })

    if (userOrError.isLeft()) {
      throw userOrError.value
    }

    expect(userOrError.isRight()).toBeTruthy()
  })
})
