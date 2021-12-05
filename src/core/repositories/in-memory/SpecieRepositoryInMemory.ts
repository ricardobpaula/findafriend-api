import Specie from '../../entities/Specie/Specie'
import SpecieRepository from '../../repositories/SpecieRepository'

export default class SpecieRepositoryInMemory implements SpecieRepository {
    private items: Array<Specie>

    constructor () {
      this.items = []
    }

    async create (specie: Specie): Promise<Specie> {
      const specieOrError = Specie.create(specie.props, this.items.length + 1)
      if (specieOrError.isLeft()) {
        throw specieOrError.value
      }
      this.items.push(specieOrError.value)
      return specieOrError.value
    }

    async findByid (id: number): Promise<Specie> {
      return this.items.find(item => item.id === id)
    }

    async findByName (name: string): Promise<Specie> {
      return this.items.find(item => item.props.name.value === name)
    }

    async findAll (): Promise<Specie[]> {
      return this.items
    }
}
