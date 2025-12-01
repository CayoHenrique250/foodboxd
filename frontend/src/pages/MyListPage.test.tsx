import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import MyListPage from './MyListPage'

describe('MyListPage', () => {
  it('deve renderizar a página de minha lista corretamente', () => {
    render(<MyListPage />)
    
    expect(screen.getByAltText(/food boxd logo/i)).toBeInTheDocument()
  })

  it('deve exibir grid de itens', () => {
    const { container } = render(<MyListPage />)
    
    const gridContainer = container.querySelector('[class*="gridContainer"]')
    expect(gridContainer).toBeInTheDocument()
  })

  it('deve exibir múltiplos itens no grid', () => {
    render(<MyListPage />)
    
    const images = screen.getAllByAltText(/list item/i)
    expect(images.length).toBeGreaterThan(0)
  })

  it('deve ter pelo menos 12 itens', () => {
    render(<MyListPage />)
    
    const images = screen.getAllByAltText(/list item/i)
    expect(images.length).toBeGreaterThanOrEqual(12)
  })

  it('deve exibir logo no header', () => {
    render(<MyListPage />)
    
    const logo = screen.getByAltText(/food boxd logo/i)
    expect(logo).toHaveAttribute('src', '/logo-backBlack-horizontal.png')
  })
})


