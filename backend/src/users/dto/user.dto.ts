import type { Education, Experience } from '../types/profile.types';

export class UserDto {
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
