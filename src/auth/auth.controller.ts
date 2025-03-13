import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDTO, LoginDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}
  @Post('signup')
  async signup(
    @Body()
    userDTO: CreateUserDTO,
  ) {
    try {
      const user = await this.authServices.signup(userDTO);
      return user;
    } catch (err: any) {
      throw new HttpException(
        'user already exists',
        HttpStatus.BAD_REQUEST,
        err,
      );
    }
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userDTO: LoginDTO) {
    return this.authServices.login(userDTO);
  }
}
