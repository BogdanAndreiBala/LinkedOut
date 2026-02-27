import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { DatabaseService } from './database.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DatabaseService],
})
export class DatabaseModule {}
