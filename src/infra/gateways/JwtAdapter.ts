import jwtConfig from '../config/jwt'

import JWT from 'jsonwebtoken'

import TokenAccess from "@domain/infra/gateways/TokenAccess"

export default class JtwAdapter implements TokenAccess {
    private readonly secret: string
    private readonly expiresIn: string

    constructor(){
        this.secret = String(jwtConfig.secret)
        this.expiresIn = jwtConfig.expiresIn
    }

    async getToken(id: string): Promise<string> {

        const token = JWT.sign({}, this.secret, {
            subject: id,
            expiresIn: this.expiresIn
        })

        return token
    }

    async verify(token: string): Promise<string> {
        return JWT.verify(token,this.secret) as any
    }

}