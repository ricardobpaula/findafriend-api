import Pet from '../../entities/Pet/Pet'
import PetRepository from '../../repositories/PetRepository'

export default class FindPets {
    petRepository: PetRepository

    constructor (petRepository: PetRepository) {
      this.petRepository = petRepository
    }

    async all (): Promise<Pet[]> {
      const pets = this.petRepository.findAll()

      return pets
    }
}
