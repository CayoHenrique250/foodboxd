import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import { AppLayout } from './Layout'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Outlet: () => <div>Mock Outlet Content</div>,
  }
})

describe('Layout', () => {
  it('deve renderizar o layout corretamente', () => {
    render(<AppLayout />)
    
    expect(screen.getByText(/mock outlet content/i)).toBeInTheDocument()
  })

  it('deve ter sidebar com links de navegação', () => {
    render(<AppLayout />)
    
    expect(screen.getByTitle(/início/i)).toBeInTheDocument()
    expect(screen.getByTitle(/pesquisa/i)).toBeInTheDocument()
    expect(screen.getByTitle(/review/i)).toBeInTheDocument()
    expect(screen.getByTitle(/amigos/i)).toBeInTheDocument()
    expect(screen.getByTitle(/perfil/i)).toBeInTheDocument()
  })

  it('deve ter botão hamburger para alternar sidebar', () => {
    render(<AppLayout />)
    
    const hamburgerButton = screen.getByLabelText(/alternar menu/i)
    expect(hamburgerButton).toBeInTheDocument()
  })

  it('deve alternar estado collapsed da sidebar', async () => {
    const user = userEvent.setup()
    const { container } = render(<AppLayout />)
    
    const sidebar = container.querySelector('[class*="sidebar"]')
    expect(sidebar).toHaveClass('sidebarCollapsed')
    
    const hamburgerButton = screen.getByLabelText(/alternar menu/i)
    await user.click(hamburgerButton)
    
    expect(sidebar).not.toHaveClass('sidebarCollapsed')
  })

  it('deve exibir labels quando sidebar expandida', async () => {
    const user = userEvent.setup()
    render(<AppLayout />)
    
    const hamburgerButton = screen.getByLabelText(/alternar menu/i)
    await user.click(hamburgerButton)
    
    expect(screen.getAllByText(/início/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/pesquisa/i).length).toBeGreaterThan(0)
  })

  it('deve ter link para configurações', () => {
    render(<AppLayout />)
    
    const settingsLinks = screen.getAllByTitle(/configurações/i)
    expect(settingsLinks.length).toBeGreaterThan(0)
  })

  it('deve ter navegação mobile na parte inferior', () => {
    const { container } = render(<AppLayout />)
    
    const bottomNav = container.querySelector('[class*="bottomNav"]')
    expect(bottomNav).toBeInTheDocument()
  })

  it('deve ter 5 links na navegação mobile', () => {
    const { container } = render(<AppLayout />)
    
    const bottomNavLinks = container.querySelectorAll('[class*="bottomNavLink"]')
    expect(bottomNavLinks.length).toBe(5)
  })

  it('deve ter header mobile', () => {
    const { container } = render(<AppLayout />)
    
    const mobileHeader = container.querySelector('[class*="mobileHeader"]')
    expect(mobileHeader).toBeInTheDocument()
  })

  it('deve ter logo no header mobile', () => {
    const { container } = render(<AppLayout />)
    
    const mobileLogo = container.querySelector('[class*="mobileLogo"]')
    expect(mobileLogo).toBeInTheDocument()
  })

  it('deve ter ícones SVG para navegação', () => {
    const { container } = render(<AppLayout />)
    
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(5)
  })
})


