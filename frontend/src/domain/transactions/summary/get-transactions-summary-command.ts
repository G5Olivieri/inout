import { EventPublisher } from '@app/domain/events/event-publisher'
import { TransactionsSummaryFilter } from '@app/domain/transactions/summary/transactions-summary-filter'
import { TransactionsSummaryFetchedEvent } from '@app/domain/transactions/summary/transactions-summary-fetched-event'

export class GetTransactionsSummaryCommand {
  public constructor(private readonly eventPublisher: EventPublisher) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(_filter: TransactionsSummaryFilter): Promise<void> {
    setTimeout(() => {
      this.eventPublisher.publish(
        new TransactionsSummaryFetchedEvent({
          expenses: {
            value: 100,
          },
          revenues: {
            value: 110,
          },
        })
      )
    }, 500)
  }
}
