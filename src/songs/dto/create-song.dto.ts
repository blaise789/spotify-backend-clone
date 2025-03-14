import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: Array,
  })
  artists: string[];
  @IsDateString()
  // @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  releasedDate: Date;
  @IsMilitaryTime({})
  @IsNotEmpty()
  @ApiProperty({
  })
  duration: Date;
  @IsOptional()
  @IsString()
  @ApiProperty()
  lyrics: string;
  @ApiProperty({
    description: 'audio file for song',
    type: 'string',
    format: 'binary',
  })
  file: any;
}
