import UserRepositoryInMemory from '@core/repositories/in-memory/UserRepositoryInMemory'
import UserFactory from '@test/factories/UserFactory'
import User from '../User/User'
import RefreshToken from './RefreshToken'

let user: User

describe('Refresh Token Entity', () => {
  beforeEach(async () => {
    const userRespository = new UserRepositoryInMemory()
    const userFactory = new UserFactory(userRespository)
    user = await userFactory.execute()
  })
  it('Should be created a new Refresh Token', () => {
    const refreshToken = RefreshToken.create({ user })
    expect(!!refreshToken).toBeTruthy()
  })
})
