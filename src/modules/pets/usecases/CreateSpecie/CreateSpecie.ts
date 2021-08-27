import SpecieProps from "../../entities/interfaces/SpecieProps";
import Specie from "../../entities/Specie"
import SpecieRepository from "../../repositories/SpecieRepository";
import SpecieAlreadyExists from "./errors/SpecieAlreadyExists";

export default class CreateSpecie {
    specieRepository: SpecieRepository
    constructor(specieRepository: SpecieRepository){
        this.specieRepository = specieRepository
    }

    async execute(specieProps:SpecieProps ):Promise<Specie>{
        const specieAlreadyExists = await this.specieRepository.findByName(specieProps.name)

        if (specieAlreadyExists) {
            throw new SpecieAlreadyExists(specieProps.name)
        }

        const specie = this.specieRepository.createSpecie(specieProps)

        if(!specie){
            throw new Error('Cannot create a specie')
        }

        return specie
    }
}