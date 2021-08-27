import Email from "../../src/modules/accounts/entities/Email"
import Password from "../../src/modules/accounts/entities/Password"
import Phone from "../../src/modules/accounts/entities/Phone"
import User from "../../src/modules/accounts/entities/User"
import UserRepository from "../../src/modules/accounts/repositories/UserRepository"
import CreateUser from "../../src/modules/accounts/usecases/CreateUser/CreateUser"

export default class UserFactory {
    private readonly userRepository: UserRepository
    private readonly email: Email
    private readonly firstName: string
    private readonly lastName: string
    private readonly phone: Phone
    private readonly password: Password
    private readonly role: 'commun'|'admin'

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository
        this.email = new Email('peter@peterphotos.com')
        this.firstName = 'Peter'
        this.lastName = 'Silva'
        this.phone = new Phone('11999998888')
        this.password = new Password('1234567')
        this.role = 'commun'
    }

    async execute(): Promise<User> {
        const createUser = new CreateUser(this.userRepository)

        const user = await createUser.execute({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            password: this.password,
            role: this.role
        }) 
        return user
    }
}