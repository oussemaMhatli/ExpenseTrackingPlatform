/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanificationDepensesService } from './planification-depenses.service';
import { CreatePlanificationDepenseDto } from './dto/create-planification-depense.dto';
import { UpdatePlanificationDepenseDto } from './dto/update-planification-depense.dto';

@Controller('planification-depenses')
export class PlanificationDepensesController {
  constructor(private readonly planificationDepensesService: PlanificationDepensesService) {}

  @Post()
  create(@Body() createPlanificationDepenseDto: CreatePlanificationDepenseDto) {
    return this.planificationDepensesService.create(createPlanificationDepenseDto);
  }

  @Get()
  findAll() {
    return this.planificationDepensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planificationDepensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanificationDepenseDto: UpdatePlanificationDepenseDto) {
    return this.planificationDepensesService.update(+id, updatePlanificationDepenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planificationDepensesService.remove(+id);
  }
}
