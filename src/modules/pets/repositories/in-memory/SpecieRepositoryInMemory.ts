import Specie from '../../entities/Specie/Specie'
import SpecieRepository from '../SpecieRepository'

export default class SpecieRepositoryInMemory implements SpecieRepository {
    private items: Array<Specie>

    constructor () {
      this.items = []
    }

    async createSpecie (specie: Specie): Promise<Specie> {
      const specieOrError = Specie.create(specie.props, this.items.length + 1)
      if (specieOrError.isLeft()) {
        throw specieOrError.value
      }
      this.items.push(specieOrError.value)
      return specieOrError.value
    }

    async findOneByName (name: string): Promise<Specie> {
      return this.items.find(item => item.props.name.value === name)
    }

    async findManyByName (names: string[]): Promise<Specie[]> {
      return names.map(name => this.items.find(item => item.props.name.value === name))
    }
}
