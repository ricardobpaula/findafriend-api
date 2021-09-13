import UserFactory from '@test/factories/UserFactory'
import JtwAdapter from '@infra/gateways/JwtAdapter'

import UserRepositoryInMemory from '../../repositories/in-memory/UserRepositoryInMemory'
import AuthUser from './AuthUser'

let userRepositoryInMemory: UserRepositoryInMemory
let authUser: AuthUser
let tokenAdapter: JtwAdapter
let userFactory: UserFactory

describe('Authentication a new user', () => {
  beforeEach(async () => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    tokenAdapter = new JtwAdapter()
    authUser = new AuthUser(userRepositoryInMemory, tokenAdapter)
    userFactory = new UserFactory(userRepositoryInMemory)
    await userFactory.execute()
  })
  it('should receive a valid token', async () => {
    const token = await authUser.execute('peter@peterphotos.com', '123456')
    expect(!!await tokenAdapter.verify(token)).toBeTruthy()
  })
})
