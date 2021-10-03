import { Middleware } from '@domain/infra/gateways/Middleware'
import JtwAdapter from '@infra/gateways/JwtAdapter'
import EnsureAuthenticatedMiddleware from '@infra/http/middlewares/EnsureAuthenticatedMiddleware'

export function makeEnsureAuthenticatedMiddleware (): Middleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(new JtwAdapter())

  return ensureAuthenticatedMiddleware
}
