import { SkillDto } from '../../skills/dto/skills.dto';
import { JobType } from '../enums/job-type.enum';

export class JobDto {
  id: number;
  title: string;
  description: string;
  location: string;
  type: JobType;
  createdAt: Date;
  companyId: number;
  requiredSkills: SkillDto[];
}
