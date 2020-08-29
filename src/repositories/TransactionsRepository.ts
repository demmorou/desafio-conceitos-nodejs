import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        accumulator.income +=
          transaction.type === 'income' ? transaction.value : 0;

        accumulator.outcome +=
          transaction.type === 'outcome' ? transaction.value : 0;

        accumulator.total = accumulator.income - accumulator.outcome;

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction: Transaction = {
      id: uuid(),
      title,
      type,
      value,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
