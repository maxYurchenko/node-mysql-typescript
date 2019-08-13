import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Unique,
  ManyToOne
} from 'typeorm';
import { User } from './user';
import { Tweet } from './tweet';

@Entity()
@Unique(['userId', 'tweetId'])
export class Like {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public userId!: number | string;

  @Column()
  public tweetId!: number | string;

  @ManyToOne(type => Tweet)
  @JoinColumn()
  tweet!: Tweet;

  @OneToOne(type => User)
  @JoinColumn()
  user!: User;
}
