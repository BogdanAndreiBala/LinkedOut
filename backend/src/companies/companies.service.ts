import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './companies.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async findAll(
    search?: string,
    page = 1,
    limit = 10,
  ): Promise<[Company[], number]> {
    const query = this.companiesRepository
      .createQueryBuilder('company')
      .leftJoin('company.jobs', 'job') // join only for filtering, not selected
      .loadRelationCountAndMap('company.jobsCount', 'company.jobs');

    if (search) {
      query.where(
        'LOWER(company.name) LIKE :search OR LOWER(job.title) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    query.skip((page - 1) * limit).take(limit);

    return query.getManyAndCount();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companiesRepository.findOne({
      where: { id },
      relations: ['jobs', 'experience'],
    });
    if (!company) throw new NotFoundException(`Company #${id} not found`);
    return company;
  }
}
