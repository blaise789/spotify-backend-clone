import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlayListDto } from './dtos/create-playlist.dto';
import { PlayList } from 'src/playlist/entities/playlists.entity';

@Controller('playlist')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}
  @Post()
  async createPlayList(
    @Body() playListDto: CreatePlayListDto,
  ): Promise<PlayList> {
    // console.log(playListDto)
    try {
      return this.playlistService.createPlayList(playListDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'song  cannot be created',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
