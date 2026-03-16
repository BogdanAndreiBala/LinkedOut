import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { Education, Experience } from './types/profile.types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profileImage: string;

  @Column()
  headline: string;

  @Column()
  dateOfBirth: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  location: string;

  @Column()
  about: string;

  @Column('simple-array')
  skills: string[];

  @Column('simple-json')
  education: Education[];

  @Column('simple-json')
  experience: Experience[];

  @Column()
  connections: number;

  @Column()
  website: string;
}
