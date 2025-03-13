import {
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDto {
  @IsString()
  @IsOptional()
  title: string;
  @IsOptional()
  @IsNumber({}, { each: true })
  readonly artist: string;
  @IsDateString()
  @IsOptional()
  readonly releasedDate: Date;
  @IsMilitaryTime()
  @IsOptional()
  readonly duration: Date;
  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
