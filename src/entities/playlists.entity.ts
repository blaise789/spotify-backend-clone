import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "./song.entity";
import { User } from "./user.entity";
@Entity("playlists")
export class PlayList{
@PrimaryGeneratedColumn()
id:number
@Column()
name:string
// each playlist have many songs
@OneToMany(()=>Song,(song)=>song.playList)
songs:Song[] 
@ManyToOne(()=>User,(user)=>user.playlists)
user:User
    playList: Song;
}