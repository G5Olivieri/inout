package org.glayson.inout.common;

import org.glayson.inout.domain.event.Event;
import org.glayson.inout.domain.event.EventPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class SpringEventPublisher implements EventPublisher {
  private ApplicationEventPublisher applicationEventPublisher;

  @Autowired
  public SpringEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
    this.applicationEventPublisher = applicationEventPublisher;
  }

  @Override
  public <T extends Event> void publish(T event) {
    this.applicationEventPublisher.publishEvent(event);
  }
}
