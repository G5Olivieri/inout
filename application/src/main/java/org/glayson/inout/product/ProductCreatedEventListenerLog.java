package org.glayson.inout.product;

import org.glayson.inout.domain.product.ProductCreatedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class ProductCreatedEventListenerLog {
  private static Logger logger = Logger.getLogger(ProductCreatedEventListenerLog.class.getName());

  @EventListener
  public void handle(ProductCreatedEvent event) {
    logger.info("EVENTO CAPTURADO: " + event.toString());
  }
}
