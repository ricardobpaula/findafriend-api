import InvalidRoleError from './errors/InvalidRoleError'

enum ValidRoles {
    'admin',
    'common'
}

export default class Role {
    readonly role: string

    private constructor (role: ValidRoles) {
      this.role = ValidRoles[role]
    }

    static validateRoleType (role: string) {

        return (Object.values(ValidRoles).includes(role))
    }

    static create (roleProps: string): Role {

        if (!this.validateRoleType(roleProps)){
            throw new InvalidRoleError(roleProps);
        }

        const role = new Role(ValidRoles[roleProps])

        return role
    }
}
