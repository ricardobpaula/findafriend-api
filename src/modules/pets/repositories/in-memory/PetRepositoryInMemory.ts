import { FindPetsRequest } from '@modules/pets/usecases/FindPets/FindPets'
import Pet from '../../entities/Pet/Pet'
import PetRepository from '../PetRepository'

export default class PetRepositoryInMemory implements PetRepository {
  // private itens: Array<Pet>

  constructor (private itens: Pet[] = []) {}

  async createPet (pet: Pet): Promise<Pet> {
    const petOrError = Pet.create(pet.props, this.itens.length + 1)
    if (petOrError.isLeft()) {
      throw petOrError.value
    }
    this.itens.push(petOrError.value)
    return petOrError.value
  }

  async find (params: FindPetsRequest): Promise<Pet[]> {
    // TODO implements params
    return this.itens
  }
}
