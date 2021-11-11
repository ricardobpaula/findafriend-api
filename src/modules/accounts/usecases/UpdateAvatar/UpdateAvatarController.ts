import Controller from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import UpdateAvatar from './UpdateAvatar'

export default class UpdateAvatarController implements Controller {
    private readonly updateAvatar: UpdateAvatar

    constructor (updateAvatar: UpdateAvatar) {
      this.updateAvatar = updateAvatar
    }

    async handle ({ files, userId }: HttpRequest): Promise<HttpResponse> {
      try {
        // TODO validar request
        await this.updateAvatar.execute({ photo: files[0], userId })
        return successHttp(200)
      } catch (error) {
        return errorHttp(500, error)
      }
    }
}
