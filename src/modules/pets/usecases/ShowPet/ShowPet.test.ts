import PetRepositoryInMemory from '@modules/pets/repositories/in-memory/PetRepositoryInMemory'
import SpecieRepositoryInMemory from '@modules/pets/repositories/in-memory/SpecieRepositoryInMemory'
import PetRepository from '@modules/pets/repositories/PetRepository'
import PetFactory from '@test/factories/PetFactory'
import SpecieFactory from '@test/factories/SpecieFactory'
import ShowPet from './ShowPet'

let petRepository: PetRepository

describe('Show unique pet', () => {
  beforeEach(async () => {
    petRepository = new PetRepositoryInMemory()
    const specieRepository = new SpecieRepositoryInMemory()
    const specieFactory = new SpecieFactory(specieRepository)
    const dog = await specieFactory.execute('dog')
    const petFactory = new PetFactory(petRepository, specieRepository)
    await petFactory.execute({
      description: 'Lorem ipsum dolor sit amet.',
      size: 'small',
      specieId: dog.id,
      ownerId: 1
    })
  })

  it('Should be show attributes from a pet', async () => {
    const showPet = new ShowPet(petRepository)
    const pet = await showPet.execute({ id: 1 })
    expect(!!pet).toBeTruthy()
  })
})
