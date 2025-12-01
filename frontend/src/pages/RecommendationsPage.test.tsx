import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import RecommendationsPage from './RecommendationsPage'

describe('RecommendationsPage', () => {
  it('deve renderizar a página de recomendações corretamente', () => {
    render(<RecommendationsPage />)
    
    expect(screen.getByAltText(/food boxd logo/i)).toBeInTheDocument()
  })

  it('deve exibir cards de recomendações', () => {
    render(<RecommendationsPage />)
    
    expect(screen.getByText(/melhores hamburgers de salvador/i)).toBeInTheDocument()
    expect(screen.getByText(/ambiente calmo e comida leve/i)).toBeInTheDocument()
    expect(screen.getByText(/cafés para trabalhar remoto/i)).toBeInTheDocument()
  })

  it('deve exibir todas as 6 recomendações', () => {
    render(<RecommendationsPage />)
    
    const recommendations = [
      'Melhores Hamburgers de Salvador',
      'Ambiente Calmo e Comida Leve',
      'Cafés para Trabalhar Remoto',
      'Jantar Romântico na Orla',
      'Comida Vegana em Salvador',
      'Lanches Rápidos e Gostosos'
    ]

    recommendations.forEach(rec => {
      expect(screen.getByText(rec)).toBeInTheDocument()
    })
  })

  it('deve exibir imagens das recomendações', () => {
    render(<RecommendationsPage />)
    
    const images = screen.getAllByRole('img').filter(img => 
      img.getAttribute('alt') !== 'Food Boxd Logo'
    )
    expect(images.length).toBe(6)
  })

  it('deve ter grid de cards', () => {
    const { container } = render(<RecommendationsPage />)
    
    const gridContainer = container.querySelector('[class*="gridContainer"]')
    expect(gridContainer).toBeInTheDocument()
  })
})


