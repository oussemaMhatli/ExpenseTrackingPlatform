/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PlanificationDepensesService } from './planification-depenses.service';
import { PlanificationDepensesController } from './planification-depenses.controller';
import { PlanificationDepense } from './schemas/planificationdepenses.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'planificationDepenses', schema: PlanificationDepense }]),
  ],
  controllers: [PlanificationDepensesController],
  providers: [PlanificationDepensesService],
})
export class PlanificationDepensesModule {}
