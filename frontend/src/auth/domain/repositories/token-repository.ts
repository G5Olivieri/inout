import { Option } from "monapt";

export interface TokenRepository {
  getToken(): Promise<Option<string>>
}
