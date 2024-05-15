/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post('create')
  async create(@Body() createBudgetDto: CreateBudgetDto) {
    try {
      return await this.budgetService.create(createBudgetDto);
    } catch (error) {
      throw new Error(`Unable to create budget: ${error.message}`);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.budgetService.findAll();
    } catch (error) {
      throw new Error(`Unable to find budgets: ${error.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const budget = await this.budgetService.findOne(id);
      if (!budget) {
        throw new NotFoundException(`Budget with id ${id} not found`);
      }
      return budget;
    } catch (error) {
      throw new Error(`Unable to find budget: ${error.message}`);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    try {
      const updatedBudget = await this.budgetService.update(id, updateBudgetDto);
      if (!updatedBudget) {
        throw new NotFoundException(`Budget with id ${id} not found`);
      }
      return updatedBudget;
    } catch (error) {
      throw new Error(`Unable to update budget: ${error.message}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedBudget = await this.budgetService.remove(id);
      if (!deletedBudget) {
        throw new NotFoundException(`Budget with id ${id} not found`);
      }
      return deletedBudget;
    } catch (error) {
      throw new Error(`Unable to delete budget: ${error.message}`);
    }
  } 


  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return await this.budgetService.findByUserId(userId);
  }
}
