import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./users.entity";
import { Company } from "src/companies/companies.entity";

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @Column() location: string;
  @Column() startDate: string;
  @Column({ nullable: true, type: 'varchar' }) endDate: string | null;
  @Column() description: string;
  @ManyToOne(() => User, (user) => user.experience)
  user: User;
  @ManyToOne(() => Company, (company) => company.experience, { nullable: true })
  company: Company | null;  // links to the Company entity
}