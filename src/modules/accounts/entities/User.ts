import Entity from '@domain/entities/Entity'
import { Either, right } from '@domain/logic/Either'
import InvalidEmailError from './errors/InvalidEmailError'
import InvalidPasswordError from './errors/InvalidPasswordError'
import InvalidPhoneError from './errors/InvalidPhoneError'
import InvalidRoleError from './errors/InvalidRoleError'
import UserProps from './interfaces/UserProps'

export default class User extends Entity<UserProps> {
  private constructor (props: UserProps, id?: number) {
    super(props, id)
  }

  static create (props: UserProps, id?: number):
    Either<
      InvalidEmailError | InvalidPasswordError | InvalidPhoneError | InvalidRoleError,
      User
    > {
    const user = new User(props, id)

    return right(user)
  }
}
