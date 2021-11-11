import formidable, { File as FormFile } from 'formidable'
import UploadFileManager, { File } from '@domain/infra/gateways/UploadFileManager'
import config from '@infra/config/formidable'

export default class FormidableAdapter implements UploadFileManager {
  private files: FormFile|FormFile[]

  async handle (request: any): Promise<File|File[]> {
    const form = formidable(config)
    this.files = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) {
          reject(err)
        }
        resolve(files.file)
      })
    })

    return (!Array.isArray(this.files) ? [this.parseFile(this.files)] : this.files.map(file => this.parseFile(file)))
  }

  private parseFile (file: FormFile): File {
    return {
      date: file.lastModifiedDate,
      name: file.name,
      path: file.path,
      size: file.size,
      type: file.type
    }
  }
}
