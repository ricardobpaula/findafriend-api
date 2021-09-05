import User from '@modules/accounts/entities/User'
import UserRepositoryInMemory from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory'
import SpecieRepositoryInMemory from '../repositories/in-memory/SpecieRepositoryInMemory'
import CreateSpecie from '../usecases/CreateSpecie/CreateSpecie'
import UserFactory from '@test/factories/UserFactory'
import Specie from './Specie'
import Pet from './Pet'
import { PortType } from './interfaces/PetProps'

let userFactory: UserFactory
let owner: User
let userRepositoryInMemory : UserRepositoryInMemory
let specieRepositoryInMemory: SpecieRepositoryInMemory
let specie: Specie

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet dolor imperdiet, vulputate augue ut, varius odio.'
const port = 'small' as PortType

describe('Pet entity', () => {
  beforeEach(async () => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    specieRepositoryInMemory = new SpecieRepositoryInMemory()
    userFactory = new UserFactory(userRepositoryInMemory)
    const createSpecie = new CreateSpecie(specieRepositoryInMemory)
    owner = await userFactory.execute()
    specie = await createSpecie.execute({
      name: 'dog'
    })
  })
  it('should create a new pet', () => {
    const pet = new Pet({
      description,
      owner,
      port,
      specie
    })
    expect(pet.props.description).toBe(description)
  })
})
