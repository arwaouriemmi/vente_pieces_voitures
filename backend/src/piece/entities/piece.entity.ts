import { TimestampEntities } from "../../TimestampEntities";
import { Cars } from "../../cars/entities/cars.entity";
import { Categories } from "../../categories/entities/categories.entity";
import { Providers  } from "../../providers/entities/providers.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('piece')
export class Piece extends  TimestampEntities{
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    piece: string; 
    @Column()
    image: string;
    @Column()
    price: number;
    @Column()
    description: string;
    @Column()
    constructorReference: string;
    @Column()
    comments: string; 
    @ManyToOne(type => Providers , (provider) => provider.pieces)
    provider: Providers ;
    @ManyToMany(() => Cars)
    @JoinTable({
     name: 'cars_piece',
        joinColumn: { name: 'piece', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'cars', referencedColumnName: 'id' },
    })
    cars: Cars[];
    @OneToOne(type => Categories)
    pieceCategory: Categories;
    @OneToOne(type=>Categories)
    pieceSubCategory:Categories;
}
