import { Pagination } from '@app/common/pagination'
import { Product } from '@app/products/domain/product'

export class GetAllProductsItemResponse {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly tags: string[]
  ) {}

  private static fromProduct(product: Product): GetAllProductsItemResponse {
    return new GetAllProductsItemResponse(
      product.id.toString(),
      product.name,
      Array.from(product.tags)
    )
  }

  public static fromPaginatedProducts(
    pagination: Pagination<Product>
  ): Pagination<GetAllProductsItemResponse> {
    return pagination.map((product) =>
      GetAllProductsItemResponse.fromProduct(product)
    )
  }
}
