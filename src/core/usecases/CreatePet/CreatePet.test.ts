import SpecieFactory from '@test/factories/SpecieFactory'
import UserFactory from '@test/factories/UserFactory'
import User from '@core/entities/User/User'
import UserRepositoryInMemory from '@core/repositories/in-memory/UserRepositoryInMemory'
import Specie from '../../entities/Specie/Specie'
import PetRepositoryInMemory from '../../repositories/in-memory/PetRepositoryInMemory'
import SpecieRepositoryInMemory from '../../repositories/in-memory/SpecieRepositoryInMemory'
import CreatePet from './CreatePet'
import { File } from '@domain/infra/gateways/UploadFileManager'

let userRepositoryInMemory: UserRepositoryInMemory
let specieRepositoryInMemory: SpecieRepositoryInMemory
let userFactory: UserFactory
let specieFactory: SpecieFactory
let owner: User
let specie: Specie

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
  'In sit amet dolor imperdiet, vulputate augue ut, varius odio.'

const size = 'small'

const photo = {
  date: new Date(),
  name: 'default.png',
  originalName: 'default.png',
  path: '/home/user/images',
  size: 1024,
  type: 'image/png'
} as File

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
      size,
      files: [photo]
    })
    expect(pet.isRight()).toBeTruthy()
  })

  it('should be specie not found error', async () => {
    const petRepositoryInMemory = new PetRepositoryInMemory()
    const createPet = new CreatePet(petRepositoryInMemory, specieRepositoryInMemory)

    const pet = await createPet.execute({
      ownerId: owner.id,
      specieId: '26c58fc6-7726-11ec-90d6-0242ac120003',
      description,
      size,
      files: [photo]
    })
    expect(pet.isLeft()).toBeTruthy()
  })
})
