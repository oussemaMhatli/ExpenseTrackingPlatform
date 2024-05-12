/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, HttpException, HttpStatus, Query } from '@nestjs/common';
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
  @Post(':transactionId/tags/:tagId')
  async addTagToTransaction(
    @Param('transactionId') transactionId: string,
    @Param('tagId') tagId: string,
  ) {
    try {
      const updatedTransaction = await this.transactionsService.addTagToTransaction(transactionId, tagId);
      return updatedTransaction;
    } catch (error) {
      console.log(error.response)
      if (error instanceof NotFoundException) {
        // Transaction not found
        throw new NotFoundException(error.message);
      } else {
        // Other errors
        throw new HttpException(`Tag with ID ${tagId} is already associated with the transaction`, HttpStatus.BAD_REQUEST);
      }
    }
  }
  @Get('date-range')
  async findTransactionsByDateRange(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ): Promise<Transaction[]> {
    return this.transactionsService.findTransactionsByDateRange(startDate, endDate);
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
