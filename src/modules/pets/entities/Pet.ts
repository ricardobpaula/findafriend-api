import Entity from '@domain/entities/Entity'
import PetProps from './interfaces/PetProps'

export default class Pet extends Entity<PetProps> {
  constructor (props: PetProps, id?:number) {
    super(props, id)
  }
}
