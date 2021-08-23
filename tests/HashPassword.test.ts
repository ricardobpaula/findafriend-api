import BcryptAdapter from '../src/adapters/cryptography/BcryptAdapter'

test('Hash password', async () => {
    const password = '123456'
    const bcryptAdapter = new BcryptAdapter()

    const hashedPass = await bcryptAdapter.getHashed(password)

    expect(await bcryptAdapter.compare(password,hashedPass)).toBeTruthy()
})