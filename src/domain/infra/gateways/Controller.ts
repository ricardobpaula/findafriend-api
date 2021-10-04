import HttpRequest from './HttpRequest'
import HttpResponse from './HttpResponse'

export default interface Controller<T=any> {
  handle: (request: HttpRequest<T>) => Promise<HttpResponse>
}
