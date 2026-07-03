import prisma from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class CoinService {
  /**
   * Get user's coin balance
   */
  async getBalance(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { coinBalance: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      balance: Number(user.coinBalance),
    };
  }

  /**
   * Add coins to user balance (atomic operation)
   */
  async addCoins(userId: string, amount: bigint, transactionType: string, targetRef?: string) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: {
          coinBalance: {
            increment: amount,
          },
        },
      });

      await tx.coinTransaction.create({
        data: {
          id: uuidv4(),
          user_ref: userId,
          type: transactionType,
          amount: amount,
          target_ref: targetRef,
          timestamp: new Date(),
        },
      });

      return {
        newBalance: Number(user.coinBalance),
        transaction: { type: transactionType, amount: Number(amount) },
      };
    });
  }

  /**
   * Deduct coins from user balance (atomic operation)
   */
  async deductCoins(userId: string, amount: bigint, transactionType: string, targetRef?: string) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { coinBalance: true },
      });

      if (!user || user.coinBalance < amount) {
        throw new Error('Insufficient coin balance');
      }

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          coinBalance: {
            decrement: amount,
          },
        },
      });

      await tx.coinTransaction.create({
        data: {
          id: uuidv4(),
          user_ref: userId,
          type: transactionType,
          amount: amount,
          target_ref: targetRef,
          timestamp: new Date(),
        },
      });

      return {
        newBalance: Number(updatedUser.coinBalance),
        transaction: { type: transactionType, amount: Number(amount) },
      };
    });
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(userId: string, limit: number = 50, offset: number = 0) {
    const transactions = await prisma.coinTransaction.findMany({
      where: { user_ref: userId },
      orderBy: { timestamp: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.coinTransaction.count({
      where: { user_ref: userId },
    });

    return {
      transactions: transactions.map((t) => ({
        id: t.id,
        type: t.type,
        amount: Number(t.amount),
        timestamp: t.timestamp,
        targetRef: t.target_ref,
      })),
      total,
      limit,
      offset,
    };
  }

  /**
   * Apply bonus coins (for subscriptions, rewards, etc.)
   */
  async applyBonus(userId: string, amount: number, reason: string) {
    return this.addCoins(userId, BigInt(amount), 'bonus', reason);
  }
}

export default new CoinService();