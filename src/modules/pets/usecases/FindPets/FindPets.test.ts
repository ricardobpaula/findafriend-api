import UserRepositoryInMemory from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory'
import UserRepository from '@modules/accounts/repositories/UserRepository'
import PetRepositoryInMemory from '@modules/pets/repositories/in-memory/PetRepositoryInMemory'
import SpecieRepositoryInMemory from '@modules/pets/repositories/in-memory/SpecieRepositoryInMemory'
import PetRepository from '@modules/pets/repositories/PetRepository'
import SpecieRepository from '@modules/pets/repositories/SpecieRepository'
import PetFactory from '@test/factories/PetFactory'
import SpecieFactory from '@test/factories/SpecieFactory'
import UserFactory from '@test/factories/UserFactory'
import FindPets from './FindPets'

let petRepositoryInMemory: PetRepository
let userRepositoryInMemory: UserRepository
let specieRepositoryInMemory: SpecieRepository

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
    const dog = await specieFactory.execute('dog')
    const cat = await specieFactory.execute('cat')
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
    const findPets = new FindPets(petRepositoryInMemory, specieRepositoryInMemory)
    const data = await findPets.execute({ limit: 2, offset: 0 })
    expect(data.length === 2).toBeTruthy()
  })

  it('Should be received pet with size equals small', async () => {
    const findPets = new FindPets(petRepositoryInMemory, specieRepositoryInMemory)
    const data = await findPets.execute({ limit: 5, offset: 0, size: 'small' })
    expect(data.length > 0).toBeTruthy()
  })

  it('Should be received pet with specie equals dog', async () => {
    const findPets = new FindPets(petRepositoryInMemory, specieRepositoryInMemory)
    const data = await findPets.execute({ limit: 5, offset: 0, species: [1] })
    expect(data.length > 0).toBeTruthy()
  })
})
