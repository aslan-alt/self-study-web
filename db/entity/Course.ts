import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from '@/DB/entity/User';
import {Video} from '@/DB/entity/Video';
import {CourseType} from '../../requests';

@Entity('courses')
class Course {
  @PrimaryGeneratedColumn('increment')
  id?: number;
  @Column('int')
  type?: CourseType;
  @Column('varchar')
  title?: string;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn({type: 'timestamp', name: 'updatedAt'})
  updatedAt?: Date;
  @ManyToOne('User', 'courses')
  author?: User;
  @OneToMany('Video', 'course')
  videos?: Video[];
}
export {Course};
