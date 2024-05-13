/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pipe, PipeTransform } from '@angular/core';
import { transaction } from '../demo/user-management/components/modeles/Transaction';

@Pipe({
  name: 'dateSortPipe'
})
export class DateSortPipePipe implements PipeTransform {

  transform(transactions: transaction[], isAscending: boolean = true): transaction[] {
    if (!transactions || transactions.length <= 1) {
      return transactions;
    }

    return transactions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (isAscending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }

}
