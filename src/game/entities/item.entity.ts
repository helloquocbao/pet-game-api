import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserItem } from './user-item.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // food / accessory / etc

  @Column({ nullable: true })
  exp: number; // exp cộng cho pet khi sử dụng item

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => UserItem, (userItem) => userItem.item)
  userItems: UserItem[];
}
