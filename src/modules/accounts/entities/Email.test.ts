import Email from './Email'
import InvalidEmailError from './errors/InvalidEmailError'

describe('E-mail value', () => {
  it('should e-mail valid value', () => {
    const email = Email.create('peter@peterphotos.com')
    expect(email.get()).toBe('peter@peterphotos.com')
  })

  it('should be not available value', () => {
    const error = () => {
      Email.create('peterpeterphotos.com')
    }

    expect(error).toThrowError(InvalidEmailError)
  })
})
