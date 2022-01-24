import UserFactory from '@test/factories/UserFactory'
import JtwAdapter from '@infra/gateways/JwtAdapter'

import UserRepositoryInMemory from '../../repositories/in-memory/UserRepositoryInMemory'
import AuthUser from './AuthUser'
import RefreshTokenRepository from '@core/repositories/RefreshTokenRepository'
import UserRepository from '@core/repositories/UserRepository'
import RefreshTokenRepositoryInMemory from '@core/repositories/in-memory/RefreshTokenRepositoryInMemory'

let userRepository: UserRepository
let refreshTokenRepository: RefreshTokenRepository
let authUser: AuthUser
let tokenAdapter: JtwAdapter
let userFactory: UserFactory

const email = 'peter@peterphotos.com'
const password = '123456'

describe('Authentication a new user', () => {
  beforeEach(async () => {
    userRepository = new UserRepositoryInMemory()
    refreshTokenRepository = new RefreshTokenRepositoryInMemory()
    tokenAdapter = new JtwAdapter()
    authUser = new AuthUser(userRepository, refreshTokenRepository, tokenAdapter)
    userFactory = new UserFactory(userRepository)
    await userFactory.execute()
  })
  it('should receive a valid token', async () => {
    const tokenOrError = await authUser.execute({ email, password })
    expect(tokenOrError.isRight()).toBeTruthy()
  })

  it('should be created a valid refresh token', async () => {
    const authOrError = await authUser.execute({ email, password })

    if (authOrError.isRight()) {
      expect(!!authOrError.value.refreshToken).toBeTruthy()
    }
  })
})
