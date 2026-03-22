import { JobType } from './job-type.model';
import { Skill } from './skill.model';

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  type: JobType;
  createdAt: string;
  company: {
    id: number;
    name: string;
    logoUrl: string;
    location: string;
    website: string;
  };
  requiredSkills: Skill[];
}
