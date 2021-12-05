import Email from './Email'

describe('E-mail value', () => {
  it('should e-mail valid value', () => {
    const emailOrError = Email.create('peter@peterphotos.com')
    expect(emailOrError.isRight).toBeTruthy()
    expect(emailOrError.value)
  })

  it('should be not available value', () => {
    const emailOrError = Email.create('peterpeterphotos.com')
    expect(emailOrError.isLeft).toBeTruthy()
  })
})
