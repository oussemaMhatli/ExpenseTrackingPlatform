/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '../auth/auth.guard'
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  findAll() {
    return this.transactionsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('trans/:id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch('trans/:id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @UseGuards(AuthGuard)
  @Delete('trans/:id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Transaction[]> {
    try {
      const transactions = await this.transactionsService.findByUserId(userId);
      return transactions;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }
}
