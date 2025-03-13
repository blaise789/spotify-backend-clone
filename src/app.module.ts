import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';
import { Song } from './entities/song.entity';
import { User } from './entities/user.entity';
import { Artist } from './entities/artist.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { PlayList } from './entities/playlists.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      // type:"mysql",
      // host:'localhost',
      // port:3306,
      // username:'root',
      // password:"Blaise@123",
      // database:'spotify',
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Song, User, Artist, PlayList],
      logging: true,
      synchronize: true,
    }),
    SongsModule,
    PlaylistModule,
    AuthModule,
    ArtistsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs');
  }
}
