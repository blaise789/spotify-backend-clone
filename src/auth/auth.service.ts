import {
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, LoginDTO } from './dtos/user.dto';

import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(createUser: CreateUserDTO): Promise<{ access_token: string }> {
    const salt = await bcrypt.genSalt(10);
    createUser.password = await bcrypt.hash(createUser.password, salt);
    const userExists: boolean = await this.userRepo.existsBy({
      email: createUser.email,
    });
    if (userExists) {
      throw new ForbiddenException('user already exists');
    }
    const user = await this.userRepo.save(createUser);
    delete user.password;
    return this.signToken(user.id, user.email);

    // return  this.userRepo.save()
  }
  async login(userDto: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.userRepo.findOneBy({ email: userDto.email });
    // console.log(user)

    if (!user) {
      throw new ForbiddenException('user not found');
    }
    if (user.provider == 'google') {
      return this.signToken(user.id, user.email);
    }
    const passwordMatches = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('invalid credentials');
    }

    delete user.password;
    return this.signToken(user.id, user.email);
  }
  async signToken(userId: number, email: string) {
    try {
      const payload = {
        sub: userId,
        email,
      };
      const secret = this.config.get('JWT_SECRET');
      const token = this.jwt.sign(payload, {
        expiresIn: '15m',
        secret,
      });
      return { access_token: token };
    } catch (err) {
      console.log(err);
    }
  }

  async handleAuthWithGoogle(user) {
    console.log(user);
    if (!user) {
      throw new ForbiddenException('Not authenticated');
    }

    let userExists = await this.findUserByEmail(user.email);
    if (!userExists) {
      const newUser = await this.userRepo.save(user);
      return newUser;
    }
    return this.login(user);
  }
  async findUserByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }
}
