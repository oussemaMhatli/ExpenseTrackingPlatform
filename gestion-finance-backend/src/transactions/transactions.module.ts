/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schema/transactio.schema';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transactions', schema: TransactionSchema }]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService,JwtService ],
})
export class TransactionsModule {}
