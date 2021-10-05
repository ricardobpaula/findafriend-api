import Specie from '@modules/pets/entities/Specie/Specie'
import SpecieRepository from '@modules/pets/repositories/SpecieRepository'

type SpeciesResponse = Specie[]

export default class GetAllSpecies {
    private readonly specieRepository: SpecieRepository
    constructor (specieRepository: SpecieRepository) {
      this.specieRepository = specieRepository
    }

    async execute (): Promise<SpeciesResponse> {
      const species = await this.specieRepository.findAll()

      return species
    }
}
