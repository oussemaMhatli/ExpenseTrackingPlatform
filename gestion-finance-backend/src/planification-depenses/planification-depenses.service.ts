/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreatePlanificationDepenseDto } from './dto/create-planification-depense.dto';
import { UpdatePlanificationDepenseDto } from './dto/update-planification-depense.dto';
import { PlanificationDepense } from './entities/planification-depense.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlanificationDepensesService {

  @InjectModel("planificationDepenses") private readonly planification:Model<PlanificationDepense>


  create(createPlanificationDepenseDto: CreatePlanificationDepenseDto) {
    const newPlan= new this.planification(createPlanificationDepenseDto);
    return newPlan.save();
    
  }

  findAll() {
    return this.planification.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} planificationDepense`;
  }

  update(id: number, updatePlanificationDepenseDto: UpdatePlanificationDepenseDto) {
    return `This action updates a #${id} planificationDepense`;
  }

  remove(id: number) {
    return `This action removes a #${id} planificationDepense`;
  }
}
