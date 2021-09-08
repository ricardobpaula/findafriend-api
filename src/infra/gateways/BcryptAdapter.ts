import bcrypt from 'bcryptjs'

import Cryptography from '@domain/infra/gateways/Cryptography'

export default class BcryptAdapter implements Cryptography {
  private constructor () {}

  async getHashed (text: string): Promise<string> {
    return await bcrypt.hash(text, 8)
  }

  async compare (textToCompare: string, textHashed: string): Promise<boolean> {
    return await bcrypt.compare(textToCompare, textHashed)
  }

  static create (): BcryptAdapter {
    const bcryptAdapter = new BcryptAdapter()

    return bcryptAdapter
  }
}
