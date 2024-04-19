import { IsDateString, IsMilitaryTime, IsOptional, IsString } from "class-validator";

export class UpdateSongDto{
    @IsString()
    @IsOptional()
    title:string
    @IsOptional()
    @IsString({each:true})
    readonly artist:string
    @IsDateString()
    @IsOptional()
    readonly releasedDate:Date
    @IsMilitaryTime()
    @IsOptional()
    readonly duration:Date
    @IsString()
    @IsOptional()
    readonly lyrics:string

}