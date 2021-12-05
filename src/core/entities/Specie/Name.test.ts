import Name from './Name'

describe('Name attribute', () => {
  it('should create a new specie', () => {
    const nameOrError = Name.create('dog')
    expect(nameOrError.isRight()).toBeTruthy()
  })
})
