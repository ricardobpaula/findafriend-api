import SpecieProps from "../../entities/interfaces/SpecieProps";
import Specie from "../../entities/Specie";
import SpecieRepository from "../SpecieRepository";

export default class SpecieRepositoryInMemory implements SpecieRepository {
    private itens: Array<Specie>

    constructor(){
        this.itens = []
    }
    async createSpecie(specieProps: SpecieProps): Promise<Specie> {
        const newSpecie = new Specie(specieProps,this.itens.length+1)
        this.itens.push(newSpecie)
        return newSpecie
    }
    async findByName(name: string): Promise<Specie> {
        return this.itens.find(item=>item.props.name===name)
    }

}