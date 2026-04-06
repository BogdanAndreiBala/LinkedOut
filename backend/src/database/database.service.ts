import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.entity';
import { Skill } from '../skills/skills.entity';
import { Company } from '../companies/companies.entity';
import { Job } from '../jobs/jobs.entity';
import { JobType } from '../jobs/enums/job-type.enum';
import { Education } from '../users/education.entity';
import { Experience } from '../users/experience.entity';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Skill) private readonly skillsRepo: Repository<Skill>,
    @InjectRepository(Company)
    private readonly companiesRepo: Repository<Company>,
    @InjectRepository(Job) private readonly jobsRepo: Repository<Job>,
    @InjectRepository(Education)
    private readonly educationRepo: Repository<Education>,
    @InjectRepository(Experience)
    private readonly experienceRepo: Repository<Experience>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const count = await this.skillsRepo.count();
    if (count > 0) return;

    this.logger.log('Seeding database...');
    const skills = await this.seedSkills();
    const companies = await this.seedCompanies();
    await this.seedJobs(companies, skills);
    await this.seedUsers(skills, companies);
    this.logger.log('Database seeding complete.');
  }

  // ─── Skills ────────────────────────────────────────────────────────────────

  private async seedSkills(): Promise<Skill[]> {
    const names = [
      'Angular',
      'React',
      'Vue.js',
      'TypeScript',
      'JavaScript',
      'Java',
      'Spring Boot',
      '.NET Core',
      'C#',
      'Python',
      'Django',
      'FastAPI',
      'Node.js',
      'NestJS',
      'Express.js',
      'PHP',
      'Laravel',
      'Go',
      'Rust',
      'Docker',
      'Kubernetes',
      'AWS',
      'Azure',
      'GCP',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'GraphQL',
      'Terraform',
    ];
    const saved = await this.skillsRepo.save(
      this.skillsRepo.create(names.map((name) => ({ name }))),
    );
    this.logger.log(`Seeded ${saved.length} skills`);
    return saved;
  }

  // ─── Companies ─────────────────────────────────────────────────────────────

  private async seedCompanies(): Promise<Company[]> {
    const data: Array<Partial<Company>> = [
      {
        name: 'Endava',
        description: 'Global tech services and digital transformation',
        location: 'Bucharest, RO',
        website: 'https://endava.example.com',
      },
      {
        name: 'Bitdefender',
        description: 'Leading cybersecurity software company',
        location: 'Bucharest, RO',
        website: 'https://bitdefender.example.com',
      },
      {
        name: 'UiPath',
        description: 'Robotic process automation platform',
        location: 'Bucharest, RO',
        website: 'https://uipath.example.com',
      },
      {
        name: 'Fortech',
        description: 'Software development and outsourcing',
        location: 'Cluj-Napoca, RO',
        website: 'https://fortech.example.com',
      },
      {
        name: 'Tremend',
        description: 'Digital transformation and software delivery',
        location: 'Bucharest, RO',
        website: 'https://tremend.example.com',
      },
      {
        name: 'Cognizant Romania',
        description: 'IT services and consulting',
        location: 'Cluj-Napoca, RO',
        website: 'https://cognizant-romania.example.com',
      },
      {
        name: 'Atos Romania',
        description: 'Digital transformation company',
        location: 'Bucharest, RO',
        website: 'https://atos-romania.example.com',
      },
      {
        name: 'ING Hubs Romania',
        description: 'Technology hub for ING Group',
        location: 'Bucharest, RO',
        website: 'https://ing-hubs-romania.example.com',
      },
      {
        name: 'Capgemini Romania',
        description: 'Consulting and IT services',
        location: 'Bucharest, RO',
        website: 'https://capgemini-romania.example.com',
      },
      {
        name: 'Accenture Romania',
        description: 'Global professional services company',
        location: 'Bucharest, RO',
        website: 'https://accenture-romania.example.com',
      },
      {
        name: 'NTT Data Romania',
        description: 'IT infrastructure and managed services',
        location: 'Timisoara, RO',
        website: 'https://nttdata-romania.example.com',
      },
      {
        name: 'Stefanini Romania',
        description: 'IT services and digital transformation',
        location: 'Cluj-Napoca, RO',
        website: 'https://stefanini-romania.example.com',
      },
      {
        name: 'Pentalog',
        description: 'Tech talent and digital product services',
        location: 'Iasi, RO',
        website: 'https://pentalog.example.com',
      },
      {
        name: 'Luxoft Romania',
        description: 'Software engineering and IT services',
        location: 'Bucharest, RO',
        website: 'https://luxoft-romania.example.com',
      },
      {
        name: 'Revolut',
        description: 'Global fintech and neobanking company',
        location: 'Bucharest, RO',
        website: 'https://revolut.example.com',
      },
      {
        name: 'Glovo Romania',
        description: 'On-demand delivery platform',
        location: 'Bucharest, RO',
        website: 'https://glovo-romania.example.com',
      },
      {
        name: 'SumUp Romania',
        description: 'Mobile payment and invoicing solutions',
        location: 'Bucharest, RO',
        website: 'https://sumup-romania.example.com',
      },
      {
        name: 'Siemens Romania',
        description: 'Technology and industrial engineering',
        location: 'Brasov, RO',
        website: 'https://siemens-romania.example.com',
      },
      {
        name: 'Continental Romania',
        description: 'Automotive and industrial technology',
        location: 'Timisoara, RO',
        website: 'https://continental-romania.example.com',
      },
      {
        name: 'Ericsson Romania',
        description: 'Telecom technology and networking',
        location: 'Bucharest, RO',
        website: 'https://ericsson-romania.example.com',
      },
      {
        name: 'Finastra',
        description: 'Financial software and cloud solutions',
        location: 'Bucharest, RO',
        website: 'https://finastra.example.com',
      },
      {
        name: 'Temenos Romania',
        description: 'Core banking software provider',
        location: 'Cluj-Napoca, RO',
        website: 'https://temenos-romania.example.com',
      },
      {
        name: 'Betfair Romania',
        description: 'Online betting platform engineering hub',
        location: 'Cluj-Napoca, RO',
        website: 'https://betfair-romania.example.com',
      },
      {
        name: 'Adobe Romania',
        description: 'Creative and digital media software',
        location: 'Bucharest, RO',
        website: 'https://adobe-romania.example.com',
      },
      {
        name: 'Oracle Romania',
        description: 'Enterprise software and cloud services',
        location: 'Bucharest, RO',
        website: 'https://oracle-romania.example.com',
      },
      {
        name: 'IBM Romania',
        description: 'IT consulting and cloud computing',
        location: 'Bucharest, RO',
        website: 'https://ibm-romania.example.com',
      },
      {
        name: 'HP Romania',
        description: 'Technology and printing solutions',
        location: 'Bucharest, RO',
        website: 'https://hp-romania.example.com',
      },
      {
        name: 'DB Global Technology',
        description: 'Deutsche Bank technology hub',
        location: 'Bucharest, RO',
        website: 'https://db-global-technology.example.com',
      },
      {
        name: 'Societe Generale Romania',
        description: 'Banking and financial services tech',
        location: 'Bucharest, RO',
        website: 'https://societe-generale-romania.example.com',
      },
      {
        name: 'Raiffeisen Technology',
        description: 'Banking innovation and technology center',
        location: 'Bucharest, RO',
        website: 'https://raiffeisen-technology.example.com',
      },
      {
        name: 'Orange Romania',
        description: 'Telecom and digital services',
        location: 'Bucharest, RO',
        website: 'https://orange-romania.example.com',
      },
      {
        name: 'Vodafone Romania',
        description: 'Mobile and digital connectivity',
        location: 'Bucharest, RO',
        website: 'https://vodafone-romania.example.com',
      },
      {
        name: 'Deloitte Romania',
        description: 'Audit, consulting and technology services',
        location: 'Bucharest, RO',
        website: 'https://deloitte-romania.example.com',
      },
      {
        name: 'PwC Romania',
        description: 'Advisory and digital transformation',
        location: 'Bucharest, RO',
        website: 'https://pwc-romania.example.com',
      },
      {
        name: 'EY Romania',
        description: 'Consulting and technology services',
        location: 'Bucharest, RO',
        website: 'https://ey-romania.example.com',
      },
      {
        name: 'Wipro Romania',
        description: 'IT services and process outsourcing',
        location: 'Bucharest, RO',
        website: 'https://wipro-romania.example.com',
      },
      {
        name: 'Infosys Romania',
        description: 'IT outsourcing and digital services',
        location: 'Bucharest, RO',
        website: 'https://infosys-romania.example.com',
      },
      {
        name: 'TechFusion Labs',
        description: 'Product engineering and innovation studio',
        location: 'Cluj-Napoca, RO',
        website: 'https://techfusion-labs.example.com',
      },
      {
        name: 'PixelCraft Studio',
        description: 'UI/UX design and frontend engineering',
        location: 'Iasi, RO',
        website: 'https://pixelcraft-studio.example.com',
      },
      {
        name: 'CloudNine Systems',
        description: 'Cloud infrastructure and DevOps specialists',
        location: 'Timisoara, RO',
        website: 'https://cloudnine-systems.example.com',
      },
      {
        name: 'DataBridge Analytics',
        description: 'Data engineering and business analytics',
        location: 'Bucharest, RO',
        website: 'https://databridge-analytics.example.com',
      },
      {
        name: 'SecureCore',
        description: 'Cybersecurity and compliance consulting',
        location: 'Cluj-Napoca, RO',
        website: 'https://securecore.example.com',
      },
      {
        name: 'Agile Flow',
        description: 'Agile software development and coaching',
        location: 'Brasov, RO',
        website: 'https://agile-flow.example.com',
      },
      {
        name: 'MobileFirst Agency',
        description: 'Cross-platform mobile app development',
        location: 'Bucharest, RO',
        website: 'https://mobilefirst-agency.example.com',
      },
      {
        name: 'API Craft',
        description: 'Backend systems and API design specialists',
        location: 'Iasi, RO',
        website: 'https://api-craft.example.com',
      },
      {
        name: 'DevCore Solutions',
        description: 'Custom software and ERP development',
        location: 'Oradea, RO',
        website: 'https://devcore-solutions.example.com',
      },
      {
        name: 'Synapse Tech',
        description: 'AI, ML and intelligent automation solutions',
        location: 'Cluj-Napoca, RO',
        website: 'https://synapse-tech.example.com',
      },
      {
        name: 'OpenNode',
        description: 'Open source consulting and development',
        location: 'Bucharest, RO',
        website: 'https://opennode.example.com',
      },
      {
        name: 'Haufe Romania',
        description: 'HR and finance software solutions',
        location: 'Timisoara, RO',
        website: 'https://haufe-romania.example.com',
      },
      {
        name: 'Crossover Romania',
        description: 'Remote software talent and products',
        location: 'Bucharest, RO',
        website: 'https://crossover-romania.example.com',
      },
    ];

    const saved = await this.companiesRepo.save(
      this.companiesRepo.create(data),
    );
    this.logger.log(`Seeded ${saved.length} companies`);
    return saved;
  }

  // ─── Jobs ──────────────────────────────────────────────────────────────────

  private async seedJobs(
    companies: Company[],
    skills: Skill[],
  ): Promise<Job[]> {
    const titles = [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'Software Engineer',
      'Senior Software Engineer',
      'Lead Developer',
      'DevOps Engineer',
      'Cloud Engineer',
      'Data Engineer',
      'QA Automation Engineer',
      'Mobile Developer',
      'Site Reliability Engineer',
      'Platform Engineer',
      'Staff Engineer',
      'Security Engineer',
      'API Developer',
      'Solutions Architect',
      'Technical Lead',
      'Principal Engineer',
      'Engineering Manager',
    ];
    const types = [
      JobType.FULL_TIME,
      JobType.PART_TIME,
      JobType.CONTRACT,
      JobType.REMOTE,
      JobType.HYBRID,
      JobType.FREELANCE,
      JobType.INTERNSHIP,
    ];
    const descriptions = [
      'Build and maintain scalable web applications using modern tech stacks.',
      'Design and implement RESTful APIs and microservices architecture.',
      'Collaborate with cross-functional teams to deliver high-quality software.',
      'Lead technical initiatives and mentor junior team members.',
      'Develop cloud-native solutions and manage infrastructure on AWS/Azure/GCP.',
      'Optimize application performance, security and system reliability.',
      'Drive frontend architecture, component libraries and reusability standards.',
      'Work on distributed systems, event-driven pipelines and data platforms.',
      'Integrate third-party services and ensure cloud infrastructure scalability.',
      'Own code quality through automated testing, monitoring and code reviews.',
    ];

    const jobs: Job[] = [];
    for (let i = 0; i < 100; i++) {
      const company = companies[i % companies.length];
      jobs.push(
        this.jobsRepo.create({
          title: titles[i % titles.length],
          description: descriptions[i % descriptions.length],
          location: company.location,
          type: types[i % types.length],
          company,
          requiredSkills: this.pickUnique(skills, i * 3, (i % 4) + 3), // 3–6 skills
        }),
      );
    }

    const saved = await this.jobsRepo.save(jobs);
    this.logger.log(`Seeded ${saved.length} jobs`);
    return saved;
  }

  // ─── Users ─────────────────────────────────────────────────────────────────

  private async seedUsers(
    skills: Skill[],
    companies: Company[],
  ): Promise<void> {
    const firstNames = [
      'Alex',
      'Ana',
      'Andrei',
      'Bianca',
      'Bogdan',
      'Catalin',
      'Cristina',
      'Dan',
      'Diana',
      'Elena',
      'Florin',
      'Gabriela',
      'George',
      'Ioana',
      'Ioan',
      'Julia',
      'Laura',
      'Liviu',
      'Madalina',
      'Mihai',
      'Mircea',
      'Monica',
      'Nicoleta',
      'Oana',
      'Octavian',
      'Paula',
      'Petru',
      'Radu',
      'Raluca',
      'Ramona',
      'Roxana',
      'Sebastian',
      'Simona',
      'Silviu',
      'Sorin',
      'Stefan',
      'Tudor',
      'Vlad',
      'Adriana',
      'Alina',
      'Claudiu',
      'Cosmin',
      'Daria',
      'Emil',
      'Florentina',
      'Gabriel',
      'Horia',
      'Irina',
      'Larisa',
      'Victor',
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
      'Constantin',
      'Popa',
      'Lazar',
      'Stoian',
      'Dinu',
      'Badea',
      'Florescu',
      'Sandu',
      'Pavel',
      'Chirita',
      'Rosu',
      'Negru',
      'Barbu',
      'Vlad',
      'Oprea',
      'Voicu',
      'Dobre',
      'Lupu',
      'Toma',
      'Grigore',
      'Lungu',
      'Bucur',
      'Cretu',
      'Manea',
      'Nita',
      'Preda',
      'Serban',
      'Avram',
      'Bogdan',
      'Ciobanu',
      'Dragomir',
      'Enache',
      'Ghita',
      'Iacob',
      'Leonte',
      'Mihalache',
      'Neagu',
      'Olaru',
      'Patrascu',
      'Zamfir',
    ];
    const locations = [
      'Bucharest, RO',
      'Cluj-Napoca, RO',
      'Iasi, RO',
      'Timisoara, RO',
      'Brasov, RO',
      'Constanta, RO',
      'Oradea, RO',
      'Sibiu, RO',
      'Craiova, RO',
      'Galati, RO',
    ];
    const headlines = [
      'Frontend Developer passionate about great UX',
      'Backend Engineer focused on scalable APIs',
      'Full Stack Developer | Open Source Enthusiast',
      'Senior Software Engineer | Team Lead',
      'Cloud & DevOps Engineer | Kubernetes Certified',
      'Mobile Developer | React Native & Flutter',
      'Software Architect | Microservices & DDD',
      'QA Engineer | Test Automation Specialist',
      'Data Engineer | Pipelines & Analytics',
      'TypeScript & Angular enthusiast',
    ];
    const universities = [
      'University of Bucharest',
      'Politehnica University Bucharest',
      'Babes-Bolyai University',
      'Alexandru Ioan Cuza University',
      'West University of Timisoara',
      'Technical University of Cluj-Napoca',
      'University of Craiova',
      'Gheorghe Asachi Technical University',
      'University of Pitesti',
      'Lucian Blaga University of Sibiu',
    ];
    const degrees = ['BSc', 'MSc', 'BEng', 'MEng', 'BA'];
    const fields = [
      'Computer Science',
      'Software Engineering',
      'Information Technology',
      'Computer Engineering',
      'Mathematics and Computer Science',
      'Informatics',
      'Applied Computer Science',
      'Cybersecurity',
    ];
    const jobTitles = [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'Software Engineer',
      'Senior Developer',
      'Junior Developer',
      'DevOps Engineer',
      'Tech Lead',
      'UI Engineer',
      'QA Engineer',
    ];
    const jobDescriptions = [
      'Built scalable UI components and collaborated with backend teams.',
      'Developed and maintained RESTful APIs with high availability.',
      'Led frontend architecture decisions and conducted code reviews.',
      'Implemented CI/CD pipelines and managed cloud deployments.',
      'Optimized database queries and reduced API response times by 40%.',
      'Created automated test suites covering unit and integration tests.',
      'Migrated legacy monolith to a microservices architecture.',
      'Worked on real-time features using WebSockets and Redis pub/sub.',
      'Delivered mobile-first experiences with responsive design.',
      'Mentored junior developers and participated in technical interviews.',
    ];

    const p = <T>(arr: T[], i: number, offset = 0): T =>
      arr[(i + offset) % arr.length];

    // Pre-hash each unique firstName once (cost 4 for seeding speed)
    const passwordMap = new Map<string, string>();
    for (const name of firstNames) {
      passwordMap.set(name, await bcrypt.hash(name, 4));
    }

    // ── Step 1: batch create and save all 500 users ──
    const usersToSave: User[] = [];
    for (let i = 0; i < 500; i++) {
      const firstName = firstNames[i % firstNames.length];
      const lastName =
        lastNames[Math.floor(i / firstNames.length) % lastNames.length];
      const location = p(locations, i, 3);
      const year = 1978 + (i % 22);
      const month = (i % 12) + 1;
      const day = (i % 28) + 1;

      usersToSave.push(
        this.usersRepo.create({
          firstName,
          lastName,
          profileImage: '',
          headline: p(headlines, i),
          dateOfBirth: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@example.com`,
          phone: `+40 7${((i % 90) + 10).toString()} ${((i % 900) + 100).toString()} ${(((i * 3) % 900) + 100).toString()}`,
          location,
          about: `${firstName} ${lastName} is a software professional based in ${location}, focused on delivering clean and reliable software.`,
          password: passwordMap.get(firstName)!,
          connections: 10 + ((i * 13) % 490),
          website: `https://example.com/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${i + 1}`,
          tablePreferences: null,
          skills: this.pickUnique(skills, i * 7, (i % 5) + 3), // 3–7 skills
        }),
      );
    }

    const savedUsers = await this.usersRepo.save(usersToSave);

    // ── Step 2: batch create all education entries ──
    const allEducation: Education[] = [];
    for (let i = 0; i < savedUsers.length; i++) {
      const eduCount = 1 + (i % 2); // 1 or 2 entries per user
      let eduStart = 2000 + (i % 10);
      for (let e = 0; e < eduCount; e++) {
        const duration = e === 0 ? 4 : 2;
        allEducation.push(
          this.educationRepo.create({
            institution: p(universities, i, e * 3),
            degree: p(degrees, i, e),
            fieldOfStudy: p(fields, i, e * 2),
            startYear: eduStart,
            endYear: eduStart + duration,
            user: savedUsers[i],
          }),
        );
        eduStart += duration;
      }
    }
    await this.educationRepo.save(allEducation);

    // ── Step 3: batch create all experience entries ──
    const allExperience: Experience[] = [];
    for (let i = 0; i < savedUsers.length; i++) {
      const expCount = 2 + (i % 3); // 2–4 entries per user
      let expStart = 2006 + (i % 10);
      for (let e = 0; e < expCount; e++) {
        const duration = 1 + ((i + e) % 4);
        const isCurrent = e === expCount - 1;
        const company = companies[(i * 3 + e * 11) % companies.length];
        allExperience.push(
          this.experienceRepo.create({
            title: p(jobTitles, i, e),
            location: company.location ?? p(locations, i),
            startDate: `${expStart}-${(((e * 3) % 12) + 1).toString().padStart(2, '0')}-01`,
            endDate: isCurrent
              ? null
              : `${expStart + duration}-${(((e * 5) % 12) + 1).toString().padStart(2, '0')}-28`,
            description: p(jobDescriptions, i, e * 2),
            user: savedUsers[i],
            company,
          }),
        );
        if (!isCurrent) expStart += duration;
      }
    }
    await this.experienceRepo.save(allExperience);

    this.logger.log(
      `Seeded ${savedUsers.length} users with education and experience`,
    );
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  /** Pick `count` unique items from `arr` using a deterministic but varied offset */
  private pickUnique<T extends { id: number }>(
    arr: T[],
    offset: number,
    count: number,
  ): T[] {
    const map = new Map<number, T>();
    for (let i = 0; map.size < count && i < arr.length * 2; i++) {
      const item = arr[(offset + i * 13) % arr.length];
      map.set(item.id, item);
    }
    return [...map.values()];
  }
}
