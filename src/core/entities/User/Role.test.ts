import Role from './Role'

describe('Role value', () => {
  it('should role valid value', () => {
    const roleOrError = Role.create('admin')
    expect(roleOrError.isRight()).toBeTruthy()
  })

  it('should be not a valid role', () => {
    const roleOrError = Role.create('administrator')
    expect(roleOrError.isLeft()).toBeTruthy()
  })
})
