import { v4 as uuid } from 'uuid'

import RefreshToken from '@core/usecases/RefreshToken/RefreshToken'
import RefreshTokenRepositoryInMemory from '@core/repositories/in-memory/RefreshTokenRepositoryInMemory'
import UserRepositoryInMemory from '@core/repositories/in-memory/UserRepositoryInMemory'
import RefreshTokenRepository from '@core/repositories/RefreshTokenRepository'
import UserRepository from '@core/repositories/UserRepository'
import JtwAdapter from '@infra/gateways/JwtAdapter'
import UserFactory from '@test/factories/UserFactory'
import AuthUser, { AuthReponse } from '../AuthUser/AuthUser'

const email = 'peter@peterphotos.com'
const password = '123456'
let userRepository: UserRepository
let refreshTokenReposity: RefreshTokenRepository
let refreshToken: RefreshToken
let auth: AuthReponse

describe('Refresh token', () => {
  beforeEach(async () => {
    userRepository = new UserRepositoryInMemory()
    refreshTokenReposity = new RefreshTokenRepositoryInMemory()
    const userFactory = new UserFactory(userRepository)
    const authUser = new AuthUser(userRepository, refreshTokenReposity, new JtwAdapter())
    await userFactory.execute()
    auth = await authUser.execute({ email, password })
    refreshToken = new RefreshToken(refreshTokenReposity, new JtwAdapter())
  })

  it('Should be refresh token', async () => {
    if (auth.isRight()) {
      const newToken = await refreshToken.execute({ token: auth.value.refreshToken.id })
      expect(newToken.isRight()).toBeTruthy()
    }
  })

  it('Should be invalid token', async () => {
    const newToken = await refreshToken.execute({ token: uuid() })
    expect(newToken.isLeft()).toBeTruthy()
  })
})
