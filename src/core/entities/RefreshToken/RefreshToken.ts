import Entity from '@domain/entities/Entity'
import RefreshTokenProps from './RefreshTokenProps'

export default class RefreshToken extends Entity<RefreshTokenProps> {
  private constructor (
    props: RefreshTokenProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date) {
    super(props, id, createdAt, updatedAt)
  }

  static create (
    props: RefreshTokenProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ): RefreshToken {
    const refreshToken = new RefreshToken(props, id, createdAt, updatedAt)

    return refreshToken
  }
}
