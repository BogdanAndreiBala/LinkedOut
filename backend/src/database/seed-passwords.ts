/**
 * One-off script: sets each user's password to bcrypt(firstName).
 * Run with: npx ts-node -r tsconfig-paths/register src/database/seed-passwords.ts
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.entity';
import { Skill } from '../skills/skills.entity';
import { Education } from '../users/education.entity';
import { Experience } from '../users/experience.entity';
import { Company } from '../companies/companies.entity';
import { Job } from '../jobs/jobs.entity';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User, Skill, Education, Experience, Company, Job],
  synchronize: true,
});

async function seedPasswords() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(User);

  const users = await repo.find();
  if (users.length === 0) {
    console.log('No users found.');
    await dataSource.destroy();
    return;
  }

  for (const user of users) {
    user.password = await bcrypt.hash(user.firstName, 10);
    await repo.save(user);
    console.log(`✔ Set password for ${user.firstName} ${user.lastName} (id=${user.id})`);
  }

  console.log(`\nDone. Updated ${users.length} user(s).`);
  await dataSource.destroy();
}

seedPasswords().catch((err) => {
  console.error(err);
  process.exit(1);
});
