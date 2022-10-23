import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Course} from '@/DB/entity/Course';
import {User} from '@/DB/entity/User';
import {Comment} from './Comment';

@Entity('videos')
class Video {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  title: string;
  @Column('varchar')
  path: string;
  @Column('varchar')
  imagePath: string;
  @Column('int', {default: 0})
  playCount: number;
  @ManyToOne('User', 'videos')
  author: User;
  @OneToMany('Comment', 'video')
  comments: Comment[];
  @ManyToOne('Course', 'videos')
  course: Course;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn({type: 'timestamp', name: 'updatedAt'})
  updatedAt: Date;
}
export {Video};
