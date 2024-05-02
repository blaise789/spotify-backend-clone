import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './entities/song.entity';
import { User } from './entities/user.entity';
import { Artist } from './entities/artist.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { PlayList } from './entities/playlists.entity';

@Module({
  imports: [SongsModule,TypeOrmModule.forRoot({
    // type:"mysql",
    // host:'localhost',
    // port:3306,
    // username:'root',
    // password:"Blaise@123",
    // database:'spotify',
    type:"postgres",
    host:"localhost",
    port:5500,
    username:"postgres",
    password:"Blaise@123",
    database:'spotify',
    entities:[Song,User,Artist,PlayList],
    logging:true,
    synchronize:true


  }), PlaylistModule],
  
})
export class AppModule implements NestModule{
  constructor(private datasource:DataSource){
    if(datasource.driver.database=="spotify"){
      console.log("database connected")
    }
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs')
  }

}