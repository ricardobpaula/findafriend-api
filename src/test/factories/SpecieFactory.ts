import Specie from '@core/entities/Specie/Specie'
import SpecieRepository from '@core/repositories/SpecieRepository'
import CreateSpecie from '@core/usecases/CreateSpecie/CreateSpecie'

export default class SpecieFactory {
    private readonly specieRepository: SpecieRepository

    constructor (specieRepository: SpecieRepository) {
      this.specieRepository = specieRepository
    }

    async execute (name: string = 'dog'):Promise<Specie> {
      const createSpecie = new CreateSpecie(this.specieRepository)
      const specieOrError = await createSpecie.execute({ name })

      if (specieOrError.isLeft()) {
        throw specieOrError.value
      }

      return specieOrError.value
    }
}
