import InvalidEmailError from './errors/InvalidEmailError'

export default class Email {
    private readonly email: string

    private constructor (email: string) {
      this.email = email
    }

    get ():string {
      return this.email
    }

    private validateEmail (): boolean {
      const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

      return tester.test(this.email)
    }

    static create (emailProps: string): Email {
      const email = new Email(emailProps)

      if (!email.validateEmail()) {
        throw new InvalidEmailError(emailProps)
      }

      return email
    }
}
