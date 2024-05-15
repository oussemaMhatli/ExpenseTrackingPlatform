/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpException, HttpStatus, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '../auth/auth.guard'
import { Transaction } from './entities/transaction.entity';
//@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  
  @Post('create')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get('all')
  findAll() {
    return this.transactionsService.findAll();
  }
  @Get('trans/:id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch('trans/:id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

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
    @Query('userId') userId: string
  ): Promise<Transaction[]> {
    return this.transactionsService.findTransactionsByDateRange(userId,startDate, endDate);
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
  @Get('sum/userId')
  async getTotalMontant(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Param('userId') userId: string
  ): Promise<number> {
    return this.transactionsService.getTotalMontant(userId,startDate, endDate);
  }
  @Get('bytag/userId')
  async getTransactionsByTagName(@Query('tagName') tagName: string,@Param('userId') userId: string): Promise<Transaction[]> {
    return this.transactionsService.getTransactionsByTagName(userId,tagName);
  }
  @Get('getBycatDate')
  async getTransactionsByCategoryAndDate(
    @Query('userId') userId: string,
    @Query('category') category: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ): Promise<Transaction[]> {
    return this.transactionsService.getTransactionsByCategoryAndDate(userId, category, startDate, endDate);
  }
  @Get('expensesbycategory')
  async getUserExpensesByCategory(
    @Query('userId') userId: string,
    @Query('category') category: string,
  ): Promise<number> {
    return this.transactionsService.getUserExpensesByCategory(userId, category);
  }

  @Get('exbencegroupedbycat')
  async getUserExpensesByCategories(@Query('userId') userId: string): Promise<{ [category: string]: number }>  {
    return this.transactionsService.getUserExpensesByCategoryh(userId);
  }

  @Get('exbencegroupedbydat')
async getMonthlyExpensesByYear(@Query('userId') userId: string): Promise<number[]> {
  return this.transactionsService.getMonthlyExpensesByYear(userId);
}
@Get('gettotalexpense')
async getTotalExpensesForUser(@Query('userId') userId: string): Promise<number> {
  return this.transactionsService.getTotalExpensesForUser(userId);
}
@Get('getmostExpansecat')
async getmostExpanse(@Query('userId') userId: string): Promise<any> {
  return this.transactionsService.getMostExpensiveCategory(userId);
}

@Get('exbencegroupedbycatmonth')
async getExpensesBycatMonth(@Query('userId') userId: string,@Query('month') month: string): Promise<any> {
  return this.transactionsService.getUserExpensesByCategoryhMonth(userId,+month);
}
@Get('expensebyyearcat')
async getMonthlyExpensesByCategory(@Query('userId') userId: string): Promise<any> {
  return this.transactionsService.getMonthlyExpensesByCategory(userId);
}
}

