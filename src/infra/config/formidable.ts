import { Options } from 'formidable'
import path from 'path'

const config = {
  uploadDir: path.resolve(__dirname, '..', '..', '..', 'tmp'),
  allowEmptyFiles: false,
  keepExtensions: true,
  multiples: true,
  maxFileSize: 2 * 1024 * 1024
} as Options

export default config
