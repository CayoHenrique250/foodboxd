import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import { ProfilePage } from './ProfilePage'
import { useAuthStore } from '../store/auth.store'

describe('ProfilePage', () => {
  const mockUser = {
    id: '1',
    email: 'test@test.com',
    name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    foto: undefined,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({ token: 'mock-token', user: mockUser })
  })

  it('deve renderizar a página de perfil corretamente', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
    expect(screen.getByAltText(/foto de perfil/i)).toBeInTheDocument()
    expect(screen.getByText(/favoritos/i)).toBeInTheDocument()
    expect(screen.getByText(/atividade recente/i)).toBeInTheDocument()
  })

  it('deve exibir nome completo do usuário', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  })

  it('deve exibir imagem do usuário ou avatar padrão', () => {
    render(<ProfilePage />)
    
    const profileImage = screen.getByAltText(/foto de perfil/i)
    expect(profileImage).toBeInTheDocument()
    expect(profileImage).toHaveAttribute('src', expect.stringContaining('ui-avatars.com'))
  })

  it('deve exibir imagem customizada quando disponível', () => {
    useAuthStore.setState({
      token: 'mock-token',
      user: { ...mockUser, foto: 'https://example.com/photo.jpg' }
    })

    render(<ProfilePage />)
    
    const profileImage = screen.getByAltText(/foto de perfil/i)
    expect(profileImage).toHaveAttribute('src', 'https://example.com/photo.jpg')
  })

  it('deve ter botão de logout', () => {
    render(<ProfilePage />)
    
    const logoutButton = screen.getByRole('button', { name: /sair \(logout\)/i })
    expect(logoutButton).toBeInTheDocument()
  })

  it('deve fazer logout quando clicar no botão', async () => {
    const user = userEvent.setup()
    render(<ProfilePage />)
    
    const logoutButton = screen.getByRole('button', { name: /sair \(logout\)/i })
    await user.click(logoutButton)
    
    const state = useAuthStore.getState()
    expect(state.token).toBeNull()
    expect(state.user).toBeNull()
  })

  it('deve ter link para configurações', () => {
    render(<ProfilePage />)
    
    const settingsLink = screen.getByLabelText(/configurações/i)
    expect(settingsLink).toHaveAttribute('href', '/app/configuracoes')
  })

  it('deve exibir seção de favoritos', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText(/^favoritos$/i)).toBeInTheDocument()
  })

  it('deve exibir seção de atividade recente', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText(/atividade recente/i)).toBeInTheDocument()
  })

  it('deve ter input para upload de foto', () => {
    render(<ProfilePage />)
    
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
    expect(fileInput).toHaveAttribute('accept', 'image/png, image/jpeg')
  })

  it('deve atualizar foto quando upload feito', async () => {
    const user = userEvent.setup()
    render(<ProfilePage />)
    
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' })
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    
    await user.upload(fileInput, file)
    
    expect(fileInput.files?.[0]).toBe(file)
  })

  it('deve exibir mensagem de carregamento quando não há usuário', () => {
    useAuthStore.setState({ token: 'mock-token', user: null })
    
    render(<ProfilePage />)
    
    expect(screen.getByText(/carregando perfil/i)).toBeInTheDocument()
  })

  it('deve renderizar grid de favoritos', () => {
    const { container } = render(<ProfilePage />)
    
    const grids = container.querySelectorAll('[class*="gridContainer"]')
    expect(grids.length).toBeGreaterThanOrEqual(1)
  })

  it('deve ter botões de ver todos', () => {
    render(<ProfilePage />)
    
    const seeAllButtons = screen.getAllByRole('button', { name: /ver todos/i })
    expect(seeAllButtons.length).toBeGreaterThanOrEqual(2)
  })
})


