import { render, screen, fireEvent } from '@testing-library/react'
import Header, { HeaderProps } from './index'
import { CACHE_KEY_FAVORITES } from '@/src/cache/favorites'

// Mock de Next.js router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock del componente SearchBar
jest.mock('../SearchBar', () => {
  return function SearchBar({ value, onChange, onSubmit }: HeaderProps) {
    return (
      <div data-testid="search-bar">
        <input 
          value={value} 
          onChange={onChange}
          data-testid="search-input"
        />
        <button onClick={onSubmit} data-testid="search-button">
          Buscar
        </button>
      </div>
    )
  }
})

// Mock del componente Image de Next.js
interface FakeImageProps {
  src: string;
  alt: string;
  className: string;
  priority: number;
}

jest.mock('next/image', () => {
  return function Image({ src, alt, className, priority }: FakeImageProps) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className}
        data-priority={priority}
        data-testid="logo-image"
      />
    )
  }
})


describe('Header', () => {
  const mockProps = {
    value: 'test search',
    onChange: jest.fn(),
    onSubmit: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock del addEventListener y removeEventListener
    Object.defineProperty(window, 'addEventListener', {
      value: jest.fn(),
      writable: true,
    })
    Object.defineProperty(window, 'removeEventListener', {
      value: jest.fn(),
      writable: true,
    })
  })

  it('renderiza correctamente todos los elementos', () => {
    render(<Header {...mockProps} />)

    // Verifica que se renderice el logo
    const logo = screen.getByTestId('logo-image')
    expect(logo).toBeTruthy()
    expect(logo.getAttribute('alt')).toBe('logo')

    // Verifica que se renderice el SearchBar
    expect(screen.getByTestId('search-bar')).toBeTruthy()

    // Verifica que se renderice el botón de favoritos
    expect(screen.getByText(/Favoritos \(0\)/)).toBeTruthy()
  })

  it('pasa las props correctas al SearchBar', () => {
    render(<Header {...mockProps} />)

    const searchInput = screen.getByTestId('search-input')
    expect(searchInput.getAttribute('value')).toBe('test search')

    const searchButton = screen.getByTestId('search-button')
    fireEvent.click(searchButton)
    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1)
  })

  it('se suscribe y desuscribe del evento de favoritos', () => {
    const { unmount } = render(<Header {...mockProps} />)

    // Verifica que se agregue el event listener
    expect(window.addEventListener).toHaveBeenCalledWith(
      CACHE_KEY_FAVORITES,
      expect.any(Function)
    )

    // Desmontar el componente
    unmount()

    // Verifica que se remueva el event listener
    expect(window.removeEventListener).toHaveBeenCalledWith(
      CACHE_KEY_FAVORITES,
      expect.any(Function)
    )
  })

  it('tiene la estructura CSS correcta', () => {
    render(<Header {...mockProps} />)

    const header = screen.getByRole('banner')
    expect(header.className).toContain('header-container')

    const headerContent = header.querySelector('.header-content')
    expect(headerContent).toBeTruthy()

    const leftSection = header.querySelector('.section-left')
    const centerSection = header.querySelector('.section-center')
    const rightSection = header.querySelector('.section-right')

    expect(leftSection).toBeTruthy()
    expect(centerSection).toBeTruthy()
    expect(rightSection).toBeTruthy()
  })
})