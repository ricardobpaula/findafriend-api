import Name from './Name'
import Specie from './Specie'

describe('Specie entity', () => {
  it('should create a new specie', () => {
    const nameOrError = Name.create('dog')
    expect(nameOrError.isRight()).toBeTruthy()

    if (nameOrError.isLeft()) {
      throw nameOrError.value
    }

    const specieOrError = Specie.create({ name: nameOrError.value })
    expect(specieOrError.value)
  })
})
