import InvalidEmailError from "./errors/InvalidEmailError"

export default class Email {
    readonly email: string

    constructor(email: string){
        
        if(!this.validateEmail(email)){
            throw new InvalidEmailError(email)
        }

        this.email = email
    }

    private validateEmail(email: string): boolean{
        const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    
        return tester.test(email)
    }
}