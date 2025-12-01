import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import { FloatingButtons } from './FloatingButtons'

describe('FloatingButtons', () => {
  it('não deve renderizar nada em rotas sem botões configurados', () => {
    window.history.pushState({}, '', '/app/review')
    const { container } = render(<FloatingButtons />)
    
    expect(container.firstChild).toBeNull()
  })

  it('deve renderizar botões para rota dashboard', () => {
    window.history.pushState({}, '', '/app/dashboard')
    render(<FloatingButtons />)
    
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/seguindo/i)).toBeInTheDocument()
    expect(screen.getByText(/listas/i)).toBeInTheDocument()
    expect(screen.getByText(/recomendações/i)).toBeInTheDocument()
  })

  it('deve renderizar botões para rota perfil', () => {
    window.history.pushState({}, '', '/app/perfil')
    render(<FloatingButtons />)
    
    expect(screen.getByText(/perfil/i)).toBeInTheDocument()
    expect(screen.getByText(/diário/i)).toBeInTheDocument()
    expect(screen.getByText(/listas/i)).toBeInTheDocument()
    expect(screen.getByText(/minha lista/i)).toBeInTheDocument()
  })

  it('deve renderizar botões para rota amigos', () => {
    window.history.pushState({}, '', '/app/amigos')
    render(<FloatingButtons />)
    
    expect(screen.getByText(/amigos/i)).toBeInTheDocument()
    expect(screen.getByText(/você/i)).toBeInTheDocument()
  })

  it('deve renderizar botões para rota voce', () => {
    window.history.pushState({}, '', '/app/voce')
    render(<FloatingButtons />)
    
    expect(screen.getByText(/amigos/i)).toBeInTheDocument()
    expect(screen.getByText(/você/i)).toBeInTheDocument()
  })

  it('deve renderizar botões para rota seguindo', () => {
    window.history.pushState({}, '', '/app/seguindo')
    render(<FloatingButtons />)
    
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/seguindo/i)).toBeInTheDocument()
  })

  it('deve renderizar botões para rota recomendacoes', () => {
    window.history.pushState({}, '', '/app/recomendacoes')
    render(<FloatingButtons />)
    
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/recomendações/i)).toBeInTheDocument()
  })

  it('deve renderizar botões para rota diario', () => {
    window.history.pushState({}, '', '/app/diario')
    render(<FloatingButtons />)
    
    expect(screen.getByText(/perfil/i)).toBeInTheDocument()
    expect(screen.getByText(/diário/i)).toBeInTheDocument()
  })

  it('deve ter links navegáveis', () => {
    window.history.pushState({}, '', '/app/dashboard')
    render(<FloatingButtons />)
    
    const homeLink = screen.getByText(/home/i)
    expect(homeLink.closest('a')).toHaveAttribute('href', '/app/dashboard')
  })

  it('deve aplicar classe active no botão da rota atual', () => {
    window.history.pushState({}, '', '/app/dashboard')
    render(<FloatingButtons />)
    
    const homeButton = screen.getByText(/home/i).closest('a')
    expect(homeButton?.className).toMatch(/floatingButtonActive/)
  })
})


