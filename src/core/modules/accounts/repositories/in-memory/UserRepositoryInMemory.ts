import Email from "../../entities/email";
import UserProps from "../../entities/interfaces/UserProps";
import User from "../../entities/user";
import UserRepository from "../UserRepository";

export default class implements UserRepository {
    constructor(public itens: User[] = []){}
    async findByEmail(email: Email): Promise<User> {
        return this.itens.find(item=>{item.props.email===email})
    }

    async createUser(user: UserProps): Promise<User> {
        const newUser = new User(user,this.itens.length+1)
        this.itens.push(newUser)
        return newUser
    }

}