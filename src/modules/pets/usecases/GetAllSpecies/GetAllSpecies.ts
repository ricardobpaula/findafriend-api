import SpecieRepository from '@modules/pets/repositories/SpecieRepository'

export type SpecieResponse = {
  id: number,
  name: string
}
type GetAllSpeciesResponse = SpecieResponse[]

export default class GetAllSpecies {
    private readonly specieRepository: SpecieRepository
    constructor (specieRepository: SpecieRepository) {
      this.specieRepository = specieRepository
    }

    async execute (): Promise<GetAllSpeciesResponse> {
      const species = await this.specieRepository.findAll()

      return species.map(specie => ({
        id: specie.id,
        name: specie.props.name.value
      }))
    }
}
