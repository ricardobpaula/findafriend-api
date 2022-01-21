import Pet from '@core/entities/Pet/Pet'
import PetRepository from '@core/repositories/PetRepository'
import SpecieRepository from '@core/repositories/SpecieRepository'
import CreatePet from '@core/usecases/CreatePet/CreatePet'
import { File } from '@domain/infra/gateways/UploadFileManager'

type PetAttributes = {
    description: string,
    ownerId: string,
    specieId: string,
    size: string
  }

export default class PetFactory {
  private readonly petRepository: PetRepository
  private readonly specieRepository: SpecieRepository

  constructor (
    petRepository: PetRepository,
    specieRepository: SpecieRepository) {
    this.petRepository = petRepository
    this.specieRepository = specieRepository
  }

  async execute (pet: PetAttributes): Promise<Pet> {
    const createPet = new CreatePet(
      this.petRepository,
      this.specieRepository)

    const photo = {
      date: new Date(),
      name: 'default.png',
      originalName: 'default.png',
      path: '',
      size: 1024,
      type: 'image/png'
    } as File

    const petOrError = await createPet.execute({
      description: pet.description,
      ownerId: pet.ownerId,
      size: pet.size,
      specieId: pet.specieId,
      files: [photo]
    })

    if ((petOrError).isLeft()) {
      throw (petOrError).value
    }

    return petOrError.value
  }
}
