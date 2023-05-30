import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/createReport.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorator/current-user.decorator';
import { UserEntity } from 'src/users/users.entity';
import { MInterceptor } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approve-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private _report: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @MInterceptor(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
    return this._report.createReport(body, user);
  }
  @Get()
  getAllReports() {
    return this._report.getAllReports();
  }
  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() Body: ApprovedReportDto) {
    return this._report.approveReport(parseInt(id), Body.approved);
  }
}
