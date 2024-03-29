import UserRepositoryInMemory from '@core/repositories/in-memory/UserRepositoryInMemory'
import UserRepository from '@core/repositories/UserRepository'
import PetRepositoryInMemory from '@core/repositories/in-memory/PetRepositoryInMemory'
import SpecieRepositoryInMemory from '@core/repositories/in-memory/SpecieRepositoryInMemory'
import PetRepository from '@core/repositories/PetRepository'
import SpecieRepository from '@core/repositories/SpecieRepository'
import PetFactory from '@test/factories/PetFactory'
import SpecieFactory from '@test/factories/SpecieFactory'
import UserFactory from '@test/factories/UserFactory'
import FindPets from './FindPets'
import Specie from '@core/entities/Specie/Specie'

let petRepositoryInMemory: PetRepository
let userRepositoryInMemory: UserRepository
let specieRepositoryInMemory: SpecieRepository
let dog: Specie
let cat: Specie

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
  'In sit amet dolor imperdiet, vulputate augue ut, varius odio.'

describe('Find all pets usecase', () => {
  beforeEach(async () => {
    petRepositoryInMemory = new PetRepositoryInMemory()
    userRepositoryInMemory = new UserRepositoryInMemory()
    specieRepositoryInMemory = new SpecieRepositoryInMemory()
    const userFactory = new UserFactory(userRepositoryInMemory)
    const specieFactory = new SpecieFactory(specieRepositoryInMemory)
    const petFactory = new PetFactory(
      petRepositoryInMemory,
      specieRepositoryInMemory)
    const owner = await userFactory.execute()
    dog = await specieFactory.execute('dog')
    cat = await specieFactory.execute('cat')
    await petFactory.execute({
      description,
      size: 'small',
      ownerId: owner.id,
      specieId: dog.id
    })
    await petFactory.execute({
      description,
      size: 'small',
      ownerId: owner.id,
      specieId: dog.id
    })
    await petFactory.execute({
      description,
      size: 'big',
      ownerId: owner.id,
      specieId: dog.id
    })
    await petFactory.execute({
      description,
      size: 'small',
      ownerId: owner.id,
      specieId: cat.id
    })
  })

  it('Should be received to 2 pets', async () => {
    const findPets = new FindPets(petRepositoryInMemory)
    const data = await findPets.execute({ limit: 2, offset: 0 })
    expect(data.length === 2).toBeTruthy()
  })

  it('Should be received pet with size equals small', async () => {
    const findPets = new FindPets(petRepositoryInMemory)
    const data = await findPets.execute({ limit: 5, offset: 0, size: 'small' })
    expect(data.length > 0).toBeTruthy()
  })

  it('Should be received pet with specie equals dog', async () => {
    const findPets = new FindPets(petRepositoryInMemory)
    const data = await findPets.execute({ limit: 5, offset: 0, species: [dog.id] })
    expect(data.length > 0).toBeTruthy()
  })
})
