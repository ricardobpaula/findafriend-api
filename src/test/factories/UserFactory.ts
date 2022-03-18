import User from '@core/entities/User/User'
import UserRepository from '@core/repositories/UserRepository'
import CreateUser from '@core/usecases/CreateUser/CreateUser'

export default class UserFactory {
    private readonly userRepository: UserRepository
    private readonly email: string
    private readonly firstName: string
    private readonly lastName: string
    private readonly phone: string
    private password: string

    constructor (userRepository: UserRepository) {
      this.userRepository = userRepository
      this.email = 'peter@peterphotos.com'
      this.firstName = 'Peter'
      this.lastName = 'Silva'
      this.phone = '11999998888'
      this.password = '123456'
    }

    async execute (): Promise<User> {
      const createUser = new CreateUser(this.userRepository)
      const userOrError = await createUser.execute({
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        password: this.password
      })

      if (userOrError.isLeft()) {
        throw userOrError.value
      }

      return userOrError.value
    }
}
