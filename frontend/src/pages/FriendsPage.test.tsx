import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import FriendsPage from './FriendsPage'

describe('FriendsPage', () => {
  it('deve renderizar a página de amigos corretamente', () => {
    render(<FriendsPage />)
    
    expect(screen.getByAltText(/food boxd/i)).toBeInTheDocument()
  })

  it('deve exibir atividades dos amigos', () => {
    render(<FriendsPage />)
    
    expect(screen.getAllByText(/ana/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/helo/i).length).toBeGreaterThan(0)
  })

  it('deve exibir diferentes tipos de atividades', () => {
    render(<FriendsPage />)
    
    expect(screen.getByText(/curtiu a avaliação/i)).toBeInTheDocument()
    expect(screen.getByText(/visitou o restaurante/i)).toBeInTheDocument()
    expect(screen.getByText(/experimentou:/i)).toBeInTheDocument()
  })

  it('deve exibir avatares dos usuários', () => {
    render(<FriendsPage />)
    
    const avatars = screen.getAllByRole('img').filter(img => 
      img.getAttribute('alt') !== 'Food Boxd'
    )
    expect(avatars.length).toBeGreaterThan(0)
  })

  it('deve exibir tempo das atividades', () => {
    render(<FriendsPage />)
    
    expect(screen.getAllByText(/3d/i).length).toBeGreaterThan(0)
  })

  it('deve exibir avaliações com estrelas', () => {
    const { container } = render(<FriendsPage />)
    
    const stars = container.querySelectorAll('svg')
    expect(stars.length).toBeGreaterThan(0)
  })

  it('deve exibir nomes de restaurantes', () => {
    render(<FriendsPage />)
    
    expect(screen.getByText(/restaurante paris 6/i)).toBeInTheDocument()
    expect(screen.getByText(/seu pedro lanches/i)).toBeInTheDocument()
  })
})


