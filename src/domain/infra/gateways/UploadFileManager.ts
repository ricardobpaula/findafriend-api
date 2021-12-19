export type File = {
  originalName: string,
  name: string,
  size: number,
  path: string,
  date: Date,
  type: string
}

export type MultiPartParams = {
  files: File[],
  fields: any
}

export default interface UploadFileManager {
  handle: (request: any)=> Promise<MultiPartParams>
}
