import Pet from '../entities/Pet/Pet'
import { FindPetsRequest } from '../usecases/FindPets/FindPets'

export default interface PetRepository {
    create(pet: Pet):Promise<void>
    find(params: FindPetsRequest):Promise<Pet[]>
}
