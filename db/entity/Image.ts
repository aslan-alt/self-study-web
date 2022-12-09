import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('images')
class Image {
  @PrimaryGeneratedColumn('increment')
  id?: number;
  @Column('varchar')
  name?: string;
  @Column('varchar')
  path?: string;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn({type: 'timestamp', name: 'updatedAt'})
  updatedAt?: Date;
}
export {Image};
