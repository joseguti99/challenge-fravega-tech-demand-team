import { render, screen, fireEvent } from '@testing-library/react'
import Card from './index'
import { User } from "@/src/interfaces/users"

// Mock de Next.js router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock del componente ButtonFav
jest.mock('../ButtonFav', () => {
  return function ButtonFav({ isFavorite, toggleFavorite }: { isFavorite: boolean; toggleFavorite: () => void }) {
    return (
      <button 
        data-testid="button-fav" 
        onClick={toggleFavorite}
        data-is-favorite={isFavorite}
      >
        {isFavorite ? 'Favorito' : 'No Favorito'}
      </button>
    )
  }
})

// Mock del componente Image de Next.js
jest.mock('next/image', () => {
  return function Image({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
    return (
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        data-testid="user-image"
      />
    )
  }
})

describe('Card', () => {
  const mockUser: User = {
      login: 'testuser',
      avatar_url: 'https://github.com/avatar.jpg',
      id: 123,
      node_id: '',
      gravatar_id: '',
      url: '',
      html_url: '',
      followers_url: '',
      following_url: '',
      gists_url: '',
      starred_url: '',
      subscriptions_url: '',
      organizations_url: '',
      repos_url: '',
      events_url: '',
      received_events_url: '',
      type: '',
      user_view_type: '',
      site_admin: false,
      score: 0
  }

  const mockMarkAsFavorite = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza correctamente la información del usuario', () => {
    render(
      <Card 
        user={mockUser} 
        markAsFavorite={mockMarkAsFavorite} 
        isFavorited={false} 
      />
    )

    // Verifica que se muestre el nombre en mayúsculas
    expect(screen.getByText('TESTUSER')).toBeTruthy()
    
    // Verifica que se muestre la imagen con los atributos correctos
    const image = screen.getByTestId('user-image')
    expect(image.getAttribute('src')).toBe('https://github.com/avatar.jpg')
    expect(image.getAttribute('alt')).toBe('testuser')
    expect(image.getAttribute('width')).toBe('420')
    expect(image.getAttribute('height')).toBe('420')
  })

  it('muestra el botón "Ver Perfil"', () => {
    render(
      <Card 
        user={mockUser} 
        markAsFavorite={mockMarkAsFavorite} 
        isFavorited={false} 
      />
    )

    const viewProfileButton = screen.getByText('Ver Perfil')
    expect(viewProfileButton).toBeTruthy()
    expect(viewProfileButton.className).toContain('btn-view-details')
  })

  it('navega al perfil del usuario cuando se hace clic en "Ver Perfil"', () => {
    render(
      <Card 
        user={mockUser} 
        markAsFavorite={mockMarkAsFavorite} 
        isFavorited={false} 
      />
    )

    const viewProfileButton = screen.getByText('Ver Perfil')
    fireEvent.click(viewProfileButton)

    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith('/users/testuser')
  })

  it('pasa las props correctas al ButtonFav cuando no está marcado como favorito', () => {
    render(
      <Card 
        user={mockUser} 
        markAsFavorite={mockMarkAsFavorite} 
        isFavorited={false} 
      />
    )

    const buttonFav = screen.getByTestId('button-fav')
    expect(buttonFav.getAttribute('data-is-favorite')).toBe('false')
    expect(buttonFav.textContent).toBe('No Favorito')
  })

  it('pasa las props correctas al ButtonFav cuando está marcado como favorito', () => {
    render(
      <Card 
        user={mockUser} 
        markAsFavorite={mockMarkAsFavorite} 
        isFavorited={true} 
      />
    )

    const buttonFav = screen.getByTestId('button-fav')
    expect(buttonFav.getAttribute('data-is-favorite')).toBe('true')
    expect(buttonFav.textContent).toBe('Favorito')
  })

  it('llama a markAsFavorite con el usuario correcto cuando se hace clic en ButtonFav', () => {
    render(
      <Card 
        user={mockUser} 
        markAsFavorite={mockMarkAsFavorite} 
        isFavorited={false} 
      />
    )

    const buttonFav = screen.getByTestId('button-fav')
    fireEvent.click(buttonFav)

    expect(mockMarkAsFavorite).toHaveBeenCalledTimes(1)
    expect(mockMarkAsFavorite).toHaveBeenCalledWith(mockUser)
  })

  it('renderiza la estructura correcta del card', () => {
    render(
      <Card 
        user={mockUser} 
        markAsFavorite={mockMarkAsFavorite} 
        isFavorited={false} 
      />
    )

    // Verifica que existe el contenedor principal
    const cardContainer = screen.getByText('TESTUSER').closest('.card')
    expect(cardContainer).toBeTruthy()

    // Verifica que existe el header
    const cardHeader = cardContainer?.querySelector('.card-header')
    expect(cardHeader).toBeTruthy()

    // Verifica que existe el nombre con la clase correcta
    const cardName = screen.getByText('TESTUSER')
    expect(cardName.className).toContain('card-name')
  })

  it('convierte el nombre del usuario a mayúsculas', () => {
    const userWithLowerCase: User = {
      ...mockUser,
      login: 'lowercaseuser'
    }

    render(
      <Card 
        user={userWithLowerCase} 
        markAsFavorite={mockMarkAsFavorite} 
        isFavorited={false} 
      />
    )

    expect(screen.getByText('LOWERCASEUSER')).toBeTruthy()
    expect(screen.queryByText('lowercaseuser')).not.toBeTruthy()
  })

  it('maneja diferentes usuarios correctamente', () => {
    const anotherUser: User = {
        login: 'anotheruser',
        avatar_url: 'https://github.com/another-avatar.jpg',
        id: 456,
        node_id: '',
        gravatar_id: '',
        url: '',
        html_url: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: '',
        user_view_type: '',
        site_admin: false,
        score: 0
    }

    render(
      <Card 
        user={anotherUser} 
        markAsFavorite={mockMarkAsFavorite} 
        isFavorited={true} 
      />
    )

    // Verifica el nombre
    expect(screen.getByText('ANOTHERUSER')).toBeTruthy()
    
    // Verifica la imagen
    const image = screen.getByTestId('user-image')
    expect(image.getAttribute('src')).toBe('https://github.com/another-avatar.jpg')
    expect(image.getAttribute('alt')).toBe('anotheruser')
    
    // Verifica la navegación
    const viewProfileButton = screen.getByText('Ver Perfil')
    fireEvent.click(viewProfileButton)
    expect(mockPush).toHaveBeenCalledWith('/users/anotheruser')
  })
})