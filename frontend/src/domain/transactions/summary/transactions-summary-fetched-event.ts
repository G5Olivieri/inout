import { TransactionsSummary } from '@app/domain/transactions/summary/transactions-summary'

export class TransactionsSummaryFetchedEvent {
  public constructor(public readonly summary: TransactionsSummary) {}
}
