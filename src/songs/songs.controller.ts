import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from 'src/songs/dto/create-song.dto';
import { UpdateSongDto } from 'src/songs/dto/update-song.dto';
import { Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Song } from '../entities/song.entity';

@Controller('songs')
export class SongsController {
    constructor(private songService: SongsService) { }


    // @Get()
    // findAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1, @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10): Promise<Pagination<Song>> {

    //     return this.songService.paginate({ page, limit })
    //     // return this.songService.findall()
    // }
    @Get()
    findAllSongs(){
        return this.songService.findall()

    }
    @Post()
   async create(@Body() createSongDto: CreateSongDto) {
    try{
          await this.songService.createSong(createSongDto)
    }
    catch(error){
        throw new HttpException({
            status:HttpStatus.BAD_REQUEST,
            error:"song  cannot be created",
        },HttpStatus.BAD_REQUEST,{
            cause:error
        })
        
    }

    }
    @Get(":id")
   async findSong(@Param("id", ParseIntPipe) id) {
    try{
        const song=await this.songService.findSong(id)
        return song
    }
    catch(error){
        throw new HttpException({
            status:HttpStatus.NOT_FOUND,
            error:"song not found",
        },HttpStatus.NOT_FOUND,{
            cause:error
        })
    }

    }
    @Put(":id")
    async updateSong(@Param('id', ParseIntPipe) id, @Body() updatedSong: UpdateSongDto) {
        try{
        await this.songService.updateSong(id, updatedSong)
        }
        catch(error){
            throw new HttpException({
                status:HttpStatus.NOT_FOUND,
                error:"song not found",
            },HttpStatus.NOT_FOUND,{
                cause:error
            })
        }


    }
    @Delete(":id")
   async deleteSong(@Param("id", ParseIntPipe) id) {
        try{
         await this.songService.deleteSong(id)
        return "the song deleted successfully"
        }
    
    catch(error){
        throw new HttpException({
            status:HttpStatus.NOT_FOUND,
            error:"song not found",
        },HttpStatus.NOT_FOUND,{
            cause:error
        })

    }

}
}
