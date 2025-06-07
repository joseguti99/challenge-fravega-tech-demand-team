import { render, screen } from '@testing-library/react'
import ListOfUsers from './index'
import { User } from "@/src/interfaces/users"
import { CardProps } from '../Card'

// Mock del componente Card
jest.mock('../Card', () => {
  return function Card({ user, markAsFavorite, isFavorited }: CardProps) {
    return (
      <div data-testid={`card-${user.id}`}>
        <span>{user.login}</span>
        <button onClick={() => markAsFavorite(user)}>
          {isFavorited ? 'Favorito' : 'Marcar'}
        </button>
      </div>
    )
  }
})

describe('ListOfUsers', () => {
  const mockUsers: User[] = [
    {
        id: 1, login: 'user1', avatar_url: 'avatar1.jpg',
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
    },
    {
        id: 2, login: 'user2', avatar_url: 'avatar2.jpg',
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
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza la lista de usuarios', () => {
    render(<ListOfUsers users={mockUsers} />)
    
    expect(screen.getByText('user1')).toBeTruthy()
    expect(screen.getByText('user2')).toBeTruthy()
  })
})