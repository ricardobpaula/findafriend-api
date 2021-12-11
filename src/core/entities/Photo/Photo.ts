import Entity from '@domain/entities/Entity'
import PhotoProps from './PhotoProps'

export default class Photo extends Entity<PhotoProps> {
  private constructor (
    props: PhotoProps,
    id?: number,
    createdAt?: Date,
    updatedAt?:Date) {
    super(props, id, createdAt, updatedAt)
  }

  static create (
    props: PhotoProps,
    id?: number,
    createdAt?: Date,
    updatedAt?:Date
  ): Photo {
    const photo = new Photo(props, id, createdAt, updatedAt)

    return photo
  }
}
