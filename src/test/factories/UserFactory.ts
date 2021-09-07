import Email from '@modules/accounts/entities/Email'
import Password from '@modules/accounts/entities/Password'
import Phone from '@modules/accounts/entities/Phone'
import User from '@modules/accounts/entities/User'
import UserRepository from '@modules/accounts/repositories/UserRepository'
import CreateUser from '@modules/accounts/usecases/CreateUser/CreateUser'

export default class UserFactory {
    private readonly userRepository: UserRepository
    private readonly email: Email
    private readonly firstName: string
    private readonly lastName: string
    private readonly phone: Phone
    private readonly password: Password
    private readonly role: 'commun'|'admin'

    constructor (userRepository: UserRepository) {
      this.userRepository = userRepository
      this.email = Email.create('peter@peterphotos.com')
      this.firstName = 'Peter'
      this.lastName = 'Silva'
      this.phone = Phone.create('11999998888')
      this.password = Password.create('1234567')
    }

    async execute (): Promise<User> {
      const createUser = new CreateUser(this.userRepository)

      const user = await createUser.execute({
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        password: this.password
      })
      return user
    }
}
