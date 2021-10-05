import { Pet as PersistencePet, Size as PersistenceSize } from '@prisma/client'
import Description from '../entities/Pet/Description'
import Pet from '../entities/Pet/Pet'
import PetProps from '../entities/Pet/PetProps'
import Size from '../entities/Pet/Size'

export default class PetMapper {
  static toDomain (raw: PersistencePet): Pet {
    const sizeOrError = Size.create(raw.size)
    const descriptionOrError = Description.create(raw.description)

    if (sizeOrError.isLeft()) {
      throw sizeOrError.value
    }

    if (descriptionOrError.isLeft()) {
      throw descriptionOrError.value
    }

    const petOrError = Pet.create({
      description: descriptionOrError.value,
      ownerId: raw.owner_id,
      specieId: raw.specie_id,
      size: sizeOrError.value,
      adopted: raw.adopted
    })

    if (petOrError.isLeft()) {
      throw petOrError.value
    }

    return petOrError.value
  }

  static toPersistence (pet: PetProps) {
    return {
      description: pet.description.value,
      owner_id: pet.ownerId,
      specie_id: pet.specieId,
      size: pet.size.value as PersistenceSize,
      adopted: pet?.adopted
    }
  }
}
