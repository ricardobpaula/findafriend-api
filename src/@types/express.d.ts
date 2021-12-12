import { File } from '@domain/infra/gateways/UploadFileManager'

declare global {
  namespace Express {
    export interface Request {
      userId?: string,
      files?: File[],
      fields?: any
    }
  }
}
