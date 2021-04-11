export interface Command {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(...args: any[]): Promise<void>
}
