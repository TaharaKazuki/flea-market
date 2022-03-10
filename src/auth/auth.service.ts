import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto)
  }
}
