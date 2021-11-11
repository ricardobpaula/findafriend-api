export type File = {
  name: string,
  size: number,
  path: string,
  date: Date,
  type: string
}

export default interface UploadFileManager {
  handle: (request: any)=> Promise<File|File[]>
}
