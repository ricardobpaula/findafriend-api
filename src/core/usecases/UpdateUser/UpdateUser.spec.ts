import UserRepositoryInMemory from '@core/repositories/in-memory/UserRepositoryInMemory'
import UserRepository from '@core/repositories/UserRepository'

import CreateUser from '../CreateUser/CreateUser'
import UpdateUser from './UpdateUser'

/*
// TODO
InvalidEmailError
InvalidPhoneError
InvalidRoleError
EmailAlreadyUsed
*/
let userRepository: UserRepository
let userId: string

const userBeforeUpdated = {
  firstName: 'João',
  lastName: 'das Neves',
  email: 'joao.neves@gmail.com',
  password: 'joao1234',
  phone: '99999999999'
}

describe('Update user usecase', () => {
  beforeEach(async () => {
    userRepository = new UserRepositoryInMemory()
    const createUser = new CreateUser(userRepository)
    const user = await createUser.execute(userBeforeUpdated)
    if (user.isLeft()) {
      throw user.value
    }
    userId = user.value.id
  })

  it('Should be user updated', async () => {
    const updateUser = new UpdateUser(userRepository)
    const userOrError = await updateUser.execute({
      userId,
      firstName: 'Joaozinho',
      lastName: 'Junior',
      email: 'joao.junior@gmail.com',
      phone: '24999999999'
    })
    expect(userOrError.isRight())
  })
})
