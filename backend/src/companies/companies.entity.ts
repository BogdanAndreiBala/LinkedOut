import { Job } from 'src/jobs/jobs.entity';
import { Experience } from 'src/users/experience.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column({ nullable: true }) description: string;
  @Column({ nullable: true }) logoUrl: string;
  @Column({ nullable: true }) website: string;
  @Column({ nullable: true }) location: string;
  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];
  @OneToMany(() => Experience, (exp) => exp.company)
  experience: Experience[];

  // Virtual field populated by loadRelationCountAndMap in findAll
  jobsCount?: number;
}
