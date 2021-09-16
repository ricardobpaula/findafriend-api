import { Either, left, right } from '@domain/logic/Either'
import InvalidPhoneError from './errors/InvalidPhoneError'

export default class Phone {
    private readonly phone: string

    private constructor (phone: string) {
      this.phone = phone
    }

    get value (): string {
      return this.phone
    }

    private validatePhone () {
      return this.phone.length === 11
    }

    static create (phoneProps: string): Either<InvalidPhoneError, Phone> {
      const phone = new Phone(phoneProps)

      if (!phone.validatePhone()) {
        return left(new InvalidPhoneError(phoneProps))
      }

      return right(phone)
    }
}
