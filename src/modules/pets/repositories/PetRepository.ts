import PetProps from '../entities/interfaces/PetProps'
import Pet from '../entities/Pet'

export default interface PetRepository {
    createPet(petProps: PetProps):Promise<Pet>
    findAll():Promise<Pet[]>
}
