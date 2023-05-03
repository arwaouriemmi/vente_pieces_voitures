import { Cars } from "src/cars/entities/cars.entity";
import { Providers  } from "src/providers/entities/providers.entity";
import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
//@Entity('Piece')
@Entity()
export class Piece {
    @PrimaryGeneratedColumn()
    id: string;
    @ManyToOne(type => Providers , (provider) => provider.pieces)
    provider: Providers ;
    @ManyToMany(() => Cars)
    @JoinTable({
     name: 'cars_piece',
        joinColumn: { name: 'piece', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'cars', referencedColumnName: 'id' },
    })
    cars: Cars[];
}
