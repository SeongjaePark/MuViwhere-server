import { Exclude } from 'class-transformer';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Exclude()
  password: string;

  // @Index() // In MySQL, there's no way to set unique without index. So, no need to add @Index() decorator here
  @Column({ unique: true })
  email: string;
}
