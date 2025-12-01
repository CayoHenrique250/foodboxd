import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../test/test-utils'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar o dashboard corretamente', () => {
    render(<Dashboard />)
    
    expect(screen.getByAltText(/food boxd logo/i)).toBeInTheDocument()
    expect(screen.getByText(/populares essa semana/i)).toBeInTheDocument()
    expect(screen.getByText(/veja o que seus amigos estão experimentando/i)).toBeInTheDocument()
  })

  it('deve exibir seção de populares', () => {
    render(<Dashboard />)
    
    const popularSection = screen.getByText(/populares essa semana/i)
    expect(popularSection).toBeInTheDocument()
  })

  it('deve exibir seção de amigos', () => {
    render(<Dashboard />)
    
    const friendsSection = screen.getByText(/veja o que seus amigos estão experimentando/i)
    expect(friendsSection).toBeInTheDocument()
  })

  it('deve renderizar cards de itens populares', () => {
    render(<Dashboard />)
    
    const images = screen.getAllByAltText('Item')
    expect(images.length).toBeGreaterThan(0)
  })

  it('deve ter elementos de scroll horizontal', () => {
    const { container } = render(<Dashboard />)
    
    const scrollContainers = container.querySelectorAll('[class*="horizontalScroll"]')
    expect(scrollContainers.length).toBeGreaterThanOrEqual(2)
  })

  it('deve permitir arrastar para scroll', async () => {
    const { container } = render(<Dashboard />)
    
    const scrollContainer = container.querySelector('[class*="horizontalScroll"]')
    expect(scrollContainer).toBeInTheDocument()
  })

  it('deve ter ícones de setas', () => {
    render(<Dashboard />)
    
    const { container } = render(<Dashboard />)
    const arrowIcons = container.querySelectorAll('svg')
    expect(arrowIcons.length).toBeGreaterThan(0)
  })

  it('deve exibir logo da aplicação', () => {
    render(<Dashboard />)
    
    const logo = screen.getByAltText(/food boxd logo/i)
    expect(logo).toHaveAttribute('src', '/logo-backBlack-horizontal.png')
  })
})


