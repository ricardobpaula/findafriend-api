import UserRepository from '@modules/accounts/repositories/UserRepository'
import Pet from '@modules/pets/entities/Pet/Pet'
import PetRepository from '@modules/pets/repositories/PetRepository'
import SpecieRepository from '@modules/pets/repositories/SpecieRepository'
import CreatePet from '@modules/pets/usecases/CreatePet/CreatePet'

type PetAttributes = {
    description: string,
    ownerId: number,
    specie: string,
    size: string
  }

export default class PetFactory {
  private readonly petRepository: PetRepository
  private readonly userRepository: UserRepository
  private readonly specieRepository: SpecieRepository

  constructor (
    petRepository: PetRepository,
    userRepository: UserRepository,
    specieRepository: SpecieRepository) {
    this.petRepository = petRepository
    this.userRepository = userRepository
    this.specieRepository = specieRepository
  }

  async execute (pet: PetAttributes): Promise<Pet> {
    const createPet = new CreatePet(
      this.petRepository,
      this.specieRepository,
      this.userRepository)

    const petOrError = await createPet.execute(pet)

    if ((petOrError).isLeft()) {
      throw (petOrError).value
    }

    return petOrError.value
  }
}
