import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import YouPage from './YouPage'
import '@testing-library/jest-dom'

describe('YouPage', () => {
  it('deve renderizar a página você corretamente', () => {
    render(<YouPage />)
    
    expect(screen.getByAltText('Food Boxd')).toBeInTheDocument()
  })

  it('deve exibir atividades sobre o usuário', () => {
    render(<YouPage />)
    
    expect(screen.getByAltText('maria')).toBeInTheDocument()
    expect(screen.getByAltText('carlos')).toBeInTheDocument()
  })

  it('deve exibir diferentes tipos de notificações', () => {
    render(<YouPage />)
    
    expect(screen.getAllByText((content) => 
      content.includes('curtiu sua avaliação')
    ).length).toBeGreaterThan(0)
    expect(screen.getAllByText((content) => 
      content.includes('comentou na sua avaliação')
    ).length).toBeGreaterThan(0)
    expect(screen.getAllByText((content) => 
      content.includes('curtiu sua foto')
    ).length).toBeGreaterThan(0)
    expect(screen.getByText('começou a seguir você')).toBeInTheDocument()
  })

  it('deve exibir comentários nas notificações', () => {
    render(<YouPage />)
    
    expect(screen.getByText(/ótima recomendação/i)).toBeInTheDocument()
    expect(screen.getByText(/também quero experimentar/i)).toBeInTheDocument()
  })

  it('deve exibir avatares dos usuários', () => {
    render(<YouPage />)
    
    const avatars = screen.getAllByRole('img').filter(img => 
      img.getAttribute('alt') && img.getAttribute('alt') !== 'Food Boxd'
    )
    expect(avatars.length).toBeGreaterThan(0)
  })

  it('deve exibir tempo das notificações', () => {
    render(<YouPage />)
    
    expect(screen.getByText('2h')).toBeInTheDocument()
    expect(screen.getByText('5h')).toBeInTheDocument()
    expect(screen.getAllByText('1d').length).toBeGreaterThan(0)
  })

  it('deve exibir avaliações com estrelas', () => {
    const { container } = render(<YouPage />)
    
    const stars = container.querySelectorAll('svg')
    expect(stars.length).toBeGreaterThan(0)
  })

  it('deve exibir nomes de restaurantes nas notificações', () => {
    render(<YouPage />)
    
    expect(screen.getByText(/Restaurante Bella Vista/i)).toBeInTheDocument()
    expect(screen.getByText(/Café Central/i)).toBeInTheDocument()
  })
})

