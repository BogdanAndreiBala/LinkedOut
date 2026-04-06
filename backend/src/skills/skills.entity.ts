import { Job } from "src/jobs/jobs.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('skills')
export class Skill {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @ManyToMany(() => User, (user) => user.skills)
    users: User[];

    @ManyToMany(() => Job, (job) => job.requiredSkills)
    jobs: Job[];

}