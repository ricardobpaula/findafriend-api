import Password from './Password'
import BcryptHandler from '@infra/gateways/BcryptAdapter'

const bcryptHandler = BcryptHandler.create()

describe('Password value', () => {
  it('should be valid password', () => {
    const passwordOrError = Password.create('123456', bcryptHandler)
    expect(passwordOrError.isRight()).toBeTruthy()
  })

  it('should reject password with less than 6 characters', () => {
    const passwordOrError = Password.create('123', bcryptHandler)
    expect(passwordOrError.isLeft()).toBeTruthy()
  })

  it('should reject password with more than 255 characters', () => {
    const passwordOrError = Password.create('1'.repeat(256), bcryptHandler)
    expect(passwordOrError.isLeft()).toBeTruthy()
  })

  it('should be hashed password', async () => {
    const passwordOrError = Password.create('123456', bcryptHandler)
    expect(passwordOrError.isRight).toBeTruthy()
    if (passwordOrError.isLeft()) {
      throw passwordOrError.value
    }
    expect(bcryptHandler.compare('123456', await passwordOrError.value.getHashed())).toBeTruthy()
  })

  it('should be able to compare with password when not hashed', async () => {
    const passwordOrError = Password.create('123456', bcryptHandler)
    if (passwordOrError.isLeft()) {
      throw passwordOrError.value
    }
    expect(await passwordOrError.value.compare('123456')).toBeTruthy()
  })

  it('should be able to compare with password when hashed', async () => {
    const hash = await bcryptHandler.getHashed('123456')
    const passwordOrError = Password.create(hash, bcryptHandler, true)
    if (passwordOrError.isLeft()) {
      throw passwordOrError.value
    }
    expect(await passwordOrError.value.compare('123456')).toBeTruthy()
  })
})
