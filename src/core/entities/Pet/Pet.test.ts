import SpecieRepositoryInMemory from '@core/repositories/in-memory/SpecieRepositoryInMemory'
import SpecieRepository from '@core/repositories/SpecieRepository'
import SpecieFactory from '@test/factories/SpecieFactory'
import Specie from '../Specie/Specie'
import Description from './Description'
import Pet from './Pet'
import Size from './Size'
import UserFactory from '@test/factories/UserFactory'
import UserRepository from '@core/repositories/UserRepository'
import UserRepositoryInMemory from '@core/repositories/in-memory/UserRepositoryInMemory'
import User from '../User/User'

let specieRepository: SpecieRepository
let specieFactory: SpecieFactory
let userFactory: UserFactory
let userRepository: UserRepository
let dog: Specie
let owner: User

describe('Pet entity', () => {
  beforeEach(async () => {
    specieRepository = new SpecieRepositoryInMemory()
    specieFactory = new SpecieFactory(specieRepository)
    userRepository = new UserRepositoryInMemory()
    userFactory = new UserFactory(userRepository)
    dog = await specieFactory.execute('dog')
    owner = await userFactory.execute()
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
      ownerId: owner.id,
      specie: dog,
      adopted: false
    })

    expect(petOrError.isRight()).toBeTruthy()
  })
})
