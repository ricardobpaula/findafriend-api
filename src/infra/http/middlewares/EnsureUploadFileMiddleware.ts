import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import { Middleware } from '@domain/infra/gateways/Middleware'
import UploadFileManager from '@domain/infra/gateways/UploadFileManager'

export default class EnsureUploadFileMiddleware implements Middleware {
    private readonly uploadFileManager: UploadFileManager
    constructor (uploadFileManager: UploadFileManager) {
      this.uploadFileManager = uploadFileManager
    }

    async handle (request: any): Promise<HttpResponse> {
      try {
        const params = await this.uploadFileManager.handle(request)
        return successHttp(200, { files: params.files, fields: params.fields })
      } catch (error) {
        return errorHttp(500, error)
      }
    }
}
