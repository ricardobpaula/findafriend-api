import Password from '../../src/modules/accounts/entities/Password'
import BcryptHandler from '../../src/infra/gateways/BcryptHandler'

test('Hash password', async () => {
    const bcryptHandler = new BcryptHandler()
    const password = new Password('123456',bcryptHandler)
    expect(password.getHashed()).not.toBe('123456')
})