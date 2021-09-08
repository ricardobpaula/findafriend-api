import Password from './Password'
import BcryptHandler from '../../../infra/gateways/BcryptAdapter'
import InvalidPasswordError from './errors/InvalidPasswordError'

const bcryptHandler = BcryptHandler.create()

describe('Password value', () => {
  it('should be valid password', () => {
    const password = Password.create('123456', bcryptHandler)
    expect(password).toBeInstanceOf(Password)
  })

  it('should reject password with less than 6 characters', () => {
    const error = () => {
      Password.create('123', bcryptHandler)
    }
    expect(error).toThrowError(InvalidPasswordError)
  })

  it('should reject password with more than 255 characters', () => {
    const error = () => {
      Password.create('1'.repeat(256), bcryptHandler)
    }
    expect(error).toThrowError(InvalidPasswordError)
  })

  it('should be hashed password', async () => {
    const password = Password.create('123456', bcryptHandler)
    expect(bcryptHandler.compare('123456', await password.getHashed())).toBeTruthy()
  })

  it('should be able to compare with password when not hashed', async () => {
    const password = Password.create('123456', bcryptHandler)
    expect(await password.compare('123456')).toBeTruthy()
  })

  it('should be able to compare with password when hashed', async () => {
    const hash = await bcryptHandler.getHashed('123456')
    const password = Password.create(hash, bcryptHandler, true)
    expect(await password.compare('123456')).toBeTruthy()
  })
})
