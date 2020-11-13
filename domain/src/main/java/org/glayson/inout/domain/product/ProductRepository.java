package org.glayson.inout.domain.product;

public interface ProductRepository {
  void save(Product product);
  Product get();
}
