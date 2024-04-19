import { Injectable } from '@nestjs/common';
import { CreateSongDto } from 'src/songs/dto/create-song.dto';

@Injectable()
export class SongsService {
    private readonly songs = []
    findall() {
        return this.songs;
    }
    createSong(createSong: CreateSongDto) {
        return this.songs.push(createSong)
    }


}
