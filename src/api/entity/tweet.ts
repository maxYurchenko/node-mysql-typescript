import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public body!: string;

  @Column()
  public parent!: number;

  @Column()
  public userId!: number;

  @Column()
  public createdAt!: Date;

  @Column()
  public deleted!: number;

  @OneToOne(type => User)
  @JoinColumn()
  user!: User;
}
