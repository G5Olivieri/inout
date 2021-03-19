interface SummaryFilter {
  month?: number
  year: number
  day?: number
}

interface ExpensesSummaryResponse {
  value: string
}

class HttpResponse {
  public getData(): any {
    return { value: '100' }
  }
}

interface HttpRequestOptions {
  queryParams: Record<string, string | number | undefined | null>
}

export class HttpClient {
  public async get(
    url: string,
    options: HttpRequestOptions
  ): Promise<HttpResponse> {
    console.log(url, options)
    return new HttpResponse()
  }
}

interface EventPublisher {
  // eslint-disable-next-line @typescript-eslint/ban-types
  publish(event: object): void
}

class DomainEvents implements EventPublisher {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly listeners = new Map<Function, unknown>()
  // eslint-disable-next-line @typescript-eslint/ban-types
  public publish(event: object): void {
    this.listeners.get(event.constructor)
  }
}

class Summary {
  public constructor(public readonly value: string) {}
}

export class GetExpensesSummaryCommand {
  public constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly httpClient: HttpClient
  ) {}

  public async execute({ month, year, day }: SummaryFilter): Promise<void> {
    const response = await this.httpClient.get('/expenses/summary', {
      queryParams: {
        month,
        year,
        day,
      },
    })
    const expensesSummary = response.getData() as ExpensesSummaryResponse
    this.eventPublisher.publish(
      new ExpensesSummaryFetchedEvent(this.mapResponseToDomain(expensesSummary))
    )
  }

  private mapResponseToDomain(response: ExpensesSummaryResponse): Summary {
    return new Summary(response.value)
  }
}
