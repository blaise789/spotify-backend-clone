import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from 'src/songs/dto/create-song.dto';

@Controller('songs')
export class SongsController {
    constructor(private songService: SongsService) { }

    @Get()
    findAll() {
        return this.songService.findall()
    }
    @Post()
    create(@Body() createSongDto: CreateSongDto) {
        this.songService.createSong(createSongDto)
        return "successfully created"

    }
    @Put(":id")
    updateSong(@Param('id', ParseIntPipe) id) {


    }
    @Delete()
    deleteSong() {

    }
}
