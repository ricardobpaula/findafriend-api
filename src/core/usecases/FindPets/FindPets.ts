import Pet from '@core/entities/Pet/Pet'
import PetRepository from '@core/repositories/PetRepository'

export type FindPetsRequest = {
  offset: number,
  limit: number,
  species?: string[],
  size?: string,
  adopted?: boolean,
  owner?: string
}

type PhotoResponse = {
  id: string,
  name: string,
  originalName: string,
  path: string,
  size: number,
  date: Date
}

type PetResponse = {
  id: string,
  description: string,
  size: string,
  adopted: boolean,
  createdAt: Date,
  specie: {
    id: string,
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
        adopted: params?.adopted,
        owner: params?.owner
      })
    } else {
      pets = await this.petRepository.find({
        limit: params.limit,
        offset: params.offset,
        size: params?.size,
        adopted: params?.adopted,
        owner: params?.owner
      })
    }

    return pets.map(pet => ({
      id: pet.id,
      description: pet.props.description.value,
      size: pet.props.size.value,
      adopted: pet.props.adopted,
      createdAt: pet.createdAt,
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
