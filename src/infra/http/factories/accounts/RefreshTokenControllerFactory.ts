import Controller from '@domain/infra/gateways/Controller'
import RefreshToken from '@core/usecases/RefreshToken/RefreshToken'
import RefreshTokenRepositoryPrisma from '@core/repositories/prisma/RefreshTokenReposityPrisma'
import JtwAdapter from '@infra/gateways/JwtAdapter'
import RefreshTokenController from '@core/usecases/RefreshToken/RefreshTokenController'

export default function makeRefreshTokenController (): Controller {
  const refreshTokenRepository = new RefreshTokenRepositoryPrisma()
  const accessToken = new JtwAdapter()
  const refreshToken = new RefreshToken(refreshTokenRepository, accessToken)
  const refreshTokenController = new RefreshTokenController(refreshToken)

  return refreshTokenController
}
