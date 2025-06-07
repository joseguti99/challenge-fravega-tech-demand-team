import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ButtonFav from './index'

jest.mock('../Icons/favoriteIcon', () => {
  return function FavoriteIcon({ active }: { active: boolean }) {
    return <span data-testid="favorite-icon" data-active={active}>
      {active ? '★' : '☆'}
    </span>
  }
})

describe('ButtonFav', () => {
  const mockToggleFavorite = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza el botón correctamente', () => {
    render(<ButtonFav isFavorite={false} toggleFavorite={mockToggleFavorite} />)
    const button = screen.getByRole('button')
    expect(button).toBeTruthy()
  })

  it('muestra el título correcto cuando no está marcado como favorito', async () => {
    render(<ButtonFav isFavorite={false} toggleFavorite={mockToggleFavorite} />)
    
    // Esperar a que se complete la hidratación
    await waitFor(() => {
      const button = screen.getByRole('button')
      expect(button.getAttribute('title')).toBe('Añadir a favoritos')
    })
  })

  it('muestra el título correcto cuando está marcado como favorito', async () => {
    render(<ButtonFav isFavorite={true} toggleFavorite={mockToggleFavorite} />)
    
    // Esperar a que se complete la hidratación
    await waitFor(() => {
      const button = screen.getByRole('button')
      expect(button.getAttribute('title')).toBe('Quitar de favoritos')
    })
  })

  it('pasa la prop active correcta al FavoriteIcon después de la hidratación', async () => {
    render(<ButtonFav isFavorite={true} toggleFavorite={mockToggleFavorite} />)
    
    // Antes de la hidratación, debería ser true
    const icon = screen.getByTestId('favorite-icon')
    expect(icon.getAttribute('data-active')).toBe('true')
    
    await waitFor(() => {
      expect(icon.getAttribute('data-active')).toBe('true')
    })
  })

  it('inicia con isFavorite como false antes de la hidratación', () => {
    render(<ButtonFav isFavorite={true} toggleFavorite={mockToggleFavorite} />)
    
    // Inmediatamente después del render, antes de la hidratación
    const icon = screen.getByTestId('favorite-icon')
    expect(icon.getAttribute('data-active')).toBe('true')
  })

  it('llama a toggleFavorite cuando se hace clic', () => {
    render(<ButtonFav isFavorite={false} toggleFavorite={mockToggleFavorite} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1)
  })

  it('llama a toggleFavorite múltiples veces cuando se hace clic varias veces', () => {
    render(<ButtonFav isFavorite={false} toggleFavorite={mockToggleFavorite} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    
    expect(mockToggleFavorite).toHaveBeenCalledTimes(3)
  })

  it('mantiene el estado de hidratación después del primer render', async () => {
    const { rerender } = render(<ButtonFav isFavorite={false} toggleFavorite={mockToggleFavorite} />)
    
    // Esperar hidratación inicial
    await waitFor(() => {
      const icon = screen.getByTestId('favorite-icon')
      expect(icon.getAttribute('data-active')).toBe('false')
    })
    
    // Re-render con isFavorite=true
    rerender(<ButtonFav isFavorite={true} toggleFavorite={mockToggleFavorite} />)
    
    // Debería mostrar inmediatamente el estado correcto (hidratado)
    const icon = screen.getByTestId('favorite-icon')
    expect(icon.getAttribute('data-active')).toBe('true')
  })
})