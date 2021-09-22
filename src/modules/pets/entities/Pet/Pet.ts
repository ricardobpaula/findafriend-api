import Entity from '@domain/entities/Entity'
import { Either, right } from '@domain/logic/Either'
import InvalidDescriptionError from './errors/InvalidDescriptionError'
import InvalidSizeError from './errors/InvalidSizeError'
import PetProps from './PetProps'

export default class Pet extends Entity<PetProps> {
  private constructor (props: PetProps, id?:number) {
    super(props, id)
  }

  static create (props: PetProps, id?:number): Either<InvalidDescriptionError | InvalidSizeError, Pet> {
    const pet = new Pet(props, id)

    return right(pet)
  }
}
