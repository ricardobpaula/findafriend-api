import { Size } from '.prisma/client'
import { prisma } from '@infra/prisma/client'
import Pet from '@core/entities/Pet/Pet'
import PetMapper from '@core/mappers/PetMapper'
import { FindPetsRequest } from '@core/usecases/FindPets/FindPets'
import PetRepository from '../PetRepository'
import PhotoMapper from '@core/mappers/PhotoMapper'

export default class PetRepositoryPrisma implements PetRepository {
  async create (petData: Pet): Promise<Pet> {
    const data = PetMapper.toPersistence(petData.props)
    const photos = petData.props.photos.map(photo => PhotoMapper.toPersistence(photo))
    const pet = await prisma.pet.create({
      data: {
        size: data.size,
        description: data.description,
        owner_id: data.owner_id,
        specie_id: data.specie_id,
        adopted: data.adopted,
        photos: { create: photos }
      },
      include: { photos: true, specie: true }
    })

    return PetMapper.toDomain({ pet, specie: pet.specie, photos: pet.photos })
  }

  async find (params: FindPetsRequest): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      take: params.limit,
      skip: params.offset,
      where: {
        specie_id: { in: params?.species },
        size: params?.size as Size,
        adopted: params?.adopted,
        owner_id: params?.owner
      },
      include: {
        specie: true,
        photos: true
      }
    })

    return pets ? pets.map(pet => PetMapper.toDomain({ pet, specie: pet.specie, photos: pet.photos })) : null
  }

  async findById (id: string): Promise<Pet> {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: {
        specie: true,
        photos: true
      }
    })

    return pet ? PetMapper.toDomain({ pet, specie: pet.specie, photos: pet?.photos }) : null
  }
}
