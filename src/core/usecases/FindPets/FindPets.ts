import Pet from '@core/entities/Pet/Pet'
import PetRepository from '@core/repositories/PetRepository'

export type FindPetsRequest = {
  offset: number,
  limit: number,
  species?: number[],
  size?: string,
  adopted?: boolean
}

type PetResponse = {
  id: number,
  description: string,
  size: string,
  adopted: boolean,
  specie: {
    id: number,
    name: string
  }
}

type FindPetsResponse = PetResponse[]

export default class FindPets {
  private readonly petRepository: PetRepository

  constructor (petRepository: PetRepository) {
    this.petRepository = petRepository
  }

  async execute (params: FindPetsRequest): Promise<FindPetsResponse> {
    let pets: Pet[]

    if (params.species) {
      pets = await this.petRepository.find({
        limit: params.limit,
        offset: params.offset,
        size: params?.size,
        species: params.species,
        adopted: params?.adopted
      })
    } else {
      pets = await this.petRepository.find({
        limit: params.limit,
        offset: params.offset,
        size: params?.size,
        adopted: params?.adopted
      })
    }

    return pets.map(pets => ({
      id: pets.id,
      description: pets.props.description.value,
      size: pets.props.size.value,
      adopted: pets.props.adopted,
      specie: {
        id: pets.props.specie.id,
        name: pets.props.specie.props.name.value
      }
    }))
  }
}
