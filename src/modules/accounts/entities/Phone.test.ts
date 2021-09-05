import Phone from './Phone'
import InvalidPhoneError from './errors/InvalidPhoneError'

describe('Phone value', () => {
  it('should phone valid value', () => {
    const phone = new Phone('11999998888')
    expect(phone.phone).toBe('11999998888')
  })

  it('should be not accepted with length different from 11', () => {
    const error = () => {
      new Phone('011999998888')
    }
    expect(error).toThrowError(InvalidPhoneError)
  })
})
