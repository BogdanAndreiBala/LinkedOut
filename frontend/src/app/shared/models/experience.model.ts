import { Company } from './company.model';

export interface Experience {
  id: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  company: Company;
}
