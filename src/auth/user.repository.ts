import { User } from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'

export class UserRepository extends Repository<User> {
  async creteUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto
    const user = this.create({ username, password, status })

    await this.save(user)
    return user
  }
}
