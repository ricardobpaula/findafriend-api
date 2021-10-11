import Pet from '@modules/pets/entities/Pet/Pet'
import PetRepository from '@modules/pets/repositories/PetRepository'
import SpecieRepository from '@modules/pets/repositories/SpecieRepository'

export type FindPetsRequest = {
  offset: number,
  limit: number,
  species?: number[],
  size?: string
}

type PetResponse = {
  id: number,
  description: string,
  size: string,
  specie: {
    id: number,
    name: string
  }
}

type FindPetsResponse = PetResponse[]

export default class FindPets {
  private readonly petRepository: PetRepository
  private readonly specieRepository: SpecieRepository

  constructor (petRepository: PetRepository, specieRepository: SpecieRepository) {
    this.petRepository = petRepository
    this.specieRepository = specieRepository
  }

  async execute (params: FindPetsRequest): Promise<FindPetsResponse> {
    let pets: Pet[]

    if (params.species) {
      pets = await this.petRepository.find({
        limit: params.limit,
        offset: params.offset,
        size: params?.size,
        species: params.species
      })
    } else {
      pets = await this.petRepository.find({
        limit: params.limit,
        offset: params.offset,
        size: params?.size
      })
    }

    return pets.map(pets => ({
      id: pets.id,
      description: pets.props.description.value,
      size: pets.props.size.value,
      specie: {
        id: pets.props.specie.id,
        name: pets.props.specie.props.name.value
      }
    }))
  }
}
