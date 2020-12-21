package org.glayson.inout;

import org.glayson.inout.domain.event.EventPublisher;
import org.glayson.inout.domain.product.CreateProductCommand;
import org.glayson.inout.domain.product.ProductRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.FixedLocaleResolver;

import java.util.Locale;

@Configuration
public class AppConfiguration {
  @Bean
  public CreateProductCommand createProductCommand(EventPublisher publisher,
                                                   ProductRepository repository) {
    return new CreateProductCommand(publisher, repository);
  }

  @Bean
  @Description("Thymeleaf Locale Resolver")
  public LocaleResolver localeResolver() {
    Locale locale = new Locale("pt", "BR");
    FixedLocaleResolver resolver = new FixedLocaleResolver(locale);
    resolver.setDefaultLocale(locale);
    return resolver;
  }
}
