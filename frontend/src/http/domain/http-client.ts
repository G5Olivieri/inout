import { HttpResponse } from "@app/http/domain/http-response";

export interface HttpClient {
  post(url: string, data: any): Promise<HttpResponse>
}
