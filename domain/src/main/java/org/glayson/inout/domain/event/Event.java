package org.glayson.inout.domain.event;

import java.util.Objects;

public abstract class Event {
  private final Object source;

  protected Event(Object source) {
    this.source = Objects.requireNonNull(source);
  }

  public Object getSource() {
    return source;
  }
}
