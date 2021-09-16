import { Either, left, right } from '@domain/logic/Either'
import InvalidRoleError from './errors/InvalidRoleError'

enum ValidRoles {
    'admin' = 'admin',
    'common' = 'common'
}

export default class Role {
    private readonly role: ValidRoles

    private constructor (role: ValidRoles) {
      this.role = role
    }

    get value(): string {
      return this.role
    }

    static validateRoleType (role: string) {
      return (Object.values(ValidRoles).includes(role as ValidRoles))
    }

    static create (roleProps: string = ValidRoles.common): Either<InvalidRoleError,Role> {
      
      if (!this.validateRoleType(roleProps)) {
        return left(new InvalidRoleError(roleProps))
      }

      const role = new Role(roleProps as ValidRoles)

      return right(role)
    }
}
