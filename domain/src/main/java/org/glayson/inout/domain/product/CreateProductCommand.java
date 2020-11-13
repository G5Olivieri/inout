package org.glayson.inout.domain.product;

import org.glayson.inout.domain.event.EventPublisher;

import java.util.Objects;

public final class CreateProductCommand {
  private final ProductRepository productRepository;
  private final EventPublisher publisher;

  public CreateProductCommand(EventPublisher publisher, ProductRepository productRepository) {
    this.productRepository = Objects.requireNonNull(productRepository);
    this.publisher = Objects.requireNonNull(publisher);
  }

  public void execute(Product product) {
    this.productRepository.save(product);
    this.publisher.publish(new ProductCreatedEvent(this, product));
  }
}
