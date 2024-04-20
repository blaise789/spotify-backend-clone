import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlayList } from "./playlists.entity";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    firstName:string
    @Column()
    lastName:string
    @Column({unique:true})
    email:string
    @Column()
    password:string
    @ManyToOne(()=>PlayList)
    playlists:PlayList
}