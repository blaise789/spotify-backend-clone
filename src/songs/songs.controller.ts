import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @ApiConsumes(
      
  )
  @ApiBody({
    description: 'Create a new song',
    type: CreateSongDto,
  })
  async createSong() {}

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
