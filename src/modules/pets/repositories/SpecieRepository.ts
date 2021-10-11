import Specie from '../entities/Specie/Specie'

export default interface SpecieRepository{
    create(specie: Specie):Promise<Specie>
    findByid(id: number):Promise<Specie>
    findByName(name: string): Promise<Specie>
    findAll():Promise<Specie[]>
}
