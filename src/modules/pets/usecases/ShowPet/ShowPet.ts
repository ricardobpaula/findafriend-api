import PetRepository from '@modules/pets/repositories/PetRepository'

type ShowPetRequest = {
  id: number
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
  }
}

export default class ShowPet {
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
      }

    }
  }
}
