import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { Company } from './companies.entity';
import { paginate, PaginatedResponse } from '../common/pagination';

@Controller('companies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter by company name or job title',
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (1-based)',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of results per page',
    type: Number,
  })
  @ApiOkResponse({ type: Company, isArray: true })
  async findAll(
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedResponse<Company>> {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const [companies, total] = await this.companiesService.findAll(
      search,
      pageNum,
      limitNum,
    );
    return paginate(companies, total, pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Company })
  @ApiNotFoundResponse({ description: 'Company not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }
}
