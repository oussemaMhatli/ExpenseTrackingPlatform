import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './entities/transaction.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class TransactionsService {
  @InjectModel('Transactions') private readonly transactionModel: Model<Transaction>

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return await createdTransaction.save();
  }
 
  async findAll(): Promise<Transaction[]> {
    return await this.transactionModel.find().exec();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const updatedTransaction = await this.transactionModel.findByIdAndUpdate(id, updateTransactionDto, { new: true });
    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return updatedTransaction;
  }

  async remove(id: string): Promise<void> {
    const deletedTransaction = await this.transactionModel.findByIdAndDelete(id);
    if (!deletedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  }
  async addTagToTransaction(transactionId: string, tagId: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(transactionId).exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${transactionId} not found`);
    }
    const objectIdTagId = new Types.ObjectId(tagId);

    if (transaction.tags.includes(objectIdTagId)) {
      throw new Error(`Tag with ID ${tagId} is already associated with the transaction`);
    }

    transaction.tags.push(objectIdTagId);

    const updatedTransaction = await transaction.save();

    return updatedTransaction;
  }
}
