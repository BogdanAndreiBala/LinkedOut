import { Education } from './education.model';
import { Experience } from './experience.model';
import { Skill } from './skill.model';
import { TablePreferences } from './table-preferences.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  headline: string;
  dateOfBirth: string;
  phone: string;
  location: string;
  about: string;
  connections: number;
  website: string;
  isDarkTheme: boolean;
  tablePreferences: TablePreferences | null;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
}
