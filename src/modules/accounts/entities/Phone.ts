import InvalidPhoneError from './errors/InvalidPhoneError'

export default class Phone {
    readonly phone: string

    private constructor (phone: string) {
      this.phone = phone
    }

    private validatePhone () {
      return this.phone.length === 11
    }

    static create (phoneProps: string): Phone {
      const phone = new Phone(phoneProps)

      if (!phone.validatePhone()) {
        throw new InvalidPhoneError(phoneProps)
      }

      return phone
    }
}
