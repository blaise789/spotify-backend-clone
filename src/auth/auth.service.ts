import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, LoginDTO } from './dtos/user.dto';

import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo:Repository<User> ){

    }
    async signup(createUser:CreateUserDTO):Promise<User>{
        const salt= await bcrypt.genSalt(10)
        createUser.password=await bcrypt.hash(createUser.password,salt)
        const user=await this.userRepo.save(createUser)
        delete user.password
        return user
        
        // return  this.userRepo.save()
    }
    async login(userDto:LoginDTO){
    
        const user=await this.userRepo.findOneBy({email:userDto.email})
        // console.log(user)
    
        if( !user){
            throw new Error("user not found")
        }
        const passwordMatches=await bcrypt.compare(userDto.password,user.password)
        if(!passwordMatches){
            throw new Error(" invalid credentials")
        }

      delete user.password
      return user
    



    }
}
