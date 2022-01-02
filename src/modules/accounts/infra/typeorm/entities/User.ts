import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  avatar: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
