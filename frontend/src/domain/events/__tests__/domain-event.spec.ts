import { DomainEvents } from '@app/domain/events/domain-events'

class TestEvent {
  public constructor(public readonly value: number) {}
}

class Test2Event {}

describe('DomainEvents', () => {
  test('should publish and subscriber event', async () => {
    const domainEvents = new DomainEvents()
    const callback = jest.fn()
    domainEvents.on(TestEvent, callback)
    await domainEvents.publish(new TestEvent(10))
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(new TestEvent(10))
  })

  test('should publish and subscriber event two times', async () => {
    const domainEvents = new DomainEvents()
    const callback = jest.fn()
    domainEvents.on(TestEvent, callback)
    domainEvents.on(TestEvent, callback)
    await domainEvents.publish(new TestEvent(10))
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(new TestEvent(10))
  })

  test('should publish and subscriber event with async function', async () => {
    const domainEvents = new DomainEvents()
    const firstFn = jest.fn(() => Promise.resolve(10))
    const secondFn = jest.fn(() => Promise.resolve(20))
    const callback = jest.fn(async () => {
      const result = await firstFn()
      const result2 = await secondFn()
      expect(result).toEqual(10)
      expect(result2).toEqual(20)
    })
    domainEvents.on(TestEvent, callback)
    domainEvents.on(TestEvent, callback)
    await domainEvents.publish(new TestEvent(10))
    expect(callback).toHaveBeenCalledTimes(2)
    expect(firstFn).toHaveBeenCalledTimes(2)
    expect(secondFn).toHaveBeenCalledTimes(2)
  })

  test('should publish with nonexistent subscriber', async () => {
    const domainEvents = new DomainEvents()
    await domainEvents.publish(new TestEvent(10))
    expect(true).toBeTruthy()
  })

  // eslint-disable-next-line max-len
  test('should not call subscriber when publish other event', async () => {
    const domainEvents = new DomainEvents()
    const callback = jest.fn()
    domainEvents.on(Test2Event, callback)
    await domainEvents.publish(new TestEvent(10))
    expect(callback).not.toHaveBeenCalled()
  })
})
