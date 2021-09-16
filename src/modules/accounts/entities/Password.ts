import Cryptography from '@domain/infra/gateways/Cryptography'
import { Either, left, right } from '@domain/logic/Either'
import InvalidPasswordError from './errors/InvalidPasswordError'

export default class Password {
    private password: string
    private cryptography: Cryptography
    private hashed: boolean

    private constructor (password: string, cryptography: Cryptography, hashed: boolean) {
      this.password = password
      this.cryptography = cryptography
      this.hashed = hashed
    }

    private static validatePassword (password: string): boolean {
      return (password.length >= 6 && password.length <= 255)
    }

    getHashed (): Promise<string> {
      return this.cryptography.getHashed(this.password)
    }

    compare (compare: string): Promise<boolean> {
      if (!this.hashed) {
        return Promise.resolve(compare === this.password)
      }

      return this.cryptography.compare(compare, this.password)
    }

    static create (passwordProps: string,
      cryptography: Cryptography,
      hashed: boolean = false): Either<InvalidPasswordError, Password> {
      const password = new Password(passwordProps, cryptography, hashed)

      if (!hashed && !this.validatePassword(passwordProps)) {
        return left(new InvalidPasswordError())
      }

      return right(password)
    }
}
