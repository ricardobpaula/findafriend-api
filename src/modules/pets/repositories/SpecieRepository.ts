import Specie from '../entities/Specie/Specie'

export default interface SpecieRepository{
    createSpecie(specie: Specie):Promise<Specie>
    findOneByName(name: string): Promise<Specie>
    findManyByName(names: string[]): Promise<Specie[]>
}
