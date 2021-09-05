import PetProps from '../../entities/interfaces/PetProps'
import Pet from '../../entities/Pet'
import PetRepository from '../../repositories/PetRepository'

export default class CreatePet {
    petRepository: PetRepository

    constructor (petRepository: PetRepository) {
      this.petRepository = petRepository
    }

    async execute (petProps: PetProps): Promise<Pet> {
      const pet = this.petRepository.createPet(petProps)

      return pet
    }
}
