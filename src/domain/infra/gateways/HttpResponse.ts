export interface HttpResponse {
  statusCode: number,
  body: any
}

export function successHttp<T> (statusCode: number, data?: T): HttpResponse {
  return {
    statusCode,
    body: data
  }
}

export function errorHttp (statusCode: number, error: Error): HttpResponse {
  return {
    statusCode,
    body: {
      status: 'error',
      message: error.message
    }
  }
}
