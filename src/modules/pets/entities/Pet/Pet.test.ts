import SpecieRepositoryInMemory from '@modules/pets/repositories/in-memory/SpecieRepositoryInMemory'
import SpecieRepository from '@modules/pets/repositories/SpecieRepository'
import SpecieFactory from '@test/factories/SpecieFactory'
import Specie from '../Specie/Specie'
import Description from './Description'
import Pet from './Pet'
import Size from './Size'

let specieRepository: SpecieRepository
let specieFactory: SpecieFactory
let dog: Specie

describe('Pet entity', () => {
  beforeEach(async () => {
    specieRepository = new SpecieRepositoryInMemory()
    specieFactory = new SpecieFactory(specieRepository)
    dog = await specieFactory.execute('dog')
  })
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
      specie: dog,
      adopted: false
    })

    expect(petOrError.isRight()).toBeTruthy()
  })
})
