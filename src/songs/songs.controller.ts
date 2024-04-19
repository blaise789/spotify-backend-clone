import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from 'src/songs/dto/create-song.dto';
import { UpdateSongDto } from 'src/entities/update-song.dto';
import { Query } from '@nestjs/common';

@Controller('songs')
export class SongsController {
    constructor(private songService: SongsService) { }
    async paginate(){
        
    }

    @Get()
    findAll(@Query('page',new DefaultValuePipe(1),ParseIntPipe) page:number=1,@Query('limit', new DefaultValuePipe(10),ParseIntPipe) limit:number=10) {
        return this.songService.findall()
    }
    @Post()
    create(@Body() createSongDto: CreateSongDto) {
        this.songService.createSong(createSongDto)
        return "successfully created"

    }
    @Get(":id")
    findSong(@Param("id",ParseIntPipe) id){
            return this.songService.findSong(id)
      
    }
    @Put(":id")
    updateSong(@Param('id', ParseIntPipe) id,@Body() updatedSong:UpdateSongDto) {
  return this.songService.updateSong(id,updatedSong)

    }
    @Delete(":id")
    deleteSong(@Param("id",ParseIntPipe) id) {
        if(this.songService.deleteSong(id)){
            return "the song deleted successfully"
        }
     else{
        return "the song not found"
     }
    }
}
