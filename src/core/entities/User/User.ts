import Entity from '@domain/entities/Entity'
import { Either, right } from '@domain/logic/Either'
import InvalidEmailError from './errors/InvalidEmailError'
import InvalidPasswordError from './errors/InvalidPasswordError'
import InvalidPhoneError from './errors/InvalidPhoneError'
import InvalidRoleError from './errors/InvalidRoleError'
import UserProps from './UserProps'

export default class User extends Entity<UserProps> {
  private constructor (
    props: UserProps,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date) {
    super(props, id, createdAt, updatedAt)
  }

  static create (
    props: UserProps,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date):
    Either<
      InvalidEmailError | InvalidPasswordError | InvalidPhoneError | InvalidRoleError,
      User
    > {
    const user = new User(props, id, createdAt, updatedAt)

    return right(user)
  }
}
