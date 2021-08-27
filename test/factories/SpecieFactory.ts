import Specie from "../../src/modules/pets/entities/Specie"
import SpecieRepository from "../../src/modules/pets/repositories/SpecieRepository"

export default class SpecieFactorys {
    private readonly specieRepository: SpecieRepository
    private readonly name: string

    constructor(specieRepository: SpecieRepository){
        this.specieRepository = specieRepository
        this.name = 'dog'
    }

    async execute():Promise<Specie> {
        return await this.specieRepository.createSpecie({name: this.name})
    }
}