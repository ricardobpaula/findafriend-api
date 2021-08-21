import UserProps from "./interfaces/UserProps"

export default class User {
    
    user: UserProps

    constructor(user: UserProps){
        
        if(!this.validateEmail(user.email)){
            throw new Error('Invalid e-mail')
        }

        this.user = user

    }

    private validateEmail(email: string): boolean{
        const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    
        return tester.test(email)
    }
   
}