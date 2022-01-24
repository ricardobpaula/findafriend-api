import RefreshToken from '@core/entities/RefreshToken/RefreshToken'
import User from '@core/entities/User/User'
import { RefreshToken as RefreshTokenPersistence } from '@prisma/client'

type Raw = {
    refreshToken: RefreshTokenPersistence,
    user: User
}

export default class RefreshTokenMapper {
  static toDomain (raw: Raw): RefreshToken {
    const refreshToken = RefreshToken.create(
      { user: raw.user },
      raw.refreshToken.id,
      raw.refreshToken.created_at,
      raw.refreshToken.updated_at
    )

    return refreshToken
  }
}
