import RefreshToken from '@core/entities/RefreshToken/RefreshToken'
import User from '@core/entities/User/User'

export default interface RefreshTokenRepository {
    create(user: User):Promise<RefreshToken>
    delete(refreshToken: RefreshToken):Promise<void>
    find(user: User): Promise<RefreshToken>
}
