
import { TimestampEntities } from "src/TimestampEntities";
import { Piece } from "src/piece/entities/piece.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
//@Entity('Cars')
@Entity()
export class Cars extends TimestampEntities  {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({ nullable: false })
    brand: string;
    @Column({ nullable: false })
    model: string;
    @Column({ nullable: false })
    motorization: string;
    //createdAt: string;
    @ManyToMany(() => Piece, piece => piece.cars, { cascade: true })
    @JoinTable({
        name: 'cars_piece',
        joinColumn: { name: 'cars', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'piece', referencedColumnName: 'id' },
    })
    pieces: Piece[];
}

