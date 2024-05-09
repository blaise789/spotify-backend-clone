import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/entities/song.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePlayListDto } from './dtos/create-playlist.dto';
import { PlayList } from 'src/entities/playlists.entity';

@Injectable()
export class PlaylistService {


    constructor(@InjectRepository(User) private  userRepository:Repository<User>,@InjectRepository(Song) private songRepository:Repository<Song>,@InjectRepository(PlayList) private playListRepository:Repository<PlayList>){ }
 async createPlayList(createPlaylistDto:CreatePlayListDto):Promise<PlayList>{
//   return this.

const playList=new PlayList()
playList.name=createPlaylistDto.name
const songs=await this.songRepository.findByIds(createPlaylistDto.songs).catch((err)=>{throw new Error(err.message)})
// console.log(songs)
playList.songs=songs;
const user=await this.userRepository.findOneBy({id:createPlaylistDto.user})
playList.user=user
return this.playListRepository.save(playList)



    }
    // @Post()
    // // createPlaylist(createPlaylistDto:CreatePlaylistDto):Promise<PlayList>{

        

 
    // }

}
