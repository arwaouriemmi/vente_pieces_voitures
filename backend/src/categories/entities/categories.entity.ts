import { Piece } from 'src/piece/entities/piece.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  label: string;
  @Column({nullable:true})
  image: string;
  @Column({nullable:true})
  @ManyToOne(() => Categories, {cascade: true, onDelete:"CASCADE"})
  @JoinColumn({name:"parent"})
  parent: number;
}
