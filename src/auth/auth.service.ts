import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from './dto/create-user.dto'
import { CredentialsDto } from './dto/credential.dto'
import { UserRepository } from './user.repository'

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto)
  }

  async signIn(credentials: CredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = credentials
    const user = await this.userRepository.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username }
      const accessToken = this.jwtService.sign(payload)

      return { accessToken }
    }
    throw new UnauthorizedException(
      'ユーザー名またはパスワードを確認してください'
    )
  }
}
