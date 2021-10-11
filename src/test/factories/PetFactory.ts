import Pet from '@modules/pets/entities/Pet/Pet'
import PetRepository from '@modules/pets/repositories/PetRepository'
import SpecieRepository from '@modules/pets/repositories/SpecieRepository'
import CreatePet from '@modules/pets/usecases/CreatePet/CreatePet'

type PetAttributes = {
    description: string,
    ownerId: number,
    specieId: number,
    size: string
  }

export default class PetFactory {
  private readonly petRepository: PetRepository
  private readonly specieRepository: SpecieRepository

  constructor (
    petRepository: PetRepository,
    specieRepository: SpecieRepository) {
    this.petRepository = petRepository
    this.specieRepository = specieRepository
  }

  async execute (pet: PetAttributes): Promise<Pet> {
    const createPet = new CreatePet(
      this.petRepository,
      this.specieRepository)

    const petOrError = await createPet.execute(pet)

    if ((petOrError).isLeft()) {
      throw (petOrError).value
    }

    return petOrError.value
  }
}
