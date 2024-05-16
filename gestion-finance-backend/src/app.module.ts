/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { BudgetModule } from './budget/budget.module';
import { PlanificationDepensesModule } from './planification-depenses/planification-depenses.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/finance'),
    TransactionsModule,
    UserModule,
    AuthModule,
    TagModule,
    BudgetModule,
    PlanificationDepensesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
