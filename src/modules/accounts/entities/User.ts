import Entity from '@domain/entities/Entity'
import UserProps from './interfaces/UserProps'

export default class User extends Entity<UserProps> {
  private constructor (props: UserProps, id?: number) {
    super(props, id)
  }

  static create (props: UserProps, id?: number): User {
    const user = new User(props, id)

    return user
  }
}
