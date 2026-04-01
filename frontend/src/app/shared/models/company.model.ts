import { Job } from './job.model';

export interface Company {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  location: string;
  website: string;
  jobsCount: number;
}
