import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Alert from './index.jsx'

describe('Alert', () => {
  const message = 'Este es un mensaje de alerta'
  const onClose = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('no se renderiza si isVisible es false', () => {
    const { container } = render(
      <Alert message={message} isVisible={false} onClose={onClose} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('muestra el mensaje si isVisible es true', () => {
    render(<Alert message={message} isVisible={true} onClose={onClose} />)
    expect(screen.getByText(message)).toBeTruthy()
  })

  it('llama a onClose después de 3 segundos', async () => {
    render(<Alert message={message} isVisible={true} onClose={onClose} />)
    expect(onClose).not.toHaveBeenCalled()

    jest.advanceTimersByTime(3000)

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  it('se puede cerrar manualmente haciendo clic en el botón ×', () => {
    render(<Alert message={message} isVisible={true} onClose={onClose} />)
    fireEvent.click(screen.getByText('×'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
