package org.glayson.inout.product;

import org.glayson.inout.domain.product.Product;
import org.glayson.inout.domain.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetProductController {
  @Autowired
  private ProductRepository productRepository;

  @GetMapping("/products")
  public ResponseEntity<Product> getProduct() {
    return ResponseEntity.ok(this.productRepository.get());
  }
}
