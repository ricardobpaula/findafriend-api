import Entity from '@domain/entities/Entity'
import { Either, right } from '@domain/logic/Either'
import InvalidNameError from './errors/InvalidNameError'
import SpecieProps from './SpecieProps'

export default class Specie extends Entity<SpecieProps> {
  private constructor (
    props: SpecieProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date) {
    super(props, id, createdAt, updatedAt)
  }

  static create (
    props: SpecieProps,
    id?:string,
    createdAt?: Date,
    updatedAt?: Date
  ): Either<InvalidNameError, Specie> {
    const specie = new Specie(props, id, createdAt, updatedAt)

    return right(specie)
  }
}
