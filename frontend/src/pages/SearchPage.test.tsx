import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import SearchPage from './SearchPage'

describe('SearchPage', () => {
  it('deve renderizar a página de pesquisa corretamente', () => {
    render(<SearchPage />)
    
    expect(screen.getByPlaceholderText(/pesquisa/i)).toBeInTheDocument()
    expect(screen.getByText(/pesquise por:/i)).toBeInTheDocument()
  })

  it('deve exibir o campo de busca', () => {
    render(<SearchPage />)
    
    const searchInput = screen.getByPlaceholderText(/pesquisa/i)
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'text')
  })

  it('deve exibir opções de pesquisa', () => {
    render(<SearchPage />)
    
    expect(screen.getByText(/últimas datas/i)).toBeInTheDocument()
    expect(screen.getByText(/tipo, país ou região/i)).toBeInTheDocument()
    expect(screen.getByText(/restaurante/i)).toBeInTheDocument()
    expect(screen.getByText(/comida/i)).toBeInTheDocument()
    expect(screen.getByText(/mais populares/i)).toBeInTheDocument()
  })

  it('deve ter ícone de pesquisa', () => {
    const { container } = render(<SearchPage />)
    
    const searchIcon = container.querySelector('svg')
    expect(searchIcon).toBeInTheDocument()
  })

  it('deve ter logo da aplicação', () => {
    render(<SearchPage />)
    
    const logo = screen.getByAltText(/logo/i)
    expect(logo).toBeInTheDocument()
  })

  it('deve exibir todas as opções de filtro', () => {
    render(<SearchPage />)
    
    const options = [
      'Últimas Datas',
      'Tipo, País ou Região',
      'Restaurante',
      'Comida',
      'Mais Populares',
      'Mais Bem Avaliados',
      'Listas Mais Curtidas'
    ]

    options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })
})


