export class Product {
  public constructor(
    public readonly name: string,
    public readonly amount: number,
    public readonly quantity: number,
  ) {}
}

export class Sale {
  public constructor(
    public readonly products: Array<Product>,
  ) {}

  public get total() {
    return this.products.reduce((acc, cur) => acc + cur.amount, 0)
  }
}
