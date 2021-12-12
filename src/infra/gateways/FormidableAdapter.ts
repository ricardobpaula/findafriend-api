import formidable, { File as FormFile } from 'formidable'
import UploadFileManager, { File, MultiPartParams } from '@domain/infra/gateways/UploadFileManager'
import config from '@infra/config/formidable'

type FormParams = {
  files?: FormFile|FormFile[]
  fields?: any
}

export default class FormidableAdapter implements UploadFileManager {
  private params: FormParams

  async handle (request: any): Promise<MultiPartParams> {
    const form = formidable(config)
    this.params = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) {
          reject(err)
        }
        resolve({
          files: files.file,
          fields
        })
      })
    })

    return {
      files: (!Array.isArray(this.params.files) ? [this.parseFile(this.params.files)] : this.params.files.map(file => this.parseFile(file))),
      fields: this.params.fields
    }
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
