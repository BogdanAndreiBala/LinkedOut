import { Company } from 'src/companies/companies.entity';
import { Skill } from 'src/skills/skills.entity';
import { JobType } from './enums/job-type.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @Column() description: string;
  @Column() location: string;
  @Column({ type: 'varchar', enum: JobType }) type: JobType;
  @CreateDateColumn() createdAt: Date;
  @ManyToOne(() => Company, (company) => company.jobs)
  company: Company;
  @ManyToMany(() => Skill, (skill) => skill.jobs)
  @JoinTable()
  requiredSkills: Skill[];
}
