import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/createReport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { ReportsEntity } from './report.entity';
import { UserEntity } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportsEntity) private repo: Repository<ReportsEntity>,
  ) {}
  async createReport(body: CreateReportDto, user: UserEntity) {
    console.log('user...........', user);
    const report = await this.repo.create(body);
    let obj: any = {
      id: user.id,
      email: user.email,
    };
    report.user = obj;
    console.log('report', report);
    return this.repo.save(report);
  }
  getAllReports() {
    return this.repo.find();
  }
  async approveReport(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: id } });
    if (!report) {
      throw new NotFoundException('Report Not Found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
