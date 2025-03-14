import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO, LoginDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { OAuth2ExceptionFilter } from 'src/common/filters/oauth.filter';
@Controller('auth')
@UseFilters(OAuth2ExceptionFilter)
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

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req) {}
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req) {
    console.log(req.user);
    return { success: true };
  }
}
