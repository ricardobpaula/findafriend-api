import PetRepository from '@core/repositories/PetRepository'

type ShowPetRequest = {
  id: number
}

type PhotoResponse = {
  id: number,
  name: string,
  path: string,
  size: number,
  date: Date
}

type ShowPetResponse = {
  id: number,
  description: string,
  size: string,
  adopted: boolean,
  ownerId: number,
  specie: {
    id: number,
    name: string
  },
  photos?: PhotoResponse[]
}

export default class GetPet {
  private readonly petRepository: PetRepository
  constructor (petRepository: PetRepository) {
    this.petRepository = petRepository
  }

  async execute ({ id }: ShowPetRequest): Promise<ShowPetResponse> {
    const pet = await this.petRepository.findById(id)

    return {
      id: pet.id,
      description: pet.props.description.value,
      size: pet.props.size.value,
      adopted: pet.props.adopted,
      ownerId: pet.props.ownerId,
      specie: {
        id: pet.props.specie.id,
        name: pet.props.specie.props.name.value
      },
      photos: pet.props?.photos?.map(photo => ({
        id: photo.id,
        name: photo.props.name,
        path: photo.props.path,
        size: photo.props.size,
        date: photo.props.date
      }))
    }
  }
}
