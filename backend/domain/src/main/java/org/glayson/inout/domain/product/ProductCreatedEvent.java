package org.glayson.inout.domain.product;

import org.glayson.inout.domain.event.Event;

import java.util.Objects;

public final class ProductCreatedEvent extends Event {
  private final Product product;

  public ProductCreatedEvent(Object source, Product product) {
    super(source);
    this.product = Objects.requireNonNull(product);
  }

  public Product getProduct() {
    return product;
  }
}
