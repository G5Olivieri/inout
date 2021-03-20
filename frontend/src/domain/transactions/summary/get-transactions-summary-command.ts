import { EventPublisher } from '@app/domain/events/event-publisher'
import { TransactionsSummaryFilter } from '@app/domain/transactions/summary/transactions-summary-filter'
import { TransactionsSummaryFetchedEvent } from '@app/domain/transactions/summary/transactions-summary-fetched-event'

export class GetTransactionsSummaryCommand {
  public constructor(private readonly eventPublisher: EventPublisher) {}

  public async execute(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { year, month = 0, day = 0 }: TransactionsSummaryFilter
  ): Promise<void> {
    const value = (year - 2000) * month - day
    setTimeout(() => {
      this.eventPublisher.publish(
        new TransactionsSummaryFetchedEvent({
          expenses: {
            value: value,
          },
          revenues: {
            value: value / 2,
          },
        })
      )
    }, 500)
  }
}
