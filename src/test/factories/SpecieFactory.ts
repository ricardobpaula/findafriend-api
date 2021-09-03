import Specie from "../../src/modules/pets/entities/Specie"
import SpecieRepository from "../../src/modules/pets/repositories/SpecieRepository"

export default class SpecieFactory {
    private readonly specieRepository: SpecieRepository

    constructor(specieRepository: SpecieRepository){
        this.specieRepository = specieRepository
    }

    async execute(name?: string, ):Promise<Specie> {
        return await this.specieRepository.createSpecie({name})
    }
}