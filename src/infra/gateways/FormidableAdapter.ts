import formidable, { File as FormFile } from 'formidable'
import UploadFileManager, { File, MultiPartParams } from '@domain/infra/gateways/UploadFileManager'
import config from '@infra/config/formidable'
import aws from 'aws-sdk'
import fs, { ReadStream } from 'fs'

type FormParams = {
  files?: FormFile|FormFile[]
  fields?: any
}

export default class FormidableAdapter implements UploadFileManager {
  private params: FormParams

  async handle (request: any): Promise<MultiPartParams> {
    const form = new formidable.IncomingForm(config)
    this.params = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) {
          reject(err)
        }
        resolve({
          files: files.file,
          fields: fields
        })
      })
    })

    const parsedFiles = (!Array.isArray(this.params.files) ? [this.parseFile(this.params.files)] : this.params.files.map(file => this.parseFile(file)))

    const files = process.env.STORAGE_TYPE === 's3' ? await this.uploadToS3(parsedFiles) : parsedFiles
    return {
      files,
      fields: this.params.fields
    }
  }

  private parseFile (file: FormFile): File {
    return {
      name: file.newFilename,
      originalName: file.originalFilename,
      date: file.toJSON().mtime,
      path: file.filepath,
      size: file.size,
      type: file.mimetype
    }
  }

  private async uploadToS3 (files: File[]):Promise<File[]> {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })

    const uploadedFiles = await Promise.all(files.map(async file => {
      const fileStream = this.openFile(file.path)
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: file.name,
        Body: fileStream,
        acl: 'public-read',
        ContentType: file.type
      }
      const response = await s3.upload(params).promise()
      this.deleteFile(file.path)

      file.path = response.Location

      return file
    }))

    return uploadedFiles
  }

  private openFile (path: string):ReadStream {
    const fileStream = fs.createReadStream(path)
    fileStream.on('error', (error) => {
      console.log('Error to open file', error)
    })
    return fileStream
  }

  private deleteFile (path: string): any {
    fs.unlink(path, (error) => {
      if (error) {
        console.log('Error to delete file', error)
      }
    })
  }
}
