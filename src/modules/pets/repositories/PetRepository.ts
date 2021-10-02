import Pet from '../entities/Pet/Pet'

export type FindPetParams = {
    offset: number,
    limit: number,
    speciesIds?: number[],
    size?: string
}

export default interface PetRepository {
    createPet(pet: Pet):Promise<Pet>
    find(params: FindPetParams):Promise<Pet[]>
}
