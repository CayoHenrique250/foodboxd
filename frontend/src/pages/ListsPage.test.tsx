import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import ListsPage from './ListsPage'

describe('ListsPage', () => {
  it('deve renderizar a página de listas corretamente', () => {
    render(<ListsPage />)
    
    expect(screen.getByAltText(/food boxd logo/i)).toBeInTheDocument()
  })

  it('deve exibir todas as listas', () => {
    render(<ListsPage />)
    
    expect(screen.getByText(/favoritos do momento/i)).toBeInTheDocument()
    expect(screen.getByText(/pratos para experimentar/i)).toBeInTheDocument()
    expect(screen.getByText(/os melhores strogonofes/i)).toBeInTheDocument()
  })

  it('deve exibir contadores de itens nas listas', () => {
    render(<ListsPage />)
    
    expect(screen.getByText(/13 restaurantes/i)).toBeInTheDocument()
    expect(screen.getByText(/8 pratos/i)).toBeInTheDocument()
    expect(screen.getByText(/3 pratos/i)).toBeInTheDocument()
  })

  it('deve exibir descrições das listas', () => {
    render(<ListsPage />)
    
    const descriptions = screen.getAllByText(/lorem ipsum/i)
    expect(descriptions.length).toBeGreaterThan(0)
  })

  it('deve ter scroll horizontal para cada lista', () => {
    const { container } = render(<ListsPage />)
    
    const scrollContainers = container.querySelectorAll('[class*="horizontalScroll"]')
    expect(scrollContainers.length).toBeGreaterThanOrEqual(3)
  })

  it('deve exibir imagens dos itens', () => {
    render(<ListsPage />)
    
    const images = screen.getAllByAltText('Item')
    expect(images.length).toBeGreaterThan(0)
  })

  it('deve ter ícones de setas', () => {
    const { container } = render(<ListsPage />)
    
    const arrowIcons = container.querySelectorAll('svg')
    expect(arrowIcons.length).toBeGreaterThan(0)
  })
})


