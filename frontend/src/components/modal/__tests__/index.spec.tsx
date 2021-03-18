import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from '@app/components/modal/index'
import '@testing-library/jest-dom/extend-expect'

describe('Component - Modal', () => {
  test('should show element when isOpen is true', async () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {
          /* empty */
        }}
      >
        <h1>oi</h1>
      </Modal>
    )

    expect(screen.getByRole('heading')).toHaveTextContent('oi')
    expect(screen.getByRole('button')).toHaveTextContent('X')
  })

  test('should doest not show element when isOpen is false', async () => {
    render(
      <Modal
        isOpen={false}
        onClose={() => {
          /* empty */
        }}
      >
        <h1>oi</h1>
      </Modal>
    )

    expect(screen.queryByRole('heading')).toBeNull()
    expect(screen.queryByRole('button')).toBeNull()
  })

  test('should call onClose element when button is clicked', async () => {
    let wasCalled = false
    const onClose = (): void => {
      wasCalled = true
    }

    const { rerender } = render(
      <Modal isOpen={true} onClose={onClose}>
        <h1>oi</h1>
      </Modal>
    )

    expect(screen.getByRole('heading')).toHaveTextContent('oi')
    expect(screen.getByRole('button')).toHaveTextContent('X')

    fireEvent.click(screen.getByRole('button'))
    expect(wasCalled).toBeTruthy()

    rerender(
      <Modal isOpen={false} onClose={onClose}>
        <h1>oi</h1>
      </Modal>
    )

    expect(screen.queryByRole('heading')).toBeNull()
    expect(screen.queryByRole('button')).toBeNull()
  })
})
