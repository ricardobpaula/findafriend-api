import Photo from '@core/entities/Photo/Photo'
import {
  Pet as PersistencePet,
  Specie as PersistenceSpecie,
  Size as PersistenceSize,
  Photo as PersistencePhoto
} from '@prisma/client'
import Description from '../entities/Pet/Description'
import Pet from '../entities/Pet/Pet'
import PetProps from '../entities/Pet/PetProps'
import Size from '../entities/Pet/Size'
import Name from '../entities/Specie/Name'
import Specie from '../entities/Specie/Specie'

type PersistenceProps = {
  pet: PersistencePet,
  specie: PersistenceSpecie,
  photos?: PersistencePhoto[]
}

export default class PetMapper {
  static toDomain (raw: PersistenceProps): Pet {
    const sizeOrError = Size.create(raw.pet.size)
    const descriptionOrError = Description.create(raw.pet.description)
    const nameOrError = Name.create(raw.specie.name)
    const photos = (
      !raw.photos
        ? undefined
        : raw.photos.map(photo => Photo.create({
          date: photo?.date,
          name: photo?.name,
          path: photo?.path,
          originalName: photo?.original_name,
          size: Number(photo?.size)
        }, photo?.id, photo?.created_at, photo?.updated_at))
    )

    if (sizeOrError.isLeft()) {
      throw sizeOrError.value
    }

    if (descriptionOrError.isLeft()) {
      throw descriptionOrError.value
    }

    if (nameOrError.isLeft()) {
      throw nameOrError.value
    }

    const specieOrError = Specie.create(
      { name: nameOrError.value },
      raw.specie.id,
      raw.specie.created_at,
      raw.specie.updated_at)

    if (specieOrError.isLeft()) {
      throw specieOrError.value
    }

    const petOrError = Pet.create({
      description: descriptionOrError.value,
      ownerId: raw.pet.owner_id,
      specie: specieOrError.value,
      size: sizeOrError.value,
      adopted: raw.pet.adopted,
      photos
    },
    raw.pet.id,
    raw.pet.created_at,
    raw.pet.updated_at)

    if (petOrError.isLeft()) {
      throw petOrError.value
    }

    return petOrError.value
  }

  static toPersistence (pet: PetProps) {
    return {
      description: pet.description.value,
      owner_id: pet.ownerId,
      specie_id: pet.specie.id,
      size: pet.size.value as PersistenceSize,
      adopted: pet?.adopted
    }
  }
}
