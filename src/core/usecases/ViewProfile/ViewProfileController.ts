import Controller from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import ViewProfile from './ViewProfile'

export default class ViewProfileController implements Controller {
  private readonly viewProfile: ViewProfile
  constructor (viewProfile: ViewProfile) {
    this.viewProfile = viewProfile
  }

  async handle ({ userId }:HttpRequest):Promise<HttpResponse> {
    try {
      const response = await this.viewProfile.execute({ userId })
      return successHttp(200, response)
    } catch (error) {
      return errorHttp(500, error)
    }
  }
}
