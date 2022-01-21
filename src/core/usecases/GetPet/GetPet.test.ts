import { v4 as uuid } from 'uuid'

import PetRepositoryInMemory from '@core/repositories/in-memory/PetRepositoryInMemory'
import SpecieRepositoryInMemory from '@core/repositories/in-memory/SpecieRepositoryInMemory'
import PetRepository from '@core/repositories/PetRepository'
import PetFactory from '@test/factories/PetFactory'
import SpecieFactory from '@test/factories/SpecieFactory'
import GetPet from './GetPet'
import Pet from '@core/entities/Pet/Pet'

let petRepository: PetRepository
let pet: Pet
const ownerId = uuid()

describe('Show unique pet', () => {
  beforeEach(async () => {
    petRepository = new PetRepositoryInMemory()
    const specieRepository = new SpecieRepositoryInMemory()
    const specieFactory = new SpecieFactory(specieRepository)
    const dog = await specieFactory.execute('dog')
    const petFactory = new PetFactory(petRepository, specieRepository)
    pet = await petFactory.execute({
      description: 'Lorem ipsum dolor sit amet.',
      size: 'small',
      specieId: dog.id,
      ownerId
    })
  })

  it('Should be show attributes from a pet', async () => {
    const getPet = new GetPet(petRepository)
    const petExists = await getPet.execute({ id: pet.id })
    expect(!!petExists).toBeTruthy()
  })
})
