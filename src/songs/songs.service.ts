import { Injectable } from '@nestjs/common';
import { Song } from '../entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { Repository } from 'typeorm';
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
    createSong(createSong: CreateSongDto) {
        const song=new Song()
        console.log(song)
        return this.songsRepository.save(createSong)

    }
    updateSong(id: number, updatedSong: UpdateSongDto) {
        if (this.songsRepository.findOneByOrFail({ id })) {
            return this.songsRepository.update(id, updatedSong)
        }
        return "user not found"

    }
    async findSong(id: number) {
        return this.songsRepository.findOneByOrFail({ id }).catch(err => console.log(err))

    }
    deleteSong(id: number): boolean {
        if (this.songsRepository.findOneByOrFail({ id })) {
            this.songsRepository.delete({ id })
            return true
        }
        else {
            return false
        }

    }


}
