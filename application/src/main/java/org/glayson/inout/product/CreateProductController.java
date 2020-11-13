package org.glayson.inout.product;

import org.glayson.inout.domain.product.CreateProductCommand;
import org.glayson.inout.domain.product.Product;
import org.glayson.inout.domain.product.ProductCreatedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CreateProductController {
  private ResponseEntity<Product> response;
  private final CreateProductCommand command;

  @Autowired
  public CreateProductController(CreateProductCommand command) {
    this.command = command;
  }

  @PostMapping("/products")
  public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest request) {
    this.command.execute(new Product(0, request.getName()));
    return this.response;
  }

  @EventListener
  public void listener(ProductCreatedEvent event) {
    this.response = ResponseEntity.ok(event.getProduct());
  }
}
