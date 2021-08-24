import Cryptography from "../../../domain/infra/gateways/Cryptography"
import InvalidPasswordError from "./errors/InvalidPasswordError"

export default class Password {
    private password: string
    private cryptography: Cryptography 

    constructor(password: string, cryptography?: Cryptography){
        
        if(!this.validatePassword(password)){
            throw new InvalidPasswordError(password)
        }

        this.password = password
        this.cryptography = cryptography
    }

    private validatePassword(password: string): boolean{
        return (password.length>=6 && password.length<=256)
    }

    getHashed(): Promise<string> {
        return this.cryptography.getHashed(this.password)
    }

    compare(compare: string): Promise<boolean>{
        return this.cryptography.compare(compare,this.password)
    }
}