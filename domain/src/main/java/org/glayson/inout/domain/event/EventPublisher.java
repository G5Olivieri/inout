package org.glayson.inout.domain.event;

public interface EventPublisher {
  <T extends Event> void publish(T event);
}
