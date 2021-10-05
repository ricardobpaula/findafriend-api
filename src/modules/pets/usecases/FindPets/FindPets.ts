import Pet from '@modules/pets/entities/Pet/Pet'
import PetRepository from '@modules/pets/repositories/PetRepository'
import SpecieRepository from '@modules/pets/repositories/SpecieRepository'

export type FindPetsRequest = {
  offset: number,
  limit: number,
  species?: number[],
  size?: string
}

type FindPetsResponse = Pet[]

export default class FindPets {
  private readonly petRepository: PetRepository
  private readonly specieRepository: SpecieRepository

  constructor (petRepository: PetRepository, specieRepository: SpecieRepository) {
    this.petRepository = petRepository
    this.specieRepository = specieRepository
  }

  async execute (params: FindPetsRequest): Promise<FindPetsResponse> {
    if (params.species) {
      // const species = await this.specieRepository.findManyByName(params.species)
      // if (species) {
      //   const speciesIds = species.map(value => value.id)

      return await this.petRepository.find({
        limit: params.limit,
        offset: params.offset,
        size: params?.size,
        species: params.species
      })
    }
    // }

    return await this.petRepository.find({
      limit: params.limit,
      offset: params.offset,
      size: params?.size
    })
  }
}
