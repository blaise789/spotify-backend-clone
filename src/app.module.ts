import { Module } from '@nestjs/common';

import { SongsModule } from './songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './artists/artists.module';
import { User } from './entities/user.entity';
import { Artist } from './artists/entities/artist.entity';
import { Song } from './songs/entities/song.entity';
import { PlayList } from './playlist/entities/playlists.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'Blaise@123',
      username: 'blaise',
      entities: [User, Artist, Song, PlayList],
      database: 'spotify',
      synchronize: true,
      logging: true,
    }),
    SongsModule,
    PlaylistModule,
    AuthModule,
    ArtistsModule,
  ],
})
export class AppModule {}
