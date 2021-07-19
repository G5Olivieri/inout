import { Transaction } from "./transation";

export class Summary {
  public constructor(
    public readonly day: string,
    public readonly total: number,
    public readonly transactions: Array<Transaction>,
  ) {}
}
