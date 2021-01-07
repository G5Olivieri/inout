import { Option } from "monapt"

export class TokenRepository {
  private static TOKEN_KEY = "application_token"

  public constructor(private readonly storage: Storage) {}

  async save(token: string): Promise<void> {
    this.storage.setItem(TokenRepository.TOKEN_KEY, token)
  }

  async getToken(): Promise<Option<string>> {
    return Option(this.storage.getItem(TokenRepository.TOKEN_KEY))
  }

  async clearToken(): Promise<void> {
    this.storage.removeItem(TokenRepository.TOKEN_KEY)
  }
}
