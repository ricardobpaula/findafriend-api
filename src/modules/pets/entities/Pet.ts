import Entity from '@domain/entities/Entity'
import PetProps from './interfaces/PetProps'

export default class Pet extends Entity<PetProps> {
  private constructor (props: PetProps, id?:number) {
    super(props, id)
  }

  static create (props: PetProps, id?:number): Pet {
    const pet = new Pet(props, id)

    return pet
  }
}
