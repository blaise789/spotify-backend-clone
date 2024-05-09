

import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO, LoginDTO } from "./dtos/user.dto";
import { User } from "src/entities/user.entity";
import { AuthService } from "./auth.service";
import { error } from "console";

@Controller("auth")
export class AuthController {
constructor(private authServices: AuthService) {}
@Post("signup")
signup(
@Body()
userDTO: CreateUserDTO
): Promise<User> {
return this.authServices.signup(userDTO);

}
@Post("login")
async login(@Body() userDTO: LoginDTO) {

    try{
        console.log(userDTO)
    await this.authServices.login(userDTO);
    }
    catch(err){
        console.log(error)
        throw new UnauthorizedException(err.message);
        
    }
   
   
     
    

}
}