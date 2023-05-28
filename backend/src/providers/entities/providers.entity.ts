import { TimestampEntities } from "src/TimestampEntities";
import { Piece } from "src/piece/entities/piece.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
//@Entity('Provider')
@Entity()
export class Providers extends TimestampEntities {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    logo: string;
    @Column()
    city: string;
    @Column()
    address: string;
    @Column({unique:true})
    phone: string;
    @Column()
    whatsapp: string;
    @Column()
    facebook: string;    
    @Column()
    messenger: string;
    @Column()
    observation: string;
    @OneToMany(type => Piece,
        (piece) => piece.provider, {
         cascade: true,
        nullable: true,
        eager: true
    })
    pieces: Piece[]
}