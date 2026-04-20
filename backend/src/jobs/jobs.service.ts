import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './jobs.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
  ) {}

  async findAll(
    search?: string,
    page = 1,
    limit = 10,
  ): Promise<[Job[], number]> {
    const query = this.jobsRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company'); // company name is useful in job listings

    if (search) {
      query.where('LOWER(job.title) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }

    query.skip((page - 1) * limit).take(limit);

    return query.getManyAndCount();
  }

  async findOne(id: number): Promise<Job> {
    const job = await this.jobsRepository.findOne({
      where: { id },
      relations: ['company', 'requiredSkills'],
    });
    if (!job) throw new NotFoundException(`Job #${id} not found`);
    return job;
  }

  create(data: Partial<Job>): Promise<Job> {
    const job = this.jobsRepository.create(data);
    return this.jobsRepository.save(job);
  }

  async update(id: number, data: Partial<Job>): Promise<Job> {
    await this.findOne(id);
    await this.jobsRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.jobsRepository.delete(id);
  }
}
