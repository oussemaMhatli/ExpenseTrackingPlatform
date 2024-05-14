/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget } from './entities/budget.entity';

@Injectable()
export class BudgetService {
  @InjectModel("Budget") private readonly budgetmodel:Model<Budget>

  
  async  create(createBudgetDto: CreateBudgetDto) {
    const createdBudget = new this.budgetmodel(createBudgetDto);
    return createdBudget.save();
  }

  async findAll(): Promise<Budget[]> {
    return this.budgetmodel.find().exec();
  }

  async findOne(id: string): Promise<Budget> {
    return this.budgetmodel.findById(id).exec();
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    return this.budgetmodel.findByIdAndUpdate(id, updateBudgetDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Budget> {
    return this.budgetmodel.findByIdAndDelete(id).exec();
  }

  async findByUserId(userId: string): Promise<Budget[]> {
    return this.budgetmodel.find({ userId }).exec();
  
}
}
