import InvalidPhoneError from "./errors/InvalidPhoneError"

export default class Phone {
    readonly phone: string

    constructor(phone: string){
        if (!this.validatePhone(phone)){
            throw new InvalidPhoneError(phone)
        }
        this.phone = phone
    }

    private validatePhone(phone: string){
        return phone.length === 11
    }
}