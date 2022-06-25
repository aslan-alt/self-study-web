import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Post} from './Post';
import {User} from './User';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('int')
  userId: number;
  @Column('varchar')
  nickname: string;
  @Column('int')
  postId: number;
  @Column('text')
  content: string;
  @ManyToOne('User', 'comments')
  user: User;
  @ManyToOne('Post', 'comment')
  post: Post;
  @CreateDateColumn({type: 'timestamp', name: 'createdAt', nullable: false})
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp', name: 'updatedAt'})
  updateAt: Date;
}
