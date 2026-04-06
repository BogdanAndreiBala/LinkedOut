import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Skill } from '../skills/skills.entity';
import { Company } from '../companies/companies.entity';
import { Job } from '../jobs/jobs.entity';
import { Education } from '../users/education.entity';
import { Experience } from '../users/experience.entity';
import { DatabaseService } from './database.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Skill, Company, Job, Education, Experience])],
  providers: [DatabaseService],
})
export class DatabaseModule {}
