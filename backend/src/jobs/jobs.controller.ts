import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JobsService } from './jobs.service';
import { Job } from './jobs.entity';
import { paginate, PaginatedResponse } from '../common/pagination';

@Controller('jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter by job title',
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
  @ApiOkResponse({ type: Job, isArray: true })
  async findAll(
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedResponse<Job>> {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const [jobs, total] = await this.jobsService.findAll(
      search,
      pageNum,
      limitNum,
    );
    return paginate(jobs, total, pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({ description: 'Job not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Job> {
    return this.jobsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a job' })
  @ApiBody({ type: Job })
  @ApiOkResponse({ type: Job })
  create(@Body() body: Partial<Job>): Promise<Job> {
    return this.jobsService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a job' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: Job })
  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({ description: 'Job not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<Job>,
  ): Promise<Job> {
    return this.jobsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a job' })
  @ApiParam({ name: 'id', type: Number })
  @ApiNotFoundResponse({ description: 'Job not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.jobsService.remove(id);
  }
}
