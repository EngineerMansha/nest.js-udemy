import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsEntity } from './report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportsEntity])],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
