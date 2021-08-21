import UserProps from "../entities/interfaces/UserProps";
import User from "../entities/User";

export default class CreateUser {
    constructor(){

    }

    execute(user: UserProps){
        return new User(user)
    }
}