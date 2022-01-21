import Specie from '@core/entities/Specie/Specie'

export default interface SpecieRepository{
    create(specie: Specie):Promise<Specie>
    findByid(id: string):Promise<Specie>
    findByName(name: string): Promise<Specie>
    findAll():Promise<Specie[]>
}
