import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './entities/song.entity';

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
    entities:[Song],
    logging:true,
    synchronize:true


  })],
  
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