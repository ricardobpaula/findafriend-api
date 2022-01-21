import Entity from '@domain/entities/Entity'
import { Either, right } from '@domain/logic/Either'
import InvalidDescriptionError from './errors/InvalidDescriptionError'
import InvalidSizeError from './errors/InvalidSizeError'
import PetProps from './PetProps'

export default class Pet extends Entity<PetProps> {
  private constructor (
    props: PetProps,
    id?:string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt)
  }

  static create (
    props: PetProps,
    id?:string,
    createdAt?: Date,
    updatedAt?: Date): Either<InvalidDescriptionError | InvalidSizeError, Pet> {
    const pet = new Pet(props, id, createdAt, updatedAt)

    return right(pet)
  }
}
