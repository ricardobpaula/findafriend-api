import Entity from '@domain/entities/Entity'
import { Either, right } from '@domain/logic/Either'
import InvalidNameError from './errors/InvalidNameError'
import SpecieProps from './SpecieProps'

export default class Specie extends Entity<SpecieProps> {
  private constructor (props: SpecieProps, id?: number) {
    super(props, id)
  }

  static create (props: SpecieProps, id?:number): Either<InvalidNameError, Specie> {
    const specie = new Specie(props, id)

    return right(specie)
  }
}
