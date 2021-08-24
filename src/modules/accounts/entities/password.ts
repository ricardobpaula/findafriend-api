import InvalidPasswordError from "./errors/InvalidPasswordError"

export default class Password {
    readonly password: string

    constructor(password: string){
        
        if(!this.validatePassword(password)){
            throw new InvalidPasswordError(password)
        }

        this.password = password
    }

    private validatePassword(password: string): boolean{
        return (password.length>=6 && password.length<=256)
    }
}