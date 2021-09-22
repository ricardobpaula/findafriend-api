import Specie from '../../entities/Specie/Specie'
import SpecieRepository from '../SpecieRepository'

export default class SpecieRepositoryInMemory implements SpecieRepository {
    private itens: Array<Specie>

    constructor () {
      this.itens = []
    }

    async createSpecie (specie: Specie): Promise<Specie> {
      const specieOrError = Specie.create(specie.props, this.itens.length + 1)
      if (specieOrError.isLeft()) {
        throw specieOrError.value
      }
      this.itens.push(specieOrError.value)
      return specieOrError.value
    }

    async findByName (name: string): Promise<Specie> {
      return this.itens.find(item => item.props.name.value === name)
    }
}
