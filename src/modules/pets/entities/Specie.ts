import Entity from '@domain/entities/Entity'
import SpecieProps from './interfaces/SpecieProps'

export default class Specie extends Entity<SpecieProps> {
  private constructor (props: SpecieProps, id?: number) {
    super(props, id)
  }

  static create (props: SpecieProps, id?:number): Specie {
    const specie = new Specie(props, id)

    return specie
  }
}
