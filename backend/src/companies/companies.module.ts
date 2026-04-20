import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./companies.entity";
import { CompaniesService } from "./companies.service";
import { CompaniesController } from "./companies.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
