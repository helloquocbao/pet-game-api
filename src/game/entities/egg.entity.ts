import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('eggs')
export class Egg {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.eggs)
  owner: User;

  @Column()
  type: string; // common, rare, epic

  @Column({ default: false })
  hatched: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
