package org.glayson.inout.product;

import org.glayson.inout.domain.product.Product;
import org.glayson.inout.domain.product.ProductRepository;
import org.springframework.stereotype.Component;

@Component
public class InMemoryProductRepository implements ProductRepository {
  private Product product;

  @Override
  public void save(Product product) {
    this.product = product;
  }

  @Override
  public Product get() {
    return this.product;
  }
}
