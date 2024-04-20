import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./artist.entity";
import { PlayList } from "./playlists.entity";

@Entity('songs')
export class Song{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string
    // @Column("varchar",{array:true})
    // artists:string[]
    @ManyToMany(()=>Artist,(artist)=>artist.songs)
    @JoinTable({name:"songs_artists"})
    artists:Artist[]
    @Column({type:"date"})
    releasedDate:Date
    @Column({type:"time"})
    duration:Date
    @Column({type:"text"})
    lyrics:string
    @ManyToOne(()=>PlayList,(playlist)=>playlist.songs)
    playList:PlayList
    
    
    

}