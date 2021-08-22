import UserProps from "../entities/interfaces/UserProps";
import User from "../entities/user";
import UserRepository from "../repositories/UserRepository";

export default class CreateUser {
    userRepository: UserRepository
    
    constructor(userRepository: UserRepository){
        this.userRepository = userRepository
    }

    async execute(userRequest: UserProps):Promise<User>{
        
        const userAlreadyExists = await this.userRepository.findByEmail(userRequest.email)

        if(userAlreadyExists){
            throw new Error('User already exists')
        }

        const user = await this.userRepository.createUser(userRequest)

        if(!user){
            throw new Error('Cannot creact user')
        }

        return user
    }
}