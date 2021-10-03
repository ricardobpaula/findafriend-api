import jwtConfig from '../config/jwt'

import JWT from 'jsonwebtoken'

import AccessToken, { Decoded } from '@domain/infra/gateways/AccessToken'

export default class JtwAdapter implements AccessToken {
    private readonly secret: string
    private readonly expiresIn: string

    constructor () {
      this.secret = String(jwtConfig.secret)
      this.expiresIn = jwtConfig.expiresIn
    }

    async getToken (id: string): Promise<string> {
      const token = JWT.sign({}, this.secret, {
        subject: id,
        expiresIn: this.expiresIn
      })

      return token
    }

    async verify (token: string): Promise<string> {
      return JWT.verify(token, this.secret) as any
    }

    async decode (token: string): Promise<Decoded> {
      return JWT.decode(token) as Decoded
    }
}
