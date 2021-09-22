import Specie from '../entities/Specie/Specie'

export default interface SpecieRepository{
    createSpecie(specie: Specie):Promise<Specie>
    findByName(name: string): Promise<Specie>
}
