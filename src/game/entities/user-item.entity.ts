import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Item } from './item.entity';

@Entity('user_items')
export class UserItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @ManyToOne(() => Item, (item) => item.userItems)
  item: Item;

  @Column({ default: 0 })
  quantity: number;
}
