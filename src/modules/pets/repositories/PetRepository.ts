import Pet from '../entities/Pet/Pet'

export default interface PetRepository {
    createPet(pet: Pet):Promise<Pet>
    findAll():Promise<Pet[]>
}
