import { Option } from "monapt";
import { StatusCodes } from "http-status-codes";

import { AuthenticateFailureEvent } from "@app/auth/domain/commands/authenticate/authenticate-failure-event";
import { AuthenticateFailureResponse } from "@app/auth/domain/commands/authenticate/authenticate-failure-response";
import { AuthenticateSuccessEvent } from "@app/auth/domain/commands/authenticate/authenticate-success-event";
import { AuthenticateSuccessResponse } from "@app/auth/domain/commands/authenticate/authenticate-success-response";
import { EventPublisher } from "@app/events/domain/event-publisher";
import { HttpClient } from "@app/http/domain/http-client";
import { HttpResponse } from "@app/http/domain/http-response";
import { Credential } from "@app/auth/domain/credential";

type HttpResponseHandler = (response: HttpResponse) => void

export class AuthenticateCommand {
  private readonly handlers: Record<number, HttpResponseHandler> = {
    [StatusCodes.OK]: (response: HttpResponse) => this.processSuccess(response.getData<AuthenticateSuccessResponse>()),
    [StatusCodes.BAD_REQUEST]: (response: HttpResponse) => this.processFailure(response.getData<AuthenticateFailureResponse>()),
  }

  public constructor(
    private readonly publisher: EventPublisher,
    private readonly httpClient: HttpClient,
  ) { }

  public async execute(credential: Credential): Promise<void> {
    const response = await this.httpClient.post("/auth", credential)
    const handler = this.getResponseHandler(response.statusCode)
    await handler(response);
  }

  private getResponseHandler(statusCode: number): HttpResponseHandler {
    return Option(this.handlers[statusCode])
      .getOrElse(() => this.processError)
  }

  private async processSuccess(response: AuthenticateSuccessResponse): Promise<void> {
    await this.publisher.publish(new AuthenticateSuccessEvent(response.token))
  }

  private async processFailure(response: AuthenticateFailureResponse): Promise<void> {
    await this.publisher.publish(new AuthenticateFailureEvent(response.error))
  }

  private processError(response: HttpResponse): never {
    response.throwError()
  }
}
