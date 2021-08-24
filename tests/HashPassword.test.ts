import BcryptAdapter from '../src/infra/gateways/bcrypt'

test('Hash password', async () => {
    const password = '123456'
    const bcryptAdapter = new BcryptAdapter()
    
    const hashedPass = await bcryptAdapter.getHashed(password)
    expect(password).not.toBe(hashedPass)
    expect(await bcryptAdapter.compare(password,hashedPass)).toBeTruthy()
})