import { EventPublisher } from '@app/domain/events/event-publisher'

interface SummaryFilter {
  month?: number
  year: number
  day?: number
}

export class TransactionSummary {
  public constructor(public readonly value: string) {}
}

export class ExpensesSummaryFetchedEvent {
  public constructor(public readonly summary: TransactionSummary) {}
}

export class GetExpensesSummaryCommand {
  public constructor(private readonly eventPublisher: EventPublisher) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute(_filter: SummaryFilter): Promise<void> {
    setTimeout(() => {
      this.eventPublisher.publish(
        new ExpensesSummaryFetchedEvent(new TransactionSummary('100'))
      )
    }, 500)
  }
}
