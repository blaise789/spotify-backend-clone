// import { IsEmail,IsString,IsNotEmpty } from "class-validator/types/decorator/decorators";

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @IsString()
    @IsNotEmpty()
    lastName: string;
    @IsEmail()
    @IsNotEmpty()

    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    }
    export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
   @IsString()
    @IsNotEmpty()
    password: string;
    }
       