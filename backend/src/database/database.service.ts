import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import type { Education, Experience } from '../users/types/profile.types';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const count = await this.usersRepository.count();
    if (count > 0) {
      return;
    }

    const users = this.buildMockUsers(20);
    await this.usersRepository.save(users);
    this.logger.log(`Seeded ${users.length} users`);
  }

  private buildMockUsers(count: number): Array<Omit<User, 'id'>> {
    const firstNames = [
      'Oana',
      'Mihai',
      'Andrei',
      'Elena',
      'Ioana',
      'Alex',
      'Maria',
      'Vlad',
      'Ana',
      'Radu',
    ];
    const lastNames = [
      'Popescu',
      'Ionescu',
      'Dumitrescu',
      'Stan',
      'Marin',
      'Matei',
      'Rusu',
      'Munteanu',
      'Tudor',
      'Georgescu',
    ];
    const locations = [
      'Bucharest, RO',
      'Cluj-Napoca, RO',
      'Iasi, RO',
      'Timisoara, RO',
      'Brasov, RO',
    ];
    const skillPool = [
      'Angular',
      'TypeScript',
      'JavaScript',
      'NestJS',
      'Node.js',
      'RxJS',
      'HTML',
      'CSS',
      'SQL',
      'Git',
    ];
    const companies = [
      'Example Corp',
      'Angular Troopers',
      'TechStart SRL',
      'InnoSoft',
      'Digital Solutions',
      'CodeFactory',
      'WebDev Pro',
      'CloudTech Industries',
      'DataCorp',
      'Agile Systems',
    ];
    const jobTitles = [
      'Software Engineer',
      'Frontend Developer',
      'Full Stack Developer',
      'Senior Developer',
      'Junior Developer',
      'Lead Developer',
      'Web Developer',
      'UI Engineer',
      'JavaScript Developer',
      'Technical Lead',
    ];
    const jobDescriptions = [
      'Built UI features and collaborated with backend teams.',
      'Developed responsive web applications using modern frameworks.',
      'Led development of key features and mentored junior developers.',
      'Implemented RESTful APIs and optimized database queries.',
      'Created reusable components and improved code quality.',
      'Worked on migration projects and legacy code modernization.',
      'Collaborated with UX designers to implement pixel-perfect designs.',
      'Optimized application performance and reduced load times.',
      'Maintained and extended existing applications with new features.',
      'Participated in code reviews and agile development processes.',
    ];
    const universities = [
      'University of Bucharest',
      'Politehnica University',
      'Babes-Bolyai University',
      'Alexandru Ioan Cuza University',
      'West University of Timisoara',
      'Technical University of Cluj-Napoca',
      'University of Craiova',
      'Gheorghe Asachi Technical University',
    ];
    const degrees = ['BSc', 'MSc', 'BA', 'MA', 'BEng'];
    const fieldsOfStudy = [
      'Computer Science',
      'Software Engineering',
      'Information Technology',
      'Computer Engineering',
      'Mathematics and Computer Science',
      'Informatics',
      'Applied Computer Science',
    ];

    const pick = <T>(arr: T[], idx: number): T => arr[idx % arr.length];
    const pickMany = (arr: string[], start: number, n: number): string[] => {
      const out: string[] = [];
      for (let i = 0; i < n; i++) {
        out.push(arr[(start + i) % arr.length]);
      }
      return out;
    };

    const users: Array<Omit<User, 'id'>> = [];
    for (let i = 1; i <= count; i++) {
      const firstName = pick(firstNames, i);
      const lastName = pick(lastNames, i * 2);
      const fullName = `${firstName} ${lastName}`;

      const year = 1985 + (i % 15);
      const month = (i * 2) % 12;
      const day = ((i * 3) % 28) + 1;
      const dateOfBirth = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

      // Generate 1-2 education entries per user
      const educationCount = 1 + (i % 2);
      const education: Education[] = [];
      let eduStartYear = 2000 + (i % 8);
      for (let e = 0; e < educationCount; e++) {
        const degreeType =
          e === 0
            ? pick(degrees.slice(0, 3), i + e)
            : pick(degrees.slice(1, 5), i + e);
        const duration = degreeType.startsWith('B') ? 4 : 2;
        education.push({
          institution: pick(universities, i + e),
          degree: degreeType,
          fieldOfStudy: pick(fieldsOfStudy, i + e),
          startYear: eduStartYear,
          endYear: eduStartYear + duration,
        });
        eduStartYear += duration;
      }

      // Generate 2-4 experience entries per user
      const experienceCount = 2 + (i % 3);
      const experience: Experience[] = [];
      const lastEducation = education[education.length - 1];
      let expStartYear =
        lastEducation && lastEducation.endYear
          ? lastEducation.endYear + 1
          : 2020;
      for (let exp = 0; exp < experienceCount; exp++) {
        const duration = 2 + ((i * exp) % 4);
        const isCurrentJob = exp === experienceCount - 1;
        experience.push({
          company: pick(companies, i + exp),
          title: pick(jobTitles, i * 2 + exp),
          location: pick(locations, i + exp),
          startDate: `${expStartYear}-${(((exp * 3) % 12) + 1).toString().padStart(2, '0')}-01`,
          endDate: isCurrentJob
            ? null
            : `${expStartYear + duration}-${(((exp * 5) % 12) + 1).toString().padStart(2, '0')}-28`,
          description: pick(jobDescriptions, i + exp * 2),
        });
        if (!isCurrentJob) {
          expStartYear += duration;
        }
      }

      users.push({
        firstName,
        lastName,
        profileImage: '',
        headline: `Frontend Developer | ${pick(skillPool, i)} enthusiast`,
        dateOfBirth,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
        phone: `+40 7${(10 + (i % 80)).toString().padStart(2, '0')} ${(100 + i)
          .toString()
          .padStart(3, '0')} ${(200 + i).toString().padStart(3, '0')}`,
        location: pick(locations, i),
        about: `${fullName} is a developer focused on building clean UI and reliable APIs.`,
        skills: pickMany(skillPool, i, 5),
        education,
        experience,
        connections: 50 + i * 7,
        website: `https://example.com/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${i}`,
      });
    }

    return users;
  }
}
