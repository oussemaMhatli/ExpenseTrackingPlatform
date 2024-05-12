import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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
}
