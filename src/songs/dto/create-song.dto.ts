import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDto{
    @IsString()
    @IsNotEmpty()
    readonly title;
    @IsNotEmpty() 
    @IsArray()
    @IsNumber({},{each:true})
    readonly artists
    @IsDateString()
    // @IsNotEmpty()
    @IsOptional()
    readonly releasedDate:Date;
    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration:Date;
    @IsOptional()
    @IsString()
    lyrics:string
}