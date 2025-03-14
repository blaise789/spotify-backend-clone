import { Injectable } from '@nestjs/common';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  findall() {
    return this.songsRepository.find();
  }

  async findSong(id: number) {
    const song = await this.songsRepository.findOneByOrFail({ id });
    if (song) {
      return song;
    }
  }
  async deleteSong(id: number) {
    const song = await this.songsRepository.findOneByOrFail({ id });
    // console.log(song)
    if (song) {
      await this.songsRepository.delete({ id });
    }

  }
  async createSong(createSongDto: any) {


  }
}
