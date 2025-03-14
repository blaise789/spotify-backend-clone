import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateSongDto } from './dto/create-song.dto';

@ApiTags('songs')
@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new song',
    type: CreateSongDto,
  })
  @Post()
  async createSong(
    @Body() createSongDTO: Pick<
      CreateSongDto,
      'lyrics' | 'releasedDate' | 'title' | 'artists'
    >,
    // @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createSongDTO);
    const song = await this.songService.createSong(createSongDTO);
    return song;
  }

  @Delete(':id')
  async deleteSong(@Param('id', ParseIntPipe) id) {
    try {
      await this.songService.deleteSong(id);
      return 'the song deleted successfully';
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'song not found',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }
}
