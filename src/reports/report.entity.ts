import { UserEntity } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class ReportsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  make: string;
  @Column({ default: false })
  approved: boolean;
  @Column()
  model: string;
  @Column()
  year: number;
  @Column()
  lng: number;
  @Column()
  lat: number;
  @Column()
  mileage: number;
  @Column()
  price: number;
  @ManyToOne(() => UserEntity, (user) => user.reports)
  user: UserEntity;
}
