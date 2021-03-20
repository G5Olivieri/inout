import React from 'react'
import { DomainEvents } from '@app/domain/events/domain-events'
import { EventSubscriber } from '@app/domain/events/event-subscriber'
import { useState } from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { act } from 'react-dom/test-utils'

class TestEvent {
  public constructor(public readonly value: number) {}
}

interface TestElementProps {
  eventSubscriber: EventSubscriber
}

const TestElement: React.FC<TestElementProps> = ({ eventSubscriber }) => {
  const [value, setValue] = useState(0)
  eventSubscriber.on(TestEvent, (event) => setValue(event.value))
  return <div data-testid="test-element">{value}</div>
}

describe('DomainEvent with React', () => {
  test('should be 0 when event is not publish', async () => {
    const domainEvents = new DomainEvents()
    const result = render(<TestElement eventSubscriber={domainEvents} />)
    expect(result.getByTestId('test-element')).toHaveTextContent('0')
  })

  test('should be event value when event is publish', async () => {
    const domainEvents = new DomainEvents()
    const result = render(<TestElement eventSubscriber={domainEvents} />)
    act(() => {
      domainEvents.publish(new TestEvent(10))
    })
    expect(result.getByTestId('test-element')).toHaveTextContent('10')
  })
})
