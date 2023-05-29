import { TimestampEntities } from "src/TimestampEntities";
import { Piece } from "src/piece/entities/piece.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Providers extends TimestampEntities {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    name: string;
    @Column({nullable:true})
    logo: string;
    @Column()
    city: string;
    @Column()
    email: string;
    @Column()
    address: string;
    @Column({unique:true})
    phone: string;
    @Column({nullable: true})
    whatsapp: string;
    @Column({nullable: true})
    facebook: string;    
    @Column({nullable: true})
    messenger: string;
    @Column({nullable: true})
    observation: string;
    @OneToMany(() => Piece,
        (piece) => piece.provider, {
         cascade: true,
        nullable: true,
        eager: true
    })
    pieces: Piece[]
}