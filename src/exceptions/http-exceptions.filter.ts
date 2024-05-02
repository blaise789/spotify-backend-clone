import { Catch, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class ExceptionFilter implements ExceptionFilter{
    
}