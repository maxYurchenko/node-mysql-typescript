import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  RelationCount,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { User } from './user';
import { Like } from './like';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public body!: string;

  @ManyToOne(type => Tweet)
  @JoinColumn()
  public parent!: number;

  @Column()
  public userId!: number;

  @Column()
  public createdAt!: Date;

  @Column()
  public deleted!: number;

  @OneToMany(type => Tweet, tweet => tweet.parent)
  @JoinColumn({ name: 'parentId' })
  public children!: Tweet[];

  @OneToMany(type => Like, like => like.tweet)
  @JoinColumn({ name: 'tweetId' })
  public likes!: Like[];

  @OneToOne(type => User)
  @JoinColumn()
  public user!: User;

  @RelationCount((tweet: Tweet) => tweet.children)
  public childrenAmount!: number;

  public liked!: boolean;

  @RelationCount((tweet: Tweet) => tweet.likes)
  public likesCount!: number;
}
