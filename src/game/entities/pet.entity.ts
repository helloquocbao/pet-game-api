import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0 })
  exp: number;

  @Column({ default: 100 })
  expToLevelUp: number; // exp cần để lên level tiếp theo

  @Column({ default: 1 })
  stage: number; // stage = Math.floor(level / 10) + 1

  @Column({ nullable: true })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
