import Cryptography from '@domain/infra/gateways/Cryptography'
import InvalidPasswordError from './errors/InvalidPasswordError'

export default class Password {
    private password: string
    private cryptography: Cryptography

    private constructor (password: string, cryptography?: Cryptography) {
      this.password = password
      this.cryptography = cryptography
    }

    private validatePassword (): boolean {
      return (this.password.length >= 6 && this.password.length <= 255)
    }

    getHashed (): Promise<string> {
      return this.cryptography.getHashed(this.password)
    }

    compare (compare: string): Promise<boolean> {
      if (!this.cryptography) {
        return Promise.resolve(compare === this.password)
      }

      return this.cryptography.compare(compare, this.password)
    }

    static create (passwordProps: string, cryptography?: Cryptography): Password {

      const password = new Password(passwordProps, cryptography)

      if (!password.validatePassword()) {
        throw new InvalidPasswordError(passwordProps)
      }

      return password

    }
}
