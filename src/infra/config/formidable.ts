import { Options } from 'formidable'
import path from 'path'

const config = {
  uploadDir: path.normalize(path.resolve(__dirname, '..', '..', '..', 'tmp')),
  allowEmptyFiles: false,
  keepExtensions: true,
  multiples: true,
  maxFileSize: 20 * 1024 * 1024
} as Options

export default config
