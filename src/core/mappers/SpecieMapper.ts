import { Specie as PersistenceSpecie } from '@prisma/client'
import Name from '../entities/Specie/Name'
import Specie from '../entities/Specie/Specie'
import SpecieProps from '../entities/Specie/SpecieProps'

export default class SpecieMapper {
  static toDomain (raw: PersistenceSpecie): Specie {
    const nameOrError = Name.create(raw.name)

    if (nameOrError.isLeft()) {
      throw nameOrError.value
    }

    const specieOrError = Specie.create({
      name: nameOrError.value
    },
    raw.id,
    raw.created_at,
    raw.updated_at)

    if (specieOrError.isLeft()) {
      throw specieOrError.value
    }

    return specieOrError.value
  }

  static toPersistence (specie: SpecieProps) {
    return {
      name: specie.name.value
    }
  }
}
