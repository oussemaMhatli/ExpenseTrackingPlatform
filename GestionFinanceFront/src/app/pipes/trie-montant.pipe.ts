import { Pipe, PipeTransform } from '@angular/core';
import { transaction } from '../demo/user-management/components/modeles/Transaction';

@Pipe({
  name: 'trieMontant'
})
export class TrieMontantPipe implements PipeTransform {

  transform(transactions: transaction[], isAscending: boolean = true): transaction[] {
    if (!transactions || transactions.length <= 1) {
      return transactions;
    }

    return transactions.sort((a, b) => {
      if (isAscending) {
        return a.montant - b.montant;
      } else {
        return b.montant - a.montant;
      }
    });
  }

}
