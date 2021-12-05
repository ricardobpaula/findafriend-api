import Entity from '@domain/entities/Entity'
import AvatarProps from './AvatarProps'

export default class Avatar extends Entity<AvatarProps> {
  private constructor (
    props: AvatarProps,
    id?: number,
    createdAt?: Date,
    updatedAt?:Date) {
    super(props, id, createdAt, updatedAt)
  }

  static create (
    props: AvatarProps,
    id?: number,
    createdAt?: Date,
    updatedAt?:Date
  ): Avatar {
    const avatar = new Avatar(props, id, createdAt, updatedAt)

    return avatar
  }
}
