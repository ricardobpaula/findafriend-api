import SpecieFactory from '@test/factories/SpecieFactory'
import UserFactory from '@test/factories/UserFactory'
import User from '@core/entities/User/User'
import UserRepositoryInMemory from '@core/repositories/in-memory/UserRepositoryInMemory'
import Specie from '../../entities/Specie/Specie'
import PetRepositoryInMemory from '../../repositories/in-memory/PetRepositoryInMemory'
import SpecieRepositoryInMemory from '../../repositories/in-memory/SpecieRepositoryInMemory'
import CreatePet from './CreatePet'

let userRepositoryInMemory: UserRepositoryInMemory
let specieRepositoryInMemory: SpecieRepositoryInMemory
let userFactory: UserFactory
let specieFactory: SpecieFactory
let owner: User
let specie: Specie

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
  'In sit amet dolor imperdiet, vulputate augue ut, varius odio.'

const size = 'small'

describe('Usecase to create a new pet', () => {
  beforeEach(async () => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    specieRepositoryInMemory = new SpecieRepositoryInMemory()
    userFactory = new UserFactory(userRepositoryInMemory)
    specieFactory = new SpecieFactory(specieRepositoryInMemory)
    owner = await userFactory.execute()
    specie = await specieFactory.execute('dog')
  })

  it('should be created a new pet', async () => {
    const petRepositoryInMemory = new PetRepositoryInMemory()
    const createPet = new CreatePet(petRepositoryInMemory, specieRepositoryInMemory)

    const pet = await createPet.execute({
      ownerId: owner.id,
      specieId: specie.id,
      description,
      size
    })
    expect(pet.isRight()).toBeTruthy()
  })

  it('should be specie not found error', async () => {
    const petRepositoryInMemory = new PetRepositoryInMemory()
    const createPet = new CreatePet(petRepositoryInMemory, specieRepositoryInMemory)

    const pet = await createPet.execute({
      ownerId: owner.id,
      specieId: 0,
      description,
      size
    })
    expect(pet.isLeft()).toBeTruthy()
  })
})