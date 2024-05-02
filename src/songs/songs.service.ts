import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Song } from '../entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDto } from 'src/songs/dto/update-song.dto';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/entities/artist.entity';


@Injectable()
export class SongsService {

    constructor(@InjectRepository(Song) private songsRepository: Repository<Song>,@InjectRepository(Artist) private artistRepository:Repository<Artist>) { }
    // <Song> represents the repository is a parameter of songsRepository
    // private readonly songs = []
    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        return paginate<Song>(this.songsRepository, options)
    }
    findall() {
        return this.songsRepository.find();
    }
   async createSong(createSong: CreateSongDto) {
        const song=new Song()
        song.title=createSong.title
        song.artists=createSong.artists
        song.releasedDate=createSong.releasedDate
        song.duration=createSong.duration
        song.lyrics=createSong.lyrics
        
    
        let artists=await this.artistRepository.findByIds(createSong.artists)
        console.log(artists)
        song.artists=artists
        return this.songsRepository.save(song)

    }
   async updateSong(id: number, updatedSong: UpdateSongDto) {
     const song= await this.songsRepository.findOneByOrFail({ id })
    if(song){
    return this.songsRepository.update(id, updatedSong)

    }
        
    
    }
    async findSong(id: number) {
        const song=await this.songsRepository.findOneByOrFail({id})
        if(song){
            return song;
        }
    } 
    async deleteSong(id:number){
        const song=await this.songsRepository.findOneByOrFail({id})
        // console.log(song)
        if (song){
            await this.songsRepository.delete({id})
        }
        

    }


}
