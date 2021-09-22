import Pet from '../../entities/Pet/Pet'
import PetRepository from '../PetRepository'

export default class PetRepositoryInMemory implements PetRepository {
    private itens: Array<Pet>

    constructor () {
      this.itens = []
    }

    async createPet (pet: Pet): Promise<Pet> {
      const petOrError = Pet.create(pet.props, this.itens.length + 1)
      if (petOrError.isLeft()) {
        throw petOrError.value
      }
      this.itens.push(petOrError.value)
      return petOrError.value
    }

    async findAll (): Promise<Pet[]> {
      return this.itens
    }
}
