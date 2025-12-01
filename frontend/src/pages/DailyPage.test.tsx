import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import DailyPage from './DailyPage'

describe('DailyPage', () => {
  it('deve renderizar a página de diário corretamente', () => {
    render(<DailyPage />)
    
    expect(screen.getByAltText(/food boxd logo/i)).toBeInTheDocument()
    expect(screen.getByText(/outubro/i)).toBeInTheDocument()
  })

  it('deve exibir meses', () => {
    render(<DailyPage />)
    
    expect(screen.getByText(/outubro/i)).toBeInTheDocument()
    expect(screen.getByText(/novembro/i)).toBeInTheDocument()
  })

  it('deve exibir itens do diário', () => {
    render(<DailyPage />)
    
    expect(screen.getByText(/petit gateau/i)).toBeInTheDocument()
    expect(screen.getByText(/milkshake de maracujá/i)).toBeInTheDocument()
    expect(screen.getByText(/açai com morango/i)).toBeInTheDocument()
  })

  it('deve exibir dias dos itens', () => {
    render(<DailyPage />)
    
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('21')).toBeInTheDocument()
  })

  it('deve exibir avaliações com estrelas', () => {
    const { container } = render(<DailyPage />)
    
    const stars = container.querySelectorAll('svg')
    expect(stars.length).toBeGreaterThan(0)
  })

  it('deve ter botões de menu para cada item', () => {
    render(<DailyPage />)
    
    const menuButtons = screen.getAllByRole('button')
    expect(menuButtons.length).toBeGreaterThan(0)
  })

  it('deve exibir imagens dos itens', () => {
    render(<DailyPage />)
    
    const images = screen.getAllByRole('img').filter(img => 
      img.getAttribute('alt') !== 'Food Boxd Logo'
    )
    expect(images.length).toBeGreaterThan(0)
  })
})


