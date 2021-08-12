export enum TransactionType {
  OUT = 'out',
  IN = 'in'
}

export class Transaction {
  public constructor(
    public readonly type: TransactionType,
    public readonly amount: number,
    public readonly productName: string,
    public readonly quantity: number,
  ) {}
}
