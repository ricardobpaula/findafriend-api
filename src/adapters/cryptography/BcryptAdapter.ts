import bcrypt from 'bcryptjs'

import Cryptography from '../../core/infra/cryptography'

export default class BcryptAdapter implements Cryptography{
    constructor(){}
    
    async getHashed(text: string): Promise<string> {
        return await bcrypt.hash(text,8)
    }
    async compare(textToCompare: string, textHashed: string): Promise<boolean> {
        return await bcrypt.compare(textToCompare,textHashed)
    }
    
}