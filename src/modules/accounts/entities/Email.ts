import { Either, left, right } from '@domain/logic/Either'
import InvalidEmailError from './errors/InvalidEmailError'

export default class Email {
    private readonly email: string

    private constructor (email: string) {
      this.email = email
    }

    get value ():string {
      return this.email
    }

    private validateEmail (): boolean {
      const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

      return tester.test(this.email)
    }

    static create (emailProps: string): Either<InvalidEmailError, Email> {
      const email = new Email(emailProps.toLowerCase())

      if (!email.validateEmail()) {
        return left(new InvalidEmailError(emailProps))
      }

      return right(email)
    }
}
