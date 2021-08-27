import PetProps from "../../entities/interfaces/PetProps";
import Pet from "../../entities/Pet";
import PetRepository from "../PetRepository"

export default class PetRepositoryInMemory implements PetRepository {
    private itens: Array<Pet>
    
    constructor(){
        this.itens = []
    }

    async createPet(petProps: PetProps): Promise<Pet> {
        const pet = new Pet(petProps,this.itens.length+1)
        this.itens.push(pet)
        return pet
    }

}