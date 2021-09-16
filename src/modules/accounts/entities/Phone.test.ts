import Phone from './Phone'

describe('Phone value', () => {
  it('should phone valid value', () => {
    const phoneOrError = Phone.create('11999998888')
    expect(phoneOrError.isRight()).toBeTruthy()
  })

  it('should be not accepted with length different from 11', () => {
    const phoneOrError = Phone.create('011999998888')
    expect(phoneOrError.isLeft()).toBeTruthy()
  })
})
