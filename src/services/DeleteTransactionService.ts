import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const transaction = await transactionRepository.findOne({ where: { id } });

    if (!transaction) {
      throw new AppError('This transaction does not exists.', 403);
    }

    await transactionRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
