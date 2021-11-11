import { Middleware } from '@domain/infra/gateways/Middleware'
import FormidableAdapter from '@infra/gateways/FormidableAdapter'
import EnsureUploadFileMiddleware from '@infra/http/middlewares/EnsureUploadFileMiddleware'

export default function makeEnsureUploadFileMiddleware (): Middleware {
  const ensureUploadFileMiddleware = new EnsureUploadFileMiddleware(new FormidableAdapter())

  return ensureUploadFileMiddleware
}
