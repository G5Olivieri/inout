import { DomainEvents } from '@app/domain/events/domain-events'

class TestEvent {
  public constructor(public readonly value: number) {}
}

class Test2Event {}

describe('DomainEvents', () => {
  test('should publish and subscriber event', () => {
    const domainEvents = new DomainEvents()
    const callback = jest.fn()
    domainEvents.on(TestEvent, callback)
    domainEvents.publish(new TestEvent(10))
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(new TestEvent(10))
  })

  test('should cancel subscription event', () => {
    const domainEvents = new DomainEvents()
    const callback = jest.fn()
    const cancelable = domainEvents.on(TestEvent, callback)
    setTimeout(() => domainEvents.publish(new TestEvent(10)), 100)
    cancelable.cancel()
    expect(callback).not.toHaveBeenCalled()
  })

  test('should publish and subscriber event two times', () => {
    const domainEvents = new DomainEvents()
    const callback = jest.fn()
    domainEvents.on(TestEvent, callback)
    domainEvents.on(TestEvent, callback)
    domainEvents.publish(new TestEvent(10))
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(new TestEvent(10))
  })

  test('should publish with nonexistent subscriber', () => {
    const domainEvents = new DomainEvents()
    domainEvents.publish(new TestEvent(10))
    expect(true).toBeTruthy()
  })

  // eslint-disable-next-line max-len
  test('should not call subscriber when publish other event', () => {
    const domainEvents = new DomainEvents()
    const callback = jest.fn()
    domainEvents.on(Test2Event, callback)
    domainEvents.publish(new TestEvent(10))
    expect(callback).not.toHaveBeenCalled()
  })
})
