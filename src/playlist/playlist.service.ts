import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/entities/song.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { PlayList } from 'src/entities/playlists.entity';

@Injectable()
export class PlaylistService {


    constructor( @InjectRepository(User) private  userRepository:Repository<Song>,@InjectRepository(Song) songRepository:Repository<Song>,@InjectRepository(PlayList) playListRepository:Repository<PlayList>){

    }
    // @Post()
    // // createPlaylist(createPlaylistDto:CreatePlaylistDto):Promise<PlayList>{

        

 
    // }

}
