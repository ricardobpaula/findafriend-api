import UserRepositoryInMemory from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory'
import PetRepositoryInMemory from '../../repositories/in-memory/PetRepositoryInMemory'
import SpecieRepositoryInMemory from '../../repositories/in-memory/SpecieRepositoryInMemory'
import UserFactory from '@test/factories/UserFactory'
import SpecieFactory from '@test/factories/SpecieFactory'
import CreatePet from '../CreatePet/CreatePet'
import { PortType } from '../../entities/interfaces/PetProps'
import FindPets from './FindPets'

let petRepositoryInMemory: PetRepositoryInMemory
let userRepositoryInMemory: UserRepositoryInMemory
let specieRepositoryInMemory: SpecieRepositoryInMemory

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet dolor imperdiet, vulputate augue ut, varius odio.'
const small = 'small' as PortType
const big = 'big' as PortType

describe('Find pets usecase', () => {
  beforeEach(async () => {
    petRepositoryInMemory = new PetRepositoryInMemory()
    userRepositoryInMemory = new UserRepositoryInMemory()
    specieRepositoryInMemory = new SpecieRepositoryInMemory()
    const userFactory = new UserFactory(userRepositoryInMemory)
    const owner = await userFactory.execute()
    const specieFactory = new SpecieFactory(specieRepositoryInMemory)
    const cat = await specieFactory.execute('cat')
    const dog = await specieFactory.execute('dog')
    const createPet = new CreatePet(petRepositoryInMemory)
    await createPet.execute({
      description,
      owner,
      port: small,
      specie: cat
    })
    await createPet.execute({
      description,
      owner,
      port: small,
      specie: dog
    })
    await createPet.execute({
      description,
      owner,
      port: big,
      specie: dog
    })
  })
  it('should be all pets created', async () => {
    const findPets = new FindPets(petRepositoryInMemory)
    const pets = await findPets.all()

    expect(!!pets).toBeTruthy()
  })
})
