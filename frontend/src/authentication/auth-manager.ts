import { TokenRepository } from "./token-repository"
import { Credential } from "./credential"

type OnChangeCallback = () => Promise<void>

export class AuthManager {
  private subscribers: OnChangeCallback[] = [];

  public constructor(private tokenRepository: TokenRepository) { }

  public async isAuthenticated(): Promise<boolean> {
    return (await this.tokenRepository.getToken()).isDefined
  }

  public subscribe(callback: OnChangeCallback): void {
    this.subscribers.push(callback);
  }

  public async authenticate(credential: Credential): Promise<void> {
    if(credential.username === "glayson" && credential.password === "olivieri!@12") {
      await this.tokenRepository.save("token")
    }
    await this.notify()
  }

  public async logout(): Promise<void> {
    await this.tokenRepository.clearToken()
    await this.notify()
  }

  private async notify(): Promise<void> {
    const wrapperFn = (fn: Function) => fn()
    await Promise.all(this.subscribers.map(wrapperFn))
  }
}
