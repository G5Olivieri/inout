import faker from 'faker'
import _ from 'lodash'
import { Transaction } from '@app/components/transactions/transaction'

export const createTransaction = (): Transaction => ({
  value: faker.random.number(10000),
  description: faker.lorem.sentence(6),
  date: faker.date.recent(),
})

export const createTransactions = (
  size = faker.random.number(10)
): Array<Transaction> => {
  return _.times<Transaction>(size, createTransaction)
}
