import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Unique } from 'typeorm';
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

  @OneToOne(type => Tweet)
  @JoinColumn()
  tweet!: Tweet;

  @OneToOne(type => User)
  @JoinColumn()
  user!: User;
}
