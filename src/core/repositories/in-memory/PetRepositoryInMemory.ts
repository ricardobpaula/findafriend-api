import { v4 as uuid } from 'uuid'

import { FindPetsRequest } from '@core/usecases/FindPets/FindPets'
import Pet from '../../entities/Pet/Pet'
import PetRepository from '../PetRepository'
import Photo from '@core/entities/Photo/Photo'

export default class PetRepositoryInMemory implements PetRepository {
  private items: Array<Pet>

  constructor () {
    this.items = []
  }

  async create (pet: Pet): Promise<Pet> {
    const photos = pet.props.photos.map(photo => Photo.create(photo.props, uuid(), new Date(), new Date()))
    const petOrError = Pet.create({
      adopted: pet.props.adopted,
      description: pet.props.description,
      ownerId: pet.props.ownerId,
      size: pet.props.size,
      specie: pet.props.specie,
      photos
    }, uuid(), new Date(), new Date())
    if (petOrError.isLeft()) {
      throw petOrError.value
    }
    this.items.push(petOrError.value)

    return petOrError.value
  }

  async find (params: FindPetsRequest): Promise<Pet[]> {
    if (params.species) {
      return this.items.filter(pet => params.species.includes(pet.props.specie.id) &&
        (params.adopted === undefined ? true : pet.props.adopted === params.adopted) &&
        (params.size === undefined ? true : pet.props.size.value === params.size)
      ).splice(params.offset, params.limit)
    }

    return this.items.filter(pet => pet.props.adopted === false &&
      (params.size === undefined ? true : pet.props.size.value === params.size)
    ).splice(params.offset, params.limit)
  }

  async findById (id: string): Promise<Pet> {
    return this.items.find(item => item.id === id)
  }
}
