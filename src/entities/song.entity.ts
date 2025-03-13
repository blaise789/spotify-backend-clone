import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artist.entity';
import { PlayList } from './playlists.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToMany(() => Artist, (artist) => artist.songs)
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];
  @Column({ type: 'date' })
  releasedDate: Date;
  @Column()
  duration: number;
  @Column({ nullable: true })
  lyrics: string;
  @ManyToOne(() => PlayList, (playlist) => playlist.songs)
  playList: PlayList;

  @Column()
  track: string;
}
