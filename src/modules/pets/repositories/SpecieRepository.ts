import SpecieProps from '../entities/interfaces/SpecieProps'
import Specie from '../entities/Specie'

export default interface SpecieRepository{
    createSpecie(specieProps: SpecieProps):Promise<Specie>
    findByName(name: string): Promise<Specie>
}
