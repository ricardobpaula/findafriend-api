import Pet from '@core/entities/Pet/Pet'
import PetRepository from '@core/repositories/PetRepository'

export type FindPetsRequest = {
  offset: number,
  limit: number,
  species?: number[],
  size?: string,
  adopted?: boolean
}

type PhotoResponse = {
  id: number,
  name: string,
  originalName: string,
  path: string,
  size: number,
  date: Date
}

type PetResponse = {
  id: number,
  description: string,
  size: string,
  adopted: boolean,
  specie: {
    id: number,
    name: string
  },
  photos?: PhotoResponse[]
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

    return pets.map(pet => ({
      id: pet.id,
      description: pet.props.description.value,
      size: pet.props.size.value,
      adopted: pet.props.adopted,
      specie: {
        id: pet.props.specie.id,
        name: pet.props.specie.props.name.value
      },
      photos: pet.props?.photos?.map(photo => ({
        id: photo.id,
        name: photo.props.name,
        originalName: photo.props.originalName,
        path: photo.props.path,
        size: photo.props.size,
        date: photo.props.date
      }))
    }))
  }
}
