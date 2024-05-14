/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { budgetSchema } from './schema/budget.Schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Budget", schema: budgetSchema }])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
