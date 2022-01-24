import { v4 as uuid } from 'uuid'

import RefreshToken from '@core/entities/RefreshToken/RefreshToken'
import User from '@core/entities/User/User'
import RefreshTokenRepository from '../RefreshTokenRepository'

export default class RefreshTokenRepositoryInMemory implements RefreshTokenRepository {
    private items: Array<RefreshToken>

    constructor () {
      this.items = []
    }

    async create (user: User): Promise<RefreshToken> {
      const refreshToken = RefreshToken.create({ user }, uuid(), new Date(), new Date())
      this.items.push(refreshToken)
      return refreshToken
    }

    async delete (refreshToken: RefreshToken): Promise<void> {
      const index = this.items.findIndex(item => item === refreshToken)
      this.items.splice(index)
    }

    async find (user: User): Promise<RefreshToken> {
      const refreshToken = this.items.find(item => item.props.user === user)
      return refreshToken
    }
}
