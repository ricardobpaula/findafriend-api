import Pet from '@core/entities/Pet/Pet'
import { FindPetsRequest } from '@core/usecases/FindPets/FindPets'

export default interface PetRepository {
    create(pet: Pet):Promise<void>
    find(params: FindPetsRequest):Promise<Pet[]>
    findById(id: number):Promise<Pet>
}
