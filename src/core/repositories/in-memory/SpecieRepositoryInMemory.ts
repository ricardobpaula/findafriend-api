import { v4 as uuid } from 'uuid'
import Specie from '../../entities/Specie/Specie'
import SpecieRepository from '../../repositories/SpecieRepository'

export default class SpecieRepositoryInMemory implements SpecieRepository {
    private items: Array<Specie>

    constructor () {
      this.items = []
    }

    async create (specie: Specie): Promise<Specie> {
      const specieOrError = Specie.create(specie.props, uuid(), new Date(), new Date())
      if (specieOrError.isLeft()) {
        throw specieOrError.value
      }
      this.items.push(specieOrError.value)
      return specieOrError.value
    }

    async findByid (id: string): Promise<Specie> {
      return this.items.find(item => item.id === id)
    }

    async findByName (name: string): Promise<Specie> {
      return this.items.find(item => item.props.name.value === name)
    }

    async findAll (): Promise<Specie[]> {
      return this.items
    }
}
