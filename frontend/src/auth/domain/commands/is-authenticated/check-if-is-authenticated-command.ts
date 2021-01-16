import { EventPublisher } from "@app/events/domain/event-publisher";
import { TokenRepository } from "@app/auth/domain/repositories/token-repository";
import { IsAuthenticatedEvent } from "@app/auth/domain/commands/is-authenticated/is-authenticated-event";
import { IsNotAuthenticatedEvent } from "@app/auth/domain/commands/is-authenticated/is-not-authenticated-event";

export class CheckIfIsAuthenticatedCommand {
  public constructor(
    private readonly publisher: EventPublisher,
    private readonly tokenRepository: TokenRepository,
  ) { }

  public async execute(): Promise<void> {
    const tokenOption = await this.tokenRepository.getToken()
    if (tokenOption.isDefined) {
      // TODO: validate token
      await this.publisher.publish(new IsAuthenticatedEvent(tokenOption.get()))
      return
    }

    await this.publisher.publish(new IsNotAuthenticatedEvent())
  }
}
