/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './entities/transaction.entity';
import { Model, Types } from 'mongoose';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class TransactionsService {
  @InjectModel('Transactions') private readonly transactionModel: Model<Transaction>
  @InjectModel('Tags') private readonly TagModel: Model<Tag>

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
  async findTransactionsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Transaction[]> {
    return this.transactionModel.find({ userId: userId, date: { $gte: startDate, $lte: endDate } }).exec();
  }
  
  async findByUserId(userId: string): Promise<Transaction[]> {
    // Find transactions by userId
    const transactions = await this.transactionModel.find({ userId }).exec();
    
    // Check if any transactions are found
    if (!transactions || transactions.length === 0) {
      throw new NotFoundException(`No transactions found for user with ID ${userId}`);
    }
    
    return transactions;
  }
  async getTotalMontant(userId: string, startDate: Date, endDate: Date): Promise<number> {
    const transactions = await this.transactionModel.find({
      userId: userId,
      date: { $gte: startDate, $lte: endDate }
    }).exec();
    
    const totalMontant = transactions.reduce((sum, transaction) => sum + transaction.montant, 0);
    
    return totalMontant;
  }
  
  async getTransactionsByTagName(userId: string, tagName: string): Promise<Transaction[]> {
    // Rechercher l'ID du tag par son nom
    const tag = await this.TagModel.findOne({ name: tagName }).exec();
    if (!tag) {
      return [];
    }
  
    return this.transactionModel.find({ userId: userId, tags: tag._id }).exec();
  }
  async getTransactionsByCategoryAndDate(
    userId: string,
    category: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Transaction[]> {
    return this.transactionModel.find({
      userId: userId,
      categorie: category,
      date: { $gte: startDate, $lte: endDate }
    }).exec();
  } 
  async getUserExpensesByCategory(userId: string, category: string): Promise<number> {
    const transactions = await this.transactionModel.find({ userId: userId, categorie: category }).exec();
    const totalExpenses = transactions.reduce((total, transaction) => total + transaction.montant, 0);
    return totalExpenses;
  }
  async getUserExpensesByCategoryh(userId: string): Promise<{ [category: string]: number }> {
    console.log('transactions')

    const transactions = await this.transactionModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } }, // Match transactions by userId
      { $group: { _id: '$categorie', totalExpenses: { $sum: '$montant' } } }, // Group transactions by category and calculate the total expenses
    ]).exec();
     console.log('transactions',transactions)
    const expensesByCategory: { [category: string]: number } = {};
    transactions.forEach((result: { _id: string; totalExpenses: number }) => {
      expensesByCategory[result._id] = result.totalExpenses;
    });
  
    return expensesByCategory;
  }
async getMonthlyExpensesByYear(userId: string): Promise<number[]> {
  const currentYear = new Date().getFullYear();
  const expensesByMonth: number[] = new Array(12).fill(0);

  // Get expenses for each month with transactions
  const transactions = await this.transactionModel.aggregate([
    { $match: { userId: new Types.ObjectId(userId), date: { $gte: new Date(currentYear, 0, 1) } } }, // Match transactions by userId and within the current year
    { $group: { _id: { $month: '$date' }, totalExpenses: { $sum: '$montant' } } }, // Group transactions by month and calculate the total expenses
  ]).exec();

  // Update expenses for each month with transactions
  transactions.forEach((result: { _id: number; totalExpenses: number }) => {
    expensesByMonth[result._id - 1] = result.totalExpenses;
  });

  return expensesByMonth;
}

  async getTotalExpensesForUser(userId: string): Promise<number> {
    const totalExpenses = await this.transactionModel.aggregate([
      { $match: { userId:new Types.ObjectId(userId) } }, // Match transactions by userId
      { $group: { _id: null, totalExpenses: { $sum: '$montant' } } }, // Group transactions and calculate the total expenses
    ]).exec();
  
    if (totalExpenses.length === 0) {
      return 0; // Return 0 if no transactions found for the user
    }
  
    return totalExpenses[0].totalExpenses;
  }
  
  
}
