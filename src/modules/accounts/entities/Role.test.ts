import InvalidRoleError from './errors/InvalidRoleError'
import Role from './Role'

describe('Role value', () => {
  it('should role valid value', () => {
    const role = Role.create('admin')
    expect(role.role).toBe('admin')
  })

  it('should be not a valid role', () => {
    const error = () => {
      Role.create('administrator')
    }
    expect(error).toThrowError(InvalidRoleError)
  })
})
