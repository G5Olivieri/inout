import { StatusCodes } from "http-status-codes"

export class HttpResponse {
  public constructor(
    public readonly statusCode: StatusCodes,
    private readonly data: any,
  ) { }

  public getData<T>(): T {
    return this.data as T
  }

  public throwError(): never {
    throw new Error("HttpResponse Error");
  }
}
