import Pet from '@core/entities/Pet/Pet'
import { FindPetsRequest } from '@core/usecases/FindPets/FindPets'

export default interface PetRepository {
    create(pet: Pet):Promise<Pet>
    find(params: FindPetsRequest):Promise<Pet[]>
    findById(id: string):Promise<Pet>
}
