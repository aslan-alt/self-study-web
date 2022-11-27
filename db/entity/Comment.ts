import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Video} from '@/DB/entity/Video';
import {Post} from './Post';
import {User} from './User';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('increment')
  id?: number;
  @Column('int')
  userId?: number;
  @Column('varchar')
  nickname?: string;
  @Column('int')
  postId?: number;
  @Column('text')
  content?: string;
  @ManyToOne('User', 'comments')
  user?: User;
  @ManyToOne('Post', 'comments')
  post?: Post;
  @ManyToOne('Video', 'comments')
  video?: Video;
  @CreateDateColumn({type: 'timestamp', name: 'createdAt', nullable: false})
  createdAt?: Date;
  @UpdateDateColumn({type: 'timestamp', name: 'updatedAt'})
  updateAt?: Date;
}

export {Comment};
