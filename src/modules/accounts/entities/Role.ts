import InvalidRoleError from './errors/InvalidRoleError'

enum ValidRoles {
    'admin' = 'admin',
    'common' = 'common'
}

export default class Role {
    readonly role: ValidRoles

    private constructor (role: ValidRoles) {
      this.role = role
    }

    static validateRoleType (role: string) {
      return (Object.values(ValidRoles).includes(role as ValidRoles))
    }

    static create (roleProps: string): Role {
      if (!this.validateRoleType(roleProps)) {
        throw new InvalidRoleError(roleProps)
      }

      const role = new Role(roleProps as ValidRoles)

      return role
    }
}
