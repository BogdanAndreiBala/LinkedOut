import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./users.entity";

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn() id: number;
  @Column() institution: string;
  @Column() degree: string;
  @Column() fieldOfStudy: string;
  @Column() startYear: number;
  @Column({ nullable: true, type: 'int' }) endYear: number | null;
  @ManyToOne(() => User, (user) => user.education)
  user: User;
}