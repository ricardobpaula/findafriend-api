import BcryptAdapter from '../src/adapters/cryptography/BcryptAdapter'

test('Hash password', async () => {
    const password1 = '123456'
    const password2 = '123456'
    const bcryptAdapter = new BcryptAdapter()

    const hashedPass1 = await bcryptAdapter.getHashed(password1)

    expect(await bcryptAdapter.compare(password2,hashedPass1)).toBeTruthy()
})