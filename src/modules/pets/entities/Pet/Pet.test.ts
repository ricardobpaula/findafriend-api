import Description from './Description'
import Pet from './Pet'
import Size from './Size'

describe('Pet entity', () => {
  it('should create a new pet', () => {
    const descriptionOrError = Description.create(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Praesent quis leo in erat pharetra imperdiet.')
    expect(descriptionOrError.isRight()).toBeTruthy()

    const sizeOrError = Size.create('small')

    expect(sizeOrError.isRight()).toBeTruthy()

    if (descriptionOrError.isLeft()) {
      throw descriptionOrError.value
    }

    if (sizeOrError.isLeft()) {
      throw sizeOrError.value
    }

    const petOrError = Pet.create({
      description: descriptionOrError.value,
      size: sizeOrError.value,
      ownerId: 1,
      specieId: 1,
      adopted: false
    })

    expect(petOrError.isRight()).toBeTruthy()
  })
})
