import { File } from './UploadFileManager'

export default interface HttpRequest<T = any> {
  body: T,
  header?: any,
  params?: any,
  query?: any,
  cookies?: any,
  userId?: number,
  files?: File[]
}
