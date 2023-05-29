
import { TimestampEntities } from "src/TimestampEntities";
import { Piece } from "src/piece/entities/piece.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
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
    
    @OneToMany(() => Piece, piece => piece.cars)
    pieces: Piece[];
}

