import { Education } from './education.model';
import { Experience } from './experience.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  headline: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  connections: number;
  website: string;
}
