export class IsAuthenticatedEvent {
  public constructor(public readonly token: string) { }
}
