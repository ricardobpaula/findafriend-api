import Pet from '../entities/Pet/Pet'
import { FindPetsRequest } from '../usecases/FindPets/FindPets'

export default interface PetRepository {
    createPet(pet: Pet):Promise<Pet>
    find(params: FindPetsRequest):Promise<Pet[]>
}
