package org.glayson.inout;

import org.glayson.inout.domain.event.EventPublisher;
import org.glayson.inout.domain.product.CreateProductCommand;
import org.glayson.inout.domain.product.ProductRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {
  @Bean
  public CreateProductCommand createProductCommand(EventPublisher publisher,
                                                   ProductRepository repository) {
    return new CreateProductCommand(publisher, repository);
  }
}
