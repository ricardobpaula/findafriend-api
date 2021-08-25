import Password from './Password'
import BcryptHandler from '../../../infra/gateways/BcryptHandler'
import InvalidPasswordError from './errors/InvalidPasswordError'

const bcryptHandler = new BcryptHandler()

describe('Password value', () => {
    it('should be valid password', () => {
        const password = new Password('123456')
        expect(password).toBeInstanceOf(Password)
    })

    it('should reject password with less than 6 characters', () => {
       const error = () => {
            new Password('123')
       } 
        expect(error).toThrowError(InvalidPasswordError)
    })

    it('should reject password with more than 255 characters', () => {
        const error = () => {
             new Password('1'.repeat(256))
        } 
         expect(error).toThrowError(InvalidPasswordError)
     })

    it('should be hashed password', async () => {
        const password = new Password('123456',bcryptHandler)
        expect(bcryptHandler.compare('123456',await password.getHashed())).toBeTruthy()
    })

    it('should be able to compare with password when not hashed', async()=>{
        const password = new Password('123456')
        expect(await password.compare('123456')).toBeTruthy()
    })
    
    it('should be able to compare with password when hashed', async()=>{
        const hash = await bcryptHandler.getHashed('123456')
        const password = new Password(hash,bcryptHandler)
        expect(await password.compare('123456')).toBeTruthy()
    })
})